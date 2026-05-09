using MediatR;
using SmartLMS.Business.Events;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Business.Handlers;

/// <summary>
/// Handler thuộc Module Notification.
/// Lắng nghe sự kiện "Đặt lịch mới" từ Module Booking,
/// rồi TỰ ĐỘNG ghi thông báo vào DB - không cần BookingService phải biết.
/// </summary>
public class NotificationEventHandler : INotificationHandler<BookingCreatedEvent>
{
    private readonly SmartLMSContext _context;

    public NotificationEventHandler(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task Handle(BookingCreatedEvent notification, CancellationToken cancellationToken)
    {
        // Gửi thông báo cho Giảng viên
        _context.Notifications.Add(new Notification
        {
            UserId = notification.TutorId,
            Title = "Yêu cầu đặt lịch mới",
            Message = $"Sinh viên yêu cầu học lúc {notification.StartTime:dd/MM/yyyy HH:mm}.",
            Type = "Booking",
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        });

        // Gửi thông báo cho Sinh viên (nếu có link Zoom)
        if (!string.IsNullOrEmpty(notification.JoinUrl))
        {
            _context.Notifications.Add(new Notification
            {
                UserId = notification.StudentId,
                Title = "Lịch học đã được xác nhận",
                Message = $"Lịch học lúc {notification.StartTime:dd/MM HH:mm} đã được xác nhận.",
                Link = notification.JoinUrl,
                Type = "Booking",
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            });
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}
