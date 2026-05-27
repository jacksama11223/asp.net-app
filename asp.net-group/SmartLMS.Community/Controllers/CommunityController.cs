using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using SmartLMS.Data;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace SmartLMS.Community.Controllers;

[Route("hub")]
[Route("")]
public class CommunityController : Controller
{
    private readonly ICommunityService _communityService;
    private readonly IForumService _forumService;

    public CommunityController(ICommunityService communityService, IForumService forumService)
    {
        _communityService = communityService;
        _forumService = forumService;
    }

    // 1. Discussion Forum (Default) - NOW USING FORUM SERVICE FOR THE NEW UI
    [HttpGet("")]
    public async Task<IActionResult> Index(int page = 1)
    {
        var posts = await _forumService.GetForumFeedAsync(page);
        var viewModel = new SmartLms.Community.ViewModels.ForumFeedViewModel
        {
            Posts = posts.Select(p => new SmartLms.Community.ViewModels.ForumPostViewModel
            {
                Id = p.PostId.ToString(),
                Title = p.Title,
                Content = p.Summary ?? (p.Content.Length > 150 ? p.Content.Substring(0, 150) + "..." : p.Content),
                Tag = string.IsNullOrEmpty(p.Tags) ? "Thảo Luận" : p.Tags,
                Category = string.IsNullOrEmpty(p.Category) ? "Chung" : p.Category,
                AuthorName = p.Author?.FullName ?? "Ẩn danh",
                AuthorRole = "Học viên",
                AuthorAvatar = "https://ui-avatars.com/api/?name=" + Uri.EscapeDataString(p.Author?.FullName ?? "User"),
                CreatedAt = p.CreatedAt,
                Likes = p.VoteCount,
                CommentsCount = p.Comments?.Count ?? 0,
                Comments = p.Comments?.OrderBy(c => c.CreatedAt).Select(c => new SmartLms.Community.ViewModels.ForumCommentViewModel
                {
                    Id = c.CommentId.ToString(),
                    Content = c.Content,
                    AuthorId = c.AuthorId.ToString(),
                    AuthorName = c.Author?.FullName ?? "Ẩn danh",
                    AuthorAvatar = "https://ui-avatars.com/api/?name=" + Uri.EscapeDataString(c.Author?.FullName ?? "User"),
                    CreatedAt = c.CreatedAt.ToString("dd/MM HH:mm")
                }).ToList() ?? new System.Collections.Generic.List<SmartLms.Community.ViewModels.ForumCommentViewModel>()
            }).ToList()
        };
        return View(viewModel);
    }

    [HttpGet("post/new")]
    public IActionResult Create()
    {
        return View();
    }

