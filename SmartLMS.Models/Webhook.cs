using System;

namespace SmartLMS.Models;

public class Webhook
{
    public int WebhookId { get; set; }
    public string TargetUrl { get; set; } = string.Empty;
    public string EventType { get; set; } = "BadgeEarned"; 
    public bool IsActive { get; set; } = true;
    public string? Secret { get; set; } // Key dùng để ký HMAC
    
    public int? OrganizationId { get; set; }
    public virtual Organization? Organization { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
