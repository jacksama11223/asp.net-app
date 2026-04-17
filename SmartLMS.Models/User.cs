using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Username { get; set; }

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? Role { get; set; }
    public string? UserType { get; set; }

    public string? PasswordHash { get; set; }

    public int Status { get; set; } // 1: Active, 2: Banned, 0: Pending

    public int LecturerStatus { get; set; } // 0: None, 1: Pending, 2: Approved

    public string? Bio { get; set; }

    public string? KYCDocUrl { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? Hometown { get; set; }

    public int TotalXP { get; set; }

    public virtual ICollection<ActivityLog> ActivityLogs { get; set; } = new List<ActivityLog>();
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public virtual ICollection<UserCohort> UserCohorts { get; set; } = new List<UserCohort>();
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
    public virtual ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
}
