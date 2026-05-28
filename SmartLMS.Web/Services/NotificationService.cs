using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Business;
using SmartLMS.Data;
using SmartLMS.Models;
using SmartLMS.Web.Hubs;
using System;
using System.Threading.Tasks;

namespace SmartLMS.Web.Services;

public class NotificationService : INotificationService
{
    private readonly IHubContext<DashboardHub> _hubContext;
    private readonly SmartLMSContext _db;

    public NotificationService(IHubContext<DashboardHub> hubContext, SmartLMSContext db)
    {
        _hubContext = hubContext;
        _db = db;
    }

    public async Task NotifyAdminAsync(string title, string message, string type = "Info", string link = null)
    {
        // For admin, we might not save to DB unless we want to map to an Admin role, 
        // but for now, just broadcast to the Admins group
        await _hubContext.Clients.Group("Admins").SendAsync("ReceiveNotification", title, message, type, link);
    }

    public async Task NotifyUserAsync(int userId, string title, string message, string type = "Info", string link = null)
    {
        // 1. Lưu vào Database
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

        // 2. Bắn SignalR
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
