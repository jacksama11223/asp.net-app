using System;

namespace SmartLMS.Models;

public class Flashcard
{
    public int FlashcardId { get; set; }
    public int LessonId { get; set; }
    public string FrontSide { get; set; } = null!;
    public string BackSide { get; set; } = null!;
    public string? Hint { get; set; }
    public string? ImageUrl { get; set; }
    
    // Spaced Repetition Data (Simplified)
    public DateTime? LastReviewDate { get; set; }
    public DateTime? NextReviewDate { get; set; }
    public int IntervalDays { get; set; } = 1;
    public int EaseFactor { get; set; } = 250; // 2.5 in percentage
}
