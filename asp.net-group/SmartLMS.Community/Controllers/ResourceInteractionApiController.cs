using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using SmartLMS.Business.Events;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("CommunityApi/ResourceInteraction")]
public class ResourceInteractionApiController : ControllerBase
{
    private readonly IMediator _mediator;

    public ResourceInteractionApiController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // POST /api/ResourceInteraction/123/view
    [HttpPost("{id}/view")]
    public async Task<IActionResult> RecordView(int id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        int? userId = int.TryParse(userIdClaim, out int uid) ? uid : null;
        var ip = HttpContext.Connection.RemoteIpAddress?.ToString();

        await _mediator.Publish(new ResourceViewedEvent(id, userId, ip));
        
        return Ok(new { success = true });
    }

    // POST /api/ResourceInteraction/123/bookmark
    [HttpPost("{id}/bookmark")]
    [Authorize]
    public async Task<IActionResult> ToggleBookmark(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        // Note: For simplicity in phase 2, we just fire added event. 
        // In a real toggle, we would check DB if it exists, then fire BookmarkAdded or BookmarkRemoved.
        await _mediator.Publish(new BookmarkAddedEvent(id, userId));
        
        return Ok(new { success = true, message = "Đã lưu vào bộ sưu tập" });
    }

    // POST /api/ResourceInteraction/123/rate
    [HttpPost("{id}/rate")]
    [Authorize]
    public async Task<IActionResult> SubmitRating(int id, [FromBody] RatingRequest req)
    {
        if (req.Score < 1 || req.Score > 5) return BadRequest("Điểm đánh giá phải từ 1 đến 5");
        
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await _mediator.Publish(new RatingSubmittedEvent(id, userId, req.Score));
        
        return Ok(new { success = true, message = "Cảm ơn bạn đã đánh giá tài liệu!" });
    }

    // POST /api/ResourceInteraction/123/share
    [HttpPost("{id}/share")]
    public async Task<IActionResult> RecordShare(int id, [FromBody] ResourceShareRequest req)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        int? userId = int.TryParse(userIdClaim, out int uid) ? uid : null;
        var ip = HttpContext.Connection.RemoteIpAddress?.ToString();

        await _mediator.Publish(new ResourceSharedEvent(id, userId, req.SharedVia, ip));
        
        return Ok(new { success = true });
    }
}

public class RatingRequest
{
    public int Score { get; set; }
}

public class ResourceShareRequest
{
    public string SharedVia { get; set; } = "Link"; // Facebook, Twitter, Link
}
