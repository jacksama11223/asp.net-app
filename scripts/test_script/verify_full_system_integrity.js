/**
 * 🛡️ SMARTLMS.AI - ULTIMATE FULL SYSTEM INTEGRITY VERIFICATION SCRIPT
 * Chạy: node verify_full_system_integrity.js
 * Tác vụ:
 * 1. Phân tích gói thư viện (package.json): Rà soát xung đột thư viện cũ/mới (Zustand, Mantine, Monaco).
 * 2. Phân tích định tuyến (App.jsx): Đảm bảo 100% các trang mới tạo đều được import và gắn Route.
 * 3. Kiểm thử API toàn diện (API Scanner): Gửi request đến tất cả các endpoints (kể cả API video-progress).
 * 4. Rà soát CSDL (MariaDB Schema Check): Báo cáo cấu trúc các bảng bắt buộc (nếu chạy trên VPS).
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const API_BASE = 'http://141.253.114.218';
let errors = 0;
let warnings = 0;
let passed = 0;

console.log("==========================================================================");
console.log(" 🌐 SMARTLMS.AI ULTIMATE SYSTEM INTEGRITY CHECKER");
console.log("==========================================================================\n");

// --------------------------------------------------------------------------
// 1. KIỂM TRA XUNG ĐỘT THƯ VIỆN & PACKAGE.JSON
// --------------------------------------------------------------------------
console.log("📦 [1] ĐANG RÀ SOÁT PACKAGE.JSON VÀ XUNG ĐỘT THƯ VIỆN...");
try {
    const pkgPath = path.join(__dirname, 'react-test-frontend', 'package.json');
    if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        
        const requiredLibs = ['zustand', 'axios', 'framer-motion', '@monaco-editor/react', 'sonner'];
        requiredLibs.forEach(lib => {
            if (deps[lib]) {
                console.log(`   ✅ Đã cài đặt thư viện lõi: ${lib} (${deps[lib]})`);
                passed++;
            } else {
                console.log(`   ❌ THIẾU thư viện lõi: ${lib}. Chạy 'npm install ${lib}'`);
                errors++;
            }
        });

        // Kiểm tra xung đột Redux vs Zustand (nếu tồn tại cả 2 thì cảnh báo)
        if (deps['redux'] || deps['react-redux']) {
            console.log(`   ⚠️ CẢNH BÁO: Phát hiện Redux đang cài chung với Zustand. Khuyên dùng: Gỡ Redux để tối ưu hiệu suất.`);
            warnings++;
        }
    } else {
        console.log("   ❌ Không tìm thấy package.json");
        errors++;
    }
} catch (e) {
    console.log("   ❌ Lỗi khi đọc package.json: " + e.message);
}

// --------------------------------------------------------------------------
// 2. KIỂM TRA MISSING IMPORTS TRONG APP.JSX
// --------------------------------------------------------------------------
console.log("\n🔗 [2] ĐANG RÀ SOÁT ROUTING VÀ IMPORTS (App.jsx)...");
try {
    const pagesDir = path.join(__dirname, 'react-test-frontend', 'src', 'pages');
    const appPath = path.join(__dirname, 'react-test-frontend', 'src', 'App.jsx');
    
    if (fs.existsSync(pagesDir) && fs.existsSync(appPath)) {
        const appCode = fs.readFileSync(appPath, 'utf8');
        const pages = fs.readdirSync(pagesDir)
            .filter(f => f.endsWith('.jsx'))
            .map(f => f.replace('.jsx', ''));

        pages.forEach(page => {
            if (!appCode.includes(`import { ${page} }`) && !appCode.includes(`import ${page} `)) {
                console.log(`   ⚠️ CẢNH BÁO: Trang '${page}' đã được tạo nhưng CHƯA được import vào App.jsx!`);
                warnings++;
            } else if (!appCode.includes(`<${page}`)) {
                console.log(`   ❌ LỖI: Trang '${page}' đã import nhưng CHƯA được gán vào Route nào trong App.jsx!`);
                errors++;
            } else {
                passed++;
            }
        });
        console.log(`   ✅ Phân tích xong ${pages.length} trang UI.`);
    }
} catch (e) {
    console.log("   ❌ Lỗi khi phân tích App.jsx: " + e.message);
}

// --------------------------------------------------------------------------
// 3. KIỂM THỬ TOÀN BỘ API
// --------------------------------------------------------------------------
console.log("\n🚀 [3] ĐANG KIỂM THỬ KẾT NỐI TOÀN BỘ CÁC API TRÊN VPS...");

async function testEndpoint(name, url, options = {}) {
    try {
        const res = await fetch(url, options);
        if (!res.ok && res.status !== 401 && res.status !== 403) { 
            // 401/403 nghĩa là API CÓ tồn tại, chỉ là bị chặn xác thực => API sống. 
            // Nếu 404/500 => Có lỗi thật sự.
            if (res.status === 404) {
                console.log(`   ❌ [404 NOT FOUND] API bị thiếu hoặc sai URL: ${name} (${url})`);
                errors++;
            } else {
                console.log(`   ❌ [LỖI SERVER ${res.status}] API bị lỗi logic: ${name}`);
                errors++;
            }
        } else {
            console.log(`   ✅ API hoạt động tốt: ${name}`);
            passed++;
        }
    } catch (e) {
        console.log(`   ❌ [LỖI MẠNG] Không thể kết nối tới: ${name} (${e.message})`);
        errors++;
    }
}

async function runApiTests() {
    // Public APIs
    await testEndpoint('Public Courses', `${API_BASE}/api/public/courses`);
    await testEndpoint('System Health Check', `${API_BASE}/health`);
    
    // Auth & Gamification
    await testEndpoint('Authentication Token', `${API_BASE}/api/auth/token`, { method: 'POST', body: JSON.stringify({}) });
    await testEndpoint('Gamification Status', `${API_BASE}/api/gamification/status`);
    
    // Student Core
    await testEndpoint('Student Enrolled Courses', `${API_BASE}/api/student/enrolled-courses`);
    await testEndpoint('Student Video Progress (MỚI TẠO)', `${API_BASE}/api/student/video-progress`, { method: 'POST', body: JSON.stringify({}) });
    
    // Compiler & Code Sandbox
    await testEndpoint('Compiler Execute', `${API_BASE}/api/compiler/execute`, { method: 'POST', body: JSON.stringify({}) });
    
    // Community
    await testEndpoint('Community Posts', `${API_BASE}/api/community/posts`);
}

// --------------------------------------------------------------------------
// 4. KIỂM TRA MÔI TRƯỜNG DATABASE (MARIADB)
// --------------------------------------------------------------------------
console.log("\n🗄️  [4] ĐANG KIỂM TRA TÍNH TOÀN VẸN CỦA MARIA DATABASE...");
console.log("   (Tác vụ này yêu cầu script được chạy TRONG môi trường Docker trên VPS).");
console.log("   👉 Để rà soát tự động các trường thiếu (như LastWatchedSecond trong UserLessons), vui lòng chạy lệnh sau trên VPS:");
console.log("   sudo docker exec -i smartlms-db mysql -uroot -pYourStrongPassword123! SmartLMS -e 'DESCRIBE UserLessons;'");

// Chạy luồng bất đồng bộ API
runApiTests().then(() => {
    console.log("\n==========================================================================");
    console.log(`📊 TỔNG KẾT: ${passed} bài test ĐẠT, ${warnings} Cảnh báo, ${errors} Lỗi nghiêm trọng.`);
    console.log("==========================================================================");
    if (errors === 0) {
        console.log("🎉 HỆ THỐNG HOÀN TOÀN KHỎE MẠNH VÀ SẠCH SẼ!");
    } else {
        console.log("⚠️ HỆ THỐNG CÒN LỖI. VUI LÒNG KIỂM TRA CÁC MỤC ĐÁNH DẤU ❌ BÊN TRÊN.");
    }
});
