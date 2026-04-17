using System;

namespace SmartLMS.Models;

public class Webhook
{
    public int WebhookId { get; set; }
    public string TargetUrl { get; set; } = string.Empty;
    public string EventType { get; set; } = "BadgeEarned"; // Default event
    public bool IsActive { get; set; } = true;
    public string? Secret { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
