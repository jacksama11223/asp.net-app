using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public partial class Lesson
{
    public int LessonId { get; set; }
    public int ModuleId { get; set; }
    public string Title { get; set; } = null!;
    public string? VideoUrl { get; set; }
    public string? Content { get; set; }
    public string? LessonType { get; set; } // Video, Document, Code
    public int? OrderIndex { get; set; }

    public virtual CourseModule Module { get; set; } = null!;
}
