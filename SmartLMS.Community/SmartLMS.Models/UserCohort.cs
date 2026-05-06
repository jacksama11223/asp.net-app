using System;

namespace SmartLMS.Models;

public class UserCohort
{
    public int UserCohortId { get; set; }
    public int UserId { get; set; }
    public int CohortId { get; set; }
    public DateTime JoinedAt { get; set; } = DateTime.Now;

    public virtual User? User { get; set; }
    public virtual Cohort? Cohort { get; set; }
}
