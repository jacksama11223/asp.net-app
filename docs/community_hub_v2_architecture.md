# Kiến trúc Community Hub v2 - SmartLMS.AI

## 1. Tổng quan Module
Hệ thống đã được mở rộng thành 7 module tương tác tập trung tại `/hub`:
- **Index (Discussion Hub):** Trung tâm gắn kết với Multimedia feed.
- **Resources:** Kho tài liệu học tập (PDF, Code, Video).
- **Events:** Quản lý sự kiện cộng đồng tích hợp RSVP.
- **QA:** Hệ thống hỏi đáp thông minh với Expert Verification.
- **Groups:** Nhóm học tập tập trung với Progress tracking.
- **Members:** Danh bạ thành viên, tích hợp Skill-matching.
- **Leaderboard:** Bảng xếp hạng vinh danh với hệ thống EXP/Badges.

## 2. Cấu trúc Kỹ thuật
### Cơ sở dữ liệu (MariaDB)
Bổ sung các thực thể chính:
- `CommunityResource`, `CommunityEvent`, `EventParticipant`
- `StudyGroup`, `StudyGroupMember`
- `CommunityQuestion`, `CommunityAnswer`
- `Repost`, `UserBadge`, `UserActivityPoint`

### Business Logic
- `CommunityService`: Xử lý 18+ nghiệp vụ phức tạp, đảm bảo tính nhất quản dữ liệu giữa các node VPS.

### Giao diện (UI/UX)
- Sử dụng **Tailwind CSS** với hệ thống màu **Cyan/Slate** cao cấp.
- Thiết kế Responsive, tối ưu cho cả Web và Mobile view.
- Sử dụng **Dicebear API** để tạo Avatar ngẫu nhiên sinh động cho thành viên.

## 3. Hướng dẫn Triển khai trên VPS
1. Chạy `git pull` để lấy mã nguồn mới nhất.
2. Chạy `docker compose ... up -d --build` (Hệ thống sẽ tự động tạo các bảng mới trong MariaDB).
3. Truy cập địa chỉ `http://[IP]/hub` để kiểm tra.

---
*SmartLMS.AI - Kiến tạo tương lai giáo dục bằng trí tuệ nhân tạo.*
