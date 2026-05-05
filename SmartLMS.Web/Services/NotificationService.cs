using Microsoft.AspNetCore.SignalR;
using SmartLMS.Business;
using SmartLMS.Web.Hubs;
using System.Threading.Tasks;

namespace SmartLMS.Web.Services;

public class NotificationService : INotificationService
{
    private readonly IHubContext<DashboardHub> _hubContext;

    public NotificationService(IHubContext<DashboardHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task NotifyAdminAsync(string title, string message, string type = "Info")
    {
        await _hubContext.Clients.Group("Admins").SendAsync("ReceiveNotification", title, message, type);
    }

    public async Task NotifyUserAsync(int userId, string title, string message, string type = "Info")
    {
        await _hubContext.Clients.User(userId.ToString()).SendAsync("ReceiveNotification", title, message, type);
    }

    public async Task BroadcastAsync(string title, string message, string type = "Info")
    {
        await _hubContext.Clients.All.SendAsync("ReceiveNotification", title, message, type);
    }
}
