/**
 * 🛡️ SMARTLMS.AI ENTERPRISE ADVANCED DIAGNOSTIC & VERIFICATION SUITE
 * Chạy: node run_smartlms_diagnostic_suite.js
 * 
 * Mục đích:
 * 1. Thực hiện rà soát tĩnh (Static Analysis) giao diện React:
 *    - Quét liên kết nút (buttons, NavLinks) không hợp lệ (href="#", empty onClick).
 *    - Nhận diện các biểu tượng bị lỗi/deprecate (ví dụ: LuCheckCircle thay vì LuCircleCheck).
 *    - Thống kê các form nhập liệu & sự kiện onSubmit.
 * 2. Thực hiện kiểm thử động (Dynamic Integration Test) lên VPS Server APIs:
 *    - Kiểm thử đăng nhập nhận JWT Token.
 *    - Kiểm thử API theo dõi tiến trình video mới (/api/student/video-progress) với mock dữ liệu.
 *    - Kiểm thử Gamification, Student, Community, và Notifications Modules.
 *    - Kiểm thử sức khỏe cơ sở dữ liệu và hạ tầng (/health).
 * 3. Xuất báo cáo tự động ra tệp Markdown "smartlms_diagnostic_report.md".
 */

const fs = require('fs');
const path = require('path');

const API_BASE = 'http://141.253.114.218';
let passed = 0;
let failed = 0;
const reports = [];

// Banner đẹp chuẩn Enterprise
function printBanner() {
    console.log("==========================================================================");
    console.log("  🛡️  SMARTLMS.AI ENTERPRISE ADVANCED DIAGNOSTIC & VERIFICATION SUITE");
    console.log("==========================================================================");
}

// --------------------------------------------------------------------------
// PHẦN 1: RÀ SOÁT TĨNH GIAO DIỆN REACT (STATIC ANALYSIS)
// --------------------------------------------------------------------------
function runStaticAnalysis() {
    console.log("\n🔍 [PHẦN 1] BẮT ĐẦU RÀ SOÁT TĨNH GIAO DIỆN REACT FRONTEND...");
    reports.push("# 🛡️ BÁO CÁO KIỂM THỬ VÀ CHẨN ĐOÁN HỆ THỐNG SMARTLMS.AI");
    reports.push(`*Thời gian chạy: ${new Date().toLocaleString('vi-VN')}*`);
    reports.push(`*Địa chỉ VPS Backend đích: ${API_BASE}*\n`);
    reports.push("## 🔍 1. Kết Quả Rà Soát Tĩnh Giao Diện React");

    const pagesDir = path.join(__dirname, 'react-test-frontend', 'src', 'pages');
    if (!fs.existsSync(pagesDir)) {
        console.error("❌ Thư mục frontend/src/pages không tồn tại! Bỏ qua quét giao diện.");
        reports.push("> [!WARNING]\n> Không tìm thấy thư mục frontend/src/pages. Vui lòng kiểm tra lại cấu trúc.");
        return;
    }

    const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));
    
    reports.push("| Tên Trang | Nút | Form | Trình Xử Lý Sự Kiện | Trạng Thái Liên Kết & Biểu Tượng |");
    reports.push("| :--- | :---: | :---: | :---: | :--- |");

    files.forEach(file => {
        const filePath = path.join(pagesDir, file);
        const code = fs.readFileSync(filePath, 'utf-8');

        // Phân tích thống kê
        const buttons = (code.match(/<Button/g) || []).length;
        const forms = (code.match(/<form/g) || []).length;
        const clickHandlers = (code.match(/onClick/g) || []).length;
        const submitHandlers = (code.match(/onSubmit/g) || []).length;
        
        let issues = [];

        // Kiểm tra link chết href="#"
        if (code.includes('href="#"') || code.includes('href=\'#\'')) {
            issues.push("⚠️ Chứa link chết `href='#'` cần thay thế bằng react-router-dom Link.");
        }

        // Kiểm tra biểu tượng bị lỗi (deprecated)
        const deprecatedIcons = ["LuCheckCircle", "LuInfoCircle", "LuCloseCircle", "LuHelpCircle"];
        deprecatedIcons.forEach(icon => {
            if (code.includes(icon)) {
                issues.push(`⚠️ Dùng biểu tượng cũ \`${icon}\` (Khuyên dùng bản mới, ví dụ: \`LuCircleCheck\`).`);
            }
        });

        // Kiểm tra các button trống rỗng / thiếu click handler
        if (buttons > 0 && clickHandlers === 0 && !code.includes("type=\"submit\"")) {
            issues.push("⚠️ Có nút bấm nhưng không bắt được sự kiện `onClick` hoặc không có `type='submit'`.");
        }

        const statusMsg = issues.length > 0 ? issues.join("<br>") : "✅ Giao diện sạch, các nút hoạt động tốt";
        console.log(`   📄 Trang: ${file} (Nút: ${buttons}, Form: ${forms}, Sự kiện: ${clickHandlers + submitHandlers}) - ${statusMsg}`);
        reports.push(`| ${file} | ${buttons} | ${forms} | ${clickHandlers + submitHandlers} | ${statusMsg} |`);
    });
}

// --------------------------------------------------------------------------
// PHẦN 2: KIỂM THỬ ĐỘNG APIS (DYNAMIC INTEGRATION TEST)
// --------------------------------------------------------------------------
async function checkApi(label, fn) {
    try {
        await fn();
        console.log(`   ✅ [ĐỒNG BỘ] ${label}`);
        reports.push(`- **PASS**: \`${label}\``);
        passed++;
    } catch (e) {
        console.error(`   ❌ [LỖI] ${label}: ${e.message}`);
        reports.push(`- **FAIL**: \`${label}\` <br> *Lỗi: ${e.message}*`);
        failed++;
    }
}

