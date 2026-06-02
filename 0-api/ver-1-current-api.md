# Hiện trạng API Endpoints của Hệ thống (Current APIs)

Tài liệu này được trích xuất tự động từ mã nguồn hiện tại của hệ thống, bao gồm các API đang chạy trên **Core Backend (Port 5181)** và **Community Hub (Port 3080)**. Nginx trên **Port 80** chịu trách nhiệm định tuyến các request.

## Core Backend Module (Port 5181)

### AccountController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/Account` | Login |
| `POST` | `/Account` | Login |
| `GET` | `/Account` | Register |
| `POST` | `/Account` | Register |
| `GET` | `/Account` | AccessDenied |

### AffiliateController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/Affiliate` | GenerateLink |

### CommunityApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
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

### NotificationApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/notifications` | GetNotifications |
| `POST` | `/api/notifications/{id}/read` | MarkAsRead |

### PollApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/community/polls` | CreatePoll |
| `POST` | `/api/community/polls/{pollId}/vote` | Vote |

### WikiApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/wiki/pages` | GetUserPages |
| `GET` | `/api/wiki/pages/{id}` | GetPageDetail |
| `POST` | `/api/wiki/pages` | CreatePage |
| `PUT` | `/api/wiki/pages/{id}` | UpdatePage |
| `DELETE` | `/api/wiki/pages/{id}` | DeletePage |

### CompilerController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/Compiler/execute` | ExecuteCode |
| `GET` | `/api/Compiler/challenges` | GetChallenges |
| `GET` | `/api/Compiler/challenges/{id}` | GetChallengeDetail |
| `GET` | `/api/Compiler/courses` | GetInstructorCourses |
| `POST` | `/api/Compiler/courses/save` | SaveCourse |
| `GET` | `/api/Compiler/courses/{courseId}/lessons` | GetCourseLessons |
| `POST` | `/api/Compiler/challenges/save` | SaveChallenge |
| `POST` | `/api/Compiler/challenges/auto-create/{lessonId}` | AutoCreateChallenge |

### GamificationApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/gamification/status` | GetUserStatus |

### NotificationApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/NotificationApi` | GetNotifications |
| `GET` | `/api/NotificationApi/unread-count` | GetUnreadCount |
| `POST` | `/api/NotificationApi/{id}/read` | MarkAsRead |
| `POST` | `/api/NotificationApi/read-all` | MarkAllAsRead |

### PaymentApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/payment/create-invoice` | CreateInvoice |

### CoursesApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/public/courses` | GetCourses |
| `GET` | `/api/public/courses/performance` | GetPerformance |
| `GET` | `/api/public/courses/{id}` | GetCourseDetails |
| `POST` | `/api/public/courses` | CreateCourse |

### PublicPaymentApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/public/payment/config` | GetPaymentConfig |
| `POST` | `/api/public/payment/checkout/{courseId}` | Checkout |
| `GET` | `/api/public/payment/status/{txnRef}` | GetPaymentStatus |
| `POST` | `/api/public/payment/mock-webhook/{txnRef}` | MockWebhook |
| `POST` | `/api/public/payment/sepay-webhook` | SePayWebhook |

### MessageApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/messages/send` | SendMessage |
| `GET` | `/api/messages/history/{courseId}/{otherUserId}` | GetHistory |
| `GET` | `/api/messages/unread` | GetUnreadCount |

### MistakesApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/student/MistakesApi` | GetMistakes |
| `POST` | `/api/student/MistakesApi` | LogMistake |
| `POST` | `/api/student/MistakesApi/{id}/resolve` | ResolveMistake |

### StudentApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
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

### StudentCoursesApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/student/courses/my-courses` | GetMyCourses |
| `GET` | `/api/student/courses/{courseId}/portal` | GetCoursePortal |

### AssessmentApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/assessment/questions` | GetQuestions |
| `GET` | `/api/assessment/leaderboard` | GetLeaderboard |
| `POST` | `/api/assessment/submit` | SubmitQuiz |
| `GET` | `/api/assessment/my-achievements` | GetMyAchievements |
| `GET` | `/api/assessment/coding-challenges` | GetCodingChallengesByCourse |

### AssessmentController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/Assessment` | SaveQuestion |
| `POST` | `/Assessment` | SaveBadge |

### AuthApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/auth/token` | GenerateToken |
| `POST` | `/api/auth/register` | Register |

### AuthController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/Auth` | Login |
| `GET` | `/Auth` | Register |
| `POST` | `/Auth` | Login |
| `POST` | `/Auth` | Register |

