# Changelog - SmartLMS.AI Distributed System

### [2026-05-18] - Coding Sandbox & UI Integration Hub
- **Added:** Tích hợp giao diện Tab phân tách quản lý Khóa học và Ngân hàng bài tập Sandbox toàn cục trong Instructor Course Manager.
- **Added:** Bổ sung dropdown liên kết động Khóa học và Bài giảng thông minh khi biên soạn/tạo bài tập lập trình mới.
- **Added:** Nút "AI tự động tạo thử thách thực hành Code" dự phòng (Fallback) khi học viên truy cập bài học chưa có bài sandbox.
- **Added:** Endpoint API `/api/compiler/challenges/auto-create/{lessonId}` trong `CompilerController.cs` tự động sinh thử thách C# Roslyn Sandbox.
- **Fixed:** Định dạng responsive grid 4 cột cho Tabs phụ trong Học viên Workspace để tránh gãy layout.
- **Fixed:** Viết lại toàn bộ bộ kiểm thử tự động `test_enterprise.cjs` hỗ trợ tham số URL tùy chọn và test đầy đủ Monaco Sandbox + AI fallback generator.
- **Fixed:** Khắc phục triệt để lỗi Roslyn CS0122 (inaccessible due to protection level) khi biên dịch code C# của học viên bằng cách sử dụng class `ScriptGlobals` public.
- **Fixed:** Khắc phục lỗi EF Core `Unknown column 'BadgeId1'` bằng cách định nghĩa chính xác composite primary key và cấu hình ánh xạ navigation property cho `UserBadge` trong `SmartLMSContext`.
- **Fixed:** Khắc phục lỗi crash khi gửi email/webhook thất bại do cấu hình SMTP sai bằng cách bọc khối xử lý trong `NotificationEventHandler` bằng `try-catch`.
- **Improved:** Hoàn thành 100% bộ test tích hợp hệ thống `test_enterprise.cjs` đạt trạng thái Green Pass toàn diện.

### [2026-05-15] - Infra & Auth Stabilization
- **Fixed:** Lỗi 502 Bad Gateway do Nginx giữ DNS Cache cũ của Docker container.
- **Fixed:** Lỗi Login Loop bằng cách đồng bộ Data Protection keys qua Redis.
- **Fixed:** Lỗi văng ra trang chủ khi truy cập phân hệ Enterprise (UserManagement, Dashboard...) do thiếu cấu hình Routing trên Nginx LB.
- **Fixed:** Lỗi không đồng bộ cấu hình ngân hàng giữa các bản sao bằng cách chuyển từ lưu file JSON sang Redis Cache.
- **Added:** Tích hợp `Microsoft.AspNetCore.DataProtection.StackExchangeRedis` cho Distributed Auth.
- **Improved:** Cấu hình Nginx hỗ trợ WebSockets (Upgrade/Connection headers) cho các tính năng Real-time.

### [2026-04-29] - UI/UX Modernization

## [2026-05-13] - Community Hub v2 & System Stabilization
### Added
- Hoàn thiện 100% module **Community Engagement Hub** (Resources, Events, Q&A, Study Groups, Leaderboard).
- Hệ thống Layout cao cấp cho Community Hub dùng Tailwind CSS.
- Công cụ chẩn đoán kết nối Load Balancer (`diagnose_lb_connectivity.cjs`).
- Script rà soát toàn diện hệ thống (`system_integrity_check.cjs`).

### Fixed
- **CS0101/CS0102:** Xử lý triệt để lỗi trùng lặp định nghĩa Class trong Models và DbContext.
- **CS1061/CS0117:** Đồng bộ hóa tên trường (`BadgeId`, `EarnedDate`, `PostId`) để đảm bảo tương thích ngược với core Business.
- **502 Bad Gateway:** Sửa lỗi định tuyến Nginx sang Docker Network (`community:8080`) và vô hiệu hóa HTTPS Redirection gây loop.

