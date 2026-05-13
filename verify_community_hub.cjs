const axios = require('axios');

const BASE_URL = 'http://141.253.114.218';
const TESTS = [
    { name: 'Giao diện Hub (/hub)', url: `${BASE_URL}/hub` },
    { name: 'API Bài viết mới nhất', url: `${BASE_URL}/api/community/posts/latest` },
    { name: 'API Sự kiện sắp tới', url: `${BASE_URL}/api/community/events/upcoming` },
    { name: 'API Tài liệu gần đây', url: `${BASE_URL}/api/community/resources/recent` }
];

async function runTests() {
    console.log(`======================================================`);
    console.log(`🕵️ KIỂM ĐỊNH CHẤT LƯỢNG GROUP LEARNING HUB`);
    console.log(`======================================================\n`);

    for (let test of TESTS) {
        console.log(`📡 Đang kiểm tra: ${test.name}...`);
        const start = Date.now();
        try {
            const res = await axios.get(test.url, { timeout: 10000 });
            const duration = Date.now() - start;
            console.log(`   ✅ THÀNH CÔNG! (${duration}ms)`);
            if (test.url.includes('/api/')) {
                console.log(`   📦 Dữ liệu nhận được: ${res.data.length || 0} mục.`);
            }
        } catch (e) {
            console.log(`   ❌ THẤT BẠI: ${e.message}`);
            if (e.response) {
                console.log(`   📩 Status từ Server: ${e.response.status}`);
            }
        }
        console.log('------------------------------------------------------');
    }

    console.log(`\n🏁 KẾT THÚC KIỂM ĐỊNH.`);
    console.log(`======================================================`);
}

runTests();
