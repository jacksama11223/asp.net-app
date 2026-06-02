# 🏆 HƯỚNG DẪN VẬN HÀNH & SỬ DỤNG PHÂN HỆ GIAO DIỆN PREMIUM (SMARTLMS.AI)

Tài liệu này tổng hợp toàn bộ các nâng cấp giao diện SaaS Premium hiện đại, cách vận hành thực tế và kịch bản hướng dẫn trải nghiệm các tính năng mới nhất trên hệ thống **SmartLMS.AI**.

---

## 🧭 1. TỔNG QUAN HỆ THỐNG GIAO DIỆN MỚI NÂNG CẤP

Hệ thống giao diện của **SmartLMS.AI** đã được tái cấu trúc từ các trang web tĩnh (MVC Views) sang mô hình **Single Page Application (SPA)** mượt mà phía Frontend kết hợp với **Monolith Engine** bảo mật phía Backend.

| Phân hệ tính năng | Công nghệ UI áp dụng | Vị trí tệp tin nguồn | Mục tiêu trải nghiệm người dùng |
| :--- | :--- | :--- | :--- |
| **Xác minh Chứng chỉ Số** | Glassmorphism, Mantine UI, Lucide | [CertificateView.jsx](file:///c:/code/asp.net/react-test-frontend/src/pages/CertificateView.jsx) | Hiển thị chứng chỉ số sang trọng, hỗ trợ tải xuống PDF và nhúng LinkedIn. |
| **Lịch rảnh Giảng viên** | SimpleGrid, Interactive Cards, Mantine | [TutorSchedule.jsx](file:///c:/code/asp.net/react-test-frontend/src/pages/TutorSchedule.jsx) | Đăng ký khung giờ rảnh và đồng bộ hóa với Zoom API. |
| **Truy vết Audit người dùng** | Bootstrap Offcanvas, DataTables | [UserManagement/Index.cshtml](file:///c:/code/asp.net/SmartLMS.Web/Views/UserManagement/Index.cshtml) | Xem nhật ký hoạt động chi tiết mà không cần tải lại trang. |
| **Bảo mật trạng thái tài khoản** | SweetAlert2, jQuery AJAX | [UserManagement/Index.cshtml](file:///c:/code/asp.net/SmartLMS.Web/Views/UserManagement/Index.cshtml) | Khóa/Mở khóa tài khoản an toàn với hiệu ứng popup mượt mà. |

---

## 📖 2. HƯỚNG DẪN CHI TIẾT CÁCH SỬ DỤNG TỪNG TÍNH NĂNG MỚI

### 🎖️ 2.1. Trang Xác Minh & Xem Chứng Chỉ Số (Certificate View)
Giao diện được thiết kế theo phong cách chứng chỉ số cao cấp châu Âu với hoa văn Slate và viền bo sang trọng.

#### **Cách truy cập và trải nghiệm:**
1. Trên giao diện Học viên, truy cập đường dẫn: `/certificate/:courseId` (Ví dụ: `/certificate/2`).
2. **Hiệu ứng AI loading**: Hệ thống hiển thị hiệu ứng Loading thanh ngang của Mantine trong 600ms giả lập quá trình AI xác minh tiến độ học tập trên Blockchain/Backend.
3. **Thông tin chứng chỉ hiển thị**:
   * Tên khóa học, tên học viên, ngày cấp và giảng viên bảo chứng.
   * **Mã chứng chỉ (Credential ID)** dạng duy nhất: `CERT-SLMS-102-9481`.
   * **Tích xanh xác minh** sử dụng biểu tượng `LuCircleCheck` (Màu xanh Emerald) khẳng định chứng chỉ đã được lưu vết an toàn trên CSDL.
   * **Cryptographic Hash**: Dòng mã băm bảo mật 40 ký tự đảm bảo tính chống giả mạo của chứng chỉ.
4. **Các nút tương tác nổi bật**:
   * **Nút "Tải Xuống PDF Bản Cứng"** (Màu Gradient Indigo): Khi nhấn, hệ thống sẽ mô phỏng quá trình đóng gói và tải xuống file PDF chất lượng cao.
   * **Nút "Chia Sẻ Chứng Chỉ"**: Tự động sao chép liên kết chứng chỉ số duy nhất vào bộ nhớ tạm (Clipboard) để học viên nhúng trực tiếp vào hồ sơ cá nhân trên LinkedIn.

---

### 🗓️ 2.2. Góc Đăng Ký Lịch Biểu Giảng Viên (Tutor Availability)
Giao diện phân vùng thông minh bằng Mantine SimpleGrid chia làm 2 cột: Cột thêm mới và Cột danh sách trực quan.

#### **Cách sử dụng:**
1. Truy cập phân hệ giảng viên thông qua đường dẫn: `/tutor/schedule`.
2. **Thêm khung giờ rảnh mới (Cột trái)**:
   * **Chọn ngày trong tuần**: Sử dụng hộp chọn dropdown tiếng Việt dễ sử dụng (Thứ Hai, Thứ Ba... Chủ Nhật).
   * **Chọn giờ bắt đầu**: Nhập giờ trực tiếp bằng input time chuẩn mực.
   * Nhấn nút **"Thêm Khung Giờ"** (Màu gradient Indigo), khung giờ rảnh mới sẽ được đẩy lập tức sang danh sách bên phải bằng state phản ứng thời gian thực (Reactive State).
3. **Quản lý danh sách giờ rảnh (Cột phải)**:
   * Danh sách hiển thị dưới dạng thẻ bo góc mượt mà, phân tách màu sắc (Viền xanh lá cho giờ đang kích hoạt, viền xám cho giờ tạm ngắt).
   * **Bật/Tắt kích hoạt**: Click trực tiếp vào checkbox ở từng thẻ để tạm ngắt hoặc mở lại giờ hẹn mà không cần xóa đi tạo lại.
   * **Xóa giờ hẹn**: Click vào biểu tượng thùng rác màu đỏ (`LuTrash`) để xóa khung giờ không còn rảnh nữa.
4. **Đồng bộ hóa**: Click nút **"Lưu Lịch Biểu"** ở góc phải màn hình để đồng bộ tức thời với Zoom API và hệ thống đặt lịch hẹn của học viên.

---

### 👥 2.3. Bảng Quản Trị Người Dùng & Truy Vết An Ninh (IAM Console)
Giao diện dành riêng cho Administrator kết hợp hiệu năng của DataTables và tính linh hoạt của Bootstrap Slide-out Offcanvas.

#### **Cách sử dụng:**
1. Truy cập trang quản trị bằng liên kết trên Sidebar hoặc: `/UserManagement/Index`.
2. **Khóa/Mở khóa tài khoản an toàn**:
   * Tại cột Thao tác, click biểu tượng khóa tài khoản (`fas fa-user-slash`).
   * Hệ thống hiển thị hộp xác nhận **SweetAlert2** trực quan màu đỏ xác nhận ý định khóa.
   * Khi Admin đồng ý, một POST AJAX request sẽ được gửi ngầm để cập nhật trạng thái `Status = 2` (Đã khóa) trong SQL Server và thực hiện reload bảng dữ liệu siêu tốc.
3. **Xem Nhật ký Audit chi tiết (Audit Trail Offcanvas)**:
   * Click vào biểu tượng đồng hồ lịch sử (`fas fa-history`) tại dòng của bất kỳ học viên nào.
   * Một khung **Offcanvas** hiện đại sẽ tự động trượt ra từ cạnh phải màn hình (slide-in).
   * Khung này tự động tải động dữ liệu nhật ký hoạt động lịch sử (CUD, đăng nhập, địa chỉ IP, thiết bị) của riêng người dùng đó từ API `/UserManagement/GetAuditTrail?userId={id}` mà không cần reload trang web, mang lại trải nghiệm tiện nghi tuyệt đối.

---

## 🛠️ 3. KIỂM ĐỊNH TÍNH TOÀN VẸN TỰ ĐỘNG (INTEGRITY SUITE)

Để đảm bảo hệ thống luôn ở trạng thái hoàn hảo nhất trước mỗi lần deploy, ngài có sẵn bộ 3 kịch bản kiểm tra an toàn sau ở thư mục gốc:

1. **`verify_library_exports.js` (Đối chiếu thư viện)**:
   * *Mục đích*: Kiểm định tính khớp nối của các import so với `node_modules` thực tế.
   * *Lệnh chạy*: `node verify_library_exports.js`
2. **`verify_extreme_integrity.js` (Rà soát liên kết chéo API/Client)**:
   * *Mục đích*: Quét toàn bộ C# Controllers và React Pages để đối chiếu các API Endpoint và client route chéo.
   * *Lệnh chạy*: `node verify_extreme_integrity.js`
3. **`verify_orphan_pages.js` (Phát hiện trang mồ côi)**:
   * *Mục đích*: Tìm kiếm các trang giao diện không có liên kết trỏ tới.
   * *Lệnh chạy*: `node verify_orphan_pages.js`

---

*Tài liệu được biên soạn và đồng bộ hóa bởi Antigravity AI Coding Assistant.*
