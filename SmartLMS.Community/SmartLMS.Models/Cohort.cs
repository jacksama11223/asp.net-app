using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class Cohort
{
    public int CohortId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public bool IsDeleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public virtual ICollection<UserCohort> UserCohorts { get; set; } = new List<UserCohort>();
}
