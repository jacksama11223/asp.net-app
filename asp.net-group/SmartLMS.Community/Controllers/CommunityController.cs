using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using System;
using Microsoft.AspNetCore.Authorization;

namespace SmartLMS.Community.Controllers;

[Route("hub")]
[Route("")]
public class CommunityController : Controller
{
    private readonly ICommunityService _communityService;
    private readonly IForumService _forumService;

    public CommunityController(ICommunityService communityService, IForumService forumService)
    {
        _communityService = communityService;
        _forumService = forumService;
    }

    // 1. Discussion Forum (Default) - NOW USING FORUM SERVICE FOR THE NEW UI
    [HttpGet("")]
    public async Task<IActionResult> Index(int page = 1)
    {
        var posts = await _forumService.GetForumFeedAsync(page);
        var viewModel = new SmartLms.Community.ViewModels.ForumFeedViewModel
        {
            Posts = posts.Select(p => new SmartLms.Community.ViewModels.ForumPostViewModel
            {
                Id = p.PostId.ToString(),
                Title = p.Title,
                Content = p.Summary ?? (p.Content.Length > 150 ? p.Content.Substring(0, 150) + "..." : p.Content),
                Tag = string.IsNullOrEmpty(p.Tags) ? "Th?o Lu?n" : p.Tags,
                Category = string.IsNullOrEmpty(p.Category) ? "Chung" : p.Category,
                AuthorName = p.Author?.FullName ?? "?n danh",
                AuthorRole = "H?c viên",
                AuthorAvatar = "https://ui-avatars.com/api/?name=" + Uri.EscapeDataString(p.Author?.FullName ?? "User"),
                CreatedAt = p.CreatedAt,
                Likes = p.VoteCount,
                CommentsCount = p.Comments?.Count ?? 0
            }).ToList()
        };
        return View(viewModel);
    }

    // 2. Resource Sharing
    [HttpGet("resources")]
    [HttpGet("/Community/Resources")]
    public async Task<IActionResult> Resources(string? fileType, string? subject)
    {
        var resources = await _communityService.GetResourcesAsync(fileType, subject);
        return View(resources);
    }

    // 3. Event Listings
    [HttpGet("events")]
    [HttpGet("/Community/Events")]
    public async Task<IActionResult> Events()
    {
        var events = await _communityService.GetEventsAsync();
        return View(events);
    }

    // 4. Member Directory
    [HttpGet("members")]
    [HttpGet("/Community/Members")]
    public async Task<IActionResult> Members(string? role, string? skill)
    {
        var members = await _communityService.GetMembersAsync(role, skill);
        return View(members);
    }

    // 5. Q&A Section
    [HttpGet("qa")]
    [HttpGet("/Community/QA")]
    public async Task<IActionResult> QA(string status = "All")
    {
        var questions = await _communityService.GetQuestionsAsync(status);
        return View(questions);
    }

    // 6. Study Groups
    [HttpGet("groups")]
    [HttpGet("/Community/Groups")]
    public async Task<IActionResult> Groups()
    {
        var groups = await _communityService.GetStudyGroupsAsync();
        return View(groups);
    }

    // 7. Leaderboard
    [HttpGet("leaderboard")]
    [HttpGet("/Community/Leaderboard")]
    public async Task<IActionResult> Leaderboard()
    {
        var topUsers = await _communityService.GetLeaderboardAsync();
        return View(topUsers);
    }

    // --- NEW API ENDPOINTS FOR FORUM FEED ---

    [HttpPost("SimulateAiDraft")]
    public async Task<IActionResult> SimulateAiDraft([FromBody] AiDraftRequest request)
    {
        if (string.IsNullOrEmpty(request.Prompt)) return BadRequest("Prompt is empty");
        var result = await _forumService.DraftAiResponseAsync(request.Prompt);
        return Json(new { title = "Phân tích t? Tr? Lý AI", body = result });
    }

    [HttpPost("SimulateCompileSandbox")]
    public async Task<IActionResult> SimulateCompileSandbox([FromBody] CompileRequest request)
    {
        if (string.IsNullOrEmpty(request.Code)) return BadRequest("Code is empty");
        var result = await _forumService.AnalyzeMemoryAllocationAsync(request.Code);
        return Json(new { result = result });
    }

    [HttpPost("CompleteShareReward")]
    public async Task<IActionResult> CompleteShareReward([FromBody] ShareRewardRequest request)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            userId = 1;

        bool success = await _forumService.RewardShareExperienceAsync(userId, request.PostId, request.Format);
        if (success) return Ok(new { success = true, message = "B?n dã du?c c?ng +15 XP!" });
        return BadRequest(new { success = false, message = "L?i x? lý." });
    }
}

public class AiDraftRequest { public string Prompt { get; set; } = string.Empty; }
public class CompileRequest { public string Code { get; set; } = string.Empty; }
public class ShareRewardRequest { public string PostId { get; set; } = string.Empty; public string Format { get; set; } = string.Empty; }
