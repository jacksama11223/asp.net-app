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
public class GroupApiController : ControllerBase
{
    private readonly ICommunityService _service;
    private readonly IHubContext<CommunityHub> _hubContext;

    public GroupApiController(ICommunityService service, IHubContext<CommunityHub> hubContext) 
    { 
        _service = service; 
        _hubContext = hubContext; 
    }

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

        if(success) 
        { 
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", "Một người dùng vừa gia nhập một nhóm học tập mới!"); 
        }
        
        return success
            ? Ok(new { success = true, message = "Đã tham gia nhóm thành công! 🎉" })
            : BadRequest(new { success = false, message = "Bạn đã là thành viên của nhóm này rồi." });
    }
}
