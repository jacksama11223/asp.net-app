# Bản Thiết Kế UI/UX Cấp Độ Enterprise (SmartLMS.AI)

Để hệ thống không chỉ "chạy được" mà còn phải **"gây Wow"** (WoW Effect) cho hội đồng bảo vệ và nhà tuyển dụng, giao diện của SmartLMS.AI sẽ được thiết kế theo chuẩn SaaS hiện đại nhất năm 2026. Chúng ta sẽ áp dụng triết lý thiết kế **"Learner-Centric & Gamified"** (Lấy người học làm trung tâm và Game hóa).

## 1. Ngôn ngữ Thiết kế Tổng thể (Design Language)

*   **Color Palette (Bảng màu):** Ưu tiên **Dark Mode** làm mặc định với tông màu chủ đạo là Deep Indigo (`#312e81`) và Neon Purple (`#a855f7`) để tạo cảm giác "Hacker/Coder chuyên nghiệp".
*   **Vật liệu Glassmorphism:** Các panel, thẻ bài tập (Cards) sẽ có nền trong suốt mờ ảo (`backdrop-filter: blur(10px)`) và viền sáng nhẹ, tạo chiều sâu 3D cho giao diện.
*   **Typography:** Phông chữ `Inter` cho văn bản thông thường (dễ đọc) và `Outfit` cho các Tiêu đề/Thông báo thành tích (trông hiện đại, công nghệ).
*   **Micro-animations:** 
    *   Các nút bấm sẽ nảy nhẹ (bounce) khi hover.
    *   Load trang bằng Skeleton Loaders (khung xương xám nhấp nháy) thay vì vòng xoay loading nhàm chán.
    *   Tích hợp Lottie Animations cho các trạng thái: Rỗng (Empty state), Lỗi (Error), Thành công (Success).

---

## 2. Thiết kế chi tiết cho các Màn hình Trọng điểm (Key UI Screens)

### 💻 Màn hình 1: Không gian Code & Cứu trợ (Collaborative IDE)
*Áp dụng cho Luồng 1 (Giải cứu Code) & Luồng 7 (Chấm điểm chéo).*

*   **Layout:** Chia đôi màn hình (Split-screen) có thể kéo thả thu phóng (Resizable Splitter).
*   **Panel Trái (Học tập):** 
    *   Hiển thị đề bài với Markdown rendering.
    *   Một tab "Community Help": Khi code lỗi liên tục, một nút **Floating Action Button** chớp tắt màu cam xuất hiện: `🚨 Bế tắc? Gửi lỗi này lên Cộng đồng`.
*   **Panel Phải (IDE):** 
    *   Nhúng lõi **Monaco Editor** (trình soạn thảo của VS Code) với theme `vs-dark`. 
    *   Terminal giả lập ở bên dưới để in kết quả Console chân thực.
*   **Giao diện Peer Review:** Hiển thị code dưới dạng **Git Diff** (Đỏ: Xóa, Xanh: Thêm), cho phép học viên khác click vào từng dòng code để để lại Comment (như Pull Request trên Github).

### 🌐 Màn hình 2: Mạng xã hội Học tập (Community Hub)
*Áp dụng cho Luồng 2 (Hackathon), Luồng 19 (Code Snippet), Luồng 21 (Debate).*

*   **Layout:** Giống hệt LinkedIn/Twitter, tập trung vào bảng tin (Newsfeed) cuộn vô hạn (Infinite Scroll).
*   **Thẻ Bài viết (Post Card):** 
    *   Nếu là **Code Snippet**: Code được highlight syntax (Prism.js), có nút `Copy to Clipboard` xịn xò.
    *   Nếu là **Debate (Tranh biện)**: Dưới bài viết có thanh Progress Bar chia 2 màu (Xanh/Đỏ) hiển thị tỷ lệ Upvote/Downvote trực quan, thanh này sẽ dịch chuyển realtime khi có người vote (qua SignalR).
    *   Nếu là **Live AMA (Hỏi đáp)**: Tích hợp khung đếm ngược (Countdown Timer) rực rỡ đến giờ mở phòng Zoom.

### 📊 Màn hình 3: Bảng Điều khiển AI (Teacher/Mentor Dashboard)
*Áp dụng cho Luồng 3 (Cảnh báo sớm), Luồng 22 (Lỗi sai chung).*

*   **Risk Heatmap (Bản đồ nhiệt Rủi ro):** Một lưới hiển thị học viên. Màu Xanh là an toàn, màu Đỏ rực lên là nguy cơ bỏ học cao. Click vào sẽ hiện popover phân tích từ AI.
*   **Radar Chart (Biểu đồ Mạng nhện):** Vẽ bằng ApexCharts, so sánh kỹ năng của học viên với trung bình lớp.
*   **Nút Quick Action:** Ngay cạnh tên học viên yếu, có nút `🚑 Gửi tin nhắn Động viên` hoặc `🎁 Tặng Coupon 1-1` để giảng viên thao tác chỉ trong 1 click.

### 🏆 Màn hình 4: Hồ sơ Năng lực (Verified Portfolio & Profile)
*Áp dụng cho Luồng 11 (Showcase), Luồng 26 (Streak).*

*   **Header:** Ảnh bìa (Cover photo) và Avatar to rõ ràng. Bên cạnh tên có tích xanh `✔ Verified by SmartLMS`.
*   **100DaysOfCode Heatmap:** Hiển thị biểu đồ dạng lưới ô vuông xanh đậm nhạt giống hệt GitHub Contributions để khoe độ chăm chỉ.
*   **Tủ kính Huy hiệu (Badge Showcase):** Các huy hiệu thu thập được sẽ có hiệu ứng ánh kim lấp lánh (Shimmer effect) quét qua khi di chuột vào. Nút `Chia sẻ lên LinkedIn` kèm thẻ meta tag xịn để nhà tuyển dụng xem.

---

## 3. Trải nghiệm Tương tác Thời gian thực (Real-time UX)

*   **Pháo hoa Confetti:** Khi người dùng đạt Streak (học liên tiếp) hoặc được điểm tuyệt đối, dùng thư viện `canvas-confetti` bắn pháo hoa từ góc dưới màn hình.
*   **SignalR Toast:** Bất kỳ ai Upvote code của bạn, hoặc AI phát hiện bạn làm sai, một Toast thông báo (mờ ảo) sẽ trượt từ góc phải màn hình vào kèm theo âm thanh nhỏ (pop sound).
*   **Auto-Scroll Chat:** Trong luồng ghép cặp học tập, khung chat 1-1 sẽ luôn tự động cuộn xuống tin nhắn mới nhất siêu mượt.

---
*Giao diện này không chỉ phục vụ việc học, mà nó được thiết kế để "gây nghiện" (Retention) và biến đồ án của ngài thành một sản phẩm Thương mại (Commercial-grade Product).*
