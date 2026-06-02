/**
 * 🛡️ SMARTLMS.AI - SYSTEM COURSES API DIAGNOSTIC
 * Chạy từ máy cá nhân: node test_courses_api.js
 * 
 * Mục đích:
 * 1. Gọi trực tiếp API /api/public/courses để lấy dữ liệu thực tế đang trả về.
 * 2. Phân tích xem API có đang trả về bộ nhớ đệm (Cache) trống hay không.
 * 3. Hướng dẫn xóa sạch bộ nhớ đệm Redis & RAM trên VPS để tải dữ liệu mới từ CSDL.
 */

const http = require('http');

const VPS_API_BASE = 'http://141.253.114.218';

console.log("==========================================================================");
console.log(" 🌐 SMARTLMS.AI COURSES API DIAGNOSTIC");
console.log("==========================================================================\n");

function fetchCourses() {
    return new Promise((resolve) => {
        http.get(`${VPS_API_BASE}/api/public/courses`, (res) => {
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

async function runDiagnostic() {
    console.log("📡 Đang truy vấn API Courses từ VPS...");
    const result = await fetchCourses();
    
    console.log(`\n📊 Kết Quả Trả Về (HTTP Status: ${result.status})`);
    console.log(`   Node Xử Lý (Header X-Server-Node): ${result.headers['x-server-node'] || 'Không rõ'}`);
    console.log(`   Độ Dài Phản Hồi: ${result.body.length} bytes`);
    
    try {
        const parsed = JSON.parse(result.body);
        console.log(`   Số lượng khóa học nhận được: ${Array.isArray(parsed) ? parsed.length : 0}`);
        if (Array.isArray(parsed) && parsed.length > 0) {
            console.log("\n✅ KHÓA HỌC HIỆN TẠI:");
            parsed.forEach((c, idx) => {
                console.log(`      [${idx + 1}] ID: ${c.CourseId || c.courseId} - Tên: ${c.CourseName || c.courseName} - Giá: ${c.Price || c.price}`);
            });
        } else {
            console.log("\n🚨 CẢNH BÁO: Phản hồi rỗng (0 khóa học)!");
            console.log("   👉 Lý do: API của ngài dùng cơ chế cache 3 lớp (RAM nội bộ của C# backend & Redis Cache).");
            console.log("   👉 Vì vừa truncate/nạp CSDL mới, bộ nhớ đệm (Cache) cũ vẫn còn đang lưu danh sách trống.");
            console.log("\n🛠️ HƯỚNG DẪN KHẮC PHỤC (Chạy trên VPS A):");
            console.log("   Lệnh 1: Xóa sạch bộ nhớ đệm Redis:");
            console.log("      sudo docker exec -i aspnet-app-redis-1 redis-cli -a YourRedisPass flushall");
            console.log("   Lệnh 2: Khởi động lại container backend để xóa bộ nhớ đệm RAM nội bộ C#:");
            console.log("      sudo docker restart aspnet-app-backend-1 aspnet-app-web-1");
        }
    } catch (e) {
        console.log("   ❌ Phản hồi không phải dạng JSON hoặc lỗi kết nối:", result.body);
    }
}

runDiagnostic();
