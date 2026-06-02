const http = require('http');

// Target endpoint (không bị chặn Rate Limit bởi Nginx)
const URL = 'http://141.253.114.218/swagger/index.html'; 
const TOTAL_REQUESTS = 100000;
const CONCURRENCY = 300; // Số lượng request song song tại mọi thời điểm

let completed = 0;
let results = {
    "VPS A (Local)": 0,
    "VPS B (Remote)": 0,
    "Lỗi/Từ chối": 0
};

let activeRequests = 0;
let requestIndex = 0;
const startTime = Date.now();

console.log(`🚀 BẮT ĐẦU CHIẾN DỊCH LOAD TEST 100,000 REQUESTS...`);
console.log(`⚡ Mức độ: ${CONCURRENCY} truy cập cùng một lúc`);
console.log(`Đang càn quét hệ thống... Vui lòng chờ...\n`);

function sendRequest() {
    if (requestIndex >= TOTAL_REQUESTS) return;
    
    requestIndex++;
    activeRequests++;

    const req = http.get(URL, { agent: new http.Agent({ keepAlive: true, maxSockets: 500 }) }, (res) => {
        // Phân tích Load Balancer
        const upstream = res.headers['x-server-node'] || res.headers['X-Server-Node'];
        
        if (!upstream || res.statusCode !== 200) {
            results["Lỗi/Từ chối"]++;
        } else if (upstream.includes('145.241.160.156')) {
            results["VPS B (Remote)"]++;
        } else {
            results["VPS A (Local)"]++;
        }

        res.on('data', () => {}); // Consume data to free memory
        res.on('end', finishRequest);
    });

    req.on('error', (err) => {
        results["Lỗi/Từ chối"]++;
        finishRequest();
    });
}

function finishRequest() {
    activeRequests--;
    completed++;

    // In tiến độ mỗi 2000 request để khỏi spam màn hình
    if (completed % 2000 === 0) {
        const percent = ((completed / TOTAL_REQUESTS) * 100).toFixed(1);
        console.log(`[Tiến độ ${percent}%] Đã xử lý: ${completed}/${TOTAL_REQUESTS} | Lỗi: ${results["Lỗi/Từ chối"]}`);
    }

    if (completed === TOTAL_REQUESTS) {
        printSummary();
    } else {
        // Tiếp tục bắn để duy trì độ sát thương
        sendRequest();
    }
}

function printSummary() {
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    const rps = (TOTAL_REQUESTS / timeTaken).toFixed(0);

    console.log("\n=================================");
    console.log(`🏁 KẾT QUẢ LOAD TEST (${timeTaken} giây)`);
    console.log(`⚡ Tốc độ xử lý: ${rps} Requests/giây`);
    console.log("=================================");
    console.log(`🏠 Số lượng xử lý tại VPS A: ${results["VPS A (Local)"]}`);
    console.log(`🌐 Số lượng chuyển cho VPS B: ${results["VPS B (Remote)"]}`);
    console.log(`⚠️ Số lượng lỗi / quá tải: ${results["Lỗi/Từ chối"]}`);
    
    // Tính toán Tỷ lệ chia tải (Trọng số cấu hình là 1 (VPS A) : 3 (VPS B))
    const totalSuccess = results["VPS A (Local)"] + results["VPS B (Remote)"];
    if (totalSuccess > 0) {
        const percentA = ((results["VPS A (Local)"] / totalSuccess) * 100).toFixed(1);
        const percentB = ((results["VPS B (Remote)"] / totalSuccess) * 100).toFixed(1);
        console.log(`\n⚖️ TỈ LỆ CHIA TẢI THỰC TẾ:`);
        console.log(`- VPS A gánh: ${percentA}%`);
        console.log(`- VPS B gánh: ${percentB}%`);
    }
}

// Bắt đầu nhồi đạn
for (let i = 0; i < CONCURRENCY; i++) {
    sendRequest();
}
