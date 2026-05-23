# Báo cáo Sự cố Máy chủ (VPS Incident Report)

## 1. Kết quả Ping Ports
| Port | Trạng thái | Ghi chú |
|------|------------|---------|
| 80 | TIMEOUT | Kết nối quá lâu |
| 3080 | TIMEOUT | Kết nối quá lâu |
| 5181 | TIMEOUT | Kết nối quá lâu |
| 5182 | OPEN | 200 |
| 5183 | TIMEOUT | Kết nối quá lâu |
| 8080 | TIMEOUT | Kết nối quá lâu |

## 2. Phân tích lỗi `DeadlineExceeded: context deadline exceeded`
Lỗi này xảy ra TRONG QUÁ TRÌNH BUILD DOCKER trên VPS. Nguyên nhân cốt lõi là do máy chủ (đặc biệt là Oracle Free Tier với 500MB RAM) bị **Cạn kiệt tài nguyên (OOM - Out of Memory)**.

Khi bạn chạy lệnh `docker compose build --no-cache`, Docker cố gắng build cả 3 container (Backend, Frontend, Community) **cùng một lúc**. Quá trình tải các package Node.js và biên dịch .NET tốn rất nhiều CPU và RAM, dẫn đến việc Docker Daemon bị treo (freeze) và văng ra lỗi Timeout (DeadlineExceeded).

Hậu quả là tiến trình Build thất bại giữa chừng, các Container chưa được tạo ra. Và vì bạn đã chạy lệnh `down` trước đó, nên toàn bộ trang web hiện đang **SẬP HOÀN TOÀN** (Đó là lý do trình duyệt báo lỗi `Unsafe attempt to load URL...` hoặc `Connection Refused`).

## 3. Kế hoạch Fix lỗi (Fix Plan)
Để khắc phục trên môi trường yếu, chúng ta không được phép build song song. Giải pháp là:
1. Ép Docker build tuần tự từng image một.
2. Sử dụng tham số `DOCKER_BUILDKIT=0` để giảm tiêu thụ bộ nhớ đệm (nếu cần).
3. Khởi động lại dịch vụ Docker để xả RAM.
