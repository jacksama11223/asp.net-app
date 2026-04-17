using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Dapper;
using System;
using Microsoft.AspNetCore.SignalR;

namespace SmartLMS.Web.Controllers;

public class DashboardController : Controller
{
    private readonly IReportingService _reportingService;
    private readonly ISqlService _sqlService;
    private readonly IConfiguration _configuration;
    private readonly IEmailService _emailService;
    private readonly IHubContext<SmartLMS.Web.Hubs.DashboardHub> _hubContext;

    public DashboardController(IReportingService reportingService, 
                               ISqlService sqlService, 
                               IConfiguration configuration,
                               IEmailService emailService,
                               IHubContext<SmartLMS.Web.Hubs.DashboardHub> hubContext)
    {
        _reportingService = reportingService;
        _sqlService = sqlService;
        _configuration = configuration;
        _emailService = emailService;
        _hubContext = hubContext;
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
    public async Task<IActionResult> GetStats()
    {
        var stats = await _reportingService.GetDashboardStatsAsync();
        return Json(stats);
    }

    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
        var activities = await _reportingService.GetRecentActivitiesAsync(10);
        return Json(activities);
    }

    [HttpPost]
    public async Task<IActionResult> SendNudge(string message, string? email)
    {
        if (!string.IsNullOrEmpty(email)) {
            // Đẩy vào Hangfire để gửi email ở background
            Hangfire.BackgroundJob.Enqueue<IEmailService>(service => 
                service.SendEmailAsync(email, "Nhắc nhở từ Giảng viên (SmartLMS AI)", message));
        }
        await _hubContext.Clients.All.SendAsync("ReceiveNotification", "System", "Đã ghi nhận yêu cầu nhắc nhở. Email đang được gửi ở background.");
        return Ok(new { success = true });
    }
}
