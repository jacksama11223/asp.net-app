# HƯỚNG DẪN TÍCH HỢP GIAO DIỆN SMARTLMS VÀO DỰ ÁN .NET

Chào bạn! Dưới đây là hướng dẫn chi tiết từng bước để đưa toàn bộ giao diện đã thiết kế vào dự án **ASP.NET Core (MVC, Razor Pages hoặc Blazor)** của bạn.

---

## 1. PHÂN TÍCH: Giao diện có dùng nhiều thư viện UI không?

**CÂU TRẢ LỜI LÀ KHÔNG.**
Giao diện **SmartLMS** được xây dựng dựa trên nguyên tắc tối giản và kiểm soát mã nguồn tối đa:
*   **Không sử dụng** các bộ thư viện UI component đóng gói sẵn (như *Ant Design, Bootstrap JS, Material UI, PrimeReact...*). Các thẻ giao diện là các thẻ HTML thuần túy (`<div>`, `<button>`, `<input>`, `<textarea>`).
*   **Không sử dụng** CSS tùy biến phức tạp. Toàn bộ màu sắc, hiệu ứng bóng mờ (box-shadow), bo góc, flexbox/grid layout đều sử dụng **Tailwind CSS** thông qua các class trực tiếp trên thẻ HTML.
*   **Icon:** Sử dụng thư viện icon SVG nhẹ nhàng và hiện đại là `lucide-react`.

Vì vậy, mã HTML cấu trúc này **hoàn toàn tương thích và cực kỳ dễ dàng chuyển đổi sang dự án .NET** mà không sợ xung đột hay lỗi thư viện phức tạp!

---

## 2. CÁCH ĐƯA GIAO DIỆN VÀO DỰ ÁN .NET (ASP.NET Core)

### Bước 1: Khai báo thư viện Tailwind CSS trong file Layout chung
Để toàn bộ các class CSS chạy ngay lập tức trong dự án .NET của bạn, bạn chỉ cần nhúng CDN Tailwind CSS vào phần `<head>` của file layout chung (Ví dụ: `_Layout.cshtml` đối với MVC/Razor Pages, hoặc `App.razor` đối với Blazor).

Mở tệp `Views/Shared/_Layout.cshtml` và thêm mã sau vào trước thẻ đóng `</head>`:

```html
<!-- Bộ font Outfit giống hệt trên SmartLMS Hub -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Nhúng bộ xử lý Tailwind CSS (Chỉ cần dòng này là tất cả các class layout hoạt động) -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Cấu hình Font mặc định cho Tailwind trong dự án của bạn -->
<script>
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Outfit', 'sans-serif'],
                }
            }
        }
    }
</script>

<style>
    /* CSS hiệu ứng Glassmorphism đặc thù của SmartLMS Hub */
    .glass-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(186, 230, 253, 0.4);
        box-shadow: 0 4px 20px -2px rgba(186, 230, 253, 0.35);
    }
</style>
```

---

### Bước 2: Tích hợp mã nguồn của từng chức năng

Dưới đây là cách chuyển đổi mã React của từng View/Component thành mã Razor / HTML trong .NET:

#### A. Đối với ASP.NET Core MVC hoặc Razor Pages (`.cshtml`)
Bạn có thể tách các vùng giao diện thành các **Partial Views** hoặc **View Components**.

Ví dụ, chuyển đổi thanh **Header điều hướng** sang `_Header.cshtml`:
```html
<header class="sticky top-0 z-50 w-full bg-white border-b border-cyan-100 py-4 shadow-sm select-none">
    <div class="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <!-- Logo thương hiệu -->
        <div class="flex items-center gap-3 cursor-pointer">
            <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200">
                <span class="text-white font-extrabold text-xl">S</span>
            </div>
            <div>
                <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 tracking-tight leading-tight">
                    SmartLMS Hub
                </h1>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">distributed learning hub</p>
            </div>
        </div>

        <!-- Thanh tìm kiếm & Actions -->
        <div class="flex flex-wrap items-center justify-end gap-3.5 w-full sm:w-auto">
            <div class="relative">
                <input type="text" placeholder="Tìm thảo luận, tài liệu, lớp học..." class="pl-10 pr-4 py-2.5 bg-slate-100/80 border-none text-slate-700 placeholder-slate-400 rounded-full w-48 sm:w-64 focus:ring-2 focus:ring-cyan-500 focus:bg-white text-xs transition-all outline-none font-medium" />
                <span class="absolute left-3.5 top-3 text-slate-400">🔍</span>
            </div>
        </div>
    </div>
</header>
```

Vòng lặp danh sách bài thảo luận viết bằng Razor (truyền dữ liệu từ Model của C#):
```html
@model List<SmartLMS.Models.PostViewModel>

<div class="space-y-4">
    @foreach (var post in Model)
    {
        <div class="bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200/80 shadow-sm transition-all group">
            <div class="flex justify-between items-start mb-4">
                <div class="flex items-center gap-3">
                    <img src="@post.AuthorAvatar" class="w-10 h-10 rounded-xl border border-slate-100" />
                    <div>
                        <div class="flex items-center gap-2">
                          <span class="font-bold text-slate-800 text-sm">@post.AuthorName</span>
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-cyan-100 text-cyan-700">
                              @post.AuthorRole
                          </span>
                        </div>
                        <p class="text-[11px] text-slate-400">@post.CreatedAt.ToString("dd/MM/yyyy HH:mm")</p>
                    </div>
                </div>
            </div>

            <h4 class="text-base font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
                @post.Title
            </h4>
            <p class="text-slate-605 text-sm leading-relaxed mt-2">
                @post.Content
            </p>
        </div>
    }
</div>
```

---

## 3. CÁCH CUSTOM SANG CSS THUẦN (Nếu hoàn toàn KHÔNG muốn dùng Tailwind CSS)

Nếu dự án của bạn sử dụng CSS cứng truyền thống và bạn không muốn tải thêm bất kỳ file CSS tiện ích bên ngoài nào, bạn chỉ cần một sơ đồ lớp tương ứng đơn giản dưới đây. Bạn có thể định nghĩa các lớp này trực tiếp trong file `site.css` của dự án:

```css
/* Custom CSS thuần thay thế cho Tailwind cho phong cách Vibrant Palette */

/* Định nghĩa hệ thống màu sắc */
:root {
  --lms-bg-light: #f0f9ff;
  --lms-text-dark: #1e293b;
  --lms-primary-cyan: #06b6d4;
  --lms-primary-blue: #2563eb;
  --lms-border: rgba(186, 230, 253, 0.4);
}

/* Kiểu dáng khối bao quanh chính */
.main-wrapper {
  background-color: var(--lms-bg-light);
  font-family: 'Outfit', sans-serif;
  color: var(--lms-text-dark);
}

/* Thẻ Glassmorphism Card chuyên nghiệp */
.lms-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--lms-border);
  box-shadow: 0 4px 20px -2px rgba(186, 230, 253, 0.35);
  transition: all 0.25s ease;
}

.lms-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(186, 230, 253, 0.5);
}

/* Avatar bo tròn góc hiện đại */
.lms-avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Nhãn biểu thị vai trò cụ thể */
.role-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
  text-transform: uppercase;
}
.role-badge.student {
  background-color: #ecfeff;
  color: #0891b2;
  border: 1px solid #cffafe;
}
.role-badge.instructor {
  background-color: #fff1f2;
  color: #e11d48;
  border: 1px solid #ffe4e6;
}
