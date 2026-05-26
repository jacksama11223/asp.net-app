# 🛠️ KẾ HOẠCH NÂNG CẤP MODULE BÌNH LUẬN & HỒ SƠ NGƯỜI DÚNG (Community Hub)

## 1. Trạng thái hiện tại
- Chức năng đăng bài (Post) đã hoạt động tốt, tuy nhiên ở bảng tin khi bấm vào "Bình luận" thì chưa có phản hồi.
- Thiếu hệ thống quản lý Bình luận (Comment Module) cho các bài viết.
- Người dùng chưa có hình đại diện (Avatar) đồng nhất.
- Chưa có trang Hồ sơ cá nhân (Public Profile) khi click vào Avatar của người khác để xem thông tin chi tiết.

## 2. Phân tích và Giải pháp (System Design)

### A. Module Bình luận (Comment System)
**Mục tiêu:** Cho phép học viên thảo luận, trả lời (reply) qua lại trên các bài viết.
- **Backend (API):**
  - Cần thêm API `[HttpPost] AddComment(int postId, string content)` trong `CommunityController`.
  - Cần truy vấn gộp (`Include(p => p.Comments)`) khi hiển thị bài viết chi tiết (`/hub/post/{id}`).
- **UI/UX:**
  - Thiết kế UI khung nhập bình luận dạng thả xuống (Collapse) ở mỗi thẻ bài viết trên trang Hub.
  - Hoặc tạo trang chi tiết bài viết (Post Detail Page) để tập trung hiển thị danh sách bình luận (giống Facebook/Reddit).
  - Hỗ trợ Markdown cơ bản trong bình luận (để sinh viên dễ paste code).

### B. Module Avatar & Danh tính số (Identity)
**Mục tiêu:** Định danh trực quan người dùng, chống ẩn danh độc hại.
- **Tích hợp API Avatar:** Sử dụng dịch vụ `ui-avatars.com` (tạo ảnh từ chữ cái đầu) hoặc `DiceBear` (tạo nhân vật ngẫu nhiên dựa trên email) làm mặc định cho toàn bộ hệ thống để đảm bảo luôn có avatar đẹp.
- **Backend:** Thêm cột `AvatarUrl` vào bảng `Users` nếu muốn cho phép người dùng tự upload ảnh thực tế.
- **UI/UX:** Bo tròn avatar (rounded-full) đồng nhất ở mọi nơi (Header, Post, Comment).

### C. Module Hồ sơ cá nhân (Public Profile)
**Mục tiêu:** Khi click vào Avatar của ai đó, sẽ nhảy sang trang `/profile/{username}` hiển thị thành tựu.
- **Backend:**
  - Tạo `ProfileController` hoặc thêm API `/profile/{userId}`.
  - Truy vấn thông tin: Các Khóa học đã học, Tổng XP, Huy hiệu (Badges) đã đạt được, Các Bài viết (Posts) đã đăng, Chức vụ (Role/LecturerStatus).
- **UI/UX:**
  - Trang cá nhân phong cách Portfolio xịn xò (Hiển thị Bảng xếp hạng, Thống kê thời gian xem video, Nút "Gửi tin nhắn" (Connect)).

## 3. Lộ trình Triển khai (Roadmap)

**Giai đoạn 1: Sửa lỗi & Xây dựng trang Chi tiết bài viết (Post Detail)**
- Khắc phục lỗi đăng bài (Đã thực hiện: Do Javascript clear form trước khi submit).
- Code trang `/hub/post/{id}` để bấm vào bài sẽ đọc full nội dung.

**Giai đoạn 2: Phát triển Module Comment**
- Code API Insert Comment vào MariaDB.
- Vẽ UI danh sách Comment kèm Avatar chuẩn hóa.

**Giai đoạn 3: Phát triển Trang Hồ sơ Học viên (Public Profile)**
- Thiết kế giao diện `Profile.cshtml`.
- Kết nối dữ liệu thành tựu học tập (XP, Badges) từ bảng Gamification.
- Cấu hình link từ Avatar trên mọi ngóc ngách của hệ thống dẫn về trang này.

> **Kết luận:** Việc xây dựng hệ sinh thái Avatar + Comment + Profile sẽ biến SmartLMS.AI từ một "web khóa học khô khan" thành một **"Mạng xã hội học tập"** (Social Learning Network) thực thụ, tăng tính gắn kết của sinh viên.
