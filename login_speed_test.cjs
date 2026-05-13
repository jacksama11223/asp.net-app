const axios = require('axios');
const qs = require('querystring');

const CONFIG = {
    URL_LB: 'http://141.253.114.218/Account/Login',
    URL_DIRECT: 'http://141.253.114.218:5181/Account/Login',
    TEST_USER: {
        username: 'admin', // Giả sử username là admin
        password: 'YourPassword123'
    }
};

async function testLogin(name, url) {
    console.log(`\n🧪 Đang kiểm tra Đăng nhập qua: ${name}...`);
    const start = Date.now();
    
    try {
        // Gửi request login dạng Form Data
        const res = await axios.post(url, qs.stringify(CONFIG.TEST_USER), { 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            timeout: 30000,
            validateStatus: () => true, // Nhận mọi mã lỗi để đo thời gian
            maxRedirects: 0 // Không theo dõi redirect để đo thời gian xử lý login
        });
        
        const duration = Date.now() - start;
        console.log(`   ⏱️ Thời gian phản hồi: ${duration}ms`);
        console.log(`   📡 Trạng thái: ${res.status} ${res.statusText}`);
        
        if (res.status === 302) {
            console.log(`   ✅ Thành công! Server đang chuyển hướng người dùng (Redirect).`);
        } else if (res.status === 200) {
            console.log(`   ⚠️ Đăng nhập thất bại (Sai pass) nhưng Server phản hồi vẫn nhanh.`);
        }

        if (duration > 3000) {
            console.log(`   🚨 CẢNH BÁO: Tốc độ xử lý quá chậm!`);
        }
    } catch (e) {
        console.log(`   ❌ Lỗi: ${e.message}`);
    }
}

async function run() {
    console.log(`======================================================`);
    console.log(`🕵️ CHẨN ĐOÁN TỐC ĐỘ ĐĂNG NHẬP SMARTLMS.AI`);
    console.log(`======================================================`);

    await testLogin('VPS-A Trực tiếp (Cổng 5181)', CONFIG.URL_DIRECT);
    await testLogin('Load Balancer (Cổng 80)', CONFIG.URL_LB);

    console.log(`\n======================================================`);
    console.log(`🏁 KẾT THÚC CHẨN ĐOÁN.`);
    console.log(`======================================================\n`);
}

run();
