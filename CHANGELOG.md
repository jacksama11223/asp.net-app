# Changelog - SmartLMS.AI

## [2026-05-12] - Mobile Optimization & Build Stability Hardening
### Added
- **Mobile Responsive:** Chuyển đổi Sidebar sang cơ chế Drawer (ngăn kéo) trên điện thoại.
- **Burger Menu:** Bổ sung nút điều hướng cho người dùng Mobile.
- **Measurement Tool:** Thêm `measure_responsive.js` để tự động quét các vị trí Hardcoded Pixel gây lỗi giao diện.
- **Forum Home (VOZ Style):** Giao diện diễn đàn chuyên nghiệp với bảng Thread-based.
- **Leaderboard System:** Trang vinh danh cao thủ (Hall of Fame) với bục Top 3.
- **Public Learner Profile:** Trang hồ sơ công khai hiển thị Huy hiệu, XP và hoạt động.
- **Notion-style Editor:** Nâng cấp trình tạo bài viết với Cover, Emoji và Borderless UI.
- **AI Tutor Feedback:** Tích hợp lời khuyên từ AI vào Sổ tay lỗi sai.
- **Donation & Follow:** Tính năng ủng hộ giảng viên và theo dõi người dùng.
- **Build Safety V2:** Script kiểm soát lỗi Import và Build Backend/Frontend.

### Fixed
- **Vite Build:** Sửa lỗi `MISSING_EXPORT` tại `CommunityQuizBuilder.jsx` do sai tên component export.
- **Reference Error:** Sửa lỗi `LuPlay is not defined` và `LuSettings is not defined` tại `MyLearning.jsx` (thiếu import).
- **Sidebar Labels:** Sửa lỗi chữ bị ẩn trên Mobile và tối ưu chống tràn (ellipsis) cho văn bản.
- **Topbar Overflow:** Sửa lỗi thanh tìm kiếm chèn lên các icon badge trên màn hình iPhone.

## [2026-05-11] - Expansion Ecosystem Completion (Sprint 1, 2, 3)
### Added
- **Sprint 1 (Analytics):** Creator Analytics với biểu đồ Recharts và hệ thống Course Reviews/Ratings.
- **Sprint 2 (Community):** Friend Module (kết bạn/gợi ý), Bookmark & Progress Ring trong Study Workspace, AI Weak Points Analysis.
- **Sprint 3 (Engagement):** AI Self Quiz Builder (tự tạo trắc nghiệm) và Tutor Dashboard (quản lý Mentoring 1:1/Live Q&A).
- **Hardening:** 100% Icon Safety trên toàn bộ 25 file JSX.

### Fixed
- Fixed duplicate icon declarations in multiple frontend pages (RegisterPage, Dashboard, etc.) that caused production build failures.
- Updated `test_full_system.js` with the correct production VPS IP.

## [2026-05-11] - Icon SafeList Hardening & Creator Studio UI Polish
### Fixed
- **Build Stability:** Thay thế triệt để toàn bộ icon không tương thích với phiên bản `react-icons` trên VPS:
  - `StudyWorkspace.jsx`: Thay `LuBook`, `LuCode`, `LuFileText`, `LuHeart`, `LuStar`, `LuInfo`, `LuMessageSquare`, `LuCheck` → bộ SafeIcons.
  - `Sidebar.jsx`: Thay `LuPanelLeftClose`, `LuPanelLeftOpen`, `LuMessageCircle` → `LuArrowLeft`, `LuSettings`, `LuSend`.
  - `CourseManager.jsx` & `MessageCenter.jsx`: Thay `LuMoreVertical`, `LuCheckCheck`, `LuMoreHorizontal`, `LuCheck` → `LuSettings`, `LuZap`.

### Refactored
- **`verify_frontend.js` v2:** Nâng cấp script kiểm tra từ "Blacklist" sang "SafeList + Blacklist". Script giờ sẽ cảnh báo (`⚠️`) với icon chưa kiểm chứng và báo lỗi nghiêm trọng (`❌`) với icon bị cấm — trước khi build trên VPS.
- **SafeIcons Registry:** Danh sách 16 icon đã kiểm chứng: `LuLayoutDashboard`, `LuBookOpen`, `LuUsers`, `LuZap`, `LuSettings`, `LuLogOut`, `LuSparkles`, `LuPlus`, `LuPenTool`, `LuEye`, `LuSearch`, `LuSend`, `LuArrowLeft`, `LuPlay`, `LuExternalLink`, `LuClock`.

## [2026-05-11] - Instructor Ecosystem & Study Workspace Upgrade
### Added
- **Creator Studio (Instructor Dashboard):** Giao diện quản trị riêng cho Giảng viên với bảng theo dõi học viên, doanh thu và công cụ tạo khóa học.
- **Direct Messaging System:** Hệ thống nhắn tin 2 chiều giữa Giảng viên và Học viên (kèm API `MessageApiController` và Model `DirectMessage`).
- **Rich Study Workspace:** Nâng cấp trang học tập với Video player, nội dung bài học động và tích hợp Flashcards/Code Challenges.
- **Tools:** `test_messaging.js` (kiểm tra luồng chat) và `ui_extractor.js` (trích xuất UI cho Figma AI).
- **Verification:** `verify_frontend.js` để kiểm tra lỗi build trước khi triển khai.

### Fixed
- Lỗi trắng màn hình (`ReferenceError: LuZap is not defined`) tại trang học tập.
- Lỗi Build Frontend do thiếu export `TypographyStylesProvider` và `LuLayout` (đã thay thế bằng CSS classes và icon tiêu chuẩn).

### Refactored
- Tách luồng Dashboard thành `InstructorDashboard` và `StudentDashboard` dựa trên Role.
- Làm giàu dữ liệu API `course-content` để bao gồm đầy đủ tài sản học tập liên quan.

## [2026-05-11] - Modular Refactor & Auth Fix
### Added
- Tích hợp **MediatR** làm Event Bus nội bộ để tách biệt các Module.
- Tạo `AssessmentCompletedEvent` và `BookingCreatedEvent`.
- Thêm `GamificationEventHandler` và `NotificationEventHandler`.
- Tạo script `verify_apis.js` để kiểm tra sức khỏe hệ thống.

### Fixed
- **Bulletproof Identity Fix:** Khắc phục triệt để lỗi `401` và `Invalid User Identity format` bằng cách sử dụng claim `UserId` tường minh và logic trích xuất đa lớp (fallback logic) trên 11 Controllers.
- Lỗi React Crash khi session hết hạn (thêm Interceptor và xử lý lỗi im lặng trong Topbar).
- Sửa lỗi mapping `JoinUrl` trong `BookingService`.

### Refactored
- Cấu hình `JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear()` và bổ sung `UserId` claim vào JWT payload.
- Đồng bộ logic trích xuất User ID an toàn trên toàn bộ hệ thống API.

## [2026-05-11] - Enterprise Stability & Identity Hardening
### Added
- Script `test_courses.js` phiên bản nâng cấp với khả năng chẩn đoán lỗi HTML/JSON.
- Cơ chế bảo vệ Identity đa tầng (Explicit Claim + Integer Validation).

### Status
- Hệ thống đạt trạng thái **HARDENED STABLE** (Đã gia cố ổn định).

---
*Lưu ý: Mọi thay đổi quan trọng sau mỗi turn làm việc phải được cập nhật vào đây.*
