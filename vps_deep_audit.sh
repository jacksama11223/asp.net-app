#!/bin/bash

# 🛡️ BỘ QUÉT CHUYÊN SÂU HẠ TẦNG VÀ CÂN BẰNG TẢI DỰ ÁN SMARTLMS.AI (VPS DEEP AUDIT)
echo "=========================================================================="
echo "   🛡️ KHỞI CHẠY BỘ QUÉT HẠ TẦNG & CÂN BẰNG TẢI DÂN DỤNG TRÊN VPS"
echo "=========================================================================="
echo "Thời gian quét: $(date)"
echo ""

echo "--------------------------------------------------------------------------"
echo "🔍 1. KIỂM TRA TOÀN BỘ CONTAINER DOCKER ĐANG CHẠY (IMAGE AGE & NAME)"
echo "--------------------------------------------------------------------------"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.Image}}"
echo ""

echo "--------------------------------------------------------------------------"
echo "🔍 2. DÒ TÌM CONTAINER MỒ CÔI HOẶC ZOMBIE (ZOMBIE CONTAINERS DETECT)"
echo "--------------------------------------------------------------------------"
# Tìm các container liên quan đến smartlms nhưng không thuộc docker compose hiện tại
all_smartlms_containers=$(docker ps -a --filter "name=smartlms" --format "{{.ID}} - {{.Names}} - {{.Status}}")
if [ -z "$all_smartlms_containers" ]; then
    echo "🟢 Không phát hiện container mồ côi mang tên 'smartlms'."
else
    echo "⚠️ Phát hiện các container mang tên smartlms sau:"
    echo "$all_smartlms_containers"
fi
echo ""

echo "--------------------------------------------------------------------------"
echo "🔍 3. KIỂM TRA TRÙNG LẶP PORT & TIẾN TRÌNH CHIẾM DỤNG (PORT CONFLICTS)"
echo "--------------------------------------------------------------------------"
# Quét cổng 80, 8080, 8082, 5181, 5182, 3080
ports=(80 8080 8082 5181 5182 3080 3306)
for port in "${ports[@]}"; do
    conflict=$(sudo lsof -i :$port -t 2>/dev/null)
    if [ ! -z "$conflict" ]; then
        echo "⚠️ Cổng $port đang được sử dụng bởi PID(s): $conflict"
        ps -p $conflict -o comm,args 2>/dev/null
    else
        echo "🟢 Cổng $port sạch."
    fi
done
echo ""

echo "--------------------------------------------------------------------------"
echo "🔍 4. KIỂM TRA CẤU HÌNH UPSTREAM CỦA NGINX LOAD BALANCER"
echo "--------------------------------------------------------------------------"
# Xem cấu hình upstream hoạt động trong nginx-lb.conf trên VPS
if [ -f "nginx-lb.conf" ]; then
    echo "📋 Upstream Backend hiện tại:"
    grep -A 8 "upstream smartlms_backend" nginx-lb.conf
    echo ""
    echo "📋 Upstream Community hiện tại:"
    grep -A 5 "upstream smartlms_community" nginx-lb.conf
else
    echo "❌ Không tìm thấy tệp nginx-lb.conf tại thư mục hiện tại."
fi
echo ""

echo "--------------------------------------------------------------------------"
echo "💡 5. ĐÁNH GIÁ CHẨN ĐOÁN & HƯỚNG DẪN KHẮC PHỤC"
echo "--------------------------------------------------------------------------"
echo "Nếu ngài gặp tình trạng lúc có tính năng mới, lúc lại hiện tính năng cũ:"
echo "1. [Rất Phổ Biến] DO BỘ NHỚ ĐỆM TRÌNH DUYỆT (BROWSER CACHE):"
echo "   - Cách xử lý: Mở Tab Ẩn danh (Incognito) hoặc nhấn Ctrl + Shift + R để xóa cache."
echo "2. DO ZOMBIE CONTAINERS (CONTAINER CŨ CHƯA DỪNG HẲN):"
echo "   - Cách xử lý: Chạy lệnh dưới đây để dọn sạch toàn bộ các container mồ côi:"
echo "     sudo docker system prune -f"
echo "3. DO NGINX CACHE (MICRO-CACHING):"
echo "   - Cách xử lý: Khởi động lại container Nginx LB để xóa cache Nginx:"
echo "     sudo docker restart smartlms-lb"
echo "=========================================================================="
