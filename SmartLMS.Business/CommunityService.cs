using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
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

    public async Task<IEnumerable<Post>> GetLatestPostsAsync(int count)
    {
        return await _context.Posts
            .Include(p => p.Author)
            .Where(p => p.IsPublished && !p.IsDeleted)
            .OrderByDescending(p => p.LastActivityAt)
            .Take(count)
            .ToListAsync();
    }

    public async Task<Post?> GetPostByIdAsync(int id)
    {
        return await _context.Posts
            .Include(p => p.Author)
            .Include(p => p.Comments).ThenInclude(c => c.Author)
            .FirstOrDefaultAsync(p => p.PostId == id && !p.IsDeleted);
    }

    public async Task<Post> CreatePostAsync(Post post)
    {
        post.CreatedAt = DateTime.Now;
        post.LastActivityAt = DateTime.Now;
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return post;
    }

    public async Task<IEnumerable<CommunityEvent>> GetUpcomingEventsAsync()
    {
        return await _context.CommunityEvents
            .Where(e => e.EventDate >= DateTime.Now && !e.IsDeleted)
            .OrderBy(e => e.EventDate)
            .ToListAsync();
    }

    public async Task<IEnumerable<CommunityResource>> GetRecentResourcesAsync()
    {
        return await _context.CommunityResources
            .Where(r => !r.IsDeleted)
            .OrderByDescending(r => r.CreatedAt)
            .Take(10)
            .ToListAsync();
    }
}
