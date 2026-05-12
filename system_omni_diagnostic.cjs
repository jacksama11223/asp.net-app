const axios = require('axios');

const CONFIG = {
    LB: 'http://141.253.114.218',
    API_COURSES: 'http://141.253.114.218/api/public/courses',
    API_PERF: 'http://141.253.114.218/api/public/courses/performance',
    LOGIN_PAGE: 'http://141.253.114.218/login'
};

async function check(name, url, method = 'GET') {
    const start = Date.now();
    try {
        console.log(`\n🔍 Đang kiểm tra: ${name}...`);
        const res = await axios({ method, url, timeout: 20000 });
        const duration = Date.now() - start;
        console.log(`   ✅ Thành công! Phản hồi: ${duration}ms`);
        if (res.data && res.data.redisTime) {
            console.log(`   ⚡ [Nội soi] Redis: ${res.data.redisTime} | DB: ${res.data.dbTime}`);
        }
        return duration;
    } catch (e) {
        console.log(`   ❌ Thất bại: ${e.message}`);
        return null;
    }
}

async function runOmniTest() {
    console.log(`\n======================================================`);
    console.log(`🚀 HỆ THỐNG CHẨN ĐOÁN TOÀN DIỆN SMARTLMS.AI (OMNI)`);
    console.log(`======================================================`);

    // 1. Kiểm tra Network Latency
    await check('Trang chủ (Load Balancer)', CONFIG.LB);

    // 2. Kiểm tra API Courses (Đã có Cache Nginx)
    console.log(`\n💡 Lưu ý: Lần 1 có thể chậm, lần 2 sẽ cực nhanh nhờ Nginx Cache.`);
    await check('API Khóa học (Lần 1)', CONFIG.API_COURSES);
    await check('API Khóa học (Lần 2)', CONFIG.API_COURSES);

    // 3. Kiểm tra Hiệu năng Nội bộ (Không qua Cache)
    await check('Nội soi DB & Redis', CONFIG.API_PERF);

    // 4. Kiểm tra trang Login
    await check('Trang Login (Giao diện)', CONFIG.LOGIN_PAGE);

    console.log(`\n======================================================`);
    console.log(`🏁 KẾT THÚC CHẨN ĐOÁN.`);
    console.log(`💡 GỢI Ý: Nếu 'Nội soi DB' báo > 1000ms, chúng ta cần tối ưu Index Database.`);
    console.log(`======================================================\n`);
}

runOmniTest();
