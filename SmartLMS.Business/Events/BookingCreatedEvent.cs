using MediatR;

namespace SmartLMS.Business.Events;

public class BookingCreatedEvent : INotification
{
    public int StudentId { get; set; }
    public int TutorId { get; set; }
    public string TutorName { get; set; }
    public System.DateTime StartTime { get; set; }
    public string JoinUrl { get; set; }

    public BookingCreatedEvent(int studentId, int tutorId, string tutorName, System.DateTime startTime, string joinUrl)
    {
        StudentId = studentId;
        TutorId = tutorId;
        TutorName = tutorName;
        StartTime = startTime;
        JoinUrl = joinUrl;
    }
}
