using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Security.Claims;

namespace SmartLMS.Web.Controllers.Api.Student;

[Route("api/student")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class StudentApiController : ControllerBase
{
    private readonly SmartLMSContext _context;
    private readonly IStudentService _studentService;

    public StudentApiController(SmartLMSContext context, IStudentService studentService)
    {
        _context = context;
        _studentService = studentService;
    }

    [HttpGet("whoami")]
    public IActionResult WhoAmI()
    {
        var claims = User.Claims.Select(c => new { c.Type, c.Value });
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        return Ok(new { userId = userIdStr, claims });
    }

    [HttpGet("enrolled-courses")]
    public async Task<ActionResult<object>> GetEnrolledCourses()
    {
        try 
        {
            var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
            if (string.IsNullOrEmpty(userIdStr)) return Unauthorized(new { message = "No User Identity found in token" });

            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized(new { message = "Invalid User Identity format" });

            var enrollments = await _context.Enrollments
                .Include(e => e.Course)
                .Where(e => e.UserId == userId && e.Course != null && !e.Course.IsDeleted)
                .Select(e => new
                {
                    e.EnrollmentId,
                    e.CourseId,
                    e.Progress,
                    Course = new
                    {
                        e.Course!.Title,
                        e.Course.ThumbnailUrl,
                        e.Course.Category
                    }
                })
                .ToListAsync();

            return Ok(enrollments);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message, inner = ex.InnerException?.Message });
        }
    }

    [HttpGet("course-content/{courseId}")]
    public async Task<ActionResult> GetCourseContent(int courseId)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
        int userId = int.Parse(userIdStr);

        var content = await _studentService.GetCourseContentForWorkspaceAsync(courseId, userId);
        return Ok(content);
    }

    [HttpPost("log-mistake")]
    public async Task<ActionResult> LogMistake([FromBody] MistakeLog log)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
        int userId = int.Parse(userIdStr);

        log.UserId = userId;
        await _studentService.LogMistakeAsync(log);
        return Ok();
    }

    [HttpGet("mistakes")]
    public async Task<ActionResult> GetMistakes()
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
        int userId = int.Parse(userIdStr);

        var mistakes = await _studentService.GetMistakeNotebookAsync(userId, null);
        Response.Headers.Append("X-Server-Node", Environment.MachineName);
        return Ok(mistakes);
    }

    [HttpGet("mistakes/{courseId}")]
    public async Task<ActionResult> GetMistakes(int courseId)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
        int userId = int.Parse(userIdStr);

        var mistakes = await _studentService.GetMistakeNotebookAsync(userId, courseId);
        Response.Headers.Append("X-Server-Node", Environment.MachineName);
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
    public async Task<ActionResult> AskQuestion([FromBody] LessonQuestion question)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
        int userId = int.Parse(userIdStr);

        question.UserId = userId;
        await _studentService.AskQuestionAsync(question);
        return Ok();
    }

    [HttpPost("video-progress")]
    public async Task<ActionResult> SaveVideoProgress([FromBody] VideoProgressRequest model)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
        int userId = int.Parse(userIdStr);

        var progress = await _context.UserLessons
            .FirstOrDefaultAsync(ul => ul.UserId == userId && ul.LessonId == model.LessonId);

        if (progress == null)
        {
            progress = new UserLesson
            {
                UserId = userId,
                LessonId = model.LessonId,
                LastWatchedSecond = model.Seconds,
                IsCompleted = model.IsCompleted,
                UpdatedAt = DateTime.UtcNow
            };
            _context.UserLessons.Add(progress);
        }
        else
        {
            progress.LastWatchedSecond = model.Seconds;
            if (model.IsCompleted)
            {
                progress.IsCompleted = true;
            }
            progress.UpdatedAt = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();

        var lesson = await _context.Lessons
            .Include(l => l.Module)
            .FirstOrDefaultAsync(l => l.LessonId == model.LessonId);

        if (lesson != null && lesson.Module != null)
        {
            var courseId = lesson.Module.CourseId;
            var totalLessons = await _context.Lessons
                .CountAsync(l => l.Module.CourseId == courseId);

            if (totalLessons > 0)
            {
                var completedLessons = await _context.UserLessons
                    .CountAsync(ul => ul.UserId == userId && ul.IsCompleted && ul.Lesson.Module.CourseId == courseId);

                var enrollment = await _context.Enrollments
                    .FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId);

                if (enrollment != null)
                {
                    enrollment.Progress = Math.Round(((double)completedLessons / totalLessons) * 100, 2);
                    enrollment.LastAccessDate = DateTime.UtcNow;
                    await _context.SaveChangesAsync();
                }
            }
        }

        return Ok(new { success = true, isCompleted = progress.IsCompleted });
    }
}

public class VideoProgressRequest
{
    public int LessonId { get; set; }
    public int Seconds { get; set; }
    public bool IsCompleted { get; set; }
}


