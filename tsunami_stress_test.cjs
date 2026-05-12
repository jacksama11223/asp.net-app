const axios = require('axios');

const URL = 'http://141.253.114.218/api/public/courses';
const TOTAL_REQUESTS = 3000;

async function tsunami() {
    console.log(`\n🌊 ĐANG KÍCH HOẠT SÓNG THẦN: 3000 REQUESTS CÙNG LÚC...`);
    
    const start = Date.now();
    const requests = [];

    for (let i = 0; i < TOTAL_REQUESTS; i++) {
        // Gởi tất cả vào mảng mà không đợi (await)
        requests.push(
            axios.get(URL, { timeout: 30000 })
                .catch(e => ({ status: 'ERROR', message: e.message }))
        );
    }

    console.log(`📡 Đã phóng toàn bộ 3000 request. Đang đợi phản hồi từ Server...`);
    
    const results = await Promise.all(requests);
    
    let success = 0;
    let errorMessages = {};

    results.forEach(res => {
        if (res.status === 200) success++;
        else {
            const msg = res.message || `Status: ${res.status}`;
            errorMessages[msg] = (errorMessages[msg] || 0) + 1;
        }
    });

    const duration = (Date.now() - start) / 1000;
    console.log(`\n======================================================`);
    console.log(`🏁 SÓNG THẦN ĐÃ ĐI QUA TRONG: ${duration.toFixed(2)} giây`);
    console.log(`✅ Thành công : ${success}`);
    console.log(`\n❌ CHI TIẾT CÁC LỖI GẶP PHẢI:`);
    Object.keys(errorMessages).forEach(msg => {
        console.log(`   - ${msg}: ${errorMessages[msg]} lần`);
    });
    console.log(`======================================================\n`);
}

tsunami();
