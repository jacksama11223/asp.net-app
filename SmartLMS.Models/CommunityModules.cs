using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class CommunityResource
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty; // PDF, Video, Code
    public string FileUrl { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int VoteCount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int UploaderId { get; set; }
    public User? Uploader { get; set; }
}

public class CommunityEvent
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime EventDate { get; set; }
    public string Location { get; set; } = string.Empty; // Online, Zoom, Physical
    public string EventType { get; set; } = string.Empty; // Webinar, Workshop, Coding Session
    public int MaxParticipants { get; set; }
    public string Status { get; set; } = "Upcoming";
    public bool IsApproved { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<EventParticipant> Participants { get; set; } = new List<EventParticipant>();
}

public class EventParticipant
{
    public int EventId { get; set; }
    public CommunityEvent? Event { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public DateTime RSVPDate { get; set; } = DateTime.UtcNow;
}
