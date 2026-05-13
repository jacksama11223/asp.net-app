const axios = require('axios');

const BASE_URL = 'http://141.253.114.218'; // IP VPS-A (Load Balancer)

async function runAudit() {
    console.log(`======================================================`);
    console.log(`🕵️ TỔNG RÀ SOÁT HỆ THỐNG SMARTLMS.AI`);
    console.log(`======================================================\n`);

    const checks = [
        { name: 'Giao diện Group Learning Hub', url: `${BASE_URL}/hub`, type: 'page' },
        { name: 'API Khóa học (Fix trắng màn hình)', url: `${BASE_URL}/api/public/courses`, type: 'api_array' },
        { name: 'API Lỗi sai (Fix 404)', url: `${BASE_URL}/api/student/mistakes`, type: 'api' },
        { name: 'API Community Posts (Mới)', url: `${BASE_URL}/api/community/posts/latest`, type: 'api' }
    ];

    for (let check of checks) {
        process.stdout.write(`📡 Checking: ${check.name.padEnd(35)}... `);
        try {
            const start = Date.now();
            const res = await axios.get(check.url, { timeout: 15000 });
            const duration = Date.now() - start;

            if (check.type === 'api_array' && !Array.isArray(res.data)) {
                console.log(`❌ LỖI (Data không phải Mảng!)`);
            } else {
                console.log(`✅ OK (${duration}ms)`);
                if (res.headers['x-server-node']) {
                    console.log(`   🏠 Handled by: ${res.headers['x-server-node']}`);
                }
            }
        } catch (e) {
            console.log(`❌ THẤT BẠI (${e.response ? e.response.status : e.message})`);
        }
    }

    console.log(`\n🏁 KẾT THÚC RÀ SOÁT.`);
    console.log(`======================================================`);
}

runAudit();
