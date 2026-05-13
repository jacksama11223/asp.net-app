const axios = require('axios');

const URL_VPSB_PERF = 'http://145.241.160.156:5381/api/public/courses/performance';

async function trackError() {
    console.log(`======================================================`);
    console.log(`🕵️ TRUY TÌM NGUYÊN NHÂN LỖI 500 & TRẮNG MÀN HÌNH`);
    console.log(`======================================================`);

    console.log(`\n📡 Đang gọi tới VPS-B để 'Nội soi' kết nối Database...`);
    const start = Date.now();
    try {
        const res = await axios.get(URL_VPSB_PERF, { timeout: 30000 });
        console.log(`✅ Thành công! (Điều này không nên xảy ra nếu ngài đang bị lỗi)`);
    } catch (e) {
        const duration = Date.now() - start;
        console.log(`❌ THẤT BẠI sau ${duration}ms`);
        
        if (e.response) {
            console.log(`📩 Server VPS-B trả về lỗi 500. `);
            console.log(`💡 PHÂN TÍCH: Nếu mất > 15s mới báo lỗi, chắc chắn là do Database Timeout.`);
            console.log(`💡 GỢI Ý: Ngài cần mở cổng 3306 trên Security List của VPS-A cho VPS-B vào.`);
        } else {
            console.log(`⚠️ Lỗi Network: ${e.message}`);
        }
    }

    console.log(`\n======================================================`);
}

trackError();
