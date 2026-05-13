const http = require('http');

const url = 'http://141.253.114.218:3080/';

console.log(`🚀 Đang kiểm tra Community Hub tại: ${url}...`);

http.get(url, (res) => {
    const { statusCode } = res;
    let error;

    if (statusCode !== 200) {
        error = new Error(`❌ Yêu cầu thất bại. Mã trạng thái: ${statusCode}`);
    }

    if (error) {
        console.error(error.message);
        res.resume();
        return;
    }

    console.log('✅ Chúc mừng ngài! Community Hub đã Online và hoạt động bình thường (200 OK).');
}).on('error', (e) => {
    console.error(`❌ Lỗi kết nối: ${e.message}`);
});
