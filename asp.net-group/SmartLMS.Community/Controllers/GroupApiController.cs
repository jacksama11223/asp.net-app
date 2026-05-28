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
    private readonly SmartLMS.Data.SmartLMSContext _context;

    public GroupApiController(ICommunityService service, IHubContext<CommunityHub> hubContext, SmartLMS.Data.SmartLMSContext context) 
    { 
        _service = service; 
        _hubContext = hubContext; 
        _context = context;
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

    // POST /api/GroupApi/create  [Authorize]
    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateGroup([FromBody] CreateGroupRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Name) || string.IsNullOrWhiteSpace(req.Description))
            return BadRequest(new { message = "Tên nhóm và mô tả không được để trống." });

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var group = new StudyGroup
        {
            Name = req.Name,
            Subject = req.Subject,
            Description = req.Description,
            MaxMembers = req.MaxMembers > 0 ? req.MaxMembers : 50,
            LeaderId = userId,
            CreatedAt = DateTime.UtcNow,
            IsApproved = false // Chờ Admin duyệt
        };

        await _service.CreateGroupAsync(group);

        return Ok(new { success = true, message = "Yêu cầu tạo nhóm đã được gửi tới Admin!" });
    }

    // GET /api/GroupApi/{groupId}/posts
    [HttpGet("{groupId}/posts")]
    public IActionResult GetGroupPosts(int groupId)
    {
        var posts = _context.GroupPosts
            .Where(p => p.GroupId == groupId)
            .Select(p => new {
                p.Id,
                p.Content,
                p.AttachmentIds,
                p.LikesCount,
                p.CommentsCount,
                p.CreatedAt,
                AuthorName = p.Author.FullName ?? "Thành viên",
                AuthorId = p.AuthorId
            })
            .OrderByDescending(p => p.CreatedAt)
            .ToList();
            
        return Ok(posts);
    }

    // POST /api/GroupApi/{groupId}/posts
    [HttpPost("{groupId}/posts")]
    [Authorize]
    public async Task<IActionResult> CreatePost(int groupId, [FromBody] CreateGroupPostRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Content))
            return BadRequest(new { message = "Nội dung không được để trống." });

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var groupPost = new GroupPost
        {
            GroupId = groupId,
            AuthorId = userId,
            Content = req.Content,
            AttachmentIds = req.AttachmentIds ?? "",
            CreatedAt = DateTime.UtcNow
        };

        _context.GroupPosts.Add(groupPost);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Bài viết đã được đăng!" });
    }
}

public record CreateGroupRequest(string Name, string Subject, int MaxMembers, string Description);
public record CreateGroupPostRequest(string Content, string AttachmentIds);
