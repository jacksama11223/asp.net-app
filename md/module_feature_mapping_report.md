# 🛡️ BẢN ĐỒ PHÂN TÍCH TOÀN DIỆN: MODULE & TÍNH NĂNG SMARTLMS.AI

Tài liệu này được sinh ra tự động từ kịch bản quét mã nguồn tĩnh (`generate_module_feature_map.js`) của Antigravity. Báo cáo liệt kê chi tiết các **Thư viện/Module cốt lõi** được import vào hệ thống React Frontend và các **Tính năng Premium** được xây dựng nên từ chúng.

---

## 🏗️ 1. THƯ VIỆN CỐT LÕI & VAI TRÒ HẠ TẦNG (CORE MODULE SYSTEM)

Dưới đây là các thư viện nền tảng được import xuyên suốt toàn bộ dự án để xây dựng giao diện và xử lý logic:

| Thư viện / Module | Kiểu thư viện | Vai trò chính trong hệ thống | Phân hệ tiêu biểu sử dụng |
| :--- | :--- | :--- | :--- |
| **`@mantine/core`** | UI Component Library | Cung cấp hệ thống UI Grid, Card, Modal, Inputs, Buttons, Avatars đạt chuẩn Enterprise SaaS, tối ưu hóa CSS Variables. | Tất cả 29 trang và Components |
| **`react-icons/lu`** | Icon Pack (Lucide) | Toàn bộ hệ thống biểu tượng SVG hiện đại, tinh gọn (ví dụ: `LuCircleCheck`, `LuTrash`, `LuZap`, `LuSparkles`). | Sidebar, Certificate, Tutor Schedule |
| **`recharts`** | Data Visualization | Biểu đồ hóa dữ liệu học tập nâng cao (Area Chart, Radar Chart, Bar Chart) trực quan sinh động. | Dashboard, AI Career Report, Analytics |
| **`axios`** | HTTP Client | Xử lý các yêu cầu gọi API đồng bộ, truyền JWT Token trong header `Authorization` và tương tác CSDL. | LoginPage, CourseManager, StudyWorkspace |
| **`sonner`** | Notification Toast | Hiển thị các thông báo Toast nổi bật góc màn hình cực kỳ mượt mà, mướt mát. | LoginPage, CommunityQuizBuilder, TutorSchedule |
| **`react-router-dom`** | Client Routing | Điều hướng ứng dụng trang đơn (SPA) không tải lại trang, bảo vệ các tuyến đường bằng `ProtectedRoute`. | App.jsx, Sidebar, Dashboard |

---

## 📊 2. THỐNG KÊ CHI TIẾT TỪNG TRANG & CÁC MODULE THIẾT LẬP (FEATURE MAP)

Dưới đây là danh sách phân tích chi tiết toàn bộ các trang giao diện trong dự án, liệt kê các thư viện quan trọng được import trực tiếp để xây dựng tính năng đó:

### 🏷️ 1. Phân Hệ: `AICareerReport`
* **Tên tệp tin:** [`AICareerReport.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/AICareerReport.jsx)
* **Mô tả tính năng:** Báo cáo phân tích định hướng nghề nghiệp bằng AI, so sánh bộ kỹ năng hiện tại (Skill Gap) với thị trường tuyển dụng thực tế sử dụng biểu đồ Recharts và gợi ý các bài thực hành Roslyn Sandbox phù hợp.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `react-router-dom`

---

### 🏷️ 2. Phân Hệ: `BookingPage`
* **Tên tệp tin:** [`BookingPage.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/BookingPage.jsx)
* **Mô tả tính năng:** Phân hệ đặt lịch học gia sư (Tutor Booking Grid), chọn giảng viên và đặt khung giờ rảnh theo thời gian thực.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `react-router-dom`

---

### 🏷️ 3. Phân Hệ: `CertificateView`
* **Tên tệp tin:** [`CertificateView.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CertificateView.jsx)
* **Mô tả tính năng:** Giao diện xác minh Chứng chỉ Số hóa Premium, hiển thị tích xanh kiểm định bảo mật, chữ ký điện tử mã băm (Cryptographic Hash) và chức năng tải PDF bản cứng, chia sẻ LinkedIn.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `react-router-dom`

---

### 🏷️ 4. Phân Hệ: `CheckoutQR`
* **Tên tệp tin:** [`CheckoutQR.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CheckoutQR.jsx)
* **Mô tả tính năng:** Phân hệ thanh toán học phí tự động thông qua quét mã QR MoMo/VietQR kèm theo bộ đếm ngược thời gian thanh toán (Countdown Timer) và xác nhận hóa đơn trực tiếp.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `react-router-dom`

---

