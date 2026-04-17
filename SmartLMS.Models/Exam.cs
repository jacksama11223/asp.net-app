using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class Exam
{
    public int ExamId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CourseId { get; set; }
    public int DurationMinutes { get; set; } = 60;
    public int? DepartmentId { get; set; }
    public string? SettingsJson { get; set; } // Passmark, Randomize, etc.
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public virtual Course Course { get; set; } = null!;
    public virtual ICollection<ExamQuestion> ExamQuestions { get; set; } = new List<ExamQuestion>();
    public virtual ICollection<QuizAttempt> QuizAttempts { get; set; } = new List<QuizAttempt>();
}
