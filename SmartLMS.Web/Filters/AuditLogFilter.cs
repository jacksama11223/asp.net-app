using Microsoft.AspNetCore.Mvc.Filters;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Security.Claims;
using System.Text.Json;

namespace SmartLMS.Web.Filters;

public class AuditLogFilter : IActionFilter
{
    private readonly SmartLMSContext _context;

    public AuditLogFilter(SmartLMSContext context)
    {
        _context = context;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Chỉ log các thao tác làm thay đổi dữ liệu (POST, PUT, DELETE)
        if (context.HttpContext.Request.Method == "GET") return;

        try
        {
            var audit = new AuditLog
            {
                UserId = int.TryParse(context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : 0,
                ActionType = context.HttpContext.Request.Method,
                ControllerName = context.RouteData.Values["controller"]?.ToString(),
                ActionName = context.RouteData.Values["action"]?.ToString(),
                Parameters = JsonSerializer.Serialize(context.ActionArguments),
                Timestamp = DateTime.Now
            };

            _context.AuditLogs.Add(audit);
            _context.SaveChanges();
        }
        catch { /* Không làm gián đoạn luồng chính nếu lỗi log */ }
    }

    public void OnActionExecuted(ActionExecutedContext context) { }
}
