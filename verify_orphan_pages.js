/**
 * SmartLMS Enterprise Unified UI System Navigation, Connection & Button Audit Tool
 * 
 * Mục đích: 
 * 1. Khảo sát toàn bộ các trang giao diện (React & CSHTML), xác định luồng chuyển trang "nhảy qua lại" giữa các trang.
 * 2. Phân tích từng trang để tìm các nút bấm:
 *    - Nút Chuyển hướng sang trang khác (Outgoing Navigation Buttons).
 *    - Nút Gọi API / Xử lý nghiệp vụ nội tại hoạt động tốt (Working API/Local Buttons).
 *    - Nút Chết / Chưa gán API / onclick rỗng (Dead/Unhandled Buttons).
 * 3. Trích xuất các nút từ trang khác chuyển tới trang hiện tại (Incoming Navigation Buttons).
 * 4. Phát hiện và cảnh báo các trang "Mồ côi" (Orphan Pages) không có bất kỳ nút nào dẫn tới.
 * 5. Ping trực tiếp VPS để kiểm thử tính sẵn sàng của các API liên kết.
 * 
 * Chạy: node verify_orphan_pages.js
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_DIR = __dirname;
const REACT_DIR = path.join(WORKSPACE_DIR, 'react-test-frontend', 'src');
const CSHTML_DIR = path.join(WORKSPACE_DIR, 'SmartLMS.Web', 'Views');

const PAGE_DESCRIPTIONS = {
    // React Pages
    'LandingPage.jsx': 'Trang giới thiệu chính của LMS, tiếp thị khóa học.',
    'LoginPage.jsx': 'Trang đăng nhập hệ thống đa vai trò.',
    'RegisterPage.jsx': 'Trang đăng ký tài khoản học viên mới.',
    'Dashboard.jsx': 'Bảng thống kê học tập & phân tích rủi ro thất nghiệp bằng AI.',
    'Courses.jsx': 'Danh mục thư viện khóa học công khai.',
    'CheckoutQR.jsx': 'Trang thanh toán học phí qua mã QR chuyển khoản.',
    'CourseDetails.jsx': 'Trang thông tin chi tiết khóa học, đề cương và giáo trình.',
    'MyLearning.jsx': 'Không gian học tập cá nhân lưu trữ các khóa học đang tham gia.',
    'ForumHome.jsx': 'Diễn đàn thảo luận và Q&A cộng đồng học viên.',
    'CommunityFriends.jsx': 'Trang quản lý bạn bè và kết nối học viên.',
    'CommunityNewPost.jsx': 'Trang đăng chủ đề/bài viết thảo luận mới.',
    'CommunityQuizBuilder.jsx': 'Trình tạo câu hỏi trắc nghiệm chia sẻ lên diễn đàn.',
    'PersonalWiki.jsx': 'Sổ tay ghi chép kiến thức cá nhân của học viên.',
    'BookingPage.jsx': 'Trang đăng ký lịch hẹn tư vấn với Gia sư AI/Giảng viên.',
    'StudyWorkspace.jsx': 'Không gian trình chiếu giáo trình bài học của học viên.',
    'CodeWorkspace.jsx': 'Không gian thực hành code C# tích hợp Monaco Editor.',
    'MistakeNotebook.jsx': 'Sổ tay lưu vết các lỗi biên dịch và gợi ý từ AI.',
    'Leaderboard.jsx': 'Bảng xếp hạng thi đua thành tích học viên.',
    'PublicProfile.jsx': 'Hồ sơ cá nhân công khai hiển thị thành tích/huy hiệu.',
    'CourseManager.jsx': 'Không gian quản lý khóa học của Giảng viên.',
    'MessageCenter.jsx': 'Trung tâm tin nhắn kết nối Học viên - Giảng viên.',
    'CreatorAnalytics.jsx': 'Trang phân tích doanh thu & hiệu suất giảng dạy.',
    'TutorDashboard.jsx': 'Bảng điều khiển của Gia sư duyệt lịch hẹn.',
    'TutorProfile.jsx': 'Trang hiển thị hồ sơ năng lực của Gia sư.',
    'TutorProfileEdit.jsx': 'Trang cập nhật hồ sơ cá nhân của Gia sư.',
    'TutorSchedule.jsx': 'Trang thiết lập khung giờ rảnh rỗi của Gia sư.',
    'AICareerReport.jsx': 'Báo cáo định hướng nghề nghiệp bằng AI dựa trên hiệu năng code C#.',
    'CertificateView.jsx': 'Trang cấp chứng chỉ hoàn thành khóa học tích hợp QR Code xác thực.',
    
    // CSHTML Pages
    'Curriculum.cshtml': 'Thiết lập khung chương trình học, thêm bớt bài giảng (Admin).',
    'BadgeStudio.cshtml': 'Hệ thống thiết kế huy hiệu thành tích điểm thưởng XP (Admin).',
    'ExamAssembler.cshtml': 'Hệ thống tự động biên soạn đề thi, trắc nghiệm (Admin).',
    'Members.cshtml': 'Quản lý thành viên lớp học, cohort cụ thể (Admin).',
    'Audit.cshtml': 'Lịch sử dòng tiền, doanh thu thanh toán (Admin).'
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

function getLiveUrl(route) {
    return `${VPS_BASE_URL}${route}`;
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
            if (!item.includes('node_modules') && !item.includes('bin') && !item.includes('obj') && !item.includes('.git')) {
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

// Số dòng của vị trí kí tự
function getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
}

// Dò tìm API gọi từ hàm
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
        const funcBody = fileContent.substring(foundIndex, Math.min(fileContent.length, foundIndex + 1500));
        const apiMatch = funcBody.match(/['"`](\/api\/[^'"`\s]+)['"`]/i) || 
                         funcBody.match(/['"`](\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)['"`]/i);
        if (apiMatch) return apiMatch[1];
        
        const axiosMatch = funcBody.match(/axios\.(?:post|get|put|delete)\(\s*['"`]([^'"`\s]+)['"`]/i);
        if (axiosMatch) return axiosMatch[1];

        const fetchMatch = funcBody.match(/fetch\(\s*['"`]([^'"`\s]+)['"`]/i);
        if (fetchMatch) return fetchMatch[1];
    }
    return null;
}

// Lấy nhãn nghiệp vụ của nút
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
    
    if (tag.includes('navigate') || tag.includes('history.push') || tag.includes('href=')) return 'Điều hướng người dùng sang trang liên kết chức năng';
    if (issue) return 'Tính năng giao diện (Chưa kết nối luồng xử lý)';
    return 'Thực thi sự kiện nghiệp vụ tương ứng của trang';
}

// Tokenizer thẻ JSX/HTML cân bằng ngoặc
function extractJsxTag(content, startIndex) {
    let index = startIndex;
    if (content[index] !== '<') return null;
    
    index++;
    let tagName = '';
    while (index < content.length && /[a-zA-Z0-9_.-]/.test(content[index])) {
        tagName += content[index];
        index++;
    }
    
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
            if (char === '{') braceDepth++;
            else if (char === '}') braceDepth--;
            else if (char === '(') parenDepth++;
            else if (char === ')') parenDepth--;
            else if (braceDepth === 0 && parenDepth === 0) {
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
    
    return { tagName, attrs, isSelfClosing, endIndex: index };
}

// So khớp route thông minh hỗ trợ các tham số động
function isRouteMatch(mappedRoute, navTarget) {
    let normMapped = mappedRoute.toLowerCase().trim().replace(/^\/|\/$/g, '');
    let normTarget = navTarget.toLowerCase().trim().replace(/^\/|\/$/g, '');

    if (normMapped === normTarget) return true;

    const wildcardMapped = normMapped.replace(/[0-9]+/g, '*').replace(/:[a-zA-Z0-9_-]+/g, '*');
    const wildcardTarget = normTarget
        .replace(/[0-9]+/g, '*')
        .replace(/\$\{[^}]*\}/g, '*')
        .replace(/\+[^+]+/g, '*')
        .replace(/['"`]/g, '');

    if (wildcardMapped === wildcardTarget) return true;
    
    if (wildcardMapped.includes('*')) {
        const prefix = wildcardMapped.split('*')[0];
        if (prefix && wildcardTarget.startsWith(prefix)) return true;
    }
    
    return false;
}

// Dò xem nút có thực hiện chuyển hướng không và trỏ tới đâu
function extractNavigationFromButton(attrs, fileContent, handlerName) {
    // 1. Dò inline navigate
    const inlineNavigate = attrs.match(/navigate\(\s*['"`]([^'"`\s]+)['"`]/i) ||
                           attrs.match(/navigate\(\s*([^)]+)\s*\)/i);
    if (inlineNavigate) return inlineNavigate[1];

    // 2. Dò inline Link to
    const inlineTo = attrs.match(/to\s*=\s*["']([^"']+)["']/i) || attrs.match(/to\s*=\s*\{\s*["']([^"']+)["']\s*\}/i);
    if (inlineTo) return inlineTo[1];

    // 3. Dò href
    const inlineHref = attrs.match(/href\s*=\s*["']([^"']*)["']/i);
    if (inlineHref && inlineHref[1] && inlineHref[1] !== '#' && !inlineHref[1].startsWith('javascript:void') && !inlineHref[1].startsWith('http')) {
        return inlineHref[1];
    }

    // 4. Dò asp-controller và asp-action
    const controllerMatch = attrs.match(/asp-controller\s*=\s*["']([^"']+)["']/i);
    const actionMatch = attrs.match(/asp-action\s*=\s*["']([^"']+)["']/i);
    if (controllerMatch && actionMatch) {
        const controller = controllerMatch[1];
        const action = actionMatch[1];
        return action.toLowerCase() === 'index' ? `/${controller}` : `/${controller}/${action}`;
    }

    // 5. Tìm trong thân hàm xử lý sự kiện
    if (handlerName) {
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
            if (m) { foundIndex = m.index; break; }
        }

        if (foundIndex !== -1) {
            const funcBody = fileContent.substring(foundIndex, Math.min(fileContent.length, foundIndex + 1500));
            const navMatch = funcBody.match(/navigate\(\s*['"`]([^'"`\s]+)['"`]/i) ||
                             funcBody.match(/navigate\(\s*([^)]+)\s*\)/i) ||
                             funcBody.match(/history\.push\(\s*['"`]([^'"`\s]+)['"`]/i) ||
                             funcBody.match(/location\.href\s*=\s*['"`]([^'"`\s]+)['"`]/i);
            if (navMatch) return navMatch[1];
        }
    }

    return null;
}

async function pingApiEndpoint(apiUrl) {
    if (!apiUrl || !apiUrl.includes('/api/')) {
        return { status: 'N/A', code: null, message: 'Nút giao diện/Điều hướng' };
    }
    
    const apiMatch = apiUrl.match(/(\/api\/[a-zA-Z0-9_\-\/\{\}]+)/);
    if (!apiMatch) return { status: 'N/A', code: null, message: 'Không thể phân tích' };
    
    let endpoint = apiMatch[1].replace(/\{[a-zA-Z0-9_-]+\}/g, '1');
    const fullUrl = `${VPS_BASE_URL}${endpoint}`;
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        let response;
        try {
            response = await fetch(fullUrl, { method: 'OPTIONS', signal: controller.signal });
        } catch {
            response = await fetch(fullUrl, { method: 'GET', signal: controller.signal });
        }
        clearTimeout(timeoutId);
        
        const code = response.status;
        if (code === 404) return { status: '🔴 Broken (404)', code, message: 'API Route không tồn tại trên VPS Backend' };
        if ([502, 503, 504].includes(code)) return { status: '🔴 Broken (Gateway)', code, message: `Lỗi Gateway VPS (${code})` };
        return { status: `🟢 Active (${code})`, code, message: 'API phản hồi hợp lệ' };
    } catch (err) {
        if (err.name === 'AbortError') return { status: '🟡 Timeout (2s)', code: null, message: 'Không có phản hồi từ VPS' };
        return { status: '🔴 Connection Failed', code: null, message: `Lỗi kết nối: ${err.message}` };
    }
}

// PHÂN TÍCH TOÀN BỘ TRANG VÀ NÚT BẤM CỦA NÓ
function auditPageButtons(filePath, relativePath, type, pageRoute) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);

    const data = {
        name: fileName,
        filePath: relativePath,
        type: type,
        route: pageRoute,
        description: PAGE_DESCRIPTIONS[fileName] || 'Phân hệ giao diện chức năng hệ thống.',
        outgoingNavs: [],  // Nút chuyển trang đi
        workingApis: [],   // Nút gọi API / local tốt
        deadButtons: []    // Nút chết
    };

    let index = 0;
    while ((index = content.indexOf('<', index)) !== -1) {
        const nextChar = content[index + 1];
        if (nextChar === '/' || nextChar === '!' || nextChar === '>') {
            index++;
            continue;
        }

        const tagInfo = extractJsxTag(content, index);
        if (!tagInfo) { index++; continue; }

        const { tagName, attrs, isSelfClosing, endIndex } = tagInfo;
        index = endIndex;

        const tagNameLower = tagName.toLowerCase();
        
        // 1. Kiểm tra tính tương tác của thẻ
        const hasOnClick = attrs.includes('onClick') || attrs.includes('onclick') || attrs.includes('asp-action');
        const isInteractive = [
            'button', 'actionicon', 'menu.item', 'tabs.tab', 'navlink', 'list.item'
        ].includes(tagNameLower) || 
        ['Button', 'ActionIcon', 'Menu.Item', 'Tabs.Tab', 'NavLink', 'Table.Tr', 'Card', 'Paper'].some(t => tagName.includes(t));

        const isStyledButton = attrs.includes('btn ') || attrs.includes('btn-') || attrs.includes('class="btn"') || attrs.includes("class='btn'") || attrs.includes('cursor-pointer');

        if (!isInteractive && !hasOnClick && !isStyledButton) continue;

        // Bỏ qua các thẻ trang trí/trống không click
        if (tagNameLower === 'a' && !hasOnClick && !attrs.includes('class')) continue;
        if (!['Button', 'button', 'ActionIcon', 'actionicon', 'Menu.Item', 'a'].includes(tagName) && !hasOnClick) continue;

        const line = getLineNumber(content, index - attrs.length - tagName.length - 2);

        // 2. Trích xuất nhãn/placeholder
        let label = '';
        if (!isSelfClosing) {
            const closingIndex = content.indexOf(`</${tagName}>`, index);
            if (closingIndex !== -1 && closingIndex - index < 250) {
                label = content.substring(index, closingIndex).replace(/<[^>]*>/g, '').substring(0, 40).trim();
            }
        }
        let placeholder = 'Không có';
        const titleMatch = attrs.match(/title\s*=\s*["']([^"']+)["']/i) || attrs.match(/title\s*=\s*\{\s*["']([^"']+)["']\s*\}/i);
        const placeholderMatch = attrs.match(/placeholder\s*=\s*["']([^"']+)["']/i);
        if (titleMatch) placeholder = titleMatch[1];
        else if (placeholderMatch) placeholder = placeholderMatch[1];

        if (!label) label = placeholder !== 'Không có' ? placeholder : `Nút ${tagName}`;
        label = label.replace(/\{[^}]*\}/g, '').trim() || `Nút ${tagName}`;

        // 3. Phân tích chức năng nút bấm
        let isWorking = true;
        let issue = '';
        let handlerName = null;

        if (hasOnClick) {
            const onClickMatch = attrs.match(/on[cC]lick\s*=\s*\{\s*(?:\(\s*\)\s*=>\s*)?([a-zA-Z0-9_]+)(?:\([^)]*\))?\s*\}/i) ||
                                 attrs.match(/on[cC]lick\s*=\s*\{\s*([a-zA-Z0-9_]+)\s*\}/i) ||
                                 attrs.match(/onclick\s*=\s*["']([^"'\s(]+)(?:\([^)]*\))?["']/i);
            if (onClickMatch) handlerName = onClickMatch[1];
        }

        const isSubmit = attrs.match(/type=["']submit["']/i);
        const isDisabled = attrs.includes('disabled') && !attrs.includes('disabled={false}');

        if (isDisabled) {
            isWorking = true;
        } else if (isSubmit) {
            isWorking = true;
        } else if (!hasOnClick) {
            isWorking = false;
            issue = 'Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)';
        } else {
            // Check empty handler body
            const onClickBodyMatch = attrs.match(/on[cC]lick\s*=\s*\{\s*(?:\(\s*\)\s*=>\s*)?\{([^}]*)\}\s*\}/i) || 
                                     attrs.match(/on[cC]lick\s*=\s*\{\s*([^}]+)\s*\}/i) ||
                                     attrs.match(/onclick\s*=\s*["']([^"']*)["']/i);
            if (onClickBodyMatch) {
                const handlerBody = onClickBodyMatch[1].trim();
                if (handlerBody === '' || handlerBody === ';' || handlerBody === '()' || handlerBody === 'undefined' || handlerBody === 'null' ||
                    /^(?:\(\s*\)\s*=>\s*)?\{\s*\}$/.test(handlerBody) ||
                    /^(?:\(\s*\)\s*=>\s*)?console\.(?:log|warn|error)\([^)]*\);?$/.test(handlerBody) ||
                    handlerBody.includes('alert(')) {
                    isWorking = false;
                    issue = 'onClick chỉ chứa lệnh log/alert rỗng (Chưa kết nối)';
                }
            }
        }

        // Phân loại nút bấm
        const navTarget = extractNavigationFromButton(attrs, content, handlerName);

        if (navTarget) {
            // Đây là nút chuyển hướng
            data.outgoingNavs.push({
                line,
                label,
                tag: `<${tagName} ${attrs.replace(/\s+/g, ' ').trim()}>`,
                targetRoute: navTarget,
                feature: resolveFeatureDescription(label, `<${tagName} ${attrs}>`, null, null)
            });
        } else if (isWorking) {
            // Nút xử lý API / Local tốt
            let apiCalled = 'Không gọi API (Nút giao diện)';
            if (handlerName) {
                const trackedApi = traceApiEndpoint(content, handlerName);
                if (trackedApi) apiCalled = trackedApi;
            } else if (isSubmit) {
                apiCalled = 'Gửi dữ liệu Form (POST/PUT)';
            }
            
            data.workingApis.push({
                line,
                label,
                tag: `<${tagName} ${attrs.replace(/\s+/g, ' ').trim()}>`,
                api: apiCalled,
                feature: resolveFeatureDescription(label, `<${tagName} ${attrs}>`, apiCalled, null)
            });
        } else {
            // Nút chết
            data.deadButtons.push({
                line,
                label,
                tag: `<${tagName} ${attrs.replace(/\s+/g, ' ').trim()}>`,
                issue,
                feature: resolveFeatureDescription(label, `<${tagName} ${attrs}>`, null, issue)
            });
        }
    }

    return data;
}

async function run() {
    console.log('⚡ Bắt đầu khởi chạy bộ phân tích liên kết & chẩn đoán nút bấm hợp nhất...');

    // 1. Quét tìm toàn bộ tệp nguồn
    const allSourceFiles = scanDirectory(WORKSPACE_DIR, ['.js', '.jsx', '.tsx', '.cshtml']);
    
    // Thu thập tất cả điều hướng
    let allDestinations = [];
    allSourceFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const relativePath = path.relative(WORKSPACE_DIR, file);
        const lines = content.split('\n');
        
        lines.forEach((lineText, idx) => {
            // Dò tìm navigate, Link, href
            const navRegex = /navigate\(\s*['"`]([^'"`\s]+)['"`]/g;
            let match;
            while ((match = navRegex.exec(lineText)) !== null) {
                allDestinations.push({ target: match[1], sourceFile: relativePath, line: idx + 1, code: lineText.trim() });
            }
            const linkRegex = /to\s*=\s*["']([^"']+)["']/g;
            while ((match = linkRegex.exec(lineText)) !== null) {
                allDestinations.push({ target: match[1], sourceFile: relativePath, line: idx + 1, code: lineText.trim() });
            }
            const hrefRegex = /href\s*=\s*["']([^"']*)["']/g;
            while ((match = hrefRegex.exec(lineText)) !== null) {
                const t = match[1];
                if (t && t !== '#' && !t.startsWith('javascript') && !t.startsWith('http')) {
                    allDestinations.push({ target: t, sourceFile: relativePath, line: idx + 1, code: lineText.trim() });
                }
            }
            const controllerMatch = lineText.match(/asp-controller\s*=\s*["']([^"']+)["']/i);
            const actionMatch = lineText.match(/asp-action\s*=\s*["']([^"']+)["']/i);
            if (controllerMatch && actionMatch) {
                const target = actionMatch[1].toLowerCase() === 'index' ? `/${controllerMatch[1]}` : `/${controllerMatch[1]}/${actionMatch[1]}`;
                allDestinations.push({ target, sourceFile: relativePath, line: idx + 1, code: lineText.trim() });
            }
        });
    });

    // 2. Thiết lập danh sách trang phân tích
    let pagesToCheck = [];

    // React
    const reactPages = scanDirectory(REACT_DIR, ['.js', '.jsx', '.tsx']);
    reactPages.forEach(file => {
        const fileName = path.basename(file);
        const relativePath = path.relative(WORKSPACE_DIR, file);
        if (relativePath.includes('pages' + path.sep)) {
            const compName = fileName.replace(/\.(jsx|js|tsx)$/, '');
            const route = REACT_COMPONENT_ROUTES[compName] || `/${compName.toLowerCase()}`;
            pagesToCheck.push({ file, relativePath, type: 'React', route });
        }
    });

    // CSHTML
    const cshtmlPages = scanDirectory(CSHTML_DIR, ['.cshtml']);
    cshtmlPages.forEach(file => {
        const fileName = path.basename(file);
        const relativePath = path.relative(WORKSPACE_DIR, file);
        if (!fileName.startsWith('_')) {
            const normalized = relativePath.replace(/\\/g, '/');
            const viewsIndex = normalized.indexOf('Views/');
            if (viewsIndex !== -1) {
                const parts = normalized.substring(viewsIndex + 6).replace(/\.cshtml$/, '').split('/');
                if (parts.length >= 2) {
                    const route = parts[1].toLowerCase() === 'index' ? `/${parts[0]}` : `/${parts[0]}/${parts[1]}`;
                    pagesToCheck.push({ file, relativePath, type: 'CSHTML', route });
                }
            }
        }
    });

    // 3. Tiến hành kiểm tra nút và thu thập incoming liên kết cho từng trang
    const auditedPages = [];
    for (const page of pagesToCheck) {
        console.log(`- Phân tích tệp: ${page.relativePath}...`);
        const pageAudit = auditPageButtons(page.file, page.relativePath, page.type, page.route);
        
        // Thu thập các liên kết chuyển TỚI trang này từ trang khác
        const incoming = allDestinations.filter(dest => isRouteMatch(page.route, dest.target));
        
        // Bỏ trùng lặp incoming
        const seen = new Set();
        pageAudit.incomingLinks = [];
        incoming.forEach(link => {
            const key = `${link.sourceFile}:${link.line}`;
            if (!seen.has(key)) {
                seen.add(key);
                pageAudit.incomingLinks.push(link);
            }
        });

        // Xác định trang mồ côi
        pageAudit.isOrphan = pageAudit.incomingLinks.length === 0 && page.route !== '/' && page.route !== '/login';

        auditedPages.push(pageAudit);
    }

    // 4. Ping API của các nút hoạt động để kiểm tra kết nối VPS thực tế
    console.log('\n🔗 Thực thi ping kiểm thử API liên kết trên VPS thực tế...');
    const allApisToPing = [];
    auditedPages.forEach(p => {
        p.workingApis.forEach(btn => {
            if (btn.api && btn.api.startsWith('/api/')) {
                allApisToPing.push(btn);
            }
        });
    });

    console.log(`- Tìm thấy ${allApisToPing.length} API cần ping.`);
    const BATCH_SIZE = 10;
    for (let i = 0; i < allApisToPing.length; i += BATCH_SIZE) {
        const batch = allApisToPing.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (btn) => {
            const check = await pingApiEndpoint(btn.api);
            btn.pingStatus = check.status;
            btn.pingMessage = check.message;
        }));
    }

    // 5. Ghi báo cáo mồ côi và nút bấm hợp nhất
    const reportPath = path.join(WORKSPACE_DIR, 'verify_orphan_pages_report.md');
    let md = `# Báo cáo Chẩn đoán Hệ thống: Luồng chuyển trang & Thiết lập Nút bấm (Unified UI Master Audit)\n\n`;
    md += `*Thời gian quét:* ${new Date().toLocaleString('vi-VN')}\n`;
    md += `*Tổng số tệp UI đã phân tích:* **${auditedPages.length}**\n`;
    md += `*Địa chỉ VPS đích:* **${VPS_BASE_URL}**\n\n`;

    md += `## 📊 BẢNG TỔNG HỢP TOÀN HỆ THỐNG (SYSTEM STATUS)\n\n`;
    let totalOrphans = auditedPages.filter(p => p.isOrphan).length;
    let totalDead = 0;
    let totalWorking = 0;
    let totalNavs = 0;

    auditedPages.forEach(p => {
        totalDead += p.deadButtons.length;
        totalWorking += p.workingApis.length;
        totalNavs += p.outgoingNavs.length;
    });

    md += `| Chỉ số kiểm thử hệ thống | Số lượng | Trạng thái chẩn đoán |\n`;
    md += `| :--- | :--- | :--- |\n`;
    md += `| 🟢 Nút hoạt động tốt (Gọi API / Local) | **${totalWorking}** | Đạt chuẩn kết nối và nghiệp vụ |\n`;
    md += `| 🔄 Nút Chuyển tiếp trang (Navigation) | **${totalNavs}** | Đã cấu hình chuyển hướng luồng đi |\n`;
    md += `| 🔴 Nút Chưa hoạt động (Dead Buttons) | **${totalDead}** | Cần gán API / onclick xử lý |\n`;
    md += `| ⚠️ Trang mồ côi (Orphan Pages - Bị cô lập) | **${totalOrphans}** | Chưa có nút bấm ở trang khác dẫn tới |\n\n`;

    md += `--- \n\n`;
    md += `## ⚠️ DANH SÁCH CÁC TRANG MỒ CÔI (ORPHAN PAGES - ${totalOrphans})\n\n`;
    md += `Các trang sau đang bị cô lập khỏi giao diện người dùng chính (không có nút bấm nào từ trang khác dẫn tới):\n\n`;
    
    md += `| Tên Trang | Công nghệ | URL Route | Mô tả tính năng | Khắc phục đề xuất |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;
    auditedPages.filter(p => p.isOrphan).forEach(p => {
        let suggest = '';
        if (p.type === 'React') {
            suggest = `Tích hợp \`navigate('${p.route}')\` hoặc Link từ Dashboard/Sidebar để chuyển hướng người dùng sang trang này.`;
        } else {
            suggest = `Tích hợp TagHelper \`asp-controller="${p.route.split('/')[1]}" asp-action="${p.route.split('/')[2] || 'Index'}"\` vào Sidebar Admin.`;
        }
        md += `| \`${p.name}\` | \`${p.type}\` | \`${p.route}\` | ${p.description} | ${suggest} |\n`;
    });
    md += `\n\n--- \n\n`;

    md += `## 🔍 CHI TIẾT SỰ KIỆN NÚT BẤM & LUỒNG DI CHUYỂN TỪNG TRANG (PAGE-BY-PAGE ANALYSIS)\n\n`;

    auditedPages.forEach(p => {
        const orphanStatus = p.isOrphan ? ` ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**` : '';
        md += `### 📄 Trang: [${p.name}](file:///${path.join(WORKSPACE_DIR, p.filePath).replace(/\\/g, '/')})${orphanStatus}\n`;
        md += `* **Đường dẫn tệp:** \`${p.filePath}\`\n`;
        md += `* **Đường dẫn Route:** \`${p.route}\` (Chạy thử VPS: [${getLiveUrl(pageRoute = p.route)}](${getLiveUrl(pageRoute = p.route)}))\n`;
        md += `* **Loại trang:** \`${p.type} Page\`\n`;
        md += `* **Tính năng chính:** *${p.description}*\n\n`;

        // 1. Nút chuyển trang (Outgoing Navigation)
        md += `#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - ${p.outgoingNavs.length})\n`;
        if (p.outgoingNavs.length === 0) {
            md += `*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*\n\n`;
        } else {
            md += `| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |\n`;
            md += `| :--- | :--- | :--- | :--- | :--- |\n`;
            p.outgoingNavs.forEach(btn => {
                md += `| ${btn.line} | \`${btn.label}\` | \`${btn.tag}\` | **\`${btn.targetRoute}\`** | ${btn.feature} |\n`;
            });
            md += `\n`;
        }

        // 2. Nút từ trang khác nhảy vào (Incoming Navigation)
        md += `#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - ${p.incomingLinks.length})\n`;
        if (p.incomingLinks.length === 0) {
            if (p.route === '/' || p.route === '/login') {
                md += `*Trang mặc định mở đầu của trình duyệt/luồng chính.*\n\n`;
            } else {
                md += `⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>\n\n`;
            }
        } else {
            md += `| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |\n`;
            md += `| :--- | :--- | :--- | :--- |\n`;
            p.incomingLinks.forEach(inc => {
                md += `| \`${inc.sourceFile}\` | ${inc.line} | \`${inc.type || 'Link'}\` | \`${inc.code}\` |\n`;
            });
            md += `\n`;
        }

        // 3. Nút hoạt động gọi API/Event nội tại (Working Local/API)
        md += `#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - ${p.workingApis.length})\n`;
        if (p.workingApis.length === 0) {
            md += `*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*\n\n`;
        } else {
            md += `| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |\n`;
            md += `| :--- | :--- | :--- | :--- | :--- |\n`;
            p.workingApis.forEach(btn => {
                const live = btn.pingStatus ? `${btn.pingStatus} - *${btn.pingMessage}*` : 'N/A - *Sự kiện cục bộ*';
                md += `| ${btn.line} | \`${btn.label}\` | \`${btn.api}\` | ${btn.feature} | ${live} |\n`;
            });
            md += `\n`;
        }

        // 4. Nút chết/Chưa liên kết
        md += `#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - ${p.deadButtons.length})\n`;
        if (p.deadButtons.length === 0) {
            md += `*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*\n\n`;
        } else {
            md += `| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |\n`;
            md += `| :--- | :--- | :--- | :--- | :--- |\n`;
            p.deadButtons.forEach(btn => {
                md += `| ${btn.line} | \`${btn.label}\` | \`${btn.tag}\` | <span style="color:red">${btn.issue}</span> | ${btn.feature} |\n`;
            });
            md += `\n`;
        }

        md += `--- \n\n`;
    });

    fs.writeFileSync(reportPath, md, 'utf8');
    
    console.log(`\n🎉 Hợp nhất thành công bộ quét và xuất báo cáo tổng thể!`);
    console.log(`- Tổng số nút hoạt động tốt: ${totalWorking}`);
    console.log(`- Tổng số nút chuyển trang: ${totalNavs}`);
    console.log(`- Tổng số nút chết: ${totalDead}`);
    console.log(`- Tổng số trang mồ côi: ${totalOrphans}`);
    console.log(`📝 Xem báo cáo hợp nhất cực chi tiết tại: verify_orphan_pages_report.md`);
}

run();
