using System;

namespace SmartLMS.Models;

public class RolePermission
{
    public int RolePermissionId { get; set; }
    public string RoleName { get; set; } = string.Empty; // e.g., "Admin", "Instructor"
    public int PermissionId { get; set; }
    
    public virtual Permission Permission { get; set; } = null!;
}
