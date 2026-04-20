using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SmartLMS.Business;

namespace SmartLMS.Web.Controllers;

[Authorize(Roles = "Admin")]
public class IAMController : Controller
{
    private readonly SmartLMSContext _context;

    // Constructor duy nhất cho Enterprise IAM
    public IAMController(SmartLMSContext context, IApiKeyService apiKeyService)
    {
        _context = context;
        _apiKeyService = apiKeyService;
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

    // --- API KEY MANAGEMENT (PHASE 4) ---
    private readonly IApiKeyService _apiKeyService;

    public async Task<IActionResult> ApiKeys()
    {
        // Giả sử OrganizationId của System Root là 1, lấy từ User hiện tại sau này
        string currentUserName = User.Identity?.Name ?? "";
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == currentUserName);
        int orgId = user?.OrganizationId ?? 1;

        var keys = await _apiKeyService.GetOrganizationKeysAsync(orgId);
        return View(keys);
    }

    [HttpPost]
    public async Task<IActionResult> GenerateApiKey(string name)
    {
        string currentUserName = User.Identity?.Name ?? "";
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == currentUserName);
        int orgId = user?.OrganizationId ?? 1;

        var (rawKey, _) = await _apiKeyService.GenerateKeyAsync(orgId, name);
        
        TempData["NewRawKey"] = rawKey; // Chỉ hiển thị 1 lần duy nhất
        return RedirectToAction(nameof(ApiKeys));
    }

    [HttpPost]
    public async Task<IActionResult> RevokeApiKey(int id)
    {
        await _apiKeyService.RevokeKeyAsync(id);
        return RedirectToAction(nameof(ApiKeys));
    }
}
