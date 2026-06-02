# 🛣️ MIDDLEWARE, ROUTING & ENDPOINTS TRONG SMARTLMS.AI

Tài liệu này giải thích cách một yêu cầu (Request) đi từ Internet vào hệ thống và tìm đến đúng tệp code cần xử lý.

---

## 🌊 1. MIDDLEWARE PIPELINE (THÁC NƯỚC XỬ LÝ)

Trong ASP.NET Core, Middleware là những đoạn mã xử lý theo thứ tự. Yêu cầu của bạn phải đi qua "Thác nước" này trong file `Program.cs`:

1.  **UseForwardedHeaders**: Chỉnh sửa địa chỉ IP và giao thức (giúp App hiểu đang chạy HTTPS qua Cloudflare).
2.  **ExceptionHandler**: "Lưới đỡ" cuối cùng nếu App gặp lỗi nghiêm trọng (hiện trang lỗi 500).
3.  **Swagger**: Công cụ tài liệu API (chỉ chạy ở cổng `/swagger`).
4.  **HttpsRedirection**: Ép người dùng dùng HTTPS cho an toàn.
5.  **ResponseCompression**: Nén dữ liệu để truyền đi nhanh hơn.
6.  **OutputCache**: Trả kết quả từ RAM nếu request nội dung cũ (Tăng tốc xử lý).
7.  **StaticFiles**: Trả về file CSS, JS, Hình ảnh từ thư mục `wwwroot`.
8.  **UseRouting**: **TRẠM QUYẾT ĐỊNH**. Tại đây hệ thống phân tích URL để biết sẽ đi đâu tiếp.
9.  **UseRateLimiter**: Giới hạn số lượng request để chống spam/DDoS.
10. **UseAuthentication**: Kiểm tra "Bạn là ai?" (Check Cookie/Token).
11. **UseAuthorization**: Kiểm tra "Bạn có quyền vào đây không?" (Check quyền Admin).

---

## 📍 2. CÁC ENDPOINTS (ĐIỂM CUỐI) TRONG HỆ THỐNG

Sau khi vượt qua các lớp Middleware, Request sẽ đến các **Endpoints** tại cuối file `Program.cs`:

### A. Định tuyến MVC (Default Route)
`app.MapControllerRoute(name: "default", pattern: "{controller=Dashboard}/{action=Index}/{id?}");`
- **Hoạt động**: Nếu bạn gõ `/Course/Detail/5`, nó sẽ gọi lớp `CourseController`, hàm `Detail` với tham số `id = 5`.

### B. SignalR Hubs (Kết nối thời gian thực)
- `app.MapHub<DashboardHub>("/dashboardHub")`
- `app.MapHub<GamificationHub>("/gamificationHub")`
- **Sử dụng**: Cập nhật biểu đồ và thông báo huy hiệu ngay lập tức trên màn hình học viên.

### C. Monitoring & DevOps (Giám sát)
- `app.MapHealthChecks("/health")`: Docker dùng link này để biết App còn "sống" hay không.
- `app.MapMetrics()`: Cung cấp dữ liệu cho hệ thống Prometheus/Grafana.

### D. Background Jobs
- `app.UseHangfireDashboard("/hangfire")`: Giao diện quản lý các tác vụ chạy ngầm.

---

## 🎯 3. TƯ DUY VỀ ĐỊNH TUYẾN (ROUTING LOGIC)

Trong toàn bộ source code, bạn sẽ thấy 2 kiểu định tuyến:

1.  **Định tuyến mặc định (Controller-based)**: Hầu hết các trang như `/Revenue`, `/Coupon`, `/Students` đều tuân theo cấu trúc thư mục trong `Controllers/`.
2.  **Định tuyến theo thuộc tính (Attribute Routing)**: Một số API đặc biệt có thể dùng `[Route("api/[controller]")]`.

---

## 🚀 4. HÀNH TRÌNH KỲ THÚ CỦA MỘT REQUEST (LUỒNG NỘI BỘ)

Đừng nhầm lẫn giữa định tuyến và chuyển hướng. Request không đi đâu xa, nó đi qua một "đường ống" nội bộ:

1.  **Tiếp nhận**: Kestrel (Web Server) nhận gói tin HTTP GET/POST từ Cloudflare.
2.  **Đánh nhãn (UseRouting)**: Khi đi qua `UseRouting`, hệ thống soi URL (ví dụ `/CourseManagement/Index/`). Nó tra cứu trong danh sách các Controller hiện có và dán một cái nhãn "Endpoint" lên gói tin: *"Yêu cầu này thuộc về CourseManagementController -> hàm Index"*.
3.  **Kiểm tra an ninh (Auth)**: Sau khi biết đích đến là đâu, các Middleware tiếp theo (Authentication/Authorization) sẽ kiểm tra xem bạn có đủ quyền để vào cái "đích đến" đó không.
4.  **Thực thi (MapControllerRoute)**: Đây là bước cuối cùng. Yêu cầu đi đến cuối đường ống và được thực thi.

---

## 🔮 5. CƠ CHẾ "TRIỆU HỒI" CONTROLLER (INVOCATION)

Làm sao hệ thống biết chạy file C# nào? Nó sử dụng cơ chế **Action Invoker**:

1.  **Nhờ vả DI**: Hệ thống không dùng `new Controller()`. Nó hỏi bộ máy DI (Dependency Injection) mà chúng ta học ở file `DI.md`: *"Tôi cần một đối tượng CourseManagementController, hãy nạp các Service cần thiết cho tôi"*.
2.  **Khởi tạo**: Lớp Controller của bạn được tạo ra trong bộ nhớ RAM.
3.  **Chạy Code (Reflection)**: Hệ thống dùng kỹ thuật Reflection để "bấm nút" chạy đúng hàm (Action) khớp với URL.
4.  **Trả kết quả**: Sau khi chạy xong code của bạn, kết quả (`View` hoặc `Json`) sẽ được gói lại và gửi ngược ra ngoài đường ống Middleware để về tới trình duyệt người dùng.

---
## 📄 FILE THAM CHIẾU CHÍNH
Toàn bộ "mạch máu" này nằm tại:
👉 **[Program.cs](file:///c:/code/asp.net/SmartLMS.Web/Program.cs#L229-L253)**

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