### BookingController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/Booking/student` | GetStudentBookings |
| `GET` | `/api/Booking/tutor` | GetTutorBookings |
| `POST` | `/api/Booking` | CreateBooking |
| `PATCH` | `/api/Booking/{id}/status` | UpdateStatus |
| `GET` | `/api/Booking/tutors` | GetTutors |

### CodingChallengeController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/CodingChallenge` | Submit |

### CodingChallengeManagementController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/CodingChallengeManagement` | Create |
| `POST` | `/CodingChallengeManagement` | Edit |
| `POST` | `/CodingChallengeManagement` | AddTestCase |

### CohortController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/Cohort` | Create |
| `POST` | `/Cohort` | Update |
| `POST` | `/Cohort` | Delete |
| `POST` | `/Cohort` | ImportExcel |

### CouponController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/Coupon` | Create |
| `POST` | `/Coupon` | Create |
| `POST` | `/Coupon` | Delete |

### CourseManagementController

| HTTP Method | Endpoint | Tên Hàm (Action) |
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

### CurriculumController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/Curriculum/{courseId}` | GetCurriculum |
| `POST` | `/api/Curriculum/module` | AddModule |
| `POST` | `/api/Curriculum/lesson` | AddLesson |

### DashboardController

| HTTP Method | Endpoint | Tên Hàm (Action) |
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

### ForumController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/Forum` | Index |
| `POST` | `/Forum` | SimulateAiDraft |
| `POST` | `/Forum` | SimulateCompileSandbox |
| `POST` | `/Forum` | CompleteShareReward |

### IAMController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/IAM` | UpdatePermission |
| `POST` | `/IAM` | GenerateApiKey |
| `POST` | `/IAM` | RevokeApiKey |

### MarketingController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/Marketing` | PreviewPdf |

### PaymentController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/Payment` | VnpayIPN |
| `POST` | `/Payment` | VnpayIPN |

### RevenueController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/Revenue` | PaymentConfig |
| `POST` | `/Revenue` | ManualConfirm |
| `GET` | `/Revenue` | GetRevenueJson |

### SqlManagementController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/SqlManagement` | Execute |
| `GET` | `/SqlManagement` | GetHealth |

### StudentsController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/Students` | GetStudents |
| `POST` | `/Students` | Nudge |
| `GET` | `/Students` | RiskAnalysis |
| `GET` | `/Students` | ExportReport |

### UserManagementController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/UserManagement` | UpdateStatus |
| `GET` | `/UserManagement` | ExportToExcel |
| `GET` | `/UserManagement` | Search |
| `GET` | `/UserManagement` | GetAuditTrail |

## Community Hub Module (Port 3080)

### AdminController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/admin/moderation` | Moderation |
| `POST` | `/admin/approve/{id}` | ApprovePost |
| `POST` | `/admin/reject/{id}` | RejectPost |
| `POST` | `/admin/approve-item` | ApproveItem |
| `POST` | `/admin/reject-item` | RejectItem |

### AttachmentApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/AttachmentApi/upload` | Upload |
| `GET` | `/api/AttachmentApi/view/{id}` | ViewAttachment |
| `GET` | `/api/AttachmentApi/metadata/{id}` | GetMetadata |

### AuthController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/Auth` | Login |
| `POST` | `/Auth` | Login |
| `GET` | `/Auth` | Register |
| `POST` | `/Auth` | Register |

