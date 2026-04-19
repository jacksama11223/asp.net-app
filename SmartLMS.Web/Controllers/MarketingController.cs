using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Business;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

[Authorize(Roles = "Admin")]
public class MarketingController : Controller
{
    private readonly SmartLMSContext _context;

    public MarketingController(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> CertificateManager()
    {
        // Lấy danh sách học viên có tiến độ cao hoặc đã được cấp chứng chỉ (Giả lập qua Enrollment)
        var certs = await _context.Enrollments
            .Include(e => e.User)
            .Include(e => e.Course)
            .Where(e => e.Progress >= 80)
            .Select(e => new {
                e.UserId,
                e.User.FullName,
                e.User.Username,
                e.CourseId,
                e.Course.Title,
                EnrolledDate = e.LastAccessDate,
                IsIssued = e.Progress == 100 // Tạm thời giả lập trạng thái đã cấp
            })
            .ToListAsync();

        return View(certs);
    }

    [HttpGet]
    public async Task<IActionResult> PreviewPdf(int userId, int courseId)
    {
        // Gọi service để sinh lại link hoặc lấy link cũ
        // Đây là tính năng dành cho Admin để kiểm tra phôi chứng chỉ
        var certService = HttpContext.RequestServices.GetRequiredService<ICertificateService>();
        var url = await certService.GenerateCertificateAsync(userId, courseId, DateTime.Now);
        
        return Json(new { success = true, url = url });
    }
}
