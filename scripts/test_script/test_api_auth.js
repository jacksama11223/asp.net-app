/**
 * 🛡️ SMARTLMS.AI - SYSTEM AUTH & COURSES OMNI-DIAGNOSTIC
 * Chạy từ máy cá nhân: node test_api_auth.js
 * 
 * Mục đích:
 * 1. Kiểm chứng và in chi tiết phản hồi của API Courses (xem dữ liệu đã lên chưa).
 * 2. Thử đăng nhập lần lượt 4 tài khoản mẫu: admin, giangvien1, hocvien1, hocvien2 với mật khẩu '1'.
 * 3. Kiểm tra mã trạng thái, header, và nội dung chi tiết phản hồi từ VPS A để bóc tách lỗi.
 */

const http = require('http');

const VPS_API_BASE = 'http://141.253.114.218';

console.log("==========================================================================");
console.log(" 🌐 SMARTLMS.AI AUTH & COURSES OMNI-DIAGNOSTIC");
console.log("==========================================================================\n");

function makeRequest(urlPath, method, payload = null) {
    return new Promise((resolve) => {
        const options = {
            method: method,
            headers: {}
        };
        
        let bodyData = null;
        if (payload) {
            bodyData = JSON.stringify(payload);
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(bodyData);
        }
        
        const req = http.request(`${VPS_API_BASE}${urlPath}`, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });
        
        req.on('error', (err) => {
            resolve({
                status: 0,
                headers: {},
                body: err.message
            });
        });
        
        if (bodyData) {
            req.write(bodyData);
        }
        req.end();
    });
}

async function startDiagnostic() {
    // --------------------------------------------------------------------------
    // PHẦN 1: KIỂM TRA KHÓA HỌC (COURSES API)
    // --------------------------------------------------------------------------
    console.log("🔵 PHẦN 1: KIỂM TRA DANH SÁCH KHÓA HỌC (COURSES API)...");
    const coursesRes = await makeRequest('/api/public/courses', 'GET');
    console.log(`   👉 HTTP Status: ${coursesRes.status}`);
    try {
        const courses = JSON.parse(coursesRes.body);
        console.log(`   👉 Kết quả: Phát hiện ${courses.length} khóa học mẫu trong CSDL.`);
        if (courses.length > 0) {
            courses.forEach(c => {
                console.log(`      * [ID: ${c.CourseId || c.courseId}] Tên: ${c.CourseName || c.courseName} - Giá: ${c.Price || c.price}`);
            });
        }
    } catch (e) {
        console.log(`   ❌ Phản hồi không phải JSON: ${coursesRes.body}`);
    }
    
    // --------------------------------------------------------------------------
    // PHẦN 2: THỬ THÁCH ĐĂNG NHẬP 4 TÀI KHOẢN MẪU
    // --------------------------------------------------------------------------
    console.log("\n🔑 PHẦN 2: KIỂM THỬ XÁC THỰC (LOGIN API)...");
    
    const accounts = [
        { name: 'Quản trị viên (Admin)', username: 'admin' },
        { name: 'Giảng viên (Instructor)', username: 'giangvien1' },
        { name: 'Học viên 1 (Student)', username: 'hocvien1' },
        { name: 'Học viên 2 (Student)', username: 'hocvien2' }
    ];
    
    for (const acc of accounts) {
        console.log(`\n👉 Thử đăng nhập tài khoản [${acc.name}] (Username: '${acc.username}', Password: '1')...`);
        const loginRes = await makeRequest('/api/auth/token', 'POST', {
            username: acc.username,
            password: '1'
        });
        
        console.log(`   * HTTP Status: ${loginRes.status}`);
        console.log(`   * Phản hồi lỗi chi tiết: ${loginRes.body}`);
    }
    
    // --------------------------------------------------------------------------
    // PHẦN 3: NỘI SOI SÂU CỦA HỆ THỐNG
    // --------------------------------------------------------------------------
    console.log("\n🛠️ PHẦN 3: HƯỚNG DẪN KIỂM TRA SÂU TRÊN VPS A...");
    console.log("Nếu toàn bộ tài khoản ở Phần 2 báo lỗi 401, nguyên nhân chỉ có thể là:");
    console.log("1. Chưa khởi động lại container backend C# để xóa RAM cache liên quan tới kết nối DB.");
    console.log("   👉 Lệnh chạy trên VPS A: sudo docker restart aspnet-app-backend-1 aspnet-app-web-1");
    console.log("2. Cột EmailHash trong DB bị trống (do hệ thống sử dụng Blind Index để đối chiếu email/username).");
    console.log("   👉 Để kiểm tra dữ liệu thực tế đã nạp trong bảng Users trên VPS A, hãy chạy:");
    console.log("      sudo docker exec -i smartlms-db-prod mariadb -uroot -pYourStrongPassword123! SmartLMS -e \"SELECT UserId, Username, Email, PasswordHash, Status FROM Users;\"");
}

startDiagnostic();
