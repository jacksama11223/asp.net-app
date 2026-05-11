/**
 * SmartLMS.AI - Full System Test Script
 * Test 1: Frontend Icon Safety (Static Analysis)
 * Test 2: All API Endpoints (Integration Test)
 * 
 * Chạy: node test_full_system.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// CẤU HÌNH
// ============================================================
const API_BASE = 'http://145.241.160.156:5182';
const TEST_CREDENTIALS = {
  instructor: { username: 'admin', password: 'Admin@123' },
  student: { username: 'student1', password: 'Student@123' }
};

// Icon SafeList - đã kiểm chứng chạy được trên Server
const SAFE_ICONS = [
  'LuLayoutDashboard', 'LuBookOpen', 'LuUsers', 'LuZap', 'LuSettings',
  'LuLogOut', 'LuSparkles', 'LuPlus', 'LuPenTool', 'LuEye', 'LuSearch',
  'LuSend', 'LuArrowLeft', 'LuPlay', 'LuExternalLink', 'LuClock'
];

// Icon bị cấm tuyệt đối
const FORBIDDEN_ICONS = [
  'LuMoreVertical', 'LuCheckCheck', 'LuMoreHorizontal', 'LuCheck',
  'LuPanelLeftClose', 'LuPanelLeftOpen', 'LuMessageCircle',
  'LuBook', 'LuCode', 'LuFileText', 'LuHeart', 'LuStar',
  'LuInfo', 'LuMessageSquare', 'LuLayout'
];

// ============================================================
// TIỆN ÍCH
// ============================================================
let passed = 0, failed = 0, warnings = 0;

function log(type, msg) {
  const icons = { OK: '✅', FAIL: '❌', WARN: '⚠️ ', INFO: 'ℹ️ ', HEAD: '🔷' };
  console.log(`${icons[type] || ''} ${msg}`);
}

function separator(title) {
  console.log(`\n${'═'.repeat(55)}`);
  console.log(`  ${title}`);
  console.log('═'.repeat(55));
}

async function request(method, endpoint, body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, options);
    let data;
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }
    return { status: res.status, data };
  } catch (e) {
    return { status: 0, data: null, error: e.message };
  }
}

function assert(condition, testName, detail = '') {
  if (condition) {
    log('OK', `PASS: ${testName}`);
    passed++;
  } else {
    log('FAIL', `FAIL: ${testName}${detail ? ` → ${detail}` : ''}`);
    failed++;
  }
}

// ============================================================
// TEST 1: FRONTEND ICON SAFETY
// ============================================================
function testIconSafety() {
  separator('TEST 1: FRONTEND ICON SAFETY');

  const srcDir = path.join(__dirname, 'react-test-frontend', 'src');
  const extensions = ['.jsx', '.tsx'];
  let allFiles = [];

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) scanDir(full);
      else if (extensions.some(ext => f.endsWith(ext))) allFiles.push(full);
    });
  }
  scanDir(srcDir);

  log('INFO', `Tìm thấy ${allFiles.length} file JSX/TSX để quét...`);
  let hasForbidden = false;

  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(__dirname, file);

    // Kiểm tra icon bị cấm
    FORBIDDEN_ICONS.forEach(icon => {
      if (new RegExp(`\\b${icon}\\b`).test(content)) {
        log('FAIL', `FORBIDDEN ICON '${icon}' in ${relativePath}`);
        failed++;
        hasForbidden = true;
      }
    });

    // Cảnh báo icon chưa kiểm chứng
    const matches = content.match(/Lu[A-Z][a-zA-Z]+/g) || [];
    const unknown = [...new Set(matches)].filter(
      icon => !SAFE_ICONS.includes(icon) && !FORBIDDEN_ICONS.includes(icon)
    );
    unknown.forEach(icon => {
      log('WARN', `UNKNOWN ICON '${icon}' in ${path.basename(file)} - chưa kiểm chứng`);
      warnings++;
    });
  });

  if (!hasForbidden) {
    log('OK', `PASS: Không có icon bị cấm trong toàn bộ ${allFiles.length} file`);
    passed++;
  }
}

// ============================================================
// TEST 2: AUTH API
// ============================================================
async function testAuth() {
  separator('TEST 2: AUTHENTICATION API');

  // 2.1 Đăng nhập Giảng viên
  const instrRes = await request('POST', '/api/auth/login', TEST_CREDENTIALS.instructor);
  assert(instrRes.status === 200, 'POST /api/auth/login (Instructor)', `Status: ${instrRes.status}`);
  const instrToken = instrRes.data?.token || instrRes.data?.accessToken;
  assert(!!instrToken, 'Instructor token tồn tại trong response');

  // 2.2 Đăng nhập Học viên
  const studRes = await request('POST', '/api/auth/login', TEST_CREDENTIALS.student);
  assert(studRes.status === 200, 'POST /api/auth/login (Student)', `Status: ${studRes.status}`);
  const studToken = studRes.data?.token || studRes.data?.accessToken;
  assert(!!studToken, 'Student token tồn tại trong response');

  return { instrToken, studToken };
}

// ============================================================
// TEST 3: COURSE / MARKETPLACE API
// ============================================================
async function testCourseAPI(studToken) {
  separator('TEST 3: COURSE & MARKETPLACE API');

  // 3.1 Lấy danh sách khóa học (Marketplace)
  const listRes = await request('GET', '/api/courses', null, studToken);
  assert(listRes.status === 200, 'GET /api/courses (Marketplace)', `Status: ${listRes.status}`);
  assert(Array.isArray(listRes.data) || listRes.data?.items, 'Courses trả về dạng array/object');

  // 3.2 Lấy chi tiết 1 khóa học
  const courseId = Array.isArray(listRes.data) ? listRes.data?.[0]?.id : listRes.data?.items?.[0]?.id;
  if (courseId) {
    const detailRes = await request('GET', `/api/courses/${courseId}`, null, studToken);
    assert(detailRes.status === 200, `GET /api/courses/${courseId} (Detail)`, `Status: ${detailRes.status}`);
    assert(!!detailRes.data?.title, 'Course detail có trường title');
    log('INFO', `  → Course: "${detailRes.data?.title}" - Instructor: "${detailRes.data?.instructorName || 'N/A'}"`);
    assert(!!detailRes.data?.instructorName, 'Course có trường instructorName (tên tác giả)', 'THIẾU - cần bổ sung!');
  } else {
    log('WARN', 'Không lấy được courseId để test chi tiết');
    warnings++;
  }

  // 3.3 Khóa học của tôi (My Learning)
  const myRes = await request('GET', '/api/student/my-courses', null, studToken);
  assert([200, 404].includes(myRes.status), 'GET /api/student/my-courses', `Status: ${myRes.status}`);

  return courseId;
}

// ============================================================
// TEST 4: STUDENT LEARNING API
// ============================================================
async function testStudentAPI(studToken, courseId) {
  separator('TEST 4: STUDENT LEARNING API');

  if (!courseId) {
    log('WARN', 'Bỏ qua test Student API - không có courseId');
    warnings++;
    return;
  }

  // 4.1 Nội dung bài học
  const contentRes = await request('GET', `/api/student/course-content/${courseId}`, null, studToken);
  assert([200, 403, 404].includes(contentRes.status), `GET /api/student/course-content/${courseId}`, `Status: ${contentRes.status}`);

  // 4.2 Điểm yếu (nếu API tồn tại)
  const weakRes = await request('GET', `/api/student/weak-points/${courseId}`, null, studToken);
  if (weakRes.status === 404) {
    log('WARN', 'API /api/student/weak-points chưa có - CẦN BUILD trong Sprint 1');
    warnings++;
  } else {
    assert(weakRes.status === 200, `GET /api/student/weak-points/${courseId}`);
  }

  // 4.3 Tiến độ hoàn thành
  const progressRes = await request('GET', `/api/student/completion/${courseId}`, null, studToken);
  if (progressRes.status === 404) {
    log('WARN', 'API /api/student/completion chưa có - CẦN BUILD trong Sprint 1');
    warnings++;
  } else {
    assert(progressRes.status === 200, `GET /api/student/completion/${courseId}`);
  }
}

// ============================================================
// TEST 5: CREATOR / INSTRUCTOR API
// ============================================================
async function testCreatorAPI(instrToken) {
  separator('TEST 5: CREATOR / INSTRUCTOR API');

  // 5.1 Khóa học của tôi (Instructor)
  const myCoursesRes = await request('GET', '/api/instructor/my-courses', null, instrToken);
  assert([200, 404].includes(myCoursesRes.status), 'GET /api/instructor/my-courses', `Status: ${myCoursesRes.status}`);

  // 5.2 Tin nhắn (Messaging)
  const msgRes = await request('GET', '/api/instructor/messages', null, instrToken);
  if (msgRes.status === 404) {
    log('WARN', 'API /api/instructor/messages chưa có');
    warnings++;
  } else {
    assert(msgRes.status === 200, 'GET /api/instructor/messages', `Status: ${msgRes.status}`);
  }

  // 5.3 Analytics
  const analyticsRes = await request('GET', '/api/instructor/analytics', null, instrToken);
  if (analyticsRes.status === 404) {
    log('WARN', 'API /api/instructor/analytics chưa có - CẦN BUILD trong Sprint 1');
    warnings++;
  } else {
    assert(analyticsRes.status === 200, 'GET /api/instructor/analytics', `Status: ${analyticsRes.status}`);
  }
}

// ============================================================
// TEST 6: MESSAGING (Instructor ↔ Student)
// ============================================================
async function testMessagingAPI(instrToken, studToken) {
  separator('TEST 6: MESSAGING API (Instructor ↔ Student)');

  // 6.1 Gửi tin nhắn từ Giảng viên
  const sendRes = await request('POST', '/api/messages/send', {
    receiverId: 2, content: '[AUTO-TEST] Tin nhắn kiểm tra hệ thống - ' + new Date().toISOString()
  }, instrToken);
  assert([200, 201].includes(sendRes.status), 'POST /api/messages/send (Instructor → Student)', `Status: ${sendRes.status}`);

  // 6.2 Lấy lịch sử tin nhắn
  const historyRes = await request('GET', '/api/messages/history/2', null, instrToken);
  assert([200, 404].includes(historyRes.status), 'GET /api/messages/history/:userId', `Status: ${historyRes.status}`);

  // 6.3 Số tin nhắn chưa đọc
  const unreadRes = await request('GET', '/api/messages/unread-count', null, studToken);
  assert([200, 404].includes(unreadRes.status), 'GET /api/messages/unread-count (Student)', `Status: ${unreadRes.status}`);
}

// ============================================================
// TEST 7: COMMUNITY API
// ============================================================
async function testCommunityAPI(studToken) {
  separator('TEST 7: COMMUNITY API');

  const postsRes = await request('GET', '/api/community/posts', null, studToken);
  assert([200, 404].includes(postsRes.status), 'GET /api/community/posts', `Status: ${postsRes.status}`);

  // Reviews
  const reviewRes = await request('GET', '/api/courses/1/reviews', null, studToken);
  if (reviewRes.status === 404) {
    log('WARN', 'API /api/courses/:id/reviews chưa có - CẦN BUILD trong Sprint 1');
    warnings++;
  } else {
    assert(reviewRes.status === 200, 'GET /api/courses/1/reviews');
  }
}

// ============================================================
// TEST 8: KIỂM TRA ROUTES FRONTEND
// ============================================================
function testFrontendRoutes() {
  separator('TEST 8: FRONTEND ROUTES EXISTENCE');

  const appJsx = path.join(__dirname, 'react-test-frontend', 'src', 'App.jsx');
  const content = fs.readFileSync(appJsx, 'utf8');

  const requiredRoutes = [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/courses', name: 'Marketplace' },
    { path: '/my-learning', name: 'My Learning (Course Library)' },
    { path: '/study/:courseId', name: 'Study Workspace' },
    { path: '/community', name: 'Community' },
    { path: '/wiki', name: 'Personal Wiki' },
    { path: '/creator/courses', name: 'Creator - Course Manager' },
    { path: '/creator/messages', name: 'Creator - Message Center' },
    { path: '/creator/analytics', name: 'Creator - Analytics' },
  ];

  const missingRoutes = [
    { path: '/community/post/new', name: 'Community - New Post [MISSING - Sprint 2]' },
    { path: '/community/friends', name: 'Friend Module [MISSING - Sprint 2]' },
    { path: '/community/quiz-builder', name: 'Self Quiz Builder [MISSING - Sprint 3]' },
    { path: '/tutor/dashboard', name: 'Tutor Dashboard [MISSING - Sprint 3]' },
  ];

  requiredRoutes.forEach(route => {
    const exists = content.includes(`"${route.path}"`) || content.includes(`'${route.path}'`);
    assert(exists, `Route "${route.path}" (${route.name}) tồn tại`);
  });

  log('INFO', '\n--- Routes chưa có (cần build theo kế hoạch):');
  missingRoutes.forEach(route => {
    log('WARN', `MISSING: "${route.path}" - ${route.name}`);
    warnings++;
  });
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║   SMARTLMS.AI - FULL SYSTEM TEST SUITE               ║');
  console.log('║   Icon Safety + API Integration + Route Coverage     ║');
  console.log(`╚═══════════════════════════════════════════════════════╝`);
  console.log(`Target: ${API_BASE}\n`);

  // Run tests
  testIconSafety();
  testFrontendRoutes();

  const { instrToken, studToken } = await testAuth();
  const courseId = await testCourseAPI(studToken);
  await testStudentAPI(studToken, courseId);
  await testCreatorAPI(instrToken);
  await testMessagingAPI(instrToken, studToken);
  await testCommunityAPI(studToken);

  // Final Report
  separator('KẾT QUẢ TỔNG HỢP');
  console.log(`  ✅ Passed:   ${passed}`);
  console.log(`  ❌ Failed:   ${failed}`);
  console.log(`  ⚠️  Warnings: ${warnings}`);
  console.log(`  📊 Total:    ${passed + failed}`);

  if (failed === 0) {
    console.log('\n  🚀 HỆ THỐNG SẴN SÀNG BUILD LÊN VPS!');
  } else {
    console.log('\n  🔧 CÒN LỖI - Kiểm tra chi tiết ở trên trước khi build.');
  }

  if (warnings > 0) {
    console.log(`  📋 Có ${warnings} cảnh báo - Xem Implementation Plan để biết cần build thêm gì.`);
  }
}

main().catch(console.error);
