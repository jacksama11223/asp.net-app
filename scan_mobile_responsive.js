const fs = require('fs');
const path = require('path');

const projectRoot = 'c:/code/asp.net';
const issues = [];

function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('bin') && !fullPath.includes('obj') && !fullPath.includes('.git') && !fullPath.includes('node_modules')) {
                scanDirectory(fullPath);
            }
        } else if (fullPath.endsWith('.cshtml') || fullPath.endsWith('.html')) {
            analyzeFile(fullPath);
        }
    }
}

function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);

    // 1. Kiểm tra viewport meta tag trong Layout
    if (fileName.includes('Layout')) {
        if (!content.includes('viewport') || !content.includes('width=device-width')) {
            issues.push(`[CRITICAL] File ${fileName} THIẾU thẻ <meta name="viewport">! Đây là nguyên nhân chính gây vỡ layout/trắng trang trên Mobile.`);
        }
    }

    // 2. Tìm CSS classes gây mất Responsive
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        // Tìm các thẻ fixed width lớn
        if (line.match(/w-\[(1000px|800px|1200px|1400px)\]/)) {
            issues.push(`[WARNING] ${filePath}:${index + 1} sử dụng fixed width lớn, có thể tràn viền trên Mobile.`);
        }
        
        // Tìm container không có Flex-wrap
        if (line.includes('flex ') && !line.includes('flex-wrap') && !line.includes('flex-col') && (line.includes('w-full') || line.includes('max-w-'))) {
            // issues.push(`[INFO] ${filePath}:${index + 1} flex container có thể cần flex-col trên mobile (md:flex-row).`);
        }
    });
}

console.log("🚀 Đang quét toàn bộ mã nguồn (.cshtml) để tìm nguyên nhân lỗi Mobile...");
scanDirectory(projectRoot);

console.log("\n================ KẾT QUẢ QUÉT =================\n");
if (issues.length === 0) {
    console.log("✅ Không phát hiện lỗi cấu trúc cơ bản.");
} else {
    issues.forEach(issue => console.log(issue));
}
console.log("\n===============================================\n");
