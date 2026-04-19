# 🎯 ENDPOINT ROUTING: BỘ NÃO ĐIỀU HƯỚNG CỦA SMARTLMS.AI

Tài liệu này giải thích cách hệ thống của bạn chia tách quy trình "Tìm đường" và "Thực thi" thông qua hai Middleware: `UseRouting` và `UseEndpoints`.

---

## 🧐 1. SỰ KHÁC BIỆT CỐT LÕI (THE SPLIT)

Kể từ .NET 3.0, việc định tuyến không còn là một khối duy nhất. Оно được chia ra:

| Middleware | Vai trò | Trái tim trong Code |
| :--- | :--- | :--- |
| **UseRouting()** | **BỘ CHỌN (The Selector)**: Soi URL và tìm xem nó khớp với Action nào. | [Program.cs: L253](file:///c:/code/asp.net/SmartLMS.Web/Program.cs#L253) |
| **UseEndpoints()** | **BỘ THỰC THI (The Executor)**: Thực sự gọi hàm C# và trả về kết quả. | [Program.cs: L254+](file:///c:/code/asp.net/SmartLMS.Web/Program.cs#L254) |

---

## 🏷️ 2. USEROUTING(): NGƯỜI DÁN NHÃN THÔNG MINH

Khi yêu cầu đi qua `app.UseRouting()`:
1.  Nó nhìn vào URL (ví dụ: `/CourseManagement/Index`).
2.  Nó kiểm tra danh sách các con đường (Routes) đã đăng ký.
3.  Nó **DÁN NHÃN** vào `HttpContext`: *"Yêu cầu này thuộc về Controller CourseManagement, Action Index"*.
4.  **QUAN TRỌNG**: Nó chưa chạy code của bạn. Nó chỉ mới "chốt đơn".

---

## ⚡ 3. USEENDPOINTS(): NGƯỜI THỰC THI TẬN TỤY

Đây là nơi tập hợp tất cả các "Đích đến" của hệ thống. Trong dự án của bạn (áp dụng phong cách .NET 6+ tối giản), các Endpoint được đăng ký trực tiếp:

### Danh mục các Điểm cuối trong Code:
1.  **MVC Controller (Giao diện chính)**:
    - Code: `app.MapControllerRoute(name: "default", ...)`
    - Tác dụng: Điều hướng mọi trang web thông thường.
2.  **SignalR Hubs (Realtime)**:
    - Code: `app.MapHub<DashboardHub>("/dashboardHub")`
    - Tác dụng: Tạo đường truyền tốc độ cao cho Dashboard.
3.  **Health Checks (Giám sát)**:
    - Code: `app.MapHealthChecks("/health")`
    - Tác dụng: Để Docker/Kubernetes kiểm tra xem App còn sống không.
4.  **Prometheus Metrics (Số liệu)**:
    - Code: `app.MapMetrics()`
    - Tác dụng: Cung cấp biểu đồ hiệu năng hệ thống.

---

## 🛡️ 4. TƯƠNG TÁC VỚI CÁC MIDDLEWARE KHÁC (THE SANDWICH)

Đây là lý do tại sao thứ tự trong `Program.cs` của bạn lại như vậy:

1.  `app.UseRouting()`: **CHỌN ĐÍCH ĐẾN**.
2.  `app.UseCors()` / `app.UseRateLimiter()`: Kiểm tra xem có được phép gọi đến đích đến này không.
3.  `app.UseAuthentication()`: Kiểm tra xem người gọi đến đích đến này là ai.
4.  `app.UseAuthorization()`: Kiểm tra xem người đó có quyền vào đích đến này không.
5.  **THỰC THI**: Hệ thống gọi Controller/Hub cụ thể.

**Tại sao Auth phải nằm giữa?**
Vì nếu không có `UseRouting` đứng trước để báo "Đích đến là trang Admin", thì `UseAuthorization` sẽ không biết người dùng định đi đâu để mà kiểm tra quyền!

---

## 📄 TỔNG KẾT TƯ DUY
- **UseRouting**: Là "Lễ tân" xem khách muốn gặp ai và ghi lại tên phòng lên áo khách.
- **Middleware ở giữa**: Là "Bảo vệ" kiểm tra xem khách có mang vũ khí hay có thẻ vào phòng đó không.
- **UseEndpoints**: Là "Nhân viên" trong phòng ra mở cửa và bắt đầu làm việc.

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
