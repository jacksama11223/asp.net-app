# Hướng dẫn kiểm thử thủ công và Triển khai (SmartLMS Enterprise Integration Guide)

Tài liệu này hướng dẫn chi tiết các lệnh git commit, cách build docker thủ công trên VPS, và các bước kiểm thử chi tiết cho hệ thống React và ASP.NET Core sau khi tích hợp **Coding Sandbox**, **Achievement Hub**, và **AI Analytics Dashboard**.

---

## 1. Hướng dẫn Triển khai & Rebuild trên VPS (Manual Deploy Guide)

### Bước 1: Commit các thay đổi ở local
Trước khi pull lên VPS, hãy chắc chắn bạn đã commit toàn bộ code mới nhất tại local:
```bash
git add .
git commit -m "feat: integrate premium global sandbox manager tab, C# compiler execute and AI automatic fallback challenge generator"
git push origin main
```

### Bước 2: SSH vào VPS và Pull code mới nhất
Kết nối SSH vào VPS IP `141.253.114.218`:
```bash
ssh opc@141.253.114.218
```
Sau đó di chuyển vào thư mục dự án và thực hiện pull:
```bash
cd /home/opc/asp.net-app
git pull origin main
```

### Bước 3: Dừng và Rebuild Docker Container (Tuân thủ Quy tắc DevOps)
Sử dụng lệnh sau để thực hiện dừng container cũ hoàn toàn trước để tránh xung đột tên (Name Conflict), sau đó build và khởi chạy lại ở chế độ background:
```bash
docker compose down
docker compose up -d --build
```

---

## 2. Các lệnh kiểm thử tự động & thủ công (Testing Commands)

### A. Chạy Script kiểm thử tự động (Enterprise Integration Suite)
Sau khi build và deploy thành công trên VPS, bạn có thể chạy script kiểm thử tự động `test_enterprise.cjs` trực tiếp từ máy local để quét toàn bộ luồng API, database, AI, và Monaco Sandbox Compiler:

*   **Chạy mặc định (VPS production):**
    ```bash
    node test_enterprise.cjs
    ```
*   **Chạy với máy Local Development (nếu chạy local IIS/Kestrel):**
    ```bash
    node test_enterprise.cjs http://localhost:5000
    ```

*Script sẽ quét qua 8 module lớn bao gồm: Đăng nhập/Session, Hệ thống Audit Trail lưu vết DB, Risk Predictor ML.NET, Coding Sandbox (Monaco Editor compiler), Creator Sandbox Banking & AI Fallback, Achievement Hub (XP & Badges), Negotiate SignalR real-time, và Database Integrity.*

### B. Quét chẩn đoán tính toàn vẹn của nút bấm (Button Integrity Verification)
Để ngăn chặn các nút bấm "chết" (không gán sự kiện, trỏ đến link rỗng hoặc chỉ in log/alert giả lập), đồng thời bóc tách thuộc tính placeholder/title và truy vết các API Endpoint thực tế được liên kết, hãy chạy script chẩn đoán tĩnh nâng cao:
```bash
node verify_buttons_advanced.js
```
*Script sẽ tự động phân tích tất cả các tệp React (`.js`, `.jsx`, `.tsx`) và tệp View ASP.NET Core (`.cshtml`), đồng thời xuất báo cáo ánh xạ API & placeholder chi tiết tại tệp [verify_buttons_advanced_report.md](file:///c:/code/asp.net/verify_buttons_advanced_report.md).*

---

## 3. Quy trình Kiểm thử UI/UX Thủ công trên Trình duyệt (Manual Browser Verification)

### A. Dành cho Học viên (Student Workspace)
1.  **Địa chỉ:** Đăng nhập tài khoản Học viên trên React frontend, truy cập không gian học tập tại `http://141.253.114.218/study/1`.
2.  **Khám phá giao diện Tabs responsive mới:**
    *   Phần dưới khung bài học đã được tái thiết kế thành 4 tab hiển thị song song tuyệt đẹp trên cùng 1 hàng: **Hệ thống Bài tập**, **Thực hành Code**, **Tài liệu mở rộng**, và **Điểm yếu của tôi**.
3.  **Kiểm thử luồng AI Fallback (Auto-generate challenge):**
    *   Chọn một bài học bất kỳ **chưa có bài thực hành lập trình** được thiết lập.
    *   Click vào tab **Thực hành Code**.
    *   Giao diện hiển thị Card AI premium với biểu tượng Sparkle lấp lánh và thông báo: *"Bài học này chưa có thử thách thực hành code..."*.
    *   Click nút **AI tự động tạo thử thách thực hành Code**.
    *   *Kết quả:* Hệ thống gọi API `/api/compiler/challenges/auto-create/{lessonId}`. Chỉ sau 0.5s, đề bài C# Roslyn Sandbox mẫu và 2 Test Cases tương thích sẽ được sinh tự động, màn hình cập nhật tức thì hiển thị Monaco Editor vs-dark mode sẵn sàng để gõ code!
4.  **Thực hành biên dịch code trực tiếp:**
    *   Chọn bài học **đã có thử thách code**.
    *   Đọc đề bài và testcases ở cột trái. Nhập mã C# giải quyết bài tập (ví dụ: `return input;` hoặc `return (int.Parse(input) % 2 == 0).ToString();`).
    *   Bấm **Chạy Code (Run)**.
    *   *Kết quả:* Kết quả chấm bài hiển thị chi tiết (Passed/Failed) kèm so sánh Input, Actual Output và Expected Output cho từng testcase.

---

### B. Dành cho Giảng viên (Creator Studio & Sandbox Bank)
1.  **Địa chỉ:** Đăng nhập tài khoản Instructor trên React frontend, truy cập `http://141.253.114.218/creator/courses`.
2.  **Trải nghiệm Ngân hàng đề bài tập chung (Global Sandbox Bank):**
    *   Trang quản lý được cấu hình thành 2 tab lớn: **Danh sách Khóa học** và **Ngân hàng bài tập Code (Sandbox)**.
    *   Click chọn tab **Ngân hàng bài tập Code (Sandbox)**.
    *   *Kết quả:* Bảng quản lý toàn bộ các bài tập Sandbox đang có trên hệ thống hiện ra, thể hiện rõ tên thử thách, thuộc khóa học nào, gắn với bài giảng nào, điểm XP thưởng và ngôn ngữ. Giảng viên có thể nhấn **Sửa** nhanh bất kỳ thử thách nào.
3.  **Tạo bài tập Sandbox mới và liên kết động:**
    *   Ở góc trên cùng, click nút **Tạo bài thực hành Code**.
    *   Form tạo bài tập mở ra trong modal. Nhờ hệ thống loader động, giảng viên có thể:
        1.  Chọn **Khóa học liên kết** trong dropdown.
        2.  Dropdown **Bài giảng liên kết** sẽ tự động fetch danh sách bài giảng thuộc khóa học đó và hiển thị để chọn.
    *   Nhập các thông số khác: Tiêu đề bài tập, mô tả đề bài, điểm thưởng XP, template code mẫu và hệ thống các Test Cases kiểm thử.
    *   Nhấn **Lưu & Áp dụng**.
    *   *Kết quả:* Thử thách code mới được lưu vào database và liên kết ngay lập tức với bài giảng được chọn!
