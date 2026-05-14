const axios = require('axios');

const BASE_URL = 'http://localhost:8080'; // Cổng nội bộ của VPS

async function testFlows() {
    console.log('🚀 BẮT ĐẦU KIỂM TRA TOÀN BỘ LUỒNG SMARTLMS.AI...');

    try {
        // 1. Kiểm tra Health Check (Hạ tầng)
        console.log('\n🔍 [1. Health Check]');
        const health = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Hệ thống:', health.data.status);

        // 2. Kiểm tra Luồng Audit (Giám sát)
        console.log('\n🔍 [2. Luồng Audit Trail]');
        const audit = await axios.get(`${BASE_URL}/UserManagement/GetAuditTrail`);
        if (audit.status === 200) console.log('✅ UI Audit Trail sẵn sàng.');

        // 3. Kiểm tra Luồng AI & Search (Dữ liệu)
        console.log('\n🔍 [3. Luồng AI Analytics]');
        const analytics = await axios.get(`${BASE_URL}/Dashboard/Analytics`);
        if (analytics.status === 200) console.log('✅ UI AI Analytics sẵn sàng.');

        // 4. Kiểm tra Luồng Coding Sandbox
        console.log('\n🔍 [4. Luồng Coding Challenge]');
        const coding = await axios.get(`${BASE_URL}/CodingChallenge/Solve/1`);
        if (coding.status === 200) console.log('✅ UI Monaco Editor sẵn sàng.');

        console.log('\n🏆 TẤT CẢ CÁC LUỒNG ĐÃ ĐƯỢC KÍCH HOẠT THÀNH CÔNG!');
    } catch (error) {
        console.error('❌ LỖI KIỂM TRA:', error.message);
    }
}

testFlows();
