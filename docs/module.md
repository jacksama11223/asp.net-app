# 🗺️ SmartLMS.AI Codebase & Module Map

*Bản đồ toàn diện được lập tự động bởi Antigravity Cartographer*

## 🏗️ Infrastructure & Config
- `docker-compose.prod.yml`
- `docker-compose.worker.yml`
- `nginx-lb.conf`
- `SmartLMS.sln`
- `Dockerfile`

## 🛡️ Core Models (Entities)
- `AchievementHubViewModel`
- `ActivityLog`
- `AiMentor`
- `ApiKey`
- `AuditLog`
- `Badge`
- `Booking`
- `Class1`
- `CodingChallenge`
- `Cohort`
- `Comment`
- `CommissionRate`
- `CommunityChatMessage`
- `CommunityGamification`
- `CommunityInteraction`
- `CommunityModules`
- `CommunityProfile`
- `Coupon`
- `Course`
- `CourseModule`
- `DashboardViewModels`
- `DirectMessage`
- `DocumentPage`
- `Enrollment`
- `Exam`
- `ExamQuestion`
- `Flashcard`
- `Lesson`
- `LessonQuestion`
- `MistakeLog`
- `Notification`
- `Organization`
- `Permission`
- `Post`
- `PostVote`
- `Question`
- `QuestionDto`
- `QuizAttempt`
- `RolePermission`
- `SmtpSettings`
- `User`
- `UserCohort`
- `UserLesson`
- `Webhook`
- `ZoomConfig`

## 💾 Data Access Layer (EF Core)
- `AuditEntry`
- `Class1`
- `ReadOnlyInterceptor`
- `Repository`
- `SmartLMSContext`

## 🧠 Business Logic (Modules)
### 📂 Services
- `AffiliateService`
- `ApiKeyService`
- `AssessmentService`
- `AutoCensorService`
- `BacklinkService`
- `BookingService`
- `CertificateService`
- `CohortService`
- `CommunityService`
- `CompilerService`
- `CourseService`
- `CurriculumService`
- `EmailService`
- `ForumService`
- `IApiKeyService`
- `IAssessmentService`
- `IBacklinkService`
- `IBookingService`
- `ICohortService`
- `ICommunityService`
- `ICompilerService`
- `ICurriculumService`
- `IForumService`
- `INotificationService`
- `IOrderService`
- `ISearchEngineService`
- `ISqlService`
- `IStorageService`
- `IStudentService`
- `IUserService`
- `IVideoTranscoderService`
- `MockElasticsearchService`
- `MockVideoTranscoderService`
- `ModerationService`
- `OrderService`
- `PredictionService`
- `ReportingService`
- `S3StorageService`
- `SqlService`
- `StudentService`
- `UserService`
- `WebhookService`
- `ZoomIntegrationService`
### 📂 bin
### 📂 Events
- `AssessmentCompletedEvent`
- `BookingCreatedEvent`
### 📂 Extensions
- `DistributedCacheExtensions`
### 📂 Handlers
- `AssessmentEventHandler`
- `GamificationEventHandler`
- `NotificationEventHandler`
### 📂 Jobs
- `AuditCleanupJob`
- `IndexingJob`
- `VideoTranscodeJob`
### 📂 MessageBus
- `IMessageBus`
- `MockRabbitMQBus`
- `RabbitMQBus`
### 📂 obj
### 📂 Security
- `AesEncryptionService`
- `CurrentUserService`

## 🌐 Web Entry Points (Main)
- [UI/API] `Account`
- [UI/API] `Affiliate`
- [UI/API] `Api`
- [UI/API] `AssessmentApi`
- [UI/API] `Assessment`
- [UI/API] `AuthApi`
- [UI/API] `Auth`
- [UI/API] `Booking`
- [UI/API] `CodingChallenge`
- [UI/API] `CodingChallengeManagement`
- [UI/API] `Cohort`
- [UI/API] `Community`
- [UI/API] `Coupon`
- [UI/API] `CourseManagement`
- [UI/API] `Curriculum`
- [UI/API] `Dashboard`
- [UI/API] `Forum`
- [UI/API] `Helpdesk`
- [UI/API] `Home`
- [UI/API] `IAM`
- [UI/API] `Integrations`
- [UI/API] `Marketing`
- [UI/API] `Payment`
- [UI/API] `Revenue`
- [UI/API] `SqlManagement`
- [UI/API] `Students`
- [UI/API] `UserManagement`

## 👥 Community Hub (Port 3080)
- [UI/API] `Admin`
- [UI/API] `AttachmentApi`
- [UI/API] `Auth`
- [UI/API] `Community`
- [UI/API] `EventApi`
- [UI/API] `GroupApi`
- [UI/API] `Home`
- [UI/API] `LeaderboardApi`
- [UI/API] `QaApi`
- [UI/API] `RatingApi`
- [UI/API] `ResourceApi`
- [UI/API] `ShareApi`
- [UI/API] `WeatherForecast`

## ⚡ Event Handlers & Workers

## 📜 Database Scripts & SQL
- `add_forum_seed_data.sql`
- `add_user_lessons_table.sql`
- `alter_table.sql`
- `create_messages_table.sql`
- `create_table.sql`
- `db_dump.sql`
- `deploy_vps.sql`
- `enterprise_patch.sql`
- `fix_community_db.sql`
- `fix_ef_mapping.sql`
- `fix_instructor_courses.sql`
- `hotfix_db_domain.sql`
- `mariadb_fixes.sql`
- `optimization_audit.sql`
- `optimize_db.sql`
- `performance_tuning.sql`
- `phase3_only.sql`
- `procedures.sql`
- `repair_data.sql`
- `seed.sql`
- `setup_database.sql`
- `smartlms_seed_data.sql`
- `sync_db_full_v4.sql`
- `sync_db_schema.sql`
- `sync_db_v5_final_fix.sql`
- `update_course_management.sql`
- `update_phase3.sql`
- `update_sprint2_schema.sql`
- `update_tech_debt.sql`
- `user_management_upgrade.sql`

