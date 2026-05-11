using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers.Api.Student;

[Route("api/messages")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class MessageApiController : ControllerBase
{
    private readonly SmartLMSContext _context;

    public MessageApiController(SmartLMSContext context)
    {
        _context = context;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendMessage([FromBody] MessageSendRequest request)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int senderId))
            return Unauthorized();

        var message = new DirectMessage
        {
            SenderId = senderId,
            ReceiverId = request.ReceiverId,
            CourseId = request.CourseId,
            Content = request.Content,
            SentAt = DateTime.UtcNow,
            IsRead = false
        };

        _context.DirectMessages.Add(message);
        await _context.SaveChangesAsync();

        return Ok(message);
    }

    [HttpGet("history/{courseId}/{otherUserId}")]
    public async Task<IActionResult> GetHistory(int courseId, int otherUserId)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int currentUserId))
            return Unauthorized();

        var messages = await _context.DirectMessages
            .Include(m => m.Sender)
            .Where(m => m.CourseId == courseId && 
                        ((m.SenderId == currentUserId && m.ReceiverId == otherUserId) || 
                         (m.SenderId == otherUserId && m.ReceiverId == currentUserId)))
            .OrderBy(m => m.SentAt)
            .Select(m => new {
                m.MessageId,
                m.SenderId,
                SenderName = m.Sender.FullName,
                m.Content,
                m.SentAt,
                m.IsRead
            })
            .ToListAsync();

        // Đánh dấu đã đọc
        var unreadMsgs = await _context.DirectMessages
            .Where(m => m.CourseId == courseId && m.ReceiverId == currentUserId && m.SenderId == otherUserId && !m.IsRead)
            .ToListAsync();
            
        if (unreadMsgs.Any())
        {
            unreadMsgs.ForEach(m => m.IsRead = true);
            await _context.SaveChangesAsync();
        }

        return Ok(messages);
    }

    [HttpGet("unread")]
    public async Task<IActionResult> GetUnreadCount()
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int currentUserId))
            return Unauthorized();

        var count = await _context.DirectMessages
            .CountAsync(m => m.ReceiverId == currentUserId && !m.IsRead);

        return Ok(new { count });
    }
}

public class MessageSendRequest
{
    public int ReceiverId { get; set; }
    public int CourseId { get; set; }
    public string Content { get; set; } = null!;
}
