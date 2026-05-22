const axios = require('axios');

async function testRecaptcha() {
    console.log('Bắt đầu test API reCAPTCHA với Secret Key mới...');
    const secretKey = '6Lft5fYsAAAAABisoWKU89jqpBLjFuGVexgraMcY';
    // Dùng một token rác để xem Google có phản hồi đúng lỗi "invalid-input-response" không
    const fakeToken = 'Day-La-Mot-Token-Rac-De-Test';

    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${fakeToken}`);
        
        console.log('Kết quả từ Google:');
        console.log(response.data);

        if (response.data.success === false && response.data['error-codes'] && response.data['error-codes'].includes('invalid-input-response')) {
            console.log('\n✅ CHÚC MỪNG: Secret Key hoàn toàn HỢP LỆ! Google đã chấp nhận cấu hình của bạn.');
        } else if (response.data['error-codes'] && response.data['error-codes'].includes('invalid-input-secret')) {
            console.log('\n❌ LỖI: Secret Key bị từ chối. Hãy kiểm tra lại xem có copy thiếu/thừa khoảng trắng không.');
        } else {
            console.log('\n⚠️ Phản hồi không rõ ràng, vui lòng kiểm tra lại cấu hình.');
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error.message);
    }
}

testRecaptcha();
