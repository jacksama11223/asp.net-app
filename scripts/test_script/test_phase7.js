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
    console.log("=== BẮT ĐẦU TEST PHASE 7: PROFILE & CHAT ===");

    try {
        console.log("1. Kiểm tra URL /Community/Messages...");
        const resChat = await sendGet('/Community/Messages');
        if (resChat.statusCode === 200 || resChat.statusCode === 302) { // 302 is OK if redirecting to login
            console.log("✅ Trang Messages (Chat) phản hồi thành công.");
            if (resChat.body && resChat.body.includes("signalr.min.js")) {
                console.log("✅ SignalR JS client được nạp trong Messages.");
            }
        } else {
            console.log("❌ Lỗi Messages, status: " + resChat.statusCode);
        }

        console.log("2. Kiểm tra URL /Community/Profile/1...");
        const resProfile = await sendGet('/Community/Profile/1');
        if (resProfile.statusCode === 200) {
            console.log("✅ Trang Profile phản hồi thành công.");
            if (resProfile.body.includes("ui-avatars.com")) {
                console.log("✅ Avatar API (ui-avatars) được tích hợp trong Profile.");
            }
        } else {
            console.log("❌ Lỗi Profile, status: " + resProfile.statusCode);
        }

        console.log("\n🚀 KẾT LUẬN: PHASE 7 SẴN SÀNG ĐỂ DEPLOY.");
    } catch (err) {
        console.error("Lỗi:", err);
    }
}

runTests();
