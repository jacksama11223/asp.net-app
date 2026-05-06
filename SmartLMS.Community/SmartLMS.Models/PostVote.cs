using System;

namespace SmartLMS.Models;

public class PostVote
{
    public int PostVoteId { get; set; }
    public int PostId { get; set; }
    public virtual Post Post { get; set; } = null!;
    
    public int UserId { get; set; }
    public virtual User User { get; set; } = null!;
    
    public int Value { get; set; } // 1 cho Upvote, -1 cho Downvote
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
