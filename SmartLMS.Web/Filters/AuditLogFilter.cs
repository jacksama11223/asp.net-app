using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Linq;

namespace SmartLMS.Web.Filters;

public class AuditLogFilter : IActionFilter
{
    private readonly ILogger<AuditLogFilter> _logger;
    private readonly SmartLMS.Data.SmartLMSContext _context;

    public AuditLogFilter(ILogger<AuditLogFilter> logger, SmartLMS.Data.SmartLMSContext context)
    {
        _logger = logger;
        _context = context;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Hệ thống sẽ bắt đầu ghi log trước khi Action chạy
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Sau khi Admin hoàn tất một Request thành công (Không áp dụng cho GET, chỉ bắt thay đổi dữ liệu POST/PUT/DELETE)
        if (context.HttpContext.Request.Method != "GET" && context.Exception == null)
        {
            var user = context.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value ?? "System_Or_Unknown";
            var actionName = context.ActionDescriptor.DisplayName;
            var path = context.HttpContext.Request.Path;
            var method = context.HttpContext.Request.Method;

            // Ghi log vào Database
            try {
                var userIdStr = context.HttpContext.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                int? userId = int.TryParse(userIdStr, out int id) ? id : null;

                var audit = new SmartLMS.Models.AuditLog {
                    UserId = userId,
                    ActionType = method,
                    ControllerName = context.RouteData.Values["controller"]?.ToString(),
                    ActionName = context.RouteData.Values["action"]?.ToString(),
                    // Parameters = JsonSerializer.Serialize(...), // ActionArguments not available in ExecutedContext
                    Timestamp = DateTime.Now
                };

                _context.AuditLogs.Add(audit);
                _context.SaveChanges();
            } catch (System.Exception ex) {
                _logger.LogError(ex, "Error saving Audit Log");
            }

            _logger.LogInformation("🛡️ [IAM AUDIT TRAIL] User '{User}' executed {Method} on {Path}. Context: {Action}", 
                user, method, path, actionName);
        }
    }
}
