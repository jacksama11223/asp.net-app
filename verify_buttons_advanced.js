/**
 * SmartLMS Enterprise Advanced Button Integrity & Comment Extraction Tool
 * 
 * Mục đích: Quét tĩnh nâng cao tất cả các tệp React và ASP.NET Core,
 * phân loại nút bấm ĐANG HOẠT ĐỘNG (Working) vs BỊ CHẾT (Dead),
 * tự động trích xuất các dòng comment giải thích của lập trình viên nằm ngay trên nút đó.
 * 
 * Chạy: node verify_buttons_advanced.js
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_DIR = __dirname;
const REACT_DIR = path.join(WORKSPACE_DIR, 'react-test-frontend', 'src');
const CSHTML_DIR = path.join(WORKSPACE_DIR, 'SmartLMS.Web', 'Views');

let totalScanned = 0;
let resultsByPage = {};

const PAGE_DESCRIPTIONS = {
    'CourseManager.jsx': 'Quản lý khóa học, thiết lập bài học và biên soạn đề bài thực hành C# Roslyn Sandbox cho Giảng viên.',
    'StudyWorkspace.jsx': 'Không gian học tập tích hợp trình chiếu giáo trình và nhúng Monaco IDE thực hành biên dịch code trực tiếp cho Học viên.',
    'Dashboard.jsx': 'Bảng thống kê hiệu năng, tỷ lệ hoàn thành khóa học và phân tích rủi ro thất nghiệp bằng trí tuệ nhân tạo (AI Predictor).',
    'LandingPage.jsx': 'Trang chủ giới thiệu nền tảng SmartLMS.AI, tiếp thị các khóa học nổi bật và dẫn nhập đăng ký.',
    'Courses.jsx': 'Danh sách thư viện khóa học công khai trên hệ thống dành cho mọi đối tượng học viên.',
    'LoginPage.jsx': 'Cửa ngõ đăng nhập hệ thống phân quyền đa vai trò (Học viên, Giảng viên, Admin).',
    'RegisterPage.jsx': 'Trang đăng ký tài khoản học viên mới, mã hóa mật khẩu bảo mật qua EncryptionService.',
    'MistakeNotebook.jsx': 'Sổ tay lưu vết các lỗi biên dịch, lỗi logic C# và gợi ý hướng khắc phục tự động bằng AI học máy.',
    'Community.jsx': 'Diễn đàn thảo luận và học tập cộng đồng tích hợp Q&A và mạng xã hội học tập.',
    'TutorDashboard.jsx': 'Bảng điều khiển của Gia sư quản lý lịch rảnh và duyệt các cuộc hẹn tư vấn từ học viên.',
    'Curriculum.cshtml': 'Thiết lập khung chương trình học, thêm bớt chương mục và thứ tự bài giảng ở trang quản trị MVC.',
    'BadgeStudio.cshtml': 'Hệ thống thiết kế huy hiệu, vinh danh thành tích và gamification điểm thưởng XP của admin.',
    'ExamAssembler.cshtml': 'Hệ thống tự động biên soạn đề thi, trắc nghiệm và quản lý ngân hàng câu hỏi.',
    'Members.cshtml': 'Quản lý thành viên lớp học, thêm học viên vào khóa học/cohort cụ thể.',
    'Audit.cshtml': 'Lịch sử dòng tiền, doanh thu và kiểm toán thanh toán.'
};

// Quét thư mục đệ quy
function scanDirectory(dir, extensions) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
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

// Lấy số dòng
function getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
}

// Trích xuất comment nằm ngay trên nút bấm
function extractPrecedingComment(content, index) {
    const start = Math.max(0, index - 250);
    const precedingText = content.substring(start, index);
    
    // Tìm comment HTML <!-- ... -->
    const htmlCommentMatch = precedingText.match(/<!--([\s\S]*?)-->\s*$/);
    if (htmlCommentMatch) {
        return htmlCommentMatch[1].trim();
    }
    
    // Tìm comment JS/JSX /* ... */
    const jsMultiCommentMatch = precedingText.match(/\/\*([\s\S]*?)\*\/\s*$/);
    if (jsMultiCommentMatch) {
        return jsMultiCommentMatch[1].trim().replace(/\*+/g, '').trim();
    }
    
    // Tìm comment JS/JSX // ...
    const jsSingleCommentLines = precedingText.split('\n');
    let foundSingleComments = [];
    for (let i = jsSingleCommentLines.length - 1; i >= 0; i--) {
        const line = jsSingleCommentLines[i].trim();
        if (line.startsWith('//')) {
            foundSingleComments.unshift(line.substring(2).trim());
        } else if (foundSingleComments.length > 0) {
            break;
        }
    }
    if (foundSingleComments.length > 0) {
        return foundSingleComments.join(' | ');
    }
    
    return 'Không có comment giải thích phía trên';
}

