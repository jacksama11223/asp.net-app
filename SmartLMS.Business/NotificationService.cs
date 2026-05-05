using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class NotificationService : INotificationService
{
    private readonly IHubContext<ISmartLmsHub> _hubContext;

    // Lưu ý: DashboardHub trong Web project sẽ cần kế thừa Hub<ISmartLmsHub>
    public NotificationService(IHubContext<ISmartLmsHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task NotifyAdminAsync(string title, string message, string type = "Info")
    {
        // Gửi tới group "Admins" (cần join group lúc connect)
        await _hubContext.Clients.Group("Admins").ReceiveNotification(title, message, type);
    }

    public async Task NotifyUserAsync(int userId, string title, string message, string type = "Info")
    {
        // Gửi tới user cụ thể (SignalR dùng UserId làm định danh mặc định)
        await _hubContext.Clients.User(userId.ToString()).ReceiveNotification(title, message, type);
    }

    public async Task BroadcastAsync(string title, string message, string type = "Info")
    {
        // Gửi tới tất cả mọi người đang online
        await _hubContext.Clients.All.ReceiveNotification(title, message, type);
    }
}
