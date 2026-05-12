using System;

namespace SmartLMS.Models;

public class MistakeLog
{
    public int MistakeLogId { get; set; }
    public int UserId { get; set; }
    public int? CourseId { get; set; }
    public int LessonId { get; set; }
    public string ExerciseType { get; set; } = null!; // Quiz, Code, Flashcard
    public string UserAnswer { get; set; } = null!;
    public string? CorrectAnswer { get; set; }
    public string? CorrectionNote { get; set; }
    
    // New Fields for AI Learning
    public string? MistakeType { get; set; } // Logic, Careless, Knowledge Gap
    public DateTime? NextReviewDate { get; set; } // For Spaced Repetition
    public int ConfidenceLevel { get; set; } = 0; // 0-5
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsResolved { get; set; } = false;

    public virtual User User { get; set; } = null!;
    public virtual Lesson Lesson { get; set; } = null!;
    public virtual Course? Course { get; set; }
}
