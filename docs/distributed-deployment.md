# 🏗️ SmartLMS — Distributed Deployment Runbook

> Cập nhật lần cuối: 2026-05-27  
> Kiến trúc: **2 VPS Oracle Cloud Free Tier + MariaDB Master-Slave Replication + Nginx Load Balancer**

---

## 1. Sơ đồ Kiến trúc

```
                         [ INTERNET ]
                              │
                    ┌─────────▼─────────┐
                    │   Nginx LB (VPS-A) │  Port 80
                    │   smartlms-lb      │
                    └──┬─────────────┬──┘
           weight=10   │             │   weight=1 (x3)
                       ▼             ▼
            ┌──────────────┐  ┌──────────────────────┐
            │   VPS-A      │  │   VPS-B (145.241.x)  │
            │ 141.253.x    │  │                      │
            │              │  │  backend-1 :5381     │
            │  backend:    │  │  backend-2 :5382     │
            │  port 5181   │  │  backend-3 :5383     │
            │              │  │                      │
            │  MariaDB     │  │  MariaDB SLAVE       │
            │  MASTER:3306 │◄─┤  :3306 (Read Only)   │
            │  (Write)     │  │  (Auto-sync)         │
            └──────────────┘  └──────────────────────┘
```

---

## 2. Thông tin Môi trường

| Biến | Giá trị |
|------|---------|
| VPS-A IP (Master) | `141.253.114.218` |
| VPS-B IP (Slave/Worker) | `145.241.160.156` |
| DB Root Password | `SmartLMS_DB_Secure_2026` |
| Replication User | `repl` / `repl_password` |
| DB Name | `SmartLMS` |
| SSH Alias VPS-A | `ssh vps-a` |
| SSH VPS-B | `ssh opc@145.241.160.156` |

---

## 3. Cấu hình đã thay đổi

### 3.1 `docker-compose.prod.yml` (VPS-A - Master)
Bật Binary Log để Slave có thể đồng bộ:
```yaml
command: >
  --server-id=1
  --log-bin=mysql-bin
  --binlog-format=ROW
```

### 3.2 `docker-compose.worker.yml` (VPS-B - Slave)
Cấu hình MariaDB Slave với `--slave-skip-errors=1062,1032` để bỏ qua lỗi trùng lặp Hangfire:
```yaml
command: >
  --server-id=2
  --log-bin=mysql-bin
  --binlog-format=ROW
  --slave-skip-errors=1062,1032   # Bỏ qua Duplicate Key từ Hangfire
  --innodb-buffer-pool-size=64M
```
Backend nodes đọc từ Slave local, ghi về Master qua Internet:
```yaml
- ConnectionStrings__DefaultConnection=Server=141.253.114.218;...   # Write → Master
- ConnectionStrings__ReadOnlyConnection=Server=db_slave;...         # Read → Slave local
```

### 3.3 `nginx-lb.conf` (VPS-A)
Load balancing có trọng số: VPS-A gánh 80%, VPS-B gánh 20%:
```nginx
upstream smartlms_backend {
    server backend:8080 weight=10;          # VPS-A local (nhanh)
    server 145.241.160.156:5381 weight=1;   # VPS-B remote
    server 145.241.160.156:5382 weight=1;
    server 145.241.160.156:5383 weight=1;
}
```

---

## 4. Quy trình Khởi tạo Slave (Lần đầu hoặc Reset)

> **QUAN TRỌNG:** Luôn dùng script `setup_slave.sh`. Script tự chờ DB sẵn sàng trước khi bơm dữ liệu, tránh lỗi `ERROR 2002`.

```bash
# Chạy trên VPS-B (cần có db_dump.sql trong ~/asp.net-app/)
cat << 'EOF' > setup_slave.sh
#!/bin/bash
echo "1. Đập đi xây lại..."
sudo docker rm -f smartlms-db-slave
sudo docker compose -f docker-compose.worker.yml up -d db_slave

echo "2. Chờ MariaDB sẵn sàng..."
until sudo docker exec smartlms-db-slave mariadb -u root -pSmartLMS_DB_Secure_2026 -e "SELECT 1" &> /dev/null; do
    echo -n "."
    sleep 2
done
echo -e "\n=> MariaDB ready!"

echo "3. Bơm dữ liệu..."
sudo docker exec -i smartlms-db-slave mariadb -u root -pSmartLMS_DB_Secure_2026 < db_dump.sql

echo "4. Bật đồng bộ..."
sudo docker exec smartlms-db-slave mariadb -u root -pSmartLMS_DB_Secure_2026 \
  -e "CHANGE MASTER TO MASTER_HOST='141.253.114.218', MASTER_USER='repl', MASTER_PASSWORD='repl_password'; START SLAVE;"

echo "5. Kết quả:"
sudo docker exec smartlms-db-slave mariadb -u root -pSmartLMS_DB_Secure_2026 \
  -e "SHOW SLAVE STATUS\G" | grep -E "Running:|Last_SQL_Error"
EOF
bash setup_slave.sh
```

