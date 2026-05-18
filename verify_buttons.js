/**
 * SmartLMS Enterprise Button Integrity Verification Tool
 * 
 * Mục đích: Quét tĩnh toàn bộ tệp React (JSX/JS) và ASP.NET (CSHTML)
 * nhằm phát hiện các nút bấm bị "chết" (không có sự kiện, sự kiện rỗng, hoặc link rỗng).
 * 
 * Chạy: node verify_buttons.js
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_DIR = __dirname;
const REACT_DIR = path.join(WORKSPACE_DIR, 'react-test-frontend', 'src');
const CSHTML_DIR = path.join(WORKSPACE_DIR, 'SmartLMS.Web', 'Views');

let totalScanned = 0;
let deadButtonsCount = 0;
let reportDetails = [];

// Quét thư mục đệ quy
function scanDirectory(dir, extensions) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            // Bỏ qua node_modules và build folders
            if (!item.includes('node_modules') && !item.includes('bin') && !item.includes('obj')) {
                files = files.concat(scanDirectory(fullPath, extensions));
            }
        } else {
            if (extensions.some(ext => fullPath.endsWith(ext))) {
                files.push(fullPath);
            }
        }
    }
    return files;
}

// Tính số dòng để xác định dòng lỗi
function getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
}

// Phân tích tệp React (JSX/JS/TSX)
function analyzeReactFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(WORKSPACE_DIR, filePath);
    totalScanned++;

    // Tìm các tag <Button, <ActionIcon, hoặc <button
    const btnRegex = /<(Button|ActionIcon|button)\b([^>]*?)(\/?>)/gi;
    let match;

    while ((match = btnRegex.exec(content)) !== null) {
        const fullTag = match[0];
        const tagName = match[1];
        const attrs = match[2];
        const isSelfClosing = match[3] === '/>';
        const line = getLineNumber(content, match.index);

        // Trích xuất label/nội dung nút (nếu không self-closing)
        let label = 'Không rõ';
        if (!isSelfClosing) {
            const afterTagIndex = match.index + fullTag.length;
            const closingTag = `</${tagName}>`;
            const closingIndex = content.indexOf(closingTag, afterTagIndex);
            if (closingIndex !== -1) {
                const inner = content.substring(afterTagIndex, closingIndex).trim();
                label = inner.replace(/<[^>]*>/g, '').substring(0, 40) || 'Chứa icon/component';
            }
        }

        // Bỏ qua các nút bị vô hiệu hóa (disabled)
        if (attrs.includes('disabled') && !attrs.includes('disabled={false}')) {
            continue;
        }

        // Bỏ qua nếu là submit button trong form
        if (attrs.match(/type=["']submit["']/i) || attrs.match(/type=\{\s*["']submit["']\s*\}/i)) {
            continue;
        }

        // Kiểm tra sự kiện click
        const hasOnClick = attrs.includes('onClick');
        let isDead = false;
        let issue = '';

        if (!hasOnClick) {
            isDead = true;
            issue = 'Thiếu hoàn toàn thuộc tính onClick (Nút chết)';
        } else {
            // Kiểm tra click handler có rỗng hoặc chỉ có log
            const onClickMatch = attrs.match(/onClick\s*=\s*\{\s*(?:\(\s*\)\s*=>\s*)?\{([^}]*)\}\s*\}/i) || 
                                 attrs.match(/onClick\s*=\s*\{\s*([^}]+)\s*\}/i);
            
            if (onClickMatch) {
                const handlerBody = onClickMatch[1].trim();
                
                // Các dạng handler chết phổ biến
                if (
                    handlerBody === '' ||
                    handlerBody === '()' ||
                    handlerBody === 'undefined' ||
                    handlerBody === 'null' ||
                    /^(?:\(\s*\)\s*=>\s*)?\{\s*\}$/.test(handlerBody) ||
                    /^(?:\(\s*\)\s*=>\s*)?console\.(?:log|warn|error)\([^)]*\);?$/.test(handlerBody) ||
                    handlerBody.includes('alert(') // Chỉ hiển thị alert mock
                ) {
                    isDead = true;
                    issue = `Hàm onClick rỗng hoặc chỉ chứa lệnh log/alert giả lập: \`${handlerBody}\``;
                }
            }
        }

        if (isDead) {
            deadButtonsCount++;
            reportDetails.push({
                file: relativePath,
                type: 'React',
                line,
                label: label.replace(/\s+/g, ' '),
                tag: fullTag.replace(/\s+/g, ' '),
                issue
            });
        }
    }
}

// Phân tích tệp ASP.NET (CSHTML)
function analyzeCshtmlFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(WORKSPACE_DIR, filePath);
    totalScanned++;

    // Tìm các thẻ <button hoặc <a class="...btn..."
    const btnRegex = /<(button|a)\b([^>]*?)(\/?>)/gi;
    let match;

    while ((match = btnRegex.exec(content)) !== null) {
        const fullTag = match[0];
        const tagName = match[1].toLowerCase();
        const attrs = match[2];
        const isSelfClosing = match[3] === '/>';
        const line = getLineNumber(content, match.index);

        // Trích xuất label nút
        let label = 'Không rõ';
        if (!isSelfClosing) {
            const afterTagIndex = match.index + fullTag.length;
            const closingTag = `</${tagName}>`;
            const closingIndex = content.indexOf(closingTag, afterTagIndex);
            if (closingIndex !== -1) {
                const inner = content.substring(afterTagIndex, closingIndex).trim();
                label = inner.replace(/<[^>]*>/g, '').substring(0, 40) || 'Chứa icon/html';
            }
        }

        // Với thẻ <a>, chỉ quét nếu có chứa class dạng "btn" (styled as button)
        if (tagName === 'a') {
            const classMatch = attrs.match(/class\s*=\s*["']([^"']+)["']/i);
            if (!classMatch || !classMatch[1].split(' ').some(c => c.startsWith('btn'))) {
                continue; // Bỏ qua thẻ a thông thường
            }
        }

        // Bỏ qua các submit button
        if (attrs.match(/type=["']submit["']/i)) {
            continue;
        }

        let isDead = false;
        let issue = '';

        if (tagName === 'a') {
            const hrefMatch = attrs.match(/href\s*=\s*["']([^"']*)["']/i);
            const hasOnclick = attrs.includes('onclick');
            
            if (!hrefMatch || hrefMatch[1] === '' || hrefMatch[1] === '#' || hrefMatch[1].startsWith('javascript:void')) {
                if (!hasOnclick && !attrs.includes('asp-action') && !attrs.includes('asp-controller') && !attrs.includes('data-bs-toggle')) {
                    isDead = true;
                    issue = 'Thẻ link styled-btn có href rỗng/chết (#) và không có sự kiện onclick / điều hướng MVC';
                }
            }
        } else if (tagName === 'button') {
            const hasOnclick = attrs.includes('onclick');
            const hasMvcAction = attrs.includes('asp-action') || attrs.includes('asp-controller') || attrs.includes('data-bs-toggle') || attrs.includes('type="submit"');
            
            if (!hasOnclick && !hasMvcAction) {
                isDead = true;
                issue = 'Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap';
            } else if (hasOnclick) {
                const onclickValMatch = attrs.match(/onclick\s*=\s*["']([^"']*)["']/i);
                if (onclickValMatch) {
                    const val = onclickValMatch[1].trim();
                    if (val === '' || val === ';' || val.startsWith('console.log') || val.startsWith('void')) {
                        isDead = true;
                        issue = `Sự kiện onclick rỗng hoặc chỉ chứa lệnh in log: \`onclick="${val}"\``;
                    }
                }
            }
        }

        if (isDead) {
            deadButtonsCount++;
            reportDetails.push({
                file: relativePath,
                type: 'ASP.NET Core (CSHTML)',
                line,
                label: label.replace(/\s+/g, ' '),
                tag: fullTag.replace(/\s+/g, ' '),
                issue
            });
        }
    }
}

// Chạy phân tích hệ thống
function runAnalysis() {
    console.log('⚡ Bắt đầu quét tĩnh và phân tích tính khả dụng của toàn bộ nút bấm trong Codebase...\n');

    // Quét React
    const reactFiles = scanDirectory(REACT_DIR, ['.js', '.jsx', '.tsx']);
    console.log(`🔍 Tìm thấy ${reactFiles.length} tệp React cần quét.`);
    reactFiles.forEach(analyzeReactFile);

    // Quét ASP.NET
    const cshtmlFiles = scanDirectory(CSHTML_DIR, ['.cshtml']);
    console.log(`🔍 Tìm thấy ${cshtmlFiles.length} tệp View CSHTML cần quét.`);
    cshtmlFiles.forEach(analyzeCshtmlFile);

    console.log(`\n📋 HOÀN TẤT QUÉT TĨNH HỆ THỐNG`);
    console.log(`- Tổng số tệp đã quét: ${totalScanned}`);
    console.log(`- Tổng số nút bấm bị CẢNH BÁO CHẾT (Dead Button): ${deadButtonsCount}\n`);

    // Ghi báo cáo ra file markdown
    writeMarkdownReport();
}

function writeMarkdownReport() {
    const reportPath = path.join(WORKSPACE_DIR, 'verify_buttons_report.md');
    
    let md = `# Báo cáo phân tích tính khả dụng của Nút bấm (Button Integrity Report)\n\n`;
    md += `*Thời gian quét:* ${new Date().toLocaleString('vi-VN')}\n`;
    md += `*Tổng số tệp mã nguồn được phân tích:* **${totalScanned}**\n`;
    md += `*Tổng số nút bấm cảnh báo chết / thiếu hàm xử lý:* **${deadButtonsCount}**\n\n`;
    md += `> [!WARNING]\n`;
    md += `> Dưới đây là danh sách chi tiết các nút bấm được phát hiện thiếu thuộc tính điều hướng/sự kiện hoặc chỉ chứa các trình xử lý giả lập (console.log/alert). Vui lòng rà soát lại trước khi phát hành phiên bản Production.\n\n`;
    
    md += `## Chi tiết các nút bấm cần kiểm tra (Dead Buttons List)\n\n`;
    md += `| Số TT | Loại tệp | Đường dẫn tệp | Dòng | Nhãn hiển thị (Label) | Lỗi chi tiết |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

    reportDetails.forEach((item, index) => {
        md += `| ${index + 1} | ${item.type} | [${path.basename(item.file)}](file:///${path.join(WORKSPACE_DIR, item.file).replace(/\\/g, '/')}#L${item.line}) | ${item.line} | \`${item.label}\` | ${item.issue} |\n`;
    });

    fs.writeFileSync(reportPath, md, 'utf8');
    console.log(`📝 Đã xuất báo cáo chi tiết nút bấm tại: verify_buttons_report.md`);
}

runAnalysis();
