using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Linq;

namespace SmartLMS.Community.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ShareApiController : ControllerBase
    {
        private readonly SmartLMSContext _context;

        public ShareApiController(SmartLMSContext context)
        {
            _context = context;
        }

        [HttpPost("share")]
        public async Task<IActionResult> ShareContent([FromBody] ShareRequest req)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

            var sharedContent = new SharedContent
            {
                SenderId = userId,
                ContentType = req.ContentType,
                ContentId = req.ContentId,
                Message = req.Message ?? "",
                TargetGroupId = req.TargetType == "Group" ? req.TargetId : null,
                TargetUserId = req.TargetType == "User" ? req.TargetId : null,
                SharedAt = DateTime.UtcNow
            };

            _context.SharedContents.Add(sharedContent);
            
            // Format for chat/post:
            string formattedContent = $"[SHARED_{req.ContentType.ToUpper()}:{req.ContentId}]\n{req.Message}";

            if (req.TargetType == "Group")
            {
                var groupPost = new GroupPost
                {
                    GroupId = req.TargetId,
                    AuthorId = userId,
                    Content = formattedContent,
                    CreatedAt = DateTime.UtcNow
                };
                _context.GroupPosts.Add(groupPost);
            }
            else if (req.TargetType == "User")
            {
                var dm = new DirectMessage
                {
                    SenderId = userId,
                    ReceiverId = req.TargetId,
                    CourseId = 1, // Default to 1
                    Content = formattedContent,
                    SentAt = DateTime.UtcNow,
                    IsRead = false
                };
                _context.DirectMessages.Add(dm);
            }
            else 
            {
                return BadRequest(new { message = "Loại đích đến không hợp lệ (Group/User)" });
            }

            await _context.SaveChangesAsync();
            return Ok(new { success = true, message = "Đã chia sẻ thành công!" });
        }
    }

    public class ShareRequest
    {
        public string TargetType { get; set; } = string.Empty; // "Group" or "User"
        public int TargetId { get; set; } 
        public string ContentType { get; set; } = string.Empty; // "QA", "EVENT", "ATTACHMENT"
        public int ContentId { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
