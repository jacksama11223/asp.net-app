# Lý thuyết Cỗ máy Turing và sự hiện diện trong SmartLMS Codebase

Luận điểm Church-Turing chỉ ra rằng: **"Bất kỳ thuật toán nào cũng có thể được thực thi bởi một Cỗ máy Turing"**. Một Cỗ máy Turing hoạt động dựa trên 4 thao tác cơ bản: **Đọc (Read)**, **Ghi (Write)**, **Dịch chuyển (Shift)**, và **Đổi trạng thái (State Change)** trên một băng giấy (Tape) vô hạn.

Mặc dù `SmartLMS` là một hệ thống phần mềm web hiện đại, kiến trúc của nó về bản chất chính là một "Cỗ máy Turing" khổng lồ được trừu tượng hóa. Dưới đây là cách giải thích sự tương đương giữa lý thuyết này và codebase của bạn:

---

## 1. Băng giấy vô hạn (The Tape)
Trong Cỗ máy Turing, băng giấy là nơi lưu trữ ký hiệu. 
**Trong SmartLMS:** **Cơ sở dữ liệu SQL Server** chính là băng giấy.
* Mỗi dòng dữ liệu trong bảng `Invoices`, `Courses`, `Users`, hay `Enrollments` chính là các "ô" trên băng giấy chứa các ký hiệu (dữ liệu).
* Băng giấy này có thể mở rộng liên tục khi có người dùng mới hoặc khóa học mới được thêm vào.

## 2. Đầu Đọc/Ghi (The Read/Write Head)
Đầu đọc/ghi của máy Turing di chuyển trên băng giấy để lấy thông tin hoặc thay đổi nó.
**Trong SmartLMS:** **Entity Framework Core (`_context`)** đóng vai trò là đầu Đọc/Ghi.
* **Thao tác Đọc:** Khi code gọi `await _context.Invoices.FirstOrDefaultAsync(i => i.TransactionReference == txnRef);`, đầu đọc đang lướt qua băng giấy (Database) để tìm đúng ô chứa mã giao dịch và "Đọc" dữ liệu lên RAM.
* **Thao tác Ghi:** Khi gọi `_context.Enrollments.Add(...)` và `await _context.SaveChangesAsync();`, đầu ghi đang dập một ký hiệu mới (bản ghi ghi danh mới) xuống băng giấy.

## 3. Trạng thái (The State)
Máy Turing luôn có một trạng thái hiện tại (vd: Trạng thái q0, q1) để quyết định sẽ làm gì tiếp theo.
**Trong SmartLMS:** Trạng thái được thể hiện qua **Các biến trong bộ nhớ (RAM)** và **Trạng thái của Entity**.
* Ví dụ: Thuộc tính `invoice.Status`.
* Ban đầu, trạng thái là `"Unpaid"`. Dựa vào trạng thái này, hệ thống hiển thị mã QR.
* Khi có sự kiện xảy ra, trạng thái chuyển thành `"Paid"`.

## 4. Bảng Quy tắc / Tập lệnh (The Transition Function)
Máy Turing dùng bảng quy tắc: *Nếu đang ở trạng thái X và đọc được ký hiệu Y -> Ghi ký hiệu Z, chuyển sang trạng thái W*.
**Trong SmartLMS:** **Các hàm trong Services và Controllers** chính là Bảng quy tắc này.
Lấy ví dụ chính xác đoạn code bạn vừa viết trong `PublicPaymentApiController.cs` (Hàm `SePayWebhook`):

```csharp
// 1. ĐỌC: Đọc dữ liệu từ băng giấy (Database) xem hóa đơn đang thế nào
var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.TransactionReference == txnRef);

// 2. KIỂM TRA QUY TẮC: Nếu đọc được số tiền gửi vào >= số tiền hóa đơn
if (payload.transferAmount >= invoice.Amount)
{
    // 3. ĐỔI TRẠNG THÁI:
    invoice.Status = "Paid";
    invoice.PaidAt = DateTime.Now;

    // 4. DỊCH CHUYỂN VÀ GHI: Di chuyển đến ô Enrollments và ghi dữ liệu mới
    _context.Enrollments.Add(new Enrollment { ... });
    await _context.SaveChangesAsync();
}
```
* **Thuật toán rõ ràng:** Bất kể logic thanh toán phức tạp thế nào (phải quét API, so khớp Regex, kiểm tra số dư), cuối cùng nó vẫn bị "chia nhỏ" thành chuỗi các thao tác: Mở kết nối Database (Đọc) -> Đánh giá điều kiện (Đổi trạng thái) -> Lưu xuống Database (Ghi).

