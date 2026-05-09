/**
 * SmartLMS API Smoke Test
 * Chạy: node verify_apis.js
 * Mục đích: Kiểm tra tất cả API module hoạt động ổn định sau mỗi lần deploy.
 */
const API_BASE = 'http://141.253.114.218';

let passed = 0;
let failed = 0;

async function check(label, fn) {
    try {
        await fn();
        console.log(`✅ ${label}`);
        passed++;
    } catch (e) {
        console.error(`❌ ${label}: ${e.message}`);
        failed++;
    }
}

async function runTests() {
    console.log('='.repeat(55));
    console.log('  SmartLMS Modular Monolith - API Smoke Test');
    console.log('='.repeat(55));

    // =========================================================
    // MODULE 1: AUTH - Lấy JWT Token
    // =========================================================
    console.log('\n📦 [Module 1] Auth Module');
    let jwtToken = '';

    await check('POST /api/auth/token (admin login)', async () => {
        const res = await fetch(`${API_BASE}/api/auth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'Admin@123456' })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!data.token) throw new Error('Không tìm thấy token trong response!');
        jwtToken = data.token;
    });

    if (!jwtToken) {
        console.error('\n🚨 Không có JWT token - Dừng kiểm tra. Kiểm tra lại Backend!');
        process.exit(1);
    }

    const authHeaders = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };

    // =========================================================
    // MODULE 2: GAMIFICATION - Kiểm tra xem XP/Streak có trả về đúng không
    // =========================================================
    console.log('\n📦 [Module 2] Gamification Module');
    await check('GET /api/gamification/status', async () => {
        const res = await fetch(`${API_BASE}/api/gamification/status`, { headers: authHeaders });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.totalXP === undefined) throw new Error('Response thiếu trường totalXP!');
        console.log(`   → XP: ${data.totalXP}, Streak: ${data.currentStreak}, Level: ${data.level}`);
    });

    // =========================================================
    // MODULE 3: STUDENT - Kiểm tra danh sách khóa học đã mua
    // =========================================================
    console.log('\n📦 [Module 3] Student Module');
    await check('GET /api/student/enrolled-courses', async () => {
        const res = await fetch(`${API_BASE}/api/student/enrolled-courses`, { headers: authHeaders });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error(`Response không phải mảng! Nhận được: ${typeof data}`);
        console.log(`   → Số khóa học: ${data.length}`);
    });

    // =========================================================
    // MODULE 4: COMMUNITY - Kiểm tra bài viết cộng đồng
    // =========================================================
    console.log('\n📦 [Module 4] Community Module');
    await check('GET /api/community/posts', async () => {
        const res = await fetch(`${API_BASE}/api/community/posts`, { headers: authHeaders });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error(`Response không phải mảng! Nhận được: ${typeof data}`);
        console.log(`   → Số bài viết: ${data.length}`);
    });

    // =========================================================
    // MODULE 5: NOTIFICATION - Kiểm tra thông báo cá nhân
    // =========================================================
    console.log('\n📦 [Module 5] Notification Module');
    await check('GET /api/notifications', async () => {
        const res = await fetch(`${API_BASE}/api/notifications`, { headers: authHeaders });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error(`Response không phải mảng! Nhận được: ${typeof data}`);
        console.log(`   → Số thông báo: ${data.length}`);
    });

    // =========================================================
    // MODULE 6: PUBLIC - Kiểm tra API công khai (không cần đăng nhập)
    // =========================================================
    console.log('\n📦 [Module 6] Public API');
    await check('GET /api/public/courses (không cần token)', async () => {
        const res = await fetch(`${API_BASE}/api/public/courses`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error(`Response không phải mảng!`);
        console.log(`   → Số khóa học công khai: ${data.length}`);
    });

    // =========================================================
    // MODULE 7: HEALTH CHECK - Kiểm tra sức khỏe hạ tầng
    // =========================================================
    console.log('\n📦 [Module 7] Infrastructure Health');
    await check('GET /health (Database + AI Service)', async () => {
        const res = await fetch(`${API_BASE}/health`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        console.log(`   → Status: ${text.trim()}`);
    });

    // =========================================================
    // KẾT QUẢ TỔNG KẾT
    // =========================================================
    console.log('\n' + '='.repeat(55));
    const total = passed + failed;
    console.log(`  KẾT QUẢ: ${passed}/${total} tests passed`);
    if (failed === 0) {
        console.log('  🎉 TẤT CẢ MODULE HOẠT ĐỘNG BÌNH THƯỜNG!');
    } else {
        console.log(`  ⚠️  ${failed} module cần kiểm tra thêm.`);
    }
    console.log('='.repeat(55));
    process.exit(failed > 0 ? 1 : 0);
}

runTests();
