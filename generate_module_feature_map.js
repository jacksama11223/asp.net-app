const fs = require('fs');
const path = require('path');

console.log("🔍 KHỞI CHẠY BỘ QUÉT TỰ ĐỘNG PHÂN TÍCH MODULE VÀ TÍNH NĂNG (MODULE FEATURE SCANNER)");

const PAGES_DIR = path.join(__dirname, 'react-test-frontend', 'src', 'pages');
const COMPONENTS_DIR = path.join(__dirname, 'react-test-frontend', 'src', 'components');
const OUTPUT_FILE = path.join(__dirname, 'module_feature_mapping_report.md');

// Bản đồ mô tả chi tiết các phân hệ/trang React của SmartLMS.AI
const featureDescriptions = {
    "AICareerReport.jsx": "Báo cáo phân tích định hướng nghề nghiệp bằng AI, so sánh bộ kỹ năng hiện tại (Skill Gap) với thị trường tuyển dụng thực tế sử dụng biểu đồ Recharts và gợi ý các bài thực hành Roslyn Sandbox phù hợp.",
    "BookingPage.jsx": "Phân hệ đặt lịch học gia sư (Tutor Booking Grid), chọn giảng viên và đặt khung giờ rảnh theo thời gian thực.",
    "CertificateView.jsx": "Giao diện xác minh Chứng chỉ Số hóa Premium, hiển thị tích xanh kiểm định bảo mật, chữ ký điện tử mã băm (Cryptographic Hash) và chức năng tải PDF bản cứng, chia sẻ LinkedIn.",
    "CheckoutQR.jsx": "Phân hệ thanh toán học phí tự động thông qua quét mã QR MoMo/VietQR kèm theo bộ đếm ngược thời gian thanh toán (Countdown Timer) và xác nhận hóa đơn trực tiếp.",
    "CodeWorkspace.jsx": "Học tập lập trình thực tế (Roslyn Coding Sandbox IDE) với trình soạn thảo code đa tính năng, bảng console hiển thị log lỗi chi tiết và kiểm thử Test Cases thời gian thực.",
    "Community.jsx": "Phân hệ kết nối diễn đàn cộng đồng, thảo luận học tập, tạo bài viết mới và chia sẻ tài liệu.",
    "CommunityFriends.jsx": "Hệ thống quản lý bạn bè trực tuyến, tìm kiếm bạn học, hiển thị trạng thái hoạt động (Online/Offline) và kết nối bạn bè.",
    "CommunityNewPost.jsx": "Trình soạn thảo bài đăng mới trong Cộng đồng học viên, cho phép định dạng tiêu đề, danh mục và nội dung phong phú.",
    "CommunityQuizBuilder.jsx": "Công cụ sinh đề thi trắc nghiệm thử thách bằng AI (AI Mock Quiz Generator), tự động cấu hình bộ câu hỏi tương tác ngẫu nhiên.",
    "CourseDetails.jsx": "Trang xem chi tiết khóa học, lộ trình bài học (Curriculum Section), thông tin giảng viên và các yêu cầu đầu ra của khóa học.",
    "CourseManager.jsx": "Bảng quản trị khóa học dành cho giảng viên (Creator Studio), tích hợp cấu hình các bài tập Compiler Sandbox và Test Cases đầu vào/đầu ra.",
    "Courses.jsx": "Kho khóa học mở (Marketplace), hỗ trợ tìm kiếm nâng cao, bộ lọc danh mục và hiển thị thẻ khóa học sinh động.",
    "CreatorAnalytics.jsx": "Phân hệ phân tích thu nhập và thống kê số lượng học viên dành cho giảng viên sử dụng biểu đồ Area Chart của Recharts.",
    "Dashboard.jsx": "Bảng điều khiển trung tâm của học viên (Student Portal), hiển thị tiến độ học tập, chuỗi ngày học liên tục (Streak Day Tracker) và các gợi ý lộ trình bằng AI.",
    "ForumHome.jsx": "Giao diện trang chủ thảo luận học thuật, chia nhóm chủ đề (Kỹ thuật C#, MVC, AI) và hiển thị các bài đăng thịnh hành.",
    "LandingPage.jsx": "Trang giới thiệu chính thức của SmartLMS.AI, thiết kế chuẩn SaaS hiện đại với hiệu ứng Glassmorphism sang trọng và lời kêu gọi hành động (CTA) thu hút.",
    "Leaderboard.jsx": "Bảng xếp hạng thi đua học tập toàn khóa (Gamification Leaderboard), vinh danh các học viên có điểm số tích lũy cao nhất kèm huy hiệu (Badges) độc quyền.",
    "LoginPage.jsx": "Giao diện đăng nhập chuẩn Enterprise, kết nối đồng thời hệ thống Token JWT cho Client và ký nhận Session Cookie MVC để tránh nhảy trang Login.",
    "MessageCenter.jsx": "Trung tâm tin nhắn thời gian thực của giảng viên và học viên, giúp trao đổi bài học trực tiếp.",
    "MistakeNotebook.jsx": "Sổ tay ghi nhận lỗi sai thông minh (Mistake Notebook AI), tự động phân loại các lỗi biên dịch Roslyn Sandbox và đề xuất bài tập khắc phục bằng AI.",
    "MyLearning.jsx": "Kho khóa học đã sở hữu của tôi (My Courses Grid), hiển thị tiến độ % hoàn thành của từng khóa học trực quan.",
    "PersonalWiki.jsx": "Thư viện tài liệu học tập cá nhân (Personal Wiki Database), cho phép ghi chú nhanh và lưu trữ kiến thức dạng thẻ.",
    "PublicProfile.jsx": "Trang cá nhân công khai của người dùng, hiển thị danh hiệu, điểm tích lũy, các chứng chỉ đã đạt được và tiến trình học tập.",
    "RegisterPage.jsx": "Trang đăng ký tài khoản mới tích hợp kiểm tra độ mạnh của mật khẩu và kiểm soát trùng lặp tên đăng nhập.",
    "StudyWorkspace.jsx": "Không gian học tập chuyên sâu (Study Workspace), tích hợp xem Video bài học, trao đổi trực tiếp, ghi chép nhanh và thực hành Roslyn Sandbox ngay trên một màn hình.",
    "TutorDashboard.jsx": "Bảng điều khiển quản lý lịch giảng dạy của Gia sư (Tutor Center), thống kê số giờ dạy học và thu nhập thực nhận.",
    "TutorProfile.jsx": "Trang thông tin chi tiết và đánh giá năng lực của Gia sư, hiển thị các nhận xét (Reviews) từ học viên.",
    "TutorProfileEdit.jsx": "Giao diện cập nhật hồ sơ cá nhân, lĩnh vực chuyên môn và giới thiệu bản thân của Gia sư.",
    "TutorSchedule.jsx": "Trình quản lý lịch biểu giảng dạy của Gia sư (Mantine Calendar Integration), cho phép cấu hình linh hoạt các khung giờ rảnh theo từng thứ trong tuần.",
    "Layout.jsx": "Khung giao diện chính (App Shell / Master Layout), định hình thanh điều hướng Sidebar và thanh công cụ Header.",
    "Sidebar.jsx": "Thanh điều hướng thông minh bên trái (Navigation Pane), tự động chuyển đổi Menu theo vai trò Học viên / Giảng viên.",
    "Header.jsx": "Thanh công cụ phía trên đầu trang, tích hợp thông báo thời gian thực và quản lý tài khoản cá nhân."
};

