const axios = require('axios');

const TARGETS = [
    { name: 'Giao diện chính', url: 'http://141.253.114.218/' },
    { name: 'Giao diện Dashboard', url: 'http://141.253.114.218/dashboard' },
    { name: 'API Khóa học', url: 'http://141.253.114.218/api/public/courses' },
    { name: 'API Hiệu năng (Check DB/Redis)', url: 'http://141.253.114.218/api/public/courses/performance' },
    { name: 'Node VPS-A (Trực tiếp)', url: 'http://141.253.114.218:5181/api/public/courses/performance' },
    { name: 'Node VPS-B (Trực tiếp)', url: 'http://145.241.160.156:5381/api/public/courses/performance' }
];

async function trace() {
    console.log(`======================================================`);
    console.log(`🕵️ HỆ THỐNG SIÊU THÁM TỬ TRACE - SMARTLMS.AI`);
    console.log(`======================================================`);

    for (let target of TARGETS) {
        console.log(`\n📡 Đang quét: ${target.name}...`);
        const start = Date.now();
        try {
            const res = await axios.get(target.url, { 
                timeout: 20000,
                headers: { 'Cache-Control': 'no-cache' } // Ép không dùng cache browser
            });
            const duration = Date.now() - start;
            
            console.log(`   ✅ Thành công! Thời gian: ${duration}ms`);
            console.log(`   🏠 Server xử lý: ${res.data.node || res.headers['x-server-node'] || 'N/A'}`);
            if (res.data.redisTime) {
                console.log(`   ⚡ [Nội soi] Redis: ${res.data.redisTime} | DB: ${res.data.dbTime}`);
            }
        } catch (e) {
            console.log(`   ❌ THẤT BẠI: ${e.message}`);
            if (e.code === 'ECONNABORTED') console.log(`   ⚠️ CẢNH BÁO: Server bị treo (Timeout), không trả lời kịp!`);
            if (e.response) console.log(`   📩 Status: ${e.response.status}`);
        }
    }

    console.log(`\n======================================================`);
    console.log(`🏁 KẾT THÚC QUÁ TRÌNH TRACE.`);
    console.log(`======================================================\n`);
}

trace();
