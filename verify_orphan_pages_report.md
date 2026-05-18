# Báo cáo Chẩn đoán Trang "Mồ Côi" (UI Orphan & Unreachable Pages Audit)

*Thời gian quét:* 18:58:36 18/5/2026
*Mục đích:* Phát hiện các trang giao diện đã được code nhưng **chưa hề có bất kỳ nút bấm hoặc liên kết nào dẫn tới** (khiến người dùng không thể truy cập từ giao diện chính).

--- 

## 📊 BẢNG TỔNG HỢP TOÀN HỆ THỐNG (SYSTEM STATUS)

| Chỉ số kiểm thử | Số lượng | Trạng thái |
| :--- | :--- | :--- |
| 🟢 Trang có thể truy cập (Reachable Pages) | **55** | Hoạt động tốt trong luồng người dùng |
| 🔴 Trang "mồ côi" / Chưa có liên kết (Orphan Pages) | **25** | Cần bổ sung nút bấm/link chuyển hướng |
| 📊 Tổng số trang giao diện đã quét | **80** | Toàn bộ tệp UI phân hệ |

--- 

## 🔴 DANH SÁCH CÁC TRANG "MỒ CÔI" CẦN BỔ SUNG LIÊN KẾT (ORPHAN PAGES - 25)

Dưới đây là các trang đã được lập trình giao diện nhưng **đang bị cô lập** khỏi luồng đi của người dùng:

