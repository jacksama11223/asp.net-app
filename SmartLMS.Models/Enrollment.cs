using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public partial class Enrollment
{
    public int EnrollmentId { get; set; }

    public int? UserId { get; set; }

    public int? CourseId { get; set; }

    public double? Progress { get; set; }

    public double? AvgScore { get; set; }

    public DateTime? LastAccessDate { get; set; }

    public bool? IsCompleted { get; set; }

    public bool? IsDropout { get; set; }

    public virtual Course? Course { get; set; }

    public virtual User? User { get; set; }
}
