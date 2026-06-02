# 🛡️ BÁO CÁO ÁN XẠ NGƯỢC HỆ THỐNG: THƯ VIỆN & CÁC TÍNH NĂNG ĐƯỢC XÂY DỰNG

Báo cáo này liệt kê chi tiết các **Thư viện / Module** cốt lõi được import vào dự án SmartLMS.AI, và ngay bên dưới mỗi thư viện là danh sách tất cả các **Tính năng (Pages / Components)** được xây dựng và củng cố bởi thư viện đó.

---

## 📡 Module API Connection (`axios`)

*Vai trò trong hệ thống:* Hỗ trợ các tính năng tương tác chuyên sâu.

| Tên Trang / Tính năng sử dụng | File mã nguồn | Mô tả chi tiết cách sử dụng Module này để lập trình tính năng |
| :--- | :--- | :--- |
| **LoginPage** | [`LoginPage.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/LoginPage.jsx) | Xác thực tài khoản: Gửi yêu cầu đăng nhập lên API `/api/auth/token` để nhận về JWT và thông tin hồ sơ người dùng. |
| **RegisterPage** | [`RegisterPage.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/RegisterPage.jsx) | Đăng ký thành viên: Gửi thông tin đăng ký (Username, Email, Mật khẩu) lên `/api/auth/register` để khởi tạo tài khoản mới. |
| **Courses** | [`Courses.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Courses.jsx) | Tải danh sách khóa học: Tải động toàn bộ danh mục khóa học hiện có từ cơ sở dữ liệu backend phục vụ hiển thị ở Marketplace. |
| **CourseDetails** | [`CourseDetails.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx) | Tải chi tiết bài học: Lấy thông tin chi tiết của một khóa học, mục lục chương trình giảng dạy và đánh giá chất lượng. |
| **CheckoutQR** | [`CheckoutQR.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CheckoutQR.jsx) | Tạo cổng thanh toán: Gửi thông tin đơn hàng để yêu cầu sinh mã VietQR hoặc MoMo phục vụ giao dịch học phí. |
| **MyLearning** | [`MyLearning.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx) | Tải khóa học đã mua: Đồng bộ hóa danh sách các khóa học mà học viên hiện tại đã kích hoạt hoặc sở hữu. |
| **StudyWorkspace** | [`StudyWorkspace.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx) | Trình học tập tương tác: Lưu vết tiến độ bài học, gửi ghi chép cá nhân về Database, và tải động video, học liệu tương ứng. |
| **CodeWorkspace** | [`CodeWorkspace.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CodeWorkspace.jsx) | Compiler Sandbox Engine: Gửi mã nguồn C# Roslyn trực tiếp lên compiler backend để biên dịch và đối chiếu Testcases thời gian thực. |
| **TutorSchedule** | [`TutorSchedule.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/TutorSchedule.jsx) | Đồng bộ lịch giảng dạy: Gửi dữ liệu đăng ký khung giờ rảnh của Gia sư về lưu trữ an toàn trong CSDL. |
| **CourseManager** | [`CourseManager.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx) | Creator Studio: Thực hiện các truy vấn CUD (Thêm, sửa, xóa khóa học), cấu hình đề bài thực hành Sandbox và bài test. |
| **AICareerReport** | [`AICareerReport.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/AICareerReport.jsx) | Tải phân tích AI: Gửi yêu cầu phân tích lỗ hổng kỹ năng và nhận về kết quả tư vấn nghề nghiệp sinh bởi mô hình học máy. |

---

## 📊 Module Vẽ Biểu Đồ & Trực Quan Hóa (`recharts`)

*Vai trò trong hệ thống:* Hỗ trợ các tính năng tương tác chuyên sâu.

| Tên Trang / Tính năng sử dụng | File mã nguồn | Mô tả chi tiết cách sử dụng Module này để lập trình tính năng |
| :--- | :--- | :--- |
| **AICareerReport** | [`AICareerReport.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/AICareerReport.jsx) | Biểu đồ Radar & Bar Chart: So sánh đa chiều giữa 5 kỹ năng cốt lõi của học viên với tiêu chuẩn thị trường tuyển dụng hiện tại. |
| **CreatorAnalytics** | [`CreatorAnalytics.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CreatorAnalytics.jsx) | Biểu đồ Area Chart & Line Chart: Thống kê và hiển thị trực quan xu hướng tăng trưởng doanh thu khóa học và số lượng học viên đăng ký mới. |
| **Dashboard** | [`Dashboard.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx) | Biểu đồ theo dõi tiến độ: Vẽ biểu đồ biểu diễn tốc độ tích lũy kiến thức và tần suất tương tác học tập của học viên. |
| **MistakeNotebook** | [`MistakeNotebook.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx) | Biểu đồ phân tích lỗi sai: Phân nhóm các lỗi biên dịch C# Roslyn phổ biến nhất của học viên theo dạng biểu đồ tròn/biểu đồ cột. |

---

## 🔔 Module Thông Báo Trực Quan (`sonner`)

*Vai trò trong hệ thống:* Hỗ trợ các tính năng tương tác chuyên sâu.

| Tên Trang / Tính năng sử dụng | File mã nguồn | Mô tả chi tiết cách sử dụng Module này để lập trình tính năng |
| :--- | :--- | :--- |
| **LoginPage** | [`LoginPage.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/LoginPage.jsx) | Thông báo trạng thái đăng nhập: Hiển thị Toast thông báo đăng nhập thành công mượt mà hoặc hiển thị chi tiết lỗi kết nối. |
| **TutorSchedule** | [`TutorSchedule.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/TutorSchedule.jsx) | Xác nhận lịch biểu: Báo hiệu ngay khi gia sư thêm hoặc xóa thành công một khung giờ rảnh trong tuần. |
| **CommunityQuizBuilder** | [`CommunityQuizBuilder.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx) | Khởi động thi thử: Hiển thị thông báo Toast kích hoạt bộ đề thi thử AI thành công và sẵn sàng tính giờ. |
| **CodeWorkspace** | [`CodeWorkspace.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CodeWorkspace.jsx) | Phản hồi kết quả biên dịch: Hiển thị Toast thông báo ngay lập tức trạng thái biên dịch (Success / Failed) hoặc kết quả Testcases đạt được. |
| **CourseDetails** | [`CourseDetails.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx) | Xác nhận ghi danh: Hiển thị Toast thông báo đăng ký khóa học thành công khi học viên kích hoạt bài học. |

