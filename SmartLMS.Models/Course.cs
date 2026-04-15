using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public partial class Course
{
    public int CourseId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Category { get; set; }

    public double? BaseSalaryImpact { get; set; }

    public int? InstructorId { get; set; }
    public string? ThumbnailUrl { get; set; }
    public decimal? Price { get; set; }
    public string? Status { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public virtual User? Instructor { get; set; }
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public virtual ICollection<CourseModule> CourseModules { get; set; } = new List<CourseModule>();
}
