# Sổ tay Học OOP & Nguyên lý SOLID (Minh họa từ Source Code SmartLMS)

Chào ngài! Đây là tài liệu tổng hợp và giải thích toàn bộ 5 nguyên lý SOLID trong Lập trình hướng đối tượng (OOP), được minh họa thực tế 100% bằng chính source code dự án **SmartLMS** của ngài. Tài liệu này sẽ giúp ngài hiểu cách áp dụng Interface và Dependency Injection (DI) vào thực tế.

---

## 1. SRP - Single Responsibility Principle (Nguyên lý Đơn trách nhiệm)
**Lý thuyết:** Một class (lớp) chỉ nên giữ **một** và **duy nhất một** trách nhiệm. Nó chỉ có một lý do duy nhất để thay đổi.

**Ví dụ trong SmartLMS:**
Ngài hãy xem class `IPaymentGateway` và `VnPayGateway` (thực thi interface này). Trách nhiệm duy nhất của nó là **tạo URL thanh toán và xác thực chữ ký (checksum)**. 
Nó KHÔNG tham gia vào việc lưu Database, KHÔNG xử lý gửi email xác nhận.
```csharp
// c:\code\asp.net\SmartLMS.Business\IPaymentGateway.cs
public interface IPaymentGateway
{
    // Trách nhiệm: Tạo URL chuyển hướng sang cổng thanh toán
    string CreatePaymentUrl(string orderId, decimal amount, string returnUrl);
    // Trách nhiệm: Xác minh tính hợp lệ của thanh toán
    bool VerifyChecksum(IDictionary<string, string> queryData, string secureHash);
}
```
**Tại sao lại tốt?** Nếu ngày mai VNPay thay đổi thuật toán hash mã checksum, ta chỉ vào sửa duy nhất file `VnPayGateway`, không ảnh hưởng đến các file Controller hay Database.

---

## 2. OCP - Open/Closed Principle (Nguyên lý Đóng/Mở)
**Lý thuyết:** Class nên được **mở để mở rộng (extension)** nhưng **đóng lại với việc sửa đổi (modification)**.

**Ví dụ trong SmartLMS:**
Trong `PaymentApiController.cs`, ta sử dụng Interface `IPaymentGateway`:
```csharp
// c:\code\asp.net\SmartLMS.Web\Controllers\Api\PaymentApiController.cs
public class PaymentApiController : ControllerBase
{
    private readonly IPaymentGateway _paymentGateway;

    // Inject qua Constructor
    public PaymentApiController(SmartLMSContext context, IPaymentGateway paymentGateway, IConfiguration config)
    {
        _paymentGateway = paymentGateway;
    }

    [HttpPost("create-invoice")]
    public async Task<ActionResult> CreateInvoice([FromBody] PaymentRequest request)
    {
        // ... logic tạo hoá đơn ...
        // Gọi hàm tạo URL từ Interface
        string paymentUrl = _paymentGateway.CreatePaymentUrl(txnRef, invoice.Amount, returnUrl);
        return Ok(new { paymentUrl });
    }
}
```
**Tại sao lại tốt?** Hiện tại đang dùng VNPay. Nếu sau này ngài muốn tích hợp thêm Momo hay PayPal, ngài **không cần sửa một dòng code nào** trong class `PaymentApiController`. 
Ngài chỉ cần tạo thêm class mới: `public class MomoGateway : IPaymentGateway` và đăng ký nó ở `Program.cs`. Như vậy, hệ thống MỞ để mở rộng thêm Momo, nhưng ĐÓNG với việc phải sửa code có sẵn của Payment Controller.

---

## 3. LSP - Liskov Substitution Principle (Nguyên lý thay thế Liskov)
**Lý thuyết:** Trong một chương trình, các đối tượng của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.

**Ví dụ trong SmartLMS:**
Tất cả các Controller của ngài (như `PaymentApiController`, `StudentCoursesApiController`) đều đang kế thừa từ class cha `ControllerBase`.
```csharp
public class PaymentApiController : ControllerBase
{
   // ...
}
```
Khung sườn ASP.NET Core MVC (bên dưới mảng Routing) tự động gọi các hàm của `ControllerBase` trên instance của `PaymentApiController`. Dù thay đổi class con thành Controller nào, ASP.NET Core vẫn hiểu nó là `ControllerBase` và lấy được Response (`Ok()`, `NotFound()`, `Unauthorized()`) để trả về cho người dùng HTTP mà hệ thống không bị "ngáo".

---

## 4. ISP - Interface Segregation Principle (Nguyên lý phân tách Interface)
**Lý thuyết:** Thay vì dùng một Interface khổng lồ (chứa nhiều phương thức không liên quan), hãy tách chúng thành nhiều Interface nhỏ nhắm vào các mục đích cụ thể. Khách hàng không nên bị ép phải triển khai những interface mà họ không sử dụng.

