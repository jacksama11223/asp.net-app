# 🐘 SmartLMS PHP API Tester

Đây là module standalone dùng để kiểm tra khả năng tích hợp Headless API của SmartLMS .NET Backend bằng ngôn ngữ PHP.

## 🚀 Tính năng
- **Xác thực API**: Sử dụng header `X-API-Key`.
- **Dữ liệu thời gian thực**: Lấy danh sách khóa học (GET) từ Backend .NET.
- **Tương tác**: Tạo khóa học mới (POST) trực tiếp từ giao diện PHP.
- **Zero-Dependency**: Sử dụng native `cURL` của PHP, không cần cài đặt Composer.
- **Premium UI**: Giao diện Glassmorphism hiện đại, Dark Mode, Responsive.

## 🛠️ Hướng dẫn sử dụng

### 1. Yêu cầu hệ thống
- Đã cài đặt **PHP 8.0** trở lên.
- Backend .NET đang chạy tại `http://localhost:5181`.

### 2. Cách chạy
Mở Terminal tại thư mục này và gõ:
```bash
php -S localhost:8000
```

### 3. Kiểm tra
- Truy cập `http://localhost:8000` trên trình duyệt.
- Lấy **API Key** từ trang quản trị hệ thống (phần IAM/API Management).
- Dán Key vào và bắt đầu gọi API.

## 📄 Cấu trúc
- `index.php`: Chứa toàn bộ Logic API và Giao diện UI.