### 🏷️ 5. Phân Hệ: `CodeWorkspace`
* **Tên tệp tin:** [`CodeWorkspace.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CodeWorkspace.jsx)
* **Mô tả tính năng:** Học tập lập trình thực tế (Roslyn Coding Sandbox IDE) với trình soạn thảo code đa tính năng, bảng console hiển thị log lỗi chi tiết và kiểm thử Test Cases thời gian thực.
* **Các Module cốt lõi được import thiết lập:** `axios (Gọi API)`, `react-router-dom`

---

### 🏷️ 6. Phân Hệ: `Community`
* **Tên tệp tin:** [`Community.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Community.jsx)
* **Mô tả tính năng:** Phân hệ kết nối diễn đàn cộng đồng, thảo luận học tập, tạo bài viết mới và chia sẻ tài liệu.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 7. Phân Hệ: `CommunityFriends`
* **Tên tệp tin:** [`CommunityFriends.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx)
* **Mô tả tính năng:** Hệ thống quản lý bạn bè trực tuyến, tìm kiếm bạn học, hiển thị trạng thái hoạt động (Online/Offline) và kết nối bạn bè.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 8. Phân Hệ: `CommunityNewPost`
* **Tên tệp tin:** [`CommunityNewPost.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CommunityNewPost.jsx)
* **Mô tả tính năng:** Trình soạn thảo bài đăng mới trong Cộng đồng học viên, cho phép định dạng tiêu đề, danh mục và nội dung phong phú.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 9. Phân Hệ: `CommunityQuizBuilder`
* **Tên tệp tin:** [`CommunityQuizBuilder.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx)
* **Mô tả tính năng:** Công cụ sinh đề thi trắc nghiệm thử thách bằng AI (AI Mock Quiz Generator), tự động cấu hình bộ câu hỏi tương tác ngẫu nhiên.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 10. Phân Hệ: `CourseDetails`
* **Tên tệp tin:** [`CourseDetails.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx)
* **Mô tả tính năng:** Trang xem chi tiết khóa học, lộ trình bài học (Curriculum Section), thông tin giảng viên và các yêu cầu đầu ra của khóa học.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 11. Phân Hệ: `CourseManager`
* **Tên tệp tin:** [`CourseManager.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx)
* **Mô tả tính năng:** Bảng quản trị khóa học dành cho giảng viên (Creator Studio), tích hợp cấu hình các bài tập Compiler Sandbox và Test Cases đầu vào/đầu ra.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 12. Phân Hệ: `Courses`
* **Tên tệp tin:** [`Courses.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Courses.jsx)
* **Mô tả tính năng:** Kho khóa học mở (Marketplace), hỗ trợ tìm kiếm nâng cao, bộ lọc danh mục và hiển thị thẻ khóa học sinh động.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `react-router-dom`

---

### 🏷️ 13. Phân Hệ: `CreatorAnalytics`
* **Tên tệp tin:** [`CreatorAnalytics.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CreatorAnalytics.jsx)
* **Mô tả tính năng:** Phân hệ phân tích thu nhập và thống kê số lượng học viên dành cho giảng viên sử dụng biểu đồ Area Chart của Recharts.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `recharts (Biểu đồ)`, `axios (Gọi API)`

---

### 🏷️ 14. Phân Hệ: `Dashboard`
* **Tên tệp tin:** [`Dashboard.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx)
* **Mô tả tính năng:** Bảng điều khiển trung tâm của học viên (Student Portal), hiển thị tiến độ học tập, chuỗi ngày học liên tục (Streak Day Tracker) và các gợi ý lộ trình bằng AI.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `recharts (Biểu đồ)`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 15. Phân Hệ: `ForumHome`
* **Tên tệp tin:** [`ForumHome.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx)
* **Mô tả tính năng:** Giao diện trang chủ thảo luận học thuật, chia nhóm chủ đề (Kỹ thuật C#, MVC, AI) và hiển thị các bài đăng thịnh hành.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 16. Phân Hệ: `LandingPage`
* **Tên tệp tin:** [`LandingPage.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx)
* **Mô tả tính năng:** Trang giới thiệu chính thức của SmartLMS.AI, thiết kế chuẩn SaaS hiện đại với hiệu ứng Glassmorphism sang trọng và lời kêu gọi hành động (CTA) thu hút.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `react-router-dom`

---

