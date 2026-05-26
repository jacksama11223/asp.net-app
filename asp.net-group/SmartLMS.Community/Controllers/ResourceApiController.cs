using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Security.Claims;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourceApiController : ControllerBase
{
    private readonly ICommunityService _service;
    public ResourceApiController(ICommunityService service) => _service = service;

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
    public async Task<IActionResult> UploadResource([FromBody] UploadResourceRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Title))
            return BadRequest(new { message = "Tiêu đề tài liệu không được để trống." });

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var resource = new CommunityResource
        {
            Title       = req.Title,
            Description = req.Description ?? "",
            FileType    = req.FileType ?? "other",
            FileUrl     = req.FileUrl ?? "",
            Subject     = req.Subject ?? "",
            UploaderId  = userId,
            CreatedAt   = DateTime.UtcNow,
        };

        var result = await _service.UploadResourceAsync(resource);
        return Ok(new { success = true, resourceId = result.Id, message = "Tài liệu đã được tải lên thành công! +20 XP 📚" });
    }
}

public record UploadResourceRequest(string Title, string? Description, string? FileType, string? FileUrl, string? Subject);