## 6. Cấu hình (Configuration) và Hành vi của Máy

Theo Turing, hành vi của máy tại bất kỳ thời điểm nào được quyết định bởi **Cấu hình** = **Trạng thái nội tại (m-configuration)** + **Ký hiệu đang quét**.

**Trong SmartLMS:**
*   **Trạng thái nội tại:** Các biến logic, Session, hoặc Claims của người dùng đang đăng nhập.
*   **Ký hiệu đang quét:** Dữ liệu vừa được fetch từ Database lên.

### Các thao tác cụ thể trong Code:

#### A. In ký hiệu mới hoặc Xóa ký hiệu (Write/Delete)
Đây là hành động thay đổi dữ liệu trên "băng giấy" (Database).
*   **Ví dụ Code:**
    ```csharp
    // In ký hiệu mới (Ghi đè hoặc thêm mới)
    var course = await _context.Courses.FindAsync(id);
    course.Title = "Tên khóa học mới"; // Thay đổi ký hiệu tại ô đang quét
    
    // Xóa ký hiệu
    _context.Courses.Remove(course); // Xóa ký hiệu tại ô đang quét
    await _context.SaveChangesAsync();
    ```
*   **Thư viện hỗ trợ:** `Microsoft.EntityFrameworkCore`. Đây là "cánh tay robot" thực hiện việc dập ký hiệu lên ổ cứng.

#### B. Di chuyển đầu đọc (Move Left/Right)
Trong lập trình hiện đại, chúng ta không dùng tay đẩy đầu đọc, mà dùng các truy vấn để "nhảy" đến vị trí mong muốn.
*   **Ví dụ Code (Phân trang - Pagination):**
    ```csharp
    // Di chuyển đầu đọc đến ô thứ 20 và quét 10 ô tiếp theo
    var nextBatch = await _context.Courses
                        .Skip(20) // Dịch chuyển sang phải 20 ô
                        .Take(10) // Quét 10 ô
                        .ToListAsync();
    ```
*   **Thư viện hỗ trợ:** `System.Linq`. LINQ cho phép chúng ta điều khiển đầu đọc dữ liệu cực kỳ linh hoạt (Where, OrderBy, Skip, Take).

#### C. Thay đổi trạng thái nội tại (Change m-configuration)
Máy chuyển từ trạng thái xử lý này sang trạng thái xử lý khác dựa trên logic.
*   **Ví dụ Code:**
    ```csharp
    if (user.Role == "Admin") {
        // Chuyển sang trạng thái "Có quyền quản trị"
        SetAdminState(); 
    }
    ```
*   **Thư viện hỗ trợ:** `Microsoft.AspNetCore.Identity` và `IdentityServer`. Các thư viện này quản lý "Trạng thái định danh" của toàn bộ cỗ máy phần mềm.

## 7. Cỗ máy phổ quát (Universal Turing Machine) và Hàm `apply`

Trong lý thuyết, Alan Turing đã chứng minh sự tồn tại của một **Cỗ máy Turing phổ quát ($U$)** có khả năng mô phỏng bất kỳ cỗ máy Turing $M$ nào khác. Điều này thực hiện được bằng cách đọc mô tả của $M$ (được ghi trên băng giấy) và dữ liệu đầu vào $x$.

Trong thế giới lập trình, **hàm `apply` trong LISP** (và các ngôn ngữ hàm) chính là hiện thân của Cỗ máy phổ quát này. Nó xóa bỏ ranh giới giữa **Dữ liệu** và **Chương trình** (Code as Data).

### Ánh xạ vào ASP.NET Core & C#:

Dù C# là ngôn ngữ hướng đối tượng tĩnh, chúng ta vẫn thấy bóng dáng của "Cỗ máy phổ quát" qua các kỹ thuật cho phép mã nguồn đọc mô tả logic và thực thi nó tại thời điểm chạy (Runtime).

#### A. Reflection (Cỗ máy phổ quát thực thụ)
Reflection cho phép chương trình đọc metadata (mô tả) của chính nó và thực thi các hàm mà nó không hề biết trước khi biên dịch. Đây chính là hành vi của `apply`.

