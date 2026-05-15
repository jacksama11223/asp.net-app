using MediatR;
using SmartLMS.Business.Events;
using System.Threading;
using System.Threading.Tasks;

namespace SmartLMS.Business.Handlers;

public class NotificationEventHandler : INotificationHandler<AssessmentCompletedEvent>
{
    private readonly IEmailService _emailService;
    private readonly IWebhookService _webhookService;

    public NotificationEventHandler(IEmailService emailService, IWebhookService webhookService)
    {
        _emailService = emailService;
        _webhookService = webhookService;
    }

    public async Task Handle(AssessmentCompletedEvent notification, CancellationToken cancellationToken)
    {
        // 1. Gửi Email thông báo
        await _emailService.SendEmailAsync("student@example.com", "Chúc mừng hoàn thành bài thi!", $"Bạn đã nhận được {notification.XPEarned} XP.");

        // 2. Bắn Webhook ra hệ thống bên ngoài (Discord/Slack)
        await _webhookService.SendPayloadAsync("https://discord.com/api/webhooks/dummy", new {
            content = $"🚀 Học viên ID {notification.UserId} vừa hoàn thành bài thi với {notification.XPEarned} XP!"
        });
        
        // LƯU Ý: Việc đẩy SignalR Real-time sẽ được xử lý bởi WebNotificationHandler tại tầng SmartLMS.Web
        // để đảm bảo tính Modular Monolith (Business không tham chiếu Web).
    }
}
