#!/bin/bash
# Script: fix_docker_conflict.sh
# Mục đích: Dọn dẹp rác Docker, gỡ bỏ các container bị treo (Conflict) và dọn dẹp network cũ trước khi Build lại.

echo "🧹 BẮT ĐẦU DỌN DẸP DOCKER..."

# 1. Dừng toàn bộ các container hiện hành (nếu có)
echo "🛑 Đang dừng các dịch vụ..."
docker compose down || docker-compose down

# 2. Ép buộc xóa các container đang bị treo cứng mang tên trùng lặp
echo "🗑️ Xóa các container rác..."
docker container rm -f aspnet-app-community-1 aspnet-app-backend-1 aspnet-app-backend-2 aspnet-app-backend-3 smartlms-frontend-prod smartlms-db-prod 2>/dev/null

# 3. Dọn dẹp Network bị mồ côi (Tránh lỗi network overlapping)
echo "🌐 Dọn dẹp Network..."
docker network prune -f

echo "✅ DỌN DẸP HOÀN TẤT! Ngài có thể chạy lại lệnh up --build ngay bây giờ."