### CommunityController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/hub` | Index |
| `GET` | `/hub/post/new` | Create |
| `POST` | `/hub/post/new` | SubmitPost |
| `GET` | `/hub/post/{id}` | Details |
| `POST` | `/hub/post/{id}/comment` | AddComment |
| `POST` | `/hub/post/{id}/upvote` | Upvote |
| `GET` | `/hub/resources` | Resources |
| `GET` | `/Community/Resources` | Resources |
| `GET` | `/hub/resources/{id}` | ResourceDetail |
| `GET` | `/Community/Resources/{id}` | ResourceDetail |
| `GET` | `/hub/events` | Events |
| `GET` | `/Community/Events` | Events |
| `GET` | `/hub/events/{id}` | EventDetail |
| `GET` | `/Community/Events/{id}` | EventDetail |
| `GET` | `/hub/members` | Members |
| `GET` | `/Community/Members` | Members |
| `GET` | `/hub/qa` | QA |
| `GET` | `/Community/QA` | QA |
| `GET` | `/hub/qa/{id}` | QaDetail |
| `GET` | `/Community/QA/{id}` | QaDetail |
| `GET` | `/hub/groups` | Groups |
| `GET` | `/Community/Groups` | Groups |
| `GET` | `/hub/groups/{id}` | GroupDetail |
| `GET` | `/Community/Groups/{id}` | GroupDetail |
| `GET` | `/hub/leaderboard` | Leaderboard |
| `GET` | `/Community/Leaderboard` | Leaderboard |
| `GET` | `/hub/mentor` | Mentor |
| `GET` | `/Community/Mentor` | Mentor |
| `GET` | `/hub/profile/me` | MyProfile |
| `GET` | `/Community/Profile/Me` | MyProfile |
| `GET` | `/hub/profile/{id}` | Profile |
| `GET` | `/Community/Profile/{id}` | Profile |
| `GET` | `/hub/messages` | Messages |
| `GET` | `/Community/Messages` | Messages |
| `POST` | `/hub/SimulateAiDraft` | SimulateAiDraft |
| `POST` | `/hub/SimulateCompileSandbox` | SimulateCompileSandbox |
| `POST` | `/hub/CompleteShareReward` | CompleteShareReward |
| `GET` | `/api/seed-posts` | SeedPosts |
| `GET` | `/api/chat/history` | GetChatHistory |

### EventApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/EventApi` | GetEvents |
| `POST` | `/api/EventApi/rsvp/{eventId}` | RSVPEvent |
| `POST` | `/api/EventApi/create` | CreateEvent |
| `GET` | `/api/EventApi/{eventId}/discussions` | GetEventDiscussions |
| `POST` | `/api/EventApi/{eventId}/discussions` | CreateEventDiscussion |

### GroupApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/GroupApi` | GetGroups |
| `POST` | `/api/GroupApi/join/{groupId}` | JoinGroup |
| `POST` | `/api/GroupApi/create` | CreateGroup |
| `GET` | `/api/GroupApi/{groupId}/posts` | GetGroupPosts |
| `POST` | `/api/GroupApi/{groupId}/posts` | CreatePost |

### LeaderboardApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/LeaderboardApi` | GetLeaderboard |
| `GET` | `/api/LeaderboardApi/me` | GetMyRank |

### NotificationApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/NotificationApi` | GetNotifications |
| `GET` | `/api/NotificationApi/unread-count` | GetUnreadCount |
| `POST` | `/api/NotificationApi/{id}/read` | MarkAsRead |
| `POST` | `/api/NotificationApi/read-all` | MarkAllAsRead |

### QaApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/api/QaApi/questions` | GetQuestions |
| `POST` | `/api/QaApi/questions` | AskQuestion |
| `POST` | `/api/QaApi/questions/{id}/answers` | AddAnswer |

### RatingApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/RatingApi` | RateUser |

### ResourceApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/CommunityApi/ResourceApi` | GetResources |
| `POST` | `/CommunityApi/ResourceApi` | UploadResource |
| `POST` | `/CommunityApi/ResourceApi/{id}/bookmark` | BookmarkResource |
| `POST` | `/CommunityApi/ResourceApi/{id}/rate` | RateResource |
| `POST` | `/CommunityApi/ResourceApi/{id}/view` | ViewResource |
| `POST` | `/CommunityApi/ResourceApi/{id}/download` | DownloadResource |

### ResourceDiscussionApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `GET` | `/CommunityApi/ResourceDiscussion/{resourceId}/comments` | GetComments |
| `POST` | `/CommunityApi/ResourceDiscussion/{resourceId}/comments` | PostComment |
| `POST` | `/CommunityApi/ResourceDiscussion/comments/{commentId}/upvote` | UpvoteComment |
| `DELETE` | `/CommunityApi/ResourceDiscussion/comments/{commentId}` | DeleteComment |
| `POST` | `/CommunityApi/ResourceDiscussion/{resourceId}/report` | ReportResource |

### ResourceInteractionApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/CommunityApi/ResourceInteraction/{id}/view` | RecordView |
| `POST` | `/CommunityApi/ResourceInteraction/{id}/bookmark` | ToggleBookmark |
| `POST` | `/CommunityApi/ResourceInteraction/{id}/rate` | SubmitRating |
| `POST` | `/CommunityApi/ResourceInteraction/{id}/share` | RecordShare |

### ShareApiController

| HTTP Method | Endpoint | Tên Hàm (Action) |
| :--- | :--- | :--- |
| `POST` | `/api/ShareApi/share` | ShareContent |

