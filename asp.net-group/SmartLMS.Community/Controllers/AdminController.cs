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

        var pendingPosts = await _db.Posts
            .Include(p => p.Author)
            .Where(p => p.IsPublished == false && p.IsDeleted == false)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        var pendingEvents = await _db.CommunityEvents
            .Where(e => e.IsApproved == false)
            .OrderByDescending(e => e.CreatedAt)
            .ToListAsync();

        var pendingQuestions = await _db.CommunityQuestions
            .Include(q => q.Author)
            .Where(q => q.IsApproved == false)
            .OrderByDescending(q => q.CreatedAt)
            .ToListAsync();

        var pendingGroups = await _db.StudyGroups
            .Include(g => g.Leader)
            .Where(g => g.IsApproved == false)
            .OrderByDescending(g => g.CreatedAt)
            .ToListAsync();

        ViewBag.PendingCount = pendingPosts.Count + pendingEvents.Count + pendingQuestions.Count + pendingGroups.Count;
        ViewBag.PendingEvents = pendingEvents;
        ViewBag.PendingQuestions = pendingQuestions;
        ViewBag.PendingGroups = pendingGroups;

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

    [HttpPost("approve-item")]
    public async Task<IActionResult> ApproveItem(string type, int id)
    {
        if (!IsAdmin()) return Forbid();

        if (type == "event")
        {
            var evt = await _db.CommunityEvents.FindAsync(id);
            if (evt != null) evt.IsApproved = true;
        }
        else if (type == "question")
        {
            var q = await _db.CommunityQuestions.FindAsync(id);
            if (q != null) q.IsApproved = true;
        }
        else if (type == "group")
        {
            var g = await _db.StudyGroups.FindAsync(id);
            if (g != null) g.IsApproved = true;
        }

        await _db.SaveChangesAsync();
        TempData["SuccessMessage"] = $"Đã duyệt {type} thành công!";
        return RedirectToAction("Moderation");
    }

    [HttpPost("reject-item")]
    public async Task<IActionResult> RejectItem(string type, int id)
    {
        if (!IsAdmin()) return Forbid();

        if (type == "event")
        {
            var evt = await _db.CommunityEvents.FindAsync(id);
            if (evt != null) _db.CommunityEvents.Remove(evt); // Xóa cứng cho đơn giản
        }
        else if (type == "question")
        {
            var q = await _db.CommunityQuestions.FindAsync(id);
            if (q != null) _db.CommunityQuestions.Remove(q);
        }
        else if (type == "group")
        {
            var g = await _db.StudyGroups.FindAsync(id);
            if (g != null) _db.StudyGroups.Remove(g);
        }

        await _db.SaveChangesAsync();
        TempData["SuccessMessage"] = $"Đã từ chối và xóa {type}!";
        return RedirectToAction("Moderation");
    }
}
