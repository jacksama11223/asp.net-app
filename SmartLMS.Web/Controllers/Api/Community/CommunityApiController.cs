using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers.Api.Community;

[Route("api/community")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class CommunityApiController : ControllerBase
{
    private readonly SmartLMSContext _context;

    public CommunityApiController(SmartLMSContext context)
    {
        _context = context;
    }

    [HttpGet("posts")]
    public async Task<IActionResult> GetPosts(string? category = null, string? search = null)
    {
        var query = _context.Posts
            .Include(p => p.Author)
            .Where(p => !p.IsDeleted && p.IsPublished);

        if (!string.IsNullOrEmpty(category))
            query = query.Where(p => p.Category == category);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(p => p.Title.Contains(search) || p.Content.Contains(search));

        var posts = await query
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new
            {
                p.PostId,
                p.Title,
                p.Summary,
                p.Category,
                p.ThumbnailUrl,
                p.CreatedAt,
                p.ViewCount,
                p.VoteCount,
                CommentCount = p.Comments.Count,
                Author = new { p.Author.FullName, p.Author.UserId },
                HasVerifiedAnswer = p.VerifiedCommentId != null
            })
            .ToListAsync();

        return Ok(posts);
    }

    [HttpGet("posts/{id}")]
    public async Task<IActionResult> GetPostDetail(int id)
    {
        var post = await _context.Posts
            .Include(p => p.Author)
            .Include(p => p.Comments.Where(c => !c.IsDeleted))
                .ThenInclude(c => c.Author)
            .FirstOrDefaultAsync(p => p.PostId == id && !p.IsDeleted);

        if (post == null) return NotFound();

        // Increment view count
        post.ViewCount++;
        await _context.SaveChangesAsync();

        return Ok(post);
    }

    [HttpPost("posts")]
    public async Task<IActionResult> CreatePost([FromBody] Post post)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        post.AuthorId = userId;
        post.CreatedAt = DateTime.Now;
        post.UpdatedAt = DateTime.Now;
        
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return Ok(post);
    }

    [HttpPost("posts/{id}/comment")]
    public async Task<IActionResult> AddComment(int id, [FromBody] Comment comment)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        comment.PostId = id;
        comment.AuthorId = userId;
        comment.CreatedAt = DateTime.Now;

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        return Ok(comment);
    }

    [HttpPost("posts/{postId}/verify/{commentId}")]
    public async Task<IActionResult> VerifyAnswer(int postId, int commentId)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var post = await _context.Posts.FindAsync(postId);
        if (post == null) return NotFound("Post not found");

        // Chá»‰ tÃ¡c giáº£ hoáº·c Admin má»›i Ä‘Æ°á»£c verify
        if (post.AuthorId != userId && !User.IsInRole("Admin")) 
            return Forbid("Chá»‰ tÃ¡c giáº£ má»›i Ä‘Æ°á»£c xÃ¡c nháº­n cÃ¢u tráº£ lá»i.");

        post.VerifiedCommentId = commentId;
        await _context.SaveChangesAsync();

        return Ok(new { success = true });
    }
}

