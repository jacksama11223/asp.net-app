using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Dapper;
using System;
using Microsoft.AspNetCore.SignalR;
using SmartLMS.Data;
using SmartLMS.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace SmartLMS.Web.Controllers;

public class DashboardController : Controller
{
    private readonly IReportingService _reportingService;
    private readonly ISqlService _sqlService;
    private readonly IConfiguration _configuration;
    private readonly IEmailService _emailService;
    private readonly IHubContext<SmartLMS.Web.Hubs.DashboardHub> _hubContext;
    private readonly SmartLMSContext _context;

    public DashboardController(IReportingService reportingService, 
                               ISqlService sqlService, 
                               IConfiguration configuration,
                               IEmailService emailService,
                               IHubContext<SmartLMS.Web.Hubs.DashboardHub> hubContext,
                               SmartLMSContext context)
    {
        _reportingService = reportingService;
        _sqlService = sqlService;
        _configuration = configuration;
        _emailService = emailService;
        _hubContext = hubContext;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> RepairData()
    {
        string studentDefaultHash = BCrypt.Net.BCrypt.HashPassword("123456");

        using var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        await db.OpenAsync();
        using var transaction = await db.BeginTransactionAsync();

        try {
            await db.ExecuteAsync("UPDATE Users SET Role = 'Admin' WHERE Username = 'admin'", null, transaction);
            await db.ExecuteAsync("UPDATE Users SET Role = 'Instructor' WHERE Username LIKE 'gv%'", null, transaction);
            await db.ExecuteAsync("UPDATE Users SET Role = 'Student' WHERE Username LIKE 'sv%'", null, transaction);
            await db.ExecuteAsync("UPDATE Users SET PasswordHash = @Hash WHERE Role = 'Student'", new { Hash = studentDefaultHash }, transaction);
            await db.ExecuteAsync("UPDATE Courses SET Title = @Title, Category = @Cat WHERE CourseId = 1", new { Title = "Lập trình ASP.NET Core Toàn Tập", Cat = "Lập trình Web" }, transaction);
            await db.ExecuteAsync("UPDATE Courses SET Title = @Title, Category = @Cat WHERE CourseId = 2", new { Title = "Trí Tuệ Nhân Tạo (AI) Cơ Bản", Cat = "Trí tuệ nhân tạo (AI)" }, transaction);
            await db.ExecuteAsync("UPDATE Courses SET Title = @Title, Category = 'AI' WHERE CourseId = 4", new { Title = "Machine Learning với Python" }, transaction);
            await db.ExecuteAsync("UPDATE Users SET FullName = @Name WHERE Username = 'gv_nguyen' OR Username = 'sv1'", new { Name = "Nguyễn Văn An" }, transaction);
            await db.ExecuteAsync("UPDATE Users SET FullName = @Name WHERE Username = 'gv_le' OR Username = 'sv2'", new { Name = "Lê Quốc Hùng" }, transaction);
            await db.ExecuteAsync("UPDATE Users SET FullName = @Name WHERE Username = 'sv3'", new { Name = "Sinh viên 3" }, transaction);
            await db.ExecuteAsync("UPDATE Users SET FullName = @Name WHERE Username = 'sv4' OR Username = 'sv5'", new { Name = "Sinh viên 4" }, transaction);
            await db.ExecuteAsync("UPDATE Cohorts SET Name = @Name WHERE CohortId = 1", new { Name = "Lớp Lập trình Cơ bản" }, transaction);

            await db.ExecuteAsync("DELETE FROM ActivityLogs", null, transaction);
            Random rnd = new Random();
            string[] actions = { "Login", "Video Watched", "Quiz Submitted", "Enrolled", "Forum Post" };
            for(int i=0; i<150; i++) {
                var dayOffset = rnd.Next(0, 8);
                await db.ExecuteAsync("INSERT INTO ActivityLogs (UserID, ActionType, Timestamp) VALUES (@Uid, @Act, @Time)", 
                    new { Uid = rnd.Next(1, 10), Act = actions[rnd.Next(actions.Length)], Time = DateTime.Now.AddDays(-dayOffset).AddHours(-rnd.Next(24)) }, transaction);
            }

            await transaction.CommitAsync();
            return Content("System Repaired Successfully (V4.1 - Real Data Hub). Please refresh dashboard.");
        }
        catch (Exception ex) {
            await transaction.RollbackAsync();
            return Content("Repair Failed: " + ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetEngagementChart()
    {
        var data = await _reportingService.GetEngagementChartDataAsync();
        return Json(data);
    }

    [HttpGet]
    public async Task<IActionResult> GetRoleDistribution()
    {
        var data = await _reportingService.GetRoleDistributionAsync();
        return Json(data);
    }

    public IActionResult Index() => View();

    [HttpGet]
    [Route("api/dashboard/stats")]
    public async Task<IActionResult> GetStats()
    {
        var users = await _context.Users.ToListAsync();
        var enrollments = await _context.Enrollments.ToListAsync();
        
        // Doanh thu thực tế từ hệ thống hóa đơn mới
        var totalRevenue = await _context.Invoices
            .Where(i => i.Status == "Paid")
            .SumAsync(i => i.Amount);

        var avgProgress = enrollments.Any() ? enrollments.Average(e => e.Progress) : 0;
        var dropoutRiskCount = enrollments.Count(e => e.Progress != null && e.Progress < 20);
        
        return Json(new {
            totalStudents = users.Count(u => u.UserType == 1), // Student
            avgCompletionRate = Math.Round(avgProgress ?? 0, 1),
            dropoutRiskRate = enrollments.Any() ? Math.Round((double)dropoutRiskCount / enrollments.Count() * 100, 1) : 0,
            totalRevenue = totalRevenue
        });
    }

    [HttpGet]
    [Route("api/dashboard/engagement-chart")]
    public async Task<IActionResult> GetEngagementChart()
    {
        var data = await _reportingService.GetEngagementChartDataAsync();
        return Json(data);
    }

    [HttpGet]
    [Route("api/dashboard/activities")]
    public async Task<IActionResult> GetActivities()
    {
        var activities = await _reportingService.GetRecentActivitiesAsync(10);
        return Json(activities);
    }
}
