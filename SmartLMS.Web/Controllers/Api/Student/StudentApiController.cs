using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Business;
using System.Security.Claims;

namespace SmartLMS.Web.Controllers.Api.Student;

[Route("api/student")]
[ApiController]
[Authorize] // Yêu cầu đăng nhập
public class StudentApiController : ControllerBase
{
    private readonly SmartLMSContext _context;
    private readonly IStudentService _studentService;

    public StudentApiController(SmartLMSContext context, IStudentService studentService)
    {
        _context = context;
        _studentService = studentService;
    }

    [HttpGet("enrolled-courses")]
    public async Task<ActionResult<object>> GetEnrolledCourses()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();

        int userId = int.Parse(userIdStr);

        var enrollments = await _context.Enrollments
            .Include(e => e.Course)
            .ThenInclude(c => c != null ? c.Instructor : null)
            .Where(e => e.Course != null && !e.Course.IsDeleted && e.UserId == userId)
            .Select(e => new
            {
                e.EnrollmentId,
                e.CourseId,
                e.Progress,
                Course = e.Course != null ? new
                {
                    e.Course.Title,
                    e.Course.ThumbnailUrl,
                    e.Course.Category,
                    Instructor = e.Course.Instructor != null ? new
                    {
                        e.Course.Instructor.FullName
                    } : null
                } : null
            })
            .ToListAsync();

        return Ok(enrollments);
    }

    [HttpGet("course-content/{courseId}")]
    public async Task<ActionResult> GetCourseContent(int courseId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var content = await _studentService.GetCourseContentForWorkspaceAsync(courseId, userId);
        return Ok(content);
    }

    [HttpPost("log-mistake")]
    public async Task<ActionResult> LogMistake([FromBody] MistakeLog log)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        log.UserId = userId;
        await _studentService.LogMistakeAsync(log);
        return Ok();
    }

    [HttpGet("mistakes/{courseId}")]
    public async Task<ActionResult> GetMistakes(int courseId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var mistakes = await _studentService.GetMistakeNotebookAsync(userId, courseId);
        return Ok(mistakes);
    }

    [HttpGet("flashcards/{lessonId}")]
    public async Task<ActionResult> GetFlashcards(int lessonId)
    {
        var flashcards = await _studentService.GetFlashcardsForLessonAsync(lessonId);
        return Ok(flashcards);
    }

    [HttpPost("flashcards/update-progress")]
    public async Task<ActionResult> UpdateFlashcardProgress([FromBody] dynamic data)
    {
        int flashcardId = (int)data.flashcardId;
        bool wasCorrect = (bool)data.wasCorrect;
        await _studentService.UpdateFlashcardProgressAsync(flashcardId, wasCorrect);
        return Ok();
    }

    [HttpPost("ask-question")]
    public async Task<ActionResult> AskQuestion([FromBody] Question question)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        question.UserId = userId;
        await _studentService.AskQuestionAsync(question);
        return Ok();
    }
}
