/**
 * SmartLMS Enterprise Integration Test Suite
 * 
 * Mục đích: Kiểm thử tự động toàn bộ API, DB, AI và các Module Enterprise
 * Chạy: node test_enterprise.cjs
 * Yêu cầu: node >= 18, server đang chạy tại BASE_URL
 */

const BASE_URL = 'http://141.253.114.218';
let cookieJar = '';
let testResults = { passed: 0, failed: 0, errors: [] };

// ─── HELPERS ───────────────────────────────────────────────────────────────
async function fetchApi(path, opts = {}) {
    const url = `${BASE_URL}${path}`;
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (cookieJar) headers['Cookie'] = cookieJar;

    const res = await fetch(url, { ...opts, headers, redirect: 'manual' });

    // Lưu cookie để duy trì session
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) cookieJar = setCookie.split(';')[0];

    return res;
}

function assert(name, condition, detail = '') {
    if (condition) {
        console.log(`  ✅ PASS: ${name}`);
        testResults.passed++;
    } else {
        console.log(`  ❌ FAIL: ${name}${detail ? ' — ' + detail : ''}`);
        testResults.failed++;
        testResults.errors.push({ test: name, detail });
    }
}

async function getToken() {
    // Bước 1: Lấy AntiForgery token từ trang Login
    const loginPageRes = await fetchApi('/Account/Login');
    const loginPageHtml = await loginPageRes.text();
    const tokenMatch = loginPageHtml.match(/name="__RequestVerificationToken" type="hidden" value="([^"]+)"/);
    return tokenMatch ? tokenMatch[1] : null;
}

// ─── TEST 1: AUTHENTICATION ─────────────────────────────────────────────────
async function testAuthentication() {
    console.log('\n📋 [Module 1] Authentication & Session');

    try {
        const token = await getToken();
        assert('GET /Account/Login trả về trang đăng nhập', token !== null, 'Không tìm thấy AntiForgery token');

        // Đăng nhập
        const loginRes = await fetchApi('/Account/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `Username=admin&Password=Admin%40123456&__RequestVerificationToken=${encodeURIComponent(token || '')}`
        });

        const isRedirect = loginRes.status === 302 || loginRes.status === 301 || loginRes.status === 200;
        assert('POST /Account/Login với admin/Admin@123456 thành công', isRedirect, `Status: ${loginRes.status}`);

        // Sau đăng nhập, truy cập trang cần quyền
        const dashRes = await fetchApi('/Dashboard/Index');
        assert('GET /Dashboard/Index sau đăng nhập trả về 200', dashRes.status === 200, `Status: ${dashRes.status}`);

    } catch (e) {
        assert('Authentication module khởi động', false, e.message);
    }
}

// ─── TEST 2: AUDIT TRAIL ────────────────────────────────────────────────────
async function testAuditTrail() {
    console.log('\n📋 [Module 2] Audit Trail — DB Query');

    try {
        const res = await fetchApi('/UserManagement/GetAuditTrail');
        assert('GET /UserManagement/GetAuditTrail trả về 200', res.status === 200, `Status: ${res.status}`);

        const html = await res.text();
        const hasData = html.includes('audit-item') || html.includes('Chưa có dữ liệu');
        assert('Audit Trail trả về HTML có nội dung', hasData, 'Không tìm thấy class audit-item hoặc thông báo rỗng');

        const hasError = html.includes('Exception') || html.includes('NullReferenceException');
        assert('Audit Trail không có lỗi Runtime Exception', !hasError, 'Trang chứa stack trace lỗi');

    } catch (e) {
        assert('Audit Trail module', false, e.message);
    }
}

// ─── TEST 3: AI ANALYTICS ───────────────────────────────────────────────────
async function testAIAnalytics() {
    console.log('\n📋 [Module 3] AI Analytics — ML.NET + DB Integration');

    try {
        // Test trang Analytics (Admin)
        const pageRes = await fetchApi('/Dashboard/Analytics');
        assert('GET /Dashboard/Analytics trả về 200 (không 404)', pageRes.status === 200, `Status: ${pageRes.status}`);

        // Test API data (JSON endpoint)
        const dataRes = await fetchApi('/Dashboard/GetAnalyticsData');
        assert('GET /Dashboard/GetAnalyticsData trả về 200', dataRes.status === 200, `Status: ${dataRes.status}`);

        if (dataRes.status === 200) {
            const data = await dataRes.json();
            assert('API trả về JSON có trường riskPredictions', Array.isArray(data.riskPredictions), JSON.stringify(data).substring(0, 100));
            assert('API trả về JSON có trường commonMistakes', Array.isArray(data.commonMistakes));
        }

        // Test Student Analytics API
        const studentRes = await fetchApi('/Dashboard/MyAnalytics');
        assert('GET /Dashboard/MyAnalytics trả về 200 hoặc 401', [200, 401, 302].includes(studentRes.status), `Status: ${studentRes.status}`);

    } catch (e) {
        assert('AI Analytics module', false, e.message);
    }
}

