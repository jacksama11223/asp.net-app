#!/bin/bash
echo "🔍 ĐANG KIỂM TRA TRẠNG THÁI VPS..."

# 1. Kiểm tra thư mục rác
if [ -d "SmartLMS.Community" ]; then
    echo "⚠️ PHÁT HIỆN THƯ MỤC RÁC: SmartLMS.Community tại root!"
    echo "🗑️ Đang tiến hành xóa cưỡng bức..."
    rm -rf SmartLMS.Community
else
    echo "✅ Không thấy thư mục rác ở root."
fi

# 2. Kiểm tra nội dung tệp EncryptionService.cs
echo "📄 Kiểm tra nội dung tệp SmartLMS.Models/Security/EncryptionService.cs:"
grep "Extensions" SmartLMS.Models/Security/EncryptionService.cs

# 3. Thử Git Reset để đồng bộ 100% với GitHub
echo "🔄 Đang ép VPS đồng bộ với GitHub (Force Reset)..."
git fetch origin
git reset --hard origin/main
git clean -fd

echo "🚀 VPS ĐÃ SẴN SÀNG ĐỂ BUILD LẠI!"
