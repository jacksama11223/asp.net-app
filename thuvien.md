# Danh mục Thư viện & Thành phần UI (SmartLMS.AI)

Tài liệu này liệt kê các thư viện quan trọng được sử dụng trong hệ thống SmartLMS và vai trò cụ thể của chúng trong từng module.

## 1. Thành phần Global (Toàn hệ thống)
- **AdminLTE 3.2**: Bộ khung (Template) giao diện quản trị chính.
- **Bootstrap 4**: Hệ thống lưới (Grid), Modal, Dropdown và các thành phần UI cơ bản.
- **FontAwesome 5**: Hệ thống Icon hiển thị trên menu và các nút bấm.
- **Lucide Icons**: Bộ icon hiện đại, tối giản bổ sung cho FontAwesome.

---

## 2. Module: Students AI Predictor
- **DataTables.net**: Hiển thị danh sách hàng ngàn sinh viên, hỗ trợ tìm kiếm nhanh và phân trang AJAX.
- **jQuery Sparklines**: Vẽ biểu đồ xu hướng nhỏ (Trendlines) ngay tại từng dòng của bảng sinh viên.
- **Bootstrap Progress Bars**: Hiển thị thanh tiến trình rủi ro (Risk Levels) trực quan.
- **SweetAlert2**: Hiển thị hộp thoại xác nhận khi thực hiện chức năng "Nudge" (nhắc nhở sinh viên).
- **Dapper (Backend)**: Truy xuất dữ liệu sinh viên hiệu năng cao từ SQL Server.

---

## 3. Module: Quản lý Tài khoản (User Management)
- **DataTables.net**: Quản lý và lọc danh sách tài khoản theo vai trò (Admin/Teacher/Student).
- **SweetAlert2**: Xử lý các thông báo và xác nhận khi **Khóa/Mở khóa (Ban/Unban)** tài khoản.
- **ClosedXML (Backend)**: Thư viện lõi để tạo và xuất file **Excel (XLSX)** danh sách người dùng.
- **BCrypt.Net-Next (Backend)**: Mã hóa mật khẩu an toàn theo tiêu chuẩn quốc tế.

---

## 4. Module: Quản lý Lớp (Cohort Management)
- **Bootstrap Card Grid**: Hiển thị các lớp học dưới dạng thẻ (Cards) với hiệu ứng Glassmorphism.
- **Bootstrap Modals**: Giao diện nhập thông tin tạo lớp học mới và thêm thành viên.
- **SweetAlert2**: Thông báo thành công và xác nhận khi xóa sinh viên khỏi lớp.

---

## 5. Module: Master Console (SQL Management)
- **DataTables.net**: Tự động render kết quả từ các câu lệnh SQL động thành bảng dữ liệu chuyên nghiệp.
- **Styled Textarea & Ace Editor Concept**: Ô nhập liệu SQL với phông chữ monospace.
- **Dapper (Backend)**: Thực thi các câu lệnh T-SQL động và trả về dữ liệu dynamic.
- **SQL Audit Log (Custom)**: Hệ thống ghi log lưu vết mọi truy vấn của Admin.

---

## 6. Module: Authentication (Login/Register)
- **Animate.css**: Hiệu ứng chuyển động mượt mà khi hiện trang Đăng nhập/Đăng ký.
- **Custom Glassmorphism CSS**: Tạo hiệu ứng mờ nhám cao cấp cho các Form đăng nhập.
- **Microsoft Cookie Authentication**: Quản lý phiên đăng nhập và bảo mật người dùng.
