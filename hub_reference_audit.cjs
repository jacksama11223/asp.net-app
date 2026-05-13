const fs = require('fs');
const path = require('path');

const HUB_DIR = 'c:/code/asp.net/asp.net-group/SmartLMS.Community';

function runAudit() {
    console.log(`======================================================`);
    console.log(`🕵️ ĐỐI SOÁT THAM CHIẾU MODULE COMMUNITY HUB`);
    console.log(`======================================================\n`);

    const files = getAllFiles(HUB_DIR);
    const issues = [];

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const relativePath = path.relative(HUB_DIR, file);

        // Kiểm tra lỗi .Id của Post
        if (content.includes('.Id') && (file.endsWith('.cshtml') || file.endsWith('.cs'))) {
            if (content.match(/\.(Id)\b/)) {
                issues.push(`[${relativePath}] Nghi vấn sử dụng '.Id' thay vì '.PostId'`);
            }
        }

        // Kiểm tra lỗi gọi hàm Service sai
        if (content.includes('GetUpcomingEventsAsync')) issues.push(`[${relativePath}] Gọi hàm không tồn tại 'GetUpcomingEventsAsync'`);
        if (content.includes('GetRecentResourcesAsync')) issues.push(`[${relativePath}] Gọi hàm không tồn tại 'GetRecentResourcesAsync'`);
        if (content.includes('GetLatestPostsAsync(')) issues.push(`[${relativePath}] Gọi 'GetLatestPostsAsync' sai tham số`);
    });

    if (issues.length > 0) {
        console.log(`❌ PHÁT HIỆN ${issues.length} ĐIỂM CẦN SỬA:`);
        issues.forEach(issue => console.log(`   - ${issue}`));
    } else {
        console.log(`✅ Tuyệt vời! Không phát hiện điểm xung đột.`);
    }

    console.log(`\n======================================================`);
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });
    return arrayOfFiles;
}

runAudit();
