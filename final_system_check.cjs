const axios = require('axios');

const CONFIG = {
    VPSA_ADMIN: 'http://141.253.114.218:5181/api/public/courses',
    VPSA_LB: 'http://141.253.114.218/api/public/courses',
    VPSB_WORKER: 'http://145.241.160.156:5381/api/public/courses'
};

async function checkService(name, url) {
    try {
        const start = Date.now();
        const res = await axios.get(url, { timeout: 10000 });
        console.log(`✅ [${name}] : HOẠT ĐỘNG (Status: ${res.status}, Phản hồi: ${Date.now() - start}ms)`);
    } catch (err) {
        console.log(`❌ [${name}] : THẤT BẠI (${err.message})`);
        if (name === 'VPSA_ADMIN') console.log(`   -> Gợi ý: Hãy kiểm tra lệnh 'docker ps' trên VPS-A xem container backend-1 đã lên chưa.`);
    }
}

async function runReport() {
    console.log(`\n======================================================`);
    console.log(`🚀 ĐANG KIỂM TRA HỆ THỐNG PHÂN TÁN SMARTLMS.AI`);
    console.log(`======================================================\n`);

    await checkService('VPS-A Admin (Cổng 5181)', CONFIG.VPSA_ADMIN);
    await checkService('VPS-A Load Balancer (Cổng 80)', CONFIG.VPSA_LB);
    await checkService('VPS-B Worker (Cổng 5381)', CONFIG.VPSB_WORKER);

    console.log(`\n💡 LỜI KHUYÊN: Nếu Load Balancer (80) sống mà Admin (5181) chết, nghĩa là Docker đang gán cổng 5181 cho một bản sao khác. Ngài hãy thử cổng 5182 hoặc 5183 nhé!`);
    console.log(`======================================================\n`);
}

runReport();
