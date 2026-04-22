using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Security.Claims;

namespace SmartLMS.Web.Controllers.Api
{
    [Route("api/student/courses")]
    [ApiController]
    [Authorize] // Requires JWT
    public class StudentCoursesApiController : ControllerBase
    {
        private readonly SmartLMSContext _context;

        public StudentCoursesApiController(SmartLMSContext context)
        {
            _context = context;
        }

        [HttpGet("my-courses")]
        public async Task<ActionResult> GetMyCourses()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

            var enrollments = await _context.Enrollments
                .Include(e => e.Course)
                .Where(e => e.UserId == userId)
                .Select(e => new {
                    e.CourseId,
                    e.Course.Title,
                    e.Course.ThumbnailUrl,
                    e.Progress,
                    e.EnrollmentDate
                })
                .ToListAsync();

            return Ok(enrollments);
        }

        [HttpGet("{courseId}/portal")]
        public async Task<ActionResult> GetCoursePortal(int courseId)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

            // Verify enrollment
            var enrollment = await _context.Enrollments
                .AnyAsync(e => e.UserId == userId && e.CourseId == courseId);
            
            if (!enrollment) return Forbid("You are not enrolled in this course.");

            var course = await _context.Courses
                .Include(c => c.CourseModules)
                .ThenInclude(m => m.Lessons)
                .FirstOrDefaultAsync(c => c.CourseId == courseId);

            if (course == null) return NotFound();

            return Ok(new {
                course.CourseId,
                course.Title,
                Modules = course.CourseModules.Select(m => new {
                    m.ModuleId,
                    m.Title,
                    Lessons = m.Lessons.Select(l => new {
                        l.LessonId,
                        l.Title,
                        l.ContentType,
                        l.ContentBody // In a real app, you might not send full body yet
                    })
                })
            });
        }
    }
}
