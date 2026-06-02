const fs = require('fs');
const path = require('path');

console.log("🔍 KHỞI CHẠY BỘ ĐỐI CHIẾU THƯ VIỆN ĐỘNG (DYNAMIC LIBRARY COMPATIBILITY CHECKER)");

// Thêm node_modules của react-test-frontend vào module resolution path
const nodeModulesPath = path.join(__dirname, 'react-test-frontend', 'node_modules');
module.paths.push(nodeModulesPath);

const srcDir = path.join(__dirname, 'react-test-frontend', 'src');
if (!fs.existsSync(srcDir)) {
    console.error("❌ Thư mục react-test-frontend/src không tồn tại!");
    process.exit(1);
}

// 1. Quét tất cả các tệp React
let allFiles = [];
function getFilesRecursively(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist') {
                getFilesRecursively(fullPath);
            }
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            allFiles.push(fullPath);
        }
    });
}
getFilesRecursively(srcDir);
console.log(`- Tìm thấy ${allFiles.length} tệp tin để phân tích đối chiếu.`);

let unresolvedPackages = new Set();
let libraryErrors = [];
let scanStats = {
    totalImportsChecked: 0,
    passedImports: 0,
    failedImports: 0
};

// Cache để tránh require nhiều lần một thư viện
const loadedLibraries = {};

function checkLibraryExport(packageName, importedSymbols, filePath, lineNum) {
    // Không check các local imports (đường dẫn tương đối)
    if (packageName.startsWith('.')) return;

    scanStats.totalImportsChecked += importedSymbols.length;

    // Load thư viện động
    let lib = loadedLibraries[packageName];
    if (lib === undefined) {
        try {
            // Xử lý các gói ESM hoặc CJS
            lib = require(packageName);
            loadedLibraries[packageName] = lib;
        } catch (err) {
            // Thử load trực tiếp file mjs/js từ node_modules nếu require lỗi
            try {
                const directPath = path.join(nodeModulesPath, packageName);
                lib = require(directPath);
                loadedLibraries[packageName] = lib;
            } catch (err2) {
                unresolvedPackages.add(packageName);
                libraryErrors.push({
                    file: path.relative(srcDir, filePath),
                    line: lineNum,
                    package: packageName,
                    type: 'UNRESOLVED_PACKAGE',
                    message: `Không thể nạp thư viện "${packageName}". Lỗi: ${err.message}`
                });
                scanStats.failedImports += importedSymbols.length;
                return;
            }
        }
    }

    // Lấy danh sách tất cả các phím export thực tế của thư viện
    const exportKeys = new Set(Object.keys(lib));
    
    // Hỗ trợ cả trường hợp ESM export default có chứa các phím
    if (lib.default) {
        Object.keys(lib.default).forEach(k => exportKeys.add(k));
    }

    importedSymbols.forEach(symbol => {
        // Bỏ qua import default (như import React from 'react' hoặc import axios from 'axios')
        if (symbol === 'default' || symbol === '') {
            scanStats.passedImports++;
            return;
        }

        if (!exportKeys.has(symbol)) {
            // Tìm gợi ý thay thế gần giống (Case-insensitive hoặc Levenshtein đơn giản)
            let suggestions = [];
            exportKeys.forEach(k => {
                if (k.toLowerCase() === symbol.toLowerCase() || 
                    k.toLowerCase().includes(symbol.toLowerCase()) ||
                    symbol.toLowerCase().includes(k.toLowerCase())) {
                    suggestions.push(k);
                }
            });

            libraryErrors.push({
                file: path.relative(srcDir, filePath),
                line: lineNum,
                package: packageName,
                type: 'MISSING_EXPORT',
                symbol: symbol,
                suggestions: suggestions.slice(0, 5),
                message: `Thành phần "${symbol}" không được export bởi thư viện "${packageName}".`
            });
            scanStats.failedImports++;
        } else {
            scanStats.passedImports++;
        }
    });
}

