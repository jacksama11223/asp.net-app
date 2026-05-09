using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class DocumentPage
{
    public int DocumentPageId { get; set; }
    public string Title { get; set; } = "Untitled";
    public string? Content { get; set; } // Rich text or Markdown
    public string? Icon { get; set; } // Biểu tượng (Emoji hoặc URL)
    
    public int UserId { get; set; }
    public virtual User User { get; set; } = null!;
    
    public int? ParentId { get; set; } // Hỗ trợ cấu trúc thư mục lồng nhau
    public virtual DocumentPage? Parent { get; set; }
    public virtual ICollection<DocumentPage> Children { get; set; } = new List<DocumentPage>();
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    
    public bool IsPublic { get; set; } = false; // Cho phép chia sẻ hoặc cộng tác
    public bool IsDeleted { get; set; } = false;
}