    [HttpPost("post/new")]
    public async Task<IActionResult> SubmitPost([FromForm] string Title, [FromForm] string Content, [FromForm] string Category, [FromForm] string Tags, [FromServices] SmartLMSContext db)
    {
        var userIdStr = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out int userId)) userId = 1; // Fallback for local testing

        var post = new Post
        {
            Title = Title,
            Content = Content,
            Category = Category,
            Tags = Tags,
            AuthorId = userId,
            CreatedAt = DateTime.UtcNow,
            IsPublished = false, // Chờ duyệt
            IsDeleted = false
        };

        db.Posts.Add(post);
        await db.SaveChangesAsync();

        TempData["WelcomeMessage"] = "Bài viết của bạn đã được gửi và đang chờ Admin duyệt.";
        return Redirect("/hub");
    }

    // Post Details (Phase 1)
    [HttpGet("post/{id}")]
    public async Task<IActionResult> Details(int id, [FromServices] SmartLMSContext db)
    {
        var post = await db.Posts
            .Include(p => p.Author)
            .Include(p => p.Comments)
                .ThenInclude(c => c.Author)
            .FirstOrDefaultAsync(p => p.PostId == id);

        if (post == null || (!post.IsPublished && !User.IsInRole("Admin") && !User.IsInRole("Moderator") && post.AuthorId.ToString() != User.FindFirst(ClaimTypes.NameIdentifier)?.Value))
        {
            return NotFound("Bài viết không tồn tại hoặc chưa được duyệt.");
        }

        // Tăng view count
        post.ViewCount++;
        await db.SaveChangesAsync();

        return View(post);
    }

    [HttpPost("post/{id}/comment")]
    [Authorize]
    public async Task<IActionResult> AddComment(int id, [FromForm] string content, [FromServices] SmartLMSContext db)
    {
        if (string.IsNullOrWhiteSpace(content))
        {
            return BadRequest("Nội dung bình luận không được để trống.");
        }

        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out int userId))
        {
            return Unauthorized();
        }

        var post = await db.Posts.FindAsync(id);
        if (post == null || (!post.IsPublished && !User.IsInRole("Admin") && !User.IsInRole("Moderator") && post.AuthorId != userId))
        {
            return NotFound("Bài viết không tồn tại.");
        }

        var comment = new Comment
        {
            PostId = id,
            AuthorId = userId,
            Content = content,
            CreatedAt = DateTime.UtcNow,
            IsDeleted = false
        };

        db.Comments.Add(comment);
        post.VoteCount++; // Có thể thưởng điểm tương tác cho bài viết
        await db.SaveChangesAsync();

        var authorName = User.Identity?.Name ?? $"User {userId}";
        var avatarUrl = User.FindFirst("AvatarUrl")?.Value ?? $"https://ui-avatars.com/api/?name={Uri.EscapeDataString(authorName)}&background=random";

        return Json(new {
            success = true,
            comment = new {
                id = comment.CommentId,
                content = comment.Content,
                authorId = comment.AuthorId,
                authorName = authorName,
                authorAvatar = avatarUrl,
                createdAt = comment.CreatedAt.ToString("dd/MM HH:mm")
            }
        });
    }

    [HttpPost("post/{id}/upvote")]
    [Authorize]
    public async Task<IActionResult> Upvote(int id, [FromServices] SmartLMSContext db)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var post = await db.Posts.FindAsync(id);
        if (post == null || (!post.IsPublished && !User.IsInRole("Admin") && !User.IsInRole("Moderator")))
        {
            return NotFound(new { success = false, message = "Bài viết không tồn tại." });
        }

        var existingVote = await db.Set<PostVote>().FirstOrDefaultAsync(v => v.PostId == id && v.UserId == userId);
        if (existingVote != null)
        {
            // Toggle bỏ vote
            db.Set<PostVote>().Remove(existingVote);
            post.VoteCount--;
        }
        else
        {
            // Thêm vote mới
            db.Set<PostVote>().Add(new PostVote { PostId = id, UserId = userId });
            post.VoteCount++;
        }
        
        await db.SaveChangesAsync();

        return Json(new { success = true, newVoteCount = post.VoteCount, upvoted = existingVote == null });
    }

    // 2. Resource Sharing
    [HttpGet("resources")]
    [HttpGet("/Community/Resources")]
    public async Task<IActionResult> Resources(string? fileType, string? subject)
    {
        var resources = await _communityService.GetResourcesAsync(fileType, subject);
        return View(resources);
    }

    // 3. Event Listings
    [HttpGet("events")]
    [HttpGet("/Community/Events")]
    public async Task<IActionResult> Events()
    {
        var events = await _communityService.GetEventsAsync();
        return View(events);
    }

    // 4. Member Directory
    [HttpGet("members")]
    [HttpGet("/Community/Members")]
    public async Task<IActionResult> Members(string? role, string? skill)
    {
        var members = await _communityService.GetMembersAsync(role, skill);
        return View(members);
    }

    // 5. Q&A Section
    [HttpGet("qa")]
    [HttpGet("/Community/QA")]
    public async Task<IActionResult> QA(string status = "All")
    {
        var questions = await _communityService.GetQuestionsAsync(status);
        return View(questions);
    }

    // 6. Study Groups
    [HttpGet("groups")]
    [HttpGet("/Community/Groups")]
    public async Task<IActionResult> Groups()
    {
        var groups = await _communityService.GetStudyGroupsAsync();
        return View(groups);
    }

    // 7. Leaderboard
    [HttpGet("leaderboard")]
    [HttpGet("/Community/Leaderboard")]
    public async Task<IActionResult> Leaderboard()
    {
        var topUsers = await _communityService.GetLeaderboardAsync();
        return View(topUsers);
    }

    // 8. Mentor
    [HttpGet("mentor")]
    [HttpGet("/Community/Mentor")]
    public IActionResult Mentor() { return View(); }


    // 9. Profile Page
    [HttpGet("profile/{id}")]
    [HttpGet("/Community/Profile/{id}")]
    public async Task<IActionResult> Profile(int id, [FromServices] SmartLMSContext db)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.UserId == id);
        if (user == null) return NotFound();

        ViewBag.RecentPosts = await db.Posts
            .Where(p => p.AuthorId == id && p.IsPublished && !p.IsDeleted)
            .OrderByDescending(p => p.CreatedAt)
            .Take(5)
            .ToListAsync();
            
        ViewBag.Badges = await db.UserBadges
            .Where(b => b.UserId == id)
            .ToListAsync();
            
        // Calculate total EXP
        var points = await db.UserActivityPoints.Where(p => p.UserId == id).SumAsync(p => p.Points);
        ViewBag.TotalEXP = points;

        return View(user);
    }

    // 10. Real-time Messaging
    [HttpGet("messages")]
    [HttpGet("/Community/Messages")]
    [Authorize]
    public IActionResult Messages()
    {
        return View();
    }

    // --- NEW API ENDPOINTS FOR FORUM FEED ---

    [HttpPost("SimulateAiDraft")]
    public async Task<IActionResult> SimulateAiDraft([FromBody] AiDraftRequest request)
    {
        if (string.IsNullOrEmpty(request.Prompt)) return BadRequest("Prompt is empty");
        var result = await _forumService.DraftAiResponseAsync(request.Prompt);
        return Json(new { title = "Phân tích từ Trợ Lý AI", body = result });
    }

    [HttpPost("SimulateCompileSandbox")]
    public async Task<IActionResult> SimulateCompileSandbox([FromBody] CompileRequest request)
    {
        if (string.IsNullOrEmpty(request.Code)) return BadRequest("Code is empty");
        var result = await _forumService.AnalyzeMemoryAllocationAsync(request.Code);
        return Json(new { result = result });
    }

    [HttpPost("CompleteShareReward")]
    public async Task<IActionResult> CompleteShareReward([FromBody] ShareRewardRequest request)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            userId = 1;

        bool success = await _forumService.RewardShareExperienceAsync(userId, request.PostId, request.Format);
        if (success) return Ok(new { success = true, message = "Bạn đã được cộng +15 XP!" });
        return BadRequest(new { success = false, message = "Lỗi xử lý." });
    }

    [HttpGet("/api/seed-posts")]
    public async Task<IActionResult> SeedPosts([FromServices] SmartLMSContext db)
    {
        var admin = await db.Users.FirstOrDefaultAsync(u => u.Email == "admin" || u.Role == "Admin");
        int adminId = admin?.UserId ?? 1;

        if (!db.Posts.Any(p => p.Title.Contains("NullReferenceException")))
        {
            db.Posts.Add(new Post {
                Title = "Cách xử lý lỗi NullReferenceException trong Dependency Injection?",
                Content = "Chào mọi người, mình đang code dự án cuối kỳ nhưng luôn bị văng lỗi NullReferenceException khi gọi `_emailService` trong HomeController.\n\n```csharp\npublic HomeController(IEmailService emailService)\n{\n    // Quên gán biến cục bộ\n}\n```",
                AuthorId = adminId,
                Category = "Bug Report",
                Tags = "C# Advanced",
                IsPublished = true,
                CreatedAt = DateTime.UtcNow
            });
            db.Posts.Add(new Post {
                Title = "Chia sẻ mẹo dùng RecyclableMemoryStream để tránh rò rỉ RAM",
                Content = "Hôm nay mình đọc được bài về cấu hình kịch bản dọn rác (Garbage Collector). Thay vì dùng mảng byte liên tục, các bạn có thể mượn memory manager của pool để giảm tải cho Gen 0.\n\nCode mẫu:\n```csharp\nusing var stream = memoryManager.GetStream();\n```",
                AuthorId = adminId,
                Category = "Study Tips",
                Tags = "C# Advanced",
                IsPublished = true,
                CreatedAt = DateTime.UtcNow
            });
            await db.SaveChangesAsync();
            return Ok("Đã Seed 2 bài viết thành công!");
        }
        return Ok("Seed thành công 2 bài viết mới.");
    }

    [HttpGet("/api/chat/history")]
    public async Task<IActionResult> GetChatHistory([FromServices] SmartLMSContext db)
    {
        var messages = await db.CommunityChatMessages
            .OrderByDescending(m => m.Timestamp)
            .Take(50)
            .ToListAsync();
            
        // Đảo ngược lại để hiện tin cũ trước, tin mới sau
        messages.Reverse();

        return Json(messages.Select(m => new
        {
            id = m.Id,
            name = m.SenderName,
            avatar = string.IsNullOrEmpty(m.SenderAvatar) ? "https://ui-avatars.com/api/?name=U" : m.SenderAvatar,
            text = m.MessageText,
            postUrl = m.PostUrl,
            previewTitle = m.PreviewTitle,
            previewDesc = m.PreviewDesc,
            reactionsJson = m.ReactionsJson,
            timestamp = m.Timestamp.ToString("o")
        }));
    }

}

public class AiDraftRequest { public string Prompt { get; set; } = string.Empty; }
public class CompileRequest { public string Code { get; set; } = string.Empty; }
public class ShareRewardRequest { public string PostId { get; set; } = string.Empty; public string Format { get; set; } = string.Empty; }