function scanFiles() {
    let report = `# 🛡️ BẢN ĐỒ PHÂN TÍCH TOÀN DIỆN: MODULE & TÍNH NĂNG SMARTLMS.AI

Tài liệu này được sinh ra tự động từ kịch bản quét mã nguồn tĩnh (\`generate_module_feature_map.js\`) của Antigravity. Báo cáo liệt kê chi tiết các **Thư viện/Module cốt lõi** được import vào hệ thống React Frontend và các **Tính năng Premium** được xây dựng nên từ chúng.

---

## 🏗️ 1. THƯ VIỆN CỐT LÕI & VAI TRÒ HẠ TẦNG (CORE MODULE SYSTEM)

Dưới đây là các thư viện nền tảng được import xuyên suốt toàn bộ dự án để xây dựng giao diện và xử lý logic:

| Thư viện / Module | Kiểu thư viện | Vai trò chính trong hệ thống | Phân hệ tiêu biểu sử dụng |
| :--- | :--- | :--- | :--- |
| **\`@mantine/core\`** | UI Component Library | Cung cấp hệ thống UI Grid, Card, Modal, Inputs, Buttons, Avatars đạt chuẩn Enterprise SaaS, tối ưu hóa CSS Variables. | Tất cả 29 trang và Components |
| **\`react-icons/lu\`** | Icon Pack (Lucide) | Toàn bộ hệ thống biểu tượng SVG hiện đại, tinh gọn (ví dụ: \`LuCircleCheck\`, \`LuTrash\`, \`LuZap\`, \`LuSparkles\`). | Sidebar, Certificate, Tutor Schedule |
| **\`recharts\`** | Data Visualization | Biểu đồ hóa dữ liệu học tập nâng cao (Area Chart, Radar Chart, Bar Chart) trực quan sinh động. | Dashboard, AI Career Report, Analytics |
| **\`axios\`** | HTTP Client | Xử lý các yêu cầu gọi API đồng bộ, truyền JWT Token trong header \`Authorization\` và tương tác CSDL. | LoginPage, CourseManager, StudyWorkspace |
| **\`sonner\`** | Notification Toast | Hiển thị các thông báo Toast nổi bật góc màn hình cực kỳ mượt mà, mướt mát. | LoginPage, CommunityQuizBuilder, TutorSchedule |
| **\`react-router-dom\`** | Client Routing | Điều hướng ứng dụng trang đơn (SPA) không tải lại trang, bảo vệ các tuyến đường bằng \`ProtectedRoute\`. | App.jsx, Sidebar, Dashboard |

---

## 📊 2. THỐNG KÊ CHI TIẾT TỪNG TRANG & CÁC MODULE THIẾT LẬP (FEATURE MAP)

Dưới đây là danh sách phân tích chi tiết toàn bộ các trang giao diện trong dự án, liệt kê các thư viện quan trọng được import trực tiếp để xây dựng tính năng đó:

`;

    // Quét thư mục pages
    if (fs.existsSync(PAGES_DIR)) {
        const files = fs.readdirSync(PAGES_DIR).filter(file => file.endsWith('.jsx'));
        files.forEach((file, index) => {
            const filePath = path.join(PAGES_DIR, file);
            const content = fs.readFileSync(filePath, 'utf8');

            // Phân tích các thư viện được import
            const imports = [];
            if (content.includes('@mantine/core')) imports.push('\`@mantine/core\`');
            if (content.includes('react-icons/')) imports.push('\`react-icons/lu\`');
            if (content.includes('recharts')) imports.push('\`recharts (Biểu đồ)\`');
            if (content.includes('axios')) imports.push('\`axios (Gọi API)\`');
            if (content.includes('sonner') || content.includes('toast')) imports.push('\`sonner (Thông báo Toast)\`');
            if (content.includes('react-router-dom') || content.includes('useNavigate')) imports.push('\`react-router-dom\`');

            const desc = featureDescriptions[file] || "Phân hệ chức năng giao diện học tập của SmartLMS.AI.";

            report += `### 🏷️ ${index + 1}. Phân Hệ: \`${file.replace('.jsx', '')}\`\n`;
            report += `* **Tên tệp tin:** [\`${file}\`](file:///c:/code/asp.net/react-test-frontend/src/pages/${file})\n`;
            report += `* **Mô tả tính năng:** ${desc}\n`;
            report += `* **Các Module cốt lõi được import thiết lập:** ${imports.join(', ') || 'Các Component Mantine cơ bản'}\n`;
            report += `\n---\n\n`;
        });
    }

    // Quét thêm các components cốt lõi
    report += `## 🧩 3. CÁC COMPONENTS ĐIỀU HƯỚNG CỐT LÕI (NAVIGATION COMPONENTS)\n\n`;
    const coreComponents = ["Layout.jsx", "Sidebar.jsx", "Header.jsx"];
    coreComponents.forEach((file, index) => {
        const filePath = path.join(COMPONENTS_DIR, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const imports = [];
            if (content.includes('@mantine/core')) imports.push('\`@mantine/core\`');
            if (content.includes('react-icons/')) imports.push('\`react-icons/lu\`');
            if (content.includes('axios')) imports.push('\`axios (Gọi API)\`');
            if (content.includes('react-router-dom')) imports.push('\`react-router-dom\`');

            const desc = featureDescriptions[file] || "Component bổ trợ của hệ thống.";

            report += `### 🧩 Component: \`${file.replace('.jsx', '')}\`\n`;
            report += `* **Tên tệp tin:** [\`${file}\`](file:///c:/code/asp.net/react-test-frontend/src/components/${file})\n`;
            report += `* **Mô tả tính năng:** ${desc}\n`;
            report += `* **Các Module cốt lõi được import thiết lập:** ${imports.join(', ')}\n\n`;
        }
    });

    report += `\n*Báo cáo kết thúc. Chúc ngài một ngày làm việc và vận hành hạ tầng thật vui vẻ!* 🟢\n`;

    fs.writeFileSync(OUTPUT_FILE, report, 'utf8');
    console.log("🎉 Xuất thành công báo cáo Module & Tính năng tại: module_feature_mapping_report.md");
}

scanFiles();
