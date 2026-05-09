const fs = require('fs');

const API_BASE = 'http://141.253.114.218'; // Replace with localhost if running locally against Docker

async function runTests() {
    console.log("🚀 Bắt đầu chạy kịch bản kiểm tra (Smoke Test) các Module API...");
    let token = '';

    // 1. Kiểm tra Module Auth (Login)
    try {
        console.log("\n[1] Đang kiểm tra Auth Module (Đăng nhập)...");
        const authRes = await fetch(`${API_BASE}/api/auth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'Admin@123456' })
        });
        
        if (!authRes.ok) throw new Error(`HTTP ${authRes.status}`);
        const authData = await authRes.json();
        token = authData.token;
        console.log("✅ Đăng nhập thành công, đã lấy được Token.");
    } catch (e) {
        console.error("❌ Lỗi Auth Module:", e.message);
        return; // Dừng lại nếu không có token
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    // 2. Kiểm tra Module Student (Khóa học)
    try {
        console.log("\n[2] Đang kiểm tra Student Module (Lấy khóa học)...");
        const res = await fetch(`${API_BASE}/api/student/enrolled-courses`, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log(`✅ Student Module OK. Trả về ${data.length || 0} khóa học.`);
    } catch (e) {
        console.error("❌ Lỗi Student Module:", e.message);
    }

    // 3. Kiểm tra Module Gamification
    try {
        console.log("\n[3] Đang kiểm tra Gamification Module (Lấy cấp độ/XP)...");
        const res = await fetch(`${API_BASE}/api/gamification/status`, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log(`✅ Gamification Module OK. Dữ liệu: XP=${data.totalXP}, Streak=${data.currentStreak}`);
    } catch (e) {
        console.error("❌ Lỗi Gamification Module:", e.message);
    }

    // 4. Kiểm tra Module Community (Cộng đồng)
    try {
        console.log("\n[4] Đang kiểm tra Community Module (Lấy bài viết)...");
        const res = await fetch(`${API_BASE}/api/community/posts`, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log(`✅ Community Module OK. Trả về ${data.length || 0} bài viết.`);
    } catch (e) {
        console.error("❌ Lỗi Community Module:", e.message);
    }

    console.log("\n🎉 Hoàn thành kiểm tra!");
}

runTests();
