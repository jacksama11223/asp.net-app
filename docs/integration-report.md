# 🔍 Báo Cáo Kiểm Tra Tích Hợp API - Community Hub (Port 3080)

*Tạo lúc: 14:31:13 26/5/2026*

---

## 1. Bảng Tổng Quan Trạng Thái Kết Nối Từng Trang

| Trang | Gọi API 5181 | Auth Check | Redirect Login | SignalR | CSRF | Nút Giả Lập | Form Thật |
|---|---|---|---|---|---|---|---|
| **Events** | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ 2 nút | ❌ |
| **Groups** | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ 2 nút | ❌ |
| **Index** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Sạch | ❌ |
| **Leaderboard** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Sạch | ❌ |
| **Members** | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ 2 nút | ❌ |
| **Mentor** | ✅ | ✅ | ❌ | ❌ | ❌ | ⚠️ 2 nút | ❌ |
| **QA** | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ 4 nút | ❌ |
| **Resources** | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ 4 nút | ❌ |

---

## 2. Chi Tiết Phân Tích Từng Trang & Đề Xuất Fix

### 📄 Trang QA
- ❌ Nút **"Đăng câu hỏi"** → Cần gọi `POST /api/community/questions` thay vì `showToast()`.
- ❌ Nút **"Gửi câu trả lời"** → Cần gọi `POST /api/community/answers` + gắn `[Authorize]` check.
- ❌ Chưa có redirect khi Guest bấm → Cần thêm `User.IsAuthenticated` check → redirect đến `/Auth/Login`.

### 📄 Trang Groups
- ❌ Nút **"Tạo nhóm học"** → Cần gọi `POST /api/groups` thay vì `showToast()`.
- ❌ Nút **"Tham gia nhóm"** → Cần gọi `POST /api/groups/{id}/join`.
- ❌ Chưa có **SignalR** để thông báo realtime khi có thành viên mới vào nhóm.

### 📄 Trang Events
- ❌ Nút **"Đăng ký sự kiện"** → Cần gọi `POST /api/events/{id}/register`.
- ❌ Nút **"Chia sẻ"** → Cần gọi `POST /api/events/{id}/share` để cộng XP.

### 📄 Trang Resources
- ❌ Nút **"Upload tài liệu"** → Cần gọi `POST /api/resources/upload` với `FormData`.
- ❌ Nút **"Tải xuống"** → Cần gọi `GET /api/resources/{id}/download` và log Activity.

### 📄 Trang Members
- ❌ Nút **"Nhắn tin"** → Cần kết nối SignalR hoặc gọi `POST /api/messages`.
- ❌ Nút **"Kết bạn/Follow"** → Cần gọi `POST /api/users/{id}/follow`.

### 📄 Trang Leaderboard
- ⚠️ Dữ liệu XP và Ranking đang được tạo **Random** trong Controller.
- ❌ Cần gọi thật `GET /api/leaderboard?period=week` từ Backend để lấy dữ liệu chuẩn.

### 📄 Trang Mentor
- ✅ Đã có `fetch("/api/MentorApi/ask")` - ĐÚNG HƯỚNG!
- ⚠️ Backend Controller đang **Mock** (giả lập), chưa kết nối Gemini/OpenAI API thật.

### 📄 Trang Index
- ❌ Toàn bộ bài viết Forum đang render từ **Backend Controller**, nhưng không có API AJAX để phân trang.
- ❌ Chưa có thanh Tìm kiếm bài viết realtime (gọi `GET /api/forum?q=keyword`).

---

## 3. Kế Hoạch Cookie Chung (SSO: Port 80 ↔ 3080)


> [!IMPORTANT]
> Đây là tính năng **ưu tiên cao nhất** cần triển khai để User không bị bắt đăng nhập lại khi chuyển từ trang chủ (Port 80) sang Community (Port 3080).

### Cơ chế hoạt động
Cả 2 ứng dụng (Backend Port 5181 làm Auth Server và Community Port 3080 làm Consumer) sẽ chia sẻ:
1. **Cùng Data Protection Key** lưu trên **Redis** (đã có trong docker-compose).
2. **Cùng tên Cookie** `SmartLMS.Auth` với `Domain` là `.141.253.114.218` (hoặc domain chính thức).

### Code cần thêm vào `Program.cs` của Community (Port 3080)

```csharp
// 1. Cài package: StackExchange.Redis + Microsoft.AspNetCore.DataProtection.StackExchangeRedis
// dotnet add package Microsoft.AspNetCore.DataProtection.StackExchangeRedis

var redis = ConnectionMultiplexer.Connect(
    builder.Configuration["Redis__ConnectionString"] ?? "redis:6379"
);

builder.Services.AddDataProtection()
    .SetApplicationName("SmartLMS")               // PHẢI GIỐNG hệt với Backend
    .PersistKeysToStackExchangeRedis(redis, "DataProtection-Keys");

builder.Services.AddAuthentication("Identity.Application")
    .AddCookie("Identity.Application", options =>
    {
        options.Cookie.Name     = ".SmartLMS.Auth";
        options.Cookie.Domain   = ".141.253.114.218"; // Dùng domain thật khi có
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.LoginPath       = "/Auth/Login";      // Trang login riêng của Community
        options.ExpireTimeSpan  = TimeSpan.FromDays(7);
        options.SlidingExpiration = true;
    });
```

### Danh sách file cần tạo/sửa
| File | Hành động | Ghi chú |
|---|---|---|
| `SmartLMS.Community/Program.cs` | Sửa | Thêm AddDataProtection + Cookie Domain |
| `SmartLMS.Community/Controllers/AuthController.cs` | Tạo mới | Login/Register/Logout Actions |
| `SmartLMS.Community/Views/Auth/Login.cshtml` | Tạo mới | UI Glassmorphism đẹp mắt |
| `SmartLMS.Community/Views/Auth/Register.cshtml` | Tạo mới | UI Glassmorphism + Form validation |
| `SmartLMS.Community/Views/Shared/_CommunityLayout.cshtml` | Sửa | Header: hiển thị tên user nếu đã đăng nhập |
| `SmartLMS.Backend/Program.cs` | Sửa | Đồng bộ SetApplicationName + Cookie Domain |

---
## 4. Thứ Tự Ưu Tiên Thực Thi

| # | Task | Độ ưu tiên | Ảnh hưởng |
|---|---|---|---|
| 1 | Tạo trang Login/Register (Port 3080) | 🔴 Cao | Block toàn bộ User flow |
| 2 | Cấu hình Shared Cookie (SSO) | 🔴 Cao | Trải nghiệm xuyên suốt |
| 3 | Kết nối API Q&A (Gửi câu hỏi/trả lời thật) | 🟠 Trung bình | Tính năng cốt lõi |
| 4 | Kết nối API Groups (Join/Leave) | 🟠 Trung bình | Cốt lõi cộng đồng |
| 5 | API Leaderboard dữ liệu thật | 🟡 Thấp | UX Enhancement |
| 6 | SignalR Real-time (Nhóm, Tin nhắn) | 🟡 Thấp | Premium Feature |
