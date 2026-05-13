using SmartLMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface ICommunityService
{
    // Forum
    Task<IEnumerable<Post>> GetLatestPostsAsync(int count);
    Task<Post?> GetPostByIdAsync(int id);
    Task<Post> CreatePostAsync(Post post);
    
    // Events
    Task<IEnumerable<CommunityEvent>> GetUpcomingEventsAsync();
    
    // Resources
    Task<IEnumerable<CommunityResource>> GetRecentResourcesAsync();
}
