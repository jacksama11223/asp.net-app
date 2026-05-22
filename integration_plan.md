# Kế Hoạch Tích Hợp Toàn Diện (SEO, Tracking, Media, Security)

## 1. Mục Tiêu Tích Hợp
- **jQuery**: Thư viện DOM manipulation (cho các tính năng cũ hoặc plugin legacy trên MVC).
- **Open Graph (OG Tags)**: Tối ưu hóa SEO khi chia sẻ link lên mạng xã hội (Facebook, Zalo, LinkedIn).
- **Google Analytics (GA4) & Google Tag Manager (GTM)**: Theo dõi hành vi người dùng, lượt truy cập, sự kiện click.
- **reCAPTCHA (v2/v3)**: Chống bot/spam ở các form đăng nhập, đăng ký, quên mật khẩu.
- **Video.js**: Trình phát video HTML5 tùy biến cao cho các khóa học/bài giảng.

## 2. Phân Tích Kiến Trúc Hiện Tại
### A. Phân hệ Quản trị / Identity (ASP.NET Core MVC)
- **File gốc**: `SmartLMS.Web/Views/Shared/_Layout.cshtml`
- **Chiến lược tích hợp**:
  - **GTM/GA**: Đặt Script GTM ở `<head>` và `noscript` ở ngay sau `<body>`.
  - **Open Graph**: Sử dụng ViewBags (VD: `@ViewBag.OgTitle`, `@ViewBag.OgImage`) để render thẻ meta động theo từng trang (CourseDetail, Profile).
  - **jQuery**: Tải qua CDN (thường đã có sẵn trong ASP.NET MVC template, cần check phiên bản).
  - **reCAPTCHA**: Thêm script vào trang Login/Register (`SmartLMS.Web/Areas/Identity/...`).

### B. Phân hệ Front-end (React SPA)
- **File gốc**: `react-test-frontend/index.html`
- **Chiến lược tích hợp**:
  - **GTM/GA**: Đặt Script trực tiếp vào `index.html`. Dùng thư viện như `react-gtm-module` để push sự kiện khi chuyển trang (vì là SPA).
  - **Open Graph**: Dùng thư viện `react-helmet-async` để cập nhật meta tags tự động khi đổi route.
  - **Video.js**: Cài đặt package `video.js` qua npm, tạo component `VideoPlayer.jsx` tái sử dụng cho trang `StudyWorkspace.jsx`.
  - **reCAPTCHA**: Dùng `react-google-recaptcha` ở component `LoginPage.jsx`, `RegisterPage.jsx`.

## 3. Lộ Trình Triển Khai (Roadmap)

### Giai đoạn 1: Thiết lập Core Tracking & SEO (Toàn hệ thống)
1. Tạo tài khoản GTM & GA4, lấy các mã ID (GTM-XXXX, G-YYYY).
2. Cập nhật `_Layout.cshtml` (MVC) và `index.html` (React) để nhúng mã GTM/GA4 cơ bản.
3. Định nghĩa cấu trúc thẻ Open Graph động. Thêm thư viện `react-helmet-async` vào frontend.

### Giai đoạn 2: Trải nghiệm Media & Thư viện bổ trợ
1. Cài đặt `video.js` trong thư mục `react-test-frontend`.
2. Xây dựng component wrapper cho Video.js, tích hợp tính năng tự động lưu tiến trình video (kết hợp với Zustand store hiện có).
3. Kiểm tra và đảm bảo jQuery (nếu cần trên MVC) không xung đột với các scripts khác.

### Giai đoạn 3: Bảo mật với reCAPTCHA
1. Đăng ký Google reCAPTCHA v3 (ẩn) hoặc v2 (checkbox).
2. Tích hợp reCAPTCHA vào các Form Login/Register (React).
3. Xác thực reCAPTCHA token tại Backend (AuthApiController) trước khi xử lý đăng nhập/đăng ký.

## 4. Các Tệp Sẽ Bị Ảnh Hưởng
- `SmartLMS.Web/Views/Shared/_Layout.cshtml`
- `react-test-frontend/index.html`
- `react-test-frontend/package.json` (Thêm dependencies)
- `react-test-frontend/src/App.jsx` (Thêm HelmetProvider)
- `react-test-frontend/src/pages/StudyWorkspace.jsx` (Tích hợp Video.js)
- `react-test-frontend/src/pages/LoginPage.jsx` (Tích hợp reCAPTCHA)
- `SmartLMS.Web/Controllers/AuthApiController.cs` (Backend xác thực reCAPTCHA)
