const axios = require('axios');
const fs = require('fs');

async function downloadUI() {
    console.log("Đang kết nối đến API Server...");
    
    try {
        // Gọi API Export UI trên Nginx Load Balancer (Cổng 80)
        const response = await axios.get('http://141.253.114.218/api/ui-export', {
            responseType: 'arraybuffer' // Tải file text
        });

        // Ghi dữ liệu ra file
        fs.writeFileSync('GiaoDienTuServer_AI_Studio.txt', response.data);
        console.log("✅ THÀNH CÔNG! Đã tải toàn bộ Source Code Giao diện từ Server.");
        console.log("📁 File được lưu tại: GiaoDienTuServer_AI_Studio.txt");
        console.log("Bạn có thể dùng file này cho Google AI Studio!");
    } catch (error) {
        if (error.response) {
            console.error("❌ Máy chủ trả về lỗi:", error.response.status, error.response.data.toString());
        } else {
            console.error("❌ Không thể kết nối tới Server. Đảm bảo bạn đã Build lại VPS thành công.", error.message);
        }
    }
}

downloadUI();