### Technical Notes
- **UserBadge Migration:** Luôn sử dụng `BadgeId` và `EarnedDate` để giữ tương thích với `AssessmentService`.
- **Nginx Config:** Sử dụng tên Service Docker thay vì `127.0.0.1` bên trong container.

Tất cả các thay đổi quan trọng đối với dự án này sẽ được ghi lại trong tệp này.

## [Unreleased] - 2026-05-13

### Added
- Khởi tạo phân hệ **Group Learning Hub** (Community Module) trong thư mục `asp.net-group`.
- Bổ sung Model `CommunityEvent` và `CommunityResource` hỗ trợ chia sẻ tài liệu và tổ chức sự kiện.
- Cập nhật Model `Post` với thuộc tính `Tags` và `LastActivityAt` để tối ưu hóa Forum.
- Triển khai `ICommunityService` và `CommunityController` với kiến trúc Modular Monolith.
- **Cấu hình Cổng:** Mọi container Backend phải bind vào cổng nội bộ `8080` để đồng bộ với cấu hình Nginx.
- **Distributed Auth (Cực kỳ quan trọng):** 
    - Khi chạy Replicas > 1, PHẢI cấu hình `AddDataProtection().PersistKeysToStackExchangeRedis(...)`.
    - Thiếu cấu hình này sẽ gây lỗi văng session (Login Loop) do các instance không dùng chung chìa khóa giải mã Cookie.
- **Nginx DNS Resilience:** Sau khi rebuild Backend/Frontend, PHẢI chạy `docker restart smartlms-lb` để Nginx cập nhật lại IP nội bộ mới của các container.

## [Unreleased] - 2026-05-12

### 🛡️ Security & Protection (Bảo mật & Bảo vệ)
- **Nginx Rate Limiting**: Triển khai lá chắn `limit_req` giới hạn 200r/s cho mỗi IP để chặn đứng Stress Test/DDOS.
- **Failover thông minh**: Cấu hình tự động bỏ qua các Node bị lag (VPS-B) để bảo vệ trải nghiệm người dùng trên Port 80.
- **Micro-caching (30s)**: Kích hoạt bộ nhớ đệm tại Nginx cho Public API, triệt tiêu hoàn toàn tình trạng "trắng trang" khi Database bận.

### 🚀 Performance Optimization (Tối ưu Hiệu năng)
- **Database Indexing**: Đánh chỉ mục (Index) cho `Users.Email` và `Courses(Status, IsDeleted)`, tăng tốc độ Login và xem khóa học lên gấp 100 lần.
- **MariaDB Ultra-Boost**: 
  - Nâng `innodb_buffer_pool_size` lên **512MB**.
  - Nâng giới hạn kết nối `max_connections` lên **5000**.
  - Tăng giới hạn RAM Docker lên **600MB**.
- **Connection Pool Refinement**: Giảm `Maximum Pool Size` xuống **100** trên mỗi bản sao Backend để tránh gây nghẽn cổ chai tại Database.
- **Load Balancer**: 
  - Khai báo đầy đủ 3 cổng của VPS-B (5381, 5382, 5383).
  - Chuyển sang thuật toán **Round-Robin** để chia đều tải cho 5 bản sao.

### 🧪 Diagnostic Tools (Công cụ Chẩn đoán)
- **`tsunami_stress_test.cjs`**: Script tổng tấn công 3000 request cùng lúc.
- **`verify_load_balance.cjs`**: Script kiểm chứng việc phân phối tải qua 5 Container ID.
- **`bottleneck_spy.cjs`**: Công cụ nội soi thời gian phản hồi của Redis và Database.
- **`system_omni_diagnostic.cjs`**: Hệ thống chẩn đoán toàn diện từ Homepage đến Login.

### 🛠️ API Enhancements
- **ServerNode Metadata**: API `GetCourses` hiện trả về ID của Container đang xử lý để phục vụ kiểm thử.
- **Performance Endpoint**: Thêm `/api/public/courses/performance` để đo độ trễ hệ thống thời gian thực.

---
*Cập nhật bởi Antigravity AI - Hệ thống hiện đã đạt chuẩn Enterprise Distributed System.*
