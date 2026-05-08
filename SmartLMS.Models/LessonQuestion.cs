using System;

namespace SmartLMS.Models;

public class LessonQuestion
{
    public int LessonQuestionId { get; set; }
    public int UserId { get; set; }
    public int LessonId { get; set; }
    public string Content { get; set; } = null!;
    public string? Answer { get; set; }
    public string? AnsweredBy { get; set; } // Instructor UserId
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? AnsweredAt { get; set; }
    public bool IsPrivate { get; set; } = false;

    public virtual User User { get; set; } = null!;
    public virtual Lesson Lesson { get; set; } = null!;
}
