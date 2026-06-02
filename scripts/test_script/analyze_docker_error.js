const fs = require('fs');

function generateReport() {
    let report = `# Phân tích lỗi Docker: "cannot stop container... did not receive an exit event"\n\n`;

    report += `## 1. Phân tích hiện tượng\n`;
    report += `Dựa vào log từ VPS B, tiến trình **Build đã diễn ra THÀNH CÔNG 100%** (bạn có thể thấy dòng \`Image aspnet-app-frontend-community Built\` và \`DONE 6.4s\`).\n`;
    report += `Tuy nhiên, lỗi xảy ra ở giai đoạn cuối cùng: **Up (Recreate Container)**.\n\n`;
    report += `**Chi tiết lỗi:**\n`;
    report += `> \`Error response from daemon: cannot stop container: 189e0af7...: tried to kill container, but did not receive an exit event\`\n\n`;

    report += `## 2. Nguyên nhân cốt lõi\n`;
    report += `Lỗi này là một "bệnh" khá phổ biến của Docker Daemon trên môi trường Linux khi máy chủ bị thiếu tài nguyên hoặc ổ cứng bị quá tải (I/O Wait):\n`;
    report += `- Docker đang cố gắng xóa cái Container cũ (đang chạy) để thay thế bằng Container mới.\n`;
    report += `- Docker đã gửi lệnh \`SIGKILL\` (Ép tắt) tới Container cũ.\n`;
    report += `- Nhưng tiến trình bên trong Container bị treo cứng ở tầng Kernel (Hệ điều hành) nên nó không phản hồi lại tín hiệu tắt.\n`;
    report += `- Hậu quả: Docker Daemon bị kẹt cứng (hung state), không thể xóa Container cũ để đắp Container mới lên.\n\n`;

    report += `## 3. Kế hoạch khắc phục (Fix Plan)\n`;
    report += `Vì tiến trình đã bị treo ở cấp độ Kernel, lệnh \`docker rm -f\` hay \`docker compose down\` bình thường sẽ không có tác dụng. Chúng ta phải can thiệp mạnh tay bằng 1 trong 2 cách:\n\n`;
    
    report += `### Cách 1: Khởi động lại dịch vụ Docker (Khuyên dùng)\n`;
    report += `Ép khởi động lại toàn bộ dịch vụ Docker để nó tự động dọn dẹp các tiến trình bị kẹt:\n`;
    report += `\`\`\`bash\n`;
    report += `sudo systemctl restart docker\n`;
    report += `sudo docker compose -f docker-compose.worker.yml up -d --force-recreate\n`;
    report += `\`\`\`\n\n`;

    report += `### Cách 2: Tìm và diệt tận gốc Process ID (PID) của Container\n`;
    report += `Nếu cách 1 vẫn bị treo, chúng ta phải tìm Process ID thực sự của Container đó trên Linux và dùng lệnh \`kill -9\`: \n`;
    report += `\`\`\`bash\n`;
    report += `sudo kill -9 $(sudo docker inspect --format='{{.State.Pid}}' 189e0af748588555442b3403297ea9b748314b473c6829cbbd3f97ff7016c55f)\n`;
    report += `sudo docker rm -f 189e0af748588555442b3403297ea9b748314b473c6829cbbd3f97ff7016c55f\n`;
    report += `sudo docker compose -f docker-compose.worker.yml up -d\n`;
    report += `\`\`\`\n\n`;

    report += `**LƯU Ý QUAN TRỌNG:**\n`;
    report += `Toàn bộ Image mới của bạn ĐÃ ĐƯỢC BUILD XONG (đã lưu trong ổ cứng). Bây giờ bạn không cần tốn thời gian chạy lại lệnh build nữa, chỉ cần ép nó **Up** lên là trang web sẽ chạy!\n`;

    fs.writeFileSync('docker_error_analysis.md', report);
    console.log("✅ Đã phân tích lỗi và tạo file docker_error_analysis.md");
}

generateReport();