**Ví dụ trong SmartLMS:**
Thay vì nhét chung một cái `IService` bự chảng, source code đã chẻ nhỏ ra thành:
- `IVideoTranscoderService` (chỉ chuyên xử lý video)
- `ICompilerService` (chỉ chuyên chấm điểm code)
- `INotificationService` (chỉ chuyên gửi thông báo)

```csharp
// c:\code\asp.net\SmartLMS.Business\ICompilerService.cs
public interface ICompilerService
{
    Task<CompilerResult> ExecuteAsync(string code, string language, List<TestCase> testCases);
}
```
**Tại sao lại tốt?** Giả sử ngài có một Class tên là `PythonCompiler`. Class này chỉ cần kế thừa (implement) `ICompilerService` và cài đặt hàm `ExecuteAsync`. Nó sẽ không bị ép buộc phải code cả những hàm dư thừa như `TranscodeVideo()` hay `SendEmail()`.

---

## 5. DIP - Dependency Inversion Principle (Nguyên lý đảo ngược Dependency)
**Lý thuyết:** 
- Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả hai nên phụ thuộc vào điểm trừu tượng (Interface).
- Các abstraction không nên phụ thuộc vào chi tiết. Chi tiết nên phụ thuộc vào abstraction.

**Ví dụ trong SmartLMS (Cực kỳ rõ):**
Tầng `SmartLMS.Web` (Controller) là module cấp cao. Tầng `SmartLMS.Business` là logic. Database là cấp thấp. 

Trong `PaymentApiController.cs`, ta **KHÔNG BAO GIỜ** khởi tạo trực tiếp cổng thanh toán như thế này (Xấu):
```csharp
// Bad code (Phụ thuộc vào cụ thể - Hard Dependency)
VnPayGateway vnPay = new VnPayGateway();
vnPay.CreatePaymentUrl(...);
```

Thay vào đó, ta đưa vào Interface `IPaymentGateway` qua Constructor (Tốt):
```csharp
private readonly IPaymentGateway _paymentGateway;

public PaymentApiController(IPaymentGateway paymentGateway) // Dependency Injection
{
    _paymentGateway = paymentGateway; // Abstraction
}
```
Lúc ứng dụng chạy, file `Program.cs` sẽ đóng vai trò cấu hình (Tiêm - Inject):
```csharp
// Program.cs
builder.Services.AddScoped<IPaymentGateway, VnPayGateway>();
```
**Tại sao lại tốt?** Controller giờ đây hoàn toàn "mù tịt" về việc VnPayGateway bên trong hoạt động ra sao (gọi HTTP nào, hash chuỗi nào). Nó chỉ quan tâm: *"Bất cứ ai được đưa cho tôi, chỉ cần là IPaymentGateway, tôi sẽ gọi hàm `CreatePaymentUrl()`"*. Đây chính là cách thiết kế "Strict Modular" lỏng lẻo (Loosely coupled) chuẩn Enterprise.

---

## Thực hành: Áp dụng DIY vào dự án (Do It Yourself)

Giả sử tính năng sắp tới của ngài là: **Gửi tin nhắn SMS** cho học viên khi mua khóa học thành công. 

**Bước 1: Áp dụng DIP & ISP (Tạo Interface nhỏ gọn)**
Thay vì code thẳng vào `PaymentApiController`, hãy tạo Interface:
```csharp
public interface ISmsService 
{
    Task SendSmsAsync(string phoneNumber, string content);
}
```

**Bước 2: Áp dụng SRP (Tạo class đảm nhận duy nhất việc gửi SMS)**
Tạo class thật, chẳng hạn dùng Twilio (một hãng gửi SMS):
```csharp
public class TwilioSmsService : ISmsService
{
    public async Task SendSmsAsync(string phoneNumber, string content)
    {
        // Code kết nối với API của Twilio ở đây
    }
}
```

**Bước 3: Áp dụng OCP & DI (Tiêm vào Controller/Service)**
Sửa `PaymentApiController` để gọi `ISmsService`:
```csharp
public class PaymentApiController : ControllerBase
{
    private readonly ISmsService _smsService;
    
    public PaymentApiController(ISmsService smsService) // Tiêm qua đây
    {
        _smsService = smsService;
    }
    
    // Ở dưới chỉ việc gọi:
    // await _smsService.SendSmsAsync(user.Phone, "Mua khoa hoc thanh cong!");
}
```

Và ở `Program.cs`, khai báo:
```csharp
builder.Services.AddScoped<ISmsService, TwilioSmsService>();
```
Sau này không thích Twilio, muốn đổi sang *ZaloZNS*, ngài chỉ cần tạo class `ZaloSmsService : ISmsService`, rồi vào `Program.cs` đổi lại dòng `AddScoped`. Thế là xong! Khỏi sửa bất cứ file Controller nào.
