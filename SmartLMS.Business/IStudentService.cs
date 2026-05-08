using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Business;

public interface IStudentService
{
    Task<IEnumerable<StudentViewModel>> GetAllStudentsAsync();
    Task SendNudgeAsync(int userId);
    
    // Workspace Methods
    Task<object> GetCourseContentForWorkspaceAsync(int courseId, string userId);
    Task LogMistakeAsync(MistakeLog log);
    Task<IEnumerable<MistakeLog>> GetMistakeNotebookAsync(string userId, int courseId);
    Task AskQuestionAsync(Question question);
    Task<IEnumerable<Flashcard>> GetFlashcardsForLessonAsync(int lessonId);
    Task UpdateFlashcardProgressAsync(int flashcardId, bool wasCorrect);
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
