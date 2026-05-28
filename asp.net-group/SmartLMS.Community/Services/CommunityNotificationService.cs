using Microsoft.AspNetCore.SignalR;
using SmartLMS.Business;
using SmartLMS.Community.Hubs;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Community.Services;

public class CommunityNotificationService : INotificationService
{
    private readonly IHubContext<CommunityHub> _hubContext;
    private readonly SmartLMSContext _db;

    public CommunityNotificationService(IHubContext<CommunityHub> hubContext, SmartLMSContext db)
    {
        _hubContext = hubContext;
        _db = db;
    }

    public async Task NotifyAdminAsync(string title, string message, string type = "Info", string link = null)
    {
        await _hubContext.Clients.Group("Admins").SendAsync("ReceiveNotification", title, message, type, link);
    }

    public async Task NotifyUserAsync(int userId, string title, string message, string type = "Info", string link = null)
    {
        var notification = new Notification
        {
            UserId = userId,
            Title = title,
            Message = message,
            Type = type,
            Link = link,
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        };
        _db.Notifications.Add(notification);
        await _db.SaveChangesAsync();

        await _hubContext.Clients.User(userId.ToString()).SendAsync("ReceiveNotification", new 
        { 
            id = notification.NotificationId,
            title = title, 
            message = message, 
            type = type,
            link = link,
            createdAt = notification.CreatedAt
        });
    }

    public async Task BroadcastAsync(string title, string message, string type = "Info", string link = null)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveNotification", title, message, type, link);
    }
}
