const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const mvcLayoutPath = path.join(projectRoot, 'SmartLMS.Web', 'Views', 'Shared', '_Layout.cshtml');
const reactIndexPath = path.join(projectRoot, 'react-test-frontend', 'index.html');
const reportPath = path.join(projectRoot, 'integration_plan.md');

function analyzeProject() {
    let report = `# Kế Hoạch Tích Hợp Toàn Diện (SEO, Tracking, Media, Security)\n\n`;
    report += `## 1. Mục Tiêu Tích Hợp\n`;
    report += `- **jQuery**: Thư viện DOM manipulation (cho các tính năng cũ hoặc plugin legacy trên MVC).\n`;
    report += `- **Open Graph (OG Tags)**: Tối ưu hóa SEO khi chia sẻ link lên mạng xã hội (Facebook, Zalo, LinkedIn).\n`;
    report += `- **Google Analytics (GA4) & Google Tag Manager (GTM)**: Theo dõi hành vi người dùng, lượt truy cập, sự kiện click.\n`;
    report += `- **reCAPTCHA (v2/v3)**: Chống bot/spam ở các form đăng nhập, đăng ký, quên mật khẩu.\n`;
    report += `- **Video.js**: Trình phát video HTML5 tùy biến cao cho các khóa học/bài giảng.\n\n`;

    report += `## 2. Phân Tích Kiến Trúc Hiện Tại\n`;
    
    // Check MVC Layout
    if (fs.existsSync(mvcLayoutPath)) {
        report += `### A. Phân hệ Quản trị / Identity (ASP.NET Core MVC)\n`;
        report += `- **File gốc**: \`SmartLMS.Web/Views/Shared/_Layout.cshtml\`\n`;
        report += `- **Chiến lược tích hợp**:\n`;
        report += `  - **GTM/GA**: Đặt Script GTM ở \`<head>\` và \`noscript\` ở ngay sau \`<body>\`.\n`;
        report += `  - **Open Graph**: Sử dụng ViewBags (VD: \`@ViewBag.OgTitle\`, \`@ViewBag.OgImage\`) để render thẻ meta động theo từng trang (CourseDetail, Profile).\n`;
        report += `  - **jQuery**: Tải qua CDN (thường đã có sẵn trong ASP.NET MVC template, cần check phiên bản).\n`;
        report += `  - **reCAPTCHA**: Thêm script vào trang Login/Register (\`SmartLMS.Web/Areas/Identity/...\`).\n`;
    }

    // Check React Index
    if (fs.existsSync(reactIndexPath)) {
        report += `\n### B. Phân hệ Front-end (React SPA)\n`;
        report += `- **File gốc**: \`react-test-frontend/index.html\`\n`;
        report += `- **Chiến lược tích hợp**:\n`;
        report += `  - **GTM/GA**: Đặt Script trực tiếp vào \`index.html\`. Dùng thư viện như \`react-gtm-module\` để push sự kiện khi chuyển trang (vì là SPA).\n`;
        report += `  - **Open Graph**: Dùng thư viện \`react-helmet-async\` để cập nhật meta tags tự động khi đổi route.\n`;
        report += `  - **Video.js**: Cài đặt package \`video.js\` qua npm, tạo component \`VideoPlayer.jsx\` tái sử dụng cho trang \`StudyWorkspace.jsx\`.\n`;
        report += `  - **reCAPTCHA**: Dùng \`react-google-recaptcha\` ở component \`LoginPage.jsx\`, \`RegisterPage.jsx\`.\n`;
    }

    report += `\n## 3. Lộ Trình Triển Khai (Roadmap)\n\n`;
    
    report += `### Giai đoạn 1: Thiết lập Core Tracking & SEO (Toàn hệ thống)\n`;
    report += `1. Tạo tài khoản GTM & GA4, lấy các mã ID (GTM-XXXX, G-YYYY).\n`;
    report += `2. Cập nhật \`_Layout.cshtml\` (MVC) và \`index.html\` (React) để nhúng mã GTM/GA4 cơ bản.\n`;
    report += `3. Định nghĩa cấu trúc thẻ Open Graph động. Thêm thư viện \`react-helmet-async\` vào frontend.\n\n`;

    report += `### Giai đoạn 2: Trải nghiệm Media & Thư viện bổ trợ\n`;
    report += `1. Cài đặt \`video.js\` trong thư mục \`react-test-frontend\`.\n`;
    report += `2. Xây dựng component wrapper cho Video.js, tích hợp tính năng tự động lưu tiến trình video (kết hợp với Zustand store hiện có).\n`;
    report += `3. Kiểm tra và đảm bảo jQuery (nếu cần trên MVC) không xung đột với các scripts khác.\n\n`;

    report += `### Giai đoạn 3: Bảo mật với reCAPTCHA\n`;
    report += `1. Đăng ký Google reCAPTCHA v3 (ẩn) hoặc v2 (checkbox).\n`;
    report += `2. Tích hợp reCAPTCHA vào các Form Login/Register (React).\n`;
    report += `3. Xác thực reCAPTCHA token tại Backend (AuthApiController) trước khi xử lý đăng nhập/đăng ký.\n\n`;

    report += `## 4. Các Tệp Sẽ Bị Ảnh Hưởng\n`;
    report += `- \`SmartLMS.Web/Views/Shared/_Layout.cshtml\`\n`;
    report += `- \`react-test-frontend/index.html\`\n`;
    report += `- \`react-test-frontend/package.json\` (Thêm dependencies)\n`;
    report += `- \`react-test-frontend/src/App.jsx\` (Thêm HelmetProvider)\n`;
    report += `- \`react-test-frontend/src/pages/StudyWorkspace.jsx\` (Tích hợp Video.js)\n`;
    report += `- \`react-test-frontend/src/pages/LoginPage.jsx\` (Tích hợp reCAPTCHA)\n`;
    report += `- \`SmartLMS.Web/Controllers/AuthApiController.cs\` (Backend xác thực reCAPTCHA)\n`;

    fs.writeFileSync(reportPath, report);
    console.log(`✅ Đã tạo file kế hoạch tại: ${reportPath}`);
}

analyzeProject();
