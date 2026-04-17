# Phân tích Tình trạng Hệ thống SmartLMS.AI (Bản Enterprise SaaS)

Tài liệu này đánh giá chi tiết tình trạng thực tế của 6 Phân hệ Quản trị Nâng cao vừa được tích hợp, đồng thời liệt kê các thư viện công nghệ tương ứng.

---

## 🛠️ 1. Danh mục Thư viện & Công nghệ (Tech Stack) mới bổ sung

Dưới đây là các "vũ khí" công nghệ vừa được cài đặt để phục vụ các tính năng Enterprise:

| Phân hệ | Thư viện / Công nghệ | Vai trò chi tiết | Trạng thái cài đặt |
| :--- | :--- | :--- | :--- |
| **Bảo mật (IAM)** | `Serilog` & `AuditLogFilter` | Ghi nhật ký vận hành (Audit Trail) của Admin. | ✅ Đã cấu hình |
| **Khảo thí** | `jQuery Steps` | Giao diện Wizard chia bước làm bài thi. | ✅ Đã tích hợp CDN |
| **Game hóa** | `Canvas Confetti` | Hiệu ứng pháo giấy chúc mừng khi hoàn thành. | ✅ Đã tích hợp CDN |
| **Marketing** | `DinkToPdf` | Thư viện C++ WebKit để render HTML sang PDF. | ✅ Đã cài NuGet |
| **Marketing** | `Quill.js` | Trình soạn thảo văn bản Rich Text (Email/Cert). | ✅ Chờ tích hợp View |
| **Hỗ trợ (HD)** | `jKanban` | Bảng kéo thả Ticket (giống Trello). | ✅ Đã tích hợp CDN |
| **Hỗ trợ (HD)** | `ML.NET` (Text Class) | AI tự động phân loại và lọc bình luận độc hại. | ✅ Đã huấn luyện mẫu |
| **Đối tác** | `QRCoder` | Sinh mã QR Code động cho cộng tác viên. | ✅ Đã cài NuGet |
| **Tích hợp** | `Zoom API` (HttpClient) | Kết nối tạo phòng họp trực tuyến. | ✅ Đã viết Service |

---

## 🚧 2. Các tính năng chưa hoạt động / Cần hoàn thiện (Half-done Features)

Dưới đây là danh sách các phần "khung xương" đã có nhưng cần đổ thêm logic để chạy thực tế:

### 📂 Phân hệ 6: Phân quyền & Bảo mật (IAM)
- [ ] **DB Audit Logs**: Hiện tại `AuditLogFilter` mới chỉ ghi log ra Console/File. Cần tạo bảng `SystemAuditLogs` trong SQL để Admin xem trực tiếp trên Web.
- [ ] **Role Matrix UI**: Chưa có giao diện để Admin tích chọn quyền (Checklist) cho từng vai trò Giảng viên/Kế toán.

### 📂 Phân hệ 7: Khảo thí & Trò chơi hóa
- [ ] **Ngân hàng câu hỏi (Question Bank)**: Giao diện `QuizWizard` đang dùng câu hỏi Fix cứng. Cần xây dựng CRUD để bốc câu hỏi từ Database.
- [ ] **XP Engine**: Tiền tố cộng điểm kinh nghiệm (XP) sau khi làm bài xong mới chỉ là thông báo giả lập, chưa lưu vào User Profile.

### 📂 Phân hệ 8: Tương tác & Marketing
- [ ] **Certificate Designer**: `CertificateService` đã render được PDF, nhưng cần một trang cho phép Admin tải ảnh phôi bằng khen lên và căn chỉnh vị trí chữ.
- [ ] **Auto Email Flow**: Logic gửi mail tự động dựa trên hành vi (bỏ giỏ hàng, đăng ký mới) đang chờ setup vào Hangfire.

### 📂 Phân hệ 9: Chăm sóc & Kiểm duyệt
- [ ] **Kanban Syncing**: Kéo thả Ticket trên giao diện đã mượt, nhưng cần viết Endpoint `/Helpdesk/UpdateStatus` để lưu vị trí mới của Ticket vào Database.
- [ ] **AI Training Data**: `ModerationService` hiện dùng 6 câu mẫu. Cần nạp file `.tsv` chứa hàng ngàn câu comment thật để AI bắt lỗi chính xác hơn.

### 📂 Phân hệ 10: Tiếp thị liên kết (Affiliate)
- [ ] **Revenue Split Logic**: Cần cài đặt công thức chia tiền (Ví dụ: 70/30) vào hàm thanh toán để tự động tính hoa hồng cho Giảng viên/KOL.
- [ ] **QR Display**: Service sinh mã đã xong, cần gắn vào trang cá nhân của Cộng tác viên để họ lấy mã đi quảng cáo.

### 📂 Phân hệ 11: Tích hợp & Mở rộng
- [ ] **Zoom Credentials**: File `ZoomIntegrationService.cs` đang để placeholder (YOUR_CLIENT_ID). Cần chuyển vào `appsettings.json` bảo mật.
- [ ] **Webhook Receiver**: Cần viết logic xử lý khi các hệ thống bên ngoài (VNPAY, HubSpot) bắn tín hiệu ngược lại về LMS.

---

## 💡 Tư duy phát triển tiếp theo (Next Steps)
1. **Ưu tiên 1**: Kết nối `jKanban` với Database để tính năng Helpdesk có thể dùng được ngay.
2. **Ưu tiên 2**: Hoàn thiện `CertificateService` vì đây là tính năng "WOW" nhất thu hút học viên.
3. **Ưu tiên 3**: Bảo mật hóa `AuditLogFilter` bằng cách lưu vào SQL Server.

---
*Tài liệu này được cập nhật vào: 17/04/2026 - Bởi AI Auditor (Enterprise SaaS Update).*
