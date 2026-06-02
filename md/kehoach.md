# 🚀 Lộ trình Phát triển Tiếp theo (SmartLMS.AI Roadmap)
**Ngày lập:** 18/04/2026
**Trạng thái:** Phase 5 (Học tập & Tài chính) - HOÀN TẤT (Hotfix DB Completed)

---

## 🏗️ Phase 6: Triển khai thực tế & Cloudization (Docker)
**Mục tiêu:** Chuyển đổi từ chạy máy cục bộ sang kiến trúc Container, sẵn sàng đẩy lên các nền tảng VPS/Cloud (AWS, Azure, DigitalOcean).

### 1. Đóng gói ứng dụng (Containerization)
- [ ] **Dockerfile**: Xây dựng Dockerfile tối ưu (Multi-stage build) để giảm kích thước image.
- [ ] **Docker Compose**: Cấu hình file compose để chạy đồng thời:
  - **App Service**: ASP.NET Core MVC.
  - **Database Service**: SQL Server (Express/Developer container).
  - **Caching Service**: Redis (để tối ưu tốc độ load dashboard).
- [ ] **Volume & Network**: Thiết lập lưu trữ dữ liệu bền vững (Persistence) và mạng nội bộ bảo mật.

### 2. Cloud Readiness
- [ ] **Environment Variables**: Chuyển toàn bộ cấu hình nhạy cảm (Connection String, VNPay Key) sang biến môi trường.
- [ ] **Health Checks**: Tích hợp endpoint `/health` để Docker/Kubernetes giám sát trạng thái hệ thống.

---

## 📧 Phase 7: Hệ thống Marketing Automation (Event Bus)
**Mục tiêu:** Tự động hóa các tương tác với học viên để tăng tỉ lệ hoàn thành và doanh thu bằng cách sử dụng kiến trúc Hướng sự kiện (Event-Driven).

### 1. Hạ tầng Email Worker
- [ ] **Notification Worker**: Xây dựng một Background Service chuyên biệt lắng nghe `IMessageBus`.
- [ ] **Email Provider**: Tích hợp SendGrid hoặc Mailchimp thông qua API để gửi email chuyên nghiệp (tránh bị vào spam).

### 2. Các kịch bản Tự động hóa (Automation Scenarios)
- [ ] **Course Completion Path**: 
  - *Sự kiện:* `Course.Completed`.
  - *Hành động:* Gửi Email chúc mừng kèm Certificate (PDF) và tặng Coupon giảm giá 20% cho khóa học tiếp theo.
- [ ] **Early Warning Nudge (AI Core)**: 
  - *Sự kiện:* `Assessment.RiskDetected` (Phát hiện rủi ro từ AI).
  - *Hành động:* Gửi Email động viên từ hệ thống, kèm theo link các bài đọc thêm để hỗ trợ học viên.
- [ ] **Welcome Sequence**:
  - *Sự kiện:* `User.Enrolled`.
  - *Hành động:* Chuỗi 3 email giới thiệu lộ trình học tập hiệu quả.

---

## 🛠️ Trạng thái Hệ thống hiện tại
- **Database**: Bảng `Invoices` đã được khởi tạo và đối soát hoàn tất.
- **Dashboard**: Đã kết nối dữ liệu tài chính SaaS thực tế.
- **Event Bus**: Đã có `MockRabbitMQBus` sẵn sàng để nâng cấp lên RabbitMQ thật trong Phase 6.

> [!NOTE]
> Lộ trình này tập trung vào việc biến SmartLMS trở thành một sản phẩm thương mại thực thụ, có khả năng tự vận hành và tối ưu hóa doanh thu tự động.
