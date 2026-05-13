const mysql = require('mysql2/promise');
const redis = require('redis');

// 🔍 Cấu hình lấy từ docker-compose của ngài
const DB_CONFIG = {
    host: '141.253.114.218', // IP VPS-A
    port: 3306,
    user: 'root',
    password: 'YourStrongPassword123!',
    database: 'SmartLMS'
};

const REDIS_URL = 'redis://:YourRedisPass@141.253.114.218:6379';

async function checkConnectivity() {
    console.log(`======================================================`);
    console.log(`🕵️ KIỂM TRA HẠ TẦNG TRƯỚC KHI BUILD (MARIADB MODE)`);
    console.log(`======================================================\n`);

    // 1. Kiểm tra MariaDB
    console.log(`📡 Đang thử kết nối MariaDB (${DB_CONFIG.host})...`);
    try {
        const connection = await mysql.createConnection(DB_CONFIG);
        console.log(`   ✅ KẾT NỐI MARIADB THÀNH CÔNG!`);
        const [rows] = await connection.execute('SELECT VERSION() as version');
        console.log(`   📦 Phiên bản: ${rows[0].version}`);
        await connection.end();
    } catch (err) {
        console.log(`   ❌ LỖI KẾT NỐI MARIADB: ${err.message}`);
    }

    console.log(`------------------------------------------------------`);

    // 2. Kiểm tra Redis
    console.log(`📡 Đang thử kết nối Redis...`);
    const client = redis.createClient({ url: REDIS_URL });
    client.on('error', (err) => console.log(`   ❌ LỖI KẾT NỐI REDIS: ${err.message}`));
    
    try {
        await client.connect();
        console.log(`   ✅ KẾT NỐI REDIS THÀNH CÔNG!`);
        await client.ping();
        await client.quit();
    } catch (err) {
        // Lỗi đã được bắt ở sự kiện 'error'
    }

    console.log(`\n🏁 HOÀN TẤT KIỂM TRA.`);
    console.log(`======================================================`);
}

checkConnectivity();
