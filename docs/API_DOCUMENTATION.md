# SmartLMS Community API Documentation

Tài liệu này tổng hợp toàn bộ các API Endpoints thuộc **SmartLMS Community Hub**, bao gồm các tính năng chia sẻ tài nguyên, thảo luận, diễn đàn, gamification và AI.

> **Môi trường Test Production:** `http://141.253.114.218:3080`
> **Môi trường Local:** `http://localhost:5183` (nếu chạy qua Docker) hoặc cổng cấu hình IIS Express.

---

## Kiến trúc Cổng (Ports)
Hệ thống được chia làm 2 cụm Microservice (Modular Monolith):
1. **Core Backend (Cổng 5181)**: Quản lý Auth, Khóa học, Thanh toán, Dashboard, Học sinh.
2. **Community Hub (Cổng 5183 / 3080)**: Quản lý Diễn đàn, Chia sẻ tài nguyên, Thảo luận, Nhóm học tập.

---

## 0. Core Backend API (Cổng 5181)
Đây là các API cốt lõi của hệ thống học tập.

| Tên Module | Base Endpoint (Route) | Phụ trách tính năng | Test Link |
| :--- | :--- | :--- | :--- |
| **Authentication** | `/api/auth` | Đăng nhập, Đăng ký, Cấp JWT Cookie | `POST http://141.253.114.218:5181/api/auth` |
| **Khóa học Public** | `/api/public/courses` | Lấy danh sách khóa học, Tìm kiếm, Lọc | `GET http://141.253.114.218:5181/api/public/courses` |
| **Thanh toán Public** | `/api/public/payment` | Tạo link thanh toán VNPay, MoMo, Checkout | `POST http://141.253.114.218:5181/api/public/payment` |
| **Dashboard** | `/api/dashboard/*` | Biểu đồ tương tác, Doanh thu, Tiến độ, Thống kê | `GET http://141.253.114.218:5181/api/dashboard/stats` |
| **Student** | `/api/student/*` | Khóa học của tôi, Bài tập, Hồ sơ học viên | `GET http://141.253.114.218:5181/api/student/courses` |
| **Code Sandbox** | `/api/compiler` | Chấm điểm tự động mã nguồn lập trình | `POST http://141.253.114.218:5181/api/compiler` |
| **Assessment** | `/api/assessment` | Đánh giá, Bài thi, Trắc nghiệm, Câu hỏi | `GET http://141.253.114.218:5181/api/assessment` |
| **Messages** | `/api/messages` | Tin nhắn riêng tư giữa Giảng viên và Học viên | `GET http://141.253.114.218:5181/api/messages` |

---

## 1. Resource API (Quản lý Tài nguyên - Cổng 5183)
Các API liên quan đến thao tác với tài liệu (Resources) trong mạng xã hội học tập.

