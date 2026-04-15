using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Dapper;
using System;

namespace SmartLMS.Web.Controllers;

public class DashboardController : Controller
{
    private readonly IReportingService _reportingService;
    private readonly ISqlService _sqlService;
    private readonly IConfiguration _configuration;

    public DashboardController(IReportingService reportingService, ISqlService sqlService, IConfiguration configuration)
    {
        _reportingService = reportingService;
        _sqlService = sqlService;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> RepairData()
    {
        // 1. Tạo Hash cho mật khẩu 123456
        string studentDefaultHash = BCrypt.Net.BCrypt.HashPassword("123456");

        // 2. Chạy lệnh SQL với tham số để đảm bảo Unicode 100%
        // Sử dụng Dapper để truyền tham số an toàn
        using var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        await db.OpenAsync();
        using var transaction = await db.BeginTransactionAsync();

        try {
            // Sửa lỗi Roles & Passwords
            await db.ExecuteAsync("UPDATE Users SET Role = 'Admin' WHERE Username = 'admin'", null, transaction);
            await db.ExecuteAsync("UPDATE Users SET Role = 'Instructor' WHERE Username LIKE 'gv%'", null, transaction);
            await db.ExecuteAsync("UPDATE Users SET Role = 'Student' WHERE Username LIKE 'sv%'", null, transaction);
            await db.ExecuteAsync("UPDATE Users SET PasswordHash = @Hash WHERE Role = 'Student'", new { Hash = studentDefaultHash }, transaction);

            // Sửa lỗi Courses
            await db.ExecuteAsync("UPDATE Courses SET Title = @Title, Category = @Cat WHERE CourseId = 1", new { Title = "Lập trình ASP.NET Core Toàn Tập", Cat = "Lập trình Web" }, transaction);
            await db.ExecuteAsync("UPDATE Courses SET Title = @Title, Category = @Cat WHERE CourseId = 2", new { Title = "Trí Tuệ Nhân Tạo (AI) Cơ Bản", Cat = "Trí tuệ nhân tạo (AI)" }, transaction);
            await db.ExecuteAsync("UPDATE Courses SET Title = @Title, Category = 'AI' WHERE CourseId = 4", new { Title = "Machine Learning với Python" }, transaction);

            // Sửa lỗi Users (Tên Tiếng Việt)
            await db.ExecuteAsync("UPDATE Users SET FullName = @Name WHERE Username = 'gv_nguyen' OR Username = 'sv1'", new { Name = "Nguyễn Văn An" }, transaction);
            await db.ExecuteAsync("UPDATE Users SET FullName = @Name WHERE Username = 'gv_le' OR Username = 'sv2'", new { Name = "Lê Quốc Hùng" }, transaction);
            await db.ExecuteAsync("UPDATE Users SET FullName = @Name WHERE Username = 'sv3'", new { Name = "Sinh viên 3" }, transaction);
            await db.ExecuteAsync("UPDATE Users SET FullName = @Name WHERE Username = 'sv4' OR Username = 'sv5'", new { Name = "Sinh viên 4" }, transaction);
            
            // Sửa lỗi Cohort
            await db.ExecuteAsync("UPDATE Cohorts SET Name = @Name WHERE CohortId = 1", new { Name = "Lớp Lập trình Cơ bản" }, transaction);

            await transaction.CommitAsync();
            return Content("System Repaired Successfully (V4 - Parameters). Data & Roles are now fixed.");
        }
        catch (Exception ex) {
            await transaction.RollbackAsync();
            return Content("Repair Failed: " + ex.Message);
        }
    }

    // Trang chủ Dashboard
    public IActionResult Index()
    {
        return View();
    }

    // API Endpoint cho AJAX gọi lấy thống kê
    [HttpGet]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _reportingService.GetDashboardStatsAsync();
        return Json(stats);
    }

    // API Endpoint lấy danh sách hoạt động
    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
        var activities = await _reportingService.GetRecentActivitiesAsync(5);
        return Json(activities);
    }

    // API Endpoint giả lập gửi thông báo (AI Nudge)
    [HttpPost]
    public IActionResult SendNudge(string message)
    {
        // Trong thực tế, đây là nơi gọi Service gửi Email hoặc Notification
        return Ok(new { success = true, sentMessage = message });
    }
}
