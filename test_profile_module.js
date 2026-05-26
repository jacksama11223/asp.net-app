const http = require('http');

console.log('Testing Public Profile Module (Giai đoạn 3)...');

// Helper để thực hiện GET request
function get(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, data }));
        }).on('error', reject);
    });
}

(async () => {
    try {
        console.log('B1: Quét bảng tin để lấy một Post ID hợp lệ...');
        const hubRes = await get('http://141.253.114.218:3080/hub');
        const postMatches = hubRes.data.match(/href="\/hub\/post\/(\d+)"/g);
        
        if (!postMatches || postMatches.length === 0) {
            console.error('⚠️ Không tìm thấy bài viết nào trên trang chủ. Vui lòng Seed dữ liệu trước (truy cập /api/seed-posts).');
            return;
        }

        // Lấy PostId đầu tiên
        const postId = postMatches[0].match(/\d+/)[0];
        console.log(`B2: Tìm thấy Post ID = ${postId}. Đang truy cập trang chi tiết bài viết...`);

        const postRes = await get(`http://141.253.114.218:3080/hub/post/${postId}`);
        const userMatches = postRes.data.match(/href="\/profile\/(\d+)"/);

        if (!userMatches || !userMatches[1]) {
            console.error(`⚠️ Không tìm thấy tác giả trong bài viết số ${postId}.`);
            return;
        }

        const userId = userMatches[1];
        console.log(`B3: Tìm thấy User ID hợp lệ = ${userId}. Đang chuyển hướng sang trang Hồ sơ...`);
        
        const profileRes = await get(`http://141.253.114.218:3080/profile/${userId}`);
        
        if (profileRes.statusCode === 200) {
            console.log(`✅ TEST PASS: Public Profile page for ID ${userId} loads successfully (HTTP 200).`);
            
            if (profileRes.data.includes('Thành tựu học tập')) {
                console.log('✅ TEST PASS: Gamification stats section is rendered.');
            } else {
                console.error('❌ TEST FAIL: Gamification section missing.');
            }

            if (profileRes.data.includes('Bài viết mới nhất')) {
                console.log('✅ TEST PASS: User posts section is rendered.');
            } else {
                console.error('❌ TEST FAIL: User posts section missing.');
            }
        } else {
            console.log(`❌ TEST FAIL: Profile ID ${userId} returned ${profileRes.statusCode}.`);
        }

    } catch (e) {
        console.error(`❌ Connection problem: ${e.message}`);
    }
})();
