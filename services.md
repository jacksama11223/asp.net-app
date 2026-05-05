# Kiểm toán Hệ thống: Services & Controllers (SmartLMS)

Bản tài liệu này cung cấp cái nhìn toàn diện về hiện trạng các thành phần logic trong hệ thống và các hướng cải thiện để đạt chuẩn Enterprise.

---

## 1. Danh mục Service & Interface (SmartLMS.Business)

Hiện tại hệ thống đã có bộ khung Service khá tốt, nhưng một số chỗ vẫn còn trộn lẫn logic.

| Interface | Implementation | Trạng thái | Ghi chú |
| :--- | :--- | :--- | :--- |
| `ICourseService` | `CourseService` | Hoàn thiện | Xử lý CRUD, Cache, Soft Delete. |
| `IUserService` | `UserService` | Hoàn thiện | Auth, RBAC, Blind Indexing. |
| `IAssessmentService`| `AssessmentService` | Hoàn thiện | Thi cử, Leaderboard, XP. |
| `IPredictionService`| `PredictionService` | Hoàn thiện | AI Dropout Prediction (ML.NET). |
| `IReportingService` | `ReportingService` | Cơ bản | Dashboard stats, Charts. |
| `IPaymentGateway` | `VNPayGateway` | Hoàn thiện | Tích hợp VNPay. |
| `IStorageService` | `S3StorageService` | Hoàn thiện | Upload AWS S3. |
| `IWebhookService` | `WebhookService` | Hoàn thiện | Hangfire + HMAC. |
| `IEmailService` | `EmailService` | Cơ bản | Gửi mail thông báo. |
| `ISqlService` | `SqlService` | Cơ bản | Thực thi SQL trực tiếp (Dapper). |
| `IApiKeyService` | `ApiKeyService` | Cơ bản | Quản lý API keys. |
| `IScoringEngine` | `ScoringEngine` | Hoàn thiện | Thuật toán tính điểm. |
| `ICertificateService`| `CertificateService` | Mới | Cấp chứng chỉ PDF. |
| `IZoomService` | `ZoomIntegrationService`| Cơ bản | Tạo phòng họp Zoom. |
| `IAffiliateService` | `AffiliateService` | Cơ bản | Quản lý hoa hồng. |

---

## 2. Danh mục Controllers (SmartLMS.Web)

Hệ thống chia làm 2 dạng: **Web Controller** (trả về View) và **Api Controller** (trả về JSON cho Frontend/Mobile).

### A. Web Controllers (Server-Side Rendering)
- `CourseManagementController`: Quản lý toàn bộ khóa học.
- `AssessmentController`: Giao diện thi và bảng xếp hạng.
- `UserManagementController`: Quản lý danh sách người dùng.
- `DashboardController`: Trang chủ quản trị.
- `PaymentController`: Xử lý luồng thanh toán VNPay.
- `CohortController`: Quản lý lớp học.
- `CouponController`: Quản lý mã giảm giá.
- `RevenueController`: Báo cáo doanh thu.

### B. Api Controllers (Dành cho Frontend React/Vue/Mobile)
- `AssessmentApiController`: API lấy câu hỏi, nộp bài.
- `AuthApiController`: API đăng nhập/đăng ký (JWT).
- `PublicPaymentApiController`: Webhook VNPay/SePay và API thanh toán cho Frontend.
- `IAMController`: API quản lý quyền và phân tầng tổ chức.

---

## 3. Các khoảng trống (Missing Gaps) & Hướng cải thiện

Qua nghiên cứu, hệ thống đang **THIẾU** hoặc cần **TÁCH BIỆT** các thành phần sau:

### 1. Thiếu `OrderService` / `InvoiceService`
- **Hiện trạng:** Logic tạo hóa đơn và cập nhật trạng thái "Paid" đang nằm rải rác ở `PaymentController` và `PublicPaymentApiController`.
- **Cải thiện:** Cần tạo một Service riêng để quản lý vòng đời hóa đơn, tính toán thuế/giảm giá tập trung.

### 2. Thiếu `CurriculumService` (Module & Lesson)
- **Hiện trạng:** Logic thêm Module/Lesson đang được viết trực tiếp trong `CourseManagementController` (Web layer).
- **Cải thiện:** Tách ra `ICurriculumService` để sau này API Mobile cũng có thể gọi vào để thêm nội dung khóa học.

### 3. Thiếu `NotificationService` đa kênh
- **Hiện trạng:** Chỉ mới có Email.
- **Cải thiện:** Cần một service trung tâm để gửi thông báo qua SignalR (Real-time), Email, và Webhook cùng lúc.

### 4. Thiếu `AuditLogService` chuyên sâu
- **Hiện trạng:** Việc ghi log hành động người dùng đang làm thủ công trong DB Context hoặc Controller.
- **Cải thiện:** Tạo một Service để ghi log không đồng bộ (Async) toàn bộ hành động nhạy cảm của Admin.

### 5. Frontend Integration Gap
- **Vấn đề:** Các Controller Web (`CourseManagementController`) đang nắm giữ quá nhiều logic nghiệp vụ mà API không có.
- **Giải pháp:** Chuyển dịch toàn bộ logic từ Controller vào Service. Sau đó cả Web Controller và Api Controller chỉ việc gọi vào Service đó.

---

## 4. Kế hoạch hành động đề xuất

1.  **Refactor Course Logic:** Chuyển các thao tác Module/Lesson từ `CourseManagementController` sang `CourseService`.
2.  **Centralize Payment:** Tạo `IOrderService` để hợp nhất luồng xử lý VNPay và SePay.
3.  **Modernize Notification:** Triển khai `NotificationService` sử dụng SignalR để đẩy thông báo "Học viên vừa nộp bài" lên Dashboard Admin ngay lập tức.
4.  **Security Audit:** Nâng cấp `UserService` để hỗ trợ Multi-Factor Authentication (MFA).

---
*Tài liệu này sẽ được cập nhật khi có các service mới được triển khai.*
