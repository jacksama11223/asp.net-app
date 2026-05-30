using Hangfire.Dashboard;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace SmartLMS.Web.Filters
{
    public class HangfireAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext context)
        {
            var httpContext = context.GetHttpContext();

            // Nếu đang chạy local trên chính con VPS (127.0.0.1) thì cho phép
            var isLocal = httpContext.Connection.RemoteIpAddress?.ToString() == "127.0.0.1" || 
                          httpContext.Connection.RemoteIpAddress?.ToString() == "::1";
            
            if (isLocal) return true;

            // Nếu truy cập từ xa, YÊU CẦU user phải đăng nhập và có Role Admin
            if (httpContext.User.Identity?.IsAuthenticated == true && httpContext.User.IsInRole("Admin"))
            {
                return true;
            }

            // Để Debug/Test tạm thời nếu chưa Auth được Cookie qua Nginx:
            // Bỏ comment dòng dưới để mở khóa hoàn toàn (KHÔNG KHUYẾN NGHỊ LÂU DÀI)
            // return true; 

            return false;
        }
    }
}
