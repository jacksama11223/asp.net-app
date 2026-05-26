const http = require('http');

console.log('Testing Public Profile Module (Giai đoạn 3)...');

const options = {
    hostname: '141.253.114.218',
    port: 3080,
    path: '/profile/1',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log('✅ TEST PASS: Public Profile page loads successfully (HTTP 200).');
            
            if (data.includes('Thành tựu học tập')) {
                console.log('✅ TEST PASS: Gamification stats section is rendered.');
            } else {
                console.error('❌ TEST FAIL: Gamification section missing.');
            }

            if (data.includes('Bài viết mới nhất')) {
                console.log('✅ TEST PASS: User posts section is rendered.');
            } else {
                console.error('❌ TEST FAIL: User posts section missing.');
            }
        } else {
            console.log(`⚠️ Profile ID 1 returned ${res.statusCode}. Ensure the user exists.`);
        }
    });
});

req.on('error', (e) => console.error(`❌ Connection problem: ${e.message}`));
req.end();
