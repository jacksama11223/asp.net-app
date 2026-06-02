const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'react-test-frontend', 'src');
const appJsxPath = path.join(srcPath, 'App.jsx');

if (!fs.existsSync(appJsxPath)) {
    console.error("App.jsx not found");
    process.exit(1);
}

const appCode = fs.readFileSync(appJsxPath, 'utf8');

// Phân tích import { Component } from './path'
const importRegex = /import\s+\{\s*([a-zA-Z0-9_]+)\s*\}\s*from\s*['"](\.[^'"]+)['"]/g;
let match;
let errors = 0;

console.log('🔍 Kiểm tra sự đồng bộ giữa Import (App.jsx) và Export (Các file Component)...');

while ((match = importRegex.exec(appCode)) !== null) {
    const importName = match[1];
    let modulePath = match[2];
    
    let fullPath = path.join(srcPath, modulePath + '.jsx');
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(srcPath, modulePath + '.js');
    }
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(srcPath, modulePath, 'index.jsx'); // e.g. ./components/Layout
    }
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(srcPath, modulePath, 'index.js');
    }

    if (fs.existsSync(fullPath)) {
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        // Kiểm tra export có tồn tại không
        const exportRegex1 = new RegExp(`export\\s+(const|let|var|function|class)\\s+${importName}\\b`);
        const exportRegex2 = new RegExp(`export\\s+\\{\\s*[^}]*\\b${importName}\\b[^}]*\\}`);
        
        if (!exportRegex1.test(fileContent) && !exportRegex2.test(fileContent)) {
            console.error(`❌ LỖI: "${importName}" không được export trong file "${modulePath}.jsx". Điều này sẽ gây lỗi Vite Build!`);
            errors++;
        }
    } else {
        console.error(`❌ LỖI: Không tìm thấy file ${modulePath}`);
        errors++;
    }
}

// Kiểm tra import default
const defaultImportRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s*['"](\.[^'"]+)['"]/g;
while ((match = defaultImportRegex.exec(appCode)) !== null) {
    const importName = match[1];
    let modulePath = match[2];
    
    let fullPath = path.join(srcPath, modulePath + '.jsx');
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(srcPath, modulePath + '.js');
    }

    if (fs.existsSync(fullPath)) {
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        if (!fileContent.includes('export default')) {
            console.error(`❌ LỖI: "${importName}" (Default Import) không có 'export default' trong file "${modulePath}.jsx".`);
            errors++;
        }
    }
}

if (errors === 0) {
    console.log("✅ TUYỆT VỜI: Tất cả Component Import/Export đều khớp hoàn toàn. Không có lỗi xung đột.");
} else {
    console.log(`\n🔴 Đã phát hiện ${errors} lỗi. Cần sửa ngay trước khi build.`);
}
