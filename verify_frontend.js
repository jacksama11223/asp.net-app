const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetFile = path.join(__dirname, 'react-test-frontend', 'src', 'pages', 'StudyWorkspace.jsx');
const forbiddenStrings = ['TypographyStylesProvider', 'LuLayout'];

console.log("==================================================");
console.log("🔍 KIỂM TRA LỖI FRONTEND TRƯỚC KHI BUILD");
console.log("==================================================\n");

// 1. Kiểm tra mã nguồn
console.log("1. Đang quét file StudyWorkspace.jsx...");
if (fs.existsSync(targetFile)) {
    const content = fs.readFileSync(targetFile, 'utf8');
    let hasError = false;

    forbiddenStrings.forEach(str => {
        if (content.includes(str)) {
            console.log(`❌ LỖI: Vẫn tìm thấy chuỗi '${str}' trong code.`);
            hasError = true;
        }
    });

    if (!hasError) {
        console.log("✅ Mã nguồn đã sạch (Không còn các thành phần gây lỗi).");
    } else {
        process.exit(1);
    }
} else {
    console.log("⚠️ Không tìm thấy file StudyWorkspace.jsx để kiểm tra.");
}

// 2. Chạy Build thử nghiệm (Optional - Yêu cầu máy có cài Node/NPM)
console.log("\n2. Đang chạy thử lệnh 'npm run build' tại Local...");
try {
    const frontendDir = path.join(__dirname, 'react-test-frontend');
    console.log("   (Vui lòng đợi, quá trình này có thể mất 1-2 phút...)");
    
    // Chạy build và chỉ lấy output nếu có lỗi
    execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
    
    console.log("\n🚀 TUYỆT VỜI! Frontend đã Build thành công tại Local.");
    console.log("👉 Bây giờ ngài có thể yên tâm chạy lệnh 'git pull' và build trên VPS.");
} catch (error) {
    console.log("\n❌ LỖI BUILD: Vẫn còn vấn đề gì đó trong quá trình biên dịch.");
    console.log("Chi tiết lỗi phía trên.");
    process.exit(1);
}
