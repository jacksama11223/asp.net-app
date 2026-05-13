const axios = require('axios');

const NODES = {
    'VPS-A (Local Hub)': 'http://141.253.114.218:5183/hub',
    'VPS-B (Worker Hub)': 'http://145.241.160.156:5384/hub',
    'VPS-A (Backend 1)': 'http://141.253.114.218:5181/api/public/courses',
    'VPS-B (Backend 1)': 'http://145.241.160.156:5381/api/public/courses'
};

async function diagnose() {
    console.log(`======================================================`);
    console.log(`🕵️ CHẨN ĐOÁN KẾT NỐI LOAD BALANCER`);
    console.log(`======================================================\n`);

    for (const [name, url] of Object.entries(NODES)) {
        process.stdout.write(`🔍 Testing ${name.padEnd(20)}: `);
        try {
            const start = Date.now();
            const res = await axios.get(url, { timeout: 5000 });
            console.log(`✅ OK (${res.status}) - ${Date.now() - start}ms`);
        } catch (e) {
            const status = e.response ? e.response.status : 'TIMED_OUT/REFUSED';
            console.log(`❌ THẤT BẠI (${status})`);
            if (status === 'TIMED_OUT/REFUSED') {
                console.log(`   💡 Gợi ý: Kiểm tra Firewall (Security List) trên Cloud, mở cổng tương ứng.`);
            }
        }
    }

    console.log(`\n🏁 KẾT THÚC CHẨN ĐOÁN.`);
    console.log(`======================================================`);
}

diagnose();
