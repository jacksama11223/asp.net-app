const axios = require('axios');

const ENDPOINTS = [
    { name: 'API Công khai (Courses)', url: 'http://141.253.114.218/api/public/courses' },
    { name: 'API My Learning', url: 'http://141.253.114.218/api/student/my-learning' }, // Giả định path
    { name: 'API Mistakes', url: 'http://141.253.114.218/api/student/mistakes' }      // Giả định path
];

async function deepDiagnostic() {
    console.log(`======================================================`);
    console.log(`🕵️ HỆ THỐNG SIÊU CHẨN ĐOÁN API SMARTLMS.AI`);
    console.log(`======================================================`);

    for (let ep of ENDPOINTS) {
        console.log(`\n🔍 Đang chẩn đoán: ${ep.name}...`);
        const start = Date.now();
        try {
            const res = await axios.get(ep.url, { timeout: 15000 });
            const duration = Date.now() - start;
            
            console.log(`   ⏱️ Thời gian phản hồi: ${duration}ms`);
            console.log(`   📦 Định dạng dữ liệu: ${Array.isArray(res.data) ? 'Mảng (Array) - ✅ OK' : 'Đối tượng (Object) - ⚠️ CẢNH BÁO'}`);
            console.log(`   📡 Nội dung sơ bộ: ${JSON.stringify(res.data).substring(0, 100)}...`);
            
            if (!Array.isArray(res.data) && ep.name === 'API Công khai (Courses)') {
                console.log(`   🚨 PHÁT HIỆN LỖI: Định dạng Object sẽ làm hỏng giao diện React (Gây trắng màn hình)!`);
            }
        } catch (e) {
            console.log(`   ❌ Thất bại: ${e.message}`);
            if (e.response) {
                console.log(`   📩 Status từ Server: ${e.response.status}`);
            }
        }
    }

    console.log(`\n======================================================`);
    console.log(`🏁 KẾT THÚC SIÊU CHẨN ĐOÁN.`);
    console.log(`======================================================\n`);
}

deepDiagnostic();