---

## 🗺️ Module Định Tuyến & Điều Hướng (`react-router-dom`)

*Vai trò trong hệ thống:* Hỗ trợ các tính năng tương tác chuyên sâu.

| Tên Trang / Tính năng sử dụng | File mã nguồn | Mô tả chi tiết cách sử dụng Module này để lập trình tính năng |
| :--- | :--- | :--- |
| **App** | [`App.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/App.jsx) | Kiến trúc định tuyến lõi: Định nghĩa tất cả các tuyến đường (Router Routes), quản lý ProtectedRoute và cấu hình điều hướng dự phòng. |
| **Sidebar** | [`Sidebar.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Sidebar.jsx) | Menu định hướng vai trò: Xác định trạng thái active của menu hiện tại và thực hiện chuyển trang Single Page App không tải lại. |
| **Dashboard** | [`Dashboard.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx) | Nút tắt điều hướng: Hỗ trợ học viên nhấn nhanh để nhảy vào các khóa học đang học dở dang hoặc chuyển sang Wiki. |
| **Courses** | [`Courses.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Courses.jsx) | Chuyển hướng thanh toán: Chuyển tiếp người dùng sang trang checkout kèm theo ID khóa học cụ thể khi nhấn mua. |
| **MyLearning** | [`MyLearning.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx) | Mở không gian học tập: Điều hướng học viên trực tiếp vào phòng học `StudyWorkspace` của khóa học tương ứng. |
| **Layout** | [`Layout.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Layout.jsx) | Bộ khung định tuyến: Cung cấp Outlet để render động nội dung của từng route cụ thể bên trong Layout master. |

---

## ✨ Module Biểu Tượng & Chỉ Số Visual (`react-icons/lu`)

*Vai trò trong hệ thống:* Hỗ trợ các tính năng tương tác chuyên sâu.

| Tên Trang / Tính năng sử dụng | File mã nguồn | Mô tả chi tiết cách sử dụng Module này để lập trình tính năng |
| :--- | :--- | :--- |
| **Sidebar** | [`Sidebar.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Sidebar.jsx) | Hệ thống Icon Menu: Thiết lập các biểu tượng cho menu (Dashboard, Sổ tay lỗi, Khóa học, Diễn đàn, Sandbox). |
| **CertificateView** | [`CertificateView.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/CertificateView.jsx) | Tích xanh kiểm định: Sử dụng biểu tượng `LuCircleCheck` (Màu xanh Emerald) khẳng định chứng chỉ đã lưu vết blockchain/CSDL. |
| **TutorSchedule** | [`TutorSchedule.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/TutorSchedule.jsx) | Icon quản lý: Sử dụng `LuTrash` cho nút xóa lịch biểu, `LuSparkles` cho các chỉ dẫn tự động. |
| **MistakeNotebook** | [`MistakeNotebook.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx) | Phân loại lỗi: Sử dụng các icon cảnh báo (`LuZap`, `LuSettings`) để hiển thị mức độ nghiêm trọng của lỗi sai. |
| **Dashboard** | [`Dashboard.jsx`](file:///c:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx) | Chỉ số Streak: Sử dụng biểu tượng ngọn lửa (`LuSparkles` / `LuZap`) để biểu đạt số ngày học liên tục. |

---

## 🎨 Module Layout & Giao Diện Khung (`@mantine/core`)

*Vai trò trong hệ thống:* Cung cấp toàn bộ thiết kế giao diện SaaS.

| Tên Trang / Tính năng sử dụng | File mã nguồn | Mô tả chi tiết cách sử dụng Module này để lập trình tính năng |
| :--- | :--- | :--- |
| **Tất cả các Phân hệ & Layout** | `Mantine Core` | Sử dụng toàn bộ hệ thống UI Component (SimpleGrid, Group, Card, Modal, Inputs, Buttons) để xây dựng 29 trang giao diện đạt chuẩn Enterprise. |

---


*Báo cáo liên kết ngược được sinh ra tự động nhằm mục đích tối ưu hóa quá trình quản trị và rà soát dependency hệ thống. Chúc ngài vận hành SmartLMS.AI thật trơn tru!* 🟢
