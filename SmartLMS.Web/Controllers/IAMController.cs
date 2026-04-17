using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

[Authorize(Roles = "Admin")]
public class IAMController : Controller
{
    private readonly SmartLMSContext _context;

    public IAMController(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var logs = await _context.AuditLogs
            .OrderByDescending(x => x.Timestamp)
            .Take(100)
            .ToListAsync();
        return View(logs);
    }

    public async Task<IActionResult> Permissions()
    {
        var permissions = await _context.Permissions.ToListAsync();
        var roles = new List<string> { "Admin", "Instructor", "Student" };
        var rolePermissions = await _context.RolePermissions.ToListAsync();

        ViewBag.Roles = roles;
        ViewBag.RolePermissions = rolePermissions;

        return View(permissions);
    }

    [HttpPost]
    public async Task<IActionResult> UpdatePermission(string role, int permissionId, bool granted)
    {
        var existing = await _context.RolePermissions
            .FirstOrDefaultAsync(x => x.RoleName == role && x.PermissionId == permissionId);

        if (granted && existing == null)
        {
            _context.RolePermissions.Add(new RolePermission { RoleName = role, PermissionId = permissionId });
        }
        else if (!granted && existing != null)
        {
            _context.RolePermissions.Remove(existing);
        }

        await _context.SaveChangesAsync();
        return Json(new { success = true });
    }
}
