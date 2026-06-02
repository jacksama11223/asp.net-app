const http = require('http');

const options = {
    hostname: '141.253.114.218',
    port: 3080,
    path: '/hub/post/1',
    method: 'GET'
};

console.log('Testing Post Detail Page (Giai đoạn 1)...');

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log('✅ TEST PASS: Post detail page loads successfully with HTTP 200.');
            if (data.includes('Bình luận')) {
                console.log('✅ TEST PASS: Comment section is rendered.');
            }
        } else if (res.statusCode === 404) {
            console.log('⚠️ Post ID 1 might not be published or not exist. Make sure to seed or approve posts.');
        } else {
            console.error(`❌ TEST FAIL: Unexpected status code ${res.statusCode}`);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ TEST FAIL: Connection problem - ${e.message}`);
});

req.end();
