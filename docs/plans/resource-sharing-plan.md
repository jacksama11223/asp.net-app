# Lộ trình Hoàn thiện & Đồng bộ Trang Chia sẻ Tài nguyên (Resource Sharing Plan)

Dựa trên việc đối chiếu thiết kế gốc (React Mockup: `ResourceLibrary.jsx`) và giao diện thực tế hiện đang chạy trên máy chủ (`Resources.cshtml` - Cổng 3080), hệ thống chia sẻ tài nguyên hiện vẫn đang **thiếu sót rất nhiều tính năng cốt lõi và giao diện**. 

Tài liệu này đóng vai trò là "Bản thiết kế thi công" để bổ sung toàn bộ các phần còn thiếu, đưa trang `Resources` đạt độ hoàn thiện 100% như cam kết.

---

## 🛑 Những Điểm Còn Thiếu Trên Trang Hiện Tại (Gap Analysis)

### 1. Thiếu Hero Section (Khu vực Banner Khám phá)
- **Thực tế:** Trang `/hub/resources` hiện tại chỉ có một thanh bộ lọc nhỏ ở trên cùng, trông khá trống trải.
- **Thiết kế gốc:** Cần có một khối Hero Section lớn với hiệu ứng Glassmorphism, hiển thị tiêu đề "Khám phá Kho Tàng Tài Nguyên Chuyên Sâu", slogan, và 2 nút Call-to-Action ("Tải lên Tài liệu" & "Xem Bảng xếp hạng"). Đi kèm hiệu ứng đồ họa icon Sparkles.

### 2. Thiếu Thanh Tìm kiếm (Search Bar) & Bộ lọc Nâng cao
- **Thực tế:** Chỉ có bộ lọc theo "Môn học" (.NET, Database...).
- **Thiết kế gốc:** Cần có một ô `TextInput` lớn hỗ trợ tìm kiếm tài liệu theo từ khóa (Tiêu đề, mô tả).
- **Thiết kế gốc:** Thiếu các nút Badge lọc nhanh theo định dạng file như "PDFs", "Ebooks", "Source Code".

### 3. Thiếu Nút "Lưu Bộ Sưu Tập" (Bookmark)
- **Thực tế:** Mỗi thẻ tài liệu (Card) chỉ có nút Like, Download, Share.
- **Thiết kế gốc:** Ở góc phải trên cùng của mỗi ảnh bìa tài liệu, phải có biểu tượng Bookmark để lưu tài liệu vào "Bộ sưu tập cá nhân" (`ResourceBookmarks`).

### 4. Thiếu Hệ Thống Đánh Giá Sao (Star Rating)
- **Thực tế:** Không có chức năng đánh giá sao.
- **Thiết kế gốc:** Phải có hệ thống hiển thị điểm đánh giá trung bình (ví dụ: 4.8 sao) kèm icon Ngôi sao (Star), và nút bấm để người dùng Rate (1-5 sao). Dữ liệu này lưu vào bảng `ResourceRatings`.

### 5. Thiếu Logic Gọi API Thực (Backend API Integration)
- **Thực tế:** Giao diện MVC đang render thẳng từ Model tĩnh. Các thao tác Like, Download chỉ đang chạy hiệu ứng Fake bằng Alpine.js (tăng số ảo).
- **Yêu cầu:** Cần viết các JavaScript fetch API gọi đến Backend (VD: `/api/ResourceApi/bookmark`, `/api/ResourceApi/rate`) để lưu dữ liệu thật xuống MariaDB (các bảng vừa được tạo ở bước trước).

### 6. Cửa Sổ Tải Lên (Upload) Chưa Hoàn Thiện
- Yêu cầu người dùng chọn file thực tế và hiển thị tiến trình tải (Progress Bar) để có UX mượt mà.

---

## 🚀 Kế Hoạch Triển Khai (Phases of Execution)

Để không can thiệp bằng lệnh SSH tự động (theo yêu cầu của Ngài), tôi đã chuẩn bị lộ trình chi tiết để Ngài có thể thao tác thủ công một cách an toàn nhất:

### Bước 1: Nâng cấp Giao diện MVC (Front-end Sync)
**Mục tiêu:** Cập nhật file `Resources.cshtml` để bổ sung Hero Section, Thanh tìm kiếm, Nút Bookmark và Rating.
- **File cần sửa:** `c:\code\asp.net\asp.net-group\SmartLMS.Community\Views\Community\Resources.cshtml`
- **Phương án:** Tôi sẽ viết code và lưu thẳng vào file cục bộ trên máy tính của ngài.

### Bước 2: Bổ sung API Logic cho Cộng đồng (Backend Sync)
**Mục tiêu:** Xây dựng các Endpoint API để xử lý Bookmark, Rating, ViewCount, DownloadCount.
- **File cần tạo/sửa:** `c:\code\asp.net\asp.net-group\SmartLMS.Community\Controllers\ResourceApiController.cs`
- **Phương án:** Tôi sẽ viết API Controller trực tiếp vào thư mục mã nguồn.

### Bước 3: Cập nhật CSDL nội bộ
**Mục tiêu:** Đồng bộ lại các model và chạy migration nội bộ để khi build không bị lỗi.

### Bước 4: Deploy Thủ Công lên Máy Chủ
Sau khi cập nhật mã nguồn trên máy tính nội bộ, Ngài chỉ cần thực hiện thao tác Git và SSH thủ công:
1. **Commit & Push:** Đẩy code lên nhánh `main` của Github để trigger quy trình CI/CD.
2. **Đợi Build:** Đợi Github Action chạy xong và báo xanh.
3. **Kéo code & Restart trên VPS:** Đăng nhập vào VPS (`141.253.114.218`) chạy lệnh:
   ```bash
   cd ~/asp.net-app
   docker compose pull community backend
   docker compose up -d
   ```
