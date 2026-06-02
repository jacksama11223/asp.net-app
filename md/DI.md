# 💉 DEPENDENCY INJECTION (DI) TRONG SMARTLMS.AI

Dependency Injection (Tiêm phụ thuộc) là trái tim của dự án, giúp quản lý các đối tượng một cách tự động và linh hoạt.

---

## 🏗️ 1. DI LÀ GÌ?
Thay vì một lớp tự đi tìm các linh kiện nó cần (ví dụ: Controller tự tạo Database), hệ thống sẽ chủ động "tiêm" (inject) những linh kiện đó vào cho nó. Điều này giúp code dễ kiểm thử (Test) và dễ bảo trì.

---

## ⏳ 2. CÁC VÒNG ĐỜI DỊCH VỤ (LIFETIMES)

Trong `Program.cs`, bạn sẽ thấy 2 loại đăng ký chính:

### A. AddScoped (Phổ biến nhất)
*   **Đặc điểm**: Một đối tượng mới được tạo ra cho **mỗi yêu cầu HTTP** (mỗi lần load trang).
*   **Tại sao dùng?**: Đảm bảo an toàn dữ liệu cho từng người dùng riêng biệt.
*   **Các dịch vụ tiêu biểu**:
    - `SmartLMSContext` (Kết nối Database).
    - `ICourseService`, `IStudentService`, `IUserService`.
    - `IRepository<T>` (Tầng truy cập dữ liệu).

### B. AddSingleton (Dùng chung toàn cầu)
*   **Đặc điểm**: Chỉ có **duy nhất một đối tượng** được tạo ra cho toàn bộ ứng dụng.
*   **Tại sao dùng?**: Tiết kiệm tài nguyên cho các tác vụ cần dùng chung hoặc kết nối nặng.
*   **Các dịch vụ tiêu biểu**:
    - `IMessageBus` (Kết nối tới RabbitMQ).
    - `IScoringEngine` (Bộ máy tính điểm Gamification).
    - `IConverter` (Chuyển đổi PDF).

---

## 🛠️ 3. CÁCH SỬ DỤNG TRONG CODE (CONSTRUCTOR INJECTION)

Hãy xem ví dụ trong `CourseManagementController.cs`:

```csharp
public class CourseManagementController : Controller
{
    private readonly ICourseService _courseService;

    // Hệ thống DI sẽ tự động truyền 'CourseService' vào đây
    public CourseManagementController(ICourseService courseService)
    {
        _courseService = courseService;
    }

    public async Task<IActionResult> Index()
    {
        // Sử dụng dịch vụ được tiêm vào
        var courses = await _courseService.GetAllCoursesAsync();
        return View(courses);
    }
}
```

---

## 🌟 4. CÁC TRƯỜNG HỢP ĐẶC BIỆT

### 1. Typed HttpClient (Tích hợp Zoom)
Chúng ta đăng ký một Client riêng cho Zoom:
`builder.Services.AddHttpClient<IZoomIntegrationService, ZoomIntegrationService>();`
=> Giúp quản lý cấu hình Timeout và URL của Zoom một cách tập trung.

### 2. Options Pattern (Cấu hình Email)
`builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("Smtp"));`
=> Thay vì đọc file `appsettings.json` thủ công, chúng ta tiêm `IOptions<SmtpSettings>` trực tiếp vào `EmailService`.

---
## 📄 ĐIỂM ĐĂNG KÍ (MAP)
Toàn bộ việc phân loại dịch vụ này nằm tại:
👉 **[Program.cs](file:///c:/code/asp.net/SmartLMS.Web/Program.cs#L133-L168)**

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
