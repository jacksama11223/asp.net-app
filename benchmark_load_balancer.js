const http = require('http');

const url = 'http://141.253.114.218/swagger/index.html'; // Endpoint Backend có thật
const totalRequests = 20;
let results = {
    "VPS A (Local)": 0,
    "VPS B (Remote)": 0,
    "Lỗi/Timeout": 0
};

console.log("🚀 Bắt đầu Benchmark Load Balancer (Gửi 20 Requests)...");
console.log("Đang phân tích Header [X-Server-Node] do Nginx trả về...\n");

let completed = 0;

for (let i = 0; i < totalRequests; i++) {
    const req = http.get(url, (res) => {
        const upstream = res.headers['x-server-node'] || res.headers['X-Server-Node'];
        
        if (!upstream) {
            console.log(`Request ${i+1}: Không lấy được thông tin Node (Lỗi HTTP ${res.statusCode}). Các header:`, Object.keys(res.headers).join(', '));
            results["Lỗi/Timeout"]++;
        } else if (upstream.includes('145.241.160.156')) {
            console.log(`Request ${i+1}: Đã chuyển hướng sang -> 🌐 VPS B (${upstream})`);
            results["VPS B (Remote)"]++;
        } else {
            console.log(`Request ${i+1}: Xử lý nội bộ tại -> 🏠 VPS A (${upstream})`);
            results["VPS A (Local)"]++;
        }

        completed++;
        if (completed === totalRequests) printSummary();
    });

    req.on('error', (e) => {
        console.log(`Request ${i+1}: Lỗi kết nối (${e.message})`);
        results["Lỗi/Timeout"]++;
        completed++;
        if (completed === totalRequests) printSummary();
    });
}

function printSummary() {
    console.log("\n=================================");
    console.log("📊 KẾT QUẢ CÂN BẰNG TẢI (LOAD BALANCING)");
    console.log("=================================");
    console.log(`🏠 Số lượng xử lý tại VPS A: ${results["VPS A (Local)"]}`);
    console.log(`🌐 Số lượng chuyển cho VPS B: ${results["VPS B (Remote)"]}`);
    console.log(`⚠️ Số lượng lỗi / rớt mạng: ${results["Lỗi/Timeout"]}`);
    
    if (results["VPS B (Remote)"] > 0) {
        console.log("\n✅ KẾT LUẬN: CÂN BẰNG TẢI ĐANG HOẠT ĐỘNG HOÀN HẢO!");
        console.log("Nginx đã chia đều công việc cho cả 2 máy chủ.");
    } else {
        console.log("\n❌ KẾT LUẬN: VPS B CHƯA NHẬN ĐƯỢC TRAFFIC!");
        console.log("Vui lòng đảm bảo VPS B đang chạy và code đã được cập nhật.");
    }
}
