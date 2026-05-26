# 🛠️ KẾ HOẠCH NÂNG CẤP ADMIN DASHBOARD (Duyệt bài Cộng đồng)

## 1. Trạng thái hiện tại
- Tính năng đăng bài mới (**CreatePostPage**) đã hoàn thiện giao diện chuẩn mực ở bản nháp.
- Lỗi đăng nhập `admin` trên trang 3080 đã được khắc phục (Gỡ bỏ ép buộc định dạng `@gmail.com` bằng cách đổi `type="email"` thành `type="text"` và vô hiệu hóa validate `[EmailAddress]` trong ViewModel).
- Chức năng **Seed Dữ liệu tự động** đã được nhúng thẳng vào API để bạn có thể gọi qua trình duyệt mà không cần Node script phức tạp!

## 2. Phân tích chức năng Duyệt bài (Admin Moderation)
Theo quan sát của bạn: "admin phải duyệt nội dung mới có bài hay sao ạ"
Thực tế, `ForumService` đang truy vấn dữ liệu với điều kiện `p.IsPublished == true`. Nếu học viên đăng bài, ta có thể đặt mặc định `IsPublished = false` (chờ duyệt).

### Các tính năng UI duyệt bài cần code thêm cho Admin (trên trang Quản trị Port 5181 hoặc Port 3080):
1. **Duyệt bài viết (Post Moderation Queue):**
   - Lưới danh sách bài viết chờ duyệt (`IsPublished = false`).
   - Các nút hành động: `[Duyệt Bài (Approve)]`, `[Từ Chối (Reject)]`, `[Yêu cầu sửa (Request Edit)]`.
2. **Duyệt Bình luận (Comment Flagging):**
   - User có thể Báo cáo (Report) bình luận độc hại.
   - Admin kiểm tra danh sách Cờ báo cáo (Flag) để Xóa/Ẩn bình luận.
3. **Quản lý Treo Thưởng (Bounty Dispute):**
   - Quản lý các ca "Treo 100 XP nhưng không chịu trao thưởng" sau 7 ngày.
   - Admin phán xử và cưỡng chế chuyển điểm XP (Force Transfer) cho người trả lời hay nhất.
4. **Phân quyền Mod (Moderator Assignment):**
   - Gắn tag Mod cho các sinh viên năm cuối (Role `Moderator`) để chia sẻ gánh nặng duyệt bài, không chỉ phụ thuộc vào một mình Admin.

## 3. Lộ trình triển khai (Đề xuất Giai đoạn tiếp theo)
- **Bước 1:** Bổ sung Cột `Status` (enum: Pending, Approved, Rejected) thay vì chỉ dùng boolean `IsPublished`.
- **Bước 2:** Xây dựng `AdminController.cs` (Khu vực Area: Admin) với View quản lý sử dụng DataTables.
- **Bước 3:** Tạo chức năng **Auto-Censor (AI/Regex)** tự động đánh dấu (flag) các bài viết chứa từ ngữ vi phạm trước khi Admin duyệt.
- **Bước 4:** Xây dựng tính năng "Nhật ký duyệt bài" bằng AuditLog để truy vết Mod nào đã duyệt bài nào.
