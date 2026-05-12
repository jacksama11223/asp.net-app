const axios = require('axios');

// Cấu hình các điểm cần kiểm tra
const LB_URL = 'http://141.253.114.218/api/public/courses';
const VPS_A_URL = 'http://141.253.114.218:5181/api/public/courses';
const VPS_B_URL = 'http://145.241.160.156:5181/api/public/courses';

const CONCURRENT_USERS = 3000; 
const ROUNDS = 5;

async function testEndpoint(name, url) {
    console.log(`\n🔍 Đang kiểm tra: ${name} (${url})`);
    try {
        const start = Date.now();
        const res = await axios.get(url, { 
            timeout: 15000, // ✅ Nâng lên 15s để gánh tải Swap
            validateStatus: () => true 
        });
        const duration = Date.now() - start;
        console.log(`✅ Kết nối thành công! Status: ${res.status} | Thời gian: ${duration}ms`);
        return true;
    } catch (e) {
        console.log(`❌ Kết nối thất bại: ${e.message}`);
        return false;
    }
}

async function stressTestLB() {
    console.log(`\n🔥 BẮT ĐẦU STRESS TEST QUA LOAD BALANCER (${LB_URL})`);
    console.log(`📊 Giả lập: ${CONCURRENT_USERS} người dùng cùng lúc`);

    for (let r = 1; r <= ROUNDS; r++) {
        console.log(`\n[Đợt ${r}] Đang gửi requests...`);
        const start = Date.now();
        const requests = [];

        for (let i = 0; i < CONCURRENT_USERS; i++) {
            requests.push(axios.get(LB_URL).catch(e => ({ status: 'ERROR' })));
        }

        const results = await Promise.all(requests);
        const duration = Date.now() - start;
        const success = results.filter(res => res.status === 200).length;

        console.log(`⏱️ Hoàn thành trong: ${duration}ms`);
        console.log(`✅ Thành công: ${success}/${CONCURRENT_USERS}`);
        if (success < CONCURRENT_USERS) {
            console.log(`⚠️ Cảnh báo: Có ${CONCURRENT_USERS - success} request bị lỗi!`);
        }
    }
}

async function main() {
    console.log('======================================================');
    console.log('🚀 SMARTLMS.AI - DISTRIBUTED SYSTEM HEALTH CHECK');
    console.log('======================================================');

    // Bước 1: Kiểm tra kết nối cơ bản
    const isALive = await testEndpoint('VPS-A (Main)', VPS_A_URL);
    const isBLive = await testEndpoint('VPS-B (Worker)', VPS_B_URL);
    const isLBLive = await testEndpoint('Load Balancer', LB_URL);

    // Bước 2: Stress Test nếu LB hoạt động
    if (isLBLive) {
        await stressTestLB();
    } else {
        console.log('\n❌ Load Balancer không phản hồi. Vui lòng kiểm tra cổng 80 trên VPS-A.');
    }

    console.log('\n======================================================');
    console.log('🏁 KẾT THÚC KIỂM TRA.');
}

main();
