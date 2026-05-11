# Project Master Plan - SmartLMS.AI

## Trạng thái: [MODULAR MONOLITH REFACTORED]

## Phase 1: Core LMS & Security (Completed)
- [x] Thiết lập kiến trúc đa tầng (Web, Business, Data, Models).
- [x] Triển khai hệ thống bảo mật: Encryption at rest & Audit Logging.
- [x] Xây dựng quản lý khóa học, bài học và người dùng cơ bản.

## Phase 2: Engagement & AI Features (Completed)
- [x] Tích hợp Gamification (XP, Streak, Leaderboard).
- [x] Phát triển AI Predictor (Dropout prediction) và Item Analysis.
- [x] Xây dựng Community (Forum, Wiki, Notifications).

## Phase 3: Architecture Refactor - Modular Monolith (Completed & Verified)
- [x] Cài đặt MediatR.
- [x] Decouple Gamification (Assessment -> Event -> Gamification).
- [x] Decouple Notifications (Booking -> Event -> Notification).
- [x] Fix lỗi Auth (JWT 401 Interceptor & Inbound Claim Mapping Fix).
- [x] Xây dựng bộ Smoke Test tự động (`verify_apis.js` & `test_courses.js`).

## Phase 4: Business & Enterprise Expansion (Current)
- [ ] Hoàn thiện luồng Thanh toán (VNPay) và Hóa đơn.
- [ ] Kích hoạt hệ thống Affiliate và Coupon.
- [ ] Tích hợp Zoom API cho lớp học trực tuyến.
- [ ] Triển khai Coding Challenge engine hoàn chỉnh.

## Phase 5: UI/UX Premium & Optimization (Next)
- [ ] Redesign Dashboard theo chuẩn SaaS Premium (Dark mode, Glassmorphism).
- [ ] Tối ưu hóa hiệu năng SQL (Stored Procedures, Index tuning).
- [ ] Mở rộng hệ thống Webhooks cho đối tác Enterprise.
