using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartLMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCommunityChatHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    AuditId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    ActionType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntityName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntityId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OldValues = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NewValues = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ControllerName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ActionName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Parameters = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Timestamp = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.AuditId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Badges",
                columns: table => new
                {
                    BadgeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IconUrl = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rarity = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequirementsJson = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Badges", x => x.BadgeId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Cohorts",
                columns: table => new
                {
                    CohortId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cohorts", x => x.CohortId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CommissionRates",
                columns: table => new
                {
                    CommissionRateId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoleName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Percentage = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommissionRates", x => x.CommissionRateId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CommunityChatMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SenderId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SenderName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SenderAvatar = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MessageText = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PostUrl = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PreviewTitle = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PreviewDesc = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Timestamp = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunityChatMessages", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CommunityEvents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EventDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Location = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EventType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaxParticipants = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsApproved = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunityEvents", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Coupons",
                columns: table => new
                {
                    CouponId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DiscountAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DiscountType = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true, defaultValue: "Fixed")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ExpiryDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupons", x => x.CouponId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Flashcards",
                columns: table => new
                {
                    FlashcardId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    LessonId = table.Column<int>(type: "int", nullable: false),
                    FrontSide = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BackSide = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Hint = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ImageUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastReviewDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    NextReviewDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IntervalDays = table.Column<int>(type: "int", nullable: false),
                    EaseFactor = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flashcards", x => x.FlashcardId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    OrganizationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Domain = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RateLimitTier = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.OrganizationId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Group = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.PermissionId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ApiKeys",
                columns: table => new
                {
                    KeyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HashedKey = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    KeyPreview = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    LastUsed = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApiKeys", x => x.KeyId);
                    table.ForeignKey(
                        name: "FK_ApiKeys_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FullName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmailHash = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: true),
                    LecturerStatus = table.Column<int>(type: "int", nullable: true),
                    Bio = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DonateUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    KYCDocUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    DateOfBirth = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Hometown = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalXP = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    CurrentStreak = table.Column<int>(type: "int", nullable: false),
                    LastActivityDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    HierarchyLevel = table.Column<int>(type: "int", nullable: true, defaultValue: 3),
                    DepartmentId = table.Column<int>(type: "int", nullable: true),
                    OrganizationId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Users__1788CCACC0BF0FD7", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Webhooks",
                columns: table => new
                {
                    WebhookId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TargetUrl = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EventType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Secret = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrganizationId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Webhooks", x => x.WebhookId);
                    table.ForeignKey(
                        name: "FK_Webhooks_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RolePermissions",
                columns: table => new
                {
                    RolePermissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoleName = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => x.RolePermissionId);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permissions",
                        principalColumn: "PermissionId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ActivityLogs",
                columns: table => new
                {
                    LogID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserID = table.Column<int>(type: "int", nullable: true),
                    ActionType = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Timestamp = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    DurationSeconds = table.Column<int>(type: "int", nullable: true, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Activity__5E5499A8AC2913CB", x => x.LogID);
                    table.ForeignKey(
                        name: "FK__ActivityL__UserI__59063A47",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    TutorId = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    MeetingLink = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Note = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.BookingId);
                    table.ForeignKey(
                        name: "FK_Bookings_Users_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_Users_TutorId",
                        column: x => x.TutorId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CommunityQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BestAnswerId = table.Column<int>(type: "int", nullable: true),
                    IsApproved = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunityQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommunityQuestions_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CommunityResources",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FileType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FileUrl = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Subject = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rating = table.Column<double>(type: "double", nullable: false),
                    VoteCount = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UploaderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunityResources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommunityResources_Users_UploaderId",
                        column: x => x.UploaderId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BaseSalaryImpact = table.Column<double>(type: "double", nullable: true, defaultValue: 0.0),
                    InstructorId = table.Column<int>(type: "int", nullable: true),
                    ThumbnailUrl = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: true, defaultValue: 0m),
                    DiscountPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    IsFree = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Rating = table.Column<double>(type: "double", nullable: false),
                    RatingCount = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true, defaultValue: "Published")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MetaTitle = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MetaDescription = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false, defaultValue: false),
                    CertificateConfigJson = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CertificateTemplateUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AI_BaseSalaryImpact = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    DepartmentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Courses__C92D718770778267", x => x.CourseID);
                    table.ForeignKey(
                        name: "FK_Courses_Users",
                        column: x => x.InstructorId,
                        principalTable: "Users",
                        principalColumn: "UserID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DocumentPages",
                columns: table => new
                {
                    DocumentPageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Icon = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsPublic = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentPages", x => x.DocumentPageId);
                    table.ForeignKey(
                        name: "FK_DocumentPages_DocumentPages_ParentId",
                        column: x => x.ParentId,
                        principalTable: "DocumentPages",
                        principalColumn: "DocumentPageId");
                    table.ForeignKey(
                        name: "FK_DocumentPages_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EventParticipants",
                columns: table => new
                {
                    EventId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RSVPDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventParticipants", x => new { x.EventId, x.UserId });
                    table.ForeignKey(
                        name: "FK_EventParticipants_CommunityEvents_EventId",
                        column: x => x.EventId,
                        principalTable: "CommunityEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventParticipants_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    NotificationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Message = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Link = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsRead = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Type = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.NotificationId);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudyGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Subject = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LeaderId = table.Column<int>(type: "int", nullable: false),
                    ProgressPercentage = table.Column<int>(type: "int", nullable: false),
                    EXP = table.Column<int>(type: "int", nullable: false),
                    IsPrivate = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsApproved = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudyGroups_Users_LeaderId",
                        column: x => x.LeaderId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserActivityPoints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Points = table.Column<int>(type: "int", nullable: false),
                    ActivityType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LoggedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserActivityPoints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserActivityPoints_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserBadges",
                columns: table => new
                {
                    BadgeId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BadgeName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BadgeIcon = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EarnedDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBadges", x => new { x.UserId, x.BadgeId });
                    table.ForeignKey(
                        name: "FK_UserBadges_Badges_BadgeId",
                        column: x => x.BadgeId,
                        principalTable: "Badges",
                        principalColumn: "BadgeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBadges_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserCohorts",
                columns: table => new
                {
                    UserCohortId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CohortId = table.Column<int>(type: "int", nullable: false),
                    JoinedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCohorts", x => x.UserCohortId);
                    table.ForeignKey(
                        name: "FK_UserCohorts_Cohorts_CohortId",
                        column: x => x.CohortId,
                        principalTable: "Cohorts",
                        principalColumn: "CohortId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCohorts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CommunityAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    IsVerified = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Votes = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunityAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommunityAnswers_CommunityQuestions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "CommunityQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommunityAnswers_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CourseModules",
                columns: table => new
                {
                    ModuleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CourseID = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrderIndex = table.Column<int>(type: "int", nullable: true, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseModules", x => x.ModuleID);
                    table.ForeignKey(
                        name: "FK_CourseModules_Courses",
                        column: x => x.CourseID,
                        principalTable: "Courses",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DirectMessages",
                columns: table => new
                {
                    MessageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SenderId = table.Column<int>(type: "int", nullable: false),
                    ReceiverId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SentAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsRead = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DirectMessages", x => x.MessageId);
                    table.ForeignKey(
                        name: "FK_DirectMessages_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DirectMessages_Users_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DirectMessages_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enrollments",
                columns: table => new
                {
                    EnrollmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserID = table.Column<int>(type: "int", nullable: true),
                    CourseID = table.Column<int>(type: "int", nullable: true),
                    Progress = table.Column<double>(type: "double", nullable: true, defaultValue: 0.0),
                    AvgScore = table.Column<double>(type: "double", nullable: true, defaultValue: 0.0),
                    LastAccessDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsCompleted = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValue: false),
                    IsDropout = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValue: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Enrollme__7F6877FB34CFF1B9", x => x.EnrollmentID);
                    table.ForeignKey(
                        name: "FK__Enrollmen__Cours__52593CB8",
                        column: x => x.CourseID,
                        principalTable: "Courses",
                        principalColumn: "CourseID");
                    table.ForeignKey(
                        name: "FK__Enrollmen__UserI__5165187F",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Exams",
                columns: table => new
                {
                    ExamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    DepartmentId = table.Column<int>(type: "int", nullable: true),
                    SettingsJson = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exams", x => x.ExamId);
                    table.ForeignKey(
                        name: "FK_Exams_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    InvoiceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TransactionReference = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PaidAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    VnpayBankCode = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.InvoiceId);
                    table.ForeignKey(
                        name: "FK_Invoices_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invoices_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CorrectAnswer = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    XPValue = table.Column<int>(type: "int", nullable: false),
                    DepartmentId = table.Column<int>(type: "int", nullable: true),
                    CourseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Questions_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudyGroupMembers",
                columns: table => new
                {
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Role = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JoinedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyGroupMembers", x => new { x.GroupId, x.UserId });
                    table.ForeignKey(
                        name: "FK_StudyGroupMembers_StudyGroups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "StudyGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudyGroupMembers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    LessonID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ModuleID = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    VideoUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LessonType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrderIndex = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    IsExercise = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Points = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.LessonID);
                    table.ForeignKey(
                        name: "FK_Lessons_CourseModules",
                        column: x => x.ModuleID,
                        principalTable: "CourseModules",
                        principalColumn: "ModuleID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "QuizAttempts",
                columns: table => new
                {
                    AttemptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ExamId = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AnswersJson = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FinishedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizAttempts", x => x.AttemptId);
                    table.ForeignKey(
                        name: "FK_QuizAttempts_Exams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "Exams",
                        principalColumn: "ExamId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizAttempts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ExamQuestions",
                columns: table => new
                {
                    ExamId = table.Column<int>(type: "int", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    QuestionId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamQuestions", x => new { x.ExamId, x.QuestionId });
                    table.ForeignKey(
                        name: "FK_ExamQuestions_Exams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "Exams",
                        principalColumn: "ExamId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamQuestions_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamQuestions_Questions_QuestionId1",
                        column: x => x.QuestionId1,
                        principalTable: "Questions",
                        principalColumn: "QuestionId");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CodingChallenges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TemplateCode = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Language = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Points = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: true),
                    LessonId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodingChallenges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CodingChallenges_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseID");
                    table.ForeignKey(
                        name: "FK_CodingChallenges_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "LessonID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "LessonQuestions",
                columns: table => new
                {
                    LessonQuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LessonId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Answer = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AnsweredBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    AnsweredAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsPrivate = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonQuestions", x => x.LessonQuestionId);
                    table.ForeignKey(
                        name: "FK_LessonQuestions_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "LessonID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonQuestions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MistakeLogs",
                columns: table => new
                {
                    MistakeLogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: true),
                    LessonId = table.Column<int>(type: "int", nullable: false),
                    ExerciseType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserAnswer = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CorrectAnswer = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CorrectionNote = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MistakeType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NextReviewDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ConfidenceLevel = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsResolved = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MistakeLogs", x => x.MistakeLogId);
                    table.ForeignKey(
                        name: "FK_MistakeLogs_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseID");
                    table.ForeignKey(
                        name: "FK_MistakeLogs_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "LessonID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MistakeLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserLessons",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LessonId = table.Column<int>(type: "int", nullable: false),
                    LastWatchedSecond = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    IsCompleted = table.Column<bool>(type: "tinyint(1)", nullable: false, defaultValue: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLessons", x => new { x.UserId, x.LessonId });
                    table.ForeignKey(
                        name: "FK_UserLessons_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "LessonID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserLessons_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TestCases",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CodingChallengeId = table.Column<int>(type: "int", nullable: false),
                    Input = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ExpectedOutput = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsHidden = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestCases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestCases_CodingChallenges_CodingChallengeId",
                        column: x => x.CodingChallengeId,
                        principalTable: "CodingChallenges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    CommentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.CommentId);
                    table.ForeignKey(
                        name: "FK_Comments_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Summary = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Slug = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ThumbnailUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Tags = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastActivityAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ViewCount = table.Column<int>(type: "int", nullable: false),
                    VoteCount = table.Column<int>(type: "int", nullable: false),
                    VerifiedCommentId = table.Column<int>(type: "int", nullable: true),
                    IsPublished = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.PostId);
                    table.ForeignKey(
                        name: "FK_Posts_Comments_VerifiedCommentId",
                        column: x => x.VerifiedCommentId,
                        principalTable: "Comments",
                        principalColumn: "CommentId");
                    table.ForeignKey(
                        name: "FK_Posts_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PostVote",
                columns: table => new
                {
                    PostVoteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostVote", x => x.PostVoteId);
                    table.ForeignKey(
                        name: "FK_PostVote_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "PostId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostVote_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Reposts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    OriginalPostId = table.Column<int>(type: "int", nullable: false),
                    CustomComment = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RepostedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reposts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reposts_Posts_OriginalPostId",
                        column: x => x.OriginalPostId,
                        principalTable: "Posts",
                        principalColumn: "PostId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reposts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLogs_UserID_Timestamp",
                table: "ActivityLogs",
                columns: new[] { "UserID", "Timestamp" });

            migrationBuilder.CreateIndex(
                name: "IX_ApiKeys_OrganizationId",
                table: "ApiKeys",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_UserId_Timestamp",
                table: "AuditLogs",
                columns: new[] { "UserId", "Timestamp" });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_StudentId",
                table: "Bookings",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_TutorId",
                table: "Bookings",
                column: "TutorId");

            migrationBuilder.CreateIndex(
                name: "IX_CodingChallenges_CourseId",
                table: "CodingChallenges",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CodingChallenges_LessonId",
                table: "CodingChallenges",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AuthorId",
                table: "Comments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityAnswers_AuthorId",
                table: "CommunityAnswers",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityAnswers_QuestionId",
                table: "CommunityAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityQuestions_AuthorId",
                table: "CommunityQuestions",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityResources_UploaderId",
                table: "CommunityResources",
                column: "UploaderId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseModules_CourseID",
                table: "CourseModules",
                column: "CourseID");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_InstructorId",
                table: "Courses",
                column: "InstructorId");

            migrationBuilder.CreateIndex(
                name: "IX_DirectMessages_CourseId",
                table: "DirectMessages",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_DirectMessages_ReceiverId",
                table: "DirectMessages",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_DirectMessages_SenderId",
                table: "DirectMessages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentPages_ParentId",
                table: "DocumentPages",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentPages_UserId",
                table: "DocumentPages",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_CourseID",
                table: "Enrollments",
                column: "CourseID");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_UserID_CourseID",
                table: "Enrollments",
                columns: new[] { "UserID", "CourseID" });

            migrationBuilder.CreateIndex(
                name: "IX_EventParticipants_UserId",
                table: "EventParticipants",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamQuestions_QuestionId",
                table: "ExamQuestions",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamQuestions_QuestionId1",
                table: "ExamQuestions",
                column: "QuestionId1");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_CourseId",
                table: "Exams",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_CourseId",
                table: "Invoices",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_TransactionReference",
                table: "Invoices",
                column: "TransactionReference",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_UserId",
                table: "Invoices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonQuestions_LessonId",
                table: "LessonQuestions",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonQuestions_UserId",
                table: "LessonQuestions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_ModuleID",
                table: "Lessons",
                column: "ModuleID");

            migrationBuilder.CreateIndex(
                name: "IX_MistakeLogs_CourseId",
                table: "MistakeLogs",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_MistakeLogs_LessonId",
                table: "MistakeLogs",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_MistakeLogs_UserId",
                table: "MistakeLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_AuthorId",
                table: "Posts",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_VerifiedCommentId",
                table: "Posts",
                column: "VerifiedCommentId");

            migrationBuilder.CreateIndex(
                name: "IX_PostVote_PostId_UserId",
                table: "PostVote",
                columns: new[] { "PostId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PostVote_UserId",
                table: "PostVote",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_CourseId",
                table: "Questions",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizAttempts_ExamId",
                table: "QuizAttempts",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizAttempts_UserId",
                table: "QuizAttempts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reposts_OriginalPostId",
                table: "Reposts",
                column: "OriginalPostId");

            migrationBuilder.CreateIndex(
                name: "IX_Reposts_UserId",
                table: "Reposts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_PermissionId",
                table: "RolePermissions",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyGroupMembers_UserId",
                table: "StudyGroupMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyGroups_LeaderId",
                table: "StudyGroups",
                column: "LeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_TestCases_CodingChallengeId",
                table: "TestCases",
                column: "CodingChallengeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserActivityPoints_UserId",
                table: "UserActivityPoints",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBadges_BadgeId",
                table: "UserBadges",
                column: "BadgeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCohorts_CohortId",
                table: "UserCohorts",
                column: "CohortId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCohorts_UserId",
                table: "UserCohorts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLessons_LessonId",
                table: "UserLessons",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_OrganizationId",
                table: "Users",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "UQ__Users__536C85E429ECC54B",
                table: "Users",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Webhooks_OrganizationId",
                table: "Webhooks",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Posts_PostId",
                table: "Comments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "PostId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_AuthorId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_AuthorId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Posts_PostId",
                table: "Comments");

            migrationBuilder.DropTable(
                name: "ActivityLogs");

            migrationBuilder.DropTable(
                name: "ApiKeys");

            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "CommissionRates");

            migrationBuilder.DropTable(
                name: "CommunityAnswers");

            migrationBuilder.DropTable(
                name: "CommunityChatMessages");

            migrationBuilder.DropTable(
                name: "CommunityResources");

            migrationBuilder.DropTable(
                name: "Coupons");

            migrationBuilder.DropTable(
                name: "DirectMessages");

            migrationBuilder.DropTable(
                name: "DocumentPages");

            migrationBuilder.DropTable(
                name: "Enrollments");

            migrationBuilder.DropTable(
                name: "EventParticipants");

            migrationBuilder.DropTable(
                name: "ExamQuestions");

            migrationBuilder.DropTable(
                name: "Flashcards");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "LessonQuestions");

            migrationBuilder.DropTable(
                name: "MistakeLogs");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "PostVote");

            migrationBuilder.DropTable(
                name: "QuizAttempts");

            migrationBuilder.DropTable(
                name: "Reposts");

            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "StudyGroupMembers");

            migrationBuilder.DropTable(
                name: "TestCases");

            migrationBuilder.DropTable(
                name: "UserActivityPoints");

            migrationBuilder.DropTable(
                name: "UserBadges");

            migrationBuilder.DropTable(
                name: "UserCohorts");

            migrationBuilder.DropTable(
                name: "UserLessons");

            migrationBuilder.DropTable(
                name: "Webhooks");

            migrationBuilder.DropTable(
                name: "CommunityQuestions");

            migrationBuilder.DropTable(
                name: "CommunityEvents");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Exams");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "StudyGroups");

            migrationBuilder.DropTable(
                name: "CodingChallenges");

            migrationBuilder.DropTable(
                name: "Badges");

            migrationBuilder.DropTable(
                name: "Cohorts");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "CourseModules");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Comments");
        }
    }
}
