using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers.Api.Public
{
    [Route("api/public/courses")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = "ApiKey")]
    public class CoursesApiController : ControllerBase
    {
        private readonly SmartLMSContext _context;
 
        public CoursesApiController(SmartLMSContext context)
        {
            _context = context;
        }
 
        /// <summary>
        /// Lấy danh sách khóa học công khai của Tổ chức.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetCourses()
        {
            // Lấy OrganizationId từ Claims (đã được nạp bởi ApiKeyAuthHandler)
            // var orgIdClaim = User.FindFirst("OrganizationId")?.Value;
            // if (string.IsNullOrEmpty(orgIdClaim)) return Unauthorized();
 
            // int orgId = int.Parse(orgIdClaim);

            var courses = await _context.Courses
                .Where(c => c.Status == "Published" && !c.IsDeleted) // Lọc theo Status và Soft Delete
                .Select(c => new
                {
                    c.CourseId,
                    CourseName = c.Title,
                    Summary = c.Description,
                    c.ThumbnailUrl,
                    c.Price,
                    c.DiscountPrice,
                    InstructorName = "Hệ thống SmartLMS", 
                    TotalStudents = c.Enrollments.Count
                })
                .ToListAsync();

            return Ok(courses);
        }

        /// <summary>
        /// Lấy chi tiết một khóa học cụ thể.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetCourseDetails(int id)
        {
            // var orgIdClaim = User.FindFirst("OrganizationId")?.Value;
            // if (string.IsNullOrEmpty(orgIdClaim)) return Unauthorized();
 
            // int orgId = int.Parse(orgIdClaim);
 
            var course = await _context.Courses
                .Include(c => c.CourseModules)
                .ThenInclude(m => m.Lessons)
                .FirstOrDefaultAsync(c => c.CourseId == id && !c.IsDeleted);
 
            if (course == null) return NotFound();
 
            return Ok(new
            {
                course.CourseId,
                CourseName = course.Title,
                course.Description,
                course.Price,
                Modules = course.CourseModules.Select(m => new
                {
                    m.Title,
                    LessonCount = m.Lessons.Count
                })
            });
        }
        /// <summary>
        /// Tạo mới một khóa học nháp (Draft) từ ứng dụng bên ngoài.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<object>> CreateCourse([FromBody] CourseCreateRequest request)
        {
            // var orgIdClaim = User.FindFirst("OrganizationId")?.Value;
            // if (string.IsNullOrEmpty(orgIdClaim)) return Unauthorized();

            var newCourse = new Course
            {
                Title = request.Title,
                Description = request.Description,
                Price = request.Price,
                Status = "Draft",
                CreatedAt = DateTime.Now,
                IsDeleted = false
            };

            _context.Courses.Add(newCourse);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Tạo khóa học thành công!",
                CourseId = newCourse.CourseId
            });
        }
    }

    public class CourseCreateRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
    }
}
