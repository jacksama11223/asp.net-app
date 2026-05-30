using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class ResourceBookmark
{
    public int ResourceId { get; set; }
    public CommunityResource? Resource { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class UserCollection
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsPublic { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<ResourceCollectionItem> Items { get; set; } = new List<ResourceCollectionItem>();
}

public class ResourceCollectionItem
{
    public int CollectionId { get; set; }
    public UserCollection? Collection { get; set; }
    public int ResourceId { get; set; }
    public CommunityResource? Resource { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
}

public class ResourceRating
{
    public int Id { get; set; }
    public int ResourceId { get; set; }
    public CommunityResource? Resource { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int Score { get; set; } // 1 to 5
    public string? ReviewText { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ResourceComment
{
    public int Id { get; set; }
    public int ResourceId { get; set; }
    public CommunityResource? Resource { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public string Content { get; set; } = string.Empty;
    public int? ParentCommentId { get; set; } // For nested replies
    public ResourceComment? ParentComment { get; set; }
    public ICollection<ResourceComment> Replies { get; set; } = new List<ResourceComment>();
    
    public int Upvotes { get; set; } = 0;
    public bool IsPinned { get; set; } = false;
    public bool IsDeleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

public class ResourceReport
{
    public int Id { get; set; }
    public int ResourceId { get; set; }
    public CommunityResource? Resource { get; set; }
    public int ReporterId { get; set; }
    public User? Reporter { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // Pending, Confirmed, Rejected
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ResolvedAt { get; set; }
}

public class ResourceShare
{
    public int Id { get; set; }
    public int ResourceId { get; set; }
    public CommunityResource? Resource { get; set; }
    public int? UserId { get; set; } // Optional: user who shared it
    public User? User { get; set; }
    public string? SharedVia { get; set; } // Facebook, Twitter, Direct Link
    public string? ExternalIpAddress { get; set; } // Tracking external clicks
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
