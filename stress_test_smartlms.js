const axios = require('axios');

const TARGET_URL = 'http://141.253.114.218:7045/api/courses'; // Thay đổi URL API muốn test
const CONCURRENT_USERS = 100; // Số người dùng giả lập cùng lúc mỗi đợt
const TOTAL_ROUNDS = 5;      // Số đợt tấn công

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

    const success = results.filter(r => r.status === 200).length;
    const failed = results.length - success;

    console.log(`⏱️ Thời gian hoàn thành: ${duration}ms`);
    console.log(`✅ Thành công: ${success} | ❌ Thất bại: ${failed}`);
    console.log(`📈 Tốc độ trung bình: ${(duration / CONCURRENT_USERS).toFixed(2)}ms/request`);

    if (failed > 0) {
        console.warn('⚠️ CẢNH BÁO: Server bắt đầu có dấu hiệu quá tải hoặc bị chặn (Rate Limit).');
    }
}

async function main() {
    for (let i = 1; i <= TOTAL_ROUNDS; i++) {
        await runRound(i);
        // Nghỉ 1 giây giữa các đợt để tránh bị Firewall chặn ngay lập tức
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('\n======================================================');
    console.log('🏁 KẾT THÚC KIỂM TRA. Dựa trên kết quả trên, ngài có thể ước tính sức chịu tải thực tế.');
}

main();
