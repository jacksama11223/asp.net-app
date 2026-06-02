const fs = require('fs');
const path = require('path');

console.log("🔍 KHỞI CHẠY BỘ QUÉT TĨNH LIÊN KẾT IMPORT / EXPORT PHÂN HỆ REACT FRONTEND");

const srcDir = path.join(__dirname, 'react-test-frontend', 'src');
if (!fs.existsSync(srcDir)) {
    console.error("❌ Thư mục react-test-frontend/src không tồn tại!");
    process.exit(1);
}

// Danh sách các file cần quét
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
console.log(`- Đã tìm thấy ${allFiles.length} tệp tin Javascript/React để quét.`);

// Cấu trúc lưu trữ lỗi
let exportErrors = [];
let iconErrors = [];
let localImportCount = 0;
let iconImportCount = 0;

// Các biểu tượng React Icons Lu phổ biến để đối chiếu chính tả nếu không có node_modules
const commonLuIcons = new Set([
    "LuArrowLeft", "LuArrowRight", "LuDownload", "LuShare2", "LuAward", "LuFileText",
    "LuCheckCircle", "LuCheck", "LuUser", "LuLock", "LuMail", "LuBook", "LuClock",
    "LuTrophy", "LuMessageSquare", "LuSettings", "LuLogOut", "LuCalendar", "LuBell",
    "LuSearch", "LuPlus", "LuTrash", "LuEdit", "LuEye", "LuCheckSquare", "LuHelpCircle"
]);

// 1. Quét từng file
allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativeFilePath = path.relative(srcDir, filePath);
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        // A. Quét các relative imports
        // Regex: import { A, B } from './C' hoặc import A from './C'
        const relativeImportRegex = /import\s+({[^}]+}|[^{'"\s]+)\s+from\s+['"](\.\.?\/[^'"]+)['"]/g;
        let match;
        while ((match = relativeImportRegex.exec(line)) !== null) {
            localImportCount++;
            const importSpecifiers = match[1].trim();
            const importPath = match[2];
            
            // Tìm file đích vật lý
            const dirOfFile = path.dirname(filePath);
            let targetPath = path.resolve(dirOfFile, importPath);
            let resolvedFile = null;

            const extensions = ['.jsx', '.js', '/index.jsx', '/index.js'];
            for (let ext of extensions) {
                const checkPath = targetPath + (ext.startsWith('/') ? ext : ext);
                if (fs.existsSync(checkPath.endsWith('/') ? checkPath : checkPath)) {
                    resolvedFile = checkPath;
                    break;
                }
                if (fs.existsSync(targetPath + ext)) {
                    resolvedFile = targetPath + ext;
                    break;
                }
            }

            if (!resolvedFile && fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
                resolvedFile = targetPath;
            }

            if (!resolvedFile) {
                // Chỉ cảnh báo nếu không tìm thấy tệp tin định tuyến tĩnh
                exportErrors.push({
                    file: relativeFilePath,
                    line: index + 1,
                    type: 'MISSING_FILE',
                    message: `Không tìm thấy tệp nguồn đích cho import: "${importPath}"`
                });
                continue;
            }

            // Nếu tìm thấy file đích, kiểm tra xem các named exports có thực sự được định nghĩa
            if (importSpecifiers.startsWith('{')) {
                const exportsToFind = importSpecifiers
                    .replace(/[{}]/g, '')
                    .split(',')
                    .map(s => s.trim().split(/\s+as\s+/)[0].trim())
                    .filter(s => s.length > 0);

                const targetContent = fs.readFileSync(resolvedFile, 'utf8');
                
                exportsToFind.forEach(exp => {
                    // Regex kiểm tra export const X, export function X, export class X, export { X }
                    const exportConstRegex = new RegExp(`export\\s+(const|let|var|function|class)\\s+${exp}\\b`);
                    const exportListRegex = new RegExp(`export\\s+{[^}]*\\b${exp}\\b[^}]*}`);
                    const exportDefaultRegex = new RegExp(`export\\s+default\\s+${exp}\\b`);

                    const hasExport = exportConstRegex.test(targetContent) || 
                                     exportListRegex.test(targetContent) ||
                                     exportDefaultRegex.test(targetContent) ||
                                     targetContent.includes(`export const ${exp}`) ||
                                     targetContent.includes(`export function ${exp}`) ||
                                     targetContent.includes(`export class ${exp}`);

                    if (!hasExport) {
                        exportErrors.push({
                            file: relativeFilePath,
                            line: index + 1,
                            type: 'MISSING_EXPORT',
                            message: `Thành phần "${exp}" được import nhưng không được export trong tệp "${path.relative(srcDir, resolvedFile)}"`
                        });
                    }
                });
            }
        }

        // B. Quét các imports từ react-icons/lu
        const reactIconsRegex = /import\s+({[^}]+})\s+from\s+['"]react-icons\/lu['"]/g;
        let iconMatch;
        while ((iconMatch = reactIconsRegex.exec(line)) !== null) {
            iconImportCount++;
            const icons = iconMatch[1]
                .replace(/[{}]/g, '')
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0);

            icons.forEach(icon => {
                // Kiểm tra xem biểu tượng có số '2' đáng ngờ ở cuối (giống LuCheckCircle2 cũ)
                if (icon.endsWith('2') && !commonLuIcons.has(icon)) {
                    iconErrors.push({
                        file: relativeFilePath,
                        line: index + 1,
                        type: 'SUSPICIOUS_ICON',
                        message: `Biểu tượng "${icon}" có hậu tố '2' đáng ngờ (như LuCheckCircle2). Gợi ý thay thế bằng: "${icon.slice(0, -1)}"`
                    });
                }
                
                // Kiểm tra chính tả cơ bản dựa trên các biểu tượng Lucide phổ biến
                if (icon.startsWith('Lu') && icon.length > 2) {
                    const baseName = icon.replace(/\d+$/, ''); // Bỏ số ở cuối
                    const suggestions = Array.from(commonLuIcons).filter(c => c.toLowerCase().includes(baseName.toLowerCase()));
                    if (suggestions.length > 0 && !commonLuIcons.has(icon) && icon.endsWith('2')) {
                        iconErrors.push({
                            file: relativeFilePath,
                            line: index + 1,
                            type: 'SPELLING_WARNING',
                            message: `Biểu tượng "${icon}" không phổ biến. Gợi ý kiểm tra lại: ${suggestions.join(', ')}`
                        });
                    }
                }
            });
        }
    });
});

