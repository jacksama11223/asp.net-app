using System;

namespace SmartLMS.Models;

public class UserBadge
{
    public int UserBadgeId { get; set; }
    public int UserId { get; set; }
    public int BadgeId { get; set; }
    public DateTime EarnedDate { get; set; } = DateTime.Now;
    
    public virtual User User { get; set; } = null!;
    public virtual Badge Badge { get; set; } = null!;
}
