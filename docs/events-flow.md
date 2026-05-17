# Luồng Sự Kiện Tích Hợp (Enterprise Workflow)

Hệ thống đã được thiết kế một luồng Gamification và Learning Analytics khép kín cực kỳ mạnh mẽ. Dưới đây là hướng dẫn chi tiết về "Luồng rõ ràng" của các tính năng mới:

## 1. Học viên giải bài tập (Coding Sandbox)
*   **Hành động:** Học viên truy cập `http://141.253.114.218/CodingChallenge/Solve/1` và nhập code C# để giải thuật toán.
*   **Trường hợp SAI:** 
    * Nếu đoạn code lỗi hoặc không vượt qua Test Case, `CompilerService` sẽ bắt lỗi.
    * Hệ thống ngầm ghi lại lỗi này vào `MistakeLogs` (Nhật ký lỗi lập trình).
*   **Trường hợp ĐÚNG:**
    * Màn hình hiển thị pháo giấy chúc mừng (Confetti).
    * `CodingChallengeController` phát ra sự kiện `AssessmentCompletedEvent`.

## 2. Gamification Tự Động Xử Lý (Event-Driven)
Khi nhận được sự kiện hoàn thành bài thi:
*   Học viên được cộng ngay **1000 XP** vào tài khoản.
*   Hệ thống kiểm tra: Vì học viên đạt mốc 1000 XP, họ được trao tặng tự động **Huy hiệu "Grand Master"**.

## 3. Đồng Bộ Sang Các Tính Năng Khác
*   **Achievement Hub (`/Assessment/AchievementHub`):** Ngay lập tức, khi học viên mở trang này, họ sẽ thấy thanh tiến trình Level tăng vọt và thẻ Huy hiệu Grand Master rực rỡ xuất hiện trong bộ sưu tập.
*   **Real-time Notifications:** SignalR đẩy thông báo tức thời (nếu có cấu hình UI) báo hiệu học viên vừa đạt thành tựu.
*   **Community Social Loop (`http://141.253.114.218:3080`):** Hệ thống EventBus bí mật gửi một payload sang module Community (Node.js/React). Một bài post vinh danh *"Chúc mừng học viên đã đạt huy hiệu Grand Master"* sẽ tự động xuất hiện trên News Feed cộng đồng mà không cần ai nhập tay!

## 4. AI Analytics Dashboard cho Quản Lý (`/Dashboard/Analytics`)
*   Sau khi học viên thực hành, Quản trị viên (Admin) truy cập Dashboard Analytics.
*   Hệ thống Machine Learning (ML.NET) phân tích các lỗi lập trình từ `MistakeLogs` và hiển thị trực quan lên **Biểu đồ tỷ lệ lỗi phổ biến** (Common Mistakes).
*   Hệ thống cũng chạy thuật toán dự đoán xem sinh viên nào có rủi ro rớt môn (High/Medium/Low) dựa trên tiến độ và điểm số.

## Tổng Kết Luồng (Data Flow)
`[Sandbox: Code SAI] -> [MistakeLogs] -> [AI Analytics hiển thị cho Admin]`
`[Sandbox: Code ĐÚNG] -> [Thưởng 1000 XP] -> [Tặng Badge Grand Master] -> [Achievement Hub hiển thị] -> [Auto-post lên Community]`

*Tất cả những luồng này hiện đã được khắc phục hoàn toàn lỗi chuyển hướng, lỗi null và đã được Seed đầy đủ dữ liệu để ngài có thể tận tay trải nghiệm.*
