const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const srcDir = path.join(__dirname, 'react-test-frontend', 'src');
const files = walk(srcDir);
let totalErrors = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(srcDir, file);

    // Tìm tất cả các icon Lu được sử dụng
    const usageRegex = /<(Lu[A-Z][a-zA-Z]+)/g;
    const usedIcons = new Set();
    let match;
    while ((match = usageRegex.exec(content)) !== null) {
        usedIcons.add(match[1]);
    }

    // Lấy tất cả icon được import từ react-icons/lu
    const importRegex = /import\s+\{\s*([^}]+)\s*\}\s*from\s*['"]react-icons\/lu['"]/g;
    const importedIcons = new Set();
    let importMatch;
    while ((importMatch = importRegex.exec(content)) !== null) {
        const icons = importMatch[1].split(',').map(i => i.trim()).filter(i => i);
        icons.forEach(i => importedIcons.add(i));
    }

    // Kiểm tra xem có icon nào dùng mà chưa import không
    const missing = [];
    usedIcons.forEach(icon => {
        if (!importedIcons.has(icon)) {
            missing.push(icon);
        }
    });

    if (missing.length > 0) {
        console.error(`❌ [MISSING IMPORT] ${relativePath}: ${missing.join(', ')}`);
        totalErrors += missing.length;
    }
});

if (totalErrors === 0) {
    console.log('✅ No missing icon imports found.');
} else {
    console.error(`\nFound ${totalErrors} missing imports.`);
}
