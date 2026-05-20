# Cấu trúc Giao diện & Kiến trúc Frontend của SmartLMS.AI

Tài liệu này giải thích cấu trúc file `GIAO_DIEN_TRANG_WEB.html` đã được tổng hợp để bạn mang sang các prompt/LLM khác nhằm đề xuất tính năng mới.

## 1. Mục đích
Hệ thống SmartLMS không phải là một cục code duy nhất mà được chia làm 3 phân hệ giao diện hoàn toàn độc lập về công nghệ. Việc hiểu rõ ranh giới này giúp các đề xuất tính năng mới khả thi và không phá vỡ kiến trúc (Modular Monolith & Event-Driven).

## 2. Phân tách 3 Phân hệ UI chính

### Phân hệ 1: Học viên (React Single Page Application)
- **Công nghệ**: React, Vite, Tailwind CSS, Mantine UI.
- **Vị trí code**: Thư mục `react-test-frontend/src/`
- **Các trang tiêu biểu**: `CourseDetails.jsx`, `LandingPage.jsx`, `StudyWorkspace.jsx`
- **Đặc điểm**: Render phía Client. UI rất động và mượt mà. 
- **Kết nối Backend**: Thông qua Axios gọi REST API (`/api/public/...`). 
- **Cách yêu cầu tính năng**: *"Hãy viết code React/Tailwind cho giao diện X, gọi API Y."*

### Phân hệ 2: Quản trị & Giảng viên (ASP.NET Core MVC)
- **Công nghệ**: C# Razor Views (`.cshtml`), Bootstrap / Tailwind, jQuery.
- **Vị trí code**: Thư mục `SmartLMS.Web/Views/` (VD: `CourseManagement`, `Dashboard`)
- **Đặc điểm**: Render phía Server (SSR). Chú trọng tính ổn định, thao tác form phức tạp và CRUD dữ liệu.
- **Kết nối Backend**: Controller C# gọi trực tiếp vào Database thông qua `Repository`.
- **Cách yêu cầu tính năng**: *"Hãy viết file `.cshtml` để hiển thị table dữ liệu, sử dụng `@model IEnumerable<Model>`."*

### Phân hệ 3: Cộng đồng & Gamification (SmartLMS.Community)
- **Công nghệ**: C# Razor Pages, SignalR (Real-time).
- **Vị trí code**: Thư mục `asp.net-group/SmartLMS.Community/Views/`
- **Đặc điểm**: Đây là một module độc lập hoàn toàn với Core (tách biệt Database). Xử lý tin nhắn, feed mạng xã hội, điểm thưởng.
- **Kết nối Backend**: Giao tiếp với Core (Phân hệ 1 & 2) thông qua **RabbitMQ Message Bus**. Core phát sự kiện (ví dụ: `CourseCompleted`), Community lắng nghe và cộng điểm/đăng bài.
- **Cách yêu cầu tính năng**: *"Thiết kế giao diện Razor Page lắng nghe sự kiện RabbitMQ để hiển thị popup realtime bằng SignalR."*

## 3. Cách dùng file HTML Tổng hợp

File `GIAO_DIEN_TRANG_WEB.html` là một file duy nhất chứa thiết kế tĩnh (mockup) của cả 3 phân hệ trên, có gắn sẵn Tailwind CSS qua CDN.
Khi bạn nhờ một AI khác (hoặc team UX/UI):
1. Gửi file `GIAO_DIEN_TRANG_WEB.html` cho họ mở trên trình duyệt.
2. Bảo họ: *"Đây là cấu trúc 3 phần của hệ thống. Tôi muốn thêm tính năng [X] vào phần [1/2/3], hãy viết code cho tôi theo đúng công nghệ của phần đó."*
3. Họ có thể sửa trực tiếp HTML/Tailwind trên file đó để demo cho bạn xem trước khi chúng ta đưa vào code thật.
