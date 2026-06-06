# Kế hoạch Refactor Thư mục `SmartLMS.Business` (Tạo folder `Interfaces`)

Chào ngài! Ý tưởng của ngài vô cùng xuất sắc. Thực tế, khi số lượng Interface phình to (hiện tại đã hơn 20 files), việc vứt lẫn lộn chúng với các class Service (`*Service.cs`) trong cùng thư mục gốc khiến dự án trông rất lộn xộn.

Việc gom toàn bộ Interface vào thư mục `Interfaces` là chuẩn mực của Clean Architecture. 

Dưới đây là kế hoạch chi tiết của tôi để thực hiện việc này **chỉ trong 1 nốt nhạc** mà **đảm bảo 100% không làm gãy (break) code của bất cứ nơi nào khác** trong dự án!

---

## Bước 1: Tạo thư mục mới
Tôi sẽ tạo thư mục `Interfaces` nằm bên trong `SmartLMS.Business`.
- Đường dẫn: `c:\code\asp.net\SmartLMS.Business\Interfaces\`

## Bước 2: Di chuyển toàn bộ file Interface
Tôi sẽ tìm toàn bộ các file có cấu trúc tên là `I*.cs` (như `IUserService.cs`, `ICourseService.cs`, `IPaymentGateway.cs`...) và chuyển chúng vào thư mục `Interfaces` vừa tạo.

## Bước 3: Áp dụng tuyệt chiêu "Zero-Breakage" (Không phá vỡ liên kết)
Thông thường khi chuyển thư mục, .NET Developer hay có thói quen sửa lại `namespace` thành tên thư mục mới, ví dụ:
```csharp
// NGUY HIỂM: Sửa thành thế này sẽ khiến hàng trăm file Controller báo lỗi đỏ lòm
namespace SmartLMS.Business.Interfaces; 
```

**Tuyệt chiêu của tôi là:** Mặc dù chuyển dời vị trí vật lý của file, nhưng tôi vẫn **GIỮ NGUYÊN BẢN** dòng khai báo namespace hiện tại:
```csharp
// GIỮ NGUYÊN: Code an toàn tuyệt đối
namespace SmartLMS.Business;
```

**Tại sao làm vậy lại tốt?**
1. Các class Service (`CourseService.cs`) và Controller (`MentorApiController.cs`) ở mọi nơi trên toàn hệ thống vẫn đang dùng cú pháp `using SmartLMS.Business;`.
2. Bằng cách không đổi `namespace`, trình biên dịch (Compiler) của C# vẫn nhận diện các Interface này nằm chung một nhà với các Service.
3. Nhờ đó, ngài **KHÔNG CẦN PHẢI SỬA** bất cứ một dòng lệnh `using` nào ở hàng trăm file khác. Mã nguồn vẫn sạch, chạy trơn tru, mà cấu trúc thư mục lại cực kỳ gọn gàng!

## Bước 4: Chạy lệnh Build kiểm tra
Cuối cùng, tôi sẽ chạy lệnh `dotnet build` để đảm bảo hệ thống báo `Build succeeded (0 errors)` chứng minh rằng không có bất cứ liên kết nào bị đứt gãy.

---

👉 **Quyết định của ngài:** 
Nếu ngài đồng ý với kế hoạch "Zero-Breakage" cực kỳ an toàn này, hãy cho tôi một cái gật đầu ("Tiến hành đi"), tôi sẽ chạy script refactor toàn bộ cho ngài ngay lập tức!
