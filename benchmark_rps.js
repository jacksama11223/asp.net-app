const { execSync } = require('child_process');

const TARGET_URL = 'http://141.253.114.218/'; 
// Đổi thành /Account/Login nếu muốn test sức chịu đựng của Backend/Database
// Để nguyên '/' nếu muốn test sức chịu đựng của Frontend + Nginx

console.log(`====================================================`);
console.log(`🚀 BẮT ĐẦU CHIẾN DỊCH: ĐO LƯỜNG SỨC MẠNH TỐI ĐA (RPS)`);
console.log(`🎯 Mục tiêu: ${TARGET_URL}`);
console.log(`====================================================\n`);

const testLevels = [
    { connections: 100, duration: 10, name: 'Tải Nhẹ (100 user cùng lúc)' },
    { connections: 500, duration: 10, name: 'Tải Trung Bình (500 user cùng lúc)' },
    { connections: 1000, duration: 15, name: 'Tải Nặng (1000 user cùng lúc)' },
    { connections: 3000, duration: 20, name: 'Tải Cực Đại (3000 user cùng lúc)' }
];

function runTest() {
    for (const level of testLevels) {
        console.log(`\n⏳ Đang tiến hành: ${level.name}... (Chờ ${level.duration} giây)`);
        
        try {
            // Chạy autocannon dưới dạng JSON để lấy dữ liệu phân tích
            const command = `npx autocannon -c ${level.connections} -d ${level.duration} --renderStatusCodes --json ${TARGET_URL}`;
            
            const output = execSync(command, { stdio: 'pipe', encoding: 'utf-8' });
            const result = JSON.parse(output);

            const rps = result.requests.average;
            const totalRequests = result.requests.total;
            const errors = result.errors || 0;
            const timeouts = result.timeouts || 0;
            const errorRate = ((errors + timeouts) / totalRequests * 100).toFixed(2);

            console.log(`✅ Kết quả:`);
            console.log(`   ⚡ Tốc độ trung bình: \x1b[32m${Math.round(rps)} requests/giây\x1b[0m`);
            console.log(`   📦 Tổng số đạn đã bắn: ${totalRequests} requests`);
            console.log(`   ❌ Số lượng rớt/lỗi: ${errors + timeouts} (${errorRate}%)`);
            
            if (errorRate > 5) {
                console.log(`\n⚠️ HỆ THỐNG ĐÃ ĐẠT GIỚI HẠN! Tỉ lệ lỗi vượt mức 5%.`);
                console.log(`🏆 KỶ LỤC CHỊU TẢI CỦA BẠN LÀ KHOẢNG: \x1b[33m${Math.round(rps)} Requests/Giây\x1b[0m\n`);
                break;
            }

        } catch (error) {
            console.log(`\n💥 LỖI: Không thể thực hiện bài test. Hệ thống có thể đã sập!`);
            break;
        }
    }
    console.log(`====================================================`);
    console.log(`🏁 BÀI TEST HOÀN TẤT!`);
    console.log(`====================================================`);
}

runTest();
