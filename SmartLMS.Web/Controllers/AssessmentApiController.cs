using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers
{
    [Authorize(AuthenticationSchemes = $"{CookieAuthenticationDefaults.AuthenticationScheme},{JwtBearerDefaults.AuthenticationScheme}")]
    [Route("api/[controller]")]
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
            var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
            if (!int.TryParse(userIdStr, out var userId)) 
                return Unauthorized();

            var result = await _assessmentService.SubmitQuizAsync(userId, request.ExamId, request.Answers);
            return Ok(result);
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
