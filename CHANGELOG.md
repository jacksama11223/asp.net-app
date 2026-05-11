# Changelog - SmartLMS.AI

## [2026-05-11] - Modular Refactor & Auth Fix
### Added
- Tích hợp **MediatR** làm Event Bus nội bộ để tách biệt các Module.
- Tạo `AssessmentCompletedEvent` và `BookingCreatedEvent`.
- Thêm `GamificationEventHandler` và `NotificationEventHandler`.
- Tạo script `verify_apis.js` để kiểm tra sức khỏe hệ thống.

### Fixed
- Lỗi `401 Unauthorized` và `"Invalid User Identity format"` do cơ chế `DefaultInboundClaimTypeMap` của JWT tự động ghi đè `sub` vào `NameIdentifier`.
- Lỗi React Crash khi session hết hạn (thêm Interceptor và xử lý lỗi im lặng trong Topbar).
- Sửa lỗi mapping `JoinUrl` trong `BookingService`.

### Refactored
- Cấu hình `JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear()` trong `Program.cs` để bảo vệ định dạng User ID.
- Tách logic cộng XP từ LMS sang Gamification module thông qua Event.
- Tách logic thông báo từ Booking sang Notification module.

## [2026-05-11] - API Verification & Stabilization
### Added
- Tạo script `test_courses.js` để kiểm tra độc lập API Khóa học công khai và Khóa học của tôi.
- Cập nhật bộ script `verify_apis.js` hỗ trợ JWT Bearer Token chuẩn.

### Status
- Hệ thống đạt trạng thái **STABLE** trên môi trường Production.

---
*Lưu ý: Mọi thay đổi quan trọng sau mỗi turn làm việc phải được cập nhật vào đây.*
