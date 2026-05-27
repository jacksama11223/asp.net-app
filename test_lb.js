const http = require('http');

// Bắn vào Endpoint API để Nginx chia tải cho các node backend
const URL = 'http://141.253.114.218/Account/Login'; 
const TOTAL_REQUESTS = 500; // Tổng số đạn
const CONCURRENT = 100; // Số súng bắn cùng lúc

let completed = 0;
const stats = {};

async function makeRequest() {
    return new Promise((resolve) => {
        const req = http.get(URL, (res) => {
            // Lấy IP của VPS/Container vừa xử lý request từ Header của Nginx
            const node = res.headers['x-server-node'] || 'Failed/Timeout';
            
            // Nếu có nhiều IP do retry, chỉ lấy IP cuối cùng
            const finalNode = node.split(', ').pop();
            stats[finalNode] = (stats[finalNode] || 0) + 1;
            
            completed++;
            res.on('data', () => {});
            res.on('end', resolve);
        });
        
        req.on('error', (err) => {
            stats['Error/Dropped'] = (stats['Error/Dropped'] || 0) + 1;
            completed++;
            resolve();
        });
        
        req.setTimeout(2000, () => {
            req.destroy();
            stats['Timeout'] = (stats['Timeout'] || 0) + 1;
        });
    });
}

async function runTest() {
    console.log(`🚀 Đang khởi động dàn phóng...`);
    console.log(`Mục tiêu: ${URL}`);
    console.log(`Số lượng: ${TOTAL_REQUESTS} requests | Đồng thời: ${CONCURRENT}\n`);
    
    const startTime = Date.now();
    
    // Cập nhật bảng realtime mỗi 500ms
    const interval = setInterval(() => {
        console.clear();
        console.log(`📊 REALTIME LOAD BALANCING (Nginx)`);
        console.log(`-----------------------------------`);
        console.table(stats);
        console.log(`\n⏳ Đã xử lý: ${completed} / ${TOTAL_REQUESTS} requests`);
    }, 500);

    // Chạy song song
    for (let i = 0; i < TOTAL_REQUESTS; i += CONCURRENT) {
        const batch = [];
        for (let j = 0; j < CONCURRENT && i + j < TOTAL_REQUESTS; j++) {
            batch.push(makeRequest());
        }
        await Promise.all(batch);
    }

    clearInterval(interval);
    
    // Kết quả cuối cùng
    const timeTaken = (Date.now() - startTime) / 1000;
    console.clear();
    console.log(`✅ TEST HOÀN TẤT`);
    console.log(`-----------------------------------`);
    console.table(stats);
    console.log(`\n⏱ Tổng thời gian: ${timeTaken.toFixed(2)} giây`);
    console.log(`🔥 Tốc độ trung bình: ${(TOTAL_REQUESTS / timeTaken).toFixed(0)} requests/sec`);
}

runTest();
