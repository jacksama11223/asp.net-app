using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers.Api.Gamification;

[Route("api/gamification")]
[ApiController]
[Authorize]
public class GamificationApiController : ControllerBase
{
    private readonly SmartLMSContext _context;

    public GamificationApiController(SmartLMSContext context)
    {
        _context = context;
    }

    [HttpGet("status")]
    public async Task<IActionResult> GetUserStatus()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user == null) return NotFound();

        return Ok(new
        {
            totalXP = user.TotalXP ?? 0,
            currentStreak = user.CurrentStreak,
            level = CalculateLevel(user.TotalXP ?? 0)
        });
    }

    private int CalculateLevel(int xp)
    {
        // Logic tính level đơn giản: Mỗi 1000 XP là 1 level
        return (xp / 1000) + 1;
    }
}
