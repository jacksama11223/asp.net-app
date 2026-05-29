# LỘ TRÌNH PHÁT TRIỂN CỘNG ĐỒNG BẬC CAO (ADVANCED COMMUNITY ROADMAP)
*Tích hợp toàn diện: Database, Backend API, và UI/UX Assets Trăm Tiếng*

Dựa trên thực trạng mã nguồn hiện tại và Kho thiết kế Assets mới nhất do Stitch cung cấp, lộ trình phát triển được quy hoạch lại thành **4 Giai Đoạn (Phases)** chiến lược để nâng cấp mạng xã hội học tập SmartLMS.

---

## 🚀 GIAI ĐOẠN 1: Chuẩn Hóa Nhận Diện & Tích Hợp Assets (Mất 1-2 Ngày)
*Mục tiêu: Áp dụng ngay bộ mặt "Trăm Tiếng" lên toàn hệ thống mà không chạm sâu vào Backend.*

1. **Rút trích Kho Assets:** 
   - Chạy script bóc tách tự động mã SVG từ file nén của Stitch.
   - Chuyển vào `wwwroot/images/icons/` (MVC) và `src/assets/icons/` (React).
2. **Đồng bộ Nhận diện Thương hiệu (Branding):**
   - Đưa Logo Cây Ngôn Ngữ vào Header/Footer.
   - Cấu hình Favicon chuẩn W3C (`favicon.svg`, `apple-touch-icon.png`) trong `_Layout.cshtml`.
3. **Chuẩn hóa Bảng Màu CSS:** Đè lại các biến CSS (`--brand-green`, `--brand-blue`, v.v.) theo đúng bộ màu của "Trăm Tiếng".
4. **Nâng cấp UI Sơ bộ:** 
   - Thay các icon menu cũ bằng icon do Stitch vẽ. 
   - Gắn hình ảnh minh họa (Empty States) nghệ thuật cho trang Lỗi 404 và Trang trống.

---

## 🗄️ GIAI ĐOẠN 2: Mở Rộng Hạ Tầng Dữ Liệu (Database Expansion) (Mất 2-3 Ngày)
*Mục tiêu: Đổ nền móng vật lý cho các tính năng tương tác bậc cao.*

1. **Bổ sung cột cho Bảng hiện tại:**
   - Bảng `Comments`: Thêm `AttachmentIds` (string), `IsPinned` (bool), `IsEdited` (bool).
2. **Xây mới các Bảng (Models):**
   - Bảng Tương tác: `UserReactions` (Like, Love, Haha, v.v.), `CommentVotes` (Upvote/Downvote).
   - Bảng Khảo sát (Poll): `Polls`, `PollOptions`, `PollVotes`.
   - Bảng Lịch sử: `CommentEditHistories`.
3. **Thực thi:** Khai báo DbSet vào `SmartLMSContext.cs` và chạy lệnh Migration lên MariaDB Production.

---

## ⚙️ GIAI ĐOẠN 3: Phát Triển Hệ Thống API & Realtime (Mất 3-5 Ngày)
*Mục tiêu: Lấp đầy "Khoảng trống Backend" hiện đang thiếu hụt trầm trọng.*

1. **Hoàn thiện API Quản lý Nội dung (CRUD):**
   - `[PUT] /comments/{id}`: Lưu lịch sử cũ vào bảng History và cập nhật nội dung mới.
   - `[DELETE] /comments/{id}`: Bật cờ `IsDeleted = true` (Xóa mềm).
2. **Cập nhật Thuật toán Cấu trúc Cây:**
   - Sửa API `GetPostDetail` hiện hành để biến danh sách Comment phẳng thành dạng Đệ quy (Dựa vào `ParentId`).
3. **Xây dựng API Tương tác Mới:**
   - Cụm API Reaction: `[POST] /posts/{id}/react?type=love|haha|insightful`.
   - Cụm API Karma: `[POST] /comments/{id}/vote`.
   - Cụm API Poll: `PollApiController.cs` (Tạo và Vote Khảo sát).
4. **Hệ thống Thông báo Thời gian thực (SignalR):**
   - Khởi tạo `NotificationHub.cs`.
   - Bổ sung bộ quét Regex `/@([a-zA-Z0-9_]+)/g` vào API Đăng Comment để đẩy thông báo tag tên qua SignalR.

---

## 🎨 GIAI ĐOẠN 4: Triển Khai Tính Năng Lên Giao Diện (UI/UX Implementation) (Mất 3-5 Ngày)
*Mục tiêu: Lắp ráp UI Assets (GĐ 1) vào Logic API (GĐ 3) để tạo ra trải nghiệm "Wow".*

1. **Threaded Comments & Mentions:**
   - Ốp class CSS `.comment-thread-line` để kẻ vạch nối các bình luận cha - con.
   - JS bọc tên người bị tag bằng thẻ class `.mention-tag` (Xanh nổi bật).
2. **Soft Delete & Hoàn Tác:**
   - Khi bấm Xóa, ẩn comment đi và hiện Snackbar Javascript báo "Đã Xóa - [Bấm để Hoàn tác]" trong 5 giây.
3. **Hiệu Ứng Reaction & Gamification:**
   - Gắn bộ icon `love.svg`, `haha.svg` lồng vào menu trượt lên khi hover nút Like.
   - Render tự động huy hiệu `verified-badge.svg` siêu đẹp cho câu trả lời đúng.
   - Gắn huy hiệu `level-x.svg` ngay cạnh Tên tác giả để kích thích ganh đua.
4. **Khảo sát (Polls) nội tuyến:** 
   - Render UI dạng Radio Button hoặc Progress Bar (kết quả phần trăm) ngay giữa luồng bình luận.

---
**🎯 ĐỀ XUẤT HÀNH ĐỘNG CỦA AI:**
Lộ trình đã được chia thành 4 chặng vô cùng rành mạch và an toàn. Tốt nhất chúng ta nên khởi động bằng **Giai Đoạn 1 (Xử lý Kho Assets)** trước để giải phóng "đống file nén" kia, tạo ngay hiệu ứng mướt mắt cho website, sau đó mới đi sâu vào mổ xẻ Backend. Ngài "Duyệt" Lộ trình này chứ?
