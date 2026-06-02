# Báo Cáo Phân Tích & Kế Hoạch Đảm Bảo Tech Stack (Wappalyzer Audit)

## 1. Tại sao Wappalyzer chưa nhận diện đủ?

Wappalyzer hoạt động bằng cách quét **DOM (HTML hiện tại)**, **biến toàn cục (window.xxx)**, và **network requests** trên trang web bạn đang xem.

| Công nghệ | Lý do chưa hiển thị trên trang chủ React | Giải pháp để Wappalyzer bắt được |
|-----------|------------------------------------------|----------------------------------|
| **jQuery** | Bạn đang xem trang React SPA. jQuery chỉ được nhúng ở phân hệ MVC (Admin/Dashboard). | Truy cập vào `/Dashboard` hoặc `/CourseManagement` (các trang MVC) để Wappalyzer nhận diện jQuery. |
| **reCAPTCHA** | Script reCAPTCHA chỉ được tải khi component `ReCAPTCHA` render (Lazy load). | Truy cập vào `/login` hoặc `/register` trên giao diện, Wappalyzer sẽ bắt được ngay lập tức. |
| **Video.js** | Mới chỉ cài đặt qua `npm install`, chưa import và sử dụng ở bất kỳ file `.jsx` nào. | Cần tạo `VideoPlayer.jsx` và render nó trên trang `/study/:courseId`. |
| **Google Analytics** | Mới cấu hình GTM. GA4 chưa được trigger bên trong GTM (hoặc Wappalyzer gộp chung vào GTM). | Vào trang quản trị GTM (tagmanager.google.com), tạo Tag GA4 Configuration và kết nối ID `G-ZPFXZE76TF`. |
| **Open Graph** | Đã cấu hình `HelmetProvider` nhưng chưa dùng component `<Helmet>` để xuất meta tags ra thẻ `<head>`. | Thêm component `<Helmet>` vào trang chủ và trang chi tiết khóa học. |

## 2. Kế Hoạch Tích Hợp Chuyên Sâu (Deep Integration Plan)

### Bước 1: Gắn Open Graph (SEO) thực tế vào React Frontend
- **Tệp**: `react-test-frontend/src/pages/LandingPage.jsx` và `CourseDetails.jsx`
- **Hành động**: Import `Helmet` từ `react-helmet-async` và render các thẻ `<meta property="og:..." />`. Khi React render, Wappalyzer sẽ đọc được thẻ này.

### Bước 2: Tích hợp Video.js vào Không gian học tập (Study Workspace)
- **Tệp**: `react-test-frontend/src/components/VideoPlayer.jsx` (Tạo mới)
- **Hành động**: Import `video.js` và `video.js/dist/video-js.css`. Khởi tạo player instance. Khi truy cập vào bài học, Video.js sẽ mount vào DOM và Wappalyzer sẽ báo "Video.js detected".

### Bước 3: Đảm bảo jQuery load (Dành cho các trang legacy)
- **Hành động**: Nếu bạn muốn jQuery xuất hiện ở *cả* React (dù không khuyến khích do React có Virtual DOM), chúng ta có thể import thẳng jQuery vào `index.html`. Tuy nhiên, tốt nhất là giữ jQuery ở phía MVC (`_Layout.cshtml`). Bạn chỉ cần truy cập đúng route MVC (ví dụ `/Hangfire`) là Wappalyzer sẽ báo jQuery.

### Bước 4: Kích hoạt GA4 thông qua GTM
- **Hành động**: Đây là thao tác trên Cloud của Google. Bạn cần vào GTM Console -> Tags -> New -> Google Analytics: GA4 Configuration -> Nhập Measurement ID (`G-ZPFXZE76TF`) -> Trigger: All Pages -> Publish.

## 3. Lệnh kiểm tra (Verification)
Sau khi hoàn thiện các bước trên, hãy mở tab ẩn danh (Incognito), cài Wappalyzer và truy cập:
1. Trang chủ (`/`): Sẽ bắt được **React, Nginx, GTM, Open Graph, Tailwind**.
2. Trang Đăng nhập (`/login`): Sẽ bắt thêm được **reCAPTCHA**.
3. Trang Bài học (`/study/1`): Sẽ bắt thêm được **Video.js**.
4. Trang Admin MVC (`/Dashboard`): Sẽ bắt được **jQuery, Bootstrap**.
