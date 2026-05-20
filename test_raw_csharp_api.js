/**
 * 🛡️ SMARTLMS.AI - RAW API INTROSPECTOR
 * Chạy từ máy cá nhân: node test_raw_csharp_api.js
 * 
 * Mục đích:
 * 1. Gọi API /api/public/courses và in ra chuỗi RAW JSON chưa qua định dạng của Node.js.
 * 2. Xác minh xem các trường trả về thực tế là PascalCase (CourseId, Price...) hay camelCase (courseId, price...).
 */

const http = require('http');

const VPS_API_BASE = 'http://141.253.114.218';

console.log("==========================================================================");
console.log(" 🌐 SMARTLMS.AI RAW API INTROSPECTOR");
console.log("==========================================================================\n");

http.get(`${VPS_API_BASE}/api/public/courses`, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log("📊 TRẠNG THÁI HTTP:", res.statusCode);
        console.log("📊 PHẢN HỒI THÔ TỪ SERVER C# (RAW BODY):");
        console.log("--------------------------------------------------------------------------");
        console.log(data);
        console.log("--------------------------------------------------------------------------");
    });
}).on('error', (err) => {
    console.error("❌ Lỗi kết nối:", err.message);
});
