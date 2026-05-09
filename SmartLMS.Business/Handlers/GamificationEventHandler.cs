using MediatR;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Business.Events;
using SmartLMS.Data;

namespace SmartLMS.Business.Handlers;

/// <summary>
/// Handler thuộc Module Gamification.
/// Lắng nghe sự kiện "Bài kiểm tra hoàn thành" từ Module LMS,
/// rồi TỰ ĐỘNG cộng XP - không cần Module LMS phải biết logic này tồn tại.
/// </summary>
public class GamificationEventHandler : INotificationHandler<AssessmentCompletedEvent>
{
    private readonly SmartLMSContext _context;

    public GamificationEventHandler(SmartLMSContext context)
    {
        _context = context;
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
    }
}
