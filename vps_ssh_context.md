# 🖥️ Sổ tay Quản trị & Kết nối VPS SmartLMS.AI

Tài liệu này lưu trữ toàn bộ thông tin kết nối SSH, địa chỉ IP và kịch bản deploy Docker trên máy chủ Oracle Cloud Infrastructure (OCI) dành cho ngài.

---

## 🌐 1. Thông tin Máy chủ VPS (Infrastructure Inventory)

Dựa trên cấu hình hạ tầng hiện tại của dự án:

| Tên Máy Chủ | Địa chỉ IP | Tài khoản | Vai trò hệ thống | File cấu hình Docker |
| :--- | :--- | :--- | :--- | :--- |
| **PRIMARY** | `141.253.114.218` | `opc` | Web App, Database MariaDB, Community | `docker-compose.prod.yml` |
| **WORKER** | `145.241.160.156` | `opc` | AI Engine, Search Node, Background Jobs | `docker-compose.worker.yml` |

---

## 🔑 2. Hướng dẫn kết nối nhanh qua SSH

Ngài có thể mở Terminal tại máy cục bộ (`c:\code\asp.net`) và thực hiện kết nối nhanh:

```bash
# Kết nối vào máy chủ chính (PRIMARY)
ssh opc@141.253.114.218
```

---

## 🚀 3. Kịch bản Deploy & Build Docker chuẩn Enterprise (VPS Primary)

> [!IMPORTANT]
> **Quy tắc vàng (Hiến pháp Antigravity):** Luôn sử dụng lệnh `docker compose down` trước khi chạy `up -d --build` trên Server để tránh lỗi trùng lặp tên Container (Name Conflict).

Khi đã ở trong phiên SSH của VPS, ngài chạy chuỗi lệnh sau để cập nhật toàn diện và build ngầm tuyệt đối (sử dụng **nohup** để an toàn tắt Terminal đi về):

```bash
# 1. Di chuyển vào thư mục dự án
cd ~/asp.net

# 2. Cập nhật mã nguồn mới nhất từ Git
git pull

# 3. Hạ toàn bộ các container cũ xuống trước để tránh Name Conflict
docker-compose -f docker-compose.prod.yml down || sudo docker compose -f docker-compose.prod.yml down

# 4. Sử dụng nohup để chạy build ngầm tuyệt đối (nhấn Enter sau lệnh này rồi ngài có thể gõ exit tắt SSH ngay)
nohup sudo docker compose -f docker-compose.prod.yml up -d --build > deploy.log 2>&1 &

# 5. [Tùy chọn] Kiểm tra tiến độ build ngầm bất kỳ lúc nào qua file Log:
tail -f deploy.log

# 6. [Sau khi build hoàn tất] Khởi động lại Nginx Load Balancer để áp dụng định tuyến mới
sudo docker restart smartlms-lb 2>/dev/null
```

---

## 🛠️ 4. Các kịch bản bổ trợ tự động (Có sẵn trong Repo)

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
