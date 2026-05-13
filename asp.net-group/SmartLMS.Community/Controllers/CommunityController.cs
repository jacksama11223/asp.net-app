using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Threading.Tasks;

namespace SmartLMS.Community.Controllers;

[Route("hub")]
[Route("")]
public class CommunityController : Controller
{
    private readonly ICommunityService _communityService;

    public CommunityController(ICommunityService communityService)
    {
        _communityService = communityService;
    }

    // 1. Discussion Forum (Default)
    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var posts = await _communityService.GetLatestPostsAsync();
        return View(posts);
    }

    // 2. Resource Sharing
    [HttpGet("resources")]
    public async Task<IActionResult> Resources(string? fileType, string? subject)
    {
        var resources = await _communityService.GetResourcesAsync(fileType, subject);
        return View(resources);
    }

    // 3. Event Listings
    [HttpGet("events")]
    public async Task<IActionResult> Events()
    {
        var events = await _communityService.GetEventsAsync();
        return View(events);
    }

    // 4. Member Directory
    [HttpGet("members")]
    public async Task<IActionResult> Members(string? role, string? skill)
    {
        var members = await _communityService.GetMembersAsync(role, skill);
        return View(members);
    }

    // 5. Q&A Section
    [HttpGet("qa")]
    public async Task<IActionResult> QA(string status = "All")
    {
        var questions = await _communityService.GetQuestionsAsync(status);
        return View(questions);
    }

    // 6. Study Groups
    [HttpGet("groups")]
    public async Task<IActionResult> Groups()
    {
        var groups = await _communityService.GetStudyGroupsAsync();
        return View(groups);
    }

    // 7. Leaderboard
    [HttpGet("leaderboard")]
    public async Task<IActionResult> Leaderboard()
    {
        var topUsers = await _communityService.GetLeaderboardAsync();
        return View(topUsers);
    }
}
