const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const reportFile = 'epic_codebase_report.md';

let report = "# Báo cáo Quét Cấp độ Chuyên gia (Enterprise & Design Patterns)\n\n";

const keywordsToFind = {
    "Global Exception Handling (Middleware)": ["UseExceptionHandler", "ExceptionMiddleware", "ProblemDetails"],
    "Options Pattern (Cấu hình)": ["IOptions", "IOptionsSnapshot", "Configure<"],
    "Webhooks & Async Callbacks": ["Webhook", "IWebhook", "StripeEvent", "Signature"],
    "File & Media Storage": ["IFormFile", "FileStream", "Upload", "Blob"],
    "Caching Strategies": ["IMemoryCache", "IDistributedCache", "DistributedCacheEntryOptions"],
    "Design Patterns (GoF)": ["Factory", "Builder", "Singleton", "Strategy"],
    "Data Seeding & Migration": ["HasData", "MigrateAsync", "SeedData"],
    "API Documentation": ["SwaggerGen", "AddSwaggerGen"]
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
            if (['.cs', '.csproj', '.json'].includes(ext)) {
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

console.log("Đang quét tìm các kỹ thuật Enterprise ẩn sâu...");
scanDir(rootDir);

Object.entries(foundTech).forEach(([category, keywords]) => {
    if (keywords.size > 0) {
        report += `## ${category}\n`;
        report += `- Đã tìm thấy: ${Array.from(keywords).join(", ")}\n\n`;
    }
});

fs.writeFileSync(reportFile, report);
console.log(`Hoàn thành! Đã lưu báo cáo vào ${reportFile}`);
