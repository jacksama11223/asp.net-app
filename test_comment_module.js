const http = require('http');

console.log('Testing Comment Module (Giai đoạn 2)...');

const options = {
    hostname: '141.253.114.218',
    port: 3080,
    path: '/hub/post/1',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        if (res.statusCode === 200) {
            if (data.includes('action="/hub/post/1/comment"') && data.includes('method="POST"')) {
                console.log('✅ TEST PASS: Comment submission form is properly rendered and connected to Backend.');
            } else {
                console.error('❌ TEST FAIL: Comment form is missing or not configured correctly.');
            }

            if (data.includes('ui-avatars.com/api/?name=')) {
                console.log('✅ TEST PASS: Avatar system is fully integrated into the comment module.');
            } else {
                console.error('❌ TEST FAIL: Avatar system integration missing.');
            }
        } else {
            console.log(`⚠️ Post ID 1 returned ${res.statusCode}. Ensure the post exists and is approved.`);
        }
    });
});

req.on('error', (e) => console.error(`❌ Connection problem: ${e.message}`));
req.end();
