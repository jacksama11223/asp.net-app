using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartLMS.Models
{
    public class CommunityChatMessage
    {
        [Key]
        public int Id { get; set; }

        public string? SenderId { get; set; }

        [Required]
        [MaxLength(100)]
        public string SenderName { get; set; } = string.Empty;

        [MaxLength(255)]
        public string SenderAvatar { get; set; } = string.Empty;

        [Required]
        public string MessageText { get; set; } = string.Empty;

        [MaxLength(500)]
        public string PostUrl { get; set; } = string.Empty;

        [MaxLength(255)]
        public string PreviewTitle { get; set; } = string.Empty;

        [MaxLength(500)]
        public string PreviewDesc { get; set; } = string.Empty;

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        
        public string ReactionsJson { get; set; } = "{}";
    }
}
