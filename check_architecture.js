const fs = require('fs');
const path = require('path');

const businessDir = path.join(__dirname, 'SmartLMS.Business');

function scanDirectory(directory) {
    let files = [];
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
        if (item.name === 'bin' || item.name === 'obj') continue; // Bỏ qua thư mục build
        
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
            files = files.concat(scanDirectory(fullPath));
        } else if (item.name.endsWith('.cs')) {
            files.push(fullPath);
        }
    }
    return files;
}

console.log('🛡️ BẮT ĐẦU KIỂM TRA KIẾN TRÚC MODULAR MONOLITH...');

const csharpFiles = scanDirectory(businessDir);
let violations = 0;

csharpFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Kiểm tra xem tầng Business có dùng using của tầng Web không
    if (content.includes('using SmartLMS.Web') || content.includes('using SmartLMS.Web.Hubs')) {
        console.error(`❌ PHÁT HIỆN VI PHẠM TẠI: ${file}`);
        console.error('Lý do: Tầng Business KHÔNG ĐƯỢC PHÉP tham chiếu đến SmartLMS.Web!');
        violations++;
    }
});

if (violations === 0) {
    console.log('✅ CHÚC MỪNG! Kiến trúc hoàn toàn SẠCH và tuân thủ chuẩn Enterprise.');
    process.exit(0);
} else {
    console.error(`⚠️ Có ${violations} file vi phạm. Vui lòng sửa lại trước khi Build!`);
    process.exit(1);
}
