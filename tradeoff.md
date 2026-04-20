# ⚖️ PHÂN TÍCH ĐÁNH ĐỔI (TRADE-OFFS) TRONG KIẾN TRÚC SMARTLMS.AI

Trong kỹ thuật phần mềm, "Mọi thứ đều là sự đánh đổi". Với quy mô hàng chục ngàn sinh viên trên một hệ thống SaaS, dưới đây là những gì chúng ta đã lựa chọn làm điểm mạnh và những gì chúng ta chấp nhận hy sinh.

---

## 🏗️ 1. MONOLITH VS. MICROSERVICES
Chúng ta chọn mô hình **Monolith (Nguyên khối)** được đóng gói trong 1 Container Docker.

*   **Ưu tiên (Pros)**: 
    - **Dễ triển khai**: Chỉ cần 1 câu lệnh `docker compose up`. 
    - **Tiết kiệm chi phí**: Chạy mượt mà trên gói VPS miễn phí (Oracle ARM).
    - **Tốc độ phát triển**: Không tốn thời gian cấu hình Service Mesh hay Network nội bộ phức tạp.
*   **Hy sinh (Cons)**: 
    - **Scalability giới hạn**: Không thể scale riêng module AI mà không scale cả web.
    - **Single Point of Failure**: Nếu module Course bị lỗi tràn RAM, toàn bộ trang web (bao gồm cả Login) có thể bị ảnh hưởng.

---

## 🗄️ 2. SQL SERVER VS. NOSQL/DISTRIBUTED SQL
Hệ thống dùng **SQL Server** làm trung tâm dữ liệu.

*   **Ưu tiên (Pros)**: 
    - **An toàn tuyệt đối**: Dữ liệu sinh viên, tài chính cần tính nhất quán (ACID).
    - **Tìm kiếm quan hệ**: Rất mạnh trong việc kết nối giữa Sinh viên - Khóa học - Điểm số.
*   **Hy sinh (Cons)**: 
    - **Ghi dữ liệu (Write Heavy)**: Khi hàng ngàn sinh viên cùng nộp bài một lúc, SQL Server sẽ gặp áp lực lớn hơn so với NoSQL (như MongoDB).
    - **Giải pháp bù đắp**: Chúng ta đã sử dụng **Distributed Caching** và **Response Compression** để giảm tải tối đa cho DB.

---

## 🤖 3. IN-PROCESS AI (ML.NET) VS. AI SERVICE
AI được chạy trực tiếp bên trong tiến trình của Web App.

*   **Ưu tiên (Pros)**: 
    - **Chi phí 0đ**: Không cần thuê riêng các máy chủ AI đắt tiền của AWS/Azure.
    - **Đồng bộ**: Dễ dàng sử dụng lại các Model dữ liệu từ C#.
*   **Hy sinh (Cons)**: 
    - **Nguồn lực**: Việc huấn luyện lại Model (Training) mỗi tuần sẽ chiếm dụng đáng kể CPU và RAM của ứng dụng web trong vài phút.
    - **Giải pháp bù đắp**: Ta dùng **Hangfire** để chạy việc này vào ban đêm (lúc ít người dùng).

---

## 🌐 4. CLOUDFLARE TUNNEL VS. DIRECT PUBLIC IP
Chúng ta dùng Tunnel để ra ngoài Internet.

*   **Ưu tiên (Pros)**: 
    - **Bảo mật tuyệt đối**: Không cần mở port 80/443 trên server, không bị tấn công trực tiếp vào IP.
    - **Tiện lợi**: Triển khai được ở cả máy cá nhân lẫn Cloud mà không cần IP tĩnh.
*   **Hy sinh (Cons)**: 
    - **Độ trễ (Latency)**: Yêu cầu của người dùng phải đi qua "ống dẫn" của Cloudflare nên sẽ chậm hơn vài miligiây so với kết nối trực tiếp.

---

## 🚀 5. KẾT LUẬN
Với quy mô **10.000 - 50.000 sinh viên**, sự đánh đổi này là **CỰC KỲ THỰC TẾ**. Chúng ta ưu tiên sự ổn định, chi phí thấp và tốc độ hoàn thiện hệ thống. Khi bạn đạt tới 100.000 sinh viên, đó là lúc chúng ta sẽ tách module AI và Database ra các server riêng biệt.

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
