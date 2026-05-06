using System;

namespace SmartLMS.Models;

public class AuditLog
{
    public int AuditId { get; set; }
    public int? UserId { get; set; }
    public string? ActionType { get; set; } // POST, PUT, DELETE, LOGIN
    public string? EntityName { get; set; } // Table name
    public string? EntityId { get; set; }   // Primary Key
    public string? OldValues { get; set; }  // JSON
    public string? NewValues { get; set; }  // JSON
    public string? ControllerName { get; set; }
    public string? ActionName { get; set; }
    public string? Parameters { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.Now;
}
