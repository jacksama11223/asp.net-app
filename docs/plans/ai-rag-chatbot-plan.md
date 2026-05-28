# Kế hoạch Triển khai Chatbot AI (Kiến trúc RAG cho VPS 1GB RAM)

Tài liệu này giải thích cách xây dựng một Chatbot AI thông minh có thể "nói chuyện" và hiểu dữ liệu hệ thống nội bộ, nhưng được thiết kế đặc biệt để chạy mượt mà trên môi trường hạn chế tài nguyên (VPS 1GB RAM).

## 1. Phân biệt các loại Mô hình AI
Để hiểu tại sao không thể cài trực tiếp Chatbot lên VPS 1GB RAM, cần phân biệt 2 loại mô hình:

*   **Embedding Model (Mô hình nhúng - Ví dụ: `all-MiniLM-L6-v2`)**:
    *   **Bản chất:** Giống như một người "Thủ thư". Không biết tự "nói chuyện", chỉ có khả năng mã hóa câu chữ thành các con số (Vector) để tìm kiếm nội dung liên quan siêu tốc độ.
    *   **Tài nguyên:** Cực kỳ nhẹ. File tải về chỉ khoảng 90MB, chạy tốn ~90MB RAM. Hoàn toàn phù hợp cho VPS 1GB.
*   **Generative Model (Mô hình sinh tạo LLM - Ví dụ: ChatGPT, LLaMA-3, Qwen)**:
    *   **Bản chất:** Giống như một "Giáo sư". Có khả năng nhận câu hỏi, tự suy nghĩ, tổng hợp thông tin và sinh ra từng từ một để tạo thành câu trả lời hoàn chỉnh.
    *   **Tài nguyên:** Rất nặng. Cần 4GB-8GB ổ cứng để lưu trữ và bắt buộc phải có 6GB-8GB RAM để chạy. Sẽ làm treo (crash) VPS 1GB RAM ngay lập tức.

## 2. Giải pháp: Kiến trúc RAG (Retrieval-Augmented Generation)

Vì VPS-B (1GB RAM) không thể tự chạy "Giáo sư" (LLM), chúng ta sẽ sử dụng kiến trúc RAG: Kết hợp **Thủ thư (Local)** và **Giáo sư (Cloud API)**.

### Quy trình hoạt động của RAG trong SmartLMS

1.  **Học viên hỏi:** Sinh viên nhập câu hỏi vào Chatbot (Ví dụ: *"Tại sao code C# của em bị lỗi Object reference not set to an instance of an object?"*).
2.  **Retrieve (Rút trích bằng AI Local):**
    *   Mã nguồn C# (ASP.NET) sử dụng mô hình ONNX `all-MiniLM-L6-v2` (tốn 90MB RAM) để phân tích câu hỏi thành Vector.
    *   Thực hiện "Semantic Search" (Tìm kiếm ngữ nghĩa) trong Database nội bộ (chứa bài giảng, lịch sử sửa lỗi, tài liệu môn học) để lấy ra Top 3 bài viết có chứa hướng dẫn hoặc đáp án liên quan nhất.
3.  **Augment (Gia cường ngữ cảnh):**
    *   Mã nguồn C# gói câu hỏi của sinh viên kèm theo nội dung 3 bài viết vừa tìm được thành một đoạn Prompt lớn.
4.  **Generate (Sinh tạo bằng Cloud AI):**
    *   Gửi Prompt này qua mạng Internet tới một LLM API miễn phí (Ví dụ: Google Gemini API hoặc Cloudflare Workers AI).
    *   *System Prompt gửi đi:* "Bạn là trợ lý giảng dạy của SmartLMS. Hãy dựa vào [Tài liệu nội bộ đính kèm] để trả lời câu hỏi của sinh viên một cách thân thiện. Nghiêm cấm bịa đặt thông tin ngoài tài liệu."
5.  **Trả kết quả:** Gemini API xử lý văn bản, trả về câu trả lời hoàn chỉnh. Chatbot hiển thị câu trả lời này cho sinh viên.

## 3. Lợi thế tuyệt đối của Kiến trúc RAG

*   **Siêu nhẹ cho Server:** VPS-B vẫn chỉ tiêu tốn dưới 150MB RAM vì không phải "gánh" LLM. Toàn bộ tính toán nặng nhất đã bị đẩy sang server của Google/Cloudflare.
*   **Hiểu biết chuyên sâu (Domain-specific):** AI trả lời chính xác dựa trên dữ liệu nội bộ của SmartLMS (như bài giảng của trường, quy chế thi), điều mà ChatGPT phiên bản public không hề biết.
*   **Không tốn chi phí:** Tận dụng Free Tier của Google Gemini API kết hợp với thư viện ONNX miễn phí hoàn toàn.
*   **Bảo mật:** Model `all-MiniLM-L6-v2` chạy hoàn toàn offline, đảm bảo dữ liệu khi mã hóa không bị rò rỉ.
