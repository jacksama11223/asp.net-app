# Báo Cáo Tích Hợp & Đề Xuất Phát Triển Modules

*Ngày tạo: 14:18:37 26/5/2026*

## 1. Kết Quả Kiểm Tra Kết Nối Codebase (Gap Analysis)

✅ **Community Controller:** Tồn tại và đã khai báo các trang Razor MVC.

### Chi tiết Endpoint Community:
- **QA**: ❌ Chưa có Action Method.
- **Groups**: ❌ Chưa có Action Method.
- **Events**: ❌ Chưa có Action Method.
- **Resources**: ❌ Chưa có Action Method.
- **Members**: ❌ Chưa có Action Method.
- **Leaderboard**: ❌ Chưa có Action Method.
- **Mentor**: ✅ Đã tích hợp gọi Service Backend.

## 2. Các Đề Xuất Tính Năng Bắt Buộc (Bản Thiết Kế)

Dựa vào việc kiểm tra codebase, để hệ thống giao tiếp thông suốt giữa Frontend (Port 80), Community (Port 3080) và Backend (Port 5181), cần triển khai các Module sau:

### A. Nâng cấp CommunityController.cs (Cung cấp Data cho View)
Hiện tại, trang `Mentor`, `Resources`, `Groups` đang render HTML tĩnh hoặc dùng dữ liệu giả. Cần:
1. Viết API Endpoint bên phía **Port 5181 (Backend)** để trả về JSON.
2. Tại `CommunityController` (Port 3080), dùng `IHttpClientFactory` gọi sang 5181 lấy dữ liệu, truyền qua `ViewModel` xuống Razor View.

### B. Module Trợ Lý AI (Mentor API)
- **Cần tạo file:** `SmartLMS.Backend/Services/AiMentorService.cs`
- **Tính năng:** Tích hợp gọi Google Gemini / OpenAI lấy phản hồi code C#.
- **Controller mới:** `SmartLMS.Backend/Controllers/MentorApiController.cs` để xử lý tin nhắn chat của học viên.

### C. Quản lý Phiên Đăng Nhập Xuyên Suốt (Single Sign-On SSO)
- Để user đăng nhập ở cổng 80 (React) nhưng qua cổng 3080 (MVC) vẫn giữ Auth Cookie:
- **Cần làm:** Sửa `Program.cs` ở cả 2 service để trỏ chung DataProtection Key vào Redis và set `Cookie.Domain = ".141.253.114.218"` (hoặc localhost).

## 3. Kế Hoạch Viết Code (Action Plan)
1. Thêm Model `AiChatMessage` vào `SmartLMS.Models`.
2. Tạo `MentorApiController` ở Backend.
3. Cập nhật trang Razor `Mentor.cshtml` để gọi API chat thay vì dùng Javascript cứng.
