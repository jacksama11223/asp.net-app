# Changelog - SmartLMS.AI

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
