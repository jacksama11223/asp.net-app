# 🚀 SELF-HOSTED APPLICATION TRONG SMARTLMS.AI

Tài liệu này giải thích khái niệm "Tự thực thi" (Self-Hosted) - công nghệ cốt lõi giúp SmartLMS.AI có thể chạy ở bất cứ đâu.

---

## 🧐 1. SELF-HOSTED LÀ GÌ?

Trước đây (thời .NET Framework cũ), bạn phải cài đặt một Web Server khổng lồ như **IIS (Internet Information Services)** rồi mới "đẩy" code vào đó để nó chạy hộ.

**Self-Hosted** nghĩa là ứng dụng của bạn **Tự làm chủ**:
*   Nó tự mang theo Web Server bên trong nó (tên là **Kestrel**).
*   Nó không cần "ký sinh" vào bất kỳ phần mềm quản lý web nào khác.
*   Bạn chỉ cần ra lệnh `dotnet SmartLMS.Web.dll`, ứng dụng sẽ tự mở cổng mạng và phục vụ người dùng.

---

## 🛠️ 2. CÁCH ÁP DỤNG TRONG MÃ NGUỒN CỦA BẠN

Trong toàn bộ source code này, tính năng Self-Hosted được thể hiện qua 3 điểm mấu chốt:

### A. Điểm khởi đầu (Program.cs)
Đây là nơi bạn "đúc" ra cái máy chủ của riêng mình.
```csharp
// Khởi tạo máy chủ Kestrel tích hợp sẵn
var builder = WebApplication.CreateBuilder(args);

// ... cấu hình các dịch vụ ...

var app = builder.Build();

// ... định tuyến ...

// RA LỆNH NỔ MÁY!
app.Run();
```

### B. Cấu hình Cổng (appsettings.json / Docker)
Vì là tự quản lý, chúng ta có quyền chỉ định App sẽ nghe ở cổng nào mà không phụ thuộc vào hệ điều hành:
*   Trong dự án này, chúng ta chỉ định cổng **8080** cho Kestrel.

### C. Đóng gói Container (Dockerfile)
Vì App có thể tự chạy, chúng ta chỉ cần một hệ điều hành Linux siêu nhỏ trong Docker và cài .NET là đủ. Đây là bí quyết giúp bạn triển khai lên **Oracle Cloud** cực kỳ nhanh.

---

## 🔄 3. LUỒNG DỮ LIỆU FRONTEND -> BACKEND TRONG MÔ HÌNH SELF-HOSTED

Trong mô hình này, luồng đi cực kỳ "phẳng" và hiệu năng cao:

1.  **Yêu cầu từ Frontend**: Người dùng gửi yêu cầu HTTP.
2.  **Kestrel (Trạm tiếp nhận trực tiếp)**: Kestrel bắt lấy yêu cầu ngay tại cổng 8080. Không có lớp trung gian của hệ điều hành can thiệp (như IIS).
3.  **Pipeline xử lý nội bộ**: Yêu cầu đi thẳng vào chuỗi Middleware mà bạn đã học ở `middleware_pipeline.md`.
4.  **Hàm Backend thực thi**: Code C# của bạn chạy và trả về kết quả.
5.  **Phản hồi trực tiếp**: Kestrel tự đóng gói kết quả và gửi trả lại cho người dùng.

---

## 🎒 5. BÍ MẬT VỀ HTTPCONTEXT (THE MAGIC BAG)

Khi Kestrel tiếp nhận một yêu cầu thô từ mạng, nó thực hiện một phép thuật gọi là **Chuyển đổi bối cảnh**.

### Quá trình diễn ra như sau:

1.  **Khởi động (Trigger)**: Tại dòng [Program.cs:L261](file:///c:/code/asp.net/SmartLMS.Web/Program.cs#L261), lệnh `app.Run();` kích hoạt Kestrel bắt đầu lắng nghe cổng 8080.
2.  **Đúc khuôn (Parsing)**: Kestrel đọc các dòng byte từ Internet gửi đến. Nó nhận ra: *"À, đây là lệnh GET, gửi từ trình duyệt Chrome"*.
3.  **Tạo túi thần kỳ (HttpContext)**: Kestrel tạo ra một đối tượng C# mang tên **`HttpContext`**. Đây là một chiếc túi chứa tất cả thông tin:
    - **Request**: Khách hàng gửi gì lên? (Header, Body, Query...)
    - **Response**: Mình dự định trả về cái gì?
    - **User**: Khách hàng này là ai (sau khi qua Auth Middleware).
4.  **Dẫn luồng**: `HttpContext` này được đẩy đi xuyên qua toàn bộ hệ thống Middleware như một "hộp bưu phẩm" trên băng chuyền.

### Cách bạn "thò tay" vào túi này trong code:
Trong bất kỳ Controller nào, bạn đều có thể truy cập `HttpContext`.
*Ví dụ*: `var userIp = HttpContext.Connection.RemoteIpAddress;`
=> Kestrel đã chuẩn bị sẵn thông tin này cho bạn ngay từ lúc nó nhận gói tin ở cổng 8080.

---

## 🌟 6. ƯU ĐIỂM "KHỦNG" CỦA SELF-HOSTED CHO SMARTLMS.AI

*   **Tốc độ thần sầu**: Kestrel được thiết kế để xử lý hàng triệu request đồng thời với độ trễ tối thiểu (chậm hơn RAM nhưng nhanh hơn bất kỳ máy chủ nào khác).
*   **Di động tuyệt đối**: Bạn có thể chạy App ở máy Windows, Linux, Docker, hay Cloud mà không cần sửa một dòng code nào.
*   **Kiểm soát hoàn toàn**: Bạn có quyền can thiệp vào cách máy chủ tiếp nhận gói tin, nén dữ liệu ngay trong code C#.

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
