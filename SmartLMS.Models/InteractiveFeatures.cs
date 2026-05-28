using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SmartLMS.Models;

public class Attachment
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(255)]
    public string FileName { get; set; } = string.Empty;
    
    [Required]
    public string FileUrl { get; set; } = string.Empty;
    
    [MaxLength(50)]
    public string FileType { get; set; } = string.Empty; // pdf, zip, png, docx
    
    public long FileSize { get; set; } // in bytes
    
    public int UploaderId { get; set; }
    public User? Uploader { get; set; }
    
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
}

public class GroupPost
{
    [Key]
    public int Id { get; set; }
    
    public int GroupId { get; set; }
    public StudyGroup? Group { get; set; }
    
    public int AuthorId { get; set; }
    public User? Author { get; set; }
    
    [Required]
    public string Content { get; set; } = string.Empty;
    
    // Lưu danh sách Attachment IDs (VD: "1,2,5") vì SQLite/đơn giản hóa thiết kế, hoặc dùng bảng trung gian
    public string AttachmentIds { get; set; } = string.Empty;
    
    public int LikesCount { get; set; }
    public int CommentsCount { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<GroupPostComment> Comments { get; set; } = new List<GroupPostComment>();
}

public class GroupPostComment
{
    [Key]
    public int Id { get; set; }
    
    public int GroupPostId { get; set; }
    public GroupPost? Post { get; set; }
    
    public int AuthorId { get; set; }
    public User? Author { get; set; }
    
    [Required]
    public string Content { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class EventDiscussion
{
    [Key]
    public int Id { get; set; }
    
    public int EventId { get; set; }
    public CommunityEvent? Event { get; set; }
    
    public int AuthorId { get; set; }
    public User? Author { get; set; }
    
    [Required]
    public string Content { get; set; } = string.Empty;
    
    public string AttachmentIds { get; set; } = string.Empty;
    
    public int LikesCount { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class SharedContent
{
    [Key]
    public int Id { get; set; }
    
    public int SenderId { get; set; }
    public User? Sender { get; set; }
    
    [Required]
    public string ContentType { get; set; } = string.Empty; // GroupPost, EventDiscussion, Attachment
    
    public int ContentId { get; set; }
    
    public int? TargetGroupId { get; set; }
    public int? TargetUserId { get; set; }
    
    public string Message { get; set; } = string.Empty;
    
    public DateTime SharedAt { get; set; } = DateTime.UtcNow;
}
