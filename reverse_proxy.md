# 🛡️ LUỒNG VẬN HÀNH REVERSE PROXY TRONG SMARTLMS.AI

Tài liệu này giải thích cách Cloudflare Tunnel và Kestrel phối hợp với nhau thông qua cấu hình thực tế trong mã nguồn của bạn.

---

## 🛰️ 1. SƠ ĐỒ LUỒNG THỰC TẾ (CLOUDFLARE + DOCKER)

Trong dự án này, Reverse Proxy không phải là Nginx hay IIS, mà chính là **Cloudflare Tunnel**.

### Bước 1 & 2: Tiếp nhận & Xử lý tại Cloudflare
Khi người dùng truy cập link `trycloudflare.com`:
*   **Trình duyệt -> Cloudflare**: Yêu cầu là HTTPS.
*   **Xử lý**: Cloudflare tháo lớp SSL, ghi lại IP người dùng vào Header `X-Forwarded-For`.
*   **Gán nhãn**: Nó ghi thêm `X-Forwarded-Proto = https` để dặn Kestrel rằng đây là yêu cầu an toàn.

### Bước 3: Chuyển tiếp vào Docker (Reverse Proxy -> Kestrel)
Nhìn vào file **[docker-compose.yml: L36](file:///c:/code/asp.net/docker-compose.yml#L36)**:
```yaml
command: tunnel --url http://web:8080
```
Cloudflare Tunnel gửi yêu cầu vào mạng nội bộ Docker tới service `web` ở cổng `8080`.

### Bước 4: Tiếp nhận & Giải mã Header (Kestrel -> Middleware)
Đây là phần "vàng" trong code C# của bạn. Tại **[Program.cs: L187-193](file:///c:/code/asp.net/SmartLMS.Web/Program.cs#L187-L193)**:
```csharp
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear(); // Tin tưởng mọi request từ Tunnel
    options.KnownProxies.Clear();
});
```
Và kích hoạt tại **[Program.cs: L230](file:///c:/code/asp.net/SmartLMS.Web/Program.cs#L230)**:
```csharp
app.UseForwardedHeaders(); 
```
**Kết quả**: `HttpContext` bây giờ sẽ chứa IP thật của người dùng thay vì IP của Docker. Giao thức `http` sẽ được tự động đổi thành `https` bên trong App.

### Bước 5: Phản hồi
Hệ thống trả kết quả ngược lại cho Cloudflare để nén và gửi về cho người dùng qua HTTPS.

---

## ❓ TẠI SAO PHẢI CÓ BƯỚC 4 TRONG CODE?

Nếu bạn KHÔNG cấu hình `ForwardedHeaders` trong `Program.cs`:
1.  **Lỗi CSS/Ảnh**: App sẽ cố gắng load ảnh qua `http://...` thay vì `https://...`, dẫn đến lỗi bảo mật trên trình duyệt.
2.  **Sai IP**: Mọi nhật ký đăng nhập sẽ hiện IP của Docker (`172.18.x.x`) thay vì IP thật của khách hàng.
3.  **Lỗi Login**: Các dịch vụ như Google Login sẽ từ chối vì nó yêu cầu phải chạy trên HTTPS thật sự.

---

## 📄 FILE THAM CHIẾU QUAN TRỌNG
- **Hạ tầng**: [docker-compose.yml](file:///c:/code/asp.net/docker-compose.yml)
- **Cấu hình C#**: [Program.cs](file:///c:/code/asp.net/SmartLMS.Web/Program.cs)

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
