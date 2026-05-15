#!/bin/bash

# Script: deploy_and_check.sh
# Mục đích: Build Docker, theo dõi lỗi trực tiếp và tự động restart Nginx.

LOG_FILE="build_web_final.log"

echo "==========================================="
echo "🚀 BẮT ĐẦU TRIỂN KHAI SMARTLMS ENTERPRISE"
echo "==========================================="

# 1. Cập nhật code mới nhất
echo "📦 Đang cập nhật mã nguồn từ Git..."
git pull origin main

# 2. Chạy Build
echo "⚙️ Đang tiến hành Build Docker... Vui lòng chờ vài phút."
sudo docker compose -f docker-compose.prod.yml build > $LOG_FILE 2>&1

# 3. Kiểm tra kết quả Build
if [ $? -ne 0 ]; then
    echo "❌ PHÁT HIỆN LỖI TRONG QUÁ TRÌNH BUILD!"
    echo "-------------------------------------------"
    echo "🔍 Trích xuất các lỗi Compile (C#) và Docker:"
    # Lọc ra các dòng chứa chữ 'error CS', 'Build FAILED', hoặc 'failed to solve'
    grep -E -i "error CS[0-9]+|Build FAILED|failed to solve|CANCELED" $LOG_FILE | tail -n 20
    echo "-------------------------------------------"
    echo "Vui lòng copy lỗi trên đưa cho Anti để xử lý ngay!"
    exit 1
else
    echo "✅ BUILD THÀNH CÔNG RỰC RỠ!"
    echo "🚀 Đang khởi động các Container..."
    sudo docker compose -f docker-compose.prod.yml up -d
    
    echo "🔄 Đang tải lại Nginx Load Balancer (Xóa DNS Cache)..."
    sudo docker restart smartlms-lb
    
    echo "🎉 TRIỂN KHAI HOÀN TẤT. HỆ THỐNG ĐÃ SẴN SÀNG!"
fi
