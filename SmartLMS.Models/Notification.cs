using System;

namespace SmartLMS.Models;

public class Notification
{
    public int NotificationId { get; set; }
    public int UserId { get; set; }
    public virtual User? User { get; set; }
    
    public string Title { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string? Link { get; set; } // Đường dẫn điều hướng khi click
    
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public string Type { get; set; } = "General"; // System, Community, Assignment, Achievement
}
