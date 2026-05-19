using System;

namespace SmartLMS.Models;

public partial class UserLesson
{
    public int UserId { get; set; }
    public int LessonId { get; set; }
    public int LastWatchedSecond { get; set; } = 0;
    public bool IsCompleted { get; set; } = false;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public virtual User User { get; set; } = null!;
    public virtual Lesson Lesson { get; set; } = null!;
}
