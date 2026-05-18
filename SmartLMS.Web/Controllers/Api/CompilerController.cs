using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Business;
using SmartLMS.Data;
using SmartLMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MediatR;

namespace SmartLMS.Web.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = $"{CookieAuthenticationDefaults.AuthenticationScheme},{JwtBearerDefaults.AuthenticationScheme}")]
public class CompilerController : ControllerBase
{
    private readonly ICompilerService _compilerService;
    private readonly SmartLMSContext _context;
    private readonly IMediator _mediator;

    public CompilerController(ICompilerService compilerService, SmartLMSContext context, IMediator mediator)
    {
        _compilerService = compilerService;
        _context = context;
        _mediator = mediator;
    }

    [HttpPost("execute")]
    public async Task<IActionResult> ExecuteCode([FromBody] ExecuteRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Code))
        {
            return BadRequest("Mã nguồn không được để trống.");
        }

        // Lấy danh sách test cases từ Database dựa trên ChallengeId
        var challenge = await _context.CodingChallenges
            .Include(c => c.TestCases)
            .FirstOrDefaultAsync(c => c.Id == request.ChallengeId);

        if (challenge == null)
        {
            return NotFound("Không tìm thấy thử thách lập trình này.");
        }

        var result = await _compilerService.ExecuteAsync(request.Code, request.Language, challenge.TestCases.ToList());

        // Lấy UserId từ Claims (Hỗ trợ cả JWT và Cookie)
        int userId = 0;
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
        if (userIdClaim != null)
        {
            int.TryParse(userIdClaim.Value, out userId);
        }

        if (userId > 0)
        {
            // Luồng Mistake Analysis: Nếu sai, ghi log lại
            if (!result.Success || result.TestCaseResults.Any(t => !t.Passed))
            {
                _context.MistakeLogs.Add(new MistakeLog
                {
                    UserId = userId,
                    CourseId = challenge.CourseId ?? 0,
                    LessonId = challenge.LessonId ?? 0,
                    ExerciseType = "Code",
                    UserAnswer = request.Code ?? string.Empty,
                    MistakeType = "CodingError",
                    CorrectionNote = result.Message,
                    CreatedAt = System.DateTime.Now
                });
                await _context.SaveChangesAsync();
            }
            else 
            {
                // Luồng Gamification: Nếu ĐÚNG, thưởng XP và Badge thông qua EventBus
                await _mediator.Publish(new SmartLMS.Business.Events.AssessmentCompletedEvent(userId, challenge.Points));
            }
        }

        return Ok(result);
    }

    [HttpGet("challenges")]
    [AllowAnonymous]
    public async Task<IActionResult> GetChallenges()
    {
        var challenges = await _context.CodingChallenges
            .Select(c => new { c.Id, c.Title, c.Points, c.Language })
            .ToListAsync();
        return Ok(challenges);
    }

    [HttpGet("challenges/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetChallengeDetail(int id)
    {
        var challenge = await _context.CodingChallenges
            .Include(c => c.TestCases) // Để giáo viên xem được toàn bộ test cases (kể cả ẩn)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (challenge == null) return NotFound();

        return Ok(challenge);
    }

    [HttpGet("courses")]
    public async Task<IActionResult> GetInstructorCourses()
    {
        // Lấy UserId từ Claims
        int userId = 0;
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
        if (userIdClaim != null)
        {
            int.TryParse(userIdClaim.Value, out userId);
        }

        var courses = await _context.Courses
            .Where(c => !c.IsDeleted && (c.InstructorId == userId || userId == 0 || c.InstructorId == null)) // Hỗ trợ xem tất cả nếu dev/admin
            .Select(c => new {
                c.CourseId,
                Title = c.Title ?? "Chưa đặt tên",
                c.Category,
                c.Price,
                Status = c.Status ?? "Draft",
                c.ThumbnailUrl,
                LessonsCount = c.CourseModules.SelectMany(m => m.Lessons).Count(),
                StudentsCount = c.Enrollments.Count
            })
            .ToListAsync();

        return Ok(courses);
    }

    [HttpPost("courses/save")]
    public async Task<IActionResult> SaveCourse([FromBody] SaveCourseRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Title))
        {
            return BadRequest("Tiêu đề khóa học không được trống.");
        }

        // Lấy UserId
        int userId = 0;
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
        if (userIdClaim != null)
        {
            int.TryParse(userIdClaim.Value, out userId);
        }

        Course course;
        if (request.CourseId > 0)
        {
            course = await _context.Courses.FindAsync(request.CourseId);
            if (course == null) return NotFound("Không tìm thấy khóa học.");
            
            course.Title = request.Title;
            course.Description = request.Description;
            course.Category = request.Category;
            course.Price = request.Price;
            course.Status = request.Status;
            course.ThumbnailUrl = request.ThumbnailUrl;
            course.UpdatedAt = DateTime.Now;
        }
        else
        {
            course = new Course
            {
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                Price = request.Price,
                Status = request.Status ?? "Draft",
                ThumbnailUrl = request.ThumbnailUrl ?? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
                InstructorId = userId > 0 ? userId : null,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                IsDeleted = false
            };
            _context.Courses.Add(course);
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true, courseId = course.CourseId });
    }

    [HttpGet("courses/{courseId}/lessons")]
    public async Task<IActionResult> GetCourseLessons(int courseId)
    {
        var modules = await _context.CourseModules
            .Where(m => m.CourseId == courseId)
            .Select(m => new {
                m.ModuleId,
                m.Title,
                Lessons = m.Lessons.Select(l => new {
                    l.LessonId,
                    l.Title,
                    l.LessonType,
                    HasChallenge = _context.CodingChallenges.Any(cc => cc.LessonId == l.LessonId),
                    ChallengeId = _context.CodingChallenges.Where(cc => cc.LessonId == l.LessonId).Select(cc => cc.Id).FirstOrDefault()
                }).ToList()
            })
            .ToListAsync();

        return Ok(modules);
    }

    [HttpPost("challenges/save")]
    public async Task<IActionResult> SaveChallenge([FromBody] SaveChallengeRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Title))
        {
            return BadRequest("Tiêu đề thử thách không được trống.");
        }

        CodingChallenge challenge;
        if (request.Id > 0)
        {
            challenge = await _context.CodingChallenges
                .Include(c => c.TestCases)
                .FirstOrDefaultAsync(c => c.Id == request.Id);

            if (challenge == null) return NotFound("Không tìm thấy thử thách.");

            challenge.Title = request.Title;
            challenge.Description = request.Description;
            challenge.TemplateCode = request.TemplateCode;
            challenge.Language = request.Language;
            challenge.Points = request.Points;
            challenge.CourseId = request.CourseId;
            challenge.LessonId = request.LessonId;

            // Xóa test cases cũ rồi add lại
            _context.TestCases.RemoveRange(challenge.TestCases);
            challenge.TestCases.Clear();
        }
        else
        {
            challenge = new CodingChallenge
            {
                Title = request.Title,
                Description = request.Description,
                TemplateCode = request.TemplateCode,
                Language = request.Language,
                Points = request.Points,
                CourseId = request.CourseId,
                LessonId = request.LessonId,
                CreatedAt = DateTime.Now
            };
            _context.CodingChallenges.Add(challenge);
        }

        if (request.TestCases != null)
        {
            foreach (var tc in request.TestCases)
            {
                challenge.TestCases.Add(new TestCase
                {
                    Input = tc.Input,
                    ExpectedOutput = tc.ExpectedOutput,
                    IsHidden = tc.IsHidden
                });
            }
        }

        // Cập nhật trạng thái bài học là Code
        if (request.LessonId.HasValue)
        {
            var lesson = await _context.Lessons.FindAsync(request.LessonId.Value);
            if (lesson != null)
            {
                lesson.LessonType = "Code";
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true, challengeId = challenge.Id });
    }
}

public class ExecuteRequest
{
    public int ChallengeId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Language { get; set; } = "csharp";
}

public class SaveCourseRequest
{
    public int CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Category { get; set; }
    public decimal? Price { get; set; }
    public string? Status { get; set; }
    public string? ThumbnailUrl { get; set; }
}

public class SaveChallengeRequest
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? TemplateCode { get; set; }
    public string Language { get; set; } = "csharp";
    public int Points { get; set; }
    public int? CourseId { get; set; }
    public int? LessonId { get; set; }
    public List<TestCaseSaveDto>? TestCases { get; set; }
}

public class TestCaseSaveDto
{
    public string Input { get; set; } = string.Empty;
    public string ExpectedOutput { get; set; } = string.Empty;
    public bool IsHidden { get; set; }
}
