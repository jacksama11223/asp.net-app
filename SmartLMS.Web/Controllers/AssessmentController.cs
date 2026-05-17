using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Models;
using SmartLMS.Business;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SmartLMS.Web.Controllers
{
    [Authorize]
    public class AssessmentController : Controller
    {
        private readonly IAssessmentService _assessmentService;
        private readonly IUserService _userService;

        public AssessmentController(IAssessmentService assessmentService, IUserService userService)
        {
            _assessmentService = assessmentService;
            _userService = userService;
        }

        // Helper to get current user info with hierarchy
        private async Task<(int Level, int? DeptId)> GetUserScopeAsync()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username)) return (3, null);

            var users = await _userService.GetAllUsersAsync();
            var user = users.FirstOrDefault(u => u.Username == username);
            
            if (user == null) return (3, null);
            return (user.HierarchyLevel ?? 3, user.DepartmentId);
        }

        public async Task<IActionResult> Index()
        {
            var (level, deptId) = await GetUserScopeAsync();
            var leaderboard = await _assessmentService.GetLeaderboardAsync(deptId);
            return View(leaderboard);
        }

        public async Task<IActionResult> Leaderboard()
        {
            var (level, deptId) = await GetUserScopeAsync();
            var leaderboard = await _assessmentService.GetLeaderboardAsync(deptId);
            return View(leaderboard);
        }

        [Authorize(Roles = "Admin")]
        public IActionResult QuestionBuilder(int? id)
        {
            // Không load dữ liệu ở đây nữa, AG Grid sẽ tự gọi API để phân trang
            ViewBag.Questions = new List<Question>();
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SaveQuestion(Question model)
        {
            var (level, deptId) = await GetUserScopeAsync();
            await _assessmentService.SaveQuestionAsync(model, level, deptId);
            return RedirectToAction(nameof(QuestionBuilder));
        }

        [Authorize(Roles = "Admin")]
        public IActionResult BulkImport()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ExamAssembler(int? id)
        {
            var (level, deptId) = await GetUserScopeAsync();
            var questions = await _assessmentService.GetQuestionsAsync(level, deptId);
            ViewBag.Questions = questions;
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult RuleEngine()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> BadgeStudio()
        {
            var badges = await _assessmentService.GetBadgesAsync();
            return View(badges);
        }

        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ItemAnalysis()
        {
            var (level, deptId) = await GetUserScopeAsync();
            var stats = await _assessmentService.GetItemAnalysisAsync(deptId);
            return View(stats);
        }

        [Authorize]
        public IActionResult QuizWizard(int id)
        {
            // Lấy thông tin bài thi để hiển thị tiêu đề
            // Dữ liệu câu hỏi sẽ được load qua JS gọi API
            ViewBag.ExamId = id;
            return View();
        }

        [Authorize]
        public async Task<IActionResult> AchievementHub()
        {
            // Ưu tiên lấy từ NameIdentifier (đây là claim chuẩn ASP.NET Identity)
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(userIdStr, out int userId))
            {
                var achievements = await _assessmentService.GetMyAchievementsAsync(userId);
                return View(achievements);
            }
            return RedirectToAction("Index", "Dashboard");
        }
    }
}
