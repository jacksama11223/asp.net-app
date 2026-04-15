using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Business;

public interface IStudentService
{
    Task<IEnumerable<StudentViewModel>> GetAllStudentsAsync();
}

public class StudentViewModel
{
    public int UserId { get; set; }
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public int CourseCount { get; set; }
    public double AvgProgress { get; set; }
    public string? RiskLevel { get; set; } // Low, Medium, High
}
