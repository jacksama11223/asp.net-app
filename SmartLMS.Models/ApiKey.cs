using System;
using System.ComponentModel.DataAnnotations;

namespace SmartLMS.Models
{
    public class ApiKey
    {
        [Key]
        public int KeyId { get; set; }

        public int OrganizationId { get; set; }
        public virtual Organization? Organization { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string HashedKey { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string KeyPreview { get; set; } = string.Empty;

        public DateTime? CreatedAt { get; set; }
        public DateTime? LastUsed { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
