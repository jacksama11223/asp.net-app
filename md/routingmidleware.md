# 🚦 CƠ CHẾ XỬ LÝ GET & POST TRONG ROUTING MIDDLEWARE

Tài liệu này giải thích cách hệ thống ASP.NET Core của bạn phân loại và "giao việc" cho các đoạn code dựa trên loại yêu cầu (HTTP Verb) từ người dùng.

---

## 🧐 1. TƯ DUY TỔNG QUAN: "ĐỊA CHỈ" VS "HÀNH ĐỘNG"

Trong Routing, một yêu cầu được xác định bởi 2 yếu tố:
1.  **URL**: Bạn muốn đi đến đâu? (Ví dụ: `/CourseManagement/Create`)
2.  **Verb**: Bạn muốn làm gì? (Lấy dữ liệu - **GET**, hay Gửi dữ liệu - **POST**)

---

## 🧪 2. CÁC "NHÂN VẬT" NHẬN YÊU CẦU (THỰC TẾ TRONG CODE)

Hãy soi vào file `CourseManagementController.cs` để thấy cách Routing làm việc:

### A. Yêu cầu GET (Lấy dữ liệu)
Khi bạn gõ địa chỉ web hoặc nhấn vào một đường link, trình duyệt gửi lệnh **GET**.

*   **Code thực tế**:
    ```csharp
    [HttpGet] // Chỉ nhận lệnh GET
    public async Task<IActionResult> Create()
    {
        return View(); // Trả về giao diện trắng để người dùng nhập
    }
    ```
*   **Hoạt động**: Routing tìm thấy sự kết hợp giữa đường dẫn `/Create` và Verb `GET`, nó sẽ gọi hàm này để hiển thị trang web.

### B. Yêu cầu POST (Gửi dữ liệu)
Khi bạn nhấn nút "Lưu" hoặc "Gửi" trên một Form, trình duyệt gửi lệnh **POST**.

*   **Code thực tế**:
    ```csharp
    [HttpPost] // Chỉ nhận lệnh POST
    public async Task<IActionResult> Create(Course course)
    {
        // Xử lý lưu vào Database ở đây
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return RedirectToAction("Index");
    }
    ```
*   **Hoạt động**: Routing thấy dữ liệu gửi lên kèm Verb `POST`. Dù đường dẫn vẫn là `/Create`, nhưng nó sẽ bỏ qua hàm GET và gọi thẳng vào hàm POST này.

---

## 🔗 3. CƠ CHẾ BỐC DỮ LIỆU (PARAMETER BINDING)

Một phần cực kỳ thông minh của Routing là cách nó "nhét" dữ liệu vào biến:

1.  **Từ URL**: Nếu URL là `/Course/Edit/5`, Routing tự hiểu `5` là giá trị của biến `int id`.
2.  **Từ Form (POST)**: Nếu bạn nhập tên khóa học là "AI Master", Routing tự tìm trong model `Course` xem có trường `Title` không để gán giá trị vào.

---

## ⚡ 4. TẠI SAO PHẢI CHIA RA GET VÀ POST?

| Đặc điểm | GET (Lấy) | POST (Gửi) |
| :--- | :--- | :--- |
| **Bảo mật** | Dữ liệu hiện trên URL (Không an toàn cho mật khẩu) | Dữ liệu nằm trong thân yêu cầu (An toàn hơn) |
| **Lưu trữ** | Có thể Bookmark hoặc lưu vào Lịch sử | Không thể Bookmark (Vì là một hành động) |
| **Mục đích** | Chỉ đọc, không làm thay đổi Database | Làm thay đổi dữ liệu (Thêm, Sửa, Xóa) |

---

## 🖱️ 5. LUỒNG DỮ LIỆU THỰC TẾ (FROM BUTTON TO DATABASE)

Để hiểu code, hãy nhìn vào hành động của người dùng trên giao diện.

### Ví dụ 1: Nút "Thêm Mới" (Lấy trang nhập liệu)
1.  **Người dùng**: Nhấn nút `<a>` có mã `asp-action="Create"` trong [Index.cshtml](file:///c:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml#L156).
2.  **Trình duyệt**: Gửi lệnh **GET** đến địa chỉ `/CourseManagement/Create`.
3.  **Routing**: Tìm thấy `[HttpGet] Create()` trong `CourseManagementController`.
4.  **Kết quả**: Trang web hiển thị form trắng cho người dùng nhập.

### Ví dụ 2: Nút "Lưu" (Gửi dữ liệu lên)
1.  **Người dùng**: Sau khi nhập xong, nhấn nút `<button type="submit">`.
2.  **Trình duyệt**: Gom tất cả dữ liệu trong các ô `<input>` và gửi lệnh **POST** đến `/CourseManagement/Create`.
3.  **Routing**: Tìm thấy `[HttpPost] Create(Course course)` trong Controller.
4.  **Backend**: Controller gọi `_courseService.CreateAsync(course)` để ghi dữ liệu vào SQL Server.
5.  **Kết quả**: Người dùng được chuyển hướng về trang danh sách (Index) và thấy khóa học mới.

### Ví dụ 3: Ô tìm kiếm (Truy vấn dữ liệu ngầm - AJAX)
1.  **Người dùng**: Gõ từ khóa vào ô tìm kiếm của bảng.
2.  **Trình duyệt (Javascript)**: Gửi lệnh **GET** kèm từ khóa đến `/CourseManagement/GetCoursesJson` (AJAX).
3.  **Routing**: Gọi hàm `GetCoursesJson()` trong Controller.
4.  **Backend**: Lấy dữ liệu từ Database, lọc theo từ khóa và trả về dạng **JSON**.
5.  **Kết quả**: Bảng dữ liệu tự động cập nhật mà không cần load lại trang.

---
## 📄 ĐIỂM KIỂM CHỨNG TRONG SOURCE CODE
Bạn hãy mở file này để thấy sự phối hợp giữa GET và POST:
👉 **[CourseManagementController.cs](file:///c:/code/asp.net/SmartLMS.Web/Controllers/CourseManagementController.cs#L86-L95)**

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý của bạn.*
