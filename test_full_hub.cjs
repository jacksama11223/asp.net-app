const http = require('http');

const pages = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Events', path: '/events' },
    { name: 'Members', path: '/members' },
    { name: 'QA', path: '/qa' },
    { name: 'Groups', path: '/groups' }
];

const baseUrl = 'http://141.253.114.218:3080';

console.log(`🚀 Đang quét toàn bộ Community Hub tại ${baseUrl}...`);

pages.forEach(page => {
    http.get(`${baseUrl}${page.path}`, (res) => {
        if (res.statusCode === 200) {
            console.log(`✅ Trang [${page.name}]: OK (200)`);
        } else {
            console.error(`❌ Trang [${page.name}]: LỖI (${res.statusCode})`);
        }
    }).on('error', (e) => {
        console.error(`❌ Trang [${page.name}]: KHÔNG KẾT NỐI ĐƯỢC (${e.message})`);
    });
});
