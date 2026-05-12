const axios = require('axios');

const URL = 'http://141.253.114.218/api/public/courses';
const TOTAL_REQUESTS = 3000; // Tổng số request muốn gửi
const CONCURRENT_USERS = 500; // Số người dùng gửi cùng lúc trong 1 đợt

async function runTest() {
    console.log(`\n🔥 BẮT ĐẦU TỔNG TẤN CÔNG: ${TOTAL_REQUESTS} REQUESTS`);
    console.log(`📊 Giả lập: ${CONCURRENT_USERS} người dùng gởi liên tục\n`);

    let success = 0;
    let failed = 0;
    const start = Date.now();

    for (let i = 0; i < TOTAL_REQUESTS; i += CONCURRENT_USERS) {
        const batch = [];
        for (let j = 0; j < CONCURRENT_USERS && (i + j) < TOTAL_REQUESTS; j++) {
            batch.push(
                axios.get(URL, { timeout: 15000 })
                    .then(() => success++)
                    .catch(() => failed++)
            );
        }
        await Promise.all(batch);
        process.stdout.write(`\r🚀 Đang tiến hành: ${i + CONCURRENT_USERS}/${TOTAL_REQUESTS} ...`);
    }

    const duration = (Date.now() - start) / 1000;
    console.log(`\n\n======================================================`);
    console.log(`🏁 KẾT THÚC CHIẾN DỊCH TRONG: ${duration.toFixed(2)} giây`);
    console.log(`✅ Thành công : ${success}`);
    console.log(`❌ Thất bại   : ${failed}`);
    console.log(`📈 Hiệu suất  : ${(success / duration).toFixed(2)} req/giây`);
    console.log(`======================================================\n`);
}

runTest();
