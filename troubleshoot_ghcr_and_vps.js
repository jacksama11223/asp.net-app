const fs = require('fs');

function generateTroubleshootingReport() {
    let report = `# Báo cáo Chuẩn đoán (Troubleshooting): Lỗi Mạng VPS và Phân quyền Github\n\n`;

    report += `## 1. Phân tích lỗi VPS A (TLS Handshake Timeout)\n`;
    report += `**Lỗi:** \`Error response from daemon... failed to do request: Get "https://registry-1.docker.io/.../cloudflare/cloudflared...": net/http: TLS handshake timeout\`\n\n`;
    report += `**Nguyên nhân:** Lần này lỗi **không liên quan đến Github hay Code của bạn**. Lỗi xảy ra khi VPS cố tải Image của Cloudflare từ \`Docker Hub\`. Máy ảo Oracle Cloud của bạn đang gặp vấn đề trầm trọng về **Mạng lưới (Networking/DNS)**. Giao thức TLS (HTTPS) không thể hoàn thành bắt tay (handshake) do tốc độ mạng quá rùa bò hoặc bị kẹt IP/DNS.\n\n`;
    report += `**Cách Fix:**\n`;
    report += `- Thử đổi DNS sang Google (8.8.8.8) hoặc Cloudflare (1.1.1.1).\n`;
    report += `- Hoặc đơn giản là... chạy lại lệnh \`sudo docker compose -f docker-compose.prod.yml pull\` vài lần cho đến khi mạng nội bộ của Oracle Cloud "thông chốt".\n\n`;

    report += `## 2. Phân tích lỗi VPS B (403 Forbidden từ GHCR)\n`;
    report += `**Lỗi:** \`failed to resolve reference "ghcr.io/.../smartlms-frontend:latest"... 403 Forbidden\`\n\n`;
    report += `**Nguyên nhân:** Chúc mừng bạn đã build thành công trên Github (tích xanh)! Tuy nhiên, luật bảo mật của Github Container Registry (GHCR) quy định: **Mọi Image mới sinh ra lần đầu tiên đều bị khóa ở chế độ PRIVATE (Tuyệt mật)**. Nó hoàn toàn bị tách rời khỏi quyền của Repository.\n\n`;
    report += `Do đó, dù bạn đã dùng mã Token để \`docker login\`, mã Token đó chỉ có quyền truy cập Code (Repository) chứ chưa được cấp quyền truy cập cái Image mới tinh kia.\n\n`;

    report += `**Cách Fix (Chỉ mất 30 giây làm trên Web):**\n`;
    report += `Bạn bắt buộc phải lên Github và chuyển chế độ của Image thành **Public**. Xem hướng dẫn chi tiết ở bên ngoài đoạn chat.\n\n`;

    fs.writeFileSync('ghcr_vps_troubleshooting.md', report);
    console.log("✅ Đã xuất báo cáo chuẩn đoán: ghcr_vps_troubleshooting.md");
}

generateTroubleshootingReport();
