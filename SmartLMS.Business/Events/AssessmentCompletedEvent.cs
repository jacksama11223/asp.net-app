using MediatR;

namespace SmartLMS.Business.Events;

public class AssessmentCompletedEvent : INotification
{
    public int UserId { get; set; }
    public int XPEarned { get; set; }

    public AssessmentCompletedEvent(int userId, int xpEarned)
    {
        UserId = userId;
        XPEarned = xpEarned;
    }
}