*   **Ví dụ Code:**
    ```csharp
    // Giả sử ta có một chuỗi tên hàm đến từ Database (Dữ liệu)
    string methodName = "CalculateDiscount";
    var service = new PricingService();

    // Dùng Reflection để "apply" hàm đó
    var method = typeof(PricingService).GetMethod(methodName);
    var result = method.Invoke(service, new object[] { 100 }); // apply(CalculateDiscount, 100)
    ```
*   **Thư viện hỗ trợ:** `System.Reflection`.

#### B. Delegates và Lambda (First-class Functions)
Các biến kiểu `Func<...>` hoặc `Action<...>` cho phép ta lưu trữ logic vào biến (biến code thành dữ liệu) và sau đó dùng lệnh `.Invoke()` (tương đương `apply`) để chạy nó.

*   **Ví dụ Code:**
    ```csharp
    // Lưu logic vào dữ liệu
    Func<int, int, int> myOperation = (a, b) => a + b;

    // Apply logic đó vào đối số
    int result = myOperation.Invoke(10, 20); 
    ```

#### C. Middleware Pipeline (Trình thông dịch của Framework)
Hệ thống Middleware của ASP.NET Core thực chất là một Cỗ máy phổ quát. Framework đọc danh sách các Middleware được đăng ký (Mô tả chương trình) và lần lượt `apply` `HttpContext` qua từng tầng xử lý.

## 8. Bài toán Dừng (The Halting Problem) và Giới hạn của Lập trình

Turing đã đặt ra câu hỏi: **"Liệu ta có thể viết một phần mềm để dự đoán xem một phần mềm khác sẽ chạy thành công và dừng lại (Halts) hay sẽ bị kẹt trong vòng lặp vô hạn (Loops forever) không?"**

Câu trả lời của ông là: **KHÔNG THỂ.**

### Chứng minh phản chứng qua "Hàm Nghịch lý" (C# Paradox)

Hãy tưởng tượng nếu chúng ta có một thư viện thần thánh có thể kiểm tra lỗi lặp vô hạn:

```csharp
// Giả định tồn tại một máy kiểm tra hoàn hảo
bool WillItHalt(Action program) {
    // Trả về true nếu chương trình dừng, false nếu chạy mãi mãi
    // ... logic thần thánh nào đó ...
}

// Bây giờ, ta viết một hàm nghịch lý (Paradox) sử dụng chính nó:
void Paradox() {
    if (WillItHalt(Paradox)) {
        // Nếu máy bảo Paradox sẽ DỪNG -> Ta bắt nó CHẠY MÃI MÃI
        while(true) { } 
    } else {
        // Nếu máy bảo Paradox sẽ CHẠY MÃI MÃI -> Ta cho nó DỪNG NGAY
        return; 
    }
}
```

**Câu hỏi: Điều gì xảy ra khi ta chạy `Paradox()`?**
*   Nếu nó **Dừng**, thì theo logic bên trong, nó phải **Chạy mãi mãi**.
*   Nếu nó **Chạy mãi mãi**, thì theo logic bên trong, nó phải **Dừng**.

Sự mâu thuẫn logic này chứng minh rằng hàm `WillItHalt` **không bao giờ có thể tồn tại**.

### Ý nghĩa đối với Codebase của bạn:

1.  **Unit Tests không bao giờ là đủ:** Vì không có thuật toán nào dự báo được mọi hành vi, nên dù bạn viết bao nhiêu Test cho `PredictionService` hay `ReportingService`, bạn cũng không bao giờ chắc chắn 100% hệ thống không bị "treo".
2.  **Cần có Timeout:** Vì máy tính không biết một tác vụ đang chạy lâu hay bị lặp vô hạn, chúng ta phải dùng `CancellationToken` và `Timeout` để ngắt cưỡng bức (vd: `HttpClient.Timeout`).
3.  **Static Analysis:** Các công cụ như Roslyn Analyzer hay SonarQube cố gắng tìm các vòng lặp vô hạn tiềm năng, nhưng dựa trên lý thuyết của Turing, các công cụ này chỉ có thể tìm thấy "dấu hiệu", chứ không bao giờ có thể khẳng định chắc chắn cho mọi trường hợp.

