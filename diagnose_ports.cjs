const axios = require('axios');

const IP = '141.253.114.218';
const PORTS = [80, 5181, 8082];

async function check() {
    console.log(`\n🔍 ĐANG CHẨN ĐOÁN HỆ THỐNG TẠI: ${IP}\n`);
    
    for (const port of PORTS) {
        const url = `http://${IP}:${port}/api/public/courses`;
        try {
            const start = Date.now();
            const res = await axios.get(url, { timeout: 3000 });
            console.log(`✅ CỔNG ${port}: HOẠT ĐỘNG TỐT (Status: ${res.status}, Time: ${Date.now() - start}ms)`);
            if (port === 80) console.log(`   -> Đây là Cổng Load Balancer chuẩn để ngài sử dụng.`);
        } catch (err) {
            console.log(`❌ CỔNG ${port}: KHÔNG KẾT NỐI ĐƯỢC (${err.message})`);
            if (port === 5181) console.log(`   -> Giải thích: Cổng này đã được gỡ bỏ để hỗ trợ Scale Backend.`);
        }
    }
    console.log(`\n💡 LỜI KHUYÊN: Ngài hãy truy cập http://${IP}/ để vào hệ thống ổn định nhất.\n`);
}

check();
