const fs = require('fs');
const path = require('path');

const SAFE_ICONS = [
  'LuLayoutDashboard', 'LuBookOpen', 'LuUsers', 'LuZap', 'LuSettings',
  'LuLogOut', 'LuSparkles', 'LuPlus', 'LuPenTool', 'LuEye', 'LuSearch',
  'LuSend', 'LuArrowLeft', 'LuPlay', 'LuExternalLink', 'LuClock'
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const srcDir = path.join(__dirname, 'react-test-frontend', 'src');
const files = walk(srcDir);
let errorsFound = 0;

console.log('🔍 Starting Final Sanity Check...');

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(srcDir, file);

    // 1. Kiểm tra Duplicate Imports
    const importRegex = /import\s+\{\s*([^}]+)\s*\}\s*from\s*['"]react-icons\/lu['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const icons = match[1].split(',').map(i => i.trim()).filter(i => i !== "");
        const seen = new Set();
        const duplicates = icons.filter(i => {
            if (seen.has(i)) return true;
            seen.add(i);
            return false;
        });

        if (duplicates.length > 0) {
            console.error(`❌ [ERROR] Duplicate icons found in ${relativePath}: ${duplicates.join(', ')}`);
            errorsFound++;
        }
    }

    // 2. Kiểm tra Icon Safety (Chỉ các icon Lu)
    const iconUsageRegex = /<(Lu[A-Z][a-zA-Z]+)/g;
    let iconMatch;
    while ((iconMatch = iconUsageRegex.exec(content)) !== null) {
        const iconName = iconMatch[1];
        if (!SAFE_ICONS.includes(iconName)) {
            console.error(`⚠️ [WARNING] Unsafe icon used in ${relativePath}: ${iconName}`);
            // Chúng ta không coi đây là lỗi dừng build nhưng cảnh báo để biết
        }
    }
});

if (errorsFound === 0) {
    console.log('\n✅ [SUCCESS] No duplicate imports found. System is stable for build.');
} else {
    console.log(`\n❌ [FAILED] Found ${errorsFound} issues that need fixing.`);
}
