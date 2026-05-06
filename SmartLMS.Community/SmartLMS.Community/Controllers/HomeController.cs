using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;

namespace SmartLMS.Community.Controllers;

public class HomeController : Controller
{
    private readonly SmartLMSContext _context;

    public HomeController(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        // Thử lấy danh sách bài viết từ database trung tâm
        var posts = await _context.Posts
            .Include(p => p.Author)
            .OrderByDescending(p => p.CreatedAt)
            .Take(5)
            .ToListAsync();
            
        return View(posts);
    }
}
