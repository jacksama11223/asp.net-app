using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

public class DashboardController : Controller
{
    private readonly IReportingService _reportingService;

    public DashboardController(IReportingService reportingService)
    {
        _reportingService = reportingService;
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
