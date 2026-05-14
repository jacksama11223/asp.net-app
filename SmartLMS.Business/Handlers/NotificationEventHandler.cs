using MediatR;
using Microsoft.AspNetCore.SignalR;
using SmartLMS.Business.Events;
using SmartLMS.Web.Hubs;
using System.Threading;
using System.Threading.Tasks;

namespace SmartLMS.Business.Handlers;

public class NotificationEventHandler : INotificationHandler<AssessmentCompletedEvent>
{
    private readonly IEmailService _emailService;
    private readonly IWebhookService _webhookService;
    private readonly IHubContext<GamificationHub> _hubContext;

    public NotificationEventHandler(IEmailService emailService, IWebhookService webhookService, IHubContext<GamificationHub> hubContext)
    {
        _emailService = emailService;
        _webhookService = webhookService;
        _hubContext = hubContext;
    }

    public async Task Handle(AssessmentCompletedEvent notification, CancellationToken cancellationToken)
    {
        // 1. Gửi Email thông báo
        await _emailService.SendEmailAsync("student@example.com", "Chúc mừng hoàn thành bài thi!", $"Bạn đã nhận được {notification.XPEarned} XP.");

        // 2. Bắn SignalR Real-time (Hiện popup pháo hoa trên UI)
        await _hubContext.Clients.User(notification.UserId.ToString()).SendAsync("ReceiveAchievement", new {
            xp = notification.XPEarned,
            message = "Tuyệt vời! Bạn vừa thăng hạng!"
        });

        // 3. Bắn Webhook ra hệ thống bên ngoài (VD: Discord Server của lớp)
        await _webhookService.SendPayloadAsync("https://discord.com/api/webhooks/dummy", new {
            content = $"🚀 Học viên ID {notification.UserId} vừa hoàn thành bài thi với {notification.XPEarned} XP!"
        });
    }
}
