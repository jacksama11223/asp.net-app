const axios = require('axios');

const BASE_URL = 'http://141.253.114.218';

async function troubleshoot() {
    console.log(`======================================================`);
    console.log(`🕵️ NỘI SOI TẦNG SÂU API - SMARTLMS.AI`);
    console.log(`======================================================\n`);

    const targets = [
        { name: 'API Khóa học (/api/public/courses)', url: `${BASE_URL}/api/public/courses` },
        { name: 'API Lỗi sai (/api/student/mistakes)', url: `${BASE_URL}/api/student/mistakes` }
    ];

    for (let target of targets) {
        console.log(`📡 Đang gọi: ${target.name}...`);
        try {
            const res = await axios.get(target.url, { timeout: 10000 });
            console.log(`✅ Thành công!`);
            console.log(`📦 Kiểu dữ liệu: ${Array.isArray(res.data) ? 'MẢNG (ARRAY) - ✅ OK' : 'ĐỐI TƯỢNG (OBJECT) - ❌ Gây lỗi React'}`);
            console.log(`📄 Nội dung (Sơ bộ):`, JSON.stringify(res.data).substring(0, 500));
        } catch (e) {
            console.log(`❌ THẤT BẠI: ${e.message}`);
            if (e.response) {
                console.log(`📩 Status: ${e.response.status}`);
                console.log(`📄 Body lỗi:`, e.response.data);
            }
        }
        console.log('------------------------------------------------------');
    }
}

troubleshoot();
