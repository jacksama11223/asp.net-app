using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class Organization
{
    public int OrganizationId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Domain { get; set; } // Dùng cho SSO auto-redirect
    public string RateLimitTier { get; set; } = "Standard"; // Standard, VIP
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public virtual ICollection<ApiKey> ApiKeys { get; set; } = new List<ApiKey>();
    public virtual ICollection<Webhook> Webhooks { get; set; } = new List<Webhook>();
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
