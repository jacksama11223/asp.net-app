# Business Requirements Document (BRD) - SmartLMS.AI

## 1. Hệ thống chức năng chi tiết (Detailed Feature Modules)

### 1.1 Hệ thống Quản lý Học tập (LMS & Content)
- **Curriculum:** Quản lý Course -> Module -> Lesson. Hỗ trợ nhiều loại nội dung (Video, Document).
- **Interactive Workspace:** Hệ thống Flashcards (Spaced Repetition), Mistake Notebook (Sổ tay lỗi sai), Bookmark & Resume, và phân tích điểm yếu bằng AI.
- **Creator Studio (Instructor Dashboard):** Giao diện quản trị dành riêng cho Giảng viên với Sidebar co giãn, theo dõi học viên, doanh thu (Analytics Charts) và tiến độ thực tế.
- **Tutor Dashboard:** Bảng điều khiển cho Mentor/Gia sư quản lý lịch hẹn 1:1 và trả lời câu hỏi khẩn cấp.
- **Self Quiz Builder:** Công cụ AI cho phép học viên tự tạo bộ câu hỏi và Flashcard từ chủ đề bất kỳ.
- **Direct Messaging:** Hệ thống Inbox tập trung, Glassmorphism UI, hỗ trợ trao đổi 2 chiều.
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
- **Frontend:** React + Vite, Mantine UI, Framer Motion, react-icons/lu (SafeIcons only), Axios.
- **DevOps:** Docker (Multi-stage build), Nginx Reverse Proxy, `verify_frontend.js` (pre-build static analysis).

## 3. Quy tắc phát triển (Do's & Don'ts)
- **DO:** Luôn sử dụng `_mediator.Publish()` khi một hành động ở module này cần tác động đến module khác.
- **DO:** Sử dụng claim `UserId` (ưu tiên) hoặc `NameIdentifier` (có kiểm tra kiểu số) để định danh người dùng.
- **DO:** Cấu hình `JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear()` để tránh xung đột claim `sub`.
- **DO:** Cập nhật Audit Log cho mọi entity quan trọng.
- **DON'T:** Không viết logic nghiệp vụ phức tạp trực tiếp trong Controller.
- **DON'T:** Không lưu mật khẩu hoặc dữ liệu nhạy cảm dạng text thuần.
