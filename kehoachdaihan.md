# Kế hoạch Dài hạn: Mở rộng Hệ sinh thái SmartLMS (EdTech + HRTech)

Bản kế hoạch này được xây dựng dựa trên việc đối chiếu cấu trúc Database hiện tại (MariaDB) của SmartLMS, thư viện UI đang sử dụng (React) và định hướng mở rộng hệ sinh thái theo sơ đồ Figma được cung cấp.

---

## 1. Đối chiếu Database (Hiện tại vs Mở rộng)

Hệ thống hiện tại đã có một nền tảng quản lý học tập (LMS) rất vững chắc. Để chuyển mình thành một Hệ sinh thái tuyển dụng, chúng ta sẽ tận dụng các bảng có sẵn và bổ sung các bảng kết nối.

### Bảng dữ liệu hiện tại (Đã có sẵn trong MariaDB)
- **Học tập & Nội dung:** `Course`, `Lesson`, `Flashcard`, `MistakeLog`, `Enrollment`.
- **Đánh giá năng lực:** `Exam`, `Question`, `QuizAttempt`, `CodingChallenge`.
- **Doanh nghiệp & Hệ thống:** `Organization` (hiện đang dùng cho giới hạn API/Webhook).
- **Người dùng:** `User` (Đã hỗ trợ Role: Admin, Student, Instructor).

### Bảng dữ liệu cần thêm mới (Database Schema Expansion)
Để hiện thực hóa "Cây cầu AI" kết nối Học viên và Doanh nghiệp, chúng ta sẽ cần thêm các bảng sau:

1. **Từ điển Kỹ năng (Skill Dictionary)**
   - `Skills`: (SkillId, Name, Category) - VD: C#, React, Kỹ năng mềm.
   - `CourseSkills`: Bản đồ hóa Khóa học A cung cấp Kỹ năng B ở mức độ nào.

2. **Hồ sơ Năng lực Học viên (Student Competency)**
   - `StudentSkills`: Lưu mức độ thành thạo thực tế của học viên (Tính toán tự động từ kết quả `Exam` và `CodingChallenge`).

3. **Cổng Tuyển dụng Doanh nghiệp (Employer Portal)**
   - **Nâng cấp `Organization`**: Bổ sung trường Logo, Lĩnh vực, Mô tả công ty.
   - `JobPostings`: Tin tuyển dụng (JobId, OrganizationId, Title, Salary, Status).
   - `JobSkillRequirements`: Yêu cầu kỹ năng (JobId, SkillId, RequiredLevel).
   - `JobApplications`: Lưu hồ sơ ứng tuyển của học viên vào công ty.

---

## 2. Quy hoạch sử dụng thư viện UI (Tránh xung đột)

Việc phát triển thêm Cổng Doanh Nghiệp (B2B) đòi hỏi xây dựng nhiều giao diện mới. Để giữ cho code "sạch", tốc độ load nhanh và **tuyệt đối không bị xung đột CSS**, hệ thống sẽ tuân thủ nghiêm ngặt các quy tắc sau:

### Thư viện cốt lõi (Core Stack hiện tại)
Dựa trên `package.json`, chúng ta đang có một bộ khung cực kỳ hiện đại:
- **UI Framework:** `@mantine/core` (v9.1)
- **Styling:** `tailwindcss` (v4)
- **Icons:** `lucide-react` & `react-icons/lu`
- **Animation:** `framer-motion` & `@formkit/auto-animate`

### Nguyên tắc Phát triển Frontend:
1. **Không thêm Framework mới:** Tuyệt đối KHÔNG cài đặt thêm Material UI (MUI), Chakra UI, hay Bootstrap. Việc cài nhiều framework UI sẽ làm hỏng thiết kế và xung đột class.
2. **Component Đóng gói (Mantine):** Các thành phần phức tạp của nhà tuyển dụng (Bảng danh sách ứng viên, Form đăng tin tuyển dụng, DatePicker) sẽ **100% sử dụng Mantine**.
3. **Căn chỉnh tự do (Tailwind):** Sử dụng TailwindCSS để tạo Layout (Grid, Flex), chỉnh màu sắc, margin/padding. Tailwind v4 cực kỳ mạnh mẽ để tạo thiết kế Responsive.
4. **Hệ thống Icon Đồng nhất:** Chỉ sử dụng họ Icon `Lu` (Lucide) để toàn bộ hệ sinh thái (từ góc độ học viên đến nhà tuyển dụng) có chung một ngôn ngữ thiết kế tối giản, chuyên nghiệp.

---

## 3. Lộ trình Phát triển Hệ sinh thái (Phân đoạn theo Sơ đồ)

Dựa vào sơ đồ Figma, mũi tên đỏ (Cầu nối AI) là điểm nhấn quan trọng nhất. Dưới đây là lộ trình 3 bước để hoàn thiện:

### Bước 1: Số hóa Năng lực (Dành cho Học viên)
- Viết Logic: Tự động chấm điểm từ `QuizAttempt` và `CodingChallenge` để quy đổi thành "Điểm Kinh nghiệm Kỹ năng" lưu vào bảng `StudentSkills`.
- Xây dựng giao diện "Hồ sơ Năng lực AI" (Trang cá nhân của học viên, hiển thị biểu đồ Radar chart các kỹ năng đang có).

### Bước 2: Cổng Thông Tin Doanh Nghiệp (Dành cho HR)
- Tạo Role mới: `Employer`.
- Xây dựng giao diện Dashboard cho HR: Quản lý thông tin Công ty (Organization), Tạo/Sửa tin tuyển dụng (JobPostings), cấu hình kỹ năng cần thiết (JobSkillRequirements).

### Giai đoạn 4: Vòng lặp Gamification & Thông báo (Engage & Notify)
- **Hệ thống Streak & EXP**: Thiết kế logic cộng điểm EXP khi hoàn thành bài tập, duy trì Streak hàng ngày để kích thích học tập.
- **Notification Engine**: Xây dựng hệ thống thông báo thời gian thực (SignalR) cho các tương tác: Tác giả trả lời câu hỏi, bạn bè nhắc tên trong thảo luận.

### Giai đoạn 5: Vòng lặp Mentoring & Cộng đồng (Peer-to-Peer)
- **Hỏi-Đáp thông minh**: Tính năng "Trích xuất thắc mắc" từ lỗi sai trong bài thi để đẩy lên diễn đàn.
- **Verified Answers**: Cho phép tác giả khóa học hoặc Mentor xác thực câu trả lời chuẩn (Highlight đáp án).

### Giai đoạn 6: Hệ thống Wiki Cá nhân (Notion-like Workspace)
- **Tổ chức nội dung**: Cho phép người dùng tạo các trang ghi chú cá nhân, tùy biến giao diện và cấu trúc thư mục.
- **Tạo nội dung tự động**: Bôi đen đoạn văn bản để tự động chuyển hóa thành Flashcard hoặc bài Test nhanh.
- **Cộng tác**: Mời bạn bè cùng biên tập và thảo luận trên các trang tài liệu cá nhân.
