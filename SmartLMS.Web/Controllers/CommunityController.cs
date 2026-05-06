using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Threading.Tasks;
using System.Linq;

namespace SmartLMS.Web.Controllers;

public class CommunityController : Controller
{
    private readonly SmartLMSContext _context;

    public CommunityController(SmartLMSContext context)
    {
        _context = context;
    }

    // Trang chủ cộng đồng: Danh sách bài viết
    public async Task<IActionResult> Index(string category = null)
    {
        var query = _context.Posts
            .Include(p => p.Author)
            .Where(p => p.IsPublished)
            .OrderByDescending(p => p.CreatedAt)
            .AsQueryable();

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p => p.Category == category);
        }

        var posts = await query.ToListAsync();
        return View(posts);
    }

    // Chi tiết bài viết
    public async Task<IActionResult> Details(string slug)
    {
        if (string.IsNullOrEmpty(slug)) return NotFound();

        var post = await _context.Posts
            .Include(p => p.Author)
            .Include(p => p.Comments).ThenInclude(c => c.Author)
            .FirstOrDefaultAsync(p => p.Slug == slug);

        if (post == null) return NotFound();

        // Tăng lượt xem
        post.ViewCount++;
        await _context.SaveChangesAsync();

        return View(post);
    }
}
