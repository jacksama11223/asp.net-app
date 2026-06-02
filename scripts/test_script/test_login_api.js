/**
 * 🛡️ SMARTLMS.AI - SYSTEM LOGIN API DIAGNOSTIC
 * Chạy từ máy cá nhân: node test_login_api.js
 * 
 * Mục đích:
 * 1. Gọi trực tiếp API /api/auth/token với tài khoản admin / 1 để kiểm tra phản hồi lỗi.
 * 2. Phân tích xem lỗi do mật khẩu Hash sai hay do tên đăng nhập bị hiểu nhầm.
 */

const http = require('http');

const VPS_API_BASE = 'http://141.253.114.218';

console.log("==========================================================================");
console.log(" 🌐 SMARTLMS.AI LOGIN API DIAGNOSTIC");
console.log("==========================================================================\n");

function tryLogin(username, password) {
    return new Promise((resolve) => {
        const payload = JSON.stringify({ username, password });
        
        const req = http.request(`${VPS_API_BASE}/api/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    body: data
                });
            });
        });
        
        req.on('error', (err) => {
            resolve({
                status: 0,
                body: err.message
            });
        });
        
        req.write(payload);
        req.end();
    });
}

async function runDiagnostic() {
    console.log("👉 Đang kiểm tra đăng nhập với Username là 'admin' và Mật khẩu là '1'...");
    const resAdmin = await tryLogin('admin', '1');
    console.log(`   [Kết quả] HTTP Status: ${resAdmin.status}`);
    console.log(`   [Phản hồi]: ${resAdmin.body}`);
    
    console.log("\n👉 Đang kiểm tra đăng nhập với Email là 'admin@smartlms.ai' và Mật khẩu là '1'...");
    const resEmail = await tryLogin('admin@smartlms.ai', '1');
    console.log(`   [Kết quả] HTTP Status: ${resEmail.status}`);
    console.log(`   [Phản hồi]: ${resEmail.body}`);
}

runDiagnostic();
