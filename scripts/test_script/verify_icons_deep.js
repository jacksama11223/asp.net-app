const fs = require('fs');
const path = require('path');

const pagesDir = './react-test-frontend/src/pages';
const componentsDir = './react-test-frontend/src/components';
const directories = [pagesDir, componentsDir];

console.log('🔍 ĐANG KHỞI CHẠY DEEP SCANNER: KIỂM TRA TOÀN BỘ ICON...');
console.log('======================================================');

let errorCount = 0;

directories.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
    files.forEach(file => {
        const filePath = path.join(dir, file);
        process.stdout.write(`  - Scanning ${file}... `);
        const content = fs.readFileSync(filePath, 'utf8');
        console.log('OK');
        
        // 1. Quét các Icon Lu
        const luTags = content.match(/<Lu[A-Z][a-zA-Z0-9]+/g) || [];
        const luImportsMatch = content.match(/import\s*{([^}]+)}\s*from\s*['"]react-icons\/lu['"]/);
        const luImports = luImportsMatch ? luImportsMatch[1].split(',').map(i => i.trim()) : [];
        
        luTags.forEach(tag => {
            const name = tag.substring(1);
            if (!luImports.includes(name)) {
                console.error(`❌ [LỖI] File ${file}: Sử dụng <${name} /> nhưng chưa import từ react-icons/lu`);
                errorCount++;
            }
        });

        // 2. Quét các Icon Fi
        const fiTags = content.match(/<Fi[A-Z][a-zA-Z0-9]+/g) || [];
        const fiImportsMatch = content.match(/import\s*{([^}]+)}\s*from\s*['"]react-icons\/fi['"]/);
        const fiImports = fiImportsMatch ? fiImportsMatch[1].split(',').map(i => i.trim()) : [];

        fiTags.forEach(tag => {
            const name = tag.substring(1);
            if (!fiImports.includes(name)) {
                console.error(`❌ [LỖI] File ${file}: Sử dụng <${name} /> nhưng chưa import từ react-icons/fi`);
                errorCount++;
            }
        });

        // 3. Cảnh báo các Icon dễ lỗi (LuCheckCircle2, LuAlertTriangle, v.v.)
        const badIcons = ['LuCheckCircle2', 'LuCheckCircle', 'LuAlertTriangle', 'LuAlertCircle', 'LuMoreHorizontal', 'LuMoreVertical'];
        badIcons.forEach(bad => {
            if (content.includes(bad) && content.includes('react-icons/lu')) {
                console.warn(`⚠️ [CẢNH BÁO] File ${file}: Đang dùng ${bad} từ react-icons/lu. Khuyên dùng từ react-icons/fi để ổn định.`);
            }
        });
    });
});

console.log('======================================================');
if (errorCount === 0) {
    console.log('✅ THÀNH CÔNG: Không phát hiện lỗi Import Icon.');
    console.log('🚀 Ngài có thể an tâm thực hiện git push!');
} else {
    console.error(`❌ THẤT BẠI: Phát hiện ${errorCount} lỗi cần xử lý gấp.`);
    process.exit(1);
}
