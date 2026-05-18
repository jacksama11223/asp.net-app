# Báo cáo phân tích tính khả dụng của Nút bấm (Button Integrity Report)

*Thời gian quét:* 15:13:39 18/5/2026
*Tổng số tệp mã nguồn được phân tích:* **91**
*Tổng số nút bấm cảnh báo chết / thiếu hàm xử lý:* **131**

> [!WARNING]
> Dưới đây là danh sách chi tiết các nút bấm được phát hiện thiếu thuộc tính điều hướng/sự kiện hoặc chỉ chứa các trình xử lý giả lập (console.log/alert). Vui lòng rà soát lại trước khi phát hành phiên bản Production.

## Chi tiết các nút bấm cần kiểm tra (Dead Buttons List)

| Số TT | Loại tệp | Đường dẫn tệp | Dòng | Nhãn hiển thị (Label) | Lỗi chi tiết |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | React | [Topbar.jsx](file:///C:/code/asp.net/react-test-frontend/src/components/Topbar.jsx#L101) | 101 | `Chứa icon/component` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 2 | React | [BookingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/BookingPage.jsx#L107) | 107 | `Chứa icon/component` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 3 | React | [Community.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Community.jsx#L64) | 64 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 4 | React | [Community.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Community.jsx#L153) | 153 | `Chứa icon/component` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 5 | React | [CommunityFriends.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx#L92) | 92 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 6 | React | [CommunityFriends.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx#L123) | 123 | `Chấp nhận` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 7 | React | [CommunityFriends.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx#L124) | 124 | `Chứa icon/component` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 8 | React | [CommunityFriends.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx#L150) | 150 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 9 | React | [CommunityNewPost.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityNewPost.jsx#L76) | 76 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 10 | React | [CommunityNewPost.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityNewPost.jsx#L111) | 111 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 11 | React | [CommunityNewPost.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityNewPost.jsx#L197) | 197 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 12 | React | [CommunityQuizBuilder.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx#L96) | 96 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 13 | React | [CommunityQuizBuilder.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx#L138) | 138 | `{opt}` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 14 | React | [CommunityQuizBuilder.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx#L158) | 158 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 15 | React | [CommunityQuizBuilder.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx#L159) | 159 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 16 | React | [CourseDetails.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx#L93) | 93 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 17 | React | [CourseDetails.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx#L244) | 244 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 18 | React | [CourseDetails.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx#L329) | 329 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 19 | React | [CourseDetails.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx#L336) | 336 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 20 | React | [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx#L265) | 265 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 21 | React | [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx#L276) | 276 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 22 | React | [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx#L354) | 354 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 23 | React | [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx#L357) | 357 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 24 | React | [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx#L378) | 378 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 25 | React | [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx#L421) | 421 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 26 | React | [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx#L519) | 519 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 27 | React | [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx#L653) | 653 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 28 | React | [Courses.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Courses.jsx#L106) | 106 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 29 | React | [Dashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx#L100) | 100 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 30 | React | [Dashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx#L246) | 246 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 31 | React | [Dashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx#L247) | 247 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 32 | React | [Dashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx#L271) | 271 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 33 | React | [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx#L69) | 69 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 34 | React | [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx#L171) | 171 | `1` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 35 | React | [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx#L172) | 172 | `2` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 36 | React | [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx#L173) | 173 | `3` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 37 | React | [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx#L175) | 175 | `Cuối` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 38 | React | [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx#L57) | 57 | `Log in` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 39 | React | [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx#L58) | 58 | `Get Started` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 40 | React | [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx#L107) | 107 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 41 | React | [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx#L118) | 118 | `Watch Demo` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 42 | React | [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx#L185) | 185 | `Chứa icon/component` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 43 | React | [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx#L186) | 186 | `Chứa icon/component` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 44 | React | [Leaderboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Leaderboard.jsx#L140) | 140 | `Tải thêm cao thủ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 45 | React | [LoginPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LoginPage.jsx#L121) | 121 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 46 | React | [MessageCenter.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MessageCenter.jsx#L88) | 88 | `Chứa icon/component` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 47 | React | [MistakeNotebook.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx#L88) | 88 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 48 | React | [MistakeNotebook.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx#L233) | 233 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 49 | React | [MyLearning.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx#L108) | 108 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 50 | React | [MyLearning.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx#L128) | 128 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 51 | React | [MyLearning.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx#L203) | 203 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 52 | React | [PersonalWiki.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PersonalWiki.jsx#L92) | 92 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 53 | React | [PersonalWiki.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PersonalWiki.jsx#L93) | 93 | `Chứa icon/component` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 54 | React | [PublicProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PublicProfile.jsx#L41) | 41 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 55 | React | [PublicProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PublicProfile.jsx#L73) | 73 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 56 | React | [PublicProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PublicProfile.jsx#L76) | 76 | `Gửi tin nhắn` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 57 | React | [RegisterPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/RegisterPage.jsx#L164) | 164 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 58 | React | [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx#L158) | 158 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 59 | React | [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx#L230) | 230 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 60 | React | [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx#L511) | 511 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 61 | React | [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx#L573) | 573 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 62 | React | [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx#L586) | 586 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 63 | React | [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx#L594) | 594 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 64 | React | [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx#L46) | 46 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 65 | React | [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx#L95) | 95 | `Quản lý lịch rảnh` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 66 | React | [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx#L125) | 125 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 67 | React | [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx#L129) | 129 | `Duyệt` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 68 | React | [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx#L159) | 159 | `Không rõ` | Thiếu hoàn toàn thuộc tính onClick (Nút chết) |
| 69 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Affiliate/Index.cshtml#L93) | 93 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 70 | ASP.NET Core (CSHTML) | [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml#L21) | 21 | ` Tạo Huy hiệu mới` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 71 | ASP.NET Core (CSHTML) | [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml#L44) | 44 | `Chỉnh sửa` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 72 | ASP.NET Core (CSHTML) | [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml#L85) | 85 | `&times;` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 73 | ASP.NET Core (CSHTML) | [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml#L112) | 112 | `Hủy` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 74 | ASP.NET Core (CSHTML) | [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml#L113) | 113 | `Lưu huy hiệu` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 75 | ASP.NET Core (CSHTML) | [BulkImport.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BulkImport.cshtml#L47) | 47 | ` Tải file Excel mẫu` | Thẻ link styled-btn có href rỗng/chết (#) và không có sự kiện onclick / điều hướng MVC |
| 76 | ASP.NET Core (CSHTML) | [ExamAssembler.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/ExamAssembler.cshtml#L81) | 81 | ` Lưu & Xuất bản đề thi` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 77 | ASP.NET Core (CSHTML) | [RuleEngine.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/RuleEngine.cshtml#L58) | 58 | ` Lưu cấu hình Rule` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 78 | ASP.NET Core (CSHTML) | [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Edit.cshtml#L104) | 104 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 79 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml#L13) | 13 | ` Tạo Lớp học mới` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 80 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml#L79) | 79 | `&times;` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 81 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml#L93) | 93 | `Hủy bỏ` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 82 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml#L106) | 106 | `&times;` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 83 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml#L122) | 122 | `Đóng` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 84 | ASP.NET Core (CSHTML) | [Members.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Members.cshtml#L16) | 16 | ` Thêm Sinh viên vào lớp` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 85 | ASP.NET Core (CSHTML) | [Members.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Members.cshtml#L45) | 45 | ` Thêm thành viên ngay` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 86 | ASP.NET Core (CSHTML) | [Members.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Members.cshtml#L78) | 78 | `&times;` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 87 | ASP.NET Core (CSHTML) | [Members.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Members.cshtml#L89) | 89 | `Hủy` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 88 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Community/Index.cshtml#L14) | 14 | `Tìm hiểu thêm` | Thẻ link styled-btn có href rỗng/chết (#) và không có sự kiện onclick / điều hướng MVC |
| 89 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Community/Index.cshtml#L40) | 40 | `Tạo bài viết đầu tiên` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 90 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Community/Index.cshtml#L78) | 78 | `Đăng ký Creator` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 91 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Community/Index.cshtml#L98) | 98 | `Gửi` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 92 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Coupon/Index.cshtml#L49) | 49 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 93 | ASP.NET Core (CSHTML) | [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Create.cshtml#L109) | 109 | `Tiếp theo ` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 94 | ASP.NET Core (CSHTML) | [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Create.cshtml#L137) | 137 | ` Quay lại` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 95 | ASP.NET Core (CSHTML) | [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Create.cshtml#L138) | 138 | `Tiếp theo ` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 96 | ASP.NET Core (CSHTML) | [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Create.cshtml#L176) | 176 | ` Quay lại` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 97 | ASP.NET Core (CSHTML) | [Curriculum.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Curriculum.cshtml#L23) | 23 | ` Thêm Chương` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 98 | ASP.NET Core (CSHTML) | [Curriculum.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Curriculum.cshtml#L24) | 24 | ` Lưu thứ tự` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 99 | ASP.NET Core (CSHTML) | [Curriculum.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Curriculum.cshtml#L61) | 61 | ` Bài học` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 100 | ASP.NET Core (CSHTML) | [Curriculum.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Curriculum.cshtml#L62) | 62 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 101 | ASP.NET Core (CSHTML) | [Curriculum.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Curriculum.cshtml#L71) | 71 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 102 | ASP.NET Core (CSHTML) | [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Edit.cshtml#L105) | 105 | `Tiếp theo` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 103 | ASP.NET Core (CSHTML) | [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Edit.cshtml#L126) | 126 | `Quay lại` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 104 | ASP.NET Core (CSHTML) | [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Edit.cshtml#L127) | 127 | `Tiếp theo` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 105 | ASP.NET Core (CSHTML) | [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Edit.cshtml#L158) | 158 | `Quay lại` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 106 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml#L113) | 113 | ` Reset` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 107 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml#L135) | 135 | ` Xử lý hàng loạt` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 108 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml#L153) | 153 | ` Export CSV` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 109 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml#L240) | 240 | `${val}` | Thẻ link styled-btn có href rỗng/chết (#) và không có sự kiện onclick / điều hướng MVC |
| 110 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml#L288) | 288 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 111 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Index.cshtml#L13) | 13 | ` Làm mới dữ liệu` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 112 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Index.cshtml#L130) | 130 | `&times;` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 113 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Index.cshtml#L155) | 155 | ` Gửi Gmail Nhắc Nhở` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 114 | ASP.NET Core (CSHTML) | [Pulse.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Pulse.cshtml#L79) | 79 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 115 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Home/Index.cshtml#L34) | 34 | `View All` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 116 | ASP.NET Core (CSHTML) | [ApiKeys.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/IAM/ApiKeys.cshtml#L97) | 97 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 117 | ASP.NET Core (CSHTML) | [ApiKeys.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/IAM/ApiKeys.cshtml#L108) | 108 | `Hủy` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 118 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Integrations/Index.cshtml#L17) | 17 | ` Test kết nối Zoom API` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 119 | ASP.NET Core (CSHTML) | [CertificateManager.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/CertificateManager.cshtml#L44) | 44 | ` Cấu hình Phôi bằng` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 120 | ASP.NET Core (CSHTML) | [CertificateManager.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/CertificateManager.cshtml#L70) | 70 | ` Gửi Mail` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 121 | ASP.NET Core (CSHTML) | [Designer.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Designer.cshtml#L65) | 65 | ` Lưu Tọa Độ` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 122 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Index.cshtml#L17) | 17 | ` Thiết kế Chứng chỉ` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 123 | ASP.NET Core (CSHTML) | [Audit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Audit.cshtml#L108) | 108 | ` Verified` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 124 | ASP.NET Core (CSHTML) | [PaymentConfig.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/PaymentConfig.cshtml#L17) | 17 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 125 | ASP.NET Core (CSHTML) | [_Layout.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Shared/_Layout.cshtml#L122) | 122 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 126 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/SqlManagement/Index.cshtml#L27) | 27 | ` Execute Query (Ctrl+Enter)` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 127 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Students/Index.cshtml#L25) | 25 | ` Xuất báo cáo` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 128 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Students/Index.cshtml#L163) | 163 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 129 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Students/Index.cshtml#L166) | 166 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 130 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Students/Index.cshtml#L218) | 218 | `&times;` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
| 131 | ASP.NET Core (CSHTML) | [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/UserManagement/Index.cshtml#L104) | 104 | `Chứa icon/html` | Nút bấm CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap |
