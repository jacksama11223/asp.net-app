using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Security.Claims;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventApiController : ControllerBase
{
    private readonly ICommunityService _service;
    public EventApiController(ICommunityService service) => _service = service;

    // GET /api/EventApi
    [HttpGet]
    public async Task<IActionResult> GetEvents()
    {
        var events = await _service.GetEventsAsync();
        return Ok(events);
    }

    // POST /api/EventApi/rsvp/{eventId}  [Authorize]
    [HttpPost("rsvp/{eventId}")]
    [Authorize]
    public async Task<IActionResult> RSVPEvent(int eventId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var success = await _service.RSVPToEventAsync(eventId, userId);
        return success
            ? Ok(new { success = true, message = "Đã đăng ký sự kiện thành công! +10 XP 🚀" })
            : BadRequest(new { success = false, message = "Bạn đã đăng ký sự kiện này rồi." });
    }
}
