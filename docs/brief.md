# Project Brief: SmartLMS.AI

## 1. Tầm nhìn dự án
SmartLMS.AI là một hệ thống quản lý học tập (LMS) cấp doanh nghiệp (Enterprise-grade), được thiết kế để giải quyết bài toán đào tạo nội bộ và thương mại hóa khóa học. Điểm khác biệt cốt lõi là sự kết hợp giữa **Kiến trúc bền vững (Modular Monolith)**, **Trí tuệ nhân tạo (AI)** và **Trải nghiệm Gamification sâu sắc**.

## 2. Mục tiêu cốt lõi
- **Trải nghiệm học tập toàn diện:** Không chỉ video, hệ thống hỗ trợ cả Lớp học trực tuyến (Zoom), Thử thách lập trình (Coding Challenges), và Flashcards (Spaced Repetition).
- **Hệ thống phần thưởng (Gamification):** Khuyến khích học tập qua XP, Streak, Badge (Huy hiệu) và Bảng xếp hạng.
- **An toàn & Bảo mật:** Dữ liệu nhạy cảm của người dùng (Email, KYC, DOB) được mã hóa ở cấp độ cơ sở dữ liệu (Encryption at rest) và theo dõi mọi thay đổi qua Audit Logs.
- **Tối ưu hóa kinh doanh:** Tích hợp thanh toán (VNPay), hệ thống Affiliate (Tiếp thị liên kết), Coupon và quản lý hóa đơn (Invoice).

## 3. Đối tượng người dùng & Chân dung
- **Học viên (Student):** Học tập, làm bài test, luyện code, tích lũy XP, và tham gia cộng đồng.
- **Giảng viên (Instructor/Tutor):** Tạo nội dung, chấm điểm, dạy trực tuyến qua Zoom và quản lý thu nhập.
- **Quản trị viên (Admin):** Kiểm soát toàn bộ hệ thống, cấu hình Webhooks, theo dõi báo cáo AI và quản lý tài chính.
- **Doanh nghiệp (Organization):** Quản lý đào tạo theo phòng ban, theo dõi tiến độ của nhân viên qua các Cohort (nhóm học tập).

## 4. Giá trị độc bản (USP)
- **AI Dropout Predictor:** Cảnh báo sớm những học viên có nguy cơ bỏ học để bộ phận CSKH tác động kịp thời.
- **XAI (Explainable AI):** Không chỉ dự đoán, AI còn giải thích "tại sao" học viên đó có rủi ro (qua XAI logic trong PredictionService).
- **Modular Monolith Architecture:** Cho phép mở rộng nhanh chóng như Microservices nhưng vận hành nhẹ nhàng trên VPS rẻ tiền.
