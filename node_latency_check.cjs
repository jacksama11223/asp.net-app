const axios = require('axios');

const VPSA_DIRECT = 'http://141.253.114.218:5181/api/public/courses';
const VPSB_DIRECT = 'http://145.241.160.156:5381/api/public/courses';

async function checkLatency() {
    console.log(`\n🕵️ ĐANG KIỂM TRA CHÊNH LỆCH TỐC ĐỘ GIỮA 2 VPS...`);

    // 1. Kiểm tra VPS-A
    console.log(`\n🚀 Kiểm tra VPS-A (Cùng máy với DB):`);
    try {
        const start = Date.now();
        await axios.get(VPSA_DIRECT, { timeout: 10000 });
        console.log(`   ✅ Tốc độ VPS-A: ${Date.now() - start}ms (Rất nhanh)`);
    } catch (e) { console.log(`   ❌ VPS-A lỗi: ${e.message}`); }

    // 2. Kiểm tra VPS-B
    console.log(`\n🌍 Kiểm tra VPS-B (Phải đi qua mạng tới DB):`);
    try {
        const start = Date.now();
        await axios.get(VPSB_DIRECT, { timeout: 10000 });
        console.log(`   ✅ Tốc độ VPS-B: ${Date.now() - start}ms`);
    } catch (e) {
        console.log(`   ❌ VPS-B lỗi/Timeout: ${e.message}`);
        console.log(`   ⚠️ CẢNH BÁO: VPS-B không thể nói chuyện với Database của VPS-A!`);
    }

    console.log(`\n======================================================\n`);
}

checkLatency();