### 🏷️ 17. Phân Hệ: `Leaderboard`
* **Tên tệp tin:** [`Leaderboard.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Leaderboard.jsx)
* **Mô tả tính năng:** Bảng xếp hạng thi đua học tập toàn khóa (Gamification Leaderboard), vinh danh các học viên có điểm số tích lũy cao nhất kèm huy hiệu (Badges) độc quyền.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `react-router-dom`

---

### 🏷️ 18. Phân Hệ: `LoginPage`
* **Tên tệp tin:** [`LoginPage.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/LoginPage.jsx)
* **Mô tả tính năng:** Giao diện đăng nhập chuẩn Enterprise, kết nối đồng thời hệ thống Token JWT cho Client và ký nhận Session Cookie MVC để tránh nhảy trang Login.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 19. Phân Hệ: `MessageCenter`
* **Tên tệp tin:** [`MessageCenter.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/MessageCenter.jsx)
* **Mô tả tính năng:** Trung tâm tin nhắn thời gian thực của giảng viên và học viên, giúp trao đổi bài học trực tiếp.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `sonner (Thông báo Toast)`

---

### 🏷️ 20. Phân Hệ: `MistakeNotebook`
* **Tên tệp tin:** [`MistakeNotebook.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx)
* **Mô tả tính năng:** Sổ tay ghi nhận lỗi sai thông minh (Mistake Notebook AI), tự động phân loại các lỗi biên dịch Roslyn Sandbox và đề xuất bài tập khắc phục bằng AI.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 21. Phân Hệ: `MyLearning`
* **Tên tệp tin:** [`MyLearning.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx)
* **Mô tả tính năng:** Kho khóa học đã sở hữu của tôi (My Courses Grid), hiển thị tiến độ % hoàn thành của từng khóa học trực quan.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `react-router-dom`

---

### 🏷️ 22. Phân Hệ: `PersonalWiki`
* **Tên tệp tin:** [`PersonalWiki.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/PersonalWiki.jsx)
* **Mô tả tính năng:** Thư viện tài liệu học tập cá nhân (Personal Wiki Database), cho phép ghi chú nhanh và lưu trữ kiến thức dạng thẻ.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`

---

### 🏷️ 23. Phân Hệ: `PublicProfile`
* **Tên tệp tin:** [`PublicProfile.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/PublicProfile.jsx)
* **Mô tả tính năng:** Trang cá nhân công khai của người dùng, hiển thị danh hiệu, điểm tích lũy, các chứng chỉ đã đạt được và tiến trình học tập.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 24. Phân Hệ: `RegisterPage`
* **Tên tệp tin:** [`RegisterPage.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/RegisterPage.jsx)
* **Mô tả tính năng:** Trang đăng ký tài khoản mới tích hợp kiểm tra độ mạnh của mật khẩu và kiểm soát trùng lặp tên đăng nhập.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 25. Phân Hệ: `StudyWorkspace`
* **Tên tệp tin:** [`StudyWorkspace.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx)
* **Mô tả tính năng:** Không gian học tập chuyên sâu (Study Workspace), tích hợp xem Video bài học, trao đổi trực tiếp, ghi chép nhanh và thực hành Roslyn Sandbox ngay trên một màn hình.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 26. Phân Hệ: `TutorDashboard`
* **Tên tệp tin:** [`TutorDashboard.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx)
* **Mô tả tính năng:** Bảng điều khiển quản lý lịch giảng dạy của Gia sư (Tutor Center), thống kê số giờ dạy học và thu nhập thực nhận.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `sonner (Thông báo Toast)`, `react-router-dom`

---

### 🏷️ 27. Phân Hệ: `TutorProfile`
* **Tên tệp tin:** [`TutorProfile.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/TutorProfile.jsx)
* **Mô tả tính năng:** Trang thông tin chi tiết và đánh giá năng lực của Gia sư, hiển thị các nhận xét (Reviews) từ học viên.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `react-router-dom`

---

### 🏷️ 28. Phân Hệ: `TutorProfileEdit`
* **Tên tệp tin:** [`TutorProfileEdit.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/TutorProfileEdit.jsx)
* **Mô tả tính năng:** Giao diện cập nhật hồ sơ cá nhân, lĩnh vực chuyên môn và giới thiệu bản thân của Gia sư.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `react-router-dom`

---

### 🏷️ 29. Phân Hệ: `TutorSchedule`
* **Tên tệp tin:** [`TutorSchedule.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/TutorSchedule.jsx)
* **Mô tả tính năng:** Trình quản lý lịch biểu giảng dạy của Gia sư (Mantine Calendar Integration), cho phép cấu hình linh hoạt các khung giờ rảnh theo từng thứ trong tuần.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `axios (Gọi API)`, `react-router-dom`

---

## 🧩 3. CÁC COMPONENTS ĐIỀU HƯỚNG CỐT LÕI (NAVIGATION COMPONENTS)

### 🧩 Component: `Layout`
* **Tên tệp tin:** [`Layout.jsx`](file:///c:/code/asp.net/react-test-frontend/src/components/Layout.jsx)
* **Mô tả tính năng:** Khung giao diện chính (App Shell / Master Layout), định hình thanh điều hướng Sidebar và thanh công cụ Header.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`

### 🧩 Component: `Sidebar`
* **Tên tệp tin:** [`Sidebar.jsx`](file:///c:/code/asp.net/react-test-frontend/src/components/Sidebar.jsx)
* **Mô tả tính năng:** Thanh điều hướng thông minh bên trái (Navigation Pane), tự động chuyển đổi Menu theo vai trò Học viên / Giảng viên.
* **Các Module cốt lõi được import thiết lập:** `@mantine/core`, `react-icons/lu`, `react-router-dom`


*Báo cáo kết thúc. Chúc ngài một ngày làm việc và vận hành hạ tầng thật vui vẻ!* 🟢
