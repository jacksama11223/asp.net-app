const fs = require('fs');
const { execSync } = require('child_process');

console.log('🌐 [GLOBAL MODULE INVENTORY SCANNER]');
console.log('====================================');

// 1. Quét Module Code (Local)
console.log('\n📂 1. DANH MỤC MODULE TRONG CODEBASE:');
try {
    const modules = execSync('node system_audit.cjs').toString();
    console.log('✅ Đã cập nhật docs/module.md và docs/events-flow.md');
} catch (e) {
    console.log('⚠️ Không thể chạy system_audit.cjs. Vui lòng kiểm tra file.');
}

// 2. Hướng dẫn kiểm tra theo từng IP
console.log('\n🖥️ 2. KIỂM TRA TRÊN TỪNG SERVER IP:');

const servers = [
    { ip: '141.253.114.218', name: 'PRIMARY (Web/DB/Community)', cmd: 'docker-compose -f docker-compose.prod.yml ps' },
    { ip: '145.241.160.156', name: 'WORKER (AI/Search/Jobs)', cmd: 'docker-compose -f docker-compose.worker.yml ps' }
];

servers.forEach(s => {
    console.log(`\n📍 SERVER: ${s.name} [${s.ip}]`);
    console.log(`👉 Lệnh kiểm tra: ssh opc@${s.ip} "cd /home/opc/asp.net-app && ${s.cmd}"`);
});

console.log('\n====================================');
console.log('🚀 NẾU THẤY TẤT CẢ CONTAINER BÁO "Up", HỆ THỐNG ĐÃ ĐẦY ĐỦ!');
