const axios = require('axios');

const TARGET_URL = 'http://141.253.114.218:5181/api/public/courses';
const CONCURRENT_USERS = 100;
const TOTAL_ROUNDS = 5;

console.log(`🚀 ĐANG BẮT ĐẦU STRESS TEST TRÊN: ${TARGET_URL}`);
console.log(`📊 Giả lập: ${CONCURRENT_USERS} người dùng/đợt | Tổng cộng: ${TOTAL_ROUNDS} đợt`);
console.log('======================================================');

async function runRound(roundNumber) {
    console.log(`\n[🔥 Đợt ${roundNumber}] Đang gửi ${CONCURRENT_USERS} requests...`);
    const start = Date.now();
    const requests = [];

    for (let i = 0; i < CONCURRENT_USERS; i++) {
        requests.push(axios.get(TARGET_URL).catch(e => ({ status: e.response?.status || 'ERROR' })));
    }

    const results = await Promise.all(requests);
    const duration = Date.now() - start;

    const firstError = results.find(r => r.status !== 200);
    if (firstError) {
        console.log(`❌ Lỗi điển hình: Status ${firstError.status}`);
    }

    const success = results.filter(r => r.status === 200).length;
    const failed = results.length - success;

    console.log(`⏱️ Thời gian hoàn thành: ${duration}ms`);
    console.log(`✅ Thành công: ${success} | ❌ Thất bại: ${failed}`);
    console.log(`📈 Tốc độ trung bình: ${(duration / CONCURRENT_USERS).toFixed(2)}ms/request`);
}

async function main() {
    for (let i = 1; i <= TOTAL_ROUNDS; i++) {
        await runRound(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('\n======================================================');
    console.log('🏁 KẾT THÚC KIỂM TRA.');
}

main();
