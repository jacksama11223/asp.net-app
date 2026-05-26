const fs = require('fs');
const path = require('path');

const reactSrcDir = path.join(__dirname, 'source-code-for-replace-extracted', 'source-code-for-replalce-main', 'src', 'components');
const razorViewsDir = path.join(__dirname, 'asp.net-group', 'SmartLMS.Community', 'Views', 'Community');
const controllerPath = path.join(__dirname, 'asp.net-group', 'SmartLMS.Community', 'Controllers', 'CommunityController.cs');

console.log("=== BẮT ĐẦU ĐỐI CHIẾU MÃ NGUỒN REACT VÀ RAZOR ===");

// 1. Quét React Components
let reactComponents = [];
if (fs.existsSync(reactSrcDir)) {
    reactComponents = fs.readdirSync(reactSrcDir).filter(f => f.endsWith('.tsx')).map(f => f.replace('.tsx', ''));
    console.log("\n📦 [REACT] Tìm thấy " + reactComponents.length + " Components:");
    console.log(reactComponents.join(', '));
}

// 2. Quét Razor Views
let razorViews = [];
if (fs.existsSync(razorViewsDir)) {
    razorViews = fs.readdirSync(razorViewsDir).filter(f => f.endsWith('.cshtml')).map(f => f.replace('.cshtml', ''));
    console.log("\n🖥️ [RAZOR] Tìm thấy " + razorViews.length + " Views hiện tại:");
    console.log(razorViews.join(', '));
}

// 3. Phân tích Controller API
let controllerContent = "";
if (fs.existsSync(controllerPath)) {
    controllerContent = fs.readFileSync(controllerPath, 'utf8');
}
const apiEndpoints = ['SimulateAiDraft', 'SimulateCompileSandbox', 'CompleteShareReward'];
console.log("\n🔌 [API] Kiểm tra các Endpoints hỗ trợ React:");
apiEndpoints.forEach(api => {
    if (controllerContent.includes(api)) {
        console.log("  ✅ Đã có: " + api);
    } else {
        console.log("  ❌ Thiếu: " + api);
    }
});

// 4. Tìm ra khoảng trống (Gaps)
console.log("\n⚠️ [GAPS] Các Component cần được chuyển đổi sang C# Razor:");
const gapComponents = reactComponents.filter(c => !razorViews.includes(c));
gapComponents.forEach(c => console.log("  - " + c));

console.log("\n✅ Quá trình đối chiếu hoàn tất. Chuẩn bị kế hoạch an toàn không làm hỏng hệ thống!");
