const http = require('http');
const https = require('https');

async function checkUrl(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, { timeout: 5000 }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({ 
                    success: res.statusCode >= 200 && res.statusCode < 400, 
                    status: res.statusCode,
                    bodyLength: data.length
                });
            });
        });
        
        req.on('timeout', () => {
            req.abort();
            resolve({ success: false, status: 'TIMEOUT', bodyLength: 0 });
        });
        
        req.on('error', (err) => {
            resolve({ success: false, status: err.code || 'ERROR', bodyLength: 0 });
        });
    });
}

async function runIntegrationTest() {
    console.log("==========================================");
    console.log("🚀 SMARTLMS COMMUNITY MVC INTEGRATION TEST");
    console.log("==========================================");

    // List of endpoints to test
    const endpoints = [
        { name: 'Core API (Port 5181)', url: 'http://localhost:5181/health', type: 'api' },
        { name: 'Main App (Port 80)', url: 'http://localhost:80/', type: 'web' },
        { name: 'Community QA (Port 3080)', url: 'http://localhost:3080/Community/QA', type: 'web' },
        { name: 'Community Groups (Port 3080)', url: 'http://localhost:3080/Community/Groups', type: 'web' },
        { name: 'Community Events (Port 3080)', url: 'http://localhost:3080/Community/Events', type: 'web' },
        { name: 'Community Resources (Port 3080)', url: 'http://localhost:3080/Community/Resources', type: 'web' },
        { name: 'Community Members (Port 3080)', url: 'http://localhost:3080/Community/Members', type: 'web' },
        { name: 'Community Leaderboard (Port 3080)', url: 'http://localhost:3080/Community/Leaderboard', type: 'web' },
        { name: 'Community AI Mentor (Port 3080)', url: 'http://localhost:3080/Community/Mentor', type: 'web' },
    ];

    let passedCount = 0;
    
    for (const ep of endpoints) {
        process.stdout.write(`Testing ${ep.name}... `);
        const result = await checkUrl(ep.url);
        
        if (result.success) {
            console.log(`✅ PASS (${result.status}) - ${result.bodyLength} bytes received`);
            passedCount++;
        } else {
            console.log(`❌ FAIL (Status: ${result.status})`);
        }
    }
    
    console.log("------------------------------------------");
    console.log(`TEST SUMMARY: ${passedCount}/${endpoints.length} passed.`);
    
    if (passedCount < endpoints.length) {
        console.log("⚠️ LƯU Ý: Một số Endpoint không phản hồi. Điều này có thể do Container chưa chạy, hoặc bạn cần Start App trước khi test (docker compose up).");
    } else {
        console.log("🎉 TẤT CẢ CÁC TRANG RAZOR MVC MỚI ĐỀU ĐÃ HOẠT ĐỘNG VÀ TÍCH HỢP TỐT!");
    }
}

runIntegrationTest();
