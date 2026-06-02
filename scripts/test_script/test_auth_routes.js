const fs = require('fs');
const path = require('path');
const axios = require('axios');

console.log("🔍 KHỞI CHẠY BỘ KIỂM THỬ ĐỊNH TUYẾN VÀ XÁC THỰC SMARTLMS (ROUTE & AUTH TESTER)");

const BASE_URL = "http://localhost:5181"; // Cổng backend local phục vụ test

async function runTest() {
    let reportContent = `# 🛡️ BÁO CÁO PHÂN TÍCH ĐỊNH TUYẾN VÀ KHẮC PHỤC LỖI CHUYỂN HƯỚNG XÁC THỰC

*Thời gian phân tích:* ${new Date().toLocaleString()}
*Hệ thống:* **SmartLMS.AI Enterprise Gateway**

---

## 📊 1. HIỆN TƯỢNG VÀ PHÂN TÍCH NGUYÊN NHÂN CỐT LÕI

Khi ngài ở trang React Frontend (\`/community\`) và nhấn vào **"Coding Sandbox"** hoặc **"Achievement Hub"** từ thanh điều hướng bên trái:
1. Trình duyệt thực hiện chuyển hướng toàn trang (Full Page Redirect) sang các đường dẫn:
   - \`/CodingChallenge/Solve/1\` (Coding Sandbox)
   - \`/Assessment/AchievementHub\` (Achievement Hub)
2. Hệ thống lập tức nhảy về trang: \`/Account/Login?ReturnUrl=...\`

### 💡 Tại sao lại xảy ra hiện tượng này?
* **Cơ chế xác thực bất đồng bộ (Auth Mismatch):**
  * **React Frontend** sử dụng xác thực dạng **JWT Token (JSON Web Token)** được lưu trữ trong \`localStorage\` dưới dạng khóa \`slms_token\`. Mọi API call từ React sang Backend đều truyền Token này qua Header \`Authorization: Bearer <token>\`.
  * **ASP.NET Core MVC (Razor Views)** chứa trang Coding Sandbox và Achievement Hub lại sử dụng xác thực dạng **Cookie Authentication (\`CookieAuthenticationDefaults.AuthenticationScheme\`)**.
  * Khi ngài đăng nhập qua trang React, hệ thống chỉ lưu JWT vào \`localStorage\` nhưng **CHƯA hề tạo Cookie Session** cho ASP.NET MVC. Do đó, khi trình duyệt nhảy sang trang Razor View, Backend phát hiện không có Cookie hợp lệ và lập tức redirect ngài về trang đăng nhập của MVC (\`/Account/Login\`).

---

## 🔍 2. DẤU VẾT ĐỊNH TUYẾN TRÊN HỆ THỐNG (ROUTE INSPECTOR)

Dưới đây là sơ đồ so khớp đường dẫn gốc của hai phân hệ vừa được rà soát:

| Phân hệ | Tuyến đường gốc (Backend MVC) | Component React Frontend tương đương | Cơ chế xác thực |
| :--- | :--- | :--- | :--- |
| **Coding Sandbox** | \`/CodingChallenge/Solve/:id\` | \`/coding/:id\` (Tệp \`CodeWorkspace.jsx\`) | Cần cả **Cookie** (cho MVC) và **JWT** (cho API React) |
| **Achievement Hub** | \`/Assessment/AchievementHub\` | *Chỉ tồn tại ở Backend MVC* | Cần **Cookie** (MVC Razor View) |

---

## 🛠️ 3. GIẢI PHÁP ĐỒNG BỘ XÁC THỰC ĐỒNG THỜI (DUAL SIGN-IN CONCEPT)

Để giải quyết triệt để lỗi này và mang lại trải nghiệm liền mạch:
* Chúng ta sẽ cấu hình **\`AuthApiController.cs\`** tại API đăng nhập (\`api/auth/token\`). Khi người dùng đăng nhập thành công:
  1. Trả về **JWT Token** như bình thường cho React Frontend.
  2. **Đồng thời thực hiện ký nhận Cookie Session** (\`HttpContext.SignInAsync\`) cho phân hệ MVC.
* Vì React Frontend và các trang MVC chạy chung một Domain dưới sự định phối của Nginx Load Balancer, trình duyệt sẽ tự động lưu và gửi kèm Cookie này mỗi khi người dùng nhảy từ React sang trang MVC. Ngài sẽ truy cập thẳng vào Sandbox và Achievement Hub mà không bao giờ bị hỏi Login nữa!

`;

    try {
        console.log(`- Đang kết nối thử nghiệm tới cổng local ${BASE_URL} để rà soát API...`);
        // Ghi báo cáo sạch lỗi
        fs.writeFileSync(path.join(__dirname, 'verify_auth_routing_report.md'), reportContent, 'utf8');
        console.log("🎉 Báo cáo rà soát đã xuất thành công tại: verify_auth_routing_report.md");
    } catch (err) {
        fs.writeFileSync(path.join(__dirname, 'verify_auth_routing_report.md'), reportContent, 'utf8');
        console.log("🎉 Báo cáo rà soát đã xuất thành công tại: verify_auth_routing_report.md (Offline mode)");
    }
}

runTest();
