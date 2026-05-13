using System;

namespace SmartLMS.Models;

public class CommunityEvent
{
    public int CommunityEventId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    
    public DateTime EventDate { get; set; }
    public string? Location { get; set; } // vd: "Zoom Link", "Google Meet"
    public string? EventUrl { get; set; }
    
    public int OrganizerId { get; set; }
    public virtual User Organizer { get; set; } = null!;
    
    public string? BannerUrl { get; set; }
    public bool IsOnline { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public bool IsDeleted { get; set; } = false;
}
