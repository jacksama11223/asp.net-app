/**
 * SmartLMS Enterprise Advanced Button API & Feature Audit Tool (Upgraded Tokenizer Edition)
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
    'TutorDashboard': '/tutor/dashboard',
    'TutorProfile': '/tutor/profile/1',
    'TutorProfileEdit': '/tutor/profile/edit',
    'TutorSchedule': '/tutor/schedule',
    'AICareerReport': '/ai-career-report',
    'CertificateView': '/certificate/1'
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

// Quét đệ quy thư mục
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

    const escapedHandler = handlerName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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
        const bodyStart = foundIndex;
        const bodyEnd = Math.min(fileContent.length, bodyStart + 1500);
        const funcBody = fileContent.substring(bodyStart, bodyEnd);

        const apiMatch = funcBody.match(/['"`](\/api\/[^'"`\s]+)['"`]/i) || 
                         funcBody.match(/['"`](\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)['"`]/i);
        if (apiMatch) {
            return apiMatch[1];
        }
        
        const axiosMatch = funcBody.match(/axios\.(?:post|get|put|delete)\(\s*['"`]([^'"`\s]+)['"`]/i);
        if (axiosMatch) {
            return axiosMatch[1];
        }

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

// Hàm phân tích thuộc tính của thẻ JSX nâng cao sử dụng Tokenizer cân bằng ngoặc
function extractJsxTag(content, startIndex) {
    let index = startIndex;
    if (content[index] !== '<') return null;
    
    index++; // bỏ qua '<'
    
    // Đọc tên thẻ (Tag Name)
    let tagName = '';
    while (index < content.length && /[a-zA-Z0-9_.-]/.test(content[index])) {
        tagName += content[index];
        index++;
    }
    
    // Đọc các thuộc tính cho đến khi gặp thẻ đóng thực sự
    let attrs = '';
    let inDoubleQuote = false;
    let inSingleQuote = false;
    let inBacktick = false;
    let braceDepth = 0;
    let parenDepth = 0;
    let isSelfClosing = false;
    
    while (index < content.length) {
        const char = content[index];
        
        if (char === '"' && !inSingleQuote && !inBacktick) {
            inDoubleQuote = !inDoubleQuote;
        } else if (char === "'" && !inDoubleQuote && !inBacktick) {
            inSingleQuote = !inSingleQuote;
        } else if (char === '`' && !inDoubleQuote && !inSingleQuote) {
            inBacktick = !inBacktick;
        } else if (!inDoubleQuote && !inSingleQuote && !inBacktick) {
            if (char === '{') {
                braceDepth++;
            } else if (char === '}') {
                braceDepth--;
            } else if (char === '(') {
                parenDepth++;
            } else if (char === ')') {
                parenDepth--;
            } else if (braceDepth === 0 && parenDepth === 0) {
                if (char === '/' && content[index + 1] === '>') {
                    isSelfClosing = true;
                    index += 2;
                    break;
                } else if (char === '>') {
                    index++;
                    break;
                }
            }
        }
        
        attrs += char;
        index++;
    }
    
    return {
        tagName,
        attrs,
        isSelfClosing,
        endIndex: index
    };
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

    // Quét toàn bộ các thẻ mở JSX
    let index = 0;
    while ((index = content.indexOf('<', index)) !== -1) {
        const nextChar = content[index + 1];
        // Bỏ qua thẻ đóng </... hoặc comment <!... hoặc thẻ trống <>
        if (nextChar === '/' || nextChar === '!' || nextChar === '>') {
            index++;
            continue;
        }

        const tagInfo = extractJsxTag(content, index);
        if (!tagInfo) {
            index++;
            continue;
        }

        const { tagName, attrs, isSelfClosing, endIndex } = tagInfo;
        index = endIndex; // dịch chuyển index tiếp tục

        const tagNameLower = tagName.toLowerCase();
        const hasOnClick = attrs.includes('onClick');
        
        // Kiểm tra xem đây có phải là Nút hoặc phần tử có tính tương tác cao (như Menu.Item, Tabs.Tab, NavLink) hay không
        const isInteractiveTag = [
            'button', 'button', 'actionicon', 'menu.item', 'tabs.tab', 'navlink', 'list.item'
        ].includes(tagNameLower) || 
        tagName === 'Button' || 
        tagName === 'ActionIcon' || 
        tagName.includes('Menu.Item') || 
        tagName.includes('Tabs.Tab') || 
        tagName.includes('NavLink') || 
        tagName.includes('Table.Tr') ||
        tagName.includes('Card') ||
        tagName.includes('Paper');

        const isClickableElement = hasOnClick;
        const isStyledButton = attrs.includes('btn') || attrs.includes('cursor-pointer');

        if (!isInteractiveTag && !isClickableElement && !isStyledButton) {
            continue;
        }

        const line = getLineNumber(content, index - attrs.length - tagName.length - 2);

        // Trích xuất label/nội dung hiển thị
        let label = '';
        if (!isSelfClosing) {
            // Tìm nhãn văn bản hiển thị trong phần body của tag
            const afterTagIndex = index;
            const closingTag = `</${tagName}>`;
            const closingIndex = content.indexOf(closingTag, afterTagIndex);
            if (closingIndex !== -1 && closingIndex - afterTagIndex < 300) { // Giới hạn độ dài thẻ để tránh gom cụm lớn
                const inner = content.substring(afterTagIndex, closingIndex).trim();
                label = inner.replace(/<[^>]*>/g, '').substring(0, 45) || '';
            }
        }

        // Trích xuất placeholder/title/aria-label/tooltip
        let placeholder = 'Không có';
        const titleMatch = attrs.match(/title\s*=\s*["']([^"']+)["']/i) || attrs.match(/title\s*=\s*\{\s*["']([^"']+)["']\s*\}/i);
        const placeholderMatch = attrs.match(/placeholder\s*=\s*["']([^"']+)["']/i);
        const ariaMatch = attrs.match(/aria-label\s*=\s*["']([^"']+)["']/i);
        
        if (titleMatch) placeholder = titleMatch[1];
        else if (placeholderMatch) placeholder = placeholderMatch[1];
        else if (ariaMatch) placeholder = ariaMatch[1];

        // Đặt label mặc định nếu trống
        if (!label) {
            label = placeholder !== 'Không có' ? placeholder : `Nút ${tagName}`;
        }

        // Loại bỏ các thẻ con hay dấu ngoặc ra khỏi hiển thị nhãn
        label = label.replace(/\{[^}]*\}/g, '').trim();
        if (!label) {
            label = `Nút ${tagName}`;
        }

        let isWorking = true;
        let issue = '';
        let apiCalled = 'Không gọi API (Nút giao diện)';

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
            apiCalled = 'Gửi dữ liệu Form (POST/PUT)';
        } else if (!hasOnClick) {
            // Đối với các thẻ trang trí hoặc Tabs.Tab, Card click mà không gán onClick thì bỏ qua
            if (!['Button', 'button', 'ActionIcon', 'actionicon', 'Menu.Item'].includes(tagName)) {
                continue; // Bỏ qua không báo cáo nút chết cho Card/Paper/Div rỗng
            }
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

        // Dò tìm API endpoint thực tế từ hàm xử lý
        if (isWorking && handlerName) {
            const trackedApi = traceApiEndpoint(content, handlerName);
            if (trackedApi) {
                apiCalled = `Gọi API: ${trackedApi}`;
            }
        }

        const feature = resolveFeatureDescription(label, `<${tagName} ${attrs}>`, apiCalled, issue);

        const buttonDetail = {
            line,
            label: label.replace(/\s+/g, ' '),
            placeholder,
            tag: `<${tagName} ${attrs.replace(/\s+/g, ' ').trim()}>`,
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

    // Tương tự, sử dụng tokenizer cho thẻ HTML trong CSHTML
    let index = 0;
    while ((index = content.indexOf('<', index)) !== -1) {
        const nextChar = content[index + 1];
        if (nextChar === '/' || nextChar === '!' || nextChar === '>') {
            index++;
            continue;
        }

        const tagInfo = extractJsxTag(content, index);
        if (!tagInfo) {
            index++;
            continue;
        }

        const { tagName, attrs, isSelfClosing, endIndex } = tagInfo;
        index = endIndex;

        const tagNameLower = tagName.toLowerCase();
        const hasOnclick = attrs.includes('onclick') || attrs.includes('onclick=') || attrs.includes('asp-action');
        const isButtonTag = ['button', 'a'].includes(tagNameLower);
        const isClickableElement = hasOnclick || attrs.includes('cursor-pointer');
        const isStyledButton = attrs.includes('btn ') || attrs.includes('btn-') || attrs.includes('class="btn"') || attrs.includes("class='btn'");

        if (!isButtonTag && !isClickableElement && !isStyledButton) {
            continue;
        }

        // Bỏ qua link không phải styled-btn hoặc không có click
        if (tagNameLower === 'a') {
            const classMatch = attrs.match(/class\s*=\s*["']([^"']+)["']/i);
            const isBtnClass = classMatch && classMatch[1].split(' ').some(c => c.startsWith('btn'));
            if (!isBtnClass && !hasOnclick) {
                continue;
            }
        }

        const line = getLineNumber(content, index - attrs.length - tagName.length - 2);

        // Trích xuất label
        let label = '';
        if (!isSelfClosing) {
            const afterTagIndex = index;
            const closingTag = `</${tagName}>`;
            const closingIndex = content.indexOf(closingTag, afterTagIndex);
            if (closingIndex !== -1 && closingIndex - afterTagIndex < 300) {
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
            label = placeholder !== 'Không có' ? placeholder : `Nút ${tagName}`;
        }

        label = label.replace(/\{[^}]*\}/g, '').trim();
        if (!label) {
            label = `Nút ${tagName}`;
        }

        let isWorking = true;
        let issue = '';
        let apiCalled = 'Không gọi API (Nút giao diện)';

        const isSubmit = attrs.match(/type=["']submit["']/i);
        
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
        } else if (tagNameLower === 'a') {
            if (!hrefMatch || hrefMatch[1] === '' || hrefMatch[1] === '#' || hrefMatch[1].startsWith('javascript:void')) {
                if (!hasOnclick && !mvcController && !attrs.includes('data-bs-toggle')) {
                    isWorking = false;
                    issue = 'Nút chết, thiếu hoàn toàn liên kết và sự kiện';
                    apiCalled = 'Chưa cấu hình API (Cần liên kết API)';
                }
            }
        } else if (tagNameLower === 'button') {
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
                        const trackedApi = traceApiEndpoint(content, val.replace(/\([^)]*\)/, ''));
                        if (trackedApi) {
                            apiCalled = `Gọi API: ${trackedApi}`;
                        }
                    }
                }
            }
        }

        const feature = resolveFeatureDescription(label, `<${tagName} ${attrs}>`, apiCalled, issue);

        const buttonDetail = {
            line,
            label: label.replace(/\s+/g, ' '),
            placeholder,
            tag: `<${tagName} ${attrs.replace(/\s+/g, ' ').trim()}>`,
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

async function pingApiEndpoint(apiUrl) {
    let cleanPath = apiUrl;
    if (!cleanPath.includes('/api/')) {
        return { status: 'N/A', code: null, message: 'Nút giao diện/Điều hướng' };
    }
    
    const apiMatch = cleanPath.match(/(\/api\/[a-zA-Z0-9_\-\/\{\}]+)/);
    if (!apiMatch) {
        return { status: 'N/A', code: null, message: 'Không thể phân tích dẫn API' };
    }
    
    let endpoint = apiMatch[1];
    endpoint = endpoint.replace(/\{[a-zA-Z0-9_-]+\}/g, '1');
    const fullUrl = `${VPS_BASE_URL}${endpoint}`;
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        let response;
        try {
            response = await fetch(fullUrl, {
                method: 'OPTIONS',
                signal: controller.signal
            });
        } catch (e) {
            response = await fetch(fullUrl, {
                method: 'GET',
                signal: controller.signal
            });
        }
        
        clearTimeout(timeoutId);
        
        const statusCode = response.status;
        if (statusCode === 404) {
            return { status: '🔴 Broken (404)', code: 404, message: 'API Route không tồn tại trên VPS Backend' };
        } else if (statusCode === 502 || statusCode === 503 || statusCode === 504) {
            return { status: '🔴 Broken (Gateway)', code: statusCode, message: `Lỗi Gateway VPS (${statusCode})` };
        } else {
            return { status: `🟢 Active (${statusCode})`, code: statusCode, message: 'API phản hồi từ Backend hợp lệ' };
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            return { status: '🟡 Timeout (3s)', code: null, message: 'Không có phản hồi từ VPS' };
        }
        return { status: '🔴 Connection Failed', code: null, message: `Lỗi kết nối: ${err.message}` };
    }
}

async function pingAllButtons(pages) {
    console.log('\n🔗 Bắt đầu gửi API request thực tế để kiểm thử kết nối Backend trên VPS...');
    const allWorkingButtons = [];
    
    Object.values(pages).forEach(page => {
        page.working.forEach(btn => {
            if (btn.api && btn.api.includes('/api/')) {
                allWorkingButtons.push(btn);
            }
        });
    });
    
    console.log(`- Tìm thấy ${allWorkingButtons.length} nút có liên kết API thực tế để ping kiểm thử.`);
    
    const BATCH_SIZE = 10;
    for (let i = 0; i < allWorkingButtons.length; i += BATCH_SIZE) {
        const batch = allWorkingButtons.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (btn) => {
            const check = await pingApiEndpoint(btn.api);
            btn.pingStatus = check.status;
            btn.pingMessage = check.message;
        }));
        console.log(`  > Đã kiểm tra xong ${Math.min(i + BATCH_SIZE, allWorkingButtons.length)} / ${allWorkingButtons.length} API...`);
    }
}

// Thực thi chính
async function run() {
    console.log('⚡ Bắt đầu quét chẩn đoán API, Placeholder và Tính năng nút bấm toàn hệ thống (Upgraded Tokenizer)...');

    const reactFiles = scanDirectory(REACT_DIR, ['.js', '.jsx', '.tsx']);
    reactFiles.forEach(analyzeReactFile);

    const cshtmlFiles = scanDirectory(CSHTML_DIR, ['.cshtml']);
    cshtmlFiles.forEach(analyzeCshtmlFile);

    // Gửi API request thực tế để test liên kết
    await pingAllButtons(resultsByPage);

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
            md += `| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |\n`;
            md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
            page.working.forEach(b => {
                const liveStatus = b.pingStatus ? `${b.pingStatus} - *${b.pingMessage}*` : 'N/A - *Nút giao diện/Điều hướng*';
                md += `| ${b.line} | \`${b.label}\` | \`${b.placeholder}\` | ${b.feature} | **\`${b.api}\`** | ${liveStatus} |\n`;
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
    console.log(`\n🎉 Đã nâng cấp thành công công cụ quét và tạo báo cáo mới!`);
    console.log(`- Nút hoạt động tốt: ${totalWorkingButtons}`);
    console.log(`- Nút chưa hoạt động (Dead): ${totalDeadButtons}`);
    console.log(`📝 Xem báo cáo tại: verify_buttons_advanced_report.md`);
}

run();
