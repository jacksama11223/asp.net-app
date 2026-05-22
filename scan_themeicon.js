const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else if (name.endsWith('.js') || name.endsWith('.jsx')) {
      fileList.push(name);
    }
  }
  return fileList;
}

const srcDir = path.resolve(__dirname, 'react-test-frontend/src');
const files = getFiles(srcDir);

console.log(`Scanning ${files.length} files in ${srcDir}...\n`);

let missingCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check if ThemeIcon is used (e.g. <ThemeIcon or ThemeIcon.)
  const hasThemeIconUsage = /<ThemeIcon\b|ThemeIcon\./.test(content) || (content.includes('ThemeIcon') && !content.includes('import'));
  
  // Check if it's imported from '@mantine/core'
  // Look for: import { ... ThemeIcon ... } from '@mantine/core';
  const mantineCoreImportRegex = /import\s+{[^}]*ThemeIcon[^}]*}\s+from\s+['"]@mantine\/core['"]/s;
  const isImported = mantineCoreImportRegex.test(content);
  
  const actualUsage = /ThemeIcon/.test(content);
  
  if (actualUsage) {
    // Let's analyze if it's imported
    const hasImportLine = content.includes('import') && content.includes('ThemeIcon');
    if (!hasImportLine) {
      console.log(`❌ File: ${path.relative(__dirname, file)}`);
      console.log(`   - ThemeIcon is used but NOT imported at all!\n`);
      missingCount++;
    } else {
      // Check if it's imported from @mantine/core specifically
      const lines = content.split('\n');
      const importLines = lines.filter(l => l.includes('import') && l.includes('ThemeIcon'));
      const isFromMantineCore = importLines.some(l => l.includes('@mantine/core'));
      if (!isFromMantineCore) {
        console.log(`❌ File: ${path.relative(__dirname, file)}`);
        console.log(`   - ThemeIcon is imported, but NOT from '@mantine/core'!`);
        console.log(`   - Import lines: ${importLines.join(' | ')}\n`);
        missingCount++;
      }
    }
  }
}

if (missingCount === 0) {
  console.log('✅ Success! All files using ThemeIcon have it imported correctly.');
} else {
  console.log(`Found ${missingCount} file(s) with missing ThemeIcon imports.`);
}
