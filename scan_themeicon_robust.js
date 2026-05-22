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

// Regular expression to find imports from @mantine/core
// This matches: import { ... } from '@mantine/core' across multiple lines
const mantineImportRegex = /import\s+{[^}]*}\s+from\s+['"]@mantine\/core['"]/g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find if ThemeIcon is used in JSX or JS
  // We match <ThemeIcon or ThemeIcon. or {ThemeIcon} or inside array etc.
  // But we want to exclude comments and import statements themselves
  const cleanContent = content
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
    .replace(/\/\/.*/g, ''); // remove single-line comments

  const usesThemeIcon = /<ThemeIcon\b|\bThemeIcon\b/.test(cleanContent.replace(/import\s+[\s\S]*?from\s+['"].*?['"]/g, ''));

  if (usesThemeIcon) {
    // Find all imports in the file
    const imports = [];
    const importRegex = /import\s+([\s\S]*?)\s+from\s+['"](.*?)['"]/g;
    let match;
    let hasImport = false;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importedNames = match[1];
      const source = match[2];
      
      if (importedNames.includes('ThemeIcon')) {
        hasImport = true;
        if (source !== '@mantine/core') {
          console.log(`❌ File: ${path.relative(__dirname, file)}`);
          console.log(`   - ThemeIcon is imported from '${source}' instead of '@mantine/core'!`);
          missingCount++;
        }
      }
    }
    
    if (!hasImport) {
      console.log(`❌ File: ${path.relative(__dirname, file)}`);
      console.log(`   - ThemeIcon is used but NOT imported!`);
      missingCount++;
    }
  }
}

if (missingCount === 0) {
  console.log('✅ Success! All files using ThemeIcon have it imported correctly.');
} else {
  console.log(`\nFound ${missingCount} file(s) with missing or incorrect ThemeIcon imports.`);
}
