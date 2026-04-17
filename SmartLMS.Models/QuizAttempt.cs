using System;

namespace SmartLMS.Models;

public class QuizAttempt
{
    public int AttemptId { get; set; }
    public int UserId { get; set; }
    public int ExamId { get; set; }
    public decimal Score { get; set; }
    public string? AnswersJson { get; set; } // Detailed response data for Item Analysis
    public DateTime StartedAt { get; set; } = DateTime.Now;
    public DateTime? FinishedAt { get; set; }

    public virtual User User { get; set; } = null!;
    public virtual Exam Exam { get; set; } = null!;
}
