/**
 * SmartLMS Enterprise Advanced Button API & Feature Audit Tool
 * 
 * Mục đích: Quét tĩnh nâng cao toàn bộ React & CSHTML, phân tích tên nhãn/placeholder của nút,
 * giải nghĩa tính năng của từng nút, và dò quét ngược hàm xử lý để trích xuất chính xác 
 * địa chỉ API Endpoint mà nút bấm đó sẽ gọi tới ở Backend.
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

const REACT_COMPONENT_ROUTES = {
    'LandingPage': '/',
    'LoginPage': '/login',
    'RegisterPage': '/register',
    'Dashboard': '/dashboard',
    'Courses': '/courses',
    'CheckoutQR': '/checkout/1',
    'CourseDetails': '/course/1',
    'MyLearning': '/my-learning',
    'ForumHome': '/community',
    'CommunityFriends': '/community/friends',
    'CommunityNewPost': '/community/post/new',
    'CommunityQuizBuilder': '/community/quiz-builder',
    'PersonalWiki': '/wiki',
    'BookingPage': '/booking',
    'StudyWorkspace': '/study/1',
    'CodeWorkspace': '/coding/1',
    'MistakeNotebook': '/mistakes',
    'Leaderboard': '/leaderboard',
    'PublicProfile': '/profile/1',
    'CourseManager': '/creator/courses',
    'MessageCenter': '/creator/messages',
    'CreatorAnalytics': '/creator/analytics',
    'TutorDashboard': '/tutor/dashboard'
};

const VPS_BASE_URL = 'http://141.253.114.218';

function getLiveUrl(filePath, fileName, type) {
    if (type === 'React') {
        const compName = fileName.replace(/\.(jsx|js|tsx)$/, '');
        const route = REACT_COMPONENT_ROUTES[compName];
        if (route) {
            return `${VPS_BASE_URL}${route}`;
        }
        return `${VPS_BASE_URL}/ (Route mặc định / hoặc trang con của ${compName})`;
    } else {
        const normalized = filePath.replace(/\\/g, '/');
        const viewsIndex = normalized.indexOf('Views/');
        if (viewsIndex !== -1) {
            const pathParts = normalized.substring(viewsIndex + 6).replace(/\.cshtml$/, '').split('/');
            if (pathParts.length >= 2) {
                const controller = pathParts[0];
                const action = pathParts[1];
                if (action.toLowerCase() === 'index') {
                    return `${VPS_BASE_URL}/${controller}`;
                }
                return `${VPS_BASE_URL}/${controller}/${action}`;
            }
        }
        return `${VPS_BASE_URL}/Account/Login (Trang Quản trị yêu cầu phân quyền)`;
    }
}

// Quét đệ quy
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

// Dò ngược hàm JS/React để tìm chuỗi gọi API
function traceApiEndpoint(fileContent, handlerName) {
    if (!handlerName || handlerName.includes('navigate') || handlerName.includes('history')) {
        return null;
    }

    // Tránh lỗi regex khi handlerName chứa ký tự đặc biệt như $, #, v.v.
    const escapedHandler = handlerName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Tìm định nghĩa hàm trong file
    const funcRegexes = [
        new RegExp(`const\\s+${escapedHandler}\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>`, 'i'),
        new RegExp(`async\\s+function\\s+${escapedHandler}\\b`, 'i'),
        new RegExp(`function\\s+${escapedHandler}\\b`, 'i'),
        new RegExp(`${escapedHandler}\\s*\\([^)]*\\)\\s*\\{`, 'i')
    ];

    let foundIndex = -1;
    for (const rx of funcRegexes) {
        const m = fileContent.match(rx);
        if (m) {
            foundIndex = m.index;
            break;
        }
    }

    if (foundIndex !== -1) {
        // Cắt ra 40 dòng tiếp theo trong thân hàm để phân tích
        const bodyStart = foundIndex;
        const bodyEnd = Math.min(fileContent.length, bodyStart + 1500);
        const funcBody = fileContent.substring(bodyStart, bodyEnd);

        // Tìm các chuỗi API dạng /api/... hoặc đường dẫn HTTP
        const apiMatch = funcBody.match(/['"`](\/api\/[^'"`\s]+)['"`]/i) || 
                         funcBody.match(/['"`](\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)['"`]/i);
        if (apiMatch) {
            return apiMatch[1];
        }
        
        // Dò các lệnh axios.get, axios.post
        const axiosMatch = funcBody.match(/axios\.(?:post|get|put|delete)\(\s*['"`]([^'"`\s]+)['"`]/i);
        if (axiosMatch) {
            return axiosMatch[1];
        }

        // Dò fetch
        const fetchMatch = funcBody.match(/fetch\(\s*['"`]([^'"`\s]+)['"`]/i);
        if (fetchMatch) {
            return fetchMatch[1];
        }
    }
    return null;
}

// Giải nghĩa tính năng nút bấm dựa trên hành vi
function resolveFeatureDescription(label, tag, apiCalled, issue) {
    label = label.toLowerCase();
    
    if (apiCalled && apiCalled.includes('/api/compiler/execute')) return 'Biên dịch và chạy thử code C# Roslyn trực tiếp trên Monaco Editor';
    if (apiCalled && apiCalled.includes('auto-create')) return 'AI tự động thiết lập thử thách code và sinh bộ testcase mẫu';
    if (apiCalled && apiCalled.includes('Logout')) return 'Đăng xuất phiên làm việc của người dùng hiện tại';
    if (apiCalled && apiCalled.includes('Login')) return 'Xác thực tài khoản và chuyển hướng vào trang quản lý';
    
    if (label.includes('lưu') || tag.includes('handleSave')) return 'Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống';
    if (label.includes('hủy') || label.includes('đóng')) return 'Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời';
    if (label.includes('tải thêm') || label.includes('xem thêm')) return 'Nạp thêm bản ghi dữ liệu phân trang tiếp theo';
    if (label.includes('chấp nhận') || label.includes('duyệt')) return 'Phê duyệt yêu cầu tương tác và thay đổi trạng thái bản ghi';
    if (label.includes('xóa') || label.includes('remove')) return 'Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete';
    if (label.includes('tạo') || label.includes('thêm')) return 'Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu)';
    
    if (tag.includes('navigate') || tag.includes('history.push') || tag.includes('href=')) {
        return 'Điều hướng người dùng sang trang liên kết chức năng';
    }

    if (issue) {
        return 'Tính năng giao diện (Chưa kết nối luồng xử lý)';
    }

    return 'Thực thi sự kiện nghiệp vụ tương ứng của trang';
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
            liveUrl: getLiveUrl(relativePath, fileName, 'React'),
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

        // Trích xuất label/nội dung hiển thị
        let label = '';
        if (!isSelfClosing) {
            const afterTagIndex = match.index + fullTag.length;
            const closingTag = `</${tagName}>`;
            const closingIndex = content.indexOf(closingTag, afterTagIndex);
            if (closingIndex !== -1) {
                const inner = content.substring(afterTagIndex, closingIndex).trim();
                label = inner.replace(/<[^>]*>/g, '').substring(0, 45) || '';
            }
        }

        // Ưu tiên trích xuất placeholder/title/aria-label/tooltip của nút nếu label trống
        let placeholder = 'Không có';
        const titleMatch = attrs.match(/title\s*=\s*["']([^"']+)["']/i) || attrs.match(/title\s*=\s*\{\s*["']([^"']+)["']\s*\}/i);
        const placeholderMatch = attrs.match(/placeholder\s*=\s*["']([^"']+)["']/i);
        const ariaMatch = attrs.match(/aria-label\s*=\s*["']([^"']+)["']/i);
        
        if (titleMatch) placeholder = titleMatch[1];
        else if (placeholderMatch) placeholder = placeholderMatch[1];
        else if (ariaMatch) placeholder = ariaMatch[1];

        // Nếu label vẫn rỗng, đặt mặc định dựa theo placeholder hoặc tag
        if (!label) {
            label = placeholder !== 'Không có' ? placeholder : 'Nút Icon/Hình ảnh';
        }

        let isWorking = true;
        let issue = '';
        let apiCalled = 'Không gọi API (Nút giao diện)';

        const hasOnClick = attrs.includes('onClick');
        const isSubmit = attrs.match(/type=["']submit["']/i) || attrs.match(/type=\{\s*["']submit["']\s*\}/i);
        const isDisabled = attrs.includes('disabled') && !attrs.includes('disabled={false}');

        // Phân tích click handler
        let handlerName = null;
        if (hasOnClick) {
            const onClickMatch = attrs.match(/onClick\s*=\s*\{\s*(?:\(\s*\)\s*=>\s*)?([a-zA-Z0-9_]+)(?:\([^)]*\))?\s*\}/i) ||
                                 attrs.match(/onClick\s*=\s*\{\s*([a-zA-Z0-9_]+)\s*\}/i);
            if (onClickMatch) {
                handlerName = onClickMatch[1];
            }
            
            // Dò các lệnh inline navigate
            const inlineNavigateMatch = attrs.match(/navigate\(\s*['"`]([^'"`\s]+)['"`]/i);
            if (inlineNavigateMatch) {
                apiCalled = `Điều hướng: ${inlineNavigateMatch[1]}`;
            }
        }

        if (isDisabled) {
            isWorking = true;
        } else if (isSubmit) {
            isWorking = true;
            // Dò API của form submit nếu có hàm onSubmit ở thẻ form phía trên
            apiCalled = 'Gửi dữ liệu Form (POST/PUT)';
        } else if (!hasOnClick) {
            isWorking = false;
            issue = 'Thiếu hoàn toàn thuộc tính onClick (Nút chết)';
            apiCalled = 'Chưa cấu hình API (Cần liên kết API)';
        } else {
            const onClickBodyMatch = attrs.match(/onClick\s*=\s*\{\s*(?:\(\s*\)\s*=>\s*)?\{([^}]*)\}\s*\}/i) || 
                                     attrs.match(/onClick\s*=\s*\{\s*([^}]+)\s*\}/i);
            
            if (onClickBodyMatch) {
                const handlerBody = onClickBodyMatch[1].trim();
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
                    issue = `onClick chỉ chứa lệnh log/alert rỗng`;
                    apiCalled = 'Chưa cấu hình API (Cần liên kết API)';
                }
            }
        }

        // Tiến hành dò tìm API endpoint thực tế từ hàm xử lý
        if (isWorking && handlerName) {
            const trackedApi = traceApiEndpoint(content, handlerName);
            if (trackedApi) {
                apiCalled = `Gọi API: ${trackedApi}`;
            }
        }

        const feature = resolveFeatureDescription(label, fullTag, apiCalled, issue);

        const buttonDetail = {
            line,
            label: label.replace(/\s+/g, ' '),
            placeholder,
            tag: fullTag.replace(/\s+/g, ' '),
            feature,
            api: apiCalled,
            issue
        };

        if (isWorking) {
            resultsByPage[relativePath].working.push(buttonDetail);
        } else {
            resultsByPage[relativePath].dead.push(buttonDetail);
        }
    }
}

// Phân tích tệp CSHTML View
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
            liveUrl: getLiveUrl(relativePath, fileName, 'CSHTML'),
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

        // Trích xuất label
        let label = '';
        if (!isSelfClosing) {
            const afterTagIndex = match.index + fullTag.length;
            const closingTag = `</${tagName}>`;
            const closingIndex = content.indexOf(closingTag, afterTagIndex);
            if (closingIndex !== -1) {
                const inner = content.substring(afterTagIndex, closingIndex).trim();
                label = inner.replace(/<[^>]*>/g, '').substring(0, 45) || '';
            }
        }

        // Trích xuất placeholder/title
        let placeholder = 'Không có';
        const titleMatch = attrs.match(/title\s*=\s*["']([^"']+)["']/i);
        const placeholderMatch = attrs.match(/placeholder\s*=\s*["']([^"']+)["']/i);
        
        if (titleMatch) placeholder = titleMatch[1];
        else if (placeholderMatch) placeholder = placeholderMatch[1];

        if (!label) {
            label = placeholder !== 'Không có' ? placeholder : 'Nút Hành động';
        }

        // Bỏ qua link không phải styled-btn
        if (tagName === 'a') {
            const classMatch = attrs.match(/class\s*=\s*["']([^"']+)["']/i);
            if (!classMatch || !classMatch[1].split(' ').some(c => c.startsWith('btn'))) {
                continue;
            }
        }

        let isWorking = true;
        let issue = '';
        let apiCalled = 'Không gọi API (Nút giao diện)';

        const isSubmit = attrs.match(/type=["']submit["']/i);
        const hasOnclick = attrs.includes('onclick');
        
        // Dò API đường dẫn liên kết MVC
        const mvcController = attrs.match(/asp-controller\s*=\s*["']([^"']+)["']/i);
        const mvcAction = attrs.match(/asp-action\s*=\s*["']([^"']+)["']/i);
        const hrefMatch = attrs.match(/href\s*=\s*["']([^"']*)["']/i);

        if (mvcController && mvcAction) {
            apiCalled = `MVC Router: /${mvcController[1]}/${mvcAction[1]}`;
        } else if (hrefMatch && hrefMatch[1] && hrefMatch[1] !== '#' && !hrefMatch[1].startsWith('javascript:void')) {
            apiCalled = `Liên kết: ${hrefMatch[1]}`;
        }

        if (isSubmit) {
            isWorking = true;
            if (apiCalled === 'Không gọi API (Nút giao diện)') {
                apiCalled = 'Gửi dữ liệu Form (POST/PUT)';
            }
        } else if (tagName === 'a') {
            if (!hrefMatch || hrefMatch[1] === '' || hrefMatch[1] === '#' || hrefMatch[1].startsWith('javascript:void')) {
                if (!hasOnclick && !mvcController && !attrs.includes('data-bs-toggle')) {
                    isWorking = false;
                    issue = 'Nút chết, thiếu hoàn toàn liên kết và sự kiện';
                    apiCalled = 'Chưa cấu hình API (Cần liên kết API)';
                }
            }
        } else if (tagName === 'button') {
            const hasMvcAction = mvcController || mvcAction || attrs.includes('data-bs-toggle');
            
            if (!hasOnclick && !hasMvcAction) {
                isWorking = false;
                issue = 'Thiếu sự kiện onclick / điều hướng MVC';
                apiCalled = 'Chưa cấu hình API (Cần liên kết API)';
            } else if (hasOnclick) {
                const onclickValMatch = attrs.match(/onclick\s*=\s*["']([^"']*)["']/i);
                if (onclickValMatch) {
                    const val = onclickValMatch[1].trim();
                    if (val === '' || val === ';' || val.startsWith('console.log') || val.startsWith('void')) {
                        isWorking = false;
                        issue = `onclick rỗng hoặc giả lập`;
                        apiCalled = 'Chưa cấu hình API (Cần liên kết API)';
                    } else {
                        // Dò hàm JS trong cùng trang nếu có thể
                        const trackedApi = traceApiEndpoint(content, val.replace(/\([^)]*\)/, ''));
                        if (trackedApi) {
                            apiCalled = `Gọi API: ${trackedApi}`;
                        }
                    }
                }
            }
        }

        const feature = resolveFeatureDescription(label, fullTag, apiCalled, issue);

        const buttonDetail = {
            line,
            label: label.replace(/\s+/g, ' '),
            placeholder,
            tag: fullTag.replace(/\s+/g, ' '),
            feature,
            api: apiCalled,
            issue
        };

        if (isWorking) {
            resultsByPage[relativePath].working.push(buttonDetail);
        } else {
            resultsByPage[relativePath].dead.push(buttonDetail);
        }
    }
}

// Thực thi chính
function run() {
    console.log('⚡ Bắt đầu quét chẩn đoán API, Placeholder và Tính năng nút bấm toàn hệ thống...');

    const reactFiles = scanDirectory(REACT_DIR, ['.js', '.jsx', '.tsx']);
    reactFiles.forEach(analyzeReactFile);

    const cshtmlFiles = scanDirectory(CSHTML_DIR, ['.cshtml']);
    cshtmlFiles.forEach(analyzeCshtmlFile);

    const reportPath = path.join(WORKSPACE_DIR, 'verify_buttons_advanced_report.md');
    let md = `# Báo cáo Chẩn đoán API & Tính năng Nút bấm (Enterprise UI Button API Mapping)\n\n`;
    md += `*Thời gian quét:* ${new Date().toLocaleString('vi-VN')}\n`;
    md += `*Tổng số tệp UI đã phân tích:* **${totalScanned}**\n\n`;

    md += `## DANH SÁCH KHẢO SÁT CHI TIẾT THEO TỪNG TRANG (PAGE-BY-PAGE API MAP)\n\n`;

    let totalWorkingButtons = 0;
    let totalDeadButtons = 0;

    Object.values(resultsByPage).forEach(page => {
        if (page.working.length === 0 && page.dead.length === 0) return;

        totalWorkingButtons += page.working.length;
        totalDeadButtons += page.dead.length;

        md += `### 📄 Trang: [${page.fileName}](file:///${path.join(WORKSPACE_DIR, page.filePath).replace(/\\/g, '/')})\n`;
        md += `* **Đường dẫn tệp:** \`${page.filePath}\`\n`;
        md += `* **Đường dẫn chạy thử trên VPS:** [${page.liveUrl}](${page.liveUrl})\n`;
        md += `* **Công nghệ:** \`${page.type}\`\n`;
        md += `* **Mô tả tính năng trang:** *${page.description}*\n\n`;

        // 1. Nút hoạt động tốt
        md += `#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - ${page.working.length})\n`;
        if (page.working.length === 0) {
            md += `*Không có nút nào được gán sự kiện hoặc kết nối.*\n\n`;
        } else {
            md += `| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |\n`;
            md += `| :--- | :--- | :--- | :--- | :--- |\n`;
            page.working.forEach(b => {
                md += `| ${b.line} | \`${b.label}\` | \`${b.placeholder}\` | ${b.feature} | **\`${b.api}\`** |\n`;
            });
            md += `\n`;
        }

        // 2. Nút chết/Chưa gán sự kiện
        md += `#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - ${page.dead.length})\n`;
        if (page.dead.length === 0) {
            md += `*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*\n\n`;
        } else {
            md += `| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |\n`;
            md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
            page.dead.forEach(b => {
                md += `| ${b.line} | \`${b.label}\` | \`${b.placeholder}\` | <span style="color:red">${b.issue}</span> | ${b.feature} | *${b.api}* |\n`;
            });
            md += `\n`;
        }

        md += `---\n\n`;
    });

    md += `## 📊 BẢNG TỔNG HỢP TOÀN HỆ THỐNG (SYSTEM STATUS)\n\n`;
    md += `| Chỉ số kiểm thử | Số lượng |\n`;
    md += `| :--- | :--- |\n`;
    md += `| ✅ Nút hoạt động tốt (Working Buttons) | **${totalWorkingButtons}** |\n`;
    md += `| ❌ Nút chưa hoạt động (Dead Buttons) | **${totalDeadButtons}** |\n`;
    md += `| 📊 Tổng cộng nút bấm đã quét | **${totalWorkingButtons + totalDeadButtons}** |\n`;

    fs.writeFileSync(reportPath, md, 'utf8');
    console.log(`\n🎉 Đã nâng cấp thành công công cụ quét!`);
    console.log(`- Nút hoạt động tốt: ${totalWorkingButtons}`);
    console.log(`- Nút chưa hoạt động (Dead): ${totalDeadButtons}`);
    console.log(`📝 Xem báo cáo nâng cấp tại: verify_buttons_advanced_report.md`);
}

run();
