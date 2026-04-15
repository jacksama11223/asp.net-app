using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public partial class Course
{
    public int CourseId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Category { get; set; }

    /// <summary>Chỉ số ảnh hưởng lương cơ bản (dùng cho AI legacy).</summary>
    public double? BaseSalaryImpact { get; set; }

    public int? InstructorId { get; set; }
    public string? ThumbnailUrl { get; set; }
    public decimal? Price { get; set; }

    /// <summary>Draft = 0 | Published = 1 | Archived = 2</summary>
    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    /// <summary>Soft Delete – true = đã xóa, KHÔNG dùng DELETE thực sự.</summary>
    public bool IsDeleted { get; set; } = false;

    /// <summary>Mức lương dự kiến khóa học mang lại – dùng cho UC-07 Dự báo thu nhập.</summary>
    public decimal AI_BaseSalaryImpact { get; set; } = 0;

    public virtual User? Instructor { get; set; }
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public virtual ICollection<CourseModule> CourseModules { get; set; } = new List<CourseModule>();
}
