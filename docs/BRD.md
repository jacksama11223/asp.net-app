# Business Requirements Document (BRD) - SmartLMS.AI

## 🏛️ Enterprise Features (New)

### 1. Luồng Giám sát An ninh (Audit Trail Flow)
- **Mục tiêu**: Theo dõi mọi thay đổi dữ liệu nhạy cảm (User, Course, Enrollment).
- **Hành động**: Tự động ghi lại UserId, Thời gian, Dữ liệu cũ/mới vào bảng `AuditLogs`.
- **UI**: Sidebar Timeline tại trang Quản lý người dùng.

### 2. Luồng Chấm điểm Tự động (Automated Grading Flow)
- **Mục tiêu**: Hỗ trợ học viên thực hành lập trình thực tế.
- **Tính năng**: 
  - Monaco Editor (VS Code Web).
  - Terminal hiển thị kết quả biên dịch.
  - Tự động ghi lại lỗi (`MistakeLog`) để AI phân tích.

### 3. Luồng AI Analytics (Learning Prediction)
- **Mục tiêu**: Dự báo rủi ro học viên và gợi ý lộ trình học.
- **Input**: Dữ liệu từ `MistakeLog`, `ActivityLog`, `QuizAttempt`.
- **Output**: Heatmap rủi ro và Dashboard thống kê rủi rớt môn.

### 4. Luồng Tương tác Đa kênh (Omnichannel)
- **Cộng đồng**: Tự động vinh danh học viên lên Community Hub (Auto-Post).
- **Thông báo**: SignalR (Real-time Popup) và Webhook (Discord/Slack Integration).

### 5. Luồng Hợp nhất Giao diện & Trải nghiệm (Unified Navigation & Dead Buttons Integration)
- **Giải cứu 25 trang mồ côi**: Thiết lập mối liên kết di chuyển tự nhiên giữa React (Học viên) và ASP.NET Core MVC (Quản trị), đưa chỉ số Orphan Pages về 0.
- **Kích hoạt 85 nút chết**: Lập trình phản hồi sự kiện DOM (Form Wizard, Modal, SweetAlert2) và gọi API an toàn.
- **4 mảnh ghép kiến trúc nâng cao**: Tích hợp trạng thái Loading (Anti-Spam), Axios Interceptors (Token Expiry & Error Toast), Controller Security [Authorize], và SignalR real-time chat/notification.

