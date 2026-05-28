const http = require('http');

const TARGET_HOST = '141.253.114.218';
const TARGET_PORT = 80;

// Đổi path ở đây để test endpoint khác nhau
const TARGET_PATH = '/api/public/courses'; // Endpoint công khai → test Nginx Caching

const TOTAL_REQUESTS = 15000; // Tăng lượng đạn để kéo dài thời gian test
const CONCURRENT = 500; // Nã 500 viên đạn CÙNG 1 GIÂY để đè bẹp CPU VPS-A

let completed = 0;
let totalSuccess = 0;
let totalFail = 0;

// Thống kê theo Node (IP:PORT của backend)
const nodeStats = {};    // { ip: count }
const nodeTimings = {};  // { ip: [ms, ms, ...] }

function recordNode(node, ms) {
    nodeStats[node] = (nodeStats[node] || 0) + 1;
    if (!nodeTimings[node]) nodeTimings[node] = [];
    nodeTimings[node].push(ms);
}

function makeRequest() {
    return new Promise((resolve) => {
        const startMs = Date.now();
        
        // Thêm tham số random để PHÁ VỠ NGINX CACHE
        // Bắt buộc Backend phải dùng CPU để xử lý thay vì lấy từ RAM Nginx
        const randomQuery = `?nocache=${Math.random()}`;
        
        const req = http.request({
            host: TARGET_HOST,
            port: TARGET_PORT,
            path: TARGET_PATH + randomQuery,
            method: 'GET',
        }, (res) => {
            const ms = Date.now() - startMs;
            const node = res.headers['x-server-node'];
            const status = res.status || res.statusCode;

            res.on('data', () => {});
            res.on('end', () => {
                completed++;
                if (status >= 200 && status < 500) {
                    totalSuccess++;
                    // Nếu có header thì ghi theo node, không thì ghi "No-Header"
                    recordNode(node ? node.split(', ').pop() : `HTTP-${status}`, ms);
                } else {
                    totalFail++;
                    recordNode(`Error-${status}`, ms);
                }
                resolve();
            });
        });

        req.setTimeout(8000, () => {
            req.destroy();
            completed++;
            totalFail++;
            recordNode('Timeout', 8000);
            resolve();
        });

        req.on('error', () => {
            completed++;
            totalFail++;
            recordNode('ConnError', Date.now() - startMs);
            resolve();
        });

        req.end();
    });
}

async function runTest() {
    console.log(`🚀 SmartLMS Load Balancing Test`);
    console.log(`🎯 Target: http://${TARGET_HOST}${TARGET_PATH}`);
    console.log(`📦 ${TOTAL_REQUESTS} requests | ${CONCURRENT} concurrent\n`);

    const startTime = Date.now();

    const interval = setInterval(() => {
        console.clear();
        console.log(`📊 REALTIME LOAD BALANCING (Nginx)`);
        console.log(`-----------------------------------`);

        // Bảng kết quả kèm avg response time
        const rows = {};
        for (const [node, count] of Object.entries(nodeStats)) {
            const timings = nodeTimings[node] || [];
            const avg = timings.length ? Math.round(timings.reduce((a,b)=>a+b,0)/timings.length) : 0;
            rows[node] = { requests: count, avg_ms: `${avg}ms` };
        }
        console.table(rows);
        console.log(`\n✅ Success: ${totalSuccess} | ❌ Fail/Timeout: ${totalFail}`);
        console.log(`⏳ Đã xử lý: ${completed} / ${TOTAL_REQUESTS} requests`);
    }, 500);

    for (let i = 0; i < TOTAL_REQUESTS; i += CONCURRENT) {
        const batch = [];
        for (let j = 0; j < CONCURRENT && i + j < TOTAL_REQUESTS; j++) {
            batch.push(makeRequest());
        }
        await Promise.all(batch);
    }

    clearInterval(interval);

    const timeTaken = (Date.now() - startTime) / 1000;
    console.clear();
    console.log(`✅ TEST HOÀN TẤT — ${timeTaken.toFixed(2)}s | ${Math.round(TOTAL_REQUESTS / timeTaken)} req/sec`);
    console.log(`-----------------------------------`);

    const rows = {};
    for (const [node, count] of Object.entries(nodeStats)) {
        const timings = nodeTimings[node] || [];
        const avg = timings.length ? Math.round(timings.reduce((a,b)=>a+b,0)/timings.length) : 0;
        const pct = ((count / TOTAL_REQUESTS) * 100).toFixed(1);
        rows[node] = { requests: count, pct: `${pct}%`, avg_ms: `${avg}ms` };
    }
    console.table(rows);
    console.log(`\n✅ Success: ${totalSuccess} | ❌ Fail/Timeout: ${totalFail}`);
}

runTest();

