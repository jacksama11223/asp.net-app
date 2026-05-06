using System;

namespace SmartLMS.Models;

public class Question
{
    public int QuestionId { get; set; }
    public int CourseId { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string Options { get; set; } = string.Empty; // Store as JSON or comma separated
    public string CorrectAnswer { get; set; } = string.Empty;
    public int XPValue { get; set; } = 10;
    public int? DepartmentId { get; set; }
    
    public virtual Course Course { get; set; } = null!;
}
