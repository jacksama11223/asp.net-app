using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Security.Claims;

namespace SmartLMS.Web.Controllers.Api.Student;

[Route("api/student")]
[ApiController]
[Authorize] // Yêu cầu đăng nhập
public class StudentApiController : ControllerBase
{
    private readonly SmartLMSContext _context;

    public StudentApiController(SmartLMSContext context)
    {
        _context = context;
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
}