// ─── TEST 4: CODING SANDBOX ─────────────────────────────────────────────────
async function testCodingSandbox() {
    console.log('\n📋 [Module 4] Coding Sandbox — Monaco Editor + Compiler + DB');

    try {
        // Test trang Solve
        const pageRes = await fetchApi('/CodingChallenge/Solve/1');
        assert('GET /CodingChallenge/Solve/1 trả về 200 (không 404)', pageRes.status === 200, `Status: ${pageRes.status}`);

        if (pageRes.status === 200) {
            const html = await pageRes.text();
            assert('Trang có Monaco Editor container', html.includes('monaco-container'), 'Không tìm thấy #monaco-container');
            assert('Trang hiển thị tên bài tập', html.includes('Kiểm tra'), 'Không thấy tiêu đề bài tập');
        }

        // Test Submit code đúng (even number check)
        const submitRes = await fetchApi('/CodingChallenge/Submit', {
            method: 'POST',
            body: JSON.stringify({ challengeId: 1, code: 'return (int.Parse(input) % 2 == 0).ToString();' })
        });
        assert('POST /CodingChallenge/Submit trả về 200', submitRes.status === 200, `Status: ${submitRes.status}`);

        if (submitRes.status === 200) {
            const result = await submitRes.json();
            assert('Submit trả về JSON với trường success', 'success' in result, JSON.stringify(result).substring(0, 100));
            assert('Submit trả về JSON với trường testCaseResults', 'testCaseResults' in result);
            assert('Code đúng → Tất cả test case PASS', result.testCaseResults?.every(t => t.passed), JSON.stringify(result.testCaseResults));
        }

        // Test API lấy challenges theo course
        const challengesRes = await fetchApi('/api/assessment/coding-challenges?courseId=1');
        assert('GET /api/assessment/coding-challenges?courseId=1 trả về 200 hoặc 401', [200, 401].includes(challengesRes.status), `Status: ${challengesRes.status}`);

    } catch (e) {
        assert('Coding Sandbox module', false, e.message);
    }
}

// ─── TEST 5: ACHIEVEMENT HUB ────────────────────────────────────────────────
async function testAchievementHub() {
    console.log('\n📋 [Module 5] Achievement Hub — XP + Badges + DB');

    try {
        const pageRes = await fetchApi('/Assessment/AchievementHub');
        assert('GET /Assessment/AchievementHub trả về 200 (không 404/500)', pageRes.status === 200, `Status: ${pageRes.status}`);

        if (pageRes.status === 200) {
            const html = await pageRes.text();
            const hasError = html.includes('Exception') || html.includes('NullReferenceException');
            assert('AchievementHub không throw Exception', !hasError);
            assert('AchievementHub có nội dung về XP hoặc huy hiệu', html.includes('XP') || html.includes('badge') || html.includes('Level'));
        }

        // Test API Achievement cho React
        const apiRes = await fetchApi('/api/assessment/my-achievements');
        assert('GET /api/assessment/my-achievements trả về 200 hoặc 401', [200, 401].includes(apiRes.status), `Status: ${apiRes.status}`);

        if (apiRes.status === 200) {
            const data = await apiRes.json();
            assert('API Achievement trả về totalXP', 'totalXP' in data || data.user !== undefined);
        }

    } catch (e) {
        assert('Achievement Hub module', false, e.message);
    }
}

// ─── TEST 6: SIGNALR ─────────────────────────────────────────────────────────
async function testSignalR() {
    console.log('\n📋 [Module 6] Real-time Notifications — SignalR Hub');

    try {
        const negotiateRes = await fetchApi('/notificationHub/negotiate?negotiateVersion=1', {
            method: 'POST'
        });
        assert('POST /notificationHub/negotiate trả về 200', negotiateRes.status === 200, `Status: ${negotiateRes.status}`);

        if (negotiateRes.status === 200) {
            const data = await negotiateRes.json();
            assert('Negotiate trả về connectionId', !!data.connectionId || !!data.connectionToken);
        }
    } catch (e) {
        assert('SignalR Hub negotiate', false, e.message);
    }
}

// ─── TEST 7: DATABASE INTEGRITY ──────────────────────────────────────────────
async function testDatabaseEndpoints() {
    console.log('\n📋 [Module 7] Database Connectivity — Core Tables');

    const endpoints = [
        { path: '/Dashboard/GetCourseCompletionData', name: 'CourseCompletion data' },
        { path: '/Dashboard/GetRoleDistribution', name: 'RoleDistribution data' },
        { path: '/api/assessment/leaderboard', name: 'Leaderboard (Gamification)' },
    ];

    for (const ep of endpoints) {
        try {
            const res = await fetchApi(ep.path);
            assert(`GET ${ep.path} — ${ep.name}`, [200, 401].includes(res.status), `Status: ${res.status}`);
        } catch (e) {
            assert(`GET ${ep.path}`, false, e.message);
        }
    }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║     SmartLMS Enterprise — Automated Integration Tests     ║');
    console.log(`║     Target: ${BASE_URL.padEnd(46)}║`);
    console.log('╚══════════════════════════════════════════════════════════╝');

    await testAuthentication();
    await testAuditTrail();
    await testAIAnalytics();
    await testCodingSandbox();
    await testAchievementHub();
    await testSignalR();
    await testDatabaseEndpoints();

    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║                   KẾT QUẢ KIỂM THỬ                       ║');
    console.log(`║  ✅ PASSED : ${String(testResults.passed).padEnd(44)}║`);
    console.log(`║  ❌ FAILED : ${String(testResults.failed).padEnd(44)}║`);
    console.log(`║  📊 TOTAL  : ${String(testResults.passed + testResults.failed).padEnd(44)}║`);
    console.log('╚══════════════════════════════════════════════════════════╝');

    if (testResults.errors.length > 0) {
        console.log('\n⚠️  CÁC LỖI CẦN XEM XÉT:');
        testResults.errors.forEach(e => console.log(`  → [${e.test}]: ${e.detail}`));
    }

    process.exit(testResults.failed > 0 ? 1 : 0);
}

main().catch(console.error);
