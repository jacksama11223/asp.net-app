using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using Microsoft.AspNetCore.SignalR;
using SmartLMS.Community.Hubs;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;

namespace SmartLMS.Community.Controllers;

[Route("CommunityApi/ResourceDiscussion")]
[ApiController]
public class ResourceDiscussionApiController : ControllerBase
{
    private readonly IResourceDiscussionService _discussionService;
    private readonly IModerationService _moderationService;
    private readonly IHubContext<CommunityHub> _hubContext;
    private readonly IResourceRagService _ragService;

    public ResourceDiscussionApiController(
        IResourceDiscussionService discussionService, 
        IModerationService moderationService,
        IHubContext<CommunityHub> hubContext,
        IResourceRagService ragService)
    {
        _discussionService = discussionService;
        _moderationService = moderationService;
        _hubContext = hubContext;
        _ragService = ragService;
    }

    // Lấy danh sách bình luận đa tầng của một tài liệu
    [HttpGet("{resourceId}/comments")]
    public async Task<IActionResult> GetComments(int resourceId)
    {
        var comments = await _discussionService.GetCommentTreeAsync(resourceId);
        
        // Map sang DTO để tránh vòng lặp JSON và chỉ trả về thông tin public
        var result = comments.Select(c => MapToDto(c));
        return Ok(result);
    }

    // Đăng bình luận mới
    [HttpPost("{resourceId}/comments")]
    [Authorize]
    public async Task<IActionResult> PostComment(int resourceId, [FromBody] PostCommentRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Content))
            return BadRequest(new { message = "Nội dung không được để trống." });

        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        // 🛡️ Kiểm duyệt nội dung bằng ML.NET (đồng bộ)
        bool isToxic = _moderationService.IsSpamOrToxic(request.Content);
        if (isToxic)
        {
            // Tự động Report và từ chối bình luận
            await _discussionService.ReportContentAsync(resourceId, userId, "Hệ thống AI ML.NET tự động phát hiện ngôn từ độc hại");
            return BadRequest(new { message = "Bình luận của bạn chứa ngôn từ không phù hợp và đã bị chặn bởi AI." });
        }

        var comment = await _discussionService.AddCommentAsync(resourceId, userId, request.Content, request.ParentCommentId);
        var dto = MapToDto(comment);

        // ⚡ Gửi thông báo SignalR Real-time tới tất cả user đang xem tài liệu này
        await _hubContext.Clients.Group($"Resource_{resourceId}").SendAsync("ReceiveResourceComment", dto);

        // 🤖 Gọi AI RAG nếu user tag @AI
        if (request.Content.TrimStart().StartsWith("@AI", System.StringComparison.OrdinalIgnoreCase))
        {
            var question = request.Content.Substring(request.Content.IndexOf("@AI") + 3).Trim();
            if (!string.IsNullOrWhiteSpace(question))
            {
                // Fire and forget: Tránh block HTTP Request
                _ = Task.Run(async () =>
                {
                    try
                    {
                        var answer = await _ragService.AnswerQuestionAsync(resourceId, question);
                        // AI tự động trả lời bằng cách reply lại comment của user
                        var aiComment = await _discussionService.AddCommentAsync(resourceId, userId, answer, comment.Id);
                        
                        // Fake User Name & Avatar cho AI (Override trên DTO)
                        var aiDto = new
                        {
                            id = aiComment.Id,
                            resourceId = aiComment.ResourceId,
                            parentCommentId = aiComment.ParentCommentId,
                            authorName = "🤖 SmartLMS AI",
                            authorAvatar = "https://ui-avatars.com/api/?name=AI&background=0D8ABC&color=fff",
                            content = aiComment.Content,
                            upvotes = aiComment.Upvotes,
                            isPinned = false,
                            createdAt = aiComment.CreatedAt.ToString("o"),
                            replies = new object[0]
                        };

                        await _hubContext.Clients.Group($"Resource_{resourceId}").SendAsync("ReceiveResourceComment", aiDto);
                    }
                    catch (System.Exception ex)
                    {
                        System.Console.WriteLine($"[RAG ERROR] {ex.Message}");
                    }
                });
            }
        }

        return Ok(dto);
    }

    // Upvote bình luận
    [HttpPost("comments/{commentId}/upvote")]
    [Authorize]
    public async Task<IActionResult> UpvoteComment(int commentId)
    {
        var success = await _discussionService.UpvoteCommentAsync(commentId);
        if (!success) return NotFound(new { message = "Bình luận không tồn tại hoặc đã bị xóa." });
        return Ok(new { success = true });
    }

    // Xóa bình luận
    [HttpDelete("comments/{commentId}")]
    [Authorize]
    public async Task<IActionResult> DeleteComment(int commentId)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        bool isAdminOrMod = User.IsInRole("Admin") || User.IsInRole("Moderator");
        
        var success = await _discussionService.DeleteCommentAsync(commentId, userId, isAdminOrMod);
        if (!success) return Forbid("Bạn không có quyền xóa bình luận này.");
        
        return Ok(new { success = true });
    }

    // Báo cáo vi phạm
    [HttpPost("{resourceId}/report")]
    [Authorize]
    public async Task<IActionResult> ReportResource(int resourceId, [FromBody] ReportRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Reason))
            return BadRequest(new { message = "Vui lòng chọn lý do báo cáo." });

        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        await _discussionService.ReportContentAsync(resourceId, userId, request.Reason);
        
        return Ok(new { success = true, message = "Báo cáo của bạn đã được ghi nhận. Cảm ơn bạn đã đóng góp!" });
    }

    // Helpers
    private object MapToDto(ResourceComment c)
    {
        return new
        {
            id = c.Id,
            resourceId = c.ResourceId,
            parentCommentId = c.ParentCommentId,
            authorName = c.User?.FullName ?? "Ẩn danh",
            authorAvatar = $"https://ui-avatars.com/api/?name={System.Uri.EscapeDataString(c.User?.FullName ?? "U")}",
            content = c.Content,
            upvotes = c.Upvotes,
            isPinned = c.IsPinned,
            createdAt = c.CreatedAt.ToString("o"),
            replies = c.Replies?.Select(r => MapToDto(r))
        };
    }
}

public class PostCommentRequest
{
    public string Content { get; set; } = string.Empty;
    public int? ParentCommentId { get; set; }
}

public class ReportRequest
{
    public string Reason { get; set; } = string.Empty;
}
