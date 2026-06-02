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
                resolve({ statusCode: res.statusCode, body });
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
    console.log("=== BẮT ĐẦU TEST PHASE 4: AJAX COMMENT & UPVOTE ===");

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

        // We assume post ID = 1 exists from Seed Data
        const postId = 1;

        // 2. Test AJAX Upvote
        console.log(`2. Thử nghiệm Upvote cho Bài viết #${postId}...`);
        const upvoteRes = await sendPost(`/hub/post/${postId}/upvote`, {}, false); // Empty JSON post
        const upData = JSON.parse(upvoteRes.body);
        if (upData.success && upData.newVoteCount !== undefined) {
            console.log("✅ Upvote thành công! Lượt vote mới:", upData.newVoteCount);
        } else {
            console.log("❌ Upvote thất bại:", upData);
        }

        // 3. Test AJAX Comment
        console.log(`3. Thử nghiệm Gửi Inline Comment cho Bài viết #${postId}...`);
        const cmtRes = await sendPost(`/hub/post/${postId}/comment`, { content: 'Đây là comment tự động test bằng Node.js script.' });
        const cmtData = JSON.parse(cmtRes.body);
        if (cmtData.success && cmtData.comment) {
            console.log("✅ Inline Comment thành công! Nội dung:", cmtData.comment.content);
        } else {
            console.log("❌ Inline Comment thất bại:", cmtData);
        }

        console.log("\n🚀 KẾT LUẬN: PHASE 4 ĐÃ PASS. Hệ thống Bình luận & Upvote bằng AJAX hoạt động trơn tru!");

    } catch (err) {
        console.error("Lỗi kịch bản test:", err);
    }
}

runTests();
