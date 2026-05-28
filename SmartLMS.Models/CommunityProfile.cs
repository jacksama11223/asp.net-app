using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartLMS.Models
{
    // Bảng lưu trữ liên kết chéo (Backlinks đa thực thể) cho Giai đoạn 4
    public class EntityBacklink
    {
        [Key]
        public int Id { get; set; }
        
        // Nguồn nhắc đến (Bình luận, Bài viết, v.v...)
        public string SourceType { get; set; } = null!; // "Post", "QaAnswer", "EventDiscussion", "GroupPost"
        public int SourceId { get; set; }
        
        // Mục tiêu bị nhắc đến (Bài viết, QA, Sự kiện, Nhóm)
        public string TargetType { get; set; } = null!; // "Post", "QA", "Event", "Group"
        public int TargetId { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // Bảng lưu trữ đánh giá chéo giữa các người dùng (1-5 sao, nhận xét) cho Giai đoạn 5
    public class UserRating
    {
        [Key]
        public int Id { get; set; }

        public int ReviewerId { get; set; }
        [ForeignKey("ReviewerId")]
        public virtual User? Reviewer { get; set; }

        public int TargetUserId { get; set; }
        [ForeignKey("TargetUserId")]
        public virtual User? TargetUser { get; set; }

        public int Score { get; set; } // 1 to 5
        public string? Comment { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
