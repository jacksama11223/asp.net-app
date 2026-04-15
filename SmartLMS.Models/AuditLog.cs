using System;

namespace SmartLMS.Models;

public class AuditLog
{
    public int AuditId { get; set; }
    public int? UserId { get; set; }
    public string? ActionType { get; set; } // POST, PUT, DELETE
    public string? ControllerName { get; set; }
    public string? ActionName { get; set; }
    public string? Parameters { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.Now;
}
