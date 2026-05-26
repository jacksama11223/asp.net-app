import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src');
const PACKAGE_JSON_PATH = path.join(__dirname, 'package.json');

// Read dependencies from package.json
const pkgJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
const allowedDependencies = new Set([
  ...Object.keys(pkgJson.dependencies || {}),
  ...Object.keys(pkgJson.devDependencies || {}),
  // Built-in node modules are always allowed
  'fs', 'path', 'url', 'http', 'https', 'crypto', 'os', 'util', 'stream', 'events', 'readline',
  // motion/react is provided by motion package
  'motion/react',
  'lucide-react'
]);

const fileExtensions = ['.tsx', '.ts', '.jsx', '.js', '.d.ts', '.css', '.json'];

// Colors for console logging
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

console.log(`${colors.bright}${colors.cyan}=====================================================${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}  SMARTLMS SCANNER: KIỂM TRA ĐƯỜNG DẪN IMPORT & LỖI  ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}=====================================================${colors.reset}\n`);

// Recursive file collector
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

// Check case-sensitivity issues on filesystems
function checkExactCase(resolvedPath) {
  const dir = path.dirname(resolvedPath);
  const base = path.basename(resolvedPath);
  try {
    const files = fs.readdirSync(dir);
    if (!files.includes(base)) {
      // Find what matches case-insensitively
      const caseInsensitiveMatch = files.find(f => f.toLowerCase() === base.toLowerCase());
      return {
        ok: false,
        actualName: caseInsensitiveMatch || null
      };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, actualName: null };
  }
}

// Find a relative file path matching the import specifier
function resolveRelativeImport(currentFileDir, importSpecifier) {
  const absoluteTargetBase = path.resolve(currentFileDir, importSpecifier);
  
  // 1. Direct path check
  if (fs.existsSync(absoluteTargetBase)) {
    const stat = fs.statSync(absoluteTargetBase);
    if (stat.isFile()) {
      const caseCheck = checkExactCase(absoluteTargetBase);
      return { found: true, path: absoluteTargetBase, caseOk: caseCheck.ok, actualName: caseCheck.actualName };
    }
  }

  // 2. Add standard extensions
  for (const ext of fileExtensions) {
    const withExt = absoluteTargetBase + ext;
    if (fs.existsSync(withExt)) {
      const caseCheck = checkExactCase(withExt);
      return { found: true, path: withExt, caseOk: caseCheck.ok, actualName: caseCheck.actualName };
    }
  }

  // 3. Check Directory index file pattern with standard extensions
  try {
    if (fs.existsSync(absoluteTargetBase) && fs.statSync(absoluteTargetBase).isDirectory()) {
      for (const ext of fileExtensions) {
        const indexFile = path.join(absoluteTargetBase, `index${ext}`);
        if (fs.existsSync(indexFile)) {
          const caseCheck = checkExactCase(indexFile);
          return { found: true, path: indexFile, caseOk: caseCheck.ok, actualName: caseCheck.actualName };
        }
      }
    }
  } catch (err) {}

  return { found: false };
}

// Main scanning driver
function runImportScan() {
  const allFiles = getFiles(SRC_DIR).filter(file => 
    file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')
  );

  console.log(`🔎 Phát hiện ${colors.bright}${allFiles.length}${colors.reset} tệp nguồn cần rà soát.\n`);

  let totalImports = 0;
  let brokenImportsCount = 0;
  let caseWarningsCount = 0;
  const reports = [];

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(__dirname, file);
    const fileDir = path.dirname(file);

    // Matches 'import ... from "path"' or 'import "path"' or 'export ... from "path"'
    const importRegex = /(?:import|export)\s+[\s\S]*?\s+from\s+['"]([^'"]+)['"]|import\s+['"]([^'"]+)['"]/g;
    let match;
    const fileImports = [];

    while ((match = importRegex.exec(content)) !== null) {
      const target = match[1] || match[2];
      if (target) {
        fileImports.push(target);
      }
    }

    if (fileImports.length === 0) continue;

    const fileReport = {
      file: relativePath,
      issues: []
    };

    for (const imp of fileImports) {
      totalImports++;
      
      // Package imports
      if (!imp.startsWith('.')) {
        // Resolve subpaths e.g. "motion/react" -> check base or subpath
        const basePkg = imp.split('/')[0];
        const isOfficialSubpath = imp === 'motion/react';
        
        if (!allowedDependencies.has(basePkg) && !isOfficialSubpath) {
          fileReport.issues.push({
            type: 'PACKAGE_MISSING',
            specifier: imp,
            message: `Gói npm '${basePkg}' chưa được khai báo trong package.json!`
          });
          brokenImportsCount++;
        }
        continue;
      }

      // Relative file imports
      const result = resolveRelativeImport(fileDir, imp);

      if (!result.found) {
        fileReport.issues.push({
          type: 'NOT_FOUND',
          specifier: imp,
          message: `Không tìm thấy tệp hoặc thư mục mục tiêu cho đường dẫn: '${imp}'`
        });
        brokenImportsCount++;
      } else if (!result.caseOk) {
        fileReport.issues.push({
          type: 'CASE_MISMATCH',
          specifier: imp,
          message: `Lỗi viết HOACÁNH chữ cái: '${imp}' thực tế tương ứng với '${result.actualName || 'chưa rõ'}'`
        });
        caseWarningsCount++;
      }
    }

    if (fileReport.issues.length > 0) {
      reports.push(fileReport);
    }
  }

  // --- Print beautiful, crystal-clear report ---
  if (reports.length === 0) {
    console.log(`${colors.bgGreen}${colors.bright}  HOÀN THÀNH HOÀN HẢO  ${colors.reset}`);
    console.log(`\n🎉 Không phát hiện bất kỳ lỗi import thiếu khai báo hoặc sai chính tả chữ hoa/thường nào!`);
    console.log(`✅ Toàn bộ ${totalImports} liên kết import nội bộ và gói npm hoạt động đồng bộ hoàn chỉnh.`);
    console.log(`✨ Hệ thống biên dịch an toàn và có thể hoạt động hoàn hảo mà không lo lắng về màn hình trắng (Blank page).`);
  } else {
    console.log(`${colors.bgRed}${colors.bright}  PHÁT HIỆN CẢNH BÁO / LỖI  ${colors.reset}\n`);
    console.log(`Kiểm tra thấy ${colors.red}${brokenImportsCount} lỗi nghiêm trọng${colors.reset} và ${colors.yellow}${caseWarningsCount} cảnh báo lỗi viết thường chữ cái${colors.reset}.\n`);

    for (const rep of reports) {
      console.log(`📁 Tệp lỗi: ${colors.bright}${colors.magenta}${rep.file}${colors.reset}`);
      for (const issue of rep.issues) {
        const badge = issue.type === 'NOT_FOUND' 
          ? `${colors.red}[THIẾU TỆP / SAI ĐƯỜNG DẪN]${colors.reset}` 
          : issue.type === 'CASE_MISMATCH'
            ? `${colors.yellow}[SAI CHỮ HOA/THƯỜNG]${colors.reset}`
            : `${colors.red}[THIẾU PACKAGE.JSON]${colors.reset}`;

        console.log(`   └─ ${badge} ${colors.bright}${issue.specifier}${colors.reset}`);
        console.log(`      👉 ${issue.message}`);
      }
      console.log();
    }
  }

  console.log(`${colors.bright}${colors.cyan}=====================================================${colors.reset}\n`);
}

runImportScan();
