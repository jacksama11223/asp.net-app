const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            results.push(file);
        }
    });
    return results;
}

const srcDir = path.join(__dirname, 'react-test-frontend', 'src');
const files = walk(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Tìm các dòng import từ react-icons/lu
    const regex = /import\s+\{\s*([^}]+)\s*\}\s*from\s*['"]react-icons\/lu['"]/g;
    
    content = content.replace(regex, (match, p1) => {
        const icons = p1.split(',').map(i => i.trim()).filter(i => i !== "");
        const uniqueIcons = [...new Set(icons)];
        
        if (icons.length !== uniqueIcons.length) {
            changed = true;
            console.log(`[FIXED] Duplicate icons in: ${path.basename(file)}`);
            return `import { ${uniqueIcons.join(', ')} } from 'react-icons/lu'`;
        }
        return match;
    });

    if (changed) {
        fs.writeFileSync(file, content);
    }
});

console.log('✅ Done deduplicating icon imports.');
