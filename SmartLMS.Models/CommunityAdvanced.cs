using System;
using System.Collections.Generic;

namespace SmartLMS.Models
{
    // Cảm xúc (Reactions)
    public class UserReaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public string EntityType { get; set; } = "Post"; // "Post" hoặc "Comment"
        public int EntityId { get; set; }
        public string ReactionType { get; set; } = "like"; // like, love, haha, wow, sad, angry, insightful
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    // Upvote / Downvote cho Comment
    public class CommentVote
    {
        public int Id { get; set; }
        public int CommentId { get; set; }
        public virtual Comment Comment { get; set; } = null!;
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public int VoteValue { get; set; } = 1; // 1 = Upvote, -1 = Downvote
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    // Lịch sử chỉnh sửa
    public class CommentEditHistory
    {
        public int Id { get; set; }
        public int CommentId { get; set; }
        public virtual Comment Comment { get; set; } = null!;
        public string OldContent { get; set; } = null!;
        public DateTime EditedAt { get; set; } = DateTime.Now;
    }

    // Bảng Khảo sát (Polls)
    public class Poll
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;
        public string Question { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? ExpiresAt { get; set; }
        public bool IsMultipleChoice { get; set; } = false;
        
        public virtual ICollection<PollOption> Options { get; set; } = new List<PollOption>();
    }

    // Tùy chọn khảo sát
    public class PollOption
    {
        public int Id { get; set; }
        public int PollId { get; set; }
        public virtual Poll Poll { get; set; } = null!;
        public string OptionText { get; set; } = null!;
        public int OrderIndex { get; set; } = 0;
        
        public virtual ICollection<PollVote> Votes { get; set; } = new List<PollVote>();
    }

    // Lượt bình chọn khảo sát
    public class PollVote
    {
        public int Id { get; set; }
        public int PollOptionId { get; set; }
        public virtual PollOption PollOption { get; set; } = null!;
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public DateTime VotedAt { get; set; } = DateTime.Now;
    }
}