async function runDynamicTests() {
    console.log("\n🚀 [PHẦN 2] BẮT ĐẦU KIỂM THỬ ĐỘNG APIS TRÊN VPS SERVER...");
    reports.push("\n## 🚀 2. Kết Quả Kiểm Thử Động Kết Nối & Tích Hợp API");

    let jwtToken = '';

    // Test Đăng nhập Admin lấy token
    await checkApi('POST /api/auth/token (Đăng nhập Admin)', async () => {
        const res = await fetch(`${API_BASE}/api/auth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'Admin@123456' })
        });
        if (!res.ok) throw new Error(`Mã lỗi HTTP ${res.status}`);
        const data = await res.json();
        if (!data.token) throw new Error('Phản hồi thiếu JWT Token!');
        jwtToken = data.token;
    });

    if (!jwtToken) {
        console.error("\n🚨 Không thể lấy JWT Token từ VPS Server! Dừng kiểm tra API yêu cầu bảo mật.");
        reports.push("\n> [!CAUTION]\n> Kiểm thử API bị gián đoạn vì không thể lấy JWT Token. Hãy đảm bảo Backend chạy tốt.");
        return;
    }

    const authHeaders = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };

    // Test API lưu tiến trình phát video (New API!)
    await checkApi('POST /api/student/video-progress (Đồng bộ giây xem video)', async () => {
        const res = await fetch(`${API_BASE}/api/student/video-progress`, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
                lessonId: 1,
                seconds: 45,
                isCompleted: false
            })
        });
        if (!res.ok) throw new Error(`Mã lỗi HTTP ${res.status}`);
        const data = await res.json();
        if (!data.success) throw new Error('API phản hồi không thành công!');
        console.log(`   → Tiến trình đồng bộ giây thứ: 45, Trạng thái: ${data.isCompleted ? 'Đã học xong' : 'Đang học'}`);
    });

    // Test Gamification Status
    await checkApi('GET /api/gamification/status (Thông tin điểm thưởng XP)', async () => {
        const res = await fetch(`${API_BASE}/api/gamification/status`, { headers: authHeaders });
        if (!res.ok) throw new Error(`Mã lỗi HTTP ${res.status}`);
        const data = await res.json();
        if (data.totalXP === undefined) throw new Error('Thiếu trường dữ liệu totalXP!');
    });

    // Test Student Enrolled Courses
    await checkApi('GET /api/student/enrolled-courses (Kho khóa học của học viên)', async () => {
        const res = await fetch(`${API_BASE}/api/student/enrolled-courses`, { headers: authHeaders });
        if (!res.ok) throw new Error(`Mã lỗi HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Dữ liệu trả về không phải dạng mảng!');
    });

    // Test Community Forum Posts
    await checkApi('GET /api/community/posts (Danh sách thảo luận diễn đàn)', async () => {
        const res = await fetch(`${API_BASE}/api/community/posts`, { headers: authHeaders });
        if (!res.ok) throw new Error(`Mã lỗi HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Dữ liệu diễn đàn không hợp lệ!');
    });

    // Test Notification Status
    await checkApi('GET /api/notifications (Thông báo thời gian thực)', async () => {
        const res = await fetch(`${API_BASE}/api/notifications`, { headers: authHeaders });
        if (!res.ok) throw new Error(`Mã lỗi HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Danh sách thông báo bị lỗi định dạng!');
    });

    // Test Server Health Check
    await checkApi('GET /health (Hạ tầng CSDL + AI Predictor)', async () => {
        const res = await fetch(`${API_BASE}/health`);
        if (!res.ok) throw new Error(`Mã lỗi HTTP ${res.status}`);
        const statusText = await res.text();
        console.log(`   → Sức khỏe hệ thống: ${statusText.trim()}`);
    });
}

// --------------------------------------------------------------------------
// KHỞI CHẠY BỘ KIỂM THỬ & XUẤT FILE BÁO CÁO
// --------------------------------------------------------------------------
async function main() {
    printBanner();
    
    // 1. Chạy quét giao diện
    runStaticAnalysis();
    
    // 2. Chạy quét API thực tế trên VPS
    await runDynamicTests();

    // 3. Kết luận
    console.log("\n==========================================================================");
    console.log(`📊 TỔNG KẾT API: ${passed} bài test ĐẠT, ${failed} bài test THẤT BẠI.`);
    console.log("==========================================================================");

    reports.push("\n## 📊 3. Tổng Kết Hệ Thống");
    reports.push(`- **Số lượng API hoạt động tốt**: ${passed}`);
    reports.push(`- **Số lượng lỗi cần xử lý**: ${failed}`);
    if (failed === 0) {
        reports.push("\n> [!NOTE]\n> 🎉 **XUẤT SẮC**: Tất cả tính năng và API kết nối CSDL hiện đang hoạt động cực kỳ hoàn hảo không có bất kỳ xung đột nào!");
    } else {
        reports.push("\n> [!WARNING]\n> ⚠️ Hệ thống có một số module cần kiểm tra lại cấu hình hoặc kết nối trên VPS.");
    }

    // Xuất ra tệp smartlms_diagnostic_report.md
    fs.writeFileSync(path.join(__dirname, 'smartlms_diagnostic_report.md'), reports.join('\n'), 'utf-8');
    console.log("🎉 ĐÃ XUẤT BÁO CÁO CHI TIẾT TẠI: smartlms_diagnostic_report.md");
}

main();
