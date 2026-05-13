using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string? Summary { get; set; }
    public string? Slug { get; set; } // Cho SEO (vd: /cong-dong/bai-viet-c-sharp)
    
    public int AuthorId { get; set; }
    public virtual User Author { get; set; } = null!;
    
    public string? Category { get; set; }
    public string? ThumbnailUrl { get; set; }
    
    public string? Tags { get; set; } // vd: "Python,Beginner"
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    public DateTime LastActivityAt { get; set; } = DateTime.Now;
    
    public int ViewCount { get; set; } = 0;
    public int VoteCount { get; set; } = 0;
    
    public int? VerifiedCommentId { get; set; } // ID của câu trả lời đã được xác thực
    
    [System.ComponentModel.DataAnnotations.Schema.ForeignKey("VerifiedCommentId")]
    public virtual Comment? VerifiedComment { get; set; }
    
    public bool IsPublished { get; set; } = true;
    public bool IsDeleted { get; set; } = false;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public virtual ICollection<PostVote> PostVotes { get; set; } = new List<PostVote>();
}
