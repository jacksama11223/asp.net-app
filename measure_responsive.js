const fs = require('fs');
const path = require('path');

// Đường dẫn tới thư mục src của frontend
const srcDir = path.join(__dirname, 'react-test-frontend', 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);
// Regex tìm các thuộc tính width, height, padding, margin có giá trị số cứng >= 100px hoặc maw (max-width)
const hardcodedRegex = /(w|h|p|m|px|py|mx|my|gap|maw|miw|mah|mih)=\{([0-9]{3,})\}/g;

console.log('🚀 ĐANG KHỞI CHẠY SCRIPT ĐO ĐẠC RESPONSIVE...');
console.log('--------------------------------------------------');

let totalWarnings = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(__dirname, file);
    let match;
    let fileHasWarning = false;

    while ((match = hardcodedRegex.exec(content)) !== null) {
        if (!fileHasWarning) {
            console.log(`\n📂 File: ${relativePath}`);
            fileHasWarning = true;
        }
        console.log(`   ⚠️ [CẢNH BÁO] ${match[0]} -> Giá trị cố định này có thể gây tràn màn hình trên mobile.`);
        totalWarnings++;
    }
});

console.log('\n--------------------------------------------------');
if (totalWarnings === 0) {
    console.log('✅ TUYỆT VỜI: Không phát hiện giá trị hardcode nguy hiểm nào!');
} else {
    console.log(`❌ TỔNG CỘNG: Phát hiện ${totalWarnings} vị trí cần tối ưu responsive.`);
    console.log('💡 Gợi ý: Hãy chuyển sang dùng object responsive của Mantine. Ví dụ: w={{ base: "100%", sm: ${totalWarnings > 10 ? 400 : 300} }}');
}
console.log('--------------------------------------------------');
