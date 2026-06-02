/**
 * 🛡️ SMARTLMS.AI - DYNAMIC COURSES API REPORT & DIAGNOSTIC
 * Chạy từ máy cá nhân: node test_courses_detail.js
 * 
 * Mục đích:
 * 1. Gọi trực tiếp API /api/public/courses và /api/public/courses/1 để lấy dữ liệu thực tế đang trả về.
 * 2. Phân tích định dạng dữ liệu chi tiết của từng trường trả về.
 * 3. Ghi kết quả chi tiết dưới dạng một file Markdown đẹp mắt: courses_api_report.md.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const VPS_API_BASE = 'http://141.253.114.218';

console.log("==========================================================================");
console.log(" 🌐 SMARTLMS.AI COURSES & DETAILS API DIAGNOSTIC");
console.log("==========================================================================\n");

function makeRequest(urlPath) {
    return new Promise((resolve) => {
        http.get(`${VPS_API_BASE}${urlPath}`, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        }).on('error', (err) => {
            resolve({
                status: 0,
                headers: {},
                body: err.message
            });
        });
    });
}

async function runReport() {
    console.log("📡 Đang lấy dữ liệu danh sách khóa học (/api/public/courses)...");
    const listRes = await makeRequest('/api/public/courses');
    
    console.log("📡 Đang lấy dữ liệu chi tiết khóa học ID 1 (/api/public/courses/1)...");
    const detail1Res = await makeRequest('/api/public/courses/1');
    
    console.log("📡 Đang lấy dữ liệu chi tiết khóa học ID 2 (/api/public/courses/2)...");
    const detail2Res = await makeRequest('/api/public/courses/2');

    // Tạo báo cáo Markdown
    let mdReport = `# 🛡️ BÁO CÁO NỘI SOI & PHÂN TÍCH API KHÓA HỌC (COURSES API REPORT)

**Thời gian tạo báo cáo:** ${new Date().toLocaleString('vi-VN')}
**Địa chỉ máy chủ kiểm tra:** ${VPS_API_BASE}

---

## 🗂️ 1. API Danh Sách Khóa Học: \`/api/public/courses\`
*   **Trạng thái HTTP:** \`${listRes.status}\`
*   **Node phản hồi (Header X-Server-Node):** \`${listRes.headers['x-server-node'] || 'Không phát hiện (Qua Load Balancer)'}\`
*   **Phản hồi thô:**
\`\`\`json
${JSON.stringify(tryParseJson(listRes.body), null, 4)}
\`\`\`

---

## 📄 2. API Chi Tiết Khóa Học ID 1: \`/api/public/courses/1\`
*   **Trạng thái HTTP:** \`${detail1Res.status}\`
*   **Phản hồi thô:**
\`\`\`json
${JSON.stringify(tryParseJson(detail1Res.body), null, 4)}
\`\`\`

---

## 📄 3. API Chi Tiết Khóa Học ID 2: \`/api/public/courses/2\`
*   **Trạng thái HTTP:** \`${detail2Res.status}\`
*   **Phản hồi thô:**
\`\`\`json
${JSON.stringify(tryParseJson(detail2Res.body), null, 4)}
\`\`\`

---

## 🛠️ 4. Phân Tích Nguyên Nhân & Hướng Dẫn Sửa Lỗi
`;

    if (detail1Res.status !== 200) {
        mdReport += `### 🚨 LỖI CHI TIẾT KHÓA HỌC (HTTP ${detail1Res.status})
*   **Hiện tượng:** Trang Frontend thông báo 'fail' khi xem chi tiết.
*   **Nguyên nhân kịch bản:** API chi tiết khóa học trả về mã lỗi \`${detail1Res.status}\`.
*   **Chẩn đoán:**
    1.  Khóa học với ID = 1 không tồn tại trong CSDL, hoặc đang ở trạng thái \`IsDeleted = 1\`.
    2.  Lỗi biên dịch cấu trúc lúc Mapping thực thể (ví dụ: Giảng viên của khóa học có ID không tồn tại trong bảng Users khiến việc Eager Load \`Include(c => c.Instructor)\` bị lỗi, hoặc lỗi liên quan đến Module/Lesson).
`;
    } else {
        mdReport += `### ✅ API TRẢ VỀ THÀNH CÔNG!
*   Dữ liệu trả về đầy đủ. Nếu Frontend vẫn báo 'fail', vui lòng kiểm tra logic định dạng JSON mà Frontend đang yêu cầu đối chiếu xem có khớp 100% các trường: \`courseId\`, \`courseName\`, \`description\`, \`price\`, \`thumbnailUrl\`, \`rating\`, \`ratingCount\`, \`instructor\`, \`modules\` hay không.
`;
    }

    fs.writeFileSync(path.join(__dirname, 'courses_api_report.md'), mdReport, 'utf8');
    console.log("\n✅ BÁO CÁO ĐÃ ĐƯỢC GHI THÀNH CÔNG TẠI: courses_api_report.md");
    
    // In kết quả tóm tắt ra màn hình
    console.log(`\n📊 TÓM TẮT TRẠNG THÁI API:`);
    console.log(`   * /api/public/courses: HTTP ${listRes.status} (Length: ${listRes.body.length} bytes)`);
    console.log(`   * /api/public/courses/1: HTTP ${detail1Res.status} (Body: ${detail1Res.body.substring(0, 100)}...)`);
    console.log(`   * /api/public/courses/2: HTTP ${detail2Res.status} (Body: ${detail2Res.body.substring(0, 100)}...)`);
}

function tryParseJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return { raw: str };
    }
}

runReport();
