# 🖥️ Sổ tay Quản trị & Kết nối VPS SmartLMS.AI

Tài liệu này lưu trữ toàn bộ thông tin kết nối SSH, phân vai trò máy chủ và kịch bản deploy Docker trên hệ thống đa máy chủ (Multi-VPS) của dự án **SmartLMS.AI**.

---

## 🌐 1. Cấu trúc Hạ tầng & Phân chia Vai trò (Infrastructure Topography)

Hệ thống được thiết kế theo mô hình High-Availability cân bằng tải giữa 2 VPS Oracle Cloud:

| Máy Chủ | Địa chỉ IP | Tài khoản | Vai trò hệ thống | File cấu hình Docker |
| :--- | :--- | :--- | :--- | :--- |
| **VPS A (PRIMARY / PROD)** | `141.253.114.218` | `opc` | Database chính (MariaDB), Nginx Load Balancer, Redis, Cloudflare Tunnel và Cụm dịch vụ lõi. | `docker-compose.prod.yml` |
| **VPS B (WORKER / SECONDARY)** | `145.241.160.156` | `opc` | 3 bản sao Backend dự phòng (Cổng 5381-5383), Cụm Community phụ (Cổng 5384) kết nối trực tiếp về DB tại VPS A. | `docker-compose.worker.yml` |

---

## 🔑 2. Hướng dẫn kết nối nhanh qua SSH

Ngài có thể mở Terminal tại máy cục bộ (`c:\code\asp.net`) và kết nối nhanh vào từng máy:

```bash
# 🟢 Kết nối vào máy chủ chính (VPS A - Production)
ssh opc@141.253.114.218

# 🔵 Kết nối vào máy chủ phụ (VPS B - Worker)
ssh opc@145.241.160.156
```

---

## 🚀 3. Kịch bản Deploy & Build Docker trên VPS A (PRIMARY / PROD)

> [!IMPORTANT]
> **Quy tắc vàng (Hiến pháp Antigravity):** Luôn sử dụng lệnh `docker compose down` trước khi chạy `up -d --build` trên Server để tránh lỗi trùng lặp tên Container (Name Conflict).

Khi đã ở trong phiên SSH của VPS A, chạy chuỗi lệnh sau để cập nhật và build:

```bash
# 1. Di chuyển vào thư mục dự án
cd ~/asp.net-app

# 2. Cập nhật mã nguồn mới nhất từ Git
git pull

# 3. Hạ toàn bộ các container cũ tránh Name Conflict
sudo docker compose -f docker-compose.prod.yml down

# 4. Sử dụng nohup để chạy build ngầm hoặc chạy trực tiếp tùy chọn
sudo docker compose -f docker-compose.prod.yml up -d --build

# 5. [Sau khi build hoàn tất] Khởi động lại Nginx Load Balancer để áp dụng định tuyến mới
sudo docker restart smartlms-lb 2>/dev/null
```

---

## 🚀 4. Kịch bản Deploy & Build Docker trên VPS B (WORKER / SECONDARY)

> [!IMPORTANT]
> **Lưu ý đặc biệt:** VPS B sử dụng cấu hình **`docker-compose.worker.yml`** để khởi chạy 3 bản sao backend dự phòng và cụm học tập kết nối chéo về Database chính trên VPS A.

Khi đã ở trong phiên SSH của VPS B, chạy chuỗi lệnh sau để cập nhật và đồng bộ tính năng mới:

```bash
# 1. Di chuyển vào thư mục dự án trên VPS B
cd ~/asp.net-app

# 2. Cập nhật mã nguồn mới nhất từ Git
git pull

# 3. Hạ toàn bộ các container cũ trên WORKER tránh Name Conflict
sudo docker compose -f docker-compose.worker.yml down

# 4. Thực thi Build và Khởi chạy cụm dịch vụ Worker dự phòng (Xem log trực tiếp hoặc chạy ngầm)
sudo docker compose -f docker-compose.worker.yml up -d --build

# 5. Kiểm tra trạng thái các bản sao dịch vụ đang hoạt động
sudo docker compose -f docker-compose.worker.yml ps
```

---

## 🛠️ 5. Các kịch bản bổ trợ tự động (Có sẵn trong Repo)

Dự án đã tích hợp sẵn các tập lệnh Shell Script giúp ngài vận hành nhanh chóng:

### A. Tự động cập nhật & kiểm soát lỗi biên dịch (`deploy_and_check.sh`):
```bash
./deploy_and_check.sh
```
*Tác dụng: Tự động chạy git pull, build Docker, quét log tìm lỗi biên dịch C# nâng cao, nếu không có lỗi mới kích hoạt container chạy ngầm.*

### B. Dọn dẹp rác Docker & Container trùng lặp (`fix_docker_conflict.sh`):
```bash
./fix_docker_conflict.sh
```
*Tác dụng: Khắc phục triệt để các sự cố nghẽn cổng mạng, mạng nội bộ overlapping, hoặc container cũ bị kẹt trạng thái chết lâm sàng.*
