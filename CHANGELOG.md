# Changelog - SmartLMS.AI

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
