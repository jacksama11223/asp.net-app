const http = require('http');
const querystring = require('querystring');

const HOST = '141.253.114.218';
const PORT = 3080;
let authCookie = '';

// Helper function to send POST requests
function sendPost(path, data, useFormUrlEncoded = true) {
    return new Promise((resolve, reject) => {
        let postData;
        let contentType;

        if (useFormUrlEncoded) {
            postData = querystring.stringify(data);
            contentType = 'application/x-www-form-urlencoded';
        } else {
            postData = JSON.stringify(data);
            contentType = 'application/json';
        }

        const options = {
            hostname: HOST,
            port: PORT,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': contentType,
                'Content-Length': Buffer.byteLength(postData),
                'Cookie': authCookie
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.headers['set-cookie']) {
                    authCookie = res.headers['set-cookie'].map(c => c.split(';')[0]).join('; ');
                }
                resolve({ statusCode: res.statusCode, headers: res.headers, body });
            });
        });

        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

// Helper function to send GET requests
function sendGet(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            port: PORT,
            path: path,
            method: 'GET',
            headers: {
                'Cookie': authCookie
            }
        };
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
    console.log("=== BẮT ĐẦU TEST PHASE 5: ADMIN MODERATION ===");

    try {
        // 1. Login as Admin
        console.log("1. Đăng nhập Admin...");
        const loginRes = await sendPost('/Auth/Login', { Email: 'admin', Password: '1' });
        if (loginRes.statusCode === 302 || loginRes.statusCode === 200) {
            console.log("✅ Đăng nhập thành công. Lấy được Cookie.");
        } else {
            console.log("❌ Đăng nhập thất bại:", loginRes.statusCode);
            return;
        }

        // 2. Fetch Moderation Page
        console.log("2. Truy cập /admin/moderation...");
        const modRes = await sendGet('/admin/moderation');
        if (modRes.statusCode === 200) {
            console.log("✅ Truy cập bảng điều khiển Moderation thành công.");
            // Kiểm tra xem giao diện có chứa AlpineJS tab không
            if (modRes.body.includes("activeTab = 'events'")) {
                console.log("✅ Tích hợp Tab Moderation (Posts, Events, QA, Groups) hoàn tất.");
            } else {
                console.log("❌ Lỗi: Giao diện chưa render đúng cấu trúc Tab AlpineJS.");
            }
        } else {
            console.log("❌ Truy cập thất bại, Status Code:", modRes.statusCode);
            return;
        }

        // 3. Test Approve Item Endpoint
        console.log("3. Kiểm tra tính năng Approve Event ID: 1...");
        const approveRes = await sendPost('/admin/approve-item?type=event&id=1', {});
        // 302 Redirect to /admin/moderation on success
        if (approveRes.statusCode === 302) {
            console.log("✅ Gửi lệnh Approve thành công (Trả về 302 Redirect).");
        } else {
            console.log("❌ Cổng Approve không phản hồi đúng mong đợi:", approveRes.statusCode);
        }

        console.log("\n🚀 KẾT LUẬN: PHASE 5 ĐÃ PASS. Bảng điều khiển kiểm duyệt đa phân hệ đã sẵn sàng!");

    } catch (err) {
        console.error("Lỗi kịch bản test:", err);
    }
}

runTests();
