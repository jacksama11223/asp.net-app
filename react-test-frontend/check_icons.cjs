const fs = require('fs');
const path = require('path');

// Đường dẫn tới thư mục chứa các module của react-icons/lu
const luPath = path.join(__dirname, 'node_modules', 'react-icons', 'lu');

if (!fs.existsSync(luPath)) {
  console.log('Không tìm thấy react-icons/lu. Vui lòng chạy npm install trước.');
  process.exit(1);
}

try {
  // Đọc file index.d.ts hoặc package.json để tìm hiểu danh sách export
  // Cách chắc chắn nhất là require module và lấy các keys (nhưng ở dạng module esm có thể gặp khó khăn với commonjs)
  // Thay vào đó, ta đọc file index.d.ts vì nó chứa danh sách type definition của tất cả các icon.
  const dtsPath = path.join(luPath, 'index.d.ts');
  if (fs.existsSync(dtsPath)) {
    const content = fs.readFileSync(dtsPath, 'utf8');
    // Regex tìm các dòng dạng: export declare const LuActivity: IconType;
    const regex = /export declare const (Lu[A-Za-z0-9]+):/g;
    let match;
    const icons = [];
    while ((match = regex.exec(content)) !== null) {
      icons.push(match[1]);
    }
    
    console.log(`✅ Tìm thấy tổng cộng ${icons.length} Lucide Icons (Lu...) được hỗ trợ.`);
    
    // Lưu ra file log để dễ tra cứu
    const logFile = path.join(__dirname, 'available_lu_icons.txt');
    fs.writeFileSync(logFile, icons.join('\n'), 'utf8');
    console.log(`📄 Đã xuất danh sách chi tiết ra file: ${logFile}`);
    
    // Gợi ý một số icon phổ biến để kiểm tra
    const popularIcons = ['LuInfo', 'LuCheck', 'LuAlertTriangle', 'LuCheckCircle', 'LuCheckCircle2', 'LuMoreVertical', 'LuMenu'];
    console.log('\n🔍 Trạng thái các icon bạn quan tâm:');
    popularIcons.forEach(icon => {
      if (icons.includes(icon)) {
        console.log(`  🟢 ${icon}: Có sẵn`);
      } else {
        console.log(`  🔴 ${icon}: KHÔNG TỒN TẠI trong phiên bản này`);
      }
    });

  } else {
    console.log('Không tìm thấy file index.d.ts của react-icons/lu.');
  }
} catch (error) {
  console.error('Lỗi khi kiểm tra icon:', error.message);
}