## 9. Quá trình Biên dịch: Từ Ngôn ngữ con người sang Ngôn ngữ máy

Để Cỗ máy Turing (CPU) có thể hiểu được những dòng code C# bạn viết, hệ thống phải trải qua một quá trình "phiên dịch" phức tạp, biến những ký tự văn bản thành các con số nhị phân.

### 1. Phân tích cú pháp (Parsing): Lexer và Parser
Khi bạn nhấn Build project, máy tính không đọc file `.cs` như một câu chuyện, mà nó thực hiện:

*   **Lexer (Bộ đọc từ vựng):** Nó cắt câu lệnh `var x = 5;` thành các mảnh nhỏ (Tokens). Giống như Brendan Eich đã viết cho JavaScript đời đầu, trình biên dịch C# (**Roslyn**) cũng có một Lexer để phân loại: `var` (keyword), `x` (identifier), `=` (operator), `5` (literal).
*   **Parser (Bộ phân tích cú pháp):** Nó kiểm tra "ngữ pháp". Nếu bạn viết `var 5 = x;`, Parser sẽ hét lên "Lỗi cú pháp!" vì nó không thể xây dựng được một Cây cú pháp (AST - Abstract Syntax Tree) hợp lệ.

### 2. Chuyển đổi ý nghĩa sang con số (Ví dụ của Ken Thompson)
Trình biên dịch phải được "dạy" để hiểu các ký hiệu trừu tượng. Ken Thompson (cha đẻ Unix) đã từng giải thích cách ông dạy trình biên dịch C hiểu ký tự `\v` (tab dọc) bằng cách gán nó với số **11** trong bảng mã ASCII.

**Trong Codebase của bạn:**
Khi bạn viết `string message = "Hello\nWorld";`, trình biên dịch Roslyn thực hiện chính xác điều Ken Thompson đã làm: nó quét chuỗi, tìm thấy `\n` và thay thế bằng mã Hex `0x0A` (xuống dòng) để CPU hiểu được phải làm gì với màn hình.

### 3. Phát sinh mã (Emit Bytecode/IL)
Thay vì dịch thẳng ra mã máy (Machine Code) vốn phụ thuộc vào loại chip (Intel, AMD hay ARM), .NET chọn cách dịch ra một dạng trung gian gọi là **Bytecode** (trong .NET gọi là **CIL - Common Intermediate Language**).

*   **Lợi ích:** Giống như nguyên bản JavaScript phát sinh bytecode để chạy nhanh hơn trên server, .NET phát sinh file `.dll` chứa mã IL. 
*   **Thực thi:** Khi bạn chạy ứng dụng, một "trình thông dịch đặc biệt" tên là **JIT (Just-In-Time Compiler)** sẽ đọc mã IL này và biến nó thành hành động thực tế trên CPU của máy chủ.

**Minh họa luồng dữ liệu:**
`Code C# (Con người)` -> `Lexer/Parser (Roslyn)` -> `CIL Bytecode (.dll)` -> `JIT Compiler` -> `Mã máy (Số nhị phân)` -> `CPU (Cỗ máy Turing)`.

## 10. Biến số và Ghi chú nháp (Variables & Rough Notes)

Trong bài báo năm 1936, Turing đề cập đến các ký hiệu "hỗ trợ trí nhớ" (assist the memory) gọi là **ghi chú nháp (rough notes)**. Chúng là nơi lưu trữ tạm thời để máy tính thực hiện các bước tiếp theo.

**Ví dụ Code trong SmartLMS:**
```csharp
// 1. Ghi ký hiệu vào "ô nhớ nháp"
string courseName = "Lập trình C#"; 

// 2. Đọc ký hiệu từ "ô nhớ nháp" để sử dụng
var logMessage = "Đang xem khóa học: " + courseName;
```

**Cấp độ máy Turing:**
1.  **Ghi (Write):** Khi khai báo `courseName`, trình biên dịch tìm một địa chỉ ô nhớ trống trên RAM và ghi chuỗi bit của chữ "Lập trình C#" vào đó.
2.  **Dịch chuyển & Đọc (Move & Read):** Khi thực hiện phép cộng chuỗi, đầu đọc dịch chuyển đến địa chỉ của `courseName`, đọc dữ liệu lên để ghép vào `logMessage`.

## 11. Lập trình hàm: Từ "m-functions" đến Call Stack

