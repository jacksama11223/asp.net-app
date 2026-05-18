/**
 * 🔍 SmartLMS React Button Audit Script
 * Quét toàn bộ JSX files, tìm các <Button> và <button> không có onClick handler.
 * Usage: node scan_buttons.cjs
 */
const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, 'src/pages');
const COMPONENTS_DIR = path.join(__dirname, 'src/components');

const ROUTE_MAP = {
  '/dashboard': 'Dashboard.jsx',
  '/courses': 'Courses.jsx',
  '/my-learning': 'MyLearning.jsx',
  '/study/:courseId': 'StudyWorkspace.jsx',
  '/creator/courses': 'CourseManager.jsx',
  '/creator/analytics': 'CreatorAnalytics.jsx',
  '/community': 'ForumHome.jsx',
  '/leaderboard': 'Leaderboard.jsx',
  '/mistakes': 'MistakeNotebook.jsx',
  '/booking': 'BookingPage.jsx',
};

function getJsxFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'))
    .map(f => path.join(dir, f));
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const fileName = path.basename(filePath);
  
  const results = {
    file: fileName,
    withHandler: [],
    withoutHandler: [],
    navigateButtons: [],
    deadButtons: [],
  };

  // Regex tìm Button hoặc button tag
  const buttonStartRegex = /<(?:Button|button)(\s[^>]*)?>/g;
  
  let match;
  while ((match = buttonStartRegex.exec(content)) !== null) {
    const pos = match.index;
    const lineNum = content.substring(0, pos).split('\n').length;
    const tagContent = match[0];
    
    // Lấy 3 dòng trước và sau để kiểm tra context
    const contextStart = Math.max(0, lineNum - 3);
    const contextEnd = Math.min(lines.length - 1, lineNum + 3);
    const context = lines.slice(contextStart, contextEnd).join('\n');
    
    // Tìm onClick, href, to trong tag
    const hasOnClick = /onClick\s*=/.test(tagContent);
    const hasNavigate = /navigate\s*\(/.test(context) && !hasOnClick; // navigate không trong onClick
    const hasOnClickInTag = /onClick\s*=/.test(tagContent);
    const hasOnClickNearby = /onClick\s*=/.test(lines.slice(Math.max(0, lineNum - 1), lineNum + 2).join('\n'));

    // Lấy label nội dung button
    const labelMatch = content.substring(pos).match(/>([\s\S]*?)<\/(?:Button|button)>/);
    const label = labelMatch 
      ? labelMatch[1].replace(/<[^>]+>/g, '').trim().substring(0, 60)
      : '(unknown)';

    const info = {
      line: lineNum,
      label: label.replace(/\s+/g, ' '),
      tag: tagContent.substring(0, 80) + (tagContent.length > 80 ? '...' : ''),
    };

    if (hasOnClickInTag || hasOnClickNearby) {
      results.withHandler.push(info);
    } else {
      results.withoutHandler.push(info);
    }
  }

  // Kiểm tra navigate() calls trong file
  const navigateMatches = content.match(/navigate\(`[^`]*`\)/g) || [];
  results.navigateButtons = navigateMatches;

  return results;
}

// ==================
// MAIN
// ==================
console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  🔍 SmartLMS React Button Audit - Static Code Analysis       ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const allFiles = [
  ...getJsxFiles(PAGES_DIR),
  ...getJsxFiles(COMPONENTS_DIR),
];

let totalWithHandler = 0;
let totalWithout = 0;
const deadButtonsReport = [];

for (const file of allFiles) {
  const result = analyzeFile(file);
  totalWithHandler += result.withHandler.length;
  totalWithout += result.withoutHandler.length;

  const hasIssues = result.withoutHandler.length > 0;
  
  console.log(`\n📄 ${result.file}`);
  console.log(`   ✅ Có handler: ${result.withHandler.length} | ❌ Không handler: ${result.withoutHandler.length}`);
  
  if (result.withoutHandler.length > 0) {
    for (const btn of result.withoutHandler) {
      const label = btn.label || '(không có nhãn)';
      console.log(`   ❌ [Line ${btn.line}] Button: "${label.substring(0, 50)}"`);
      deadButtonsReport.push({ file: result.file, ...btn });
    }
  }
}

// ==================
// TỔNG KẾT
// ==================
console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  📊 TỔNG KẾT KẾT QUẢ PHÂN TÍCH                              ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
console.log(`\n   Tổng số Button có handler : ${totalWithHandler}`);
console.log(`   Tổng số Button THIẾU handler: ${totalWithout}`);

if (deadButtonsReport.length > 0) {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║  🚨 DANH SÁCH BUTTONS CẦN FIX (Không có onClick handler)    ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');
  
  const byFile = {};
  for (const b of deadButtonsReport) {
    if (!byFile[b.file]) byFile[b.file] = [];
    byFile[b.file].push(b);
  }

  for (const [file, buttons] of Object.entries(byFile)) {
    console.log(`\n📄 ${file} (${buttons.length} buttons cần fix):`);
    for (const btn of buttons) {
      const label = btn.label.replace(/\n/g, ' ').trim().substring(0, 60);
      console.log(`   ❌ Line ${btn.line}: "${label}"`);
      
      // Đề xuất tính năng
      const lowerLabel = label.toLowerCase();
      let suggestion = '→ Cần thêm onClick handler phù hợp';
      if (lowerLabel.includes('filter') || lowerLabel.includes('tìm kiếm')) {
        suggestion = '→ Gợi ý: onClick mở filter modal hoặc toggle filter panel';
      } else if (lowerLabel.includes('my learning') || lowerLabel.includes('học')) {
        suggestion = '→ Gợi ý: onClick={() => navigate("/my-learning")}';
      } else if (lowerLabel.includes('categor') || lowerLabel.includes('danh mục')) {
        suggestion = '→ Gợi ý: onClick mở Category dropdown filter';
      } else if (lowerLabel.includes('ôn tập') || lowerLabel.includes('luyện tập')) {
        suggestion = '→ Gợi ý: onClick={() => navigate("/mistakes")} hoặc mở flashcard mode';
      } else if (lowerLabel.includes('bắt đầu') || lowerLabel.includes('start')) {
        suggestion = '→ Gợi ý: onClick điều hướng đến trang tương ứng';
      } else if (lowerLabel.includes('preview') || lowerLabel.includes('xem')) {
        suggestion = '→ Gợi ý: onClick mở Preview modal hoặc navigate đến course detail';
      }
      console.log(`      ${suggestion}`);
    }
  }
}

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  📋 BẢN ĐỒ ROUTE HIỆN TẠI                                    ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');
for (const [route, page] of Object.entries(ROUTE_MAP)) {
  console.log(`   ${route.padEnd(30)} → ${page}`);
}

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  💡 TRANG ĐỀ XUẤT THÊM MỚI (Chưa có route)                  ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');
const suggestedPages = [
  { route: '/flashcards/:lessonId',    page: 'FlashcardReview.jsx',   desc: 'Ôn tập thẻ nhớ SRS - Button "Bắt đầu ôn tập" trong MyLearning' },
  { route: '/quiz/:lessonId',          page: 'QuizPlay.jsx',          desc: 'Làm quiz nhanh từng bài - Button "Quiz kiến thức nhanh" trong StudyWorkspace' },
  { route: '/categories',             page: 'CategoryBrowse.jsx',    desc: 'Duyệt khóa học theo danh mục - Button "Browse Categories" trong Courses.jsx' },
  { route: '/creator/lesson/:id',     page: 'LessonEditor.jsx',      desc: 'Editor nội dung bài học - Button "Studio" trong CourseManager' },
  { route: '/notifications',          page: 'Notifications.jsx',     desc: 'Trang thông báo - Icon bell trong navbar chưa có handler' },
  { route: '/certificates',           page: 'MyCertificates.jsx',    desc: 'Trang xem chứng chỉ - Sau khi hoàn thành khóa học' },
  { route: '/search',                 page: 'SearchResults.jsx',     desc: 'Trang tìm kiếm toàn hệ thống - Button "Filters" trong Courses.jsx' },
];

for (const p of suggestedPages) {
  console.log(`   📌 ${p.route}`);
  console.log(`      Page: ${p.page}`);
  console.log(`      Lý do: ${p.desc}\n`);
}

console.log('✅ Phân tích hoàn tất!\n');
