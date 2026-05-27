#!/bin/bash
# ============================================================
# SMARTLMS.AI - VPS FIX SCRIPT
# Dán toàn bộ nội dung này vào terminal SSH trên VPS
# ============================================================

set -e

echo "=================================================="
echo " 🚀 SMARTLMS.AI VPS FIX: COURSES + REBUILD"
echo "=================================================="

# ─── BƯỚC 1: Pull code mới nhất ───────────────────
echo ""
echo "📥 Bước 1: Cập nhật code từ GitHub..."
cd /home/opc/asp.net-app
git pull origin main

# ─── BƯỚC 2: Fix InstructorId trong DB ───────────
echo ""
echo "🗄️ Bước 2: Fix dữ liệu InstructorId trong MariaDB..."
sudo docker exec -i smartlms-db-prod mariadb -uroot -pYOUR_DB_PASSWORD SmartLMS -e "
UPDATE Courses 
SET InstructorId = (
    SELECT UserId FROM Users 
    WHERE Role IN ('Instructor', 'Admin') 
    ORDER BY CASE WHEN Role = 'Instructor' THEN 0 ELSE 1 END, UserId ASC 
    LIMIT 1
)
WHERE InstructorId IS NULL OR InstructorId = 0;

UPDATE Courses SET Status = 'Published', IsDeleted = 0 WHERE Status != 'Published' OR Status IS NULL;
"

echo "  ✅ Đã cập nhật InstructorId và Status cho tất cả Courses."

# Kiểm tra kết quả
echo ""
echo "📊 Kết quả sau fix:"
sudo docker exec -i smartlms-db-prod mariadb -uroot -pYOUR_DB_PASSWORD SmartLMS -e "
SELECT c.CourseId, c.Title, c.Status, c.IsDeleted, c.InstructorId, u.FullName as InstructorName
FROM Courses c
LEFT JOIN Users u ON c.InstructorId = u.UserId;
"

# ─── BƯỚC 3: Xóa Cache Redis ──────────────────────
echo ""
echo "🗑️ Bước 3: Xóa Redis cache để dữ liệu mới có hiệu lực ngay..."
sudo docker exec aspnet-app-redis-1 redis-cli -a YourRedisPass FLUSHALL 2>/dev/null || \
sudo docker exec -i smartlms-lb redis-cli FLUSHALL 2>/dev/null || \
echo "  ⚠️ Không thể FLUSH Redis - tiến hành tiếp..."

# ─── BƯỚC 4: Rebuild Frontend Docker ─────────────
echo ""
echo "🏗️ Bước 4: Rebuild Frontend Docker image..."
sudo docker compose -f docker-compose.prod.yml build --no-cache frontend

# ─── BƯỚC 5: Restart services ────────────────────
echo ""
echo "🔄 Bước 5: Restart Frontend + Load Balancer..."
sudo docker compose -f docker-compose.prod.yml up -d --force-recreate frontend lb

# Đợi services khởi động
echo "  ⏳ Đợi 10 giây cho services khởi động..."
sleep 10

# ─── BƯỚC 6: Kiểm tra trạng thái ─────────────────
echo ""
echo "✅ Bước 6: Kiểm tra trạng thái các containers..."
sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "🧪 Kiểm tra nhanh API sau fix..."
curl -s http://localhost/api/public/courses | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(f'  API Courses: {len(data)} khóa học tìm thấy')
for c in data:
    print(f'  - [{c[\"courseId\"]}] {c[\"courseName\"]} | Price: {c[\"price\"]} | Instructor: {c[\"instructorName\"]}')
" 2>/dev/null || echo "  (Cần cài python3 để xem chi tiết)"

echo ""
echo "=================================================="
echo " ✅ FIX HOÀN TẤT! Truy cập:"
echo "    http://YOUR_VPS_IP/courses"
echo "=================================================="


