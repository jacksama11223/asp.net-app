using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;

namespace SmartLMS.Web.Controllers;

[Authorize(Roles = "Admin")]
public class MarketingController : Controller
{
    private readonly SmartLMSContext _context;

    public MarketingController(SmartLMSContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<IActionResult> Designer(int courseId)
    {
        var course = await _context.Courses.FindAsync(courseId);
        if (course == null) return NotFound();
        return View(course);
    }

    [HttpPost]
    public async Task<IActionResult> SaveDesign(int courseId, string configJson)
    {
        var course = await _context.Courses.FindAsync(courseId);
        if (course != null)
        {
            course.CertificateConfigJson = configJson;
            await _context.SaveChangesAsync();
            return Json(new { success = true });
        }
        return Json(new { success = false });
    }
}
