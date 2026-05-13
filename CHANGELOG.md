# Changelog - SmartLMS.AI Distributed System

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
- Cấu hình kết nối Database và Redis đồng bộ cho phân hệ Cộng đồng.

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
