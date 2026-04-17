using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class Permission
{
    public int PermissionId { get; set; }
    public string Name { get; set; } = string.Empty; // e.g., "Course.Create"
    public string Description { get; set; } = string.Empty;
    public string Group { get; set; } = string.Empty; // e.g., "CourseManagement"
    
    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
