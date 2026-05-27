using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class CommunityService : ICommunityService
{
    private readonly SmartLMSContext _context;

    public CommunityService(SmartLMSContext context)
    {
        _context = context;
    }

    // === 1. FORUM & FEED ===
    public async Task<IEnumerable<Post>> GetLatestPostsAsync()
    {
        return await _context.Posts
            .Include(p => p.Author)
            .Include(p => p.Comments)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<Post?> GetPostByIdAsync(int id)
    {
        return await _context.Posts
            .Include(p => p.Author)
            .Include(p => p.Comments).ThenInclude(c => c.Author)
            .FirstOrDefaultAsync(p => p.PostId == id);
    }

    public async Task<Post> CreatePostAsync(Post post)
    {
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return post;
    }

    public async Task<Comment> AddCommentAsync(Comment comment)
    {
        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();
        return comment;
    }

    public async Task<Repost> RepostAsync(int userId, int originalPostId, string? customComment)
    {
        var repost = new Repost
        {
            UserId = userId,
            OriginalPostId = originalPostId,
            CustomComment = customComment,
            RepostedAt = DateTime.UtcNow
        };
        _context.Reposts.Add(repost);
        
        // Gamification: Add points for reposting
        _context.UserActivityPoints.Add(new UserActivityPoint { 
            UserId = userId, 
            Points = 5, 
            ActivityType = "Repost" 
        });

        await _context.SaveChangesAsync();
        return repost;
    }

    // === 2. RESOURCE SHARING ===
    public async Task<IEnumerable<CommunityResource>> GetResourcesAsync(string? fileType = null, string? subject = null)
    {
        var query = _context.CommunityResources.Include(r => r.Uploader).AsQueryable();
        
        if (!string.IsNullOrEmpty(fileType))
            query = query.Where(r => r.FileType == fileType);
        
        if (!string.IsNullOrEmpty(subject))
            query = query.Where(r => r.Subject == subject);

        return await query.OrderByDescending(r => r.CreatedAt).ToListAsync();
    }

    public async Task<CommunityResource> UploadResourceAsync(CommunityResource resource)
    {
        _context.CommunityResources.Add(resource);
        await _context.SaveChangesAsync();
        return resource;
    }

    // === 3. EVENT LISTINGS ===
    public async Task<IEnumerable<CommunityEvent>> GetEventsAsync()
    {
        return await _context.CommunityEvents
            .Include(e => e.Participants)
            // .Where(e => e.IsApproved) // TODO: Mở lại sau khi chạy script thêm cột vào CSDL
            .OrderBy(e => e.EventDate)
            .ToListAsync();
    }

    public async Task<bool> RSVPToEventAsync(int eventId, int userId)
    {
        var alreadyRegistered = await _context.EventParticipants
            .AnyAsync(ep => ep.EventId == eventId && ep.UserId == userId);

        if (alreadyRegistered) return false;

        _context.EventParticipants.Add(new EventParticipant { EventId = eventId, UserId = userId });
        await _context.SaveChangesAsync();
        return true;
    }

    // === 4. Q&A SECTION ===
    public async Task<IEnumerable<CommunityQuestion>> GetQuestionsAsync(string status = "All")
    {
        var query = _context.CommunityQuestions.Include(q => q.Author).Include(q => q.Answers).AsQueryable(); // TODO: Thêm lại .Where(q => q.IsApproved) sau khi update DB
        
        if (status != "All")
            query = query.Where(q => q.Status == status);

        return await query.OrderByDescending(q => q.CreatedAt).ToListAsync();
    }

    public async Task<CommunityQuestion> AskQuestionAsync(CommunityQuestion question)
    {
        _context.CommunityQuestions.Add(question);
        await _context.SaveChangesAsync();
        return question;
    }

    public async Task<CommunityAnswer> AddAnswerAsync(CommunityAnswer answer)
    {
        _context.CommunityAnswers.Add(answer);
        await _context.SaveChangesAsync();
        return answer;
    }

    // === 5. STUDY GROUPS ===
    public async Task<IEnumerable<StudyGroup>> GetStudyGroupsAsync()
    {
        return await _context.StudyGroups
            .Include(g => g.Leader)
            .Include(g => g.Members)
            // .Where(g => g.IsApproved) // TODO: Mở lại sau khi chạy script thêm cột vào CSDL
            .OrderByDescending(g => g.EXP)
            .ToListAsync();
    }

    public async Task<bool> JoinGroupAsync(int groupId, int userId)
    {
        var inGroup = await _context.StudyGroupMembers
            .AnyAsync(m => m.GroupId == groupId && m.UserId == userId);

        if (inGroup) return false;

        _context.StudyGroupMembers.Add(new StudyGroupMember { GroupId = groupId, UserId = userId });
        await _context.SaveChangesAsync();
        return true;
    }

    // === 6. MEMBER DIRECTORY & GAMIFICATION ===
    public async Task<IEnumerable<User>> GetMembersAsync(string? role = null, string? skill = null)
    {
        // Giả định bảng User có các trường tương ứng hoặc lọc qua Profile
        var query = _context.Users.AsQueryable();
        if (!string.IsNullOrEmpty(role)) query = query.Where(u => u.Role == role);
        return await query.ToListAsync();
    }

    public async Task<IEnumerable<UserActivityPoint>> GetLeaderboardAsync()
    {
        return await _context.UserActivityPoints
            .Include(p => p.User)
            .GroupBy(p => p.UserId)
            .Select(g => new UserActivityPoint 
            { 
                UserId = g.Key, 
                User = g.First().User,
                Points = g.Sum(x => x.Points) 
            })
            .OrderByDescending(p => p.Points)
            .Take(10)
            .ToListAsync();
    }

    public async Task<IEnumerable<UserBadge>> GetUserBadgesAsync(int userId)
    {
        return await _context.UserBadges.Where(b => b.UserId == userId).ToListAsync();
    }
}
