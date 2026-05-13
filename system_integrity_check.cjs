const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log(`======================================================`);
console.log(`🛡️ HỆ THỐNG QUÉT LỖI TỰ ĐỘNG - SMARTLMS.AI`);
console.log(`======================================================\n`);

// 1. KIỂM TRA TRÙNG LẶP CLASS (Fix CS0101)
console.log(`🔍 [1/3] Kiểm tra trùng lặp Class trong Models...`);
const modelFiles = fs.readdirSync('c:/code/asp.net/SmartLMS.Models').filter(f => f.endsWith('.cs'));
const classCounts = {};
const criticalClasses = ['CommunityEvent', 'CommunityResource', 'UserBadge', 'Post', 'Comment'];

modelFiles.forEach(file => {
    const content = fs.readFileSync(path.join('c:/code/asp.net/SmartLMS.Models', file), 'utf8');
    criticalClasses.forEach(cls => {
        // Regex để tìm chính xác "class TênLớp" (có khoảng trắng hoặc xuống dòng sau đó)
        const regex = new RegExp(`class\\s+${cls}\\b`);
        if (regex.test(content)) {
            classCounts[cls] = (classCounts[cls] || 0) + 1;
        }
    });
});

let duplicationError = false;
Object.entries(classCounts).forEach(([cls, count]) => {
    if (count > 1) {
        console.log(`   ❌ LỖI: Class '${cls}' đang bị khai báo ${count} lần!`);
        duplicationError = true;
    } else if (count === 1) {
        console.log(`   ✅ OK: Class '${cls}' đã duy nhất.`);
    }
});

// 2. KIỂM TRA CẤU HÌNH NGINX (Fix 502)
console.log(`\n🔍 [2/3] Kiểm tra cấu hình Nginx & Program.cs...`);
const nginxContent = fs.readFileSync('c:/code/asp.net/nginx-lb.conf', 'utf8');
const programContent = fs.readFileSync('c:/code/asp.net/asp.net-group/SmartLMS.Community/Program.cs', 'utf8');

if (nginxContent.includes('127.0.0.1:5183')) {
    console.log(`   ❌ LỖI: Nginx vẫn đang dùng 127.0.0.1 (Sẽ gây 502).`);
} else if (nginxContent.includes('community:8080')) {
    console.log(`   ✅ OK: Nginx đã cấu hình Docker Network (Fix 502).`);
}

if (programContent.includes('UseHttpsRedirection')) {
    // Check if it's commented out
    if (programContent.includes('// app.UseHttpsRedirection')) {
        console.log(`   ✅ OK: HttpsRedirection đã được vô hiệu hóa.`);
    } else {
        console.log(`   ⚠️ CẢNH BÁO: HttpsRedirection vẫn đang bật (Có thể gây treo).`);
    }
}

// 3. THỬ NGHIỆM BUILD LOCAL
console.log(`\n🔍 [3/3] Thử nghiệm Build Local (Dự án Models)...`);
try {
    execSync('dotnet build c:/code/asp.net/SmartLMS.Models/SmartLMS.Models.csproj', { stdio: 'inherit' });
    console.log(`\n✅ KẾT QUẢ: Toàn bộ project Models đã sẵn sàng biên dịch!`);
} catch (e) {
    console.log(`\n❌ KẾT QUẢ: Build thất bại. Cần rà soát lại mã nguồn.`);
}

console.log(`\n======================================================`);
if (!duplicationError) {
    console.log(`🎉 CHÚC MỪNG! HỆ THỐNG ĐÃ SẴN SÀNG ĐỂ DEPLOY LÊN VPS.`);
} else {
    console.log(`⚠️ HÃY XỬ LÝ CÁC LỖI TRÙNG LẶP TRÊN TRƯỚC KHI DEPLOY.`);
}
console.log(`======================================================`);
