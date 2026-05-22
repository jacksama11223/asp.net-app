const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, 'recaptcha_fix_plan.md');

function generateFixPlan() {
    let report = `# Kế Hoạch Sửa Lỗi reCAPTCHA "Loại khóa không hợp lệ"\n\n`;
    
    report += `## 1. Phân Tích Lỗi (Root Cause)\n`;
    report += `Dựa vào hình ảnh màn hình hiển thị: **"LỖI mà chủ sở hữu trang web sẽ thấy: Loại khóa không hợp lệ"** (ERROR for site owner: Invalid key type).\n\n`;
    
    report += `**Nguyên nhân:**\n`;
    report += `Thư viện \`react-google-recaptcha\` ở Frontend hiện đang sử dụng giao diện của **reCAPTCHA v2 (Checkbox "I'm not a robot")**. Tuy nhiên, loại key (Site Key & Secret Key) mà bạn cung cấp trước đó (bắt đầu bằng \`6LdGz_Ys...\`) rất có thể là key của **reCAPTCHA v3** hoặc **Enterprise**. Hai phiên bản này không tương thích chéo với nhau.\n\n`;

    report += `## 2. Kế Hoạch Khắc Phục (Fix Plan)\n\n`;

    report += `### Bước 1: Đăng ký lại đúng loại Key (Thao tác của bạn)\n`;
    report += `1. Truy cập lại [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create).\n`;
    report += `2. Điền Label (Tên): VD: \`SmartLMS v2\`.\n`;
    report += `3. **QUAN TRỌNG NHẤT**: Tại mục "reCAPTCHA type", bắt buộc phải chọn **reCAPTCHA v2** -> Chọn **"I'm not a robot" Checkbox**.\n`;
    report += `4. Thêm domain: \`141.253.114.218\` và \`localhost\`.\n`;
    report += `5. Submit và lấy lại 2 chuỗi mã mới (Site Key và Secret Key).\n\n`;

    report += `### Bước 2: Viết script tự động cập nhật Key vào source code\n`;
    report += `Sau khi bạn có 2 key mới, tôi sẽ chạy một script tự động quét và thay thế Key cũ bằng Key mới ở các file sau:\n`;
    report += `- \`react-test-frontend/src/pages/LoginPage.jsx\` (Site Key)\n`;
    report += `- \`react-test-frontend/src/pages/RegisterPage.jsx\` (Site Key)\n`;
    report += `- \`SmartLMS.Web/Controllers/AuthApiController.cs\` (Secret Key)\n\n`;

    report += `### Bước 3: Script Test (Xác thực Key)\n`;
    report += `Chúng ta sẽ tạo một file script Node.js tên là \`test_recaptcha.js\` gọi thẳng API của Google (\`https://www.google.com/recaptcha/api/siteverify\`) bằng Secret Key mới và một token giả mạo. Nếu API trả về JSON chứa \`"success": false\` cùng với các error-codes (thay vì báo lỗi cấu hình key), điều đó chứng tỏ Key hợp lệ và Backend đã sẵn sàng.\n\n`;

    report += `## 3. Hành động tiếp theo\n`;
    report += `Bạn hãy vào lại Google reCAPTCHA, tạo lại **Key v2 (Checkbox)**, sau đó dán 2 key mới lên đây để tôi chạy script cập nhật tự động nhé!\n`;

    fs.writeFileSync(reportPath, report);
    console.log(`✅ Đã tạo file kế hoạch sửa lỗi tại: ${reportPath}`);
}

generateFixPlan();
