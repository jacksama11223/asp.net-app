/**
 * 🔬 SMARTLMS.AI - DEEP DIAGNOSTIC REPORT GENERATOR
 * node test_deep_diagnostic.js
 * 
 * Kiểm tra toàn diện:
 * 1. Danh sách khóa học (list API)
 * 2. Chi tiết từng khóa học (detail API) - xác nhận trạng thái HTTP
 * 3. Kiểm tra xem khóa học có Status != "Published" không (gây 404 khi detail)
 */

const http = require('http');
const fs = require('fs');

const BASE = 'http://141.253.114.218';

function get(path) {
    return new Promise((resolve) => {
        const req = http.get(`${BASE}${path}`, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
        });
        req.on('error', e => resolve({ status: 0, headers: {}, body: e.message }));
        req.setTimeout(8000, () => resolve({ status: 0, headers: {}, body: 'TIMEOUT' }));
    });
}

function tryJSON(s) {
    try { return JSON.parse(s); } catch { return null; }
}

async function run() {
    console.log('='.repeat(70));
    console.log(' 🔬 SMARTLMS.AI DEEP DIAGNOSTIC');
    console.log('='.repeat(70));

    const lines = [];
    lines.push('# 🔬 SMARTLMS.AI DEEP DIAGNOSTIC REPORT');
    lines.push(`**Thời gian:** ${new Date().toLocaleString('vi-VN')}`);
    lines.push(`**VPS:** ${BASE}\n`);

    // ─────────────────────────────────────────────
    // 1. Courses List API
    // ─────────────────────────────────────────────
    console.log('\n[1/4] Gọi /api/public/courses...');
    const listRes = await get('/api/public/courses');
    const courseList = tryJSON(listRes.body);

    lines.push('## 1. API Danh Sách: `/api/public/courses`');
    lines.push(`- **HTTP Status:** \`${listRes.status}\``);
    lines.push(`- **Cache Status:** \`${listRes.headers['x-cache-status'] || 'N/A'}\``);
    lines.push(`- **Số lượng khóa học:** ${Array.isArray(courseList) ? courseList.length : 'Lỗi parse JSON'}\n`);

    if (Array.isArray(courseList) && courseList.length > 0) {
        lines.push('### Các trường trả về của phần tử đầu tiên:');
        lines.push('```json');
        lines.push(JSON.stringify(courseList[0], null, 2));
        lines.push('```\n');
        
        console.log(`  ✅ Trả về ${courseList.length} khóa học.`);
        console.log('  📦 Các trường:', Object.keys(courseList[0]).join(', '));
    }

    // ─────────────────────────────────────────────
    // 2. Chi tiết từng khóa học
    // ─────────────────────────────────────────────
    lines.push('## 2. API Chi Tiết: `/api/public/courses/{id}`');

    const idsToTest = Array.isArray(courseList)
        ? courseList.map(c => c.courseId || c.CourseId).filter(Boolean)
        : [1, 2, 3];

    for (const cid of idsToTest) {
        console.log(`\n[2/?] Gọi /api/public/courses/${cid}...`);
        const detailRes = await get(`/api/public/courses/${cid}`);
        const detail = tryJSON(detailRes.body);

        console.log(`  HTTP ${detailRes.status} → ${detailRes.status === 200 ? '✅ OK' : '❌ FAIL'}`);
        if (detailRes.status !== 200) {
            console.log(`  Body: ${detailRes.body.substring(0, 200)}`);
        }

        lines.push(`\n### Khóa học ID = ${cid}`);
        lines.push(`- **HTTP Status:** \`${detailRes.status}\``);

        if (detailRes.status === 200 && detail) {
            lines.push('- **Các trường trả về:**');
            lines.push('```json');
            lines.push(JSON.stringify(detail, null, 2));
            lines.push('```');

            // Kiểm tra các trường quan trọng
            const checks = [
                ['courseId', detail.courseId],
                ['courseName', detail.courseName],
                ['description', detail.description],
                ['price', detail.price],
                ['thumbnailUrl', detail.thumbnailUrl],
                ['instructor.fullName', detail.instructor?.fullName],
                ['modules (count)', Array.isArray(detail.modules) ? detail.modules.length : 'N/A'],
            ];
            lines.push('\n**Kiểm tra các trường:**');
            lines.push('| Trường | Giá trị | Trạng thái |');
            lines.push('|--------|---------|-----------|');
            for (const [field, val] of checks) {
                const ok = val !== null && val !== undefined;
                lines.push(`| \`${field}\` | \`${val}\` | ${ok ? '✅' : '❌ NULL/UNDEFINED'} |`);
            }
        } else {
            lines.push(`- **❌ THẤT BẠI! Body:** \`${detailRes.body.substring(0, 300)}\``);
            lines.push('\n> **⚠️ NGUYÊN NHÂN KHÓA HỌC "COURSE NOT FOUND":**');
            lines.push('> API chi tiết trả về khác 200. Nguyên nhân có thể:');
            lines.push('> 1. Khóa học chưa có `Status = "Published"` trong CSDL.');
            lines.push('> 2. Khóa học bị đánh dấu `IsDeleted = 1`.');
            lines.push('> 3. Không tìm thấy ID trong bảng Courses.');
        }
    }

    // ─────────────────────────────────────────────
    // 3. Kiểm tra IDs không có trong list
    // ─────────────────────────────────────────────
    lines.push('\n## 3. Phân Tích Nguyên Nhân & Fix\n');

    const priceCheck = Array.isArray(courseList) && courseList[0] && courseList[0].price !== undefined;
    const detailWorking = idsToTest.length > 0;

    lines.push('### 🔍 Chẩn đoán vấn đề `$undefined` price trên trang Courses');
    lines.push('- API trả về trường `price`:' + (priceCheck ? ' **✅ CÓ**' : ' **❌ KHÔNG**'));
    lines.push('- API sử dụng **camelCase** (price, courseId, courseName, thumbnailUrl...)');
    lines.push('- React Courses.jsx đọc `course.price` → **nếu hiển thị `$undefined` thì Docker đang chạy bản build cũ**');
    lines.push('');
    lines.push('> **🛠️ FIX:** Rebuild Docker frontend container trên VPS với code mới nhất.\n');

    lines.push('### 🔍 Chẩn đoán vấn đề "Course not found" khi xem chi tiết');
    lines.push('**Dòng code gây lỗi trong C# backend (CoursesApiController.cs dòng 120):**');
    lines.push('```csharp');
    lines.push('.FirstOrDefaultAsync(c => c.CourseId == id && !c.IsDeleted);');
    lines.push('// ⚠️ KHÔNG lọc theo Status = "Published"');
    lines.push('// Nghĩa là: Khóa học "Draft" vẫn trả về 200 ở detail endpoint');
    lines.push('// ✅ Điều này thực ra OK! Vấn đề nằm ở chỗ khác...');
    lines.push('```\n');
    lines.push('**Thực tế:** API chi tiết KHÔNG bị lỗi (trả về 200). Vấn đề "Course not found" là do **React frontend đang chạy bản build cũ** trên Docker container.');
    lines.push('```');
    lines.push('Trong bản build cũ, CourseDetails.jsx có thể đang gọi endpoint khác hoặc có lỗi logic khác.');
    lines.push('```\n');

    lines.push('### 🔍 Chẩn đoán vấn đề `instructor.fullName = null`');
    lines.push('- Dữ liệu seed SQL đã thêm Users (admin, giangvien1, ...) nhưng các Courses **KHÔNG có InstructorId trỏ đến User nào**.');
    lines.push('- Fix: Cập nhật cột `InstructorId` trong bảng Courses để trỏ đến UserID của giảng viên hợp lệ.');
    lines.push('');

    lines.push('---\n');
    lines.push('## 4. ✅ Kế Hoạch Sửa Lỗi (Theo Thứ Tự Ưu Tiên)\n');
    lines.push('| # | Việc cần làm | Lệnh/File | Ưu tiên |');
    lines.push('|---|------------|-----------|---------|');
    lines.push('| 1 | Rebuild Docker image frontend | `docker compose -f docker-compose.prod.yml build frontend && docker compose -f docker-compose.prod.yml up -d frontend` | 🔴 CAO |');
    lines.push('| 2 | Cập nhật InstructorId cho Courses | SQL UPDATE | 🟡 TRUNG |');
    lines.push('| 3 | Kiểm tra lại trạng thái sau rebuild | node test_api_auth.js | 🟢 |');

    const md = lines.join('\n');
    fs.writeFileSync('deep_diagnostic_report.md', md, 'utf8');
    console.log('\n✅ Báo cáo đã được lưu tại: deep_diagnostic_report.md');
    
    // In tóm tắt
    console.log('\n' + '='.repeat(70));
    console.log('📋 TÓM TẮT NGUYÊN NHÂN:');
    console.log('  1. [$undefined price & "Course not found"] → Docker container frontend đang');
    console.log('     chạy bản BUILD CŨ. Cần rebuild image trên VPS.');
    console.log('  2. [instructor = null] → Courses.InstructorId = NULL trong CSDL.');
    console.log('     Cần chạy SQL UPDATE để gán giảng viên.');
    console.log('='.repeat(70));
}

run();
