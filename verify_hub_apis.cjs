const axios = require('axios');

const BASE_URL = 'http://141.253.114.218'; // IP Load Balancer

async function verifyHub() {
    console.log(`======================================================`);
    console.log(`🔍 KIỂM TOÁN HỆ THỐNG COMMUNITY HUB V2`);
    console.log(`======================================================\n`);

    const modules = [
        { name: 'Discussion Forum (Feed)', path: '/hub' },
        { name: 'Resource Sharing', path: '/hub/resources' },
        { name: 'Event Listings', path: '/hub/events' },
        { name: 'Member Directory', path: '/hub/members' },
        { name: 'Q&A Section', path: '/hub/qa' },
        { name: 'Study Groups', path: '/hub/groups' },
        { name: 'Leaderboard', path: '/hub/leaderboard' }
    ];

    for (const mod of modules) {
        process.stdout.write(`📡 Testing ${mod.name.padEnd(25)}... `);
        try {
            const start = Date.now();
            const res = await axios.get(`${BASE_URL}${mod.path}`, { timeout: 10000 });
            const duration = Date.now() - start;
            console.log(`✅ OK (${res.status}) - ${duration}ms`);
        } catch (e) {
            console.log(`❌ LỖI (${e.response ? e.response.status : e.message})`);
        }
    }

    console.log(`\n🏁 KẾT THÚC KIỂM TRA.`);
    console.log(`======================================================`);
}

verifyHub();
