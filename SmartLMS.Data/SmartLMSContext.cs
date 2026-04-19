using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Models;

namespace SmartLMS.Data;

public partial class SmartLMSContext : DbContext
{
    public SmartLMSContext()
    {
    }

    public SmartLMSContext(DbContextOptions<SmartLMSContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ActivityLog> ActivityLogs { get; set; }

    public virtual DbSet<Course> Courses { get; set; }
    public virtual DbSet<CourseModule> CourseModules { get; set; }

    public virtual DbSet<Enrollment> Enrollments { get; set; }
    public virtual DbSet<Lesson> Lessons { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Cohort> Cohorts { get; set; }
    public virtual DbSet<UserCohort> UserCohorts { get; set; }
    public virtual DbSet<Coupon> Coupons { get; set; }
    public virtual DbSet<AuditLog> AuditLogs { get; set; }
    public virtual DbSet<Permission> Permissions { get; set; }
    public virtual DbSet<RolePermission> RolePermissions { get; set; }
    public virtual DbSet<Question> Questions { get; set; }
    public virtual DbSet<UserBadge> UserBadges { get; set; }
    public virtual DbSet<CommissionRate> CommissionRates { get; set; }
    public virtual DbSet<Badge> Badges { get; set; }
    public virtual DbSet<Exam> Exams { get; set; }
    public virtual DbSet<ExamQuestion> ExamQuestions { get; set; }
    public virtual DbSet<QuizAttempt> QuizAttempts { get; set; }
    public virtual DbSet<Webhook> Webhooks { get; set; }
    public virtual DbSet<Invoice> Invoices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cohort>(entity => {
            entity.HasKey(e => e.CohortId);
            entity.Property(e => e.Name).HasMaxLength(150).IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnType("datetime").HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<UserCohort>(entity => {
            entity.HasKey(e => e.UserCohortId);
            entity.HasOne(d => d.User).WithMany(p => p.UserCohorts).HasForeignKey(d => d.UserId);
            entity.HasOne(d => d.Cohort).WithMany(p => p.UserCohorts).HasForeignKey(d => d.CohortId);
        });

        modelBuilder.Entity<AuditLog>(entity => {
            entity.HasKey(e => e.AuditId);
            entity.Property(e => e.Timestamp).HasColumnType("datetime").HasDefaultValueSql("(getdate())");
            
            // Index cho UserId và Timestamp để tăng tốc độ xem Audit Log
            entity.HasIndex(e => new { e.UserId, e.Timestamp });
        });
        modelBuilder.Entity<ActivityLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PK__Activity__5E5499A8AC2913CB");

            // Index cho UserId và Timestamp để tăng tốc độ xem lịch sử hoạt động
            entity.HasIndex(e => new { e.UserId, e.Timestamp });

            entity.Property(e => e.LogId).HasColumnName("LogID");
            entity.Property(e => e.ActionType).HasMaxLength(50);
            entity.Property(e => e.DurationSeconds).HasDefaultValue(0);
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.ActivityLogs)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__ActivityL__UserI__59063A47");
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
            entity.Property(e => e.CreatedAt).HasColumnType("datetime").HasDefaultValueSql("(getdate())");
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime").HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);
            entity.Property(e => e.MetaTitle).HasMaxLength(200);
            entity.Property(e => e.IsFree).HasDefaultValue(false);
            entity.Property(e => e.DiscountPrice).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.AI_BaseSalaryImpact)
                .HasColumnName("AI_BaseSalaryImpact")
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0m);

            // Global query filter: always hide soft-deleted courses
            entity.HasQueryFilter(e => !e.IsDeleted);

            entity.HasOne(d => d.Instructor).WithMany(p => p.Courses)
                .HasForeignKey(d => d.InstructorId)
                .HasConstraintName("FK_Courses_Users");
        });

        modelBuilder.Entity<Coupon>(entity =>
        {
            entity.HasKey(e => e.CouponId);
            entity.ToTable("Coupons");
            entity.Property(e => e.Code).HasMaxLength(50).IsRequired();
            entity.Property(e => e.DiscountAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.DiscountType).HasMaxLength(20).HasDefaultValue("Fixed");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime").HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<CourseModule>(entity =>
        {
            entity.HasKey(e => e.ModuleId);
            entity.ToTable("CourseModules");

            entity.Property(e => e.ModuleId).HasColumnName("ModuleID");
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.Title).HasMaxLength(150);
            entity.Property(e => e.OrderIndex).HasDefaultValue(0);

            entity.HasOne(d => d.Course).WithMany(p => p.CourseModules)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_CourseModules_Courses");
            
            // Global query filter
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

            entity.HasOne(d => d.Module).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.ModuleId)
                .HasConstraintName("FK_Lessons_CourseModules");

            // Global query filter
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

            // Composite Index cho UserId và CourseId để tăng tốc độ check trạng thái enroll
            entity.HasIndex(e => new { e.UserId, e.CourseId });

            entity.HasOne(d => d.Course).WithMany(p => p.Enrollments)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__Enrollmen__Cours__52593CB8");

            entity.HasOne(d => d.User).WithMany(p => p.Enrollments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Enrollmen__UserI__5165187F");

            // Global query filter for Course soft delete
            entity.HasQueryFilter(e => !e.Course.IsDeleted);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCACC0BF0FD7");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E429ECC54B").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Role).HasMaxLength(20);
            entity.Property(e => e.Username).HasMaxLength(50);
            entity.Property(e => e.TotalXP).HasDefaultValue(0);
            entity.Property(e => e.HierarchyLevel).HasDefaultValue(3); // Default: Staff
            entity.Property(e => e.DepartmentId).IsRequired(false);
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
            entity.Property(e => e.DepartmentId).IsRequired(false);
            entity.HasOne(d => d.Course)
                  .WithMany(p => p.Questions)
                  .HasForeignKey(d => d.CourseId);

            // Global query filter for Course soft delete
            entity.HasQueryFilter(e => !e.Course.IsDeleted);
        });

        modelBuilder.Entity<UserBadge>(entity => {
            entity.HasKey(e => e.UserBadgeId);
            entity.HasOne(d => d.User).WithMany(p => p.UserBadges).HasForeignKey(d => d.UserId);
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
            entity.Property(e => e.DepartmentId).IsRequired(false);
            entity.HasOne(d => d.Course)
                  .WithMany() // Nếu Course chưa có ICollection<Exam>, để trống hoặc thêm vào Course.cs
                  .HasForeignKey(d => d.CourseId);

            // Global query filter for Course soft delete
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
            
            // Index giúp tìm hóa đơn cực nhanh khi VNPay Webhook gọi về
            entity.HasIndex(e => e.TransactionReference).IsUnique();
            
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
            entity.HasOne(d => d.Course).WithMany().HasForeignKey(d => d.CourseId);

            // Global query filter for Course soft delete
            entity.HasQueryFilter(e => !e.Course.IsDeleted);
        });

        modelBuilder.Entity<Webhook>(entity => {
            entity.HasKey(e => e.WebhookId);
            entity.Property(e => e.TargetUrl).IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnType("datetime").HasDefaultValueSql("(getdate())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