Alan Turing đã tiên đoán về lập trình hàm thông qua khái niệm **"m-functions"**. Thay vì viết lại toàn bộ các bước Đọc/Ghi cho mỗi lần sử dụng, ông nhóm chúng lại thành một hàm.

**Ví dụ Code trong SmartLMS:**
```csharp
public class CourseController : Controller 
{
    public IActionResult Details(int id) 
    {
        // GỌI HÀM: CPU "nhảy" (Đổi trạng thái) sang vùng nhớ của hàm GetCourse
        var course = _courseService.GetCourseById(id); 

        // KẾT THÚC HÀM: CPU "nhảy" quay lại đây (Đổi trạng thái lần nữa)
        return View(course);
    }
}
```

**Cấp độ máy Turing:**
*   **Đổi trạng thái (State Change):** Khi gọi `GetCourseById`, CPU lưu lại địa chỉ của dòng code kế tiếp vào "Stack", sau đó đổi trạng thái nội tại để bắt đầu thực thi các tập lệnh tại vùng nhớ của `GetCourseById`.
*   **Hoàn tất:** Lệnh `return` trong hàm chính là chỉ thị "Đổi trạng thái" để máy nạp lại địa chỉ cũ từ Stack và quay về luồng chính.

## 12. Trả về HTML: Ký hiệu trên băng giấy mạng

Khi Controller trả về HTML, dưới góc nhìn của Turing, đây chỉ là một **chuỗi văn bản phẳng** (stream of symbols).

**Ví dụ Code trong SmartLMS:**
```csharp
[HttpGet]
public IActionResult GetStatus()
{
    // Máy Turing sẽ chuẩn bị chuỗi ký hiệu này trong RAM (Rough notes)
    string htmlOutput = "<h1>Hệ thống ổn định</h1>";
    
    // Trả về cho Web Server (Ghi ra băng giấy mạng)
    return Content(htmlOutput, "text/html");
}
```

**Quy trình Turing thực tế:**
1.  **Chuẩn bị băng giấy:** CPU tạo ra chuỗi ký hiệu `<`, `h`, `1`, `>`, ... trong RAM.
2.  **Vòng lặp Output:** CPU chạy một vòng lặp: **Đọc** từng ký tự từ RAM -> **Dịch chuyển** đầu ghi đến Network Interface (cổng mạng) -> **Ghi** dữ liệu đó ra ngoài dưới dạng tín hiệu điện.

## 13. Nghịch lý về số lượng biến: Càng nhiều biến có càng làm máy "lag"?

Đây là một câu hỏi rất thực tế: **"Nếu tôi định nghĩa quá nhiều biến trong một hàm, máy có phải tốn công lưu trữ và lôi chúng ra, dẫn đến bị lag không?"**

Dưới góc nhìn của Cỗ máy Turing và kiến trúc máy tính hiện đại, câu trả lời là: **Vừa có, vừa không.**

### 1. Vùng nhớ Stack (Băng giấy tốc độ cao)
Hầu hết các biến cục bộ (như `int`, `bool`, `double`) được lưu ở vùng nhớ tên là **Stack**. 

*   **Ví dụ Code (An toàn, không lag):**
    ```csharp
    public void FastProcess() {
        // Dù bạn có 100 biến như thế này, máy vẫn chạy cực nhanh
        int a = 1; int b = 2; int c = 3; // ... x100
        int result = a + b + c; 
        // Khi kết thúc hàm, 100 biến này bị xóa sạch trong 1 nốt nhạc
    }
    ```
*   **Tốc độ:** Việc cấp phát 1 biến hay 100 biến trên Stack diễn ra **gần như tức thì** (chỉ mất 1 lệnh CPU để di chuyển con trỏ Stack).
*   **Kết luận:** Bạn định nghĩa 10 hay 50 biến cục bộ trong một hàm **không bao giờ** làm máy bạn bị "lag".

### 2. Sự thông minh của Trình biên dịch (Optimization)
Trình biên dịch Roslyn của C# cực kỳ "khôn ngoan". Nếu bạn định nghĩa 100 biến nhưng chỉ dùng 2 biến, khi biên dịch ra mã máy, 98 biến kia sẽ **bị xóa bỏ hoàn toàn**.

