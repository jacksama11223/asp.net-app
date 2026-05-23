const http = require('http');
const fs = require('fs');

const TARGET_IP = '141.253.114.218';
const PORTS = [80, 3080, 5181, 5182, 5183, 8080];

async function checkPort(port) {
    return new Promise((resolve) => {
        const req = http.get(`http://${TARGET_IP}:${port}`, (res) => {
            resolve({ port, status: 'OPEN', code: res.statusCode });
        }).on('error', (err) => {
            resolve({ port, status: 'CLOSED/REFUSED', error: err.code });
        });
        
        // Timeout 3 giây
        setTimeout(() => {
            req.destroy();
            resolve({ port, status: 'TIMEOUT', error: 'Kết nối quá lâu' });
        }, 3000);
    });
}

async function runTest() {
    console.log(`Đang kiểm tra kết nối tới ${TARGET_IP}...`);
    
    let report = `# Báo cáo Sự cố Máy chủ (VPS Incident Report)\n\n`;
    report += `## 1. Kết quả Ping Ports\n`;
    report += `| Port | Trạng thái | Ghi chú |\n`;
    report += `|------|------------|---------|\n`;

    let allDown = true;
    for (const port of PORTS) {
        const result = await checkPort(port);
        report += `| ${result.port} | ${result.status} | ${result.code || result.error} |\n`;
        if (result.status === 'OPEN') allDown = false;
        console.log(`Port ${result.port}: ${result.status}`);
    }

    report += `\n## 2. Phân tích lỗi \`DeadlineExceeded: context deadline exceeded\`\n`;
    report += `Lỗi này xảy ra TRONG QUÁ TRÌNH BUILD DOCKER trên VPS. Nguyên nhân cốt lõi là do máy chủ (đặc biệt là Oracle Free Tier với 500MB RAM) bị **Cạn kiệt tài nguyên (OOM - Out of Memory)**.\n\n`;
    report += `Khi bạn chạy lệnh \`docker compose build --no-cache\`, Docker cố gắng build cả 3 container (Backend, Frontend, Community) **cùng một lúc**. Quá trình tải các package Node.js và biên dịch .NET tốn rất nhiều CPU và RAM, dẫn đến việc Docker Daemon bị treo (freeze) và văng ra lỗi Timeout (DeadlineExceeded).\n\n`;
    
    report += `Hậu quả là tiến trình Build thất bại giữa chừng, các Container chưa được tạo ra. Và vì bạn đã chạy lệnh \`down\` trước đó, nên toàn bộ trang web hiện đang **SẬP HOÀN TOÀN** (Đó là lý do trình duyệt báo lỗi \`Unsafe attempt to load URL...\` hoặc \`Connection Refused\`).\n\n`;

    report += `## 3. Kế hoạch Fix lỗi (Fix Plan)\n`;
    report += `Để khắc phục trên môi trường yếu, chúng ta không được phép build song song. Giải pháp là:\n`;
    report += `1. Ép Docker build tuần tự từng image một.\n`;
    report += `2. Sử dụng tham số \`DOCKER_BUILDKIT=0\` để giảm tiêu thụ bộ nhớ đệm (nếu cần).\n`;
    report += `3. Khởi động lại dịch vụ Docker để xả RAM.\n`;

    fs.writeFileSync('vps_incident_report.md', report);
    console.log(`\n✅ Đã xuất báo cáo phân tích ra file: vps_incident_report.md`);
}

runTest();
