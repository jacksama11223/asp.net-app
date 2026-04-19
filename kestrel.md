# 🛡️ CƠ CHẾ PHỐI HỢP: KESTREL VÀ REVERSE PROXY

Tài liệu này giải thích cách máy chủ nội bộ (Kestrel) và máy chủ công cộng (Cloudflare) làm việc cùng nhau để đưa SmartLMS.AI lên mạng.

---

## 🏛️ 1. CÁC THỰC THỂ TRONG HỆ THỐNG

### Kestrel (Internal Server)
*   **Vị trí**: Nằm bên trong Docker container tên là `web`.
*   **Vai trò**: Chạy trực tiếp file `dotnet SmartLMS.Web.dll`. Nó cực kỳ nhanh nhưng không nên trực tiếp đối mặt với Internet vì lý do bảo mật.
*   **Cổng nội bộ**: 8080.

### Cloudflare Tunnel (Reverse Proxy)
*   **Vị trí**: Nằm trong Docker container tên là `tunnel`.
*   **Vai trò**: Đứng ở "biên" Internet. Nó nhận mọi yêu cầu từ người dùng, lọc bỏ mã độc và chuyển tiếp (proxy) vào cho Kestrel.
*   **Ưu điểm**: Không cần mở cổng modem (Port Forwarding), bảo mật tuyệt đối.

---

## 🤝 2. QUY TRÌNH PHỐI HỢP (TRUSTED COMMUNICATION)

Khi người dùng truy cập `https://...trycloudflare.com`, quy trình sau diễn ra:

1.  **HTTPS Termination**: Cloudflare xử lý chứng chỉ SSL (HTTPS). Nó "giải mã" yêu cầu của người dùng.
2.  **Internal Forwarding**: Cloudflare chuyển yêu cầu đó vào container `web` qua giao thức HTTP (để nhanh hơn).
3.  **The "Note" (Forwarded Headers)**: Vì Kestrel nhận được HTTP, nó có thể làm sai các đường link. Cloudflare đính kèm các Header sau:
    - `X-Forwarded-For`: Địa chỉ IP thật của người dùng.
    - `X-Forwarded-Proto`: Thông báo rằng người dùng vốn đang dùng "https".

---

## 💻 3. MÃ NGUỒN CẤU HÌNH THỰC TẾ

### Bước 1: Tin tưởng Proxy (Program.cs)
Chúng ta phải dặn Kestrel là: *"Nếu có ai đó gửi các Header X-Forwarded-... thì hãy tin họ nhé!"*.

```csharp
// [SmartLMS.Web/Program.cs]
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    // Xóa các danh sách chặn mặc định để tin tưởng Network nội bộ của Docker
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});
```

### Bước 2: Kích hoạt Middleware (Program.cs)
Middleware này phải đứng **đầu tiên** trong pipeline để các lớp sau (như Auth) nhận diện đúng HTTPS.

```csharp
app.UseForwardedHeaders(); // Phải đặt đầu tiên!
```

### Bước 3: Kết nối mạng Docker (docker-compose.yml)
Hai thực thể này nói chuyện với nhau qua tên service:

```yaml
# [docker-compose.yml]
services:
  tunnel:
    command: tunnel --url http://web:8080  # Gọi đến service 'web' ở cổng 8080
  web:
    # ... chạy Kestrel ở cổng 8080
```

---

## 🎯 4. TẠI SAO PHẢI LÀM VẬY?
*   **Bảo mật**: Kestrel được giấu kín, không ai có thể tấn công trực tiếp vào nó.
*   **Hiệu năng**: Cloudflare gánh phần nặng nhất là SSL/TLS, Kestrel chỉ việc tập trung xử lý code.
*   **Linh hoạt**: Bạn có thể đổi Cloudflare bằng Nginx hay Apache mà code bên trong không cần thay đổi gì.

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
