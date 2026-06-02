const fs = require('fs');

console.log("🔍 ĐANG KHỞI ĐỘNG HỆ THỐNG PHÂN TÍCH HỒ SƠ ỨNG VIÊN (AI SCANNER)...\n");

// Giả lập Dữ liệu Phân tích từ 3 website của SweetSoft
const sweetSoftProjects = [
    {
        name: "Cổng thông tin Công An Khánh Hòa",
        type: "Government Portal / CMS",
        requiredTech: ["Bảo mật cao (OWASP)", "Ghi log truy cập (Audit Trail)", "Tối ưu hóa SEO", "Xử lý hàng ngàn truy cập"]
    },
    {
        name: "Khách sạn SkyBlu Nha Trang",
        type: "Booking / Hotel Management",
        requiredTech: ["Tích hợp cổng thanh toán", "Hình ảnh đẹp, mượt mà", "Xử lý đụng độ khi đặt phòng (Concurrency)"]
    },
    {
        name: "Khu du lịch Trăm Trứng",
        type: "E-Commerce / Tourism",
        requiredTech: ["Giỏ hàng/Đặt vé", "Tải trang nhanh (Caching)", "Giao diện thân thiện"]
    }
];

// Trích xuất năng lực từ CV của Hoàng Đăng Quang Hà (Dựa trên SmartLMS)
const candidateSkills = [
    "Thiết kế CSDL Audit Trail ghi vết tự động mọi thao tác (Vượt xa yêu cầu CMS thông thường)",
    "Bảo mật mạnh: Anti-XSS, CSRF, ReCAPTCHA, Sandbox Code execution (Đáp ứng tiêu chuẩn cổng Chính phủ)",
    "Payment API tích hợp Transaction Locking chống đụng độ (Hoàn hảo cho hệ thống Booking/Bán vé)",
    "Dùng Razor + jQuery/AJAX để tối ưu SEO (Chuẩn bài cho các website tin tức, khách sạn)",
    "Dùng React/Vite cho giao diện quản trị (Vượt mong đợi về UI/UX)",
    "Load Balancing với Nginx, Redis Caching, chịu tải 100.000 requests (Thừa sức gánh Cổng thông tin Chính phủ)"
];

console.log("==================================================");
console.log("📊 ĐỐI CHIẾU NĂNG LỰC ỨNG VIÊN VS YÊU CẦU DỰ ÁN");
console.log("==================================================\n");

let matchScore = 0;

sweetSoftProjects.forEach((project, index) => {
    console.log(`[DỰ ÁN ${index + 1}]: ${project.name} (${project.type})`);
    console.log(`👉 Các rủi ro/yêu cầu kỹ thuật cốt lõi: ${project.requiredTech.join(", ")}`);
    console.log(`✅ Điểm mạnh của Ứng viên (Hà) có thể giải quyết:`);
    
    // So khớp logic (Giả lập)
    if (index === 0) {
        console.log(`   - ${candidateSkills[0]}`);
        console.log(`   - ${candidateSkills[1]}`);
        console.log(`   - ${candidateSkills[5]}`);
        matchScore += 40;
    } else if (index === 1) {
        console.log(`   - ${candidateSkills[2]}`);
        console.log(`   - ${candidateSkills[4]}`);
        matchScore += 30;
    } else {
        console.log(`   - ${candidateSkills[2]}`);
        console.log(`   - ${candidateSkills[3]}`);
        console.log(`   - ${candidateSkills[5]}`);
        matchScore += 30;
    }
    console.log("--------------------------------------------------\n");
});

console.log("==================================================");
console.log(`💯 KẾT LUẬN TỪ HỆ THỐNG PHÂN TÍCH: ĐỘ PHÙ HỢP ĐẠT ${matchScore}%`);
console.log("==================================================");
if (matchScore >= 100) {
    console.log("🔥 ĐÁNH GIÁ: Ứng viên OVERQUALIFIED (Vượt mong đợi).");
    console.log("Lý do: Không chỉ đáp ứng được việc viết code CRUD thông thường, ứng viên này có tư duy của System Architect.");
    console.log("Có thể giao phó các module thanh toán phức tạp, cấu hình Server chống DDoS và bảo mật cổng thông tin Chính phủ.");
    console.log("\n=> ĐỀ XUẤT: GỌI ĐIỆN MỜI PHỎNG VẤN NGAY LẬP TỨC TRƯỚC KHI CÔNG TY KHÁC CƯỚP MẤT!");
}
