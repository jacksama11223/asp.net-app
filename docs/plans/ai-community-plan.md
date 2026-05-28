# Kế hoạch Tích hợp AI vào SmartLMS.Community (Phiên bản "Siêu nhẹ" cho VPS 1GB RAM)

## 1. Tầm nhìn Kiến trúc (Low-Memory AI Architecture)
Với hạn chế VPS-B chỉ có **1GB RAM** (và đang phải cõng 3 Backend + 1 DB Slave), việc load các mô hình AI/NLP nặng hàng trăm Megabyte vào RAM là **bất khả thi** (sẽ gây Crash vì Out Of Memory). 

Do đó, chúng ta sẽ chuyển hướng sang chiến lược **Cloud-AI & Micro-ML**: Bắt các ông lớn (OpenAI / Cloudflare) chịu tải thay mình, VPS-B chỉ đóng vai trò làm "trạm trung chuyển" (Network I/O) siêu nhẹ.

---

## 2. Các Tính năng AI Trọng tâm (Đã tối ưu RAM)

### 2.1. Tìm kiếm Ngữ nghĩa Thời gian thực (Cloud-based Semantic Search)
- **Giải pháp cũ (Bỏ):** Chạy Model Embedding NLP tại local và dùng Redis Vector Search (Rất tốn RAM).
- **Giải pháp 1GB RAM:** 
  - **Tạo Embeddings:** Khi có bài viết mới, Worker đẩy nội dung sang **Cloudflare AI API** hoặc **Google Gemini API** (miễn phí) để lấy về mã Vector. (Tốn 0MB RAM).
  - **Lưu & Tìm kiếm:** Sử dụng **Pinecone DB (Free Tier)** để lưu trữ Vector và tìm kiếm. Khi user tìm kiếm, Worker lại gọi Cloudflare/Gemini dịch từ khóa thành Vector -> Gửi lên Pinecone lấy kết quả. 
- **Kết quả:** Code C# chỉ làm nhiệm vụ gọi API (tốn vài MB RAM), hoàn toàn không gánh thuật toán.

### 2.2. Kiểm duyệt Nội dung Thông minh (Micro-ML Toxicity Moderation)
- **Giải pháp cũ (Bỏ):** Dùng Deep Learning NLP để phân tích cảm xúc.
- **Giải pháp 1GB RAM:**
  - Dùng thuật toán cổ điển **TF-IDF kết hợp Naive Bayes** của ML.NET.
  - Đây là thuật toán đếm số lần xuất hiện của từ ngữ (Không hiểu ngữ cảnh sâu), cực kỳ nhẹ. File Model huấn luyện xong chỉ tốn chưa tới **5MB RAM**.
  - Worker có thể dễ dàng nạp Model này để quét các từ thù địch cơ bản ngay lập tức. Nếu nghi ngờ câu phức tạp, đẩy lên Google Perspective API (miễn phí).

### 2.3. Hệ thống Khuyến nghị (Collaborative Filtering)
- **Giải pháp 1GB RAM:**
  - Thuật toán `MatrixFactorizationTrainer` của ML.NET thực ra lại **rất nhẹ** (chỉ tốn vài MB RAM cho dữ liệu hàng ngàn User).
  - Ban đêm, Worker sẽ kích hoạt Hangfire: Đọc `MistakeLog` và `Like/Comment` từ Database -> Chạy Matrix Factorization -> Cập nhật bảng `Recommendations` vào MariaDB -> Giải phóng RAM ngay lập tức.
  - Ban ngày, khi sinh viên vào web, hệ thống chỉ chạy lệnh `SELECT * FROM Recommendations` bằng DB Slave (Cực nhẹ, 0 tính toán).

### 2.4. AI Tự động Phân loại (LLM API)
- Vì phân loại (Tagging) cần hiểu ngữ cảnh sâu, thay vì tốn RAM Train AI, cứ có bài viết mới, Worker gọi API của ChatGPT/Gemini prompt: *"Đọc bài này và trả về 3 hashtag phù hợp nhất dưới dạng JSON"*. 

---

## 3. Quy trình Triển khai (Roadmap "Nhà nghèo vượt khó")

### Giai đoạn 1: AI Tự động (Tuần 1)
1. Đăng ký API Key của Google Gemini (Miễn phí 15 request/phút - Dư sức cho Community nhỏ).
2. Tích hợp Hangfire Job để gửi bài viết mới lên API nhờ Gemini phân tích Tag và kiểm duyệt.

### Giai đoạn 2: Tìm kiếm Ngữ nghĩa Outsourcing (Tuần 2)
1. Đăng ký Pinecone Vector Database (Free Tier).
2. Viết Service trong C# kết nối với Cloudflare AI Embeddings API và lưu vào Pinecone.
3. Thay thế thanh tìm kiếm cũ bằng API kết nối Pinecone.

### Giai đoạn 3: Khuyến nghị nội bộ (Tuần 3)
1. Train mô hình ML.NET Khuyến nghị (Matrix Factorization) bằng dữ liệu DB nội bộ. Mô hình này rất nhỏ, sẽ được đưa vào chạy Job ban đêm để không tranh giành RAM với các sinh viên đang truy cập web.

## 4. Yêu cầu Hạ tầng (Đã điều chỉnh)
- **VPS-B (1GB RAM):** Tuyệt đối **không scale** `smartlms_backend` lên 3 replicas nữa. Với 1GB RAM, chỉ nên chạy **1 Backend** và 1 DB Slave. Việc Scale lên 3 sẽ làm Docker tranh giành RAM và sập (OOM Killer).
- **Tài khoản External:** Cần API Key của Gemini/Cloudflare AI và Pinecone. Mọi xử lý nặng đã bị đẩy ra khỏi Server của bạn!
