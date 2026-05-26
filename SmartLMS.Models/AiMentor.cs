using System.ComponentModel.DataAnnotations;

namespace SmartLMS.Models
{
    public class AiMentorRequest
    {
        [Required]
        public string Message { get; set; } = string.Empty;

        public string? ContextTopic { get; set; }
        
        public string UserId { get; set; } = string.Empty;
    }

    public class AiMentorResponse
    {
        public bool Success { get; set; }
        public string ResponseMessage { get; set; } = string.Empty;
        public string ProcessingTime { get; set; } = string.Empty;
        public string ModelUsed { get; set; } = "SmartLMS-Local-AI";
    }
}
