using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SmartLMS.Business;
using SmartLMS.Community.Hubs;
using SmartLMS.Models;
using System.Security.Claims;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventApiController : ControllerBase
{
    private readonly ICommunityService _service;
    private readonly IHubContext<CommunityHub> _hubContext;
    private readonly SmartLMS.Data.SmartLMSContext _context;

    public EventApiController(ICommunityService service, IHubContext<CommunityHub> hubContext, SmartLMS.Data.SmartLMSContext context) 
    { 
        _service = service; 
        _hubContext = hubContext; 
        _context = context;
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

    // POST /api/EventApi/create  [Authorize]
    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Title) || string.IsNullOrWhiteSpace(req.Description))
            return BadRequest(new { message = "Tiêu đề và mô tả không được để trống." });

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var ev = new CommunityEvent
        {
            Title = req.Title,
            Description = req.Description,
            EventDate = req.EventDate,
            Location = req.Location,
            EventType = req.EventType,
            MaxParticipants = req.MaxParticipants > 0 ? req.MaxParticipants : 100,
            Status = "Upcoming",
            CreatedAt = DateTime.UtcNow,
            IsApproved = false // Chờ Admin duyệt
        };

        await _service.CreateEventAsync(ev);

        return Ok(new { success = true, message = "Yêu cầu tạo sự kiện đã được gửi tới Admin!" });
    }

    // GET /api/EventApi/{eventId}/discussions
    [HttpGet("{eventId}/discussions")]
    public IActionResult GetEventDiscussions(int eventId)
    {
        var discussions = _context.EventDiscussions
            .Where(d => d.EventId == eventId)
            .Select(d => new {
                d.Id,
                d.Content,
                d.AttachmentIds,
                d.LikesCount,
                d.CreatedAt,
                AuthorName = d.Author.FullName ?? "Người tham gia",
                AuthorId = d.AuthorId
            })
            .OrderByDescending(d => d.CreatedAt)
            .ToList();
            
        return Ok(discussions);
    }

    // POST /api/EventApi/{eventId}/discussions
    [HttpPost("{eventId}/discussions")]
    [Authorize]
    public async Task<IActionResult> CreateEventDiscussion(int eventId, [FromBody] CreateEventDiscussionRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Content))
            return BadRequest(new { message = "Nội dung không được để trống." });

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var discussion = new SmartLMS.Models.EventDiscussion
        {
            EventId = eventId,
            AuthorId = userId,
            Content = req.Content,
            AttachmentIds = req.AttachmentIds ?? "",
            CreatedAt = DateTime.UtcNow
        };

        _context.EventDiscussions.Add(discussion);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Bình luận đã được đăng!" });
    }
}

public record CreateEventRequest(string Title, string Description, DateTime EventDate, string Location, string EventType, int MaxParticipants);
public record CreateEventDiscussionRequest(string Content, string AttachmentIds);