// Phân tích tệp React
function analyzeReactFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(WORKSPACE_DIR, filePath);
    const fileName = path.basename(filePath);
    totalScanned++;

    const pageDesc = PAGE_DESCRIPTIONS[fileName] || `Phân hệ giao diện chức năng của Học viên/Giảng viên tại ${path.dirname(relativePath)}`;

    if (!resultsByPage[relativePath]) {
        resultsByPage[relativePath] = {
            filePath: relativePath,
            fileName,
            description: pageDesc,
            type: 'React',
            working: [],
            dead: []
        };
    }

    const btnRegex = /<(Button|ActionIcon|button)\b([^>]*?)(\/?>)/gi;
    let match;

    while ((match = btnRegex.exec(content)) !== null) {
        const fullTag = match[0];
        const tagName = match[1];
        const attrs = match[2];
        const isSelfClosing = match[3] === '/>';
        const line = getLineNumber(content, match.index);
        const comment = extractPrecedingComment(content, match.index);

        let label = 'Không rõ';
        if (!isSelfClosing) {
            const afterTagIndex = match.index + fullTag.length;
            const closingTag = `</${tagName}>`;
            const closingIndex = content.indexOf(closingTag, afterTagIndex);
            if (closingIndex !== -1) {
                const inner = content.substring(afterTagIndex, closingIndex).trim();
                label = inner.replace(/<[^>]*>/g, '').substring(0, 45) || 'Chứa icon/html';
            }
        }

        let isWorking = true;
        let issue = '';

        // Phân loại logic nút
        const hasOnClick = attrs.includes('onClick');
        const isSubmit = attrs.match(/type=["']submit["']/i) || attrs.match(/type=\{\s*["']submit["']\s*\}/i);
        const isDisabled = attrs.includes('disabled') && !attrs.includes('disabled={false}');

        if (isDisabled) {
            isWorking = true; // Nút khóa (disabled) là hợp lệ
        } else if (isSubmit) {
            isWorking = true; // Submit button hợp lệ
        } else if (!hasOnClick) {
            isWorking = false;
            issue = 'Thiếu hoàn toàn thuộc tính onClick (Nút chết)';
        } else {
            const onClickMatch = attrs.match(/onClick\s*=\s*\{\s*(?:\(\s*\)\s*=>\s*)?\{([^}]*)\}\s*\}/i) || 
                                 attrs.match(/onClick\s*=\s*\{\s*([^}]+)\s*\}/i);
            
            if (onClickMatch) {
                const handlerBody = onClickMatch[1].trim();
                if (
                    handlerBody === '' ||
                    handlerBody === '()' ||
                    handlerBody === 'undefined' ||
                    handlerBody === 'null' ||
                    /^(?:\(\s*\)\s*=>\s*)?\{\s*\}$/.test(handlerBody) ||
                    /^(?:\(\s*\)\s*=>\s*)?console\.(?:log|warn|error)\([^)]*\);?$/.test(handlerBody) ||
                    handlerBody.includes('alert(')
                ) {
                    isWorking = false;
                    issue = `onClick chỉ chứa lệnh log/alert rỗng: \`${handlerBody}\``;
                }
            }
        }

        const buttonDetail = {
            line,
            label: label.replace(/\s+/g, ' '),
            tag: fullTag.replace(/\s+/g, ' '),
            comment,
            issue
        };

        if (isWorking) {
            resultsByPage[relativePath].working.push(buttonDetail);
        } else {
            resultsByPage[relativePath].dead.push(buttonDetail);
        }
    }
}

