using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SmartLMS.Business;
using SmartLMS.Community.Hubs;
using System.Security.Claims;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventApiController : ControllerBase
{
    private readonly ICommunityService _service;
    private readonly IHubContext<CommunityHub> _hubContext;

    public EventApiController(ICommunityService service, IHubContext<CommunityHub> hubContext) 
    { 
        _service = service; 
        _hubContext = hubContext; 
    }

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

        if(success) 
        { 
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", "Một người dùng vừa đăng ký tham gia sự kiện!"); 
        }

        return success
            ? Ok(new { success = true, message = "Đã đăng ký sự kiện thành công! +10 XP 🚀" })
            : BadRequest(new { success = false, message = "Bạn đã đăng ký sự kiện này rồi." });
    }
}
