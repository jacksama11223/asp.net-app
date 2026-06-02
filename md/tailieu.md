# 📚 TÀI LIỆU HƯỚNG DẪN TOÀN DIỆN - SMARTLMS.AI

Tài liệu này giúp bạn nắm bắt toàn bộ kiến trúc và cách vận hành của hệ thống SmartLMS.AI.

---

## 🏗️ 1. KIẾN TRÚC HỆ THỐNG (ARCHITECTURE)
Dự án được xây dựng theo mô hình **N-Tier Architecture** (Kiến trúc phân lớp), giúp code sạch sẽ và dễ mở rộng.

| Thư mục / File | Chức năng | Tài liệu nên đọc |
| :--- | :--- | :--- |
| `SmartLMS.Web/` | **Tầng Trình diễn (UI)**: Chứa giao diện, controller và file tĩnh (CSS/JS). | [ASP.NET Core MVC Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/overview) |
| `SmartLMS.Business/` | **Tầng Nghiệp vụ (Logic)**: Chứa các Service xử lý tính toán, AI, và tích hợp bên thứ 3. | [Dependency Injection in .NET](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) |
| `SmartLMS.Data/` | **Tầng Dữ liệu (DataAccess)**: Kết nối Database, chứa Context và Repository. | [Entity Framework Core Guide](https://learn.microsoft.com/en-us/ef/core/) |
| `SmartLMS.Models/` | **Tầng Thực thể (Entities)**: Định nghĩa các bảng dữ liệu (Bảng Course, User, v.v.) | [C# Classes and Objects](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/classes) |

---

## 🤖 2. TRÍ TUỆ NHÂN TẠO (AI/ML)
Hệ thống sử dụng AI để dự báo nguy cơ bỏ học của sinh viên.

- **File quan trọng**: `SmartLMS.Business/PredictionService.cs`
- **Tài liệu nghiên cứu**: 
    - [ML.NET Tutorial: Binary Classification](https://learn.microsoft.com/en-us/dotnet/machine-learning/tutorials/sentiment-analysis) (Bài giảng về thuật toán SDCA Logistic Regression đang dùng).
    - [Explainable AI (XAI) in ML.NET](https://learn.microsoft.com/en-us/dotnet/machine-learning/how-to-guides/explain-machine-learning-model-predictions-ml-net) (Cách AI giải thích đóng góp của từng chỉ số).

---

## 📦 3. TRIỂN KHAI & CƠ SỞ HẠ TẦNG (DEVOPS)
Cách hệ thống được đóng gói và "bay" lên mạng.

- **File quan trọng**: 
    - `Dockerfile`: Hướng dẫn xây dựng hình ảnh ứng dụng.
    - `docker-compose.yml`: Cấu hình "bộ khung" gồm Web, RabbitMQ và Tunnel.
- **Tài liệu nghiên cứu**:
    - [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/): Cách quản lý container.
    - [Cloudflare Tunnel (Cloudflared)](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/): Cách mở link public miễn phí.

---

## 💳 4. TÍCH HỢP & THANH TOÁN (INTEGRATIONS)
Các dịch vụ bên ngoài giúp SmartLMS thành một Enterprise App.

- **Thanh toán VNPay**: `SmartLMS.Business/VNPayGateway.cs` -> [VNPay API Documentation](https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/)
- **Hàng đợi RabbitMQ**: `SmartLMS.Business/MessageBus/RabbitMQBus.cs` -> [RabbitMQ Get Started](https://www.rabbitmq.com/getstarted.html)
- **Công việc ngầm Hangfire**: `app.UseHangfireDashboard()` trong `Program.cs` -> [Hangfire Docs](https://docs.hangfire.io/en/latest/)

---

## 🛠️ 5. CÔNG CỤ QUẢN TRỊ ĐẶC BIỆT
Những "vũ khí" bí mật chỉ Admin mới có.

- **Master Console**: `SmartLMS.Web/Controllers/SqlManagementController.cs` (Giúp bạn gõ SQL trực tiếp trên Web).
- **System Pulse**: `SmartLMS.Web/Controllers/DashboardController.cs` (Giám sát sức khỏe server).

---

## 🚀 6. CÁCH HỌC THÔNG MINH BẰNG NOTEBOOKLM
NotebookLM là trợ thủ đắc lực nhất để bạn "đọc hiểu" hàng chục nghìn dòng code này mà không bị chóng mặt.

### Các bước thực hiện:
1. **Nạp nguồn (Sources)**: Hãy copy nội dung file `tailieu.md` này, cùng với file `Program.cs`, các file trong thư mục `Controllers` và `Services` vào NotebookLM.
2. **Sử dụng "Deep Dive Audio"**: Chọn tính năng tạo Audio Overview. Bạn sẽ được nghe 2 chuyên gia AI thảo luận về kiến trúc SmartLMS của bạn như một bản tin công nghệ.
3. **Các câu lệnh (Prompts) gợi ý cực hay**:
    - *"Dựa trên code hiện tại, hãy giải thích luồng đi của dữ liệu từ khi một học viên đăng ký khóa học đến khi nó được lưu vào SQL Server."*
    - *"Hãy tìm các điểm có thể gây ra lỗi bảo mật hoặc hiệu năng trong tầng Business."*
    - *"Tạo cho tôi một bài kiểm tra trắc nghiệm 10 câu về cách vận hành hệ thống này."*
    - *"Viết một bản tóm tắt dành cho lãnh đạo (Executive Summary) về các tính năng AI của dự án này."*

---

## 🛤️ 7. LỘ TRÌNH HỌC TẬP (LEARNING ROADMAP)

### Mức độ 1: Làm quen (1-2 ngày)
- Đọc `tailieu.md` và chạy thử dự án trên Docker.
- Tập trung vào: `SmartLMS.Web/Views/Shared/_Layout.cshtml` để hiểu giao diện.

### Mức độ 2: Hiểu nghiệp vụ (3-5 ngày)
- Đọc các Service trong `SmartLMS.Business/`.
- Tập trung vào: `CourseService.cs` và `PredictionService.cs` (AI).

### Mức độ 3: Làm chủ hạ tầng (1 tuần)
- Nghiên cứu `Dockerfile`, `docker-compose.yml` và cách kết nối SQL Server.
- Tập trung vào: Cấu hình Hybrid Database và Cloudflare Tunnel.

### Mức độ 4: Kiến trúc sư (Nâng cao)
- Nghiên cứu cách Scale triệu request, dùng Redis và triển khai Oracle Cloud.
- Tập trung vào: `api_optimization_plan.md` và `million_scale_plan.md`.

---

## 💡 LỜI KHUYÊN CHO BẠN
Nếu bạn muốn hiểu nhanh nhất, hãy đọc file **`SmartLMS.Web/Program.cs`** đầu tiên. Đây là "điểm khởi đầu" nơi tất cả các linh kiện được lắp ráp vào nhau.

---

## 💎 8. DANH MỤC TÍNH NĂNG CỐT LÕI (CORE FEATURE CATALOG)
Dùng danh sách này làm nguồn (source) trong NotebookLM để AI giải thích các luồng nghiệp vụ cho bạn.

### A. Nhóm AI & Dữ liệu thông minh
- **Dự báo bỏ học (Dropout Prediction)**: Dự đoán rủi ro dựa trên tiến độ và điểm số.
    - *Code*: `PredictionService.cs`, `StudentsController.cs`
- **Giải thích AI (XAI)**: Phân tích lý do tại sao AI đưa ra kết quả đó.
    - *Code*: `PredictionService.cs` (hàm CalculateFeatureContribution).
- **Tự động huấn luyện (Auto-Retrain)**: Hệ thống tự học lại dữ liệu mới hàng tuần.
    - *Code*: `Program.cs` (Hangfire RecurringJob).

### B. Nhóm Quản lý Học tập & Nội dung
- **Course Lifecycle**: Quản lý vòng đời khóa học (Nháp -> Xuất bản -> Lưu trữ).
    - *Code*: `CourseService.cs`, `CourseManagementController.cs`
- **Student Tracker**: Theo dõi lộ trình học tập và bảng điểm thời gian thực.
    - *Code*: `StudentService.cs`, `StudentsController.cs`
- **Quiz & Gamification**: Hệ thống bài tập, bảng xếp hạng và huy hiệu (Badge).
    - *Code*: `AssessmentService.cs`, `ScoringEngine.cs`

### C. Nhóm Tài chính & Enterprise
- **Thanh toán VNPay**: Tích hợp cổng thanh toán trực tuyến.
    - *Code*: `VNPayGateway.cs`, `PaymentController.cs`
- **Báo cáo doanh thu (Revenue Audit)**: Đối soát tài chính và biểu đồ tăng trưởng.
    - *Code*: `ReportingService.cs`, `RevenueController.cs`
- **Marketing & Coupons**: Hệ thống mã giảm giá và quản lý kho chứng chỉ.
    - *Code*: `AffiliateService.cs`, `CouponController.cs`

### D. Nhóm Vận hành Admin (Power Tools)
- **Master Console EXEC**: Thực thi lệnh SQL trực tiếp từ giao diện web (Cực mạnh).
    - *Code*: `SqlService.cs`, `SqlManagementController.cs`
- **System Pulse**: Giám sát CPU/RAM và trạng thái Docker 24/7.
    - *Code*: `DashboardController.cs`, `DashboardHub.cs` (SignalR).
- **Audit Logs**: Ghi lại lịch sử ai đã làm gì trên hệ thống để bảo mật.
    - *Code*: `AuditLogFilter.cs` (Middleware).

### E. Nhóm Hạ tầng & Hiệu năng (Optimization)
- **High-Concurrency Caching**: Dùng RAM để phản hồi triệu request cực nhanh.
    - *Code*: `Program.cs` (AddOutputCache), `CourseService.cs` (IMemoryCache).
- **Content Compression**: Nén dữ liệu truyền tải để tiết kiệm băng thông.
    - *Code*: `Program.cs` (AddResponseCompression).
- **Cloud Tunneling**: Đường hầm công khai qua Cloudflare cho Docker.
    - *Code*: `docker-compose.yml`, `Dockerfile`.

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
