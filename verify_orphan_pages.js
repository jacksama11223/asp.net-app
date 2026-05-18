/**
 * SmartLMS Enterprise UI Orphan Pages Audit Tool
 * 
 * Mục đích: Quét tĩnh toàn bộ React & CSHTML để tìm ra các trang "mồ côi" (Orphan Pages) 
 * - tức là các trang chưa từng được bất kỳ nút bấm, liên kết, navigate, hoặc TagHelper nào
 * ở các trang khác trỏ tới hay chuyển hướng qua.
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
    'Audit.cshtml': 'Lịch sử dòng tiền, doanh thu thanh toán (Admin).',
    'ExportReport': 'Xuất báo cáo rủi ro học tập của học viên dạng CSV.',
    'GenerateLink': 'Sinh link tiếp thị liên kết Affiliate và QR Code.',
    'SaveBadge': 'Lưu huy hiệu mới thiết kế vào Database.'
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

// Hàm so khớp thông minh giữa Router đích và Router cấu hình
function isRouteMatch(mappedRoute, navTarget) {
    let normMapped = mappedRoute.toLowerCase().trim().replace(/^\/|\/$/g, '');
    let normTarget = navTarget.toLowerCase().trim().replace(/^\/|\/$/g, '');

    if (normMapped === normTarget) return true;

    // Chuẩn hóa wildcard / dynamic parameter
    const wildcardMapped = normMapped.replace(/[0-9]+/g, '*').replace(/:[a-zA-Z0-9_-]+/g, '*');
    const wildcardTarget = normTarget
        .replace(/[0-9]+/g, '*')
        .replace(/\$\{[^}]*\}/g, '*')
        .replace(/\+[^+]+/g, '*')
        .replace(/['"`]/g, '');

    if (wildcardMapped === wildcardTarget) return true;
    
    if (wildcardMapped.includes('*')) {
        const prefix = wildcardMapped.split('*')[0];
        if (prefix && wildcardTarget.startsWith(prefix)) {
            return true;
        }
    }
    
    return false;
}

// Trích xuất các liên kết điều hướng từ nội dung file
function extractNavigationDestinations(filePath, content) {
    const destinations = [];
    const relativePath = path.relative(WORKSPACE_DIR, filePath);
    const lines = content.split('\n');

    lines.forEach((lineText, lineIdx) => {
        const lineNum = lineIdx + 1;

        // 1. Scan for navigate('/...')
        const navRegex = /navigate\(\s*['"`]([^'"`\s]+)['"`]/g;
        let match;
        while ((match = navRegex.exec(lineText)) !== null) {
            destinations.push({
                target: match[1],
                type: 'React Navigate',
                sourceFile: relativePath,
                line: lineNum,
                code: lineText.trim()
            });
        }

        // 2. Scan for history.push('/...')
        const histRegex = /history\.push\(\s*['"`]([^'"`\s]+)['"`]/g;
        while ((match = histRegex.exec(lineText)) !== null) {
            destinations.push({
                target: match[1],
                type: 'React History',
                sourceFile: relativePath,
                line: lineNum,
                code: lineText.trim()
            });
        }

        // 3. Scan for to="..." (Link/NavLink)
        const linkToRegex = /to\s*=\s*["']([^"']+)["']/g;
        while ((match = linkToRegex.exec(lineText)) !== null) {
            destinations.push({
                target: match[1],
                type: 'JSX Link',
                sourceFile: relativePath,
                line: lineNum,
                code: lineText.trim()
            });
        }

        // 4. Scan for href="..."
        const hrefRegex = /href\s*=\s*["']([^"']*)["']/g;
        while ((match = hrefRegex.exec(lineText)) !== null) {
            const target = match[1];
            if (target && target !== '#' && !target.startsWith('javascript:void') && !target.startsWith('http')) {
                destinations.push({
                    target,
                    type: 'HTML Link',
                    sourceFile: relativePath,
                    line: lineNum,
                    code: lineText.trim()
                });
            }
        }

        // 5. Scan for asp-controller & asp-action
        const controllerMatch = lineText.match(/asp-controller\s*=\s*["']([^"']+)["']/i);
        const actionMatch = lineText.match(/asp-action\s*=\s*["']([^"']+)["']/i);
        if (controllerMatch && actionMatch) {
            const controller = controllerMatch[1];
            const action = actionMatch[1];
            const target = action.toLowerCase() === 'index' ? `/${controller}` : `/${controller}/${action}`;
            destinations.push({
                target,
                type: 'MVC TagHelper',
                sourceFile: relativePath,
                line: lineNum,
                code: lineText.trim()
            });
        }
    });

    return destinations;
}

function run() {
    console.log('⚡ Bắt đầu quét chẩn đoán trang "mồ côi" (Orphan Pages) toàn hệ thống...');

    const allSourceFiles = scanDirectory(WORKSPACE_DIR, ['.js', '.jsx', '.tsx', '.cshtml']);
    console.log(`- Tìm thấy tổng cộng ${allSourceFiles.length} tệp tin mã nguồn để phân tích liên kết.`);

    // Thu thập tất cả các điểm chuyển hướng trong toàn dự án
    let allDestinations = [];
    allSourceFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const fileDestinations = extractNavigationDestinations(file, content);
        allDestinations = allDestinations.concat(fileDestinations);
    });
    console.log(`- Trích xuất được ${allDestinations.length} lệnh điều hướng/nút chuyển trang trong hệ thống.`);

    // Thiết lập danh sách các trang cần kiểm tra
    let pagesToCheck = [];

    // 1. Thêm các trang React
    const reactPages = scanDirectory(REACT_DIR, ['.js', '.jsx', '.tsx']);
    reactPages.forEach(file => {
        const fileName = path.basename(file);
        const relativePath = path.relative(WORKSPACE_DIR, file);
        if (relativePath.includes('pages' + path.sep)) {
            const compName = fileName.replace(/\.(jsx|js|tsx)$/, '');
            const route = REACT_COMPONENT_ROUTES[compName] || `/${compName.toLowerCase()}`;
            pagesToCheck.push({
                name: fileName,
                filePath: relativePath,
                type: 'React Page',
                route: route,
                description: PAGE_DESCRIPTIONS[fileName] || 'Trang giao diện học viên/giảng viên.'
            });
        }
    });

    // 2. Thêm các trang CSHTML
    const cshtmlPages = scanDirectory(CSHTML_DIR, ['.cshtml']);
    cshtmlPages.forEach(file => {
        const fileName = path.basename(file);
        const relativePath = path.relative(WORKSPACE_DIR, file);
        
        // Tránh lấy file layout _Layout hoặc file component con _ViewStart, v.v.
        if (!fileName.startsWith('_')) {
            const normalized = relativePath.replace(/\\/g, '/');
            const viewsIndex = normalized.indexOf('Views/');
            if (viewsIndex !== -1) {
                const pathParts = normalized.substring(viewsIndex + 6).replace(/\.cshtml$/, '').split('/');
                if (pathParts.length >= 2) {
                    const controller = pathParts[0];
                    const action = pathParts[1];
                    const route = action.toLowerCase() === 'index' ? `/${controller}` : `/${controller}/${action}`;
                    
                    pagesToCheck.push({
                        name: fileName,
                        filePath: relativePath,
                        type: 'ASP.NET MVC View',
                        route: route,
                        description: PAGE_DESCRIPTIONS[fileName] || `Trang quản lý nghiệp vụ ${controller} - hành động ${action}.`
                    });
                }
            }
        }
    });

    // Phân tích xem mỗi trang có bao nhiêu liên kết trỏ tới
    let reachablePages = [];
    let orphanPages = [];

    pagesToCheck.forEach(page => {
        // Tìm tất cả các lệnh chuyển hướng khớp với route của trang này
        const incomingLinks = allDestinations.filter(dest => isRouteMatch(page.route, dest.target));
        
        // Lọc bỏ trùng lặp liên kết từ cùng một dòng trong cùng một file để báo cáo sạch đẹp
        const uniqueIncoming = [];
        const seen = new Set();
        incomingLinks.forEach(link => {
            const key = `${link.sourceFile}:${link.line}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueIncoming.push(link);
            }
        });

        if (uniqueIncoming.length > 0) {
            reachablePages.push({
                ...page,
                incoming: uniqueIncoming
            });
        } else {
            // Trường hợp đặc biệt: Trang LandingPage (/) là trang mặc định, không cần nút bấm chuyển sang
            if (page.route === '/' || page.route === '/login') {
                reachablePages.push({
                    ...page,
                    incoming: [{ target: page.route, type: 'System Default Route', sourceFile: 'System', line: 0, code: 'Đường dẫn mặc định của trình duyệt' }]
                });
            } else {
                orphanPages.push(page);
            }
        }
    });

    // Ghi báo cáo ra file verify_orphan_pages_report.md
    const reportPath = path.join(WORKSPACE_DIR, 'verify_orphan_pages_report.md');
    let md = `# Báo cáo Chẩn đoán Trang "Mồ Côi" (UI Orphan & Unreachable Pages Audit)\n\n`;
    md += `*Thời gian quét:* ${new Date().toLocaleString('vi-VN')}\n`;
    md += `*Mục đích:* Phát hiện các trang giao diện đã được code nhưng **chưa hề có bất kỳ nút bấm hoặc liên kết nào dẫn tới** (khiến người dùng không thể truy cập từ giao diện chính).\n\n`;

    md += `--- \n\n`;
    md += `## 📊 BẢNG TỔNG HỢP TOÀN HỆ THỐNG (SYSTEM STATUS)\n\n`;
    md += `| Chỉ số kiểm thử | Số lượng | Trạng thái |\n`;
    md += `| :--- | :--- | :--- |\n`;
    md += `| 🟢 Trang có thể truy cập (Reachable Pages) | **${reachablePages.length}** | Hoạt động tốt trong luồng người dùng |\n`;
    md += `| 🔴 Trang "mồ côi" / Chưa có liên kết (Orphan Pages) | **${orphanPages.length}** | Cần bổ sung nút bấm/link chuyển hướng |\n`;
    md += `| 📊 Tổng số trang giao diện đã quét | **${pagesToCheck.length}** | Toàn bộ tệp UI phân hệ |\n\n`;

    md += `--- \n\n`;
    md += `## 🔴 DANH SÁCH CÁC TRANG "MỒ CÔI" CẦN BỔ SUNG LIÊN KẾT (ORPHAN PAGES - ${orphanPages.length})\n\n`;
    
    if (orphanPages.length === 0) {
        md += `*Tuyệt vời! Tất cả các trang đều đã có ít nhất một nút bấm hoặc liên kết dẫn tới.*\n\n`;
    } else {
        md += `Dưới đây là các trang đã được lập trình giao diện nhưng **đang bị cô lập** khỏi luồng đi của người dùng:\n\n`;
        md += `| Tên trang | Công nghệ | Đường dẫn thiết lập | Tính năng trang | Đề xuất hành động bổ sung |\n`;
        md += `| :--- | :--- | :--- | :--- | :--- |\n`;
        
        orphanPages.forEach(p => {
            let suggest = '';
            if (p.type === 'React Page') {
                suggest = `Thêm nút bấm điều hướng \`navigate('${p.route}')\` từ trang Dashboard, Sidebar, hoặc trang liên quan.`;
            } else {
                suggest = `Tích hợp thẻ TagHelper \`asp-controller="${p.route.split('/')[1]}" asp-action="${p.route.split('/')[2] || 'Index'}"\` tại menu Sidebar Admin hoặc trang quản trị chung.`;
            }
            md += `| \`${p.name}\` | \`${p.type}\` | \`${p.route}\` | ${p.description} | ${suggest} |\n`;
        });
        md += `\n`;
    }

    md += `--- \n\n`;
    md += `## 🟢 DANH SÁCH CÁC TRANG ĐÃ LIÊN KẾT THÀNH CÔNG (REACHABLE PAGES - ${reachablePages.length})\n\n`;
    
    md += `Các trang này đã được kết nối hoàn hảo với các nút bấm/liên kết từ các trang khác:\n\n`;
    
    reachablePages.forEach(p => {
        md += `### 📄 Trang: [${p.name}](file:///${path.join(WORKSPACE_DIR, p.filePath).replace(/\\/g, '/')})\n`;
        md += `* **Loại trang:** \`${p.type}\`\n`;
        md += `* **Đường dẫn Route:** \`${p.route}\`\n`;
        md += `* **Mô tả:** *${p.description}*\n`;
        md += `* **Các nguồn nút bấm dẫn tới trang này (${p.incoming.length}):**\n\n`;
        
        md += `| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |\n`;
        md += `| :--- | :--- | :--- | :--- |\n`;
        p.incoming.forEach(inc => {
            md += `| \`${inc.sourceFile}\` | ${inc.line} | \`${inc.type}\` | \`${inc.code}\` |\n`;
        });
        md += `\n---\n\n`;
    });

    fs.writeFileSync(reportPath, md, 'utf8');
    
    console.log(`\n🎉 Đã hoàn thành quét liên kết trang!`);
    console.log(`- Trang reachable: ${reachablePages.length}`);
    console.log(`- Trang mồ côi (Orphan): ${orphanPages.length}`);
    console.log(`📝 Xem báo cáo mồ côi chi tiết tại: verify_orphan_pages_report.md`);
}

run();
