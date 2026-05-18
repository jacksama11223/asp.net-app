using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers
{
    [Authorize(AuthenticationSchemes = $"{CookieAuthenticationDefaults.AuthenticationScheme},{JwtBearerDefaults.AuthenticationScheme}")]
    [Route("api/assessment")]
    [ApiController]
    public class AssessmentApiController : ControllerBase
    {
        private readonly IAssessmentService _assessmentService;
        private readonly IUserService _userService;

        public AssessmentApiController(IAssessmentService assessmentService, IUserService userService)
        {
            _assessmentService = assessmentService;
            _userService = userService;
        }

        private async Task<(int Level, int? DeptId)> GetUserScopeAsync()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username)) return (3, null);

            var users = await _userService.GetAllUsersAsync();
            var user = users.FirstOrDefault(u => u.Username == username);
            
            if (user == null) return (3, null);
            return (user.HierarchyLevel ?? 3, user.DepartmentId);
        }

        [HttpPost("questions")]
        public async Task<IActionResult> GetQuestions([FromBody] PagingRequest request)
        {
            try 
            {
                var (level, deptId) = await GetUserScopeAsync();
                
                // AG Grid Infinite Row Model inputs
                int pageIndex = request.StartRow / request.PageSize;
                
                var result = await _assessmentService.GetQuestionsPagedAsync(
                    level, 
                    deptId, 
                    pageIndex, 
                    request.PageSize, 
                    request.SearchTerm
                );

                // Log để debug (sẽ thấy trong console output của server)
                System.Diagnostics.Debug.WriteLine($"[API] Trả về {result.Items.Count()} dòng. Tổng cộng: {result.TotalCount}");

                return Ok(new
                {
                    rows = result.Items,
                    lastRow = result.TotalCount
                });
            }
            catch (System.Exception ex)
            {
                // Trả về lỗi chi tiết để debug dễ hơn trên môi trường dev
                return StatusCode(500, new { message = ex.Message, stack = ex.StackTrace });
            }
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard(int? departmentId = null)
        {
            var leaderboard = await _assessmentService.GetLeaderboardAsync(departmentId);
            return Ok(leaderboard);
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitQuiz([FromBody] QuizSubmissionRequest request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out var userId)) 
                return Unauthorized();

            var result = await _assessmentService.SubmitQuizAsync(userId, request.ExamId, request.Answers);
            return Ok(result);
        }

        /// <summary>
        /// API cho React frontend gọi vào lấy thành tích (XP, Huy hiệu, Level) của học viên hiện tại
        /// GET /api/assessment/my-achievements
        /// </summary>
        [HttpGet("my-achievements")]
        public async Task<IActionResult> GetMyAchievements()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out var userId))
                return Unauthorized(new { message = "Không xác định được người dùng." });

            var achievements = await _assessmentService.GetMyAchievementsAsync(userId);
            return Ok(achievements);
        }

        /// <summary>
        /// API lấy danh sách bài tập coding theo khóa học — cho React gọi vào tích hợp Sandbox
        /// GET /api/assessment/coding-challenges?courseId=1
        /// </summary>
        [HttpGet("coding-challenges")]
        public async Task<IActionResult> GetCodingChallengesByCourse([FromQuery] int? courseId)
        {
            try
            {
                using var scope = HttpContext.RequestServices.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<SmartLMS.Data.SmartLMSContext>();
                
                var query = context.CodingChallenges.AsQueryable();
                if (courseId.HasValue)
                    query = query.Where(c => c.CourseId == courseId.Value);

                var challenges = await query
                    .Select(c => new {
                        c.Id, c.Title, c.Language, c.Points, c.CourseId,
                        description = c.Description,
                        testCaseCount = c.TestCases.Count(t => !t.IsHidden)
                    })
                    .ToListAsync();

                return Ok(challenges);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }

    public class QuizSubmissionRequest
    {
        public int ExamId { get; set; }
        public Dictionary<int, string> Answers { get; set; } = new();
    }

    public class PagingRequest
    {
        public int StartRow { get; set; }
        public int EndRow { get; set; } // For AG Grid compatibility
        public int PageSize { get; set; } = 20;
        public string? SearchTerm { get; set; }
    }
}