// Phân tích tệp ASP.NET View
function analyzeCshtmlFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(WORKSPACE_DIR, filePath);
    const fileName = path.basename(filePath);
    totalScanned++;

    const pageDesc = PAGE_DESCRIPTIONS[fileName] || `Giao diện quản lý MVC thuộc thư mục ${path.basename(path.dirname(filePath))}`;

    if (!resultsByPage[relativePath]) {
        resultsByPage[relativePath] = {
            filePath: relativePath,
            fileName,
            description: pageDesc,
            type: 'ASP.NET Core (CSHTML)',
            working: [],
            dead: []
        };
    }

    const btnRegex = /<(button|a)\b([^>]*?)(\/?>)/gi;
    let match;

    while ((match = btnRegex.exec(content)) !== null) {
        const fullTag = match[0];
        const tagName = match[1].toLowerCase();
        const attrs = match[2];
        const isSelfClosing = match[3] === '/>';
        const line = getLineNumber(content, match.index);
        const comment = extractPrecedingComment(content, match.index);

        let label = 'Không rõ';
        if (!isSelfClosing) {
            const afterTagIndex = match.index + fullTag.length;
            const closingTag = `</${tagName}>`;
            const closingIndex = content.indexOf(closingTag, afterTagIndex);
            if (closingIndex !== -1) {
                const inner = content.substring(afterTagIndex, closingIndex).trim();
                label = inner.replace(/<[^>]*>/g, '').substring(0, 45) || 'Chứa icon/html';
            }
        }

        // Với <a>, chỉ quét dạng link style-button (có class btn)
        if (tagName === 'a') {
            const classMatch = attrs.match(/class\s*=\s*["']([^"']+)["']/i);
            if (!classMatch || !classMatch[1].split(' ').some(c => c.startsWith('btn'))) {
                continue;
            }
        }

        let isWorking = true;
        let issue = '';

        const isSubmit = attrs.match(/type=["']submit["']/i);

        if (isSubmit) {
            isWorking = true;
        } else if (tagName === 'a') {
            const hrefMatch = attrs.match(/href\s*=\s*["']([^"']*)["']/i);
            const hasOnclick = attrs.includes('onclick');
            
            if (!hrefMatch || hrefMatch[1] === '' || hrefMatch[1] === '#' || hrefMatch[1].startsWith('javascript:void')) {
                if (!hasOnclick && !attrs.includes('asp-action') && !attrs.includes('asp-controller') && !attrs.includes('data-bs-toggle')) {
                    isWorking = false;
                    issue = 'Thẻ link styled-btn có href rỗng/chết (#) và không có onclick / điều hướng MVC';
                }
            }
        } else if (tagName === 'button') {
            const hasOnclick = attrs.includes('onclick');
            const hasMvcAction = attrs.includes('asp-action') || attrs.includes('asp-controller') || attrs.includes('data-bs-toggle');
            
            if (!hasOnclick && !hasMvcAction) {
                isWorking = false;
                issue = 'Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap';
            } else if (hasOnclick) {
                const onclickValMatch = attrs.match(/onclick\s*=\s*["']([^"']*)["']/i);
                if (onclickValMatch) {
                    const val = onclickValMatch[1].trim();
                    if (val === '' || val === ';' || val.startsWith('console.log') || val.startsWith('void')) {
                        isWorking = false;
                        issue = `onclick rỗng/log: \`onclick="${val}"\``;
                    }
                }
            }
        }

        const buttonDetail = {
            line,
            label: label.replace(/\s+/g, ' '),
            tag: fullTag.replace(/\s+/g, ' '),
            comment,
            issue
        };

        if (isWorking) {
            resultsByPage[relativePath].working.push(buttonDetail);
        } else {
            resultsByPage[relativePath].dead.push(buttonDetail);
        }
    }
}

// Thực thi
function run() {
    console.log('⚡ Đang phân tích nâng cao, phân loại nút và trích xuất comment...');

    const reactFiles = scanDirectory(REACT_DIR, ['.js', '.jsx', '.tsx']);
    reactFiles.forEach(analyzeReactFile);

    const cshtmlFiles = scanDirectory(CSHTML_DIR, ['.cshtml']);
    cshtmlFiles.forEach(analyzeCshtmlFile);

    // Ghi báo cáo ra file markdown
    const reportPath = path.join(WORKSPACE_DIR, 'verify_buttons_advanced_report.md');
    let md = `# Báo cáo Phân tích Nút bấm & Giải nghĩa Giao diện (Advanced Interactive UI Audit)\n\n`;
    md += `*Thời gian quét:* ${new Date().toLocaleString('vi-VN')}\n`;
    md += `*Tổng số tệp đã phân tích:* **${totalScanned}**\n\n`;

    md += `## DANH SÁCH BÁO CÁO PHÂN TÍCH THEO TỪNG TRANG (PAGE-BY-PAGE REPORT)\n\n`;

    let totalWorkingButtons = 0;
    let totalDeadButtons = 0;

    Object.values(resultsByPage).forEach(page => {
        // Chỉ hiện trang có chứa ít nhất 1 button
        if (page.working.length === 0 && page.dead.length === 0) return;

        totalWorkingButtons += page.working.length;
        totalDeadButtons += page.dead.length;

        md += `### 📄 Trang: [${page.fileName}](file:///${path.join(WORKSPACE_DIR, page.filePath).replace(/\\/g, '/')})\n`;
        md += `* **Đường dẫn tệp:** \`${page.filePath}\`\n`;
        md += `* **Công nghệ:** \`${page.type}\`\n`;
        md += `* **Mô tả tính năng:** *${page.description}*\n\n`;

        // 1. Nút hoạt động tốt
        md += `#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - ${page.working.length})\n`;
        if (page.working.length === 0) {
            md += `*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*\n\n`;
        } else {
            md += `| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |\n`;
            md += `| :--- | :--- | :--- | :--- |\n`;
            page.working.forEach(b => {
                md += `| ${b.line} | \`${b.label}\` | \`${b.tag.substring(0, 50)}${b.tag.length > 50 ? '...' : ''}\` | *${b.comment}* |\n`;
            });
            md += `\n`;
        }

        // 2. Nút chết/Chưa gán sự kiện
        md += `#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - ${page.dead.length})\n`;
        if (page.dead.length === 0) {
            md += `*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*\n\n`;
        } else {
            md += `| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |\n`;
            md += `| :--- | :--- | :--- | :--- |\n`;
            page.dead.forEach(b => {
                md += `| ${b.line} | \`${b.label}\` | <span style="color:red">${b.issue}</span> | *${b.comment}* |\n`;
            });
            md += `\n`;
        }

        md += `---\n\n`;
    });

    md += `## 📊 BẢNG TỔNG HỢP TOÀN HỆ THỐNG (SYSTEM STATS)\n\n`;
    md += `| Chỉ số kiểm thử | Số lượng |\n`;
    md += `| :--- | :--- |\n`;
    md += `| ✅ Nút hoạt động tốt (Working Buttons) | **${totalWorkingButtons}** |\n`;
    md += `| ❌ Nút chưa hoạt động (Dead Buttons) | **${totalDeadButtons}** |\n`;
    md += `| 📊 Tổng cộng nút bấm đã quét | **${totalWorkingButtons + totalDeadButtons}** |\n`;

    fs.writeFileSync(reportPath, md, 'utf8');
    console.log(`\n🎉 Đã hoàn tất báo cáo nâng cao!`);
    console.log(`- Nút hoạt động tốt: ${totalWorkingButtons}`);
    console.log(`- Nút chưa hoạt động (Dead): ${totalDeadButtons}`);
    console.log(`📝 Xem chi tiết báo cáo tại: verify_buttons_advanced_report.md`);
}

run();
