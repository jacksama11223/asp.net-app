using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class Question
{
    public int QuestionId { get; set; }
    public string Content { get; set; } = null!;
    public string? CorrectAnswer { get; set; }
    public int XPValue { get; set; } = 10;
    public int? DepartmentId { get; set; }
    public int CourseId { get; set; }

    public virtual Course Course { get; set; } = null!;
    public virtual ICollection<ExamQuestion> ExamQuestions { get; set; } = new List<ExamQuestion>();
}
