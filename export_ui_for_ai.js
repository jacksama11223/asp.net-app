const fs = require('fs');
const path = require('path');

// Cấu hình các thư mục chứa giao diện cần lấy code
const TARGET_DIRS = [
    path.join(__dirname, 'react-test-frontend', 'src'), 
    path.join(__dirname, 'SmartLMS.Web', 'Views')
];

// Định dạng file đầu ra để nhúng vào Google AI Studio
const OUTPUT_FILE = path.join(__dirname, 'GiaoDienToanTap_AI_Studio.txt');

// Các đuôi file giao diện
const ALLOWED_EXTENSIONS = ['.jsx', '.js', '.tsx', '.ts', '.css', '.cshtml'];

function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    const files = fs.readdirSync(dirPath);

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== 'bin' && file !== 'obj') {
                arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (ALLOWED_EXTENSIONS.includes(ext)) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

function exportUIForAI() {
    console.log('Bắt đầu thu thập toàn bộ code giao diện (React & MVC)...');
    
    let allFiles = [];
    TARGET_DIRS.forEach(dir => {
        allFiles = getAllFiles(dir, allFiles);
    });

    if (allFiles.length === 0) {
        console.log('Không tìm thấy file giao diện nào.');
        return;
    }

    let resultString = `# TOÀN BỘ CODE GIAO DIỆN DỰ ÁN SMARTLMS\n\n`;
    resultString += `Dưới đây là toàn bộ mã nguồn liên quan đến giao diện (React và ASP.NET MVC) để AI phân tích và tạo tính năng mới.\n\n`;

    allFiles.forEach(file => {
        const relativePath = path.relative(__dirname, file);
        try {
            const content = fs.readFileSync(file, 'utf-8');
            resultString += `\n// =========================================================================\n`;
            resultString += `// FILE: ${relativePath}\n`;
            resultString += `// =========================================================================\n\n`;
            resultString += content + `\n\n`;
        } catch (err) {
            console.error(`Lỗi khi đọc file ${relativePath}: ${err.message}`);
        }
    });

    fs.writeFileSync(OUTPUT_FILE, resultString);
    console.log(`\n✅ THÀNH CÔNG! Đã gộp ${allFiles.length} file giao diện.`);
    console.log(`📁 File kết quả được lưu tại: ${OUTPUT_FILE}`);
    console.log(`\n👉 HƯỚNG DẪN: Bạn chỉ cần lấy file "GiaoDienToanTap_AI_Studio.txt" này quăng vào Google AI Studio (hoặc ChatGPT) và bảo nó: "Đây là code giao diện hiện tại của tôi, hãy thêm tính năng XYZ vào nhé!"`);
}

exportUIForAI();
