using System.ComponentModel.DataAnnotations;

namespace SmartLMS.Models;

public class CodingChallenge
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    public string? TemplateCode { get; set; } // Code mẫu ban đầu cho học viên

    public string Language { get; set; } = "csharp"; // csharp, python, javascript

    public int Points { get; set; }

    public int? CourseId { get; set; }
    public virtual Course? Course { get; set; }

    public int? LessonId { get; set; }
    public virtual Lesson? Lesson { get; set; }

    public virtual ICollection<TestCase> TestCases { get; set; } = new List<TestCase>();

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}

public class TestCase
{
    [Key]
    public int Id { get; set; }

    public int CodingChallengeId { get; set; }
    public virtual CodingChallenge? CodingChallenge { get; set; }

    [Required]
    public string Input { get; set; } = string.Empty;

    [Required]
    public string ExpectedOutput { get; set; } = string.Empty;

    public bool IsHidden { get; set; } = false; // Nếu true, học viên không thấy input/output này
}
