const axios = require('axios');

const CONFIG = {
    LB: 'http://141.253.114.218/api/public/courses',
    VPSA: 'http://141.253.114.218:5181/api/public/courses',
    VPSB: 'http://145.241.160.156:5381/api/public/courses'
};

async function benchmark(name, url) {
    console.log(`\n📊 Đang Benchmark [${name}]...`);
    const results = [];
    for (let i = 0; i < 5; i++) {
        const start = Date.now();
        try {
            await axios.get(url, { timeout: 15000 });
            results.push(Date.now() - start);
        } catch (e) {
            results.push(null);
        }
    }

    const success = results.filter(r => r !== null);
    const avg = success.length > 0 ? (success.reduce((a, b) => a + b) / success.length).toFixed(0) : 'N/A';
    
    console.log(`   - Tỷ lệ thành công: ${success.length}/5`);
    console.log(`   - Thời gian trung bình: ${avg}ms`);
    
    if (avg > 5000) console.log(`   ⚠️ CẢNH BÁO: Nghẽn nghiêm trọng tại ${name}. Có thể do CPU hoặc Disk I/O quá tải.`);
    if (success.length < 5) console.log(`   🚨 NGUY CẤP: ${name} đang bị treo hoặc quá tải kết nối DB.`);
}

async function main() {
    console.log(`======================================================`);
    console.log(`🔍 HỆ THỐNG CHẨN ĐOÁN NGHẼN CỔ CHAI (BOTTLENECK)`);
    console.log(`======================================================`);
    
    await benchmark('Load Balancer (Cổng 80)', CONFIG.LB);
    await benchmark('VPS-A Backend (Cổng 5181)', CONFIG.VPSA);
    await benchmark('VPS-B Backend (Cổng 5381)', CONFIG.VPSB);
    
    console.log(`\n======================================================`);
    console.log(`🏁 KẾT THÚC CHẨN ĐOÁN.`);
}

main();
