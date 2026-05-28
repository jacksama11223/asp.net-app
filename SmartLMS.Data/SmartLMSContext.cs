using SmartLMS.Models.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Data;

public partial class SmartLMSContext : DbContext
{
    private readonly IEncryptionService _encryptionService;
    private readonly ICurrentUserService? _currentUserService;

    public SmartLMSContext()
    {
    }

    public SmartLMSContext(DbContextOptions<SmartLMSContext> options, 
                          IEncryptionService encryptionService = null,
                          ICurrentUserService currentUserService = null)
        : base(options)
    {
        _encryptionService = encryptionService;
        _currentUserService = currentUserService;
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var auditEntries = OnBeforeSaveChanges();
        
        // Logic tạo EmailHash (Blind Index) cho User để hỗ trợ tìm kiếm
        foreach (var entry in ChangeTracker.Entries<User>().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified))
        {
            if (entry.Property(u => u.Email).IsModified || entry.State == EntityState.Added)
            {
                var email = entry.Entity.Email;
                if (!string.IsNullOrEmpty(email))
                {
                    entry.Entity.EmailHash = _encryptionService?.CreateHash(email);
                }
            }
        }

        var result = await base.SaveChangesAsync(cancellationToken);
        await OnAfterSaveChanges(auditEntries);
        return result;
    }

    private List<AuditEntry> OnBeforeSaveChanges()
    {
        ChangeTracker.DetectChanges();
        var auditEntries = new List<AuditEntry>();
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is AuditLog || entry.State == EntityState.Detached || entry.State == EntityState.Unchanged)
                continue;

            var auditEntry = new AuditEntry(entry)
            {
                TableName = entry.Entity.GetType().Name,
                UserId = _currentUserService?.UserId
            };
            auditEntries.Add(auditEntry);

            foreach (var property in entry.Properties)
            {
                string propertyName = property.Metadata.Name;
                if (property.Metadata.IsPrimaryKey())
                {
                    auditEntry.KeyValues[propertyName] = property.CurrentValue;
                    continue;
                }

                switch (entry.State)
                {
                    case EntityState.Added:
                        auditEntry.NewValues[propertyName] = property.CurrentValue;
                        break;

                    case EntityState.Deleted:
                        auditEntry.OldValues[propertyName] = property.OriginalValue;
                        break;

                    case EntityState.Modified:
                        if (property.IsModified)
                        {
                            auditEntry.OldValues[propertyName] = property.OriginalValue;
                            auditEntry.NewValues[propertyName] = property.CurrentValue;
                        }
                        break;
                }
            }
        }

        return auditEntries;
    }

    private Task OnAfterSaveChanges(List<AuditEntry> auditEntries)
    {
        if (auditEntries == null || auditEntries.Count == 0)
            return Task.CompletedTask;

        foreach (var auditEntry in auditEntries)
        {
            AuditLogs.Add(auditEntry.ToAuditLog());
        }

        return base.SaveChangesAsync();
    }

    public virtual DbSet<ActivityLog> ActivityLogs { get; set; }
    public virtual DbSet<Course> Courses { get; set; }
    public virtual DbSet<CourseModule> CourseModules { get; set; }
    public virtual DbSet<Enrollment> Enrollments { get; set; }
    public virtual DbSet<Lesson> Lessons { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Booking> Bookings { get; set; }
    public virtual DbSet<Cohort> Cohorts { get; set; }
    public virtual DbSet<UserCohort> UserCohorts { get; set; }
    public virtual DbSet<Coupon> Coupons { get; set; }
    public virtual DbSet<AuditLog> AuditLogs { get; set; }
    public virtual DbSet<Permission> Permissions { get; set; }
    public virtual DbSet<RolePermission> RolePermissions { get; set; }
    public virtual DbSet<Organization> Organizations { get; set; }
    public virtual DbSet<ApiKey> ApiKeys { get; set; }
    public virtual DbSet<Question> Questions { get; set; }
    public virtual DbSet<UserBadge> UserBadges { get; set; }
    public virtual DbSet<CommissionRate> CommissionRates { get; set; }
    public virtual DbSet<Badge> Badges { get; set; }
    public virtual DbSet<Exam> Exams { get; set; }
    public virtual DbSet<ExamQuestion> ExamQuestions { get; set; }
    public virtual DbSet<QuizAttempt> QuizAttempts { get; set; }
    public virtual DbSet<Webhook> Webhooks { get; set; }
    public virtual DbSet<Invoice> Invoices { get; set; }
    public virtual DbSet<CodingChallenge> CodingChallenges { get; set; }
    public virtual DbSet<TestCase> TestCases { get; set; }
    public virtual DbSet<Flashcard> Flashcards { get; set; }
    public virtual DbSet<MistakeLog> MistakeLogs { get; set; }
    public virtual DbSet<LessonQuestion> LessonQuestions { get; set; }
    public virtual DbSet<UserLesson> UserLessons { get; set; }
    
    // Community Module
    public virtual DbSet<Post> Posts { get; set; }
    public virtual DbSet<Comment> Comments { get; set; }
    public virtual DbSet<CommunityResource> CommunityResources { get; set; }
    public virtual DbSet<CommunityEvent> CommunityEvents { get; set; }
    public virtual DbSet<EventParticipant> EventParticipants { get; set; }
    public virtual DbSet<StudyGroup> StudyGroups { get; set; }
    public virtual DbSet<StudyGroupMember> StudyGroupMembers { get; set; }
    public virtual DbSet<CommunityQuestion> CommunityQuestions { get; set; }
    public virtual DbSet<CommunityAnswer> CommunityAnswers { get; set; }
    public virtual DbSet<Repost> Reposts { get; set; }
    public virtual DbSet<UserActivityPoint> UserActivityPoints { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }
    public virtual DbSet<DocumentPage> DocumentPages { get; set; }
    public virtual DbSet<DirectMessage> DirectMessages { get; set; }
    public virtual DbSet<CommunityChatMessage> CommunityChatMessages { get; set; }

    // Interactive Features (Phase 2)
    public virtual DbSet<Attachment> Attachments { get; set; }
    public virtual DbSet<GroupPost> GroupPosts { get; set; }
    public virtual DbSet<GroupPostComment> GroupPostComments { get; set; }
    public virtual DbSet<EventDiscussion> EventDiscussions { get; set; }
    public virtual DbSet<SharedContent> SharedContents { get; set; }
    
    // Community Profile & Gamification (Phase 4 & 5)
    public virtual DbSet<EntityBacklink> EntityBacklinks { get; set; }
    public virtual DbSet<UserRating> UserRatings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Many-to-Many: Event Participants
        modelBuilder.Entity<EventParticipant>()
            .HasKey(ep => new { ep.EventId, ep.UserId });

        modelBuilder.Entity<EventParticipant>()
            .HasOne(ep => ep.Event)
            .WithMany(e => e.Participants)
            .HasForeignKey(ep => ep.EventId);

        // Many-to-Many: Study Group Members
        modelBuilder.Entity<StudyGroupMember>()
            .HasKey(sgm => new { sgm.GroupId, sgm.UserId });

        modelBuilder.Entity<StudyGroupMember>()
            .HasOne(sgm => sgm.Group)
            .WithMany(g => g.Members)
            .HasForeignKey(sgm => sgm.GroupId);

        // Value Converters for Encryption
        var encryptionConverter = new ValueConverter<string, string>(
            v => _encryptionService != null ? _encryptionService.Encrypt(v) : v,
            v => _encryptionService != null ? _encryptionService.Decrypt(v) : v);

        var dobConverter = new ValueConverter<DateTime?, string>(
            v => (v.HasValue && _encryptionService != null) ? _encryptionService.Encrypt(v.Value.ToString("yyyy-MM-dd")) : null,
            v => (!string.IsNullOrEmpty(v) && _encryptionService != null) ? DateTime.Parse(_encryptionService.Decrypt(v)) : null);

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Email).HasConversion(encryptionConverter);
            entity.Property(e => e.KYCDocUrl).HasConversion(encryptionConverter);
            entity.Property(e => e.Hometown).HasConversion(encryptionConverter);
            entity.Property(e => e.DateOfBirth).HasConversion(dobConverter);

            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCACC0BF0FD7");
            entity.HasIndex(e => e.Username, "UQ__Users__536C85E429ECC54B").IsUnique();
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("datetime");
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Role).HasMaxLength(20);
            entity.Property(e => e.Username).HasMaxLength(50);
            entity.Property(e => e.TotalXP).HasDefaultValue(0);
            entity.Property(e => e.HierarchyLevel).HasDefaultValue(3);
        });

        modelBuilder.Entity<Cohort>(entity => {
            entity.HasKey(e => e.CohortId);
            entity.Property(e => e.Name).HasMaxLength(150).IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnType("datetime").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<UserCohort>(entity => {
            entity.HasKey(e => e.UserCohortId);
            entity.HasOne(d => d.User).WithMany(p => p.UserCohorts).HasForeignKey(d => d.UserId);
            entity.HasOne(d => d.Cohort).WithMany(p => p.UserCohorts).HasForeignKey(d => d.CohortId);
        });

        modelBuilder.Entity<AuditLog>(entity => {
            entity.HasKey(e => e.AuditId);
            entity.Property(e => e.Timestamp).HasColumnType("datetime").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasIndex(e => new { e.UserId, e.Timestamp });
        });

        modelBuilder.Entity<ActivityLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PK__Activity__5E5499A8AC2913CB");
            entity.HasIndex(e => new { e.UserId, e.Timestamp });
            entity.Property(e => e.LogId).HasColumnName("LogID");
            entity.Property(e => e.ActionType).HasMaxLength(50);
            entity.Property(e => e.DurationSeconds).HasDefaultValue(0);
            entity.Property(e => e.Timestamp).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.HasOne(d => d.User).WithMany(p => p.ActivityLogs).HasForeignKey(d => d.UserId).HasConstraintName("FK__ActivityL__UserI__59063A47");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Courses__C92D718770778267");
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.BaseSalaryImpact).HasDefaultValue(0.0);
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(100);
            entity.Property(e => e.ThumbnailUrl).HasMaxLength(255);
            entity.Property(e => e.Status).HasMaxLength(20).HasDefaultValue("Published");
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)").HasDefaultValue(0m);
            entity.Property(e => e.CreatedAt).HasColumnType("datetime").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);
            entity.HasQueryFilter(e => !e.IsDeleted);
            entity.HasOne(d => d.Instructor).WithMany(p => p.Courses).HasForeignKey(d => d.InstructorId).HasConstraintName("FK_Courses_Users");
        });

        modelBuilder.Entity<Coupon>(entity =>
        {
            entity.HasKey(e => e.CouponId);
            entity.ToTable("Coupons");
            entity.Property(e => e.Code).HasMaxLength(50).IsRequired();
            entity.Property(e => e.DiscountAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.DiscountType).HasMaxLength(20).HasDefaultValue("Fixed");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<CourseModule>(entity =>
        {
            entity.HasKey(e => e.ModuleId);
            entity.ToTable("CourseModules");
            entity.Property(e => e.ModuleId).HasColumnName("ModuleID");
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.Title).HasMaxLength(150);
            entity.Property(e => e.OrderIndex).HasDefaultValue(0);
            entity.HasOne(d => d.Course).WithMany(p => p.CourseModules).HasForeignKey(d => d.CourseId).HasConstraintName("FK_CourseModules_Courses");
            entity.HasQueryFilter(e => !e.Course.IsDeleted);
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.HasKey(e => e.LessonId);
            entity.ToTable("Lessons");
            entity.Property(e => e.LessonId).HasColumnName("LessonID");
            entity.Property(e => e.ModuleId).HasColumnName("ModuleID");
            entity.Property(e => e.Title).HasMaxLength(150);
            entity.Property(e => e.OrderIndex).HasDefaultValue(0);
            entity.HasOne(d => d.Module).WithMany(p => p.Lessons).HasForeignKey(d => d.ModuleId).HasConstraintName("FK_Lessons_CourseModules");
            entity.HasQueryFilter(e => !e.Module.Course.IsDeleted);
        });

        modelBuilder.Entity<Enrollment>(entity =>
        {
            entity.HasKey(e => e.EnrollmentId).HasName("PK__Enrollme__7F6877FB34CFF1B9");
            entity.Property(e => e.EnrollmentId).HasColumnName("EnrollmentID");
            entity.Property(e => e.AvgScore).HasDefaultValue(0.0);
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.IsCompleted).HasDefaultValue(false);
            entity.Property(e => e.IsDropout).HasDefaultValue(false);
            entity.Property(e => e.LastAccessDate).HasColumnType("datetime");
            entity.Property(e => e.Progress).HasDefaultValue(0.0);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.HasIndex(e => new { e.UserId, e.CourseId });
            entity.HasOne(d => d.Course).WithMany(p => p.Enrollments).HasForeignKey(d => d.CourseId).HasConstraintName("FK__Enrollmen__Cours__52593CB8");
            entity.HasOne(d => d.User).WithMany(p => p.Enrollments).HasForeignKey(d => d.UserId).HasConstraintName("FK__Enrollmen__UserI__5165187F");
            entity.HasQueryFilter(e => !e.Course.IsDeleted);
        });

        modelBuilder.Entity<Permission>(entity => {
            entity.HasKey(e => e.PermissionId);
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Group).HasMaxLength(50);
        });

        modelBuilder.Entity<RolePermission>(entity => {
            entity.HasKey(e => e.RolePermissionId);
            entity.Property(e => e.RoleName).HasMaxLength(20).IsRequired();
            entity.HasOne(d => d.Permission).WithMany(p => p.RolePermissions).HasForeignKey(d => d.PermissionId);
        });

        modelBuilder.Entity<Question>(entity => {
            entity.HasKey(e => e.QuestionId);
            entity.HasOne(d => d.Course).WithMany(p => p.Questions).HasForeignKey(d => d.CourseId);
            entity.HasQueryFilter(e => !e.Course.IsDeleted);
        });

        modelBuilder.Entity<LessonQuestion>(entity => {
            entity.HasKey(e => e.LessonQuestionId);
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
            entity.HasOne(d => d.Lesson).WithMany().HasForeignKey(d => d.LessonId);
        });

        modelBuilder.Entity<Flashcard>(entity => {
            entity.HasKey(e => e.FlashcardId);
        });

        modelBuilder.Entity<MistakeLog>(entity => {
            entity.HasKey(e => e.MistakeLogId);
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
            entity.HasOne(d => d.Lesson).WithMany().HasForeignKey(d => d.LessonId);
            entity.HasOne(d => d.Course).WithMany().HasForeignKey(d => d.CourseId);
        });

        modelBuilder.Entity<UserBadge>(entity => {
            entity.HasKey(e => new { e.UserId, e.BadgeId });
            entity.HasOne(d => d.User).WithMany(p => p.UserBadges).HasForeignKey(d => d.UserId);
            entity.HasOne<Badge>().WithMany(b => b.UserBadges).HasForeignKey(ub => ub.BadgeId);
        });

        modelBuilder.Entity<CommissionRate>(entity => {
            entity.HasKey(e => e.CommissionRateId);
            entity.Property(e => e.Percentage).HasColumnType("decimal(18, 2)");
        });

        modelBuilder.Entity<Badge>(entity => {
            entity.HasKey(e => e.BadgeId);
        });

        modelBuilder.Entity<Exam>(entity => {
            entity.HasKey(e => e.ExamId);
            entity.HasOne(d => d.Course).WithMany().HasForeignKey(d => d.CourseId);
            entity.HasQueryFilter(e => !e.Course.IsDeleted);
        });

        modelBuilder.Entity<ExamQuestion>(entity => {
            entity.HasKey(e => new { e.ExamId, e.QuestionId });
            entity.HasOne(e => e.Exam).WithMany(p => p.ExamQuestions).HasForeignKey(e => e.ExamId);
            entity.HasOne(e => e.Question).WithMany().HasForeignKey(e => e.QuestionId);
        });

        modelBuilder.Entity<QuizAttempt>(entity => {
            entity.HasKey(e => e.AttemptId);
            entity.Property(e => e.Score).HasColumnType("decimal(18, 2)");
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
            entity.HasOne(d => d.Exam).WithMany(p => p.QuizAttempts).HasForeignKey(d => d.ExamId);
        });

        modelBuilder.Entity<Invoice>(entity => {
            entity.HasKey(e => e.InvoiceId);
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TransactionReference).HasMaxLength(100);
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.HasIndex(e => e.TransactionReference).IsUnique();
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
            entity.HasOne(d => d.Course).WithMany().HasForeignKey(d => d.CourseId);
            entity.HasQueryFilter(e => !e.Course.IsDeleted);
        });

        modelBuilder.Entity<Webhook>(entity => {
            entity.HasKey(e => e.WebhookId);
            entity.Property(e => e.TargetUrl).IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnType("datetime").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<CodingChallenge>(entity => {
            entity.HasKey(e => e.Id);
            entity.HasMany(e => e.TestCases).WithOne(t => t.CodingChallenge).HasForeignKey(t => t.CodingChallengeId);
            entity.HasOne(e => e.Course).WithMany().HasForeignKey(e => e.CourseId);
            entity.HasOne(e => e.Lesson).WithMany().HasForeignKey(e => e.LessonId);
        });

        modelBuilder.Entity<TestCase>(entity => {
            entity.HasKey(e => e.Id);
        });

        // Community Module Configurations - Explicit Mapping
        modelBuilder.Entity<CommunityResource>(entity => {
            entity.HasKey(e => e.Id);
            entity.ToTable("CommunityResources");
        });

        modelBuilder.Entity<CommunityEvent>(entity => {
            entity.HasKey(e => e.Id);
            entity.ToTable("CommunityEvents");
        });

        modelBuilder.Entity<CommunityQuestion>(entity => {
            entity.HasKey(e => e.Id);
            entity.ToTable("CommunityQuestions");
        });

        modelBuilder.Entity<CommunityAnswer>(entity => {
            entity.HasKey(e => e.Id);
            entity.ToTable("CommunityAnswers");
        });

        modelBuilder.Entity<StudyGroup>(entity => {
            entity.HasKey(e => e.Id);
            entity.ToTable("StudyGroups");
        });

        // Interactive Features Mapping
        modelBuilder.Entity<Attachment>(entity => {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Uploader).WithMany().HasForeignKey(e => e.UploaderId).OnDelete(DeleteBehavior.Restrict);
        });
        modelBuilder.Entity<GroupPost>(entity => {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Group).WithMany().HasForeignKey(e => e.GroupId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Author).WithMany().HasForeignKey(e => e.AuthorId).OnDelete(DeleteBehavior.Restrict);
        });
        modelBuilder.Entity<GroupPostComment>(entity => {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Post).WithMany(p => p.Comments).HasForeignKey(e => e.GroupPostId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Author).WithMany().HasForeignKey(e => e.AuthorId).OnDelete(DeleteBehavior.Restrict);
        });
        modelBuilder.Entity<EventDiscussion>(entity => {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Event).WithMany().HasForeignKey(e => e.EventId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Author).WithMany().HasForeignKey(e => e.AuthorId).OnDelete(DeleteBehavior.Restrict);
        });
        modelBuilder.Entity<SharedContent>(entity => {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Sender).WithMany().HasForeignKey(e => e.SenderId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Post>(entity => {
            entity.HasKey(e => e.PostId);
            entity.Property(e => e.Title).HasMaxLength(255).IsRequired();
            entity.Property(e => e.Slug).HasMaxLength(255);
            entity.HasOne(e => e.Author).WithMany().HasForeignKey(e => e.AuthorId).OnDelete(DeleteBehavior.Restrict);
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        modelBuilder.Entity<Comment>(entity => {
            entity.HasKey(e => e.CommentId);
            entity.HasOne(e => e.Post).WithMany(p => p.Comments).HasForeignKey(e => e.PostId);
            entity.HasOne(e => e.Author).WithMany().HasForeignKey(e => e.AuthorId).OnDelete(DeleteBehavior.Restrict);
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        modelBuilder.Entity<PostVote>(entity => {
            entity.HasKey(e => e.PostVoteId);
            entity.HasOne(e => e.Post).WithMany(p => p.PostVotes).HasForeignKey(e => e.PostId);
            entity.HasOne(e => e.User).WithMany().HasForeignKey(e => e.UserId).OnDelete(DeleteBehavior.Restrict);
            entity.HasIndex(e => new { e.PostId, e.UserId }).IsUnique();
        });

        modelBuilder.Entity<DirectMessage>(entity => {
            entity.HasKey(e => e.MessageId);
            entity.HasOne(d => d.Sender).WithMany().HasForeignKey(d => d.SenderId).OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.Receiver).WithMany().HasForeignKey(d => d.ReceiverId).OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.Course).WithMany().HasForeignKey(d => d.CourseId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<CommunityChatMessage>(entity => {
            entity.HasKey(e => e.Id);
            entity.ToTable("CommunityChatMessages");
            entity.Property(e => e.Timestamp).HasColumnType("datetime").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<UserLesson>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LessonId });
            entity.ToTable("UserLessons");
            entity.Property(e => e.LastWatchedSecond).HasDefaultValue(0);
            entity.Property(e => e.IsCompleted).HasDefaultValue(false);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime").HasDefaultValueSql("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
            
            entity.HasOne(d => d.User)
                  .WithMany(p => p.UserLessons)
                  .HasForeignKey(d => d.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasOne(d => d.Lesson)
                  .WithMany()
                  .HasForeignKey(d => d.LessonId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
