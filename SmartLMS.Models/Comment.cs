using System;

namespace SmartLMS.Models;

public class Comment
{
    public int CommentId { get; set; }
    public int PostId { get; set; }
    public virtual Post Post { get; set; } = null!;
    
    public int AuthorId { get; set; }
    public virtual User Author { get; set; } = null!;
    
    public string Content { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    
    public int? ParentId { get; set; } // Hỗ trợ reply (bình luận phân cấp)
    public bool IsDeleted { get; set; } = false;
    
    // Community Advanced Features
    public string? AttachmentIds { get; set; } // Chuỗi JSON chứa mảng file ID
    public bool IsPinned { get; set; } = false; // Ghim bình luận lên đầu
    public bool IsEdited { get; set; } = false; // Đã từng chỉnh sửa chưa

    public virtual ICollection<CommentVote> CommentVotes { get; set; } = new List<CommentVote>();
}
