# Business Requirements Document (BRD) - SmartLMS.AI

## 1. Hệ thống chức năng chi tiết (Detailed Feature Modules)

### 1.1 Hệ thống Quản lý Học tập (LMS & Content)
- **Curriculum:** Quản lý Course -> Module -> Lesson. Hỗ trợ nhiều loại nội dung (Video, Document).
- **Interactive Workspace:** Hệ thống Flashcards (Spaced Repetition), Mistake Notebook (Sổ tay lỗi sai), và đặt câu hỏi ngay trong bài học.
- **Live Classes:** Tích hợp Zoom API để tổ chức các buổi học trực tuyến đồng bộ.
- **Coding Challenge:** Engine thực thi code (CompilerService) hỗ trợ làm bài tập lập trình trực tiếp, kiểm tra qua TestCases.

### 1.2 Hệ thống Đánh giá & Gamification
- **Assessment Engine:** Chấm điểm trắc nghiệm, tự động cộng XP, cấp Badge (Huy hiệu) dựa trên thành tích.
- **Leaderboard:** Bảng xếp hạng thời gian thực (tối ưu hóa bằng Redis Cache).
- **Certificates:** Tự động tạo và cấp chứng chỉ số sau khi hoàn thành khóa học.

### 1.3 Hệ thống Tài chính & Kinh doanh
- **Billing & Payment:** Tích hợp VNPay Gateway, quản lý Invoices, Coupons.
- **Affiliate:** Theo dõi link giới thiệu, tính toán hoa hồng (Commission) cho đối tác.
- **Subscription/Single Purchase:** Hỗ trợ nhiều mô hình kinh doanh khóa học.

### 1.4 Hệ thống AI & Analytics
- **Predictive Analytics:** Dự đoán tỷ lệ Dropout (ML.NET).
- **Item Analysis:** Đánh giá độ khó và chất lượng của câu hỏi kiểm tra.
- **Reporting:** Hệ thống báo cáo sâu về tiến độ học tập và doanh thu.

### 1.5 Bảo mật & Vận hành (Enterprise Security)
- **Data Encryption:** Mã hóa Email, KYC, DOB ngay trong DB (EncryptionService).
- **Blind Indexing:** Hỗ trợ tìm kiếm dữ liệu đã mã hóa qua EmailHash.
- **Audit Logs:** Theo dõi 100% lịch sử thay đổi dữ liệu (Who, When, What changed).
- **Webhooks:** Đẩy dữ liệu sự kiện ra hệ thống bên thứ 3.

## 2. Kiến trúc & Công nghệ (Tech Stack Detail)
- **Core:** ASP.NET Core 8.0 (C#).
- **Database:** MariaDB (MySQL compatible).
- **Caching & Queue:** Redis (Leaderboard), Hangfire (Emails, Background tasks).
- **Communication:** MediatR (In-process Event Bus) cho Modular Monolith.
- **Frontend:** React + Vite, Axios, Lucide Icons.
- **DevOps:** Docker (Multi-stage build), Nginx Reverse Proxy.

## 3. Quy tắc phát triển (Do's & Don'ts)
- **DO:** Luôn sử dụng `_mediator.Publish()` khi một hành động ở module này cần tác động đến module khác.
- **DO:** Cấu hình `JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear()` trong `Program.cs` để tránh `sub` claim ghi đè `NameIdentifier`.
- **DO:** Cập nhật Audit Log cho mọi entity quan trọng.
- **DON'T:** Không viết logic nghiệp vụ phức tạp trực tiếp trong Controller.
- **DON'T:** Không lưu mật khẩu hoặc dữ liệu nhạy cảm dạng text thuần.
