using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public partial class ActivityLog
{
    public long LogId { get; set; }

    public int? UserId { get; set; }

    public string? ActionType { get; set; }

    public DateTime? Timestamp { get; set; }

    public int? DurationSeconds { get; set; }

    public virtual User? User { get; set; }
}
