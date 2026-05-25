const http = require('http');

const URL = 'http://141.253.114.218/swagger/index.html';
const TOTAL_REQUESTS = 10000;
const CONCURRENCY = 200; // Bắn 200 request cùng lúc (Mô phỏng đợt truy cập ồ ạt kiểu Flash Sale)

let completed = 0;
let errors = 0;
let success = 0;
let startTime = Date.now();

console.log(`🚀 BẮT ĐẦU CHIẾN DỊCH LOAD TEST (BOMBING) API...`);
console.log(`🎯 Mục tiêu: ${URL}`);
console.log(`🔥 Tổng lực lượng: ${TOTAL_REQUESTS} requests`);
console.log(`⚡ Mức độ hung hãn: ${CONCURRENCY} người click cùng 1 giây\n`);
console.log(`Mẹo: Hãy mở ngay Terminal của VPS và gõ liên tục lệnh [ free -h ] hoặc [ watch free -h ] để xem cột Swap có bị nhảy số lên không nhé!\n`);

let activeRequests = 0;
let requestIndex = 0;

function sendRequest() {
    if (requestIndex >= TOTAL_REQUESTS) return;

    requestIndex++;
    activeRequests++;

    const reqId = requestIndex;
    
    const req = http.get(URL, (res) => {
        // Phải consume data để giải phóng bộ nhớ
        res.on('data', () => {}); 
        res.on('end', () => {
            success++;
            finishRequest(reqId);
        });
    });

    req.on('error', (err) => {
        errors++;
        finishRequest(reqId);
    });
}

function finishRequest(reqId) {
    activeRequests--;
    completed++;

    // In tiến độ mỗi 100 request
    if (completed % 100 === 0) {
        console.log(`[Tiến độ] Đã bắn ${completed}/${TOTAL_REQUESTS} requests... (Thành công: ${success}, Lỗi: ${errors})`);
    }

    // Nếu đã xong hết
    if (completed === TOTAL_REQUESTS) {
        let timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n================================`);
        console.log(`🏁 CHIẾN DỊCH LOAD TEST ĐÃ KẾT THÚC!`);
        console.log(`================================`);
        console.log(`⏱️ Thời gian phá hoại: ${timeTaken} giây`);
        console.log(`✅ Thành công: ${success}`);
        console.log(`❌ Lỗi (Bị từ chối do quá tải): ${errors}`);
        console.log(`\n👉 Giờ bạn hãy gõ [ free -h ] trên VPS một lần nữa. Nếu cột Swap KHÔNG TĂNG, nghĩa là Vòng Kim Cô (250MB) và Garbage Collector đã bảo vệ hệ thống thành công!`);
    } else {
        // Tiếp tục bắn để duy trì mức Concurrency
        sendRequest();
    }
}

// Bắt đầu nhồi đợt đạn đầu tiên
for (let i = 0; i < CONCURRENCY; i++) {
    sendRequest();
}