// 2. Xuất báo cáo kiểm tra chi tiết ra file MD
const reportPath = path.join(__dirname, 'verify_react_exports_report.md');
let reportContent = `# 🛡️ BÁO CÁO PHÂN TÍCH TĨNH IMPORT & EXPORT REACT FRONTEND

*Thời gian phân tích:* ${new Date().toLocaleString()}
*Tổng số tệp quét:* **${allFiles.length}**
*Tổng số liên kết Import nội bộ quét:* **${localImportCount}**
*Tổng số lượt gọi biểu tượng React Icons quét:* **${iconImportCount}**

---

## 📊 1. BẢNG TỔNG HỢP TRẠNG THÁI KHỚP NỐI

| Loại Kiểm Tra | Số Lượng Lỗi | Trạng thái | Đánh giá |
| :--- | :---: | :---: | :--- |
| **Tính Hợp Lệ Của File Nguồn** | **${exportErrors.filter(e => e.type === 'MISSING_FILE').length}** | ${exportErrors.filter(e => e.type === 'MISSING_FILE').length === 0 ? '🟢 Hoàn hảo' : '🔴 Cảnh báo'} | Kiểm tra các đường dẫn import tương đối (\`./\`, \`../\`) |
| **Tính Khớp Export Nội Bộ** | **${exportErrors.filter(e => e.type === 'MISSING_EXPORT').length}** | ${exportErrors.filter(e => e.type === 'MISSING_EXPORT').length === 0 ? '🟢 Hoàn hảo' : '🔴 Cảnh báo'} | Xác thực xem file nguồn có thực sự export thành phần được import |
| **Tính Toàn Vẹn Biểu Tượng Lu** | **${iconErrors.length}** | ${iconErrors.length === 0 ? '🟢 Hoàn hảo' : '🟡 Lưu ý'} | Phát hiện các lỗi gõ sai biểu tượng Lucide (như LuCheckCircle2) |

---

## 🔍 2. CHI TIẾT CÁC LỖI IMPORT / EXPORT PHÁT HIỆN

`;

if (exportErrors.length === 0 && iconErrors.length === 0) {
    reportContent += `> 🎉 **Tuyệt vời! Không phát hiện bất kỳ lỗi lệch pha Import/Export hoặc lỗi biểu tượng nào trong phân hệ React Frontend.** Hệ thống đồng bộ kiến trúc tuyệt đối.\n`;
} else {
    if (exportErrors.length > 0) {
        reportContent += `### 🔴 2.1. Lỗi Import từ File hoặc Export nội bộ không tồn tại:\n\n`;
        exportErrors.forEach(e => {
            reportContent += `- **Trang:** \`${e.file}\` (Dòng ${e.line})  \n  **Loại:** \`${e.type}\`  \n  **Chi tiết:** ${e.message}\n\n`;
        });
    }

    if (iconErrors.length > 0) {
        reportContent += `### 🟡 2.2. Các biểu tượng React Icons Lu đáng ngờ hoặc gõ sai:\n\n`;
        iconErrors.forEach(e => {
            reportContent += `- **Trang:** \`${e.file}\` (Dòng ${e.line})  \n  **Loại:** \`${e.type}\`  \n  **Chi tiết:** ${e.message}\n\n`;
        });
    }
}

reportContent += `
---

## 💡 3. KHUYẾN NGHỊ VẬN HÀNH & PHƯƠNG ÁN XỬ LÝ
1. **Lỗi MISSING_FILE**: Kiểm tra lại xem đường dẫn tương đối có bị gõ sai tên folder hoặc thiếu đuôi mở rộng hay không.
2. **Lỗi MISSING_EXPORT**: Kiểm tra xem file nguồn có bị khai báo thiếu từ khóa \`export\` hoặc viết sai hoa/thường tên biến/component hay không.
3. **Lỗi SUSPICIOUS_ICON**: Thư viện React Icons Lu (Lucide) thường sử dụng định dạng tên gốc của Lucide. Không nên tự ý thêm hậu tố số (\`2\`, \`3\`) trừ các biểu tượng có thiết kế biến thể chính thức (ví dụ: \`LuShare2\` là hợp lệ, nhưng \`LuCheckCircle2\` là lỗi).
`;

fs.writeFileSync(reportPath, reportContent, 'utf8');
console.log(`🎉 Báo cáo rà soát đã xuất thành công tại: verify_react_exports_report.md`);
console.log(`- Lỗi Import/Export nội bộ phát hiện: ${exportErrors.length}`);
console.log(`- Lưu ý biểu tượng React Icons phát hiện: ${iconErrors.length}`);
