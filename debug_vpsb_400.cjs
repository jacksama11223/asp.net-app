const axios = require('axios');

const URL_VPSB = 'http://145.241.160.156:5381/api/public/courses/performance';

async function debug400() {
    console.log(`======================================================`);
    console.log(`🕵️ ĐẠI THÁM TỬ TRUY TÌM LỖI 400 TRÊN VPS-B`);
    console.log(`======================================================`);

    try {
        console.log(`📡 Đang gọi tới VPS-B: ${URL_VPSB}...`);
        const res = await axios.get(URL_VPSB, { 
            timeout: 10000,
            headers: {
                'Host': '141.253.114.218' // Giả lập Host của VPS-A để lừa Host Filtering
            }
        });
        console.log(`✅ Ô kìa! Có vẻ như lỗi do 'Host Filtering'. Khi giả lập Host VPS-A thì thành công!`);
        console.log(`📦 Dữ liệu:`, JSON.stringify(res.data, null, 2));
    } catch (e) {
        console.log(`❌ Vẫn lỗi 400!`);
        if (e.response) {
            console.log(`📩 Phản hồi từ Server:`, e.response.data);
            console.log(`📜 Headers từ Server:`, JSON.stringify(e.response.headers, null, 2));
        } else {
            console.log(`⚠️ Lỗi Network: ${e.message}`);
        }
    }

    console.log(`\n======================================================`);
}

debug400();
