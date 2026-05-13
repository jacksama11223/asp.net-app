const fs = require('fs');
const path = require('path');

const BUSINESS_DIR = 'c:/code/asp.net/SmartLMS.Business';
const MODELS_DIR = 'c:/code/asp.net/SmartLMS.Models';

const auditRules = [
    { model: 'Post', oldField: 'PostId', newField: 'Id' },
    { model: 'UserBadge', oldField: 'BadgeId', newField: 'Id' },
    { model: 'UserBadge', oldField: 'EarnedDate', newField: 'EarnedAt' }
];

function runAudit() {
    console.log(`======================================================`);
    console.log(`🕵️ ĐỐI SOÁT TƯƠNG THÍCH BUSINESS LAYER`);
    console.log(`======================================================\n`);

    const files = getAllFiles(BUSINESS_DIR);
    const issues = [];

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const fileName = path.basename(file);

        if (content.includes('BadgeId')) issues.push(`[${fileName}] Sử dụng 'BadgeId' (Cần đồng bộ UserBadge)`);
        if (content.includes('EarnedDate')) issues.push(`[${fileName}] Sử dụng 'EarnedDate' (Cần đồng bộ UserBadge)`);
        if (content.includes('.PostId')) issues.push(`[${fileName}] Sử dụng '.PostId' (Cần đồng bộ Post)`);
    });

    if (issues.length > 0) {
        console.log(`❌ PHÁT HIỆN ${issues.length} ĐIỂM BẤT TƯƠNG THÍCH:`);
        issues.forEach(issue => console.log(`   - ${issue}`));
        console.log(`\n💡 Giải pháp: Tôi sẽ đổi tên các trường trong Model quay lại chuẩn cũ để đảm bảo không break hệ thống.`);
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
            if (file.endsWith(".cs")) arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });
    return arrayOfFiles;
}

runAudit();
