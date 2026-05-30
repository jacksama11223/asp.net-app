using MediatR;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Threading;
using System.Threading.Tasks;

namespace SmartLMS.Business.Handlers;

public class CommunityEventHandlers : 
    INotificationHandler<Events.ResourceViewedEvent>,
    INotificationHandler<Events.RatingSubmittedEvent>,
    INotificationHandler<Events.BookmarkAddedEvent>,
    INotificationHandler<Events.ResourceSharedEvent>
{
    private readonly SmartLMSContext _context;
    
    // Dependency Injection
    public CommunityEventHandlers(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task Handle(Events.ResourceViewedEvent notification, CancellationToken cancellationToken)
    {
        var resource = await _context.CommunityResources.FindAsync(new object[] { notification.ResourceId }, cancellationToken);
        if (resource != null)
        {
            resource.ViewCount++;
            resource.PopularityScore += 0.1; // Simple formula
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task Handle(Events.RatingSubmittedEvent notification, CancellationToken cancellationToken)
    {
        var resource = await _context.CommunityResources.FindAsync(new object[] { notification.ResourceId }, cancellationToken);
        if (resource != null)
        {
            // Calculate new average rating
            var allRatings = await _context.ResourceRatings
                .Where(r => r.ResourceId == notification.ResourceId)
                .ToListAsync(cancellationToken);
                
            resource.VoteCount = allRatings.Count;
            resource.Rating = allRatings.Any() ? allRatings.Average(r => r.Score) : 0;
            
            // Trending & Gamification logic
            if (resource.Rating >= 4.5 && resource.VoteCount >= 5)
            {
                resource.PopularityScore += 5; // Boost popularity
            }
            if (resource.Rating <= 1.5 && resource.VoteCount >= 3)
            {
                resource.PopularityScore -= 2; // Demote
                if(resource.VoteCount >= 10 && resource.Rating <= 1.2) {
                    resource.Status = "Flagged"; // Alert QA
                }
            }

            await _context.SaveChangesAsync(cancellationToken);
            
            // Here we could also publish another event like "AuthorXpRewardedEvent" if we had one.
        }
    }

    public async Task Handle(Events.BookmarkAddedEvent notification, CancellationToken cancellationToken)
    {
        var resource = await _context.CommunityResources.FindAsync(new object[] { notification.ResourceId }, cancellationToken);
        if (resource != null)
        {
            resource.BookmarkCount++;
            resource.PopularityScore += 1.0;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task Handle(Events.ResourceSharedEvent notification, CancellationToken cancellationToken)
    {
        var resource = await _context.CommunityResources.FindAsync(new object[] { notification.ResourceId }, cancellationToken);
        if (resource != null)
        {
            resource.ViralScore += 2.5; // High impact on viral score
            resource.PopularityScore += 2.0;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
