using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Community.Controllers;

[Authorize]
[Route("admin")]
public class AdminController : Controller
{
    private readonly SmartLMSContext _db;

    public AdminController(SmartLMSContext db)
    {
        _db = db;
    }

    private bool IsAdmin()
    {
        var role = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.Role)?.Value;
        return role == "Admin" || role == "Moderator";
    }

    [HttpGet("moderation")]
    public async Task<IActionResult> Moderation()
    {
        if (!IsAdmin()) return Forbid();

        // Lấy danh sách các bài viết ĐANG CHỜ DUYỆT (IsPublished = false, IsDeleted = false)
        var pendingPosts = await _db.Posts
            .Include(p => p.Author)
            .Where(p => p.IsPublished == false && p.IsDeleted == false)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        ViewBag.PendingCount = pendingPosts.Count;
        return View(pendingPosts);
    }

    [HttpPost("approve/{id}")]
    public async Task<IActionResult> ApprovePost(int id)
    {
        if (!IsAdmin()) return Forbid();

        var post = await _db.Posts.FindAsync(id);
        if (post != null)
        {
            post.IsPublished = true;
            await _db.SaveChangesAsync();
            TempData["SuccessMessage"] = "Đã duyệt bài viết thành công!";
        }
        return RedirectToAction("Moderation");
    }

    [HttpPost("reject/{id}")]
    public async Task<IActionResult> RejectPost(int id)
    {
        if (!IsAdmin()) return Forbid();

        var post = await _db.Posts.FindAsync(id);
        if (post != null)
        {
            post.IsDeleted = true; // Đánh dấu xóa mềm
            await _db.SaveChangesAsync();
            TempData["SuccessMessage"] = "Đã từ chối và ẩn bài viết!";
        }
        return RedirectToAction("Moderation");
    }
}