**Kết quả mong đợi:**
```
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
Last_SQL_Error:
```

---

## 5. Xuất Database Dump từ VPS-A

> **KHÔNG commit file này lên Git!** Dữ liệu nhạy cảm.

```bash
# Chạy trên VPS-A
sudo docker exec smartlms-db-prod mariadb-dump \
  -u root -pSmartLMS_DB_Secure_2026 \
  --master-data=2 --single-transaction \
  --all-databases > ~/asp.net-app/db_dump.sql

# Chuyển sang VPS-B
scp opc@141.253.114.218:~/asp.net-app/db_dump.sql ~/asp.net-app/db_dump.sql
```

---

## 6. Các Lỗi Thường Gặp & Cách Xử Lý

| Lỗi | Nguyên nhân | Fix |
|-----|------------|-----|
| `ERROR 2002: Can't connect to socket` | MariaDB chưa khởi động xong | Dùng `setup_slave.sh` thay vì `sleep` cứng |
| `Slave_SQL_Running: No` + Error 1062 | Hangfire tạo duplicate entry khi dump | `--slave-skip-errors=1062,1032` trong config |
| `No such container: smartlms-db-slave` | `git pull` thất bại do file bị sửa local | `git checkout -- <file>` trước khi pull |
| `Site can't be reached` trên VPS-A | Nginx crash vì config còn `YOUR_VPS_B_IP` | `sed -i 's/YOUR_VPS_B_IP/145.241.160.156/g' nginx-lb.conf && sudo docker restart smartlms-lb` |
| `No space left on device` | Ổ cứng VPS-B đầy 100% do Docker cache | `sudo docker system prune -a --volumes -f` |
| `--read-only=1` crash khi init | MariaDB không thể tạo System Tables | Xóa flag `--read-only` khỏi docker-compose |

---

## 7. Lệnh Kiểm Tra Hệ Thống

```bash
# Kiểm tra Slave đang đồng bộ (chạy trên VPS-B)
sudo docker exec smartlms-db-slave mariadb -u root -pSmartLMS_DB_Secure_2026 \
  -e "SHOW SLAVE STATUS\G" | grep -E "Running:|Behind|Error"

# Kiểm tra dung lượng ổ cứng
df -h

# Xem tất cả Container đang chạy
sudo docker ps

# Xem RAM đang dùng
free -h
```

---

## 8. Script Test Load Balancing

### 8.1 Test nhanh bằng `curl` (10 requests)
```bash
# Chạy trên máy local (Linux/macOS)
for i in {1..10}; do
  curl -s -o /dev/null -w "Req $i: HTTP %{http_code} | IP: %{remote_ip} | Time: %{time_total}s\n" \
    http://141.253.114.218/Account/Login
done
```

### 8.2 Test tải cao bằng `ab` (Apache Benchmark)
```bash
# Cài: sudo apt install apache2-utils
# 500 requests, 50 concurrent users
ab -n 500 -c 50 -r http://141.253.114.218/Account/Login
```

### 8.3 Dùng `benchmark_rps.js` có sẵn trong dự án
```bash
node benchmark_rps.js
```

### 8.4 Kiểm tra Header để biết request đi qua node nào
```bash
# X-Server-Node header sẽ hiện IP của Backend đang xử lý
curl -I http://141.253.114.218/Account/Login | grep X-Server-Node
```

### 8.5 Stress test kiểm tra Replication Lag
```bash
# Trên VPS-A: Tạo bản ghi test
sudo docker exec smartlms-db-prod mariadb -u root -pSmartLMS_DB_Secure_2026 SmartLMS \
  -e "CREATE TABLE IF NOT EXISTS ReplicationTest (id INT AUTO_INCREMENT PRIMARY KEY, ts TIMESTAMP DEFAULT NOW());
      INSERT INTO ReplicationTest VALUES (NULL, NOW());"

# Ngay lập tức trên VPS-B: Kiểm tra đã sync chưa
sudo docker exec smartlms-db-slave mariadb -u root -pSmartLMS_DB_Secure_2026 SmartLMS \
  -e "SELECT * FROM ReplicationTest ORDER BY id DESC LIMIT 1;"

# Dọn dẹp
sudo docker exec smartlms-db-prod mariadb -u root -pSmartLMS_DB_Secure_2026 SmartLMS \
  -e "DROP TABLE ReplicationTest;"
```

---

## 9. Changelog

| Ngày | Thay đổi |
|------|---------|
| 2026-05-27 | Khởi tạo kiến trúc Master-Slave, cấu hình Nginx LB có trọng số |
| 2026-05-27 | Fix `--read-only` crash khi MariaDB init lần đầu |
| 2026-05-27 | Thêm `--slave-skip-errors=1062,1032` để bỏ qua lỗi Hangfire |
| 2026-05-27 | Dọn 9GB rác Docker trên VPS-B (ổ cứng đầy 100%) |
| 2026-05-27 | Sửa placeholder `YOUR_VPS_IP` → `141.253.114.218` trong worker config |