| Endpoint | Method | Payload / Form Data | Mô tả | Test Link (Production) |
| :--- | :---: | :--- | :--- | :--- |
| `/CommunityApi/ResourceApi` | `POST` | `FormData` (Title, Description, Subject, FileType, File) | Tải lên tài liệu mới | [Upload UI](http://141.253.114.218:3080/hub/resources) |
| `/CommunityApi/ResourceApi/{id}/bookmark` | `POST` | (Empty body) | Lưu / Bỏ lưu tài liệu vào Bookmark | `POST http://141.253.114.218:3080/CommunityApi/ResourceApi/1/bookmark` |
| `/CommunityApi/ResourceApi/{id}/rate` | `POST` | `{ "score": 5 }` (JSON) | Đánh giá tài liệu (1-5 sao) | `POST http://141.253.114.218:3080/CommunityApi/ResourceApi/1/rate` |
| `/CommunityApi/ResourceApi/{id}/view` | `POST` | (Empty body) | Ghi nhận lượt xem tài liệu | `POST http://141.253.114.218:3080/CommunityApi/ResourceApi/1/view` |

---

## 2. Resource Discussion API (Thảo luận & AI Bot)
Các API phục vụ khung thảo luận (Panel) bên trong trang chi tiết tài liệu.

| Endpoint | Method | Payload / Form Data | Mô tả | Test Link (Production) |
| :--- | :---: | :--- | :--- | :--- |
| `/CommunityApi/ResourceDiscussionApi/{resourceId}` | `GET` | Không có | Lấy danh sách bình luận của 1 tài liệu | [GET /1](http://141.253.114.218:3080/CommunityApi/ResourceDiscussionApi/1) |
| `/CommunityApi/ResourceDiscussionApi/{resourceId}` | `POST` | `{ "content": "..." }` | Đăng bình luận mới vào tài liệu | `POST http://141.253.114.218:3080/CommunityApi/ResourceDiscussionApi/1` |
| `/CommunityApi/ResourceDiscussionApi/{resourceId}/reply/{parentId}` | `POST` | `{ "content": "..." }` | Trả lời một bình luận cụ thể | `POST http://141.253.114.218:3080/CommunityApi/ResourceDiscussionApi/1/reply/2` |
| `/CommunityApi/ResourceDiscussionApi/{resourceId}/ask-ai` | `POST` | `{ "question": "..." }` | Gửi câu hỏi cho Trợ lý AI (RAG) | `POST http://141.253.114.218:3080/CommunityApi/ResourceDiscussionApi/1/ask-ai` |

---

## 3. Share API (Chia sẻ)
API dùng chung để chia sẻ nội dung (Tài liệu, Khóa học, Bài viết) qua tin nhắn hoặc nhóm.

| Endpoint | Method | Payload / Form Data | Mô tả | Test Link (Production) |
| :--- | :---: | :--- | :--- | :--- |
| `/api/ShareApi/share` | `POST` | `{ "targetType": "Group\|User", "targetId": 1, "contentType": "RESOURCE", "contentId": 1, "message": "..." }` | Gửi chia sẻ nội dung | `POST http://141.253.114.218:3080/api/ShareApi/share` |

---

## 4. Forum & Gamification API (Diễn đàn & Điểm thưởng)
Các API cho bài viết diễn đàn và tương tác người dùng.

| Endpoint | Method | Payload / Form Data | Mô tả | Test Link (Production) |
| :--- | :---: | :--- | :--- | :--- |
| `/hub/post/new` | `POST` | `FormData` (Title, Content, Category, Tags) | Đăng bài viết mới trên diễn đàn | `POST http://141.253.114.218:3080/hub/post/new` |
| `/hub/post/{id}/comment` | `POST` | `FormData` (content) | Bình luận bài viết diễn đàn | `POST http://141.253.114.218:3080/hub/post/1/comment` |
| `/hub/post/{id}/upvote` | `POST` | (Empty body) | Upvote / Bỏ upvote bài viết | `POST http://141.253.114.218:3080/hub/post/1/upvote` |
| `/hub/CompleteShareReward` | `POST` | `{ "postId": "1", "format": "post" }` | Ghi nhận điểm thưởng XP khi chia sẻ bài | `POST http://141.253.114.218:3080/hub/CompleteShareReward` |

---

## 5. Development & Testing API (Dành riêng cho Dev)
Các API hữu ích dùng để Test, Seed data, và lấy dữ liệu Chat giả lập.

| Endpoint | Method | Payload / Form Data | Mô tả | Test Link (Production) |
| :--- | :---: | :--- | :--- | :--- |
| `/api/seed-posts` | `GET` | Không có | Tự động tạo một vài bài viết mẫu (Seed) | [GET Seed Posts](http://141.253.114.218:3080/api/seed-posts) |
| `/api/chat/history` | `GET` | Không có | Lấy 50 tin nhắn chat gần nhất | [GET Chat History](http://141.253.114.218:3080/api/chat/history) |
| `/hub/SimulateAiDraft` | `POST` | `{ "prompt": "..." }` | Giả lập bot AI soạn thảo (RAG giả lập) | `POST http://141.253.114.218:3080/hub/SimulateAiDraft` |
| `/hub/SimulateCompileSandbox`| `POST` | `{ "code": "..." }` | Giả lập chấm điểm mã nguồn sandbox | `POST http://141.253.114.218:3080/hub/SimulateCompileSandbox` |

---

## Hướng dẫn Test API (Testing Instructions)
Để kiểm thử các API `POST`, ngài có thể:
1. **Sử dụng Postman / Insomnia**: Copy URL từ cột "Test Link (Production)", chọn phương thức POST, và thêm header `Content-Type: application/json` cùng với payload mẫu (nếu API yêu cầu JSON).
2. **Lưu ý Authentication**: Rất nhiều API yêu cầu Cookie Đăng nhập (Authentication). Để test thành công, ngài hãy đảm bảo mình đã đăng nhập vào hệ thống trên trình duyệt, sau đó:
   - Cách 1: Chạy file `test_enterprise.cjs` trên Server để tự động giả lập luồng Auth và test tất cả.
   - Cách 2: Test trực tiếp trên trình duyệt bằng giao diện UI, mở F12 (DevTools) > Network tab để xem request được gửi đi.

## 6. Toàn bộ API Endpoints (Auto-Generated)

Danh sách các API được tự động quét từ toàn bộ mã nguồn:

### AccountController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/Account` | Login |
| `POST` | `/Account` | Login |
| `GET` | `/Account` | Register |
| `POST` | `/Account` | Register |
| `GET` | `/Account` | AccessDenied |

### AffiliateController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/Affiliate` | GenerateLink |

### CommunityApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/community/posts` | GetPosts |
| `GET` | `/api/community/posts/{id}` | GetPostDetail |
| `POST` | `/api/community/posts` | CreatePost |
| `POST` | `/api/community/posts/{id}/comment` | AddComment |
| `POST` | `/api/community/posts/{postId}/verify/{commentId}` | VerifyAnswer |
| `PUT` | `/api/community/comments/{id}` | EditComment |
| `DELETE` | `/api/community/comments/{id}` | DeleteComment |
| `POST` | `/api/community/posts/{id}/react` | ReactToPost |
| `POST` | `/api/community/comments/{id}/vote` | VoteComment |

### NotificationApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/notifications` | GetNotifications |
| `POST` | `/api/notifications/{id}/read` | MarkAsRead |

### PollApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/community/polls` | CreatePoll |
| `POST` | `/api/community/polls/{pollId}/vote` | Vote |

### WikiApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/wiki/pages` | GetUserPages |
| `GET` | `/api/wiki/pages/{id}` | GetPageDetail |
| `POST` | `/api/wiki/pages` | CreatePage |
| `PUT` | `/api/wiki/pages/{id}` | UpdatePage |
| `DELETE` | `/api/wiki/pages/{id}` | DeletePage |

### CompilerController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/Compiler/execute` | ExecuteCode |
| `GET` | `/api/Compiler/challenges` | GetChallenges |
| `GET` | `/api/Compiler/challenges/{id}` | GetChallengeDetail |
| `GET` | `/api/Compiler/courses` | GetInstructorCourses |
| `POST` | `/api/Compiler/courses/save` | SaveCourse |
| `GET` | `/api/Compiler/courses/{courseId}/lessons` | GetCourseLessons |
| `POST` | `/api/Compiler/challenges/save` | SaveChallenge |
| `POST` | `/api/Compiler/challenges/auto-create/{lessonId}` | AutoCreateChallenge |

### GamificationApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/gamification/status` | GetUserStatus |

### NotificationApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/NotificationApi` | GetNotifications |
| `GET` | `/api/NotificationApi/unread-count` | GetUnreadCount |
| `POST` | `/api/NotificationApi/{id}/read` | MarkAsRead |
| `POST` | `/api/NotificationApi/read-all` | MarkAllAsRead |

### PaymentApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/payment/create-invoice` | CreateInvoice |

### CoursesApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/public/courses` | GetCourses |
| `GET` | `/api/public/courses/performance` | GetPerformance |
| `GET` | `/api/public/courses/{id}` | GetCourseDetails |
| `POST` | `/api/public/courses` | CreateCourse |

### PublicPaymentApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/public/payment/config` | GetPaymentConfig |
| `POST` | `/api/public/payment/checkout/{courseId}` | Checkout |
| `GET` | `/api/public/payment/status/{txnRef}` | GetPaymentStatus |
| `POST` | `/api/public/payment/mock-webhook/{txnRef}` | MockWebhook |
| `POST` | `/api/public/payment/sepay-webhook` | SePayWebhook |

### MessageApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/messages/send` | SendMessage |
| `GET` | `/api/messages/history/{courseId}/{otherUserId}` | GetHistory |
| `GET` | `/api/messages/unread` | GetUnreadCount |

### MistakesApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/student/MistakesApi` | GetMistakes |
| `POST` | `/api/student/MistakesApi` | LogMistake |
| `POST` | `/api/student/MistakesApi/{id}/resolve` | ResolveMistake |

### StudentApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/student/whoami` | WhoAmI |
| `GET` | `/api/student/enrolled-courses` | GetEnrolledCourses |
| `GET` | `/api/student/course-content/{courseId}` | GetCourseContent |
| `POST` | `/api/student/log-mistake` | LogMistake |
| `GET` | `/api/student/mistakes` | GetMistakes |
| `GET` | `/api/student/mistakes/{courseId}` | GetMistakes |
| `GET` | `/api/student/flashcards/{lessonId}` | GetFlashcards |
| `POST` | `/api/student/flashcards/update-progress` | UpdateFlashcardProgress |
| `POST` | `/api/student/ask-question` | AskQuestion |
| `POST` | `/api/student/video-progress` | SaveVideoProgress |

### StudentCoursesApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/student/courses/my-courses` | GetMyCourses |
| `GET` | `/api/student/courses/{courseId}/portal` | GetCoursePortal |

### AssessmentApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/assessment/questions` | GetQuestions |
| `GET` | `/api/assessment/leaderboard` | GetLeaderboard |
| `POST` | `/api/assessment/submit` | SubmitQuiz |
| `GET` | `/api/assessment/my-achievements` | GetMyAchievements |
| `GET` | `/api/assessment/coding-challenges` | GetCodingChallengesByCourse |

### AssessmentController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/Assessment` | SaveQuestion |
| `POST` | `/Assessment` | SaveBadge |

### AuthApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/auth/token` | GenerateToken |
| `POST` | `/api/auth/register` | Register |

### AuthController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/Auth` | Login |
| `GET` | `/Auth` | Register |
| `POST` | `/Auth` | Login |
| `POST` | `/Auth` | Register |

### BookingController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/Booking/student` | GetStudentBookings |
| `GET` | `/api/Booking/tutor` | GetTutorBookings |
| `POST` | `/api/Booking` | CreateBooking |
| `PATCH` | `/api/Booking/{id}/status` | UpdateStatus |
| `GET` | `/api/Booking/tutors` | GetTutors |

### CodingChallengeController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/CodingChallenge` | Submit |

### CodingChallengeManagementController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/CodingChallengeManagement` | Create |
| `POST` | `/CodingChallengeManagement` | Edit |
| `POST` | `/CodingChallengeManagement` | AddTestCase |

### CohortController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/Cohort` | Create |
| `POST` | `/Cohort` | Update |
| `POST` | `/Cohort` | Delete |
| `POST` | `/Cohort` | ImportExcel |

### CouponController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/Coupon` | Create |
| `POST` | `/Coupon` | Create |
| `POST` | `/Coupon` | Delete |

### CourseManagementController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/CourseManagement` | GetCoursesJson |
| `GET` | `/CourseManagement` | Create |
| `POST` | `/CourseManagement` | Create |
| `GET` | `/CourseManagement` | Edit |
| `POST` | `/CourseManagement` | Edit |
| `GET` | `/CourseManagement` | GetDetails |
| `POST` | `/CourseManagement` | BulkToggleStatus |
| `POST` | `/CourseManagement` | BulkDelete |
| `GET` | `/CourseManagement` | GetTreeData |
| `POST` | `/CourseManagement` | UpdateHierarchy |
| `POST` | `/CourseManagement` | SoftDelete |
| `POST` | `/CourseManagement` | ToggleStatus |

### CurriculumController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/Curriculum/{courseId}` | GetCurriculum |
| `POST` | `/api/Curriculum/module` | AddModule |
| `POST` | `/api/Curriculum/lesson` | AddLesson |

### DashboardController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/Dashboard/GetStats` | RepairData |
| `GET` | `/Dashboard/GetStats` | GetStats |
| `GET` | `/Dashboard/GetStats` | GetEngagementChart |
| `GET` | `/Dashboard/GetStats` | GetActivities |
| `GET` | `/Dashboard/GetStats` | GetRoleDistribution |
| `GET` | `/Dashboard/GetStats` | GetCourseCompletionData |
| `GET` | `/Dashboard/GetStats` | Analytics |
| `GET` | `/Dashboard/GetStats` | GetAnalyticsData |
| `GET` | `/Dashboard/GetStats` | MyAnalytics |

### ForumController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/Forum` | Index |
| `POST` | `/Forum` | SimulateAiDraft |
| `POST` | `/Forum` | SimulateCompileSandbox |
| `POST` | `/Forum` | CompleteShareReward |

### IAMController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/IAM` | UpdatePermission |
| `POST` | `/IAM` | GenerateApiKey |
| `POST` | `/IAM` | RevokeApiKey |

### MarketingController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/Marketing` | PreviewPdf |

### PaymentController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/Payment` | VnpayIPN |
| `POST` | `/Payment` | VnpayIPN |

### RevenueController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/Revenue` | PaymentConfig |
| `POST` | `/Revenue` | ManualConfirm |
| `GET` | `/Revenue` | GetRevenueJson |

### SqlManagementController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/SqlManagement` | Execute |
| `GET` | `/SqlManagement` | GetHealth |

### StudentsController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/Students` | GetStudents |
| `POST` | `/Students` | Nudge |
| `GET` | `/Students` | RiskAnalysis |
| `GET` | `/Students` | ExportReport |

### UserManagementController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/UserManagement` | UpdateStatus |
| `GET` | `/UserManagement` | ExportToExcel |
| `GET` | `/UserManagement` | Search |
| `GET` | `/UserManagement` | GetAuditTrail |

### AdminController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/admin/moderation` | Moderation |
| `POST` | `/admin/approve/{id}` | ApprovePost |
| `POST` | `/admin/reject/{id}` | RejectPost |
| `POST` | `/admin/approve-item` | ApproveItem |
| `POST` | `/admin/reject-item` | RejectItem |

### AttachmentApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/AttachmentApi/upload` | Upload |
| `GET` | `/api/AttachmentApi/view/{id}` | ViewAttachment |
| `GET` | `/api/AttachmentApi/metadata/{id}` | GetMetadata |

### AuthController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/Auth` | Login |
| `POST` | `/Auth` | Login |
| `GET` | `/Auth` | Register |
| `POST` | `/Auth` | Register |

### CommunityController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/hub` | Index |
| `GET` | `/hub/post/new` | Create |
| `POST` | `/hub/post/new` | SubmitPost |
| `GET` | `/hub/post/{id}` | Details |
| `POST` | `/hub/post/{id}/comment` | AddComment |
| `POST` | `/hub/post/{id}/upvote` | Upvote |
| `GET` | `/hub/resources` | Resources |
| `GET` | `/hub//Community/Resources` | Resources |
| `GET` | `/hub/resources/{id}` | ResourceDetail |
| `GET` | `/hub//Community/Resources/{id}` | ResourceDetail |
| `GET` | `/hub/events` | Events |
| `GET` | `/hub//Community/Events` | Events |
| `GET` | `/hub/events/{id}` | EventDetail |
| `GET` | `/hub//Community/Events/{id}` | EventDetail |
| `GET` | `/hub/members` | Members |
| `GET` | `/hub//Community/Members` | Members |
| `GET` | `/hub/qa` | QA |
| `GET` | `/hub//Community/QA` | QA |
| `GET` | `/hub/qa/{id}` | QaDetail |
| `GET` | `/hub//Community/QA/{id}` | QaDetail |
| `GET` | `/hub/groups` | Groups |
| `GET` | `/hub//Community/Groups` | Groups |
| `GET` | `/hub/groups/{id}` | GroupDetail |
| `GET` | `/hub//Community/Groups/{id}` | GroupDetail |
| `GET` | `/hub/leaderboard` | Leaderboard |
| `GET` | `/hub//Community/Leaderboard` | Leaderboard |
| `GET` | `/hub/mentor` | Mentor |
| `GET` | `/hub//Community/Mentor` | Mentor |
| `GET` | `/hub/profile/me` | MyProfile |
| `GET` | `/hub//Community/Profile/Me` | MyProfile |
| `GET` | `/hub/profile/{id}` | Profile |
| `GET` | `/hub//Community/Profile/{id}` | Profile |
| `GET` | `/hub/messages` | Messages |
| `GET` | `/hub//Community/Messages` | Messages |
| `POST` | `/hub/SimulateAiDraft` | SimulateAiDraft |
| `POST` | `/hub/SimulateCompileSandbox` | SimulateCompileSandbox |
| `POST` | `/hub/CompleteShareReward` | CompleteShareReward |
| `GET` | `/hub//api/seed-posts` | SeedPosts |
| `GET` | `/hub//api/chat/history` | GetChatHistory |

### EventApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/EventApi` | GetEvents |
| `POST` | `/api/EventApi/rsvp/{eventId}` | RSVPEvent |
| `POST` | `/api/EventApi/create` | CreateEvent |
| `GET` | `/api/EventApi/{eventId}/discussions` | GetEventDiscussions |
| `POST` | `/api/EventApi/{eventId}/discussions` | CreateEventDiscussion |

### GroupApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/GroupApi` | GetGroups |
| `POST` | `/api/GroupApi/join/{groupId}` | JoinGroup |
| `POST` | `/api/GroupApi/create` | CreateGroup |
| `GET` | `/api/GroupApi/{groupId}/posts` | GetGroupPosts |
| `POST` | `/api/GroupApi/{groupId}/posts` | CreatePost |

### LeaderboardApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/LeaderboardApi` | GetLeaderboard |
| `GET` | `/api/LeaderboardApi/me` | GetMyRank |

### NotificationApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/NotificationApi` | GetNotifications |
| `GET` | `/api/NotificationApi/unread-count` | GetUnreadCount |
| `POST` | `/api/NotificationApi/{id}/read` | MarkAsRead |
| `POST` | `/api/NotificationApi/read-all` | MarkAllAsRead |

### QaApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/QaApi/questions` | GetQuestions |
| `POST` | `/api/QaApi/questions` | AskQuestion |
| `POST` | `/api/QaApi/questions/{id}/answers` | AddAnswer |

### RatingApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/RatingApi` | RateUser |

### ResourceApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/CommunityApi/ResourceApi` | GetResources |
| `POST` | `/CommunityApi/ResourceApi` | UploadResource |
| `POST` | `/CommunityApi/ResourceApi/{id}/bookmark` | BookmarkResource |
| `POST` | `/CommunityApi/ResourceApi/{id}/rate` | RateResource |
| `POST` | `/CommunityApi/ResourceApi/{id}/view` | ViewResource |
| `POST` | `/CommunityApi/ResourceApi/{id}/download` | DownloadResource |

### ResourceDiscussionApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `GET` | `/CommunityApi/ResourceDiscussion/{resourceId}/comments` | GetComments |
| `POST` | `/CommunityApi/ResourceDiscussion/{resourceId}/comments` | PostComment |
| `POST` | `/CommunityApi/ResourceDiscussion/comments/{commentId}/upvote` | UpvoteComment |
| `DELETE` | `/CommunityApi/ResourceDiscussion/comments/{commentId}` | DeleteComment |
| `POST` | `/CommunityApi/ResourceDiscussion/{resourceId}/report` | ReportResource |

### ResourceInteractionApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/CommunityApi/ResourceInteraction/{id}/view` | RecordView |
| `POST` | `/CommunityApi/ResourceInteraction/{id}/bookmark` | ToggleBookmark |
| `POST` | `/CommunityApi/ResourceInteraction/{id}/rate` | SubmitRating |
| `POST` | `/CommunityApi/ResourceInteraction/{id}/share` | RecordShare |

### ShareApiController.cs

| HTTP Method | Endpoint | Tên Hàm Xử Lý (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/ShareApi/share` | ShareContent |

