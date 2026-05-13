const { execSync } = require('child_process');

const TARGET_URL = 'http://141.253.114.218/hub';

function diagnose() {
    console.log(`======================================================`);
    console.log(`🔍 CHẨN ĐOÁN ĐỊNH TUYẾN COMMUNITY HUB`);
    console.log(`======================================================\n`);

    try {
        console.log(`📡 Đang gửi request tới: ${TARGET_URL}...`);
        const output = execSync(`curl -I -L ${TARGET_URL}`, { encoding: 'utf8' });
        
        console.log(`📝 KẾT QUẢ PHẢN HỒI (Headers):`);
        console.log(output);

        if (output.includes('Location: /')) {
            console.log(`❌ CẢNH BÁO: Phát hiện Hub đang thực hiện Redirect về gốc (/).`);
            console.log(`👉 Đây là lý do ngài bị đẩy sang trang React Frontend.`);
        }

        if (output.includes('Server: nginx')) {
            console.log(`✅ Nginx đang tiếp nhận yêu cầu.`);
        }

    } catch (error) {
        console.error(`❌ LỖI KẾT NỐI: ${error.message}`);
    }

    console.log(`\n======================================================`);
}

diagnose();