// 2. Phân tích nội dung từng file
allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        // Regex bóc tách câu lệnh import: import { A, B } from 'library'
        // Nhận diện cả single quote lẫn double quote
        const importRegex = /import\s+({[^}]+}|[^{'"\s]+)\s+from\s+['"]([^'"]+)['"]/g;
        let match;
        while ((match = importRegex.exec(line)) !== null) {
            const specifiersStr = match[1].trim();
            const packageName = match[2].trim();

            let importedSymbols = [];
            if (specifiersStr.startsWith('{')) {
                importedSymbols = specifiersStr
                    .replace(/[{}]/g, '')
                    .split(',')
                    .map(s => s.trim().split(/\s+as\s+/)[0].trim())
                    .filter(s => s.length > 0);
            } else {
                // Import default
                importedSymbols = ['default'];
            }

            checkLibraryExport(packageName, importedSymbols, filePath, index + 1);
        }
    });
});

// 3. Xuất báo cáo chuyên sâu ra file verify_libraries_report.md
const reportPath = path.join(__dirname, 'verify_libraries_report.md');
let reportContent = `# 🛡️ BÁO CÁO ĐỐI CHIẾU TƯƠNG THÍCH THƯ VIỆN ĐỘNG (DOCKER BUILD PREPARATION)

*Thời gian kiểm tra:* ${new Date().toLocaleString()}
*Tổng số tệp React quét:* **${allFiles.length}**
*Tổng số thành phần Import kiểm tra:* **${scanStats.totalImportsChecked}**
*Thành phần hợp lệ:* **${scanStats.passedImports}** (🟢 ${((scanStats.passedImports / scanStats.totalImportsChecked) * 100).toFixed(2)}%)
*Thành phần lỗi/Thiếu export:* **${scanStats.failedImports}** (🔴 ${((scanStats.failedImports / scanStats.totalImportsChecked) * 100).toFixed(2)}%)

---

## 📊 1. DANH SÁCH THƯ VIỆN BỊ THIẾU HOẶC KHÔNG TƯƠNG THÍCH EXPORT

`;

if (libraryErrors.length === 0) {
    reportContent += `> 🎉 **Tuyệt vời! Tất cả các thành phần import từ thư viện bên thứ 3 (React Icons, Mantine Core, Recharts, Framer Motion...) đều tương thích 100% với các package đã cài đặt trong node_modules!** Không phát hiện bất kỳ lỗi lệch pha nào.\n`;
} else {
    reportContent += `| Tệp React | Dòng | Thư Viện | Thành phần lỗi | Phân Loại | Gợi ý Thay Thế |
| :--- | :---: | :--- | :--- | :---: | :--- |
`;
    libraryErrors.forEach(err => {
        const sugStr = err.suggestions && err.suggestions.length > 0 ? err.suggestions.map(s => `\`${s}\``).join(', ') : 'Không có';
        reportContent += `| \`${err.file}\` | ${err.line} | \`${err.package}\` | \`${err.symbol || 'N/A'}\` | \`${err.type}\` | ${sugStr} |\n`;
    });
}

reportContent += `
---

## 🔍 2. CHI TIẾT CÁC LỖI VÀ ĐỀ XUẤT HƯỚNG SỬA

`;

if (libraryErrors.length > 0) {
    libraryErrors.forEach((err, idx) => {
        reportContent += `### [Lỗi ${idx + 1}] ${err.type} tại \`${err.file}\` (Dòng ${err.line})
- **Thư viện nguồn:** \`${err.package}\`
- **Mô tả:** ${err.message}
`;
        if (err.symbol) {
            reportContent += `- **Thành phần bị thiếu:** \`${err.symbol}\`  \n`;
        }
        if (err.suggestions && err.suggestions.length > 0) {
            reportContent += `- **Gợi ý từ node_modules:** Có thể ngài muốn dùng một trong các biểu tượng/hàm sau: ${err.suggestions.map(s => `\`${s}\``).join(', ')}  \n`;
        }
        reportContent += `\n`;
    });
} else {
    reportContent += `> Không có lỗi chi tiết nào cần xử lý. Tất cả các module đã sẵn sàng biên dịch Docker!\n`;
}

fs.writeFileSync(reportPath, reportContent, 'utf8');

console.log(`\n🎉 Bộ quét đối chiếu đã hoàn thành!`);
console.log(`- Kết quả đã xuất ra: verify_libraries_report.md`);
console.log(`- Số lượng lỗi thiếu export phát hiện: ${libraryErrors.length}`);