**Lời khuyên:** Đừng ngại đặt tên biến để code rõ ràng. CPU hiện đại có thể xử lý hàng tỷ phép tính mỗi giây, nên vài chục biến lẻ không phải là vấn đề. Hãy chỉ lo lắng khi bạn nạp hàng GB dữ liệu vào RAM mà thôi!

## 14. Trình biên dịch: Người phiên dịch sang Ngôn ngữ Turing cơ học

Nhiệm vụ tối thượng của Trình biên dịch (Compiler) chính là làm "thông dịch viên" để ánh xạ các logic bậc cao bạn viết xuống thành các chu kỳ cơ học nguyên thủy của Cỗ máy Turing.

### A. Khai báo biến & Lưu kết quả → Ghi lên dải băng (Tape)
*   **Trong code:** `int score = 100;`
*   **Cấp độ Turing:** Trình biên dịch biến dòng này thành lệnh yêu cầu máy quét tìm một ô trống (ô nhớ được cấp phát), sau đó viết các "ký hiệu" (chuỗi bit biểu diễn số 100) lên ô đó để ghi nhớ.

### B. Lệnh Điều kiện (if / else) → Đọc ký hiệu & Đổi trạng thái
*   **Ví dụ Code:**
    ```csharp
    if (score > 50) {
        // Trạng thái: Thành công
    } else {
        // Trạng thái: Thất bại
    }
    ```
*   **Cấp độ Turing:** CPU sẽ "quét" (Read) ô nhớ chứa biến `score`. Tùy thuộc vào ký hiệu đọc được (lớn hơn hay nhỏ hơn 50), máy sẽ thay đổi "trạng thái nội tại" (m-configuration) để rẽ nhánh (Jump) sang các khối lệnh tiếp theo tương ứng.

### C. Vòng lặp (for / while) → Dịch chuyển cơ học (L/R) & Nhảy trạng thái
CPU thực tế không có khái niệm "vòng lặp". Trình biên dịch biến nó thành sự kết hợp của dịch chuyển và nhảy.
*   **Ví dụ Code:**
    ```csharp
    for (int i = 0; i < 3; i++) {
        // Làm gì đó
    }
    ```
*   **Cấp độ Turing:**
    1.  **Ghi:** In số 0 vào ô nhớ của `i`.
    2.  **Dịch chuyển:** Di chuyển đầu đọc đến ô của `i` để kiểm tra điều kiện (Read).
    3.  **Hành động:** Nếu thỏa mãn, thực thi code bên trong.
    4.  **Dịch chuyển & Nhảy:** Tăng `i` (Write), sau đó "Nhảy" (đổi trạng thái) quay ngược lại bước 2. Quá trình này lặp lại cho đến khi đọc được ký hiệu khiến máy chuyển sang trạng thái **Dừng (HALT)**.

### D. Bản mô tả tiêu chuẩn (Standard Description - S.D)
Đây là sự kết nối vĩ đại nhất: Turing chứng minh ta không cần chế tạo các máy vật lý khác nhau cho mỗi bài toán. Ta chỉ cần một **Cỗ máy Vạn năng (Universal Machine - CPU)** và một **Bản mô tả (S.D)** các quy tắc.

*   **Thực tế:** Khi bạn bấm "Compile", trình biên dịch nén toàn bộ logic của bạn thành một file **Binary (.exe / .dll)**. 
*   **Ý nghĩa:** File Binary này chính là Bản mô tả chuẩn S.D. Khi nạp vào RAM, CPU (Cỗ máy vạn năng) đọc bản mô tả này và hoàn toàn "nhập vai" thành phần mềm bạn thiết kế.

---

### Tổng kết
Mọi công việc lập trình của bạn—từ việc đặt tên biến, chia nhỏ hàm cho đến việc trả về giao diện HTML—bản chất là bạn đang cung cấp cho **Cỗ máy Phổ quát (CPU)** một bộ "luật" cực kỳ phức tạp. Trình biên dịch băm nhỏ các luật đó thành hàng triệu dòng lệnh nhị phân đơn giản.

Khi chạy, CPU đơn giản là "nhắm mắt làm theo" đúng 4 bước cơ bản của Turing: **Đọc** từng con số, **Ghi** thay đổi, **Dịch chuyển** sang ô kế tiếp, và **Cập nhật trạng thái** rẽ nhánh. Đó chính là cách mọi ứng dụng web và thuật toán vĩ đại nhất thế giới đang vận hành.

