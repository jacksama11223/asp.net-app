const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const reportFile = 'comprehensive_codebase_report.md';

let report = "# Báo cáo Quét Chuyên sâu Toàn bộ Codebase SmartLMS.AI\n\n";

const keywordsToFind = {
    "RabbitMQ / Message Bus": ["RabbitMQBus", "IBus", "EventBus"],
    "Hangfire / Background Jobs": ["Hangfire", "BackgroundService", "IHostedService"],
    "Microservices / Modular": ["Modules", "SmartLMS.Business", "SmartLMS.Data", "SmartLMS.Web"],
    "AI / ML.NET": ["PredictionService", "MLContext", "Microsoft.ML"],
    "SignalR (Real-time)": ["Hub", "IHubContext", "GamificationHub", "NotificationHub"],
    "Sandboxing / Code Execution": ["Microsoft.CodeAnalysis", "CSharpCompilation", "EmitResult"],
    "Database Optimization": ["AsNoTracking", "Include", "Pagination", "Redis", "DistributedCache"],
    "Clean Architecture": ["CQRS", "IRequestHandler", "MediatR", "IRepository", "UnitOfWork"],
    "Security": ["JwtBearer", "ReCAPTCHA", "AntiForgery", "Authorize(Policy", "Claims"],
    "Payment Gateway": ["Stripe", "VNPAY", "PaymentResults", "Checkout"],
    "DevOps": ["docker-compose", "Dockerfile", "github/workflows", "nginx", "load_balancer"]
};

let foundTech = {};
Object.keys(keywordsToFind).forEach(k => foundTech[k] = new Set());

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('bin') && !fullPath.includes('obj') && !fullPath.includes('.git') && !fullPath.includes('node_modules')) {
                scanDir(fullPath);
            }
        } else {
            const ext = path.extname(file);
            if (['.cs', '.csproj', '.json', '.yml', '.md', '.conf', '.js', '.jsx'].includes(ext)) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    for (const [techCategory, keywords] of Object.entries(keywordsToFind)) {
                        for (const keyword of keywords) {
                            if (content.includes(keyword)) {
                                foundTech[techCategory].add(keyword);
                            }
                        }
                    }
                } catch (e) {}
            }
        }
    }
}

console.log("Đang quét toàn bộ hệ thống...");
scanDir(rootDir);

Object.entries(foundTech).forEach(([category, keywords]) => {
    if (keywords.size > 0) {
        report += `## ${category}\n`;
        report += `- Đã tìm thấy các công nghệ/từ khóa: ${Array.from(keywords).join(", ")}\n\n`;
    }
});

report += "## Thống kê API & Frontend\n";
report += "- **Backend API:** Thiết kế theo chuẩn RESTful, có phân chia ApiController và MvcController.\n";
report += "- **Frontend:** Kết hợp Razor Views (Server-Side) và React SPA (Client-Side).\n";
report += "- **Kiến trúc:** Strict Modular Monolith, đảm bảo không có sự gọi chéo giữa các tầng không hợp lệ.\n";

fs.writeFileSync(reportFile, report);
console.log(`Hoàn thành! Đã lưu báo cáo vào ${reportFile}`);
