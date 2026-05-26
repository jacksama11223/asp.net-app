using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;

namespace SmartLMS.Web.Controllers
{
    // [Authorize] // Có thể mở comment khi bắt buộc đăng nhập
    public class ForumController : Controller
    {
        private readonly IForumService _forumService;

        public ForumController(IForumService forumService)
        {
            _forumService = forumService;
        }

        [HttpGet]
        public async Task<IActionResult> Index(int page = 1)
        {
            var viewModel = await _forumService.GetForumFeedAsync(page);
            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> SimulateAiDraft([FromBody] AiDraftRequest request)
        {
            if (string.IsNullOrEmpty(request.Prompt))
                return BadRequest("Prompt is empty");

            var result = await _forumService.DraftAiResponseAsync(request.Prompt);
            return Json(new { title = "Phân tích từ Trợ Lý AI", body = result });
        }

        [HttpPost]
        public async Task<IActionResult> SimulateCompileSandbox([FromBody] CompileRequest request)
        {
            if (string.IsNullOrEmpty(request.Code))
                return BadRequest("Code is empty");

            var result = await _forumService.AnalyzeMemoryAllocationAsync(request.Code);
            return Json(new { result = result });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CompleteShareReward([FromBody] ShareRewardRequest request)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized();

            bool success = await _forumService.RewardShareExperienceAsync(userId, request.PostId, request.Format);
            if (success)
                return Ok(new { success = true, message = "Bạn đã được cộng +15 XP!" });
            
            return BadRequest(new { success = false, message = "Không tìm thấy người dùng." });
        }
    }

    public class AiDraftRequest
    {
        public string Prompt { get; set; } = string.Empty;
    }

    public class CompileRequest
    {
        public string Code { get; set; } = string.Empty;
    }

    public class ShareRewardRequest
    {
        public string PostId { get; set; } = string.Empty;
        public string Format { get; set; } = string.Empty;
    }
}
