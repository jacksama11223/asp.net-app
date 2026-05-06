using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class Badge
{
    public int BadgeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Rarity { get; set; } = "Common"; // Common, Rare, Epic, Legendary
    public string? RequirementsJson { get; set; } // IF XP > 100 AND CourseCount > 5

    public virtual ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
}
