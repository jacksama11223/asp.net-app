using System;

namespace SmartLMS.Models;

public class Repost
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int OriginalPostId { get; set; }
    public Post? OriginalPost { get; set; }
    public string? CustomComment { get; set; }
    public DateTime RepostedAt { get; set; } = DateTime.UtcNow;
}

public class UserBadge
{
    public int BadgeId { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public string BadgeName { get; set; } = string.Empty; // Top Mentor, Fast Learner, Code Ninja
    public string BadgeIcon { get; set; } = string.Empty;
    public DateTime EarnedDate { get; set; } = DateTime.UtcNow;
}

public class UserActivityPoint
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int Points { get; set; }
    public string ActivityType { get; set; } = string.Empty; // Post, Comment, RSVP, BestAnswer
    public DateTime LoggedAt { get; set; } = DateTime.UtcNow;
}
