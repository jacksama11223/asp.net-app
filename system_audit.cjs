const fs = require('fs');
const path = require('path');

const rootDir = 'c:/code/asp.net';
const outputDir = path.join(rootDir, 'docs');
const moduleFile = path.join(outputDir, 'module.md');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

let codebaseMap = {
    "🏗️ Infrastructure & Config": { files: [] },
    "🛡️ Core Models (Entities)": { files: [] },
    "💾 Data Access Layer (EF Core)": { files: [] },
    "🧠 Business Logic (Modules)": { submodules: {} },
    "🌐 Web Entry Points (Main)": { controllers: [] },
    "👥 Community Hub (Port 3080)": { controllers: [] },
    "⚡ Event Handlers & Workers": { handlers: [] },
    "📜 Database Scripts & SQL": { files: [] }
};

function scanAll() {
    // 1. Quét Infrastructure & Config
    const configFiles = ['docker-compose.prod.yml', 'docker-compose.worker.yml', 'nginx-lb.conf', 'SmartLMS.sln', 'Dockerfile'];
    configFiles.forEach(f => {
        if (fs.existsSync(path.join(rootDir, f))) codebaseMap["🏗️ Infrastructure & Config"].files.push(f);
    });

    // 2. Quét Models
    const modelsPath = path.join(rootDir, "SmartLMS.Models");
    if (fs.existsSync(modelsPath)) {
        fs.readdirSync(modelsPath).forEach(f => {
            if (f.endsWith('.cs') && !f.startsWith('I')) codebaseMap["🛡️ Core Models (Entities)"].files.push(f.replace('.cs', ''));
        });
    }

    // 3. Quét Data
    const dataPath = path.join(rootDir, "SmartLMS.Data");
    if (fs.existsSync(dataPath)) {
        fs.readdirSync(dataPath).forEach(f => {
            if (f.endsWith('.cs')) codebaseMap["💾 Data Access Layer (EF Core)"].files.push(f.replace('.cs', ''));
        });
    }

    // 4. Quét Business (Trái tim của hệ thống)
    const businessPath = path.join(rootDir, "SmartLMS.Business");
    if (fs.existsSync(businessPath)) {
        const items = fs.readdirSync(businessPath);
        items.forEach(item => {
            const fullPath = path.join(businessPath, item);
            if (fs.statSync(fullPath).isDirectory()) {
                // Đây là các Sub-module (vd: Handlers, MessageBus, Security)
                codebaseMap["🧠 Business Logic (Modules)"].submodules[item] = fs.readdirSync(fullPath)
                    .filter(f => f.endsWith('.cs'))
                    .map(f => f.replace('.cs', ''));
            } else if (item.endsWith('Service.cs')) {
                // Các Service nằm ở root của Business
                if (!codebaseMap["🧠 Business Logic (Modules)"].submodules["Services"]) codebaseMap["🧠 Business Logic (Modules)"].submodules["Services"] = [];
                codebaseMap["🧠 Business Logic (Modules)"].submodules["Services"].push(item.replace('.cs', ''));
            }
        });
    }

    // 5. Quét Web & Community
    const webPath = path.join(rootDir, "SmartLMS.Web/Controllers");
    if (fs.existsSync(webPath)) {
        codebaseMap["🌐 Web Entry Points (Main)"].controllers = fs.readdirSync(webPath).map(f => f.replace('Controller.cs', ''));
    }
    const communityPath = path.join(rootDir, "asp.net-group/SmartLMS.Community/Controllers");
    if (fs.existsSync(communityPath)) {
        codebaseMap["👥 Community Hub (Port 3080)"].controllers = fs.readdirSync(communityPath).map(f => f.replace('Controller.cs', ''));
    }

    // 6. Quét SQL
    const files = fs.readdirSync(rootDir);
    files.forEach(f => {
        if (f.endsWith('.sql')) codebaseMap["📜 Database Scripts & SQL"].files.push(f);
    });
}

console.log("🔭 Đang quét toàn bộ Codebase (Toàn diện)...");
scanAll();

let md = "# 🗺️ SmartLMS.AI Codebase & Module Map\n\n";
md += "*Bản đồ toàn diện được lập tự động bởi Antigravity Cartographer*\n\n";

for (const [section, data] of Object.entries(codebaseMap)) {
    md += `## ${section}\n`;
    if (data.files) {
        data.files.forEach(f => md += `- \`${f}\`\n`);
    }
    if (data.controllers) {
        data.controllers.forEach(c => md += `- [UI/API] \`${c}\`\n`);
    }
    if (data.submodules) {
        for (const [sub, files] of Object.entries(data.submodules)) {
            md += `### 📂 ${sub}\n`;
            files.forEach(f => md += `- \`${f}\`\n`);
        }
    }
    md += "\n";
}

fs.writeFileSync(moduleFile, md);
console.log("✅ Đã cập nhật bản đồ Codebase tại: docs/module.md");
