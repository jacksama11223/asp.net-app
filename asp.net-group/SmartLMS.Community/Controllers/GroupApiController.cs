using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Security.Claims;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupApiController : ControllerBase
{
    private readonly ICommunityService _service;
    public GroupApiController(ICommunityService service) => _service = service;

    // GET /api/GroupApi
    [HttpGet]
    public async Task<IActionResult> GetGroups()
    {
        var groups = await _service.GetStudyGroupsAsync();
        return Ok(groups);
    }

    // POST /api/GroupApi/join/{groupId}  [Authorize]
    [HttpPost("join/{groupId}")]
    [Authorize]
    public async Task<IActionResult> JoinGroup(int groupId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var success = await _service.JoinGroupAsync(groupId, userId);
        return success
            ? Ok(new { success = true, message = "Đã tham gia nhóm thành công! 🎉" })
            : BadRequest(new { success = false, message = "Bạn đã là thành viên của nhóm này rồi." });
    }
}
