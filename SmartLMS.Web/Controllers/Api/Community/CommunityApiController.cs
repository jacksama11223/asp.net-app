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
            .Include(p => p.Comments.Where(c => !c.IsDeleted))
                .ThenInclude(c => c.CommentVotes)
            .FirstOrDefaultAsync(p => p.PostId == id && !p.IsDeleted);

        if (post == null) return NotFound();

        // Increment view count
        post.ViewCount++;
        await _context.SaveChangesAsync();

        // Build threaded comments tree
        var allComments = post.Comments.Select(c => new
        {
            c.CommentId,
            c.Content,
            c.CreatedAt,
            c.ParentId,
            c.IsPinned,
            c.IsEdited,
            c.AttachmentIds,
            Upvotes = c.CommentVotes?.Count(v => v.VoteValue == 1) ?? 0,
            Downvotes = c.CommentVotes?.Count(v => v.VoteValue == -1) ?? 0,
            Author = new { c.Author.FullName, c.Author.UserId }
        }).ToList();

        var rootComments = allComments.Where(c => c.ParentId == null).Select(c => new
        {
            Comment = c,
            Replies = allComments.Where(r => r.ParentId == c.CommentId).ToList()
        }).OrderByDescending(c => c.Comment.IsPinned).ThenBy(c => c.Comment.CreatedAt).ToList();

        return Ok(new
        {
            post.PostId,
            post.Title,
            post.Content,
            post.CreatedAt,
            post.ViewCount,
            post.VoteCount,
            post.VerifiedCommentId,
            Author = new { post.Author.FullName, post.Author.UserId },
            ThreadedComments = rootComments
        });
    }

    [HttpPost("posts")]
    public async Task<IActionResult> CreatePost([FromBody] Post post)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
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
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
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
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var post = await _context.Posts.FindAsync(postId);
        if (post == null) return NotFound("Post not found");

        // Chỉ tác giả hoặc Admin mới được verify
        if (post.AuthorId != userId && !User.IsInRole("Admin")) 
            return Forbid("Chỉ tác giả mới được xác nhận câu trả lời.");

        post.VerifiedCommentId = commentId;
        await _context.SaveChangesAsync();

        return Ok(new { success = true });
    }

    [HttpPut("comments/{id}")]
    public async Task<IActionResult> EditComment(int id, [FromBody] Comment updateModel)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var comment = await _context.Comments.FindAsync(id);
        if (comment == null || comment.IsDeleted) return NotFound();

        if (comment.AuthorId != userId && !User.IsInRole("Admin")) return Forbid();

        // Lưu lịch sử
        _context.CommentEditHistories.Add(new CommentEditHistory
        {
            CommentId = comment.CommentId,
            OldContent = comment.Content,
            EditedAt = DateTime.Now
        });

        comment.Content = updateModel.Content;
        comment.IsEdited = true;
        await _context.SaveChangesAsync();

        return Ok(comment);
    }

    [HttpDelete("comments/{id}")]
    public async Task<IActionResult> DeleteComment(int id)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var comment = await _context.Comments.FindAsync(id);
        if (comment == null || comment.IsDeleted) return NotFound();

        if (comment.AuthorId != userId && !User.IsInRole("Admin")) return Forbid();

        comment.IsDeleted = true; // Soft delete
        await _context.SaveChangesAsync();

        return Ok(new { success = true });
    }

    [HttpPost("posts/{id}/react")]
    public async Task<IActionResult> ReactToPost(int id, [FromQuery] string type)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var existing = await _context.UserReactions.FirstOrDefaultAsync(r => r.EntityId == id && r.EntityType == "Post" && r.UserId == userId);
        
        if (existing != null)
        {
            if (existing.ReactionType == type) {
                _context.UserReactions.Remove(existing); // Unlike
            } else {
                existing.ReactionType = type; // Change reaction
            }
        }
        else
        {
            _context.UserReactions.Add(new UserReaction { UserId = userId, EntityId = id, EntityType = "Post", ReactionType = type });
        }
        
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    [HttpPost("comments/{id}/vote")]
    public async Task<IActionResult> VoteComment(int id, [FromQuery] int vote)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        if (vote != 1 && vote != -1) return BadRequest("Vote value must be 1 or -1.");

        var existing = await _context.CommentVotes.FirstOrDefaultAsync(v => v.CommentId == id && v.UserId == userId);
        
        if (existing != null)
        {
            if (existing.VoteValue == vote)
            {
                _context.CommentVotes.Remove(existing); // Xóa vote (toggle off)
            }
            else
            {
                existing.VoteValue = vote; // Đổi chiều vote
            }
        }
        else
        {
            _context.CommentVotes.Add(new CommentVote { UserId = userId, CommentId = id, VoteValue = vote });
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }
}