| Tên trang | Công nghệ | Đường dẫn thiết lập | Tính năng trang | Đề xuất hành động bổ sung |
| :--- | :--- | :--- | :--- | :--- |
| `AICareerReport.jsx` | `React Page` | `/ai-career-report` | Báo cáo định hướng nghề nghiệp bằng AI dựa trên hiệu năng code C#. | Thêm nút bấm điều hướng `navigate('/ai-career-report')` từ trang Dashboard, Sidebar, hoặc trang liên quan. |
| `CertificateView.jsx` | `React Page` | `/certificate/1` | Trang cấp chứng chỉ hoàn thành khóa học tích hợp QR Code xác thực. | Thêm nút bấm điều hướng `navigate('/certificate/1')` từ trang Dashboard, Sidebar, hoặc trang liên quan. |
| `CodeWorkspace.jsx` | `React Page` | `/coding/1` | Không gian thực hành code C# tích hợp Monaco Editor. | Thêm nút bấm điều hướng `navigate('/coding/1')` từ trang Dashboard, Sidebar, hoặc trang liên quan. |
| `CommunityQuizBuilder.jsx` | `React Page` | `/community/quiz-builder` | Trình tạo câu hỏi trắc nghiệm chia sẻ lên diễn đàn. | Thêm nút bấm điều hướng `navigate('/community/quiz-builder')` từ trang Dashboard, Sidebar, hoặc trang liên quan. |
| `TutorProfile.jsx` | `React Page` | `/tutor/profile/1` | Trang hiển thị hồ sơ năng lực của Gia sư. | Thêm nút bấm điều hướng `navigate('/tutor/profile/1')` từ trang Dashboard, Sidebar, hoặc trang liên quan. |
| `TutorProfileEdit.jsx` | `React Page` | `/tutor/profile/edit` | Trang cập nhật hồ sơ cá nhân của Gia sư. | Thêm nút bấm điều hướng `navigate('/tutor/profile/edit')` từ trang Dashboard, Sidebar, hoặc trang liên quan. |
| `TutorSchedule.jsx` | `React Page` | `/tutor/schedule` | Trang thiết lập khung giờ rảnh rỗi của Gia sư. | Thêm nút bấm điều hướng `navigate('/tutor/schedule')` từ trang Dashboard, Sidebar, hoặc trang liên quan. |
| `AccessDenied.cshtml` | `ASP.NET MVC View` | `/Account/AccessDenied` | Trang quản lý nghiệp vụ Account - hành động AccessDenied. | Tích hợp thẻ TagHelper `asp-controller="Account" asp-action="AccessDenied"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `AchievementHub.cshtml` | `ASP.NET MVC View` | `/Assessment/AchievementHub` | Trang quản lý nghiệp vụ Assessment - hành động AchievementHub. | Tích hợp thẻ TagHelper `asp-controller="Assessment" asp-action="AchievementHub"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Index.cshtml` | `ASP.NET MVC View` | `/Assessment` | Trang quản lý nghiệp vụ Assessment - hành động Index. | Tích hợp thẻ TagHelper `asp-controller="Assessment" asp-action="Index"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Solve.cshtml` | `ASP.NET MVC View` | `/CodingChallenge/Solve` | Trang quản lý nghiệp vụ CodingChallenge - hành động Solve. | Tích hợp thẻ TagHelper `asp-controller="CodingChallenge" asp-action="Solve"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Create.cshtml` | `ASP.NET MVC View` | `/CodingChallengeManagement/Create` | Trang quản lý nghiệp vụ CodingChallengeManagement - hành động Create. | Tích hợp thẻ TagHelper `asp-controller="CodingChallengeManagement" asp-action="Create"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Edit.cshtml` | `ASP.NET MVC View` | `/CodingChallengeManagement/Edit` | Trang quản lý nghiệp vụ CodingChallengeManagement - hành động Edit. | Tích hợp thẻ TagHelper `asp-controller="CodingChallengeManagement" asp-action="Edit"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Members.cshtml` | `ASP.NET MVC View` | `/Cohort/Members` | Quản lý thành viên lớp học, cohort cụ thể (Admin). | Tích hợp thẻ TagHelper `asp-controller="Cohort" asp-action="Members"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Create.cshtml` | `ASP.NET MVC View` | `/Coupon/Create` | Trang quản lý nghiệp vụ Coupon - hành động Create. | Tích hợp thẻ TagHelper `asp-controller="Coupon" asp-action="Create"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Create.cshtml` | `ASP.NET MVC View` | `/CourseManagement/Create` | Trang quản lý nghiệp vụ CourseManagement - hành động Create. | Tích hợp thẻ TagHelper `asp-controller="CourseManagement" asp-action="Create"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Curriculum.cshtml` | `ASP.NET MVC View` | `/CourseManagement/Curriculum` | Thiết lập khung chương trình học, thêm bớt bài giảng (Admin). | Tích hợp thẻ TagHelper `asp-controller="CourseManagement" asp-action="Curriculum"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Edit.cshtml` | `ASP.NET MVC View` | `/CourseManagement/Edit` | Trang quản lý nghiệp vụ CourseManagement - hành động Edit. | Tích hợp thẻ TagHelper `asp-controller="CourseManagement" asp-action="Edit"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Index.cshtml` | `ASP.NET MVC View` | `/Home` | Trang quản lý nghiệp vụ Home - hành động Index. | Tích hợp thẻ TagHelper `asp-controller="Home" asp-action="Index"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Privacy.cshtml` | `ASP.NET MVC View` | `/Home/Privacy` | Trang quản lý nghiệp vụ Home - hành động Privacy. | Tích hợp thẻ TagHelper `asp-controller="Home" asp-action="Privacy"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Designer.cshtml` | `ASP.NET MVC View` | `/Marketing/Designer` | Trang quản lý nghiệp vụ Marketing - hành động Designer. | Tích hợp thẻ TagHelper `asp-controller="Marketing" asp-action="Designer"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Failure.cshtml` | `ASP.NET MVC View` | `/Payment/Failure` | Trang quản lý nghiệp vụ Payment - hành động Failure. | Tích hợp thẻ TagHelper `asp-controller="Payment" asp-action="Failure"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `PaymentResults.cshtml` | `ASP.NET MVC View` | `/Payment/PaymentResults` | Trang quản lý nghiệp vụ Payment - hành động PaymentResults. | Tích hợp thẻ TagHelper `asp-controller="Payment" asp-action="PaymentResults"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Success.cshtml` | `ASP.NET MVC View` | `/Payment/Success` | Trang quản lý nghiệp vụ Payment - hành động Success. | Tích hợp thẻ TagHelper `asp-controller="Payment" asp-action="Success"` tại menu Sidebar Admin hoặc trang quản trị chung. |
| `Error.cshtml` | `ASP.NET MVC View` | `/Shared/Error` | Trang quản lý nghiệp vụ Shared - hành động Error. | Tích hợp thẻ TagHelper `asp-controller="Shared" asp-action="Error"` tại menu Sidebar Admin hoặc trang quản trị chung. |

--- 

## 🟢 DANH SÁCH CÁC TRANG ĐÃ LIÊN KẾT THÀNH CÔNG (REACHABLE PAGES - 55)

Các trang này đã được kết nối hoàn hảo với các nút bấm/liên kết từ các trang khác:

### 📄 Trang: [BookingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/BookingPage.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/booking`
* **Mô tả:** *Trang đăng ký lịch hẹn tư vấn với Gia sư AI/Giảng viên.*
* **Các nguồn nút bấm dẫn tới trang này (2):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Dashboard.jsx` | 246 | `React Navigate` | `<Button variant="light" color="brand" radius="md" leftSection={<LuClock size={18} />} onClick={() => navigate('/booking')}>Book Tutor</Button>` |
| `react-test-frontend\src\pages\TutorProfile.jsx` | 105 | `React Navigate` | `onClick={() => navigate('/booking')}` |

---

### 📄 Trang: [CheckoutQR.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CheckoutQR.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/checkout/1`
* **Mô tả:** *Trang thanh toán học phí qua mã QR chuyển khoản.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CourseDetails.jsx` | 325 | `React Navigate` | `onClick={() => navigate(`/checkout/${id}`)}` |

---

### 📄 Trang: [Community.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Community.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/community`
* **Mô tả:** *Trang giao diện học viên/giảng viên.*
* **Các nguồn nút bấm dẫn tới trang này (5):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 62 | `React Navigate` | `navigate('/community');` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 79 | `React Navigate` | `onClick={() => navigate('/community')}` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 196 | `React Navigate` | `<Button variant="subtle" color="gray" radius="xl" onClick={() => navigate('/community')}>Hủy</Button>` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 98 | `HTML Link` | `<a class="navbar-brand fw-bold fs-4" href="/Community">` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 106 | `HTML Link` | `<li class="nav-item"><a class="nav-link px-3" href="/Community">Khám phá</a></li>` |

