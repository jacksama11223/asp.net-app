# Nhật ký Nâng cấp & Giải cứu Hệ thống SmartLMS.AI (13/05/2026)

Tài liệu này ghi lại toàn bộ các thay đổi về hạ tầng, mã nguồn và quy trình triển khai phân hệ **Group Learning Hub** trên mô hình phân tán 2 VPS.

## 1. Phân hệ mới: Group Learning Hub
- **Đường dẫn chính thức:** `/hub` (Thay thế cho `/community` để tránh xung đột với React cũ).
- **Công nghệ:** ASP.NET Core MVC + Tailwind CSS (Server-Side Rendering).
- **Hạ tầng:** 
    - Chạy trên cả **VPS-A (Cổng 5183)** và **VPS-B (Cổng 5384)**.
    - Tự động Cân bằng tải (Load Balancing) qua Nginx.

## 2. Danh sách các bản vá lỗi (Critical Fixes)
### 🛡️ Lỗi Trắng màn hình (/courses)
- **Vấn đề:** API trả về Object thay vì Array làm React bị crash.
- **Giải pháp:** Đưa định dạng trả về về Mảng thuần túy. Chuyển thông tin `ServerNode` vào HTTP Header `X-Server-Node`.

### 🛡️ Lỗi 404 Lỗi sai (/mistakes)
- **Vấn đề:** API yêu cầu `courseId` bắt buộc trong khi React gọi tổng quát.
- **Giải pháp:** Cập nhật `IStudentService` và `StudentService` hỗ trợ `int? courseId` (nullable). Bổ sung endpoint tổng quát trong `StudentApiController`.

### 🛡️ Lỗi Build Docker (Typos & Dependencies)
- **Lỗi 1:** Typo biến `u` thay vì `p` trong `CommunityService.cs`.
- **Lỗi 2:** Thiếu NuGet Packages (Pomelo MySQL, Redis) trong dự án Community.
- **Lỗi 3:** Thiếu lớp `EncryptionService` trong dự án Community.
- **Giải pháp:** Đã sửa lỗi chính tả, cài đặt đầy đủ NuGet và triển khai lớp bảo mật AES đồng bộ.

## 3. Cấu hình Hạ tầng (Infrastructure)
- **Nginx:** Cập nhật `upstream smartlms_community` để chia tải giữa 2 VPS.
- **Docker Compose:**
    - `docker-compose.prod.yml` (VPS-A): Thêm service `community` (Port 5183).
    - `docker-compose.worker.yml` (VPS-B): Thêm service `community` (Port 5384).
- **MariaDB:** Xác nhận tương thích 100% với Pomelo Driver.

## 4. Công cụ Kiểm định (Testing Tools)
- `db_connectivity_check.cjs`: Kiểm tra kết nối MariaDB/Redis từ máy cá nhân.
- `deep_troubleshoot.cjs`: Nội soi cấu trúc dữ liệu API.
- `final_service_audit.cjs`: Rà soát tổng thể sức khỏe hệ thống sau Deploy.

---
*Bản báo cáo được lập tự động bởi Antigravity AI - Đảm bảo tính nhất quán và bảo mật Enterprise.*
