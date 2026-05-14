using SmartLMS.Business.MessageBus;
using SmartLMS.Models;

namespace SmartLMS.Business.Handlers;

public class GamificationEventHandler : INotificationHandler<AssessmentCompletedEvent>
{
    private readonly SmartLMSContext _context;
    private readonly IMessageBus _messageBus;

    public GamificationEventHandler(SmartLMSContext context, IMessageBus messageBus)
    {
        _context = context;
        _messageBus = messageBus;
    }

    public async Task Handle(AssessmentCompletedEvent notification, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FindAsync(notification.UserId);
        if (user == null) return;

        user.TotalXP += notification.XPEarned;

        // Cập nhật Streak (chuỗi ngày học liên tục)
        var today = DateTime.UtcNow.Date;
        if (user.LastActivityDate?.Date != today)
        {
            user.CurrentStreak = (user.LastActivityDate?.Date == today.AddDays(-1))
                ? user.CurrentStreak + 1
                : 1;
            user.LastActivityDate = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync(cancellationToken);

        // 2. Logic cấp Huy hiệu tự động (VD: Đạt mốc 1000 XP)
        if (user.TotalXP >= 1000)
        {
            var badgeId = 1; // Giả sử Badge ID 1 là "Grand Master"
            var alreadyHas = await _context.UserBadges.AnyAsync(ub => ub.UserId == user.UserId && ub.BadgeId == badgeId);
            
            if (!alreadyHas)
            {
                _context.UserBadges.Add(new UserBadge { UserId = user.UserId, BadgeId = badgeId, AcquiredDate = DateTime.Now });
                await _context.SaveChangesAsync(cancellationToken);

                // 3. Kích hoạt Social Loop: Đăng bài vinh danh tự động lên Community Hub
                await _messageBus.PublishAsync("Community.AutoPost", new {
                    UserId = user.UserId,
                    Content = $"🏆 Chúc mừng **{user.FullName}** đã đạt mốc 1000 XP và nhận Huy hiệu Grand Master! 🚀",
                    Type = "Achievement"
                });
            }
        }
    }
}
