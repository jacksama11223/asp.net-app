# Kế hoạch Mở rộng Phân hệ Community Hub (SmartLMS.AI)

## 1. Tầm nhìn Module (New Modules)
Dựa trên wireframe, hệ thống sẽ bao gồm 7 phân khu chức năng chính:
- **Discussion Forum:** Diễn đàn thảo luận đa phương tiện.
- **Resource Sharing:** Chia sẻ tài liệu (PDF, Video, Code) kèm hệ thống Rating.
- **Event Listings:** Quản lý sự kiện (Online/Physical) tích hợp RSVP & Calendar.
- **Member Directory:** Danh bạ thành viên, hệ thống Huy hiệu (Badges) và Skill-matching.
- **Q&A Section:** Khu vực hỏi đáp có trạng thái Solved/Unsolved & Reward System.
- **Study Groups:** Không gian làm việc nhóm, Chat nội bộ & Progress tracking.
- **Leaderboard & Gamification:** Bảng xếp hạng EXP, Top Contributors.
- **Community Engagement Hub:** Global Feed, Multimedia Comments & Reposting.

## 2. Cấu trúc Dữ liệu (Database Design)
### Bảng mới/Cập nhật:
- `Resources`: Store documents, metadata, average rating.
- `Events`: Event details, location, type, RSVP count.
- `EventParticipants`: Track users registered for events.
- `Questions/Answers`: For Q&A module with status and "Best Answer" flag.
- `StudyGroups`: Group metadata, privacy settings, progress.
- `UserPoints/Badges`: Gamification system data.
- `Reposts`: Mapping between users and original posts.

## 3. Lộ trình Triển khai (Timeline)
- **Phase 1 (Hiện tại):** Core Infrastructure & Discussion Forum.
- **Phase 2 (Tiếp theo):** Resource Sharing & Q&A Section.
- **Phase 3:** Event Listings & Member Directory.
- **Phase 4:** Study Groups & Leaderboard (Gamification).
- **Phase 5:** Community Engagement Hub (Multimedia & Repost).
