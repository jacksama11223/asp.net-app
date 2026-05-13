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
- [x] **Smart-Collapse Sidebar:** Sidebar co giãn với RBAC tự động.
- [x] **Sprint 1 - Analytics & Review:** Hoàn thiện biểu đồ doanh thu và hệ thống đánh giá khóa học.
- [x] **Sprint 2 - Community & Friends:** Hoàn thiện kết nối bạn bè và trích xuất bài viết cộng đồng.
- [x] **Sprint 3 - Engagement:** Hoàn thiện AI Quiz Builder và Tutor Dashboard.
- [x] **Icon SafeList & Build Hardening:** Thay thế 100% icon không tương thích trên 25 files.
- [x] **Mobile Responsive Optimization:** Chuyển đổi Sidebar sang Drawer và fix lỗi giao diện trên iPhone.
- [ ] Hoàn thiện luồng Thanh toán (VNPay) và Hóa đơn.
- [ ] Kích hoạt hệ thống Affiliate và Coupon.
- [ ] Tích hợp Zoom API cho lớp học trực tuyến.
- [ ] Triển khai Coding Challenge engine hoàn chỉnh.
- [ ] **Mistake Notebook & Spaced Repetition:** Triển khai hệ thống tự động lưu vết lỗi sai và nhắc lịch học AI.

## Phase 5: UI/UX Premium & Optimization (Current)
- [x] **Mobile Responsive Optimization:** Chuyển đổi Sidebar sang Drawer và fix lỗi giao diện trên iPhone.
- [ ] Tích hợp biểu đồ Doanh thu & Analytics thời gian thực vào Creator Studio.
- [ ] Redesign Dashboard theo chuẩn SaaS Premium (Dark mode, Glassmorphism đồng bộ toàn hệ thống).
- [ ] Tối ưu hóa hiệu năng SQL (Stored Procedures, Index tuning).

## Phase 6: Community Hub & Social Learning (Completed)
- [x] **Group Learning Hub:** Khởi tạo Project `SmartLMS.Community` chuyên biệt trong thư mục `asp.net-group`.
- [x] **Cross-App Data Sync:** Liên kết thư viện Models, Data và Business để đồng bộ dữ liệu người dùng và khóa học.
- [x] **Dedicated API Gateway:** Cấu hình Nginx routing `/community` riêng cho phân hệ mới.
- [x] **Notion-like Editor Integration:** Xây dựng trình soạn thảo khối cho Wiki/Community.
- [x] **Tutor Feedback System:** Giao diện phản hồi chuyên sâu cho Mentor (AI Tutor Feedback).
- [ ] **Collaborative Content:** Tính năng đồng chỉnh sửa và mời bạn bè đóng góp bài viết.
- [ ] **Public Portfolio:** Cơ chế xuất bản Wiki cá nhân ra cộng đồng.

## Phase 7: AI Advanced Learning & Deep Work (Future)
- [ ] **Smart Study Timer:** Tích hợp Pomodoro và theo dõi Deep Work vào Dashboard.
- [ ] **AI Shadow Tutor:** Trợ lý ảo tư vấn lộ trình học dựa trên Sổ tay lỗi sai.
- [ ] **Real-time Whiteboard:** Bảng vẽ trực tuyến cho các buổi Mentoring 1:1.
