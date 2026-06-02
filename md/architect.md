# 🏗️ KIẾN TRÚC TỔNG THỂ & CHIẾN LƯỢC ĐÁNH ĐỔI (ARCHITECTURAL BREIF)

Tài liệu này hệ thống lại toàn bộ các quyết định thiết kế quan trọng nhất trong SmartLMS.AI, giúp bạn hiểu rõ cấu trúc và lý do đằng sau mỗi lựa chọn kỹ thuật.

---

## 🏛️ 1. KIẾN TRÚC PHÂN TẦNG (N-TIER ARCHITECTURE)
Hệ thống được chia làm 4 layer rạch ròi: `Web` -> `Business` -> `Data` -> `Models`.

*   **Đặc điểm**: Mỗi lớp chỉ biết đến lớp ngay dưới nó.
*   **Trade-off**:
    - **Hy sinh**: Tăng số lượng file code, phải viết Mapping dữ liệu giữa các tầng.
    - **Đạt được**: Cực kỳ dễ bảo trì. Nếu bạn muốn đổi SQL Server sang Oracle, bạn chỉ cần sửa lớp `Data` mà không cần chạm vào giao diện `Web`.

---

## 📦 2. MÔ HÌNH VẬN HÀNH: MODULAR MONOLITH
Mọi tính năng (AI, Course, Payment, Auth) đều chạy chung một tiến trình nhưng được chia module rõ ràng trong Code.

*   **Đặc điểm**: Đóng gói thành 1 Docker image duy nhất.
*   **Trade-off**:
    - **Hy sinh**: Không thể scale riêng lẻ từng tính năng lên nhiều máy chủ khác nhau.
    - **Đạt được**: Chi phí vận hành cực thấp. Không tốn tiền thuê nhiều VPS. Triển khai cực nhanh chỉ với 1 lệnh `docker-compose`.

---

## 🤖 3. TRÍ TUỆ NHÂN TẠO TÍCH HỢP (IN-PROCESS AI)
Sử dụng ML.NET để dự báo bỏ học ngay bên trong ứng dụng C#.

*   **Đặc điểm**: Model AI được nạp vào RAM của Web.
*   **Trade-off**:
    - **Hy sinh**: Quá trình huấn luyện (Training) sẽ "ăn" RAM của trang web.
    - **Đạt được**: Không tốn chi phí thuê API AI bên ngoài (như OpenAI hay Azure AI). Dữ liệu sinh viên được bảo mật tuyệt đối vì không bao giờ rời khỏi server của bạn.

---

## ⚡ 4. CHIẾN LƯỢC HIỆU NĂNG CAO (HIGH-CONCURRENCY)
Sử dụng bộ ba: `Response Compression` + `Output Caching` + `Distributed Cache`.

*   **Đặc điểm**: Dữ liệu được nén và lưu vào RAM trước khi gửi đi.
*   **Trade-off**:
    - **Hy sinh**: Tốn thêm một chút CPU để nén dữ liệu.
    - **Đạt được**: Website load nhanh hơn 50-70% trên mạng yếu. Server có thể chịu tải hàng ngàn người dùng cùng lúc mà DB không bị nghẽn.

---

## 🛡️ 5. HẠ TẦNG HYBRID CLOUD & SECURITY
Sử dụng Cloudflare Tunnel để đưa App từ Docker lên Internet.

*   **Đặc điểm**: Zero Open Ports (Không mở bất kỳ cổng nào trên modem).
*   **Trade-off**:
    - **Hy sinh**: Độ trễ (latence) tăng thêm khoảng 20-50ms do phải đi qua hệ thống Cloudflare.
    - **Đạt được**: An toàn tuyệt đối trước các cuộc tấn công quét cổng (Port Scanning). SSL được cấp miễn phí và tự động gia hạn.

---

## 📊 TỔNG KẾT
| Thành phần | Lựa chọn kiến trúc | Trade-off chính |
| :--- | :--- | :--- |
| **Logic** | Modular Monolith | Ưu tiên chi phí & Vận hành đơn giản |
| **Data** | SQL Server (ACID) | Ưu tiên tính chính xác & An toàn |
| **Real-time** | SignalR + DataTables | Ưu tiên trải nghiệm mượt mà |
| **AI** | ML.NET (Local) | Ưu tiên bảo mật & Không tốn phí API |
| **Network** | Cloudflare Tunnel | Ưu tiên bảo mật & Tiện lợi |

---
*Tài liệu được biên soạn bởi Antigravity AI - Trợ lý kiến trúc của bạn.*
