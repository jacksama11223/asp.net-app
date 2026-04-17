namespace SmartLMS.Models
{
    public class QuestionDto
    {
        public int QuestionId { get; set; }
        public string Content { get; set; } = string.Empty;
        public int XPValue { get; set; }
        public int? DepartmentId { get; set; }
        public int CourseId { get; set; }
    }
}
