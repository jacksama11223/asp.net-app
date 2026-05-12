using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;
using System;

namespace SmartLMS.Web.Controllers.Api.Public
{
    [Route("api/public/courses")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = "ApiKey")]
    public class CoursesApiController : ControllerBase
    {
        private readonly SmartLMSContext _context;
        private readonly IDistributedCache _cache;
        private readonly IMemoryCache _memoryCache;
 
        public CoursesApiController(SmartLMSContext context, IDistributedCache cache, IMemoryCache memoryCache)
        {
            _context = context;
            _cache = cache;
            _memoryCache = memoryCache;
        }
 
        /// <summary>
        /// Lấy danh sách khóa học công khai của Tổ chức.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetCourses()
        {
            string cacheKey = "public_courses_list";

            // 🚀 LỚP 1: Kiểm tra RAM nội bộ (Siêu nhanh - 0ms)
            if (_memoryCache.TryGetValue(cacheKey, out IEnumerable<object>? localData))
            {
                return Ok(localData);
            }

            // 🚀 LỚP 2: Kiểm tra Redis (Nhanh - 10ms)
            var cachedData = await _cache.GetStringAsync(cacheKey);
            if (!string.IsNullOrEmpty(cachedData))
            {
                var redisData = JsonSerializer.Deserialize<IEnumerable<object>>(cachedData);
                // Lưu ngược lại RAM để lần sau nhanh hơn
                _memoryCache.Set(cacheKey, redisData, TimeSpan.FromMinutes(1));
                return Ok(redisData);
            }

            // 🚀 LỚP 3: Truy vấn Database (Chậm nhất)
            var courses = await _context.Courses
                .Include(c => c.Instructor)
                .Where(c => c.Status == "Published" && !c.IsDeleted)
                .Select(c => new
                {
                    c.CourseId,
                    CourseName = c.Title,
                    Summary = c.Description,
                    c.ThumbnailUrl,
                    c.Price,
                    c.DiscountPrice,
                    InstructorName = c.Instructor != null ? c.Instructor.FullName : "Hệ thống SmartLMS",
                    Rating = c.Rating,
                    RatingCount = c.RatingCount,
                    TotalStudents = c.Enrollments != null ? c.Enrollments.Count : 0
                })
                .ToListAsync();

            var cacheOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
            };

            await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(courses), cacheOptions);

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
                .Include(c => c.Instructor)
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
                course.ThumbnailUrl,
                course.Rating,
                course.RatingCount,
                Instructor = new
                {
                    course.Instructor?.FullName,
                    course.Instructor?.Bio,
                    course.Instructor?.DonateUrl
                },
                Modules = course.CourseModules.Select(m => new
                {
                    m.Title,
                    Lessons = m.Lessons.Select(l => new { l.LessonId, l.Title, l.LessonType }).ToList()
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
