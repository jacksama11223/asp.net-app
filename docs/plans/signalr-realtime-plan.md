# Kế hoạch Triển khai SignalR Real-time & Hệ thống Thông báo (Phase 9)

## 1. Tình trạng hệ thống hiện tại
- **Database:** Đã có Model `Notification` (gồm `UserId`, `Title`, `Message`, `IsRead`, `Link`, `Type`) và đã được khai báo trong `SmartLMSContext` thông qua DbSet `Notifications`.
- **Service:** Đã có `INotificationService` và `NotificationService` sử dụng SignalR (`DashboardHub`).
- **❌ Vấn đề:** Hiện tại `NotificationService` **CHỈ** thực hiện broadcast qua SignalR (`_hubContext.Clients...SendAsync`), **CHƯA** lưu vào Database. Điều này dẫn đến việc nếu người dùng offline, họ sẽ vĩnh viễn mất thông báo đó.

## 2. Lộ trình triển khai (Phase 9)

### Bước 1: Nâng cấp Core Notification Service
- Sửa lại `NotificationService` (hoặc chuyển nó về tầng `SmartLMS.Business` thay vì ở `SmartLMS.Web` để tái sử dụng dễ hơn).
- Inject `SmartLMSContext` vào Service này.
- Khi gọi `NotifyUserAsync`, hệ thống phải thực hiện 2 việc song song:
  1. Tạo record `Notification` và lưu vào DB (`SaveChangesAsync`).
  2. Bắn SignalR payload chứa thông tin thông báo (id, title, message, link) tới client.

### Bước 2: API Quản lý thông báo
- Xây dựng `NotificationApiController` với các endpoint:
  - `GET /api/NotificationApi`: Lấy 10-20 thông báo gần nhất của User đang đăng nhập.
  - `GET /api/NotificationApi/unread-count`: Đếm số thông báo chưa đọc để hiển thị badge đỏ.
  - `POST /api/NotificationApi/{id}/read`: Đánh dấu thông báo đã đọc.
  - `POST /api/NotificationApi/read-all`: Đánh dấu đọc tất cả.

### Bước 3: Client-Side & UI Integration (Trang Diễn đàn)
- Bổ sung icon Chuông thông báo vào Header của `_CommunityLayout.cshtml`.
- Khởi tạo kết nối SignalR từ Client JS tới `/dashboardHub` hoặc `/notificationHub`.
- Khi nhận sự kiện `ReceiveNotification`, tăng số đếm badge đỏ lên 1, đồng thời hiển thị một Toast Message (popup nhỏ góc màn hình).
- Bấm vào Chuông sẽ hiện Dropdown danh sách các thông báo lấy từ API.

### Bước 4: Tích hợp vào các Module nghiệp vụ
- **Rating:** Khi User A đánh giá User B -> Bắn thông báo cho User B ("A vừa đánh giá bạn 5 sao").
- **Backlink:** Khi bài viết của User A bị User B trích dẫn `[[post:ID]]` -> Bắn thông báo cho User A ("B vừa nhắc đến bài viết của bạn").
- **QA/Group/Event:** Nhắc nhở có bình luận mới.

---

## 3. Script kiểm thử (Test Script)
Script này sẽ giả lập việc tạo ra các thao tác sinh thông báo (như đánh giá) và kiểm tra xem Database đã thực sự lưu thông báo đó chưa, đồng thời verify luồng SignalR.

**Tên file:** `analyze_signalr_realtime.cjs` (Đã được tạo sẵn trong thư mục gốc)
