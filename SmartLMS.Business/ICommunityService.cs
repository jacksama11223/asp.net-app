using SmartLMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface ICommunityService
{
    // === 1. FORUM & FEED ===
    Task<IEnumerable<Post>> GetLatestPostsAsync();
    Task<Post?> GetPostByIdAsync(int id);
    Task<Post> CreatePostAsync(Post post);
    Task<Comment> AddCommentAsync(Comment comment);
    Task<Repost> RepostAsync(int userId, int originalPostId, string? customComment);
    
    // === 2. RESOURCE SHARING ===
    Task<IEnumerable<CommunityResource>> GetResourcesAsync(string? fileType = null, string? subject = null);
    Task<CommunityResource> UploadResourceAsync(CommunityResource resource);
    Task<bool> BookmarkResourceAsync(int resourceId, int userId);
    Task<bool> RateResourceAsync(int resourceId, int userId, int score, string? reviewText = null);
    Task<bool> IncrementViewCountAsync(int resourceId);
    Task<bool> IncrementDownloadCountAsync(int resourceId);
    
    // === 3. EVENT LISTINGS ===
    Task<IEnumerable<CommunityEvent>> GetEventsAsync();
    Task<CommunityEvent> CreateEventAsync(CommunityEvent ev);
    Task<bool> RSVPToEventAsync(int eventId, int userId);
    
    // === 4. Q&A SECTION ===
    Task<IEnumerable<CommunityQuestion>> GetQuestionsAsync(string status = "All");
    Task<CommunityQuestion> AskQuestionAsync(CommunityQuestion question);
    Task<CommunityAnswer> AddAnswerAsync(CommunityAnswer answer);
    
    // === 5. STUDY GROUPS ===
    Task<IEnumerable<StudyGroup>> GetStudyGroupsAsync();
    Task<StudyGroup> CreateGroupAsync(StudyGroup group);
    Task<bool> JoinGroupAsync(int groupId, int userId);
    
    // === 6. MEMBER DIRECTORY & GAMIFICATION ===
    Task<IEnumerable<User>> GetMembersAsync(string? role = null, string? skill = null);
    Task<IEnumerable<UserActivityPoint>> GetLeaderboardAsync();
    Task<IEnumerable<UserBadge>> GetUserBadgesAsync(int userId);
}
