# Hướng dẫn kiểm thử thủ công và Triển khai (SmartLMS Enterprise Integration Guide)

Tài liệu này hướng dẫn chi tiết các lệnh git commit, cách build docker thủ công trên VPS, và các bước kiểm thử chi tiết cho hệ thống React và ASP.NET Core sau khi tích hợp **Coding Sandbox**, **Achievement Hub**, và **AI Analytics Dashboard**.

---

## 1. Hướng dẫn Triển khai & Rebuild trên VPS (Manual Deploy Guide)

### Bước 1: Commit các thay đổi ở local
Trước khi pull lên VPS, hãy chắc chắn bạn đã commit toàn bộ code mới nhất tại local:
```bash
git add .
git commit -m "feat: embed coding sandbox in study workspace and build instructor course/challenge creator portal"
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
Sau khi build và deploy thành công trên VPS, bạn có thể chạy script kiểm thử tự động `test_enterprise.cjs` trực tiếp từ máy local để quét toàn bộ luồng API, database, AI:
```bash
node test_enterprise.cjs
```
*Script sẽ kiểm thử tự động các module: Authentication, Audit Trail, AI Analytics, Coding Sandbox, Achievement Hub, SignalR, và Database Connectivity.*

### B. Kiểm thử thủ công trên trình duyệt (Manual Web UI Test)

#### 1. Học viên: Thực hành Coding Sandbox Nhúng (Embedded IDE)
*   **Địa chỉ:** Đăng nhập tài khoản Học viên trên React frontend, truy cập danh sách khóa học -> chọn học khóa học bất kỳ (ví dụ: `http://141.253.114.218/study/1`).
*   **Hành động:** 
    *   Trong không gian học tập, click chọn bài học dạng thực hành Code.
    *   Click vào tab **Thực hành Code**.
    *   Thay vì chuyển trang hay mở tab mới, giao diện biên dịch code C# (Monaco Editor vs-dark) sẽ xuất hiện tuyệt đẹp ngay tại vùng làm việc chính bên phải.
    *   Xem yêu cầu đề bài và danh sách test cases hiển thị trực quan ở cột trái.
    *   Nhập mã nguồn C# và bấm nút **Chạy Code (Run)**.
*   **Kết quả mong muốn:**
    *   Server Roslyn biên dịch code thực tế và trả về kết quả dynamically dưới dạng bảng chi tiết từng testcase (Passed/Failed kèm Input, Actual Output và Expected Output).
    *   Gamification: Tự động cộng điểm XP, mở khóa Huy hiệu của Achievement Hub ngay khi tất cả test cases đạt trạng thái `PASSED`.

#### 2. Giảng viên: Tạo Khóa học & Biên soạn Sandbox (Creator Course & Challenge Hub)
*   **Địa chỉ:** Đăng nhập tài khoản Giảng viên (Instructor) trên React frontend, truy cập trang Quản lý khóa học (`http://141.253.114.218/creator/courses`).
*   **Hành động 1 (Tạo khóa học):**
    *   Bấm nút **Tạo khóa học** ở góc trên cùng bên phải.
    *   Điền tên khóa học, danh mục, giá khóa học, chọn trạng thái và bấm **Lưu lại**.
    *   *Kết quả:* Khóa học mới lập tức hiển thị động lên danh sách card.
*   **Hành động 2 (Thiết kế Sandbox Lập trình):**
    *   Tại card khóa học vừa tạo hoặc khóa học có sẵn, bấm nút **Studio**.
    *   Hộp thoại Modal Studio hiển thị toàn bộ giáo trình (Modules/Lessons).
    *   Bên cạnh mỗi Lesson, bấm nút **Cấu hình Code**.
    *   Biên soạn: **Tiêu đề bài thực hành**, **Yêu cầu đề bài**, **Mã nguồn khung mẫu (Template code)**, **Điểm thưởng (XP)**, và thêm danh sách các **Test Cases** (nhập Input và Expected Output dự kiến).
    *   Bấm **Lưu & Áp dụng**.
*   **Kết quả mong muốn:**
    *   Mọi thông tin cấu hình của compiler sandbox được lưu trực tiếp vào cơ sở dữ liệu qua API `POST /api/compiler/challenges/save`.
    *   Học viên khi vào học bài học đó sẽ ngay lập tức được trải nghiệm đề bài và testcases do Giảng viên vừa thiết lập.
