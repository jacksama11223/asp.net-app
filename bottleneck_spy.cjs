const axios = require('axios');

const ENDPOINTS = {
    LB: 'http://141.253.114.218/api/public/courses/performance',
    VPSA: 'http://141.253.114.218:5181/api/public/courses/performance',
    VPSB: 'http://145.241.160.156:5381/api/public/courses/performance'
};

async function spy() {
    console.log(`\n🕵️ ĐANG TRUY TÌM NGHẼN CỔ CHAI (BOTTLENECK SPY)...`);

    for (let [name, url] of Object.entries(ENDPOINTS)) {
        console.log(`\n🔍 Đang kiểm tra ${name}...`);
        try {
            const start = Date.now();
            const res = await axios.get(url, { timeout: 15000 });
            const duration = Date.now() - start;
            
            console.log(`   ✅ Tổng thời gian phản hồi: ${duration}ms`);
            console.log(`   ⚡ Thời gian Redis: ${res.data.redisTime}`);
            console.log(`   🗄️ Thời gian Database: ${res.data.dbTime}`);
            
            if (parseInt(res.data.dbTime) > 500) {
                console.log(`   ⚠️ CẢNH BÁO: Database đang phản hồi rất chậm cho ${name}!`);
            }
        } catch (e) {
            console.log(`   ❌ Thất bại: ${e.message}`);
        }
    }
    console.log(`\n======================================================\n`);
}

spy();