---

### 📄 Trang: [CommunityFriends.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/community/friends`
* **Mô tả:** *Trang quản lý bạn bè và kết nối học viên.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Community.jsx` | 268 | `React Navigate` | `<Button variant="light" fullWidth mt="xl" radius="xl" onClick={() => navigate('/community/friends')}>` |

---

### 📄 Trang: [CommunityNewPost.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityNewPost.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/community/post/new`
* **Mô tả:** *Trang đăng chủ đề/bài viết thảo luận mới.*
* **Các nguồn nút bấm dẫn tới trang này (4):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Community.jsx` | 67 | `React Navigate` | `onClick={() => navigate('/community/post/new')}` |
| `react-test-frontend\src\pages\ForumHome.jsx` | 72 | `React Navigate` | `onClick={() => navigate('/community/post/new')}` |
| `react-test-frontend\src\pages\MistakeNotebook.jsx` | 236 | `React Navigate` | `onClick={() => navigate('/community/post/new', {` |
| `react-test-frontend\src\pages\StudyWorkspace.jsx` | 577 | `React Navigate` | `onClick={() => navigate('/community/post/new', {` |

---

### 📄 Trang: [CourseDetails.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/course/1`
* **Mô tả:** *Trang thông tin chi tiết khóa học, đề cương và giáo trình.*
* **Các nguồn nút bấm dẫn tới trang này (3):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CourseManager.jsx` | 354 | `React Navigate` | `<Button variant="light" color="slate" size="xs" leftSection={<LuEye size={14} />} onClick={() => navigate(`/course/${course.courseId}`)}>` |
| `react-test-frontend\src\pages\Courses.jsx` | 184 | `React Navigate` | `onClick={() => navigate(`/course/${course.courseId}`)}` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 543 | `HTML Link` | `window.location.href = '/Course/Search?q=' + $(this).val();` |

---

### 📄 Trang: [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/creator/courses`
* **Mô tả:** *Không gian quản lý khóa học của Giảng viên.*
* **Các nguồn nút bấm dẫn tới trang này (3):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Dashboard.jsx` | 104 | `React Navigate` | `onClick={() => navigate('/creator/courses')}` |
| `react-test-frontend\src\pages\Dashboard.jsx` | 127 | `React Navigate` | `<Button variant="light" size="xs" onClick={() => navigate('/creator/courses')}>Xem tất cả</Button>` |
| `react-test-frontend\src\pages\Dashboard.jsx` | 175 | `React Navigate` | `<Button color="white" variant="white" c="indigo" mt="md" radius="md" size="md" onClick={() => navigate('/creator/courses')}>` |

---

### 📄 Trang: [Courses.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Courses.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/courses`
* **Mô tả:** *Danh mục thư viện khóa học công khai.*
* **Các nguồn nút bấm dẫn tới trang này (4):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Dashboard.jsx` | 247 | `React Navigate` | `<Button variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} radius="md" leftSection={<LuZap size={18} />} onClick={() => navigate('/courses')}>Start Learning</Button>` |
| `react-test-frontend\src\pages\LandingPage.jsx` | 125 | `JSX Link` | `to="/courses"` |
| `react-test-frontend\src\pages\MyLearning.jsx` | 143 | `React Navigate` | `<Button variant="subtle" color="brand" onClick={() => navigate('/courses')}>` |
| `react-test-frontend\src\pages\MyLearning.jsx` | 157 | `React Navigate` | `<Button radius="md" color="brand" onClick={() => navigate('/courses')}>` |

---

### 📄 Trang: [CreatorAnalytics.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CreatorAnalytics.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/creator/analytics`
* **Mô tả:** *Trang phân tích doanh thu & hiệu suất giảng dạy.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Dashboard.jsx` | 271 | `React Navigate` | `<Button variant="subtle" size="xs" rightSection={<LuPlay size={14} />} onClick={() => navigate('/creator/analytics')}>Export Analytics</Button>` |

---

### 📄 Trang: [Dashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/dashboard`
* **Mô tả:** *Bảng thống kê học tập & phân tích rủi ro thất nghiệp bằng AI.*
* **Các nguồn nút bấm dẫn tới trang này (5):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\LoginPage.jsx` | 43 | `React Navigate` | `navigate('/dashboard');` |
| `SmartLMS.Web\Views\CourseManagement\Index.cshtml` | 30 | `HTML Link` | `<li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>` |
| `SmartLMS.Web\Views\Payment\PaymentResults.cshtml` | 19 | `HTML Link` | `<a href="/Dashboard" class="btn btn-premium btn-lg w-100">` |
| `SmartLMS.Web\Views\Revenue\PaymentConfig.cshtml` | 9 | `MVC TagHelper` | `<li class="breadcrumb-item"><a asp-controller="Dashboard" asp-action="Index">Dashboard</a></li>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 205 | `HTML Link` | `<a href="/Dashboard" class="nav-link @(_ctrl == "Dashboard" && _act == "Index" ? "active" : "")">` |

---

### 📄 Trang: [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/community`
* **Mô tả:** *Diễn đàn thảo luận và Q&A cộng đồng học viên.*
* **Các nguồn nút bấm dẫn tới trang này (5):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 62 | `React Navigate` | `navigate('/community');` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 79 | `React Navigate` | `onClick={() => navigate('/community')}` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 196 | `React Navigate` | `<Button variant="subtle" color="gray" radius="xl" onClick={() => navigate('/community')}>Hủy</Button>` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 98 | `HTML Link` | `<a class="navbar-brand fw-bold fs-4" href="/Community">` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 106 | `HTML Link` | `<li class="nav-item"><a class="nav-link px-3" href="/Community">Khám phá</a></li>` |

---

### 📄 Trang: [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/`
* **Mô tả:** *Trang giới thiệu chính của LMS, tiếp thị khóa học.*
* **Các nguồn nút bấm dẫn tới trang này (8):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\api.js` | 33 | `HTML Link` | `window.location.href = '/';` |
| `react-test-frontend\src\App.jsx` | 87 | `JSX Link` | `<Route path="*" element={<Navigate to="/" replace />} />` |
| `react-test-frontend\src\components\Sidebar.jsx` | 40 | `React Navigate` | `navigate('/');` |
| `react-test-frontend\src\components\Topbar.jsx` | 60 | `React Navigate` | `navigate('/');` |
| `react-test-frontend\src\pages\LoginPage.jsx` | 123 | `JSX Link` | `to="/"` |
| `react-test-frontend\src\pages\RegisterPage.jsx` | 166 | `JSX Link` | `to="/"` |
| `SmartLMS.Web\Views\Account\AccessDenied.cshtml` | 56 | `HTML Link` | `<a href="/" class="btn btn-primary btn-custom">Về Trang Chủ</a>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 191 | `HTML Link` | `<a href="/" class="brand-link">` |

---

### 📄 Trang: [Leaderboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Leaderboard.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/leaderboard`
* **Mô tả:** *Bảng xếp hạng thi đua thành tích học viên.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Community.jsx` | 246 | `React Navigate` | `<Button variant="subtle" size="xs" color="brand" onClick={() => navigate('/leaderboard')}>` |

---

### 📄 Trang: [LoginPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LoginPage.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/login`
* **Mô tả:** *Trang đăng nhập hệ thống đa vai trò.*
* **Các nguồn nút bấm dẫn tới trang này (4):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\App.jsx` | 39 | `JSX Link` | `if (!token) return <Navigate to="/login" replace />;` |
| `react-test-frontend\src\pages\LandingPage.jsx` | 57 | `JSX Link` | `<Button component={Link} to="/login" variant="subtle" color="gray" radius="md">Log in</Button>` |
| `react-test-frontend\src\pages\RegisterPage.jsx` | 56 | `React Navigate` | `setTimeout(() => navigate('/login'), 2000);` |
| `react-test-frontend\src\pages\RegisterPage.jsx` | 157 | `JSX Link` | `<Anchor component={Link} to="/login" size="sm" fw={700} color="brand">` |

---

### 📄 Trang: [MessageCenter.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MessageCenter.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/creator/messages`
* **Mô tả:** *Trung tâm tin nhắn kết nối Học viên - Giảng viên.*
* **Các nguồn nút bấm dẫn tới trang này (2):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\StudyWorkspace.jsx` | 590 | `React Navigate` | `onClick={() => navigate('/creator/messages')}` |
| `react-test-frontend\src\pages\TutorProfile.jsx` | 115 | `React Navigate` | `onClick={() => navigate(`/creator/messages`)}` |

---

### 📄 Trang: [MistakeNotebook.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/mistakes`
* **Mô tả:** *Sổ tay lưu vết các lỗi biên dịch và gợi ý từ AI.*
* **Các nguồn nút bấm dẫn tới trang này (3):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\AICareerReport.jsx` | 166 | `React Navigate` | `onClick={() => navigate('/mistakes')}` |
| `react-test-frontend\src\pages\MyLearning.jsx` | 108 | `React Navigate` | `<Button variant="light" color="blue" fullWidth rightSection={<LuPlay size={16} />} onClick={() => navigate('/mistakes')}>` |
| `react-test-frontend\src\pages\MyLearning.jsx` | 128 | `React Navigate` | `<Button variant="light" color="orange" fullWidth rightSection={<LuPlay size={16} />} onClick={() => navigate('/mistakes')}>` |

---

### 📄 Trang: [MyLearning.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/my-learning`
* **Mô tả:** *Không gian học tập cá nhân lưu trữ các khóa học đang tham gia.*
* **Các nguồn nút bấm dẫn tới trang này (4):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CheckoutQR.jsx` | 264 | `React Navigate` | `<Button size="lg" radius="xl" color="green" onClick={() => navigate('/my-learning')} className="w-full shadow-lg hover:shadow-xl transition-shadow">` |
| `react-test-frontend\src\pages\Courses.jsx` | 89 | `React Navigate` | `<Button variant="default" radius="md" onClick={() => navigate('/my-learning')}>My Learning</Button>` |
| `react-test-frontend\src\pages\StudyWorkspace.jsx` | 162 | `React Navigate` | `onClick={() => navigate('/my-learning')}` |
| `SmartLMS.Web\Views\Payment\Success.cshtml` | 19 | `HTML Link` | `<a href="/my-learning" class="btn btn-premium btn-lg w-100">` |

---

### 📄 Trang: [PersonalWiki.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PersonalWiki.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/wiki`
* **Mô tả:** *Sổ tay ghi chép kiến thức cá nhân của học viên.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\StudyWorkspace.jsx` | 598 | `React Navigate` | `onClick={() => navigate('/wiki')}` |

---

### 📄 Trang: [PublicProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PublicProfile.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/profile/1`
* **Mô tả:** *Hồ sơ cá nhân công khai hiển thị thành tích/huy hiệu.*
* **Các nguồn nút bấm dẫn tới trang này (5):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 81 | `React Navigate` | `onClick={() => navigate(`/profile/${user.id}`)}` |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 91 | `React Navigate` | `<Button variant="light" radius="xl" color="gray" onClick={() => navigate(`/profile/${user.id}`)}>Hồ sơ</Button>` |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 114 | `React Navigate` | `<Avatar size="lg" radius="xl" color="indigo" className="cursor-pointer" onClick={() => navigate(`/profile/${req.id}`)}>` |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 139 | `React Navigate` | `<Avatar size={70} radius="xl" color="teal" className="cursor-pointer" onClick={() => navigate(`/profile/${friend.id}`)}>` |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 149 | `React Navigate` | `<Button variant="subtle" color="brand" radius="xl" size="xs" onClick={() => navigate(`/profile/${friend.id}`)}>Hồ sơ</Button>` |

---

### 📄 Trang: [RegisterPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/RegisterPage.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/register`
* **Mô tả:** *Trang đăng ký tài khoản học viên mới.*
* **Các nguồn nút bấm dẫn tới trang này (3):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\LandingPage.jsx` | 58 | `JSX Link` | `<Button component={Link} to="/register" color="brand" radius="md" className="shadow-lg shadow-brand-500/20">Get Started</Button>` |
| `react-test-frontend\src\pages\LandingPage.jsx` | 109 | `JSX Link` | `to="/register"` |
| `react-test-frontend\src\pages\LoginPage.jsx` | 114 | `JSX Link` | `<Anchor component={Link} to="/register" size="sm" fw={700} color="brand">` |

---

### 📄 Trang: [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/study/1`
* **Mô tả:** *Không gian trình chiếu giáo trình bài học của học viên.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\MyLearning.jsx` | 211 | `React Navigate` | `onClick={() => navigate(`/study/${enrollment.courseId}`)}` |

---

### 📄 Trang: [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx)
* **Loại trang:** `React Page`
* **Đường dẫn Route:** `/tutor/dashboard`
* **Mô tả:** *Bảng điều khiển của Gia sư duyệt lịch hẹn.*
* **Các nguồn nút bấm dẫn tới trang này (4):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\TutorProfileEdit.jsx` | 40 | `React Navigate` | `navigate('/tutor/dashboard');` |
| `react-test-frontend\src\pages\TutorProfileEdit.jsx` | 58 | `React Navigate` | `onClick={() => navigate('/tutor/dashboard')}` |
| `react-test-frontend\src\pages\TutorProfileEdit.jsx` | 106 | `React Navigate` | `<Button variant="default" radius="md" onClick={() => navigate('/tutor/dashboard')}>Hủy</Button>` |
| `react-test-frontend\src\pages\TutorSchedule.jsx` | 76 | `React Navigate` | `onClick={() => navigate('/tutor/dashboard')}` |

---

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Login.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Account/Login`
* **Mô tả:** *Trang quản lý nghiệp vụ Account - hành động Login.*
* **Các nguồn nút bấm dẫn tới trang này (3):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Account\Register.cshtml` | 115 | `HTML Link` | `<p class="text-white-50">Bạn đã có tài khoản? <a href="/Account/Login">Quay lại Đăng nhập</a></p>` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 110 | `HTML Link` | `<a href="/Account/Login" class="btn btn-premium">Bắt đầu ngay</a>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 169 | `HTML Link` | `<a href="/Account/Login" class="btn btn-primary btn-sm mt-1 px-3">` |

---

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Register.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Account/Register`
* **Mô tả:** *Trang quản lý nghiệp vụ Account - hành động Register.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Account\Login.cshtml` | 195 | `HTML Link` | `<p class="text-white-50">Bạn chưa có tài khoản? <a href="/Account/Register">Đăng ký ngay</a></p>` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Affiliate/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Affiliate`
* **Mô tả:** *Trang quản lý nghiệp vụ Affiliate - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 380 | `HTML Link` | `<a href="/Affiliate" class="nav-link @(_ctrl == "Affiliate" ? "active" : "")">` |

---

### 📄 Trang: [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Assessment/BadgeStudio`
* **Mô tả:** *Hệ thống thiết kế huy hiệu thành tích điểm thưởng XP (Admin).*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 354 | `HTML Link` | `<a href="/Assessment/BadgeStudio" class="nav-link @(_act == "BadgeStudio" ? "active" : "")">` |

---

### 📄 Trang: [BulkImport.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BulkImport.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Assessment/BulkImport`
* **Mô tả:** *Trang quản lý nghiệp vụ Assessment - hành động BulkImport.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 336 | `HTML Link` | `<a href="/Assessment/BulkImport" class="nav-link @(_act == "BulkImport" ? "active" : "")">` |

---

### 📄 Trang: [ExamAssembler.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/ExamAssembler.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Assessment/ExamAssembler`
* **Mô tả:** *Hệ thống tự động biên soạn đề thi, trắc nghiệm (Admin).*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 342 | `HTML Link` | `<a href="/Assessment/ExamAssembler" class="nav-link @(_act == "ExamAssembler" ? "active" : "")">` |

---

### 📄 Trang: [ItemAnalysis.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/ItemAnalysis.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Assessment/ItemAnalysis`
* **Mô tả:** *Trang quản lý nghiệp vụ Assessment - hành động ItemAnalysis.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 360 | `HTML Link` | `<a href="/Assessment/ItemAnalysis" class="nav-link @(_act == "ItemAnalysis" ? "active" : "")">` |

---

### 📄 Trang: [Leaderboard.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/Leaderboard.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Assessment/Leaderboard`
* **Mô tả:** *Trang quản lý nghiệp vụ Assessment - hành động Leaderboard.*
* **Các nguồn nút bấm dẫn tới trang này (2):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Assessment\QuizWizard.cshtml` | 221 | `HTML Link` | `window.location.href = '/Assessment/Leaderboard';` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 324 | `HTML Link` | `<a href="/Assessment/Leaderboard" class="nav-link @(_act == "Leaderboard" ? "active" : "")">` |

---

### 📄 Trang: [QuestionBuilder.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/QuestionBuilder.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Assessment/QuestionBuilder`
* **Mô tả:** *Trang quản lý nghiệp vụ Assessment - hành động QuestionBuilder.*
* **Các nguồn nút bấm dẫn tới trang này (2):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Assessment\QuestionBuilder.cshtml` | 146 | `HTML Link` | `function edit(id) { location.href = '/Assessment/QuestionBuilder/' + id; }` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 330 | `HTML Link` | `<a href="/Assessment/QuestionBuilder" class="nav-link @(_act == "QuestionBuilder" ? "active" : "")">` |

---

### 📄 Trang: [QuizWizard.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/QuizWizard.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Assessment/QuizWizard`
* **Mô tả:** *Trang quản lý nghiệp vụ Assessment - hành động QuizWizard.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Assessment\Index.cshtml` | 17 | `HTML Link` | `<a href="/Assessment/QuizWizard" class="btn btn-outline-primary transition-hover"><i class="fas fa-magic"></i> Trải nghiệm Quiz Wizard (Demo)</a>` |

---

### 📄 Trang: [RuleEngine.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/RuleEngine.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Assessment/RuleEngine`
* **Mô tả:** *Trang quản lý nghiệp vụ Assessment - hành động RuleEngine.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 348 | `HTML Link` | `<a href="/Assessment/RuleEngine" class="nav-link @(_act == "RuleEngine" ? "active" : "")">` |

---

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Login.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Auth/Login`
* **Mô tả:** *Trang quản lý nghiệp vụ Auth - hành động Login.*
* **Các nguồn nút bấm dẫn tới trang này (3):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `asp.net-group\SmartLMS.Community\Views\Auth\Register.cshtml` | 190 | `HTML Link` | `Đã có tài khoản? <a href="/Auth/Login">Đăng nhập</a>` |
| `asp.net-group\SmartLMS.Community\Views\Shared\_CommunityLayout.cshtml` | 31 | `HTML Link` | `<a href="/Auth/Login" class="border border-cyan-600 text-cyan-600 px-5 py-2 rounded-full font-semibold transition-all hover:bg-cyan-50">Đăng nhập</a>` |
| `SmartLMS.Web\Views\Auth\Register.cshtml` | 190 | `HTML Link` | `Đã có tài khoản? <a href="/Auth/Login">Đăng nhập</a>` |

---

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Register.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Auth/Register`
* **Mô tả:** *Trang quản lý nghiệp vụ Auth - hành động Register.*
* **Các nguồn nút bấm dẫn tới trang này (3):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `asp.net-group\SmartLMS.Community\Views\Auth\Login.cshtml` | 172 | `HTML Link` | `Chưa có tài khoản? <a href="/Auth/Register">Đăng ký ngay</a>` |
| `asp.net-group\SmartLMS.Community\Views\Shared\_CommunityLayout.cshtml` | 32 | `HTML Link` | `<a href="/Auth/Register" class="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-md">Đăng ký</a>` |
| `SmartLMS.Web\Views\Auth\Login.cshtml` | 172 | `HTML Link` | `Chưa có tài khoản? <a href="/Auth/Register">Đăng ký ngay</a>` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/CodingChallengeManagement`
* **Mô tả:** *Trang quản lý nghiệp vụ CodingChallengeManagement - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 224 | `HTML Link` | `<a href="/CodingChallengeManagement" class="nav-link @(_ctrl == "CodingChallengeManagement" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Cohort`
* **Mô tả:** *Trang quản lý nghiệp vụ Cohort - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (2):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Cohort\Members.cshtml` | 11 | `HTML Link` | `<a href="/Cohort" class="text-muted"><i class="fas fa-arrow-left mr-2"></i></a>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 266 | `HTML Link` | `<a href="/Cohort" class="nav-link @(_ctrl == "Cohort" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Community/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Community`
* **Mô tả:** *Trang quản lý nghiệp vụ Community - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (5):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 62 | `React Navigate` | `navigate('/community');` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 79 | `React Navigate` | `onClick={() => navigate('/community')}` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 196 | `React Navigate` | `<Button variant="subtle" color="gray" radius="xl" onClick={() => navigate('/community')}>Hủy</Button>` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 98 | `HTML Link` | `<a class="navbar-brand fw-bold fs-4" href="/Community">` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 106 | `HTML Link` | `<li class="nav-item"><a class="nav-link px-3" href="/Community">Khám phá</a></li>` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Coupon/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Coupon`
* **Mô tả:** *Trang quản lý nghiệp vụ Coupon - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 244 | `HTML Link` | `<a href="/Coupon" class="nav-link @(_ctrl == "Coupon" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/CourseManagement`
* **Mô tả:** *Trang quản lý nghiệp vụ CourseManagement - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (5):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\CourseManagement\Create.cshtml` | 23 | `HTML Link` | `<li class="breadcrumb-item"><a href="/CourseManagement">Courses</a></li>` |
| `SmartLMS.Web\Views\CourseManagement\Edit.cshtml` | 23 | `HTML Link` | `<li class="breadcrumb-item"><a href="/CourseManagement">Courses</a></li>` |
| `SmartLMS.Web\Views\Payment\Failure.cshtml` | 19 | `HTML Link` | `<a href="/CourseManagement" class="btn btn-outline-secondary w-100">Quay lại danh sách</a>` |
| `SmartLMS.Web\Views\Payment\PaymentResults.cshtml` | 46 | `HTML Link` | `<a href="/CourseManagement" class="btn btn-outline-secondary w-100">Quay lại danh sách</a>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 218 | `HTML Link` | `<a href="/CourseManagement" class="nav-link @(_ctrl == "CourseManagement" ? "active" : "")">` |

---

### 📄 Trang: [Analytics.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Analytics.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Dashboard/Analytics`
* **Mô tả:** *Trang quản lý nghiệp vụ Dashboard - hành động Analytics.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 211 | `HTML Link` | `<a href="/Dashboard/Analytics" class="nav-link @(_ctrl == "Dashboard" && _act == "Analytics" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Dashboard`
* **Mô tả:** *Trang quản lý nghiệp vụ Dashboard - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (5):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\LoginPage.jsx` | 43 | `React Navigate` | `navigate('/dashboard');` |
| `SmartLMS.Web\Views\CourseManagement\Index.cshtml` | 30 | `HTML Link` | `<li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>` |
| `SmartLMS.Web\Views\Payment\PaymentResults.cshtml` | 19 | `HTML Link` | `<a href="/Dashboard" class="btn btn-premium btn-lg w-100">` |
| `SmartLMS.Web\Views\Revenue\PaymentConfig.cshtml` | 9 | `MVC TagHelper` | `<li class="breadcrumb-item"><a asp-controller="Dashboard" asp-action="Index">Dashboard</a></li>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 205 | `HTML Link` | `<a href="/Dashboard" class="nav-link @(_ctrl == "Dashboard" && _act == "Index" ? "active" : "")">` |

---

### 📄 Trang: [Pulse.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Pulse.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Dashboard/Pulse`
* **Mô tả:** *Trang quản lý nghiệp vụ Dashboard - hành động Pulse.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 285 | `HTML Link` | `<a href="/Dashboard/Pulse" class="nav-link @(_ctrl == "Dashboard" && _act == "Pulse" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Helpdesk/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Helpdesk`
* **Mô tả:** *Trang quản lý nghiệp vụ Helpdesk - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 374 | `HTML Link` | `<a href="/Helpdesk" class="nav-link @(_ctrl == "Helpdesk" ? "active" : "")">` |

---

### 📄 Trang: [ApiKeys.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/IAM/ApiKeys.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/IAM/ApiKeys`
* **Mô tả:** *Trang quản lý nghiệp vụ IAM - hành động ApiKeys.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 297 | `HTML Link` | `<a href="/IAM/ApiKeys" class="nav-link @(_ctrl == "IAM" && _act == "ApiKeys" ? "active" : "")">` |

---

### 📄 Trang: [Permissions.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/IAM/Permissions.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/IAM/Permissions`
* **Mô tả:** *Trang quản lý nghiệp vụ IAM - hành động Permissions.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 393 | `HTML Link` | `<a href="/IAM/Permissions" class="nav-link @(_ctrl == "IAM" && _act == "Permissions" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Integrations/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Integrations`
* **Mô tả:** *Trang quản lý nghiệp vụ Integrations - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 386 | `HTML Link` | `<a href="/Integrations" class="nav-link @(_ctrl == "Integrations" ? "active" : "")">` |

---

### 📄 Trang: [CertificateManager.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/CertificateManager.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Marketing/CertificateManager`
* **Mô tả:** *Trang quản lý nghiệp vụ Marketing - hành động CertificateManager.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 309 | `HTML Link` | `<a href="/Marketing/CertificateManager" class="nav-link @(_ctrl == "Marketing" && _act == "CertificateManager" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Marketing`
* **Mô tả:** *Trang quản lý nghiệp vụ Marketing - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 368 | `HTML Link` | `<a href="/Marketing" class="nav-link @(_ctrl == "Marketing" ? "active" : "")">` |

---

### 📄 Trang: [Audit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Audit.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Revenue/Audit`
* **Mô tả:** *Lịch sử dòng tiền, doanh thu thanh toán (Admin).*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 303 | `HTML Link` | `<a href="/Revenue/Audit" class="nav-link @(_ctrl == "Revenue" && _act == "Audit" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Revenue`
* **Mô tả:** *Trang quản lý nghiệp vụ Revenue - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 232 | `HTML Link` | `<a href="/Revenue" class="nav-link @(_ctrl == "Revenue" && _act == "Index" ? "active" : "")">` |

---

### 📄 Trang: [PaymentConfig.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/PaymentConfig.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Revenue/PaymentConfig`
* **Mô tả:** *Trang quản lý nghiệp vụ Revenue - hành động PaymentConfig.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 238 | `HTML Link` | `<a href="/Revenue/PaymentConfig" class="nav-link @(_ctrl == "Revenue" && _act == "PaymentConfig" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/SqlManagement/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/SqlManagement`
* **Mô tả:** *Trang quản lý nghiệp vụ SqlManagement - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 272 | `HTML Link` | `<a href="/SqlManagement" class="nav-link @(_ctrl == "SqlManagement" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Students/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/Students`
* **Mô tả:** *Trang quản lý nghiệp vụ Students - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 251 | `HTML Link` | `<a href="/Students" class="nav-link @(_ctrl == "Students" ? "active" : "")">` |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/UserManagement/Index.cshtml)
* **Loại trang:** `ASP.NET MVC View`
* **Đường dẫn Route:** `/UserManagement`
* **Mô tả:** *Trang quản lý nghiệp vụ UserManagement - hành động Index.*
* **Các nguồn nút bấm dẫn tới trang này (1):**

| Nguồn File | Dòng | Loại liên kết | Dòng code chứa nút bấm |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 260 | `HTML Link` | `<a href="/UserManagement" class="nav-link @(_ctrl == "UserManagement" ? "active" : "")">` |

---

