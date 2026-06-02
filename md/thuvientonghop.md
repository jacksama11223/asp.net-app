# Thư Viện Tổng Hợp & Luồng Tương Tác (SmartLMS Advanced)

Tài liệu này tổng hợp các thư viện bên thứ ba đã tích hợp và mô tả các luồng tương tác chính trong module Quản lý Khóa học nâng cấp.

## 1. Danh mục Thư viện tích hợp

| Thư viện | Phiên bản | Mục đích |
| :--- | :--- | :--- |
| **AdminLTE** | 3.2.0 | Framework giao diện chính (Sidebar, Control Sidebar, Cards). |
| **DataTables** | 1.11.5 | Hiển thị danh sách, tìm kiếm, phân trang và sắp xếp. |
| **DataTables Select** | 1.3.4 | Hỗ trợ chọn nhiều dòng (Multi-select) để thực hiện Bulk Actions. |
| **iCheck Bootstrap** | 3.0.1 | Tùy biến checkbox đẹp hơn, đồng bộ với phong cách hiện đại. |
| **jQuery Sparklines** | 2.1.2 | Vẽ biểu đồ xu hướng mini (Micro-analytics) trong các ô của bảng. |
| **jsTree** | 3.3.12 | Xây dựng cấu trúc đề cương bài học dạng cây với tính năng kéo thả. |
| **SweetAlert2** | 11.x | Hiển thị các thông báo xác nhận và thông báo thành công chuyên nghiệp. |
| **Lucide Icons** | Latest | Bộ icon tối giản, hiện đại bổ trợ cho FontAwesome. |

## 2. Luồng tương tác chính (Use Case Interaction)

### A. Quy trình Xử lý Hàng loạt (Bulk Actions)
1. **Chọn**: Admin tick vào checkbox ở đầu mỗi dòng hoặc tick "Chọn tất cả" ở Header.
2. **Kích hoạt**: Menu "Xử lý hàng loạt" sẽ tự động hiện lên khi có ít nhất 1 dòng được chọn.
3. **Thao tác**: Admin chọn "Xuất bản tất cả" hoặc "Xóa mục đã chọn".
4. **Xác nhận**: Hệ thống hiển thị SweetAlert2 để xác nhận.
5. **Thực thi**: Gửi mảng IDs qua AJAX tới API `BulkToggleStatus` hoặc `BulkDelete`.
6. **Cập nhật**: DataTables tự động reload dữ liệu mà không cần tải lại trang.

### B. Quy trình Xem nhanh (Quick Preview)
1. **Kích hoạt**: Admin click vào **Tên khóa học** trong danh sách.
2. **Tải dữ liệu**: Một AJAX request [GET] được gửi tới `/CourseManagement/GetDetails/{id}`.
3. **Hiển thị**: Dữ liệu được render thành Partial View và đẩy vào **AdminLTE Control Sidebar** (trượt từ bên phải vào).
4. **Trải nghiệm**: Cho phép xem nhanh thông tin giảng viên, giá, và dự báo AI mà không rời trang danh sách.

### C. Quản lý Đề cương dạng Cây (Curriculum Tree)
1. **Kích hoạt**: Click vào icon $\sitemap$ (Sitemap) ở cột Thao tác.
2. **Tải cấu trúc**: `jsTree` tải JSON phân cấp Module -> Lesson.
3. **Kéo thả**: Admin có thể kéo thả để thay đổi vị trí Chương hoặc di chuyển Bài học giữa các Chương.
4. **Chỉnh sửa**: Click vào một Node để hiển thị Form chỉnh sửa chi tiết (Tên, Video URL) ở khung bên phải.

## 3. Cấu hình Kỹ thuật quan quan trọng
- **Encoding**: Tất cả API trả về JSON đều sử dụng `JavaScriptEncoder.UnsafeRelaxedJsonEscaping` để bảo toàn ký tự Tiếng Việt Unicode.
- **Database**: Sử dụng kiểu dữ liệu `NVARCHAR` và tiền tố `N` trong SQL để đảm bảo lưu trữ chính xác tiếng Việt có dấu.
