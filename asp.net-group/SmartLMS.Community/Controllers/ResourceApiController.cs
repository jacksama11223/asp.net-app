using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SmartLMS.Business;
using SmartLMS.Models;
using SmartLMS.Community.Hubs;
using System.Security.Claims;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourceApiController : ControllerBase
{
    private readonly ICommunityService _service;
    private readonly IHubContext<CommunityHub> _hubContext;
    public ResourceApiController(ICommunityService service, IHubContext<CommunityHub> hubContext) 
    { 
        _service = service; 
        _hubContext = hubContext; 
    }

    // GET /api/ResourceApi?fileType=pdf&subject=csharp
    [HttpGet]
    public async Task<IActionResult> GetResources([FromQuery] string? fileType, [FromQuery] string? subject)
    {
        var resources = await _service.GetResourcesAsync(fileType, subject);
        return Ok(resources);
    }

    // POST /api/ResourceApi  [Authorize] - Upload tài liệu mới (metadata, file upload riêng)
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UploadResource([FromForm] UploadResourceRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Title))
            return BadRequest(new { message = "Tiêu đề tài liệu không được để trống." });

        if (req.File == null || req.File.Length == 0)
            return BadRequest(new { message = "Vui lòng đính kèm một file tài liệu." });

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        // Ensure directory exists
        var uploadDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "resources");
        if (!Directory.Exists(uploadDir)) Directory.CreateDirectory(uploadDir);

        // Generate safe file name
        var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(req.File.FileName)}";
        var filePath = Path.Combine(uploadDir, fileName);

        // Save file
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await req.File.CopyToAsync(stream);
        }

        var resource = new CommunityResource
        {
            Title       = req.Title,
            Description = req.Description ?? "",
            FileType    = req.FileType ?? "PDF",
            FileUrl     = $"/uploads/resources/{fileName}",
            Subject     = req.Subject ?? "",
            UploaderId  = userId,
            CreatedAt   = DateTime.UtcNow,
        };

        var result = await _service.UploadResourceAsync(resource);

        await _hubContext.Clients.All.SendAsync("ReceiveNotification", $"Tài liệu mới vừa được đăng: '{req.Title}'");

        return Ok(new { success = true, resourceId = result.Id, message = "Tài liệu đã được tải lên thành công! +20 XP 📚" });
    }

    [HttpPost("{id}/bookmark")]
    [Authorize]
    public async Task<IActionResult> BookmarkResource(int id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        await _service.BookmarkResourceAsync(id, userId);
        return Ok(new { success = true, message = "Đã cập nhật bộ sưu tập." });
    }

    [HttpPost("{id}/rate")]
    [Authorize]
    public async Task<IActionResult> RateResource(int id, [FromBody] RateRequest req)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        if (req.Score < 1 || req.Score > 5) return BadRequest(new { message = "Điểm đánh giá phải từ 1 đến 5." });

        await _service.RateResourceAsync(id, userId, req.Score, req.ReviewText);
        return Ok(new { success = true, message = $"Cảm ơn bạn đã đánh giá {req.Score} sao!" });
    }

    [HttpPost("{id}/view")]
    public async Task<IActionResult> ViewResource(int id)
    {
        await _service.IncrementViewCountAsync(id);
        return Ok(new { success = true });
    }

    [HttpPost("{id}/download")]
    public async Task<IActionResult> DownloadResource(int id)
    {
        await _service.IncrementDownloadCountAsync(id);
        return Ok(new { success = true });
    }
}

public class RateRequest
{
    public int Score { get; set; }
    public string? ReviewText { get; set; }
}

public class UploadResourceRequest
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string? FileType { get; set; }
    public string? Subject { get; set; }
    public IFormFile? File { get; set; }
}
