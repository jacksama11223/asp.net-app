using System.Collections.Generic;

namespace SmartLMS.Models;

public class AchievementHubViewModel
{
    public User User { get; set; } = null!;
    public List<Badge> Badges { get; set; } = new();
    public int Level { get; set; }
    public double ProgressToNextLevel { get; set; }
    public int XPNeeded { get; set; }
}
