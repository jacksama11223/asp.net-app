using System;

namespace SmartLMS.Models;

public class DirectMessage
{
    public int MessageId { get; set; }
    public int SenderId { get; set; }
    public int ReceiverId { get; set; }
    public int CourseId { get; set; }
    public string Content { get; set; } = null!;
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
    public bool IsRead { get; set; } = false;

    public virtual User Sender { get; set; } = null!;
    public virtual User Receiver { get; set; } = null!;
    public virtual Course Course { get; set; } = null!;
}
