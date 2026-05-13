using System;

namespace SmartLMS.Models;

public class CommunityResource
{
    public int CommunityResourceId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    
    public string ResourceType { get; set; } = "Ebook"; // vd: Ebook, Cheatsheet, Template
    public string FileUrl { get; set; } = null!;
    public long FileSize { get; set; } // Bytes
    
    public int UploaderId { get; set; }
    public virtual User Uploader { get; set; } = null!;
    
    public int DownloadCount { get; set; } = 0;
    public string? Category { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public bool IsDeleted { get; set; } = false;
}
