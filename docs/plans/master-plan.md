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

## Phase 3: Architecture Refactor - Modular Monolith (Completed & Hardened)
- [x] Cài đặt MediatR.
- [x] Decouple Gamification (Assessment -> Event -> Gamification).
- [x] Decouple Notifications (Booking -> Event -> Notification).
- [x] **Bulletproof Auth Fix:** Triển khai cơ chế trích xuất Identity đa tầng trên 11 Controllers.
- [x] Xây dựng bộ Smoke Test tự động (`verify_apis.js` & `test_courses.js`).

## Phase 4: Business & Enterprise Expansion (Current)
- [x] **Study Module Stabilization:** Fix White Screen (LuZap) & Content richness (Video/Docs/Quiz).
- [x] **Creator Studio & Messaging:** Hệ thống quản trị cho Giảng viên và Chat trực tiếp Giảng viên - Học sinh.
- [ ] Hoàn thiện luồng Thanh toán (VNPay) và Hóa đơn.
- [ ] Kích hoạt hệ thống Affiliate và Coupon.
- [ ] Tích hợp Zoom API cho lớp học trực tuyến.
- [ ] Triển khai Coding Challenge engine hoàn chỉnh.

## Phase 5: UI/UX Premium & Optimization (Next)
- [ ] Redesign Dashboard theo chuẩn SaaS Premium (Dark mode, Glassmorphism).
- [ ] Tối ưu hóa hiệu năng SQL (Stored Procedures, Index tuning).
- [ ] Mở rộng hệ thống Webhooks cho đối tác Enterprise.
