using System;

namespace SmartLMS.Models;

public class ExamQuestion
{
    public int ExamId { get; set; }
    public int QuestionId { get; set; }

    public virtual Exam Exam { get; set; } = null!;
    public virtual Question Question { get; set; } = null!;
}
