using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Linq;
using System.Threading.Tasks;
using OfficeOpenXml;
using System;

namespace SmartLMS.Web.Controllers;

public class RevenueController : Controller
{
    private readonly SmartLMSContext _context;

    public RevenueController(SmartLMSContext context)
    {
        _context = context;
        // Fix for EPPlus 8.0 License Exception
        ExcelPackage.License.SetNonCommercialPersonal("SmartLMS Admin");
    }

    public async Task<IActionResult> Index()
    {
        var enrollments = await _context.Enrollments.Include(e => e.Course).ToListAsync();
        
        var totalRevenue = enrollments.Sum(e => e.Course?.Price ?? 0);
        var todayRevenue = enrollments
            .Where(e => (e.LastAccessDate ?? DateTime.Now).Date == DateTime.Today)
            .Sum(e => e.Course?.Price ?? 0);

        ViewBag.TotalRevenue = totalRevenue;
        ViewBag.TodayRevenue = todayRevenue;

        return View();
    }

    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Audit()
    {
        var invoices = await _context.Set<Invoice>()
            .Include(i => i.User)
            .OrderByDescending(i => i.CreatedAt)
            .ToListAsync();
        
        return View(invoices);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ManualConfirm(int invoiceId)
    {
        var invoice = await _context.Set<Invoice>().FindAsync(invoiceId);
        if (invoice == null || invoice.Status == "Success") return BadRequest();

        // Giả lập logic ghi danh thủ công từ admin
        invoice.Status = "Success";
        invoice.PaidAt = DateTime.Now;

        // Nếu chưa có enrollment, tạo mới
        var hasEnroll = await _context.Enrollments.AnyAsync(e => e.UserId == invoice.UserId && e.CourseId == invoice.CourseId);
        if (!hasEnroll)
        {
            _context.Enrollments.Add(new Enrollment {
                UserId = invoice.UserId,
                CourseId = invoice.CourseId,
                LastAccessDate = DateTime.Now
            });
        }

        await _context.SaveChangesAsync();
        return Json(new { success = true, message = "Đã xác nhận thủ công và ghi danh học viên." });
    }

    [HttpGet]
    public async Task<IActionResult> GetRevenueJson()
    {
        var enrollments = await _context.Enrollments.Include(e => e.Course).ToListAsync();
        
        var data = enrollments
            .GroupBy(e => (e.LastAccessDate ?? DateTime.Now).Date)
            .Select(g => new {
                date = g.Key.ToString("dd/MM"),
                total = (double)g.Sum(x => x.Course?.Price ?? 0)
            })
            .OrderBy(x => x.date)
            .ToList();

        return Json(data);
    }

    public async Task<IActionResult> ExportExcel()
    {
        var enrollments = await _context.Enrollments
            .Include(e => e.Course)
            .Include(e => e.User)
            .OrderByDescending(e => e.LastAccessDate)
            .ToListAsync();

        using (var package = new ExcelPackage())
        {
            var sheet = package.Workbook.Worksheets.Add("BaoCaoDoanhThu");
            sheet.Cells[1, 1].Value = "Học viên";
            sheet.Cells[1, 2].Value = "Khóa học";
            sheet.Cells[1, 3].Value = "Giá tiền";
            sheet.Cells[1, 4].Value = "Ngày đăng ký";

            int row = 2;
            foreach (var item in enrollments)
            {
                sheet.Cells[row, 1].Value = item.User?.FullName ?? "N/A";
                sheet.Cells[row, 2].Value = item.Course?.Title ?? "N/A";
                sheet.Cells[row, 3].Value = item.Course?.Price ?? 0;
                sheet.Cells[row, 4].Value = (item.LastAccessDate ?? DateTime.Now).ToString("dd/MM/yyyy HH:mm");
                row++;
            }

            var stream = new System.IO.MemoryStream();
            package.SaveAs(stream);
            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"RevenueReport_{DateTime.Now:yyyyMMdd}.xlsx");
        }
    }
}
