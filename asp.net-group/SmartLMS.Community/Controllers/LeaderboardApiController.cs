using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Security.Claims;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeaderboardApiController : ControllerBase
{
    private readonly ICommunityService _service;
    public LeaderboardApiController(ICommunityService service) => _service = service;

    // GET /api/LeaderboardApi?period=all
    [HttpGet]
    public async Task<IActionResult> GetLeaderboard([FromQuery] string period = "all")
    {
        var entries = await _service.GetLeaderboardAsync();

        // entries has already been grouped by Service
        var grouped = entries
            .Select((x, i) => new
            {
                rank        = i + 1,
                userId      = x.UserId,
                userName    = x.User?.FullName ?? "Ẩn danh",
                avatarSeed  = x.UserId.ToString(),
                totalPoints = x.Points,
            });

        return Ok(new { period, users = grouped });
    }

    // GET /api/LeaderboardApi/me  [Authorize]
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetMyRank()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var entries = await _service.GetLeaderboardAsync();

        var grouped = entries
            .Select(x => new { userId = x.UserId, totalPoints = x.Points })
            .ToList();

        var myIndex  = grouped.FindIndex(x => x.userId == userId);
        var myPoints = myIndex >= 0 ? grouped[myIndex].totalPoints : 0;

        return Ok(new
        {
            rank        = myIndex >= 0 ? myIndex + 1 : -1,
            totalPoints = myPoints,
            message     = myIndex >= 0
                          ? $"Bạn đang ở hạng #{myIndex + 1} với {myPoints} điểm"
                          : "Chưa có điểm nào, hãy bắt đầu tham gia cộng đồng ngay!",
        });
    }
}
