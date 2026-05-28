# Kế hoạch Triển khai Module Siêu Trình Xem Tài Liệu (Universal Document Viewer)

## 1. Tầm nhìn & Mục tiêu
Thay vì bắt người dùng phải tải file đính kèm xuống máy (dễ dính virus, rác máy, đứt mạch cảm xúc học tập), chúng ta sẽ xây dựng một **Trình xem tài liệu trực tiếp trên trình duyệt (In-App Document Viewer)**. 
Người dùng chỉ cần click vào file đính kèm trong bất kỳ khung bình luận nào, một cửa sổ xem trước (Modal/Overlay) cao cấp sẽ bật lên ngay lập tức.

## 2. Kiến trúc API (Backend)
Cần bổ sung các Endpoint vào `AttachmentApiController` để phục vụ việc Streaming (truyền phát) tài liệu thay vì chỉ Download:

- **`GET /api/AttachmentApi/view/{id}`**: 
  - API đọc file từ ổ cứng (hoặc VPS Volume) và trả về Stream với Header `Content-Disposition: inline` (ép trình duyệt hiển thị, không tải về).
  - Tự động nhận diện MIME type (`application/pdf`, `image/jpeg`, `text/plain`).
- **`GET /api/AttachmentApi/metadata/{id}`**: 
  - Trả về JSON chứa thông tin file: Tên, Dung lượng, Loại file (PDF, Image, Code, v.v.) để Frontend biết cách mở.

## 3. Kiến trúc Frontend (Universal Viewer Module)
Chúng ta sẽ tạo một Component dùng chung (ví dụ: `document-viewer.js` và HTML Modal ẩn ở `_CommunityLayout.cshtml`).

Khi click vào file, hệ thống sẽ phân loại và mở bằng công nghệ tương ứng:

1. **Tài liệu PDF (`.pdf`)**: 
   - Mở bằng `<iframe src="/api/AttachmentApi/view/{id}">` để tận dụng trình đọc PDF gốc siêu mượt của Chrome/Edge, hoặc tích hợp thư viện `PDF.js` của Mozilla nếu muốn tùy biến giao diện đọc.
2. **Hình ảnh (`.jpg, .png, .webp, .gif`)**: 
   - Hiển thị qua thẻ `<img>` với tính năng Phóng to/Thu nhỏ (Zoom), Kéo thả (Pan), và chế độ xem toàn màn hình (Full-screen Lightbox).
3. **Code & Text (`.cs, .js, .txt, .json`)**: 
   - Lấy Text về và nhúng thẳng vào trình soạn thảo **Monaco Editor** (trình editor của VS Code mà hệ thống SmartLMS đã có sẵn ở module Sandbox) dưới dạng *Read-Only*. Trải nghiệm đọc code sẽ có highlight màu mè y hệt IDE chuyên nghiệp!
4. **Office Word/Excel (`.docx, .xlsx`)**: 
   - Tích hợp qua API của Microsoft Office Online Viewer (nếu file public) hoặc dùng thư viện Javascript nhẹ (như `mammoth.js`) để render HTML thô nhằm xem trước nhanh nội dung.

## 4. Trải nghiệm Người dùng (UX Workflow)
1. **Hiển thị File:** Trong khu vực bình luận (Q&A, Group, Event), file đính kèm hiện ra dạng thẻ đẹp mắt, có icon rõ ràng (Icon Đỏ cho PDF, Vàng cho Zip, Xanh cho Code).
2. **Tương tác Click:** 
   - Click chuột trái -> Mở **SmartLMS Viewer Modal** xem ngay lập tức, làm mờ phông nền (blur background) để tập trung.
   - Bên trong Modal Viewer sẽ có thêm nút "Tải xuống" ở góc phải bên trên nếu người dùng thực sự muốn lưu về máy.
3. **Bảo mật:** URL file được bảo vệ bằng Token. Người không tham gia khóa học/nhóm sẽ bị API chặn quyền xem (dựa trên UserId).

## 5. Các bước Lập trình cụ thể (Roadmap)
- **Giai đoạn 1:** Cập nhật `AttachmentApiController.cs` thêm hàm `GetFileStream(id)` với chế độ `inline`.
- **Giai đoạn 2:** Viết HTML/CSS cho Cửa sổ Modal hiển thị file (Popup rộng 90% màn hình).
- **Giai đoạn 3:** Viết mã Javascript (`viewer-core.js`) bắt sự kiện click vào file, nhận dạng đuôi file và nhúng (embed) thẻ Iframe / Image / Monaco Editor tương ứng.
- **Giai đoạn 4:** Lắp ráp tính năng chặn quyền xem file trái phép (Security Check).
