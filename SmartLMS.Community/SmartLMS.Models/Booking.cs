using System;

namespace SmartLMS.Models;

public partial class Booking
{
    public int BookingId { get; set; }
    public int StudentId { get; set; }
    public int TutorId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    /// <summary>Pending, Confirmed, Cancelled, Completed</summary>
    public string Status { get; set; } = "Pending";
    
    public decimal? Price { get; set; }
    public string? MeetingLink { get; set; }
    public string? Note { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public virtual User Student { get; set; } = null!;
    public virtual User Tutor { get; set; } = null!;
}
