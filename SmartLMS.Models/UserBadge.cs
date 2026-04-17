using System;

namespace SmartLMS.Models;

public class UserBadge
{
    public int UserBadgeId { get; set; }
    public int UserId { get; set; }
    public string BadgeName { get; set; } = string.Empty;
    public string BadgeIcon { get; set; } = string.Empty;
    public DateTime EarnedDate { get; set; } = DateTime.Now;
    
    public virtual User User { get; set; } = null!;
}
