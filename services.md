# ⚙️ DANH SÁCH DỊCH VỤ (SERVICES) & CƠ CHẾ VẬN HÀNH

Tài liệu này giải thích vai trò của các lớp xử lý nghiệp vụ (Business Logic) và cách chúng phối hợp với nhau.

---

## 🏗️ 1. CƠ CHẾ "GỌI" DỊCH VỤ (DEPENDENCY INJECTION)

Hệ thống sử dụng cơ chế **Dependency Injection (DI)**. Các Controller không bao giờ tự tạo mới dịch vụ bằng lệnh `new Service()`. Thay vào đó, chúng "yêu cầu" dịch vụ qua hàm khởi tạo (Constructor).

**Ví dụ luồng đi:**
`Trình duyệt` -> `CourseController` -> `ICourseService` -> `IRepository` -> `Database`.

---

## 🛠️ 2. DANH MỤC CÁC DỊCH VỤ CHÍNH

### A. Nhóm Dịch vụ Nghiệp vụ (Business Core)
| Dịch vụ | Vai trò | Cách gọi (Example) |
| :--- | :--- | :--- |
| **CourseService** | Quản lý khóa học, trạng thái, và thống kê. | `courseService.GetAllCoursesAsync()` |
| **StudentService** | Quản lý thông tin học viên và lộ trình học. | `studentService.GetProfileAsync(id)` |
| **AssessmentService** | Xử lý bài thi, câu hỏi và chấm điểm tự động. | `assessmentService.SubmitExamAsync(dto)` |
| **CohortService** | Quản lý các lớp học (Cohorts) và thành viên. | `cohortService.AddStudentToCohort(id)` |

### B. Nhóm Dịch vụ AI & Phân tích (Intelligence)
| Dịch vụ | Vai trò | Tệp tin nguồn |
| :--- | :--- | :--- |
| **PredictionService** | Sử dụng ML.NET để dự báo rủi ro học viên bỏ học. | `PredictionService.cs` |
| **ReportingService** | Tổng hợp dữ liệu thành báo cáo doanh thu/biểu đồ. | `ReportingService.cs` |
| **ScoringEngine** | Tính toán điểm số và cấp huy hiệu (Badge) dựa trên luật Gamification. | `ScoringEngine.cs` |

### C. Nhóm Dịch vụ Tích hợp (Integrations)
| Dịch vụ | Vai trò | Đối tác tích hợp |
| :--- | :--- | :--- |
| **VNPayGateway** | Tạo URL thanh toán và xử lý IPN (phản hồi từ bank). | [VNPay] |
| **ZoomIntegrationService** | Tạo phòng học trực tuyến, quản lý lịch họp Zoom. | [Zoom SDK] |
| **S3StorageService** | Lưu trữ ảnh/video khóa học lên đám mây (AWS S3/MinIO). | [Cloud Storage] |
| **EmailService** | Gửi thông báo, mã OTP, xác nhận thanh toán qua SMTP. | [MailKit] |

### D. Nhóm Dịch vụ Hạ tầng (Infrastructure)
| Dịch vụ | Vai trò | Công nghệ |
| :--- | :--- | :--- |
| **RabbitMQBus** | Gửi tin nhắn giữa các module một cách không đồng bộ. | [RabbitMQ] |
| **SqlService** | Thực thi các lệnh SQL đặc biệt cho Master Console. | [Dapper / SQL Client] |
| **WebhookService** | Gửi thông báo đến các hệ thống bên ngoài khi có sự kiện. | [HTTP Client] |

---

## 🔄 3. CHU TRÌNH XỬ LÝ MỘT REQUEST (VÍ DỤ)

Khi một học viên nhấn **"Thanh toán khóa học"**:
1. **OrderController** nhận request.
2. Nó gọi **VNPayGateway** để lấy link thanh toán.
3. Sau khi trả tiền, **VNPay** gọi lại (Callback).
4. **OrderController** gọi **CourseService** để mở khóa học cho học viên.
5. Đồng thời gọi **MessageBus** (RabbitMQ) để gửi một tin nhắn "Có đơn mới".
6. **EmailService** (đang chờ tin nhắn) sẽ tự động gửi Mail cảm ơn cho học viên.

---
## 📄 CÁCH ĐĂNG KÝ DỊCH VỤ
Bạn có thể xem cách tất cả các dịch vụ này được "khai báo" với hệ thống tại file:
👉 **[Program.cs](file:///c:/code/asp.net/SmartLMS.Web/Program.cs)** (Từ dòng 137 đến 168).

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
