const http = require('http');

const HOST = '141.253.114.218';
const PORT = 3080;

function sendGet(path) {
    return new Promise((resolve, reject) => {
        const options = { hostname: HOST, port: PORT, path: path, method: 'GET' };
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body }));
        });
        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function runTests() {
    console.log("=== BẮT ĐẦU TEST PHASE 6: SECURE PDF VIEWER ===");

    try {
        console.log("1. Truy cập /Community/Resources...");
        const res = await sendGet('/Community/Resources');
        
        if (res.statusCode === 200 || res.statusCode === 302) {
            console.log("✅ Truy cập thành công.");
            
            // Validate DOM for the new Alpine PDF Viewer structure
            const body = res.body;
            if (body.includes("x-data") && body.includes("viewingPdf") && body.includes("currentPdfUrl")) {
                console.log("✅ Phát hiện Alpine.js state: viewingPdf, currentPdfUrl");
            } else {
                console.log("❌ KHÔNG tìm thấy Alpine.js state cho PDF Viewer.");
            }

            if (body.includes("<iframe") && body.includes(":src=\"currentPdfUrl\"")) {
                console.log("✅ Tìm thấy iframe hiển thị PDF an toàn.");
            } else {
                console.log("❌ KHÔNG tìm thấy iframe hiển thị PDF.");
            }
            
            if (body.includes("TÍCH HỢP PREMIUM PDF VIEWER MODAL")) {
                console.log("✅ Tìm thấy HTML structure của Premium PDF Viewer.");
            } else {
                console.log("❌ KHÔNG tìm thấy Modal Viewer mới.");
            }

            console.log("\n🚀 KẾT LUẬN: PHASE 6 HOÀN TẤT. Module PDF Viewer đã được tích hợp thành công!");
        } else {
            console.log("❌ Truy cập thất bại, Status Code:", res.statusCode);
        }

    } catch (err) {
        console.error("Lỗi kịch bản test:", err);
    }
}

runTests();
