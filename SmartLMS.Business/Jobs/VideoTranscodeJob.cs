using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SmartLMS.Data;

namespace SmartLMS.Business.Jobs
{
    public class VideoTranscodeJob
    {
        private readonly SmartLMSContext _context;
        private readonly IVideoTranscoderService _transcoderService;
        private readonly ILogger<VideoTranscodeJob> _logger;

        public VideoTranscodeJob(SmartLMSContext context, IVideoTranscoderService transcoderService, ILogger<VideoTranscodeJob> logger)
        {
            _context = context;
            _transcoderService = transcoderService;
            _logger = logger;
        }

        // Hàm này sẽ được Hangfire gọi dưới nền (Background Thread)
        public async Task ProcessLessonVideoAsync(int lessonId, string sourceVideoUrl)
        {
            try
            {
                _logger.LogInformation($"[Hangfire Job] Bắt đầu Encode Video (Lesson {lessonId})");
                
                var success = await _transcoderService.TranscodeToHlsAsync(lessonId, sourceVideoUrl);

                if (success)
                {
                    // Update Database mark target lesson as "Video Ready"
                    var lesson = await _context.Lessons.FindAsync(lessonId);
                    if (lesson != null)
                    {
                        lesson.VideoUrl = $"https://d123cdn.cloudfront.net/hls-streams/lesson_{lessonId}/playlist.m3u8"; 
                        // Note: Bổ sung trường bool IsVideoProcessing = false nếu Database có
                        await _context.SaveChangesAsync();
                        _logger.LogInformation($"[Hangfire Job] Hoàn tất và cập nhật DB khóa học!");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[Hangfire Job] Lỗi khi cắt Video cho Lesson {lessonId}");
                throw; // Throw để Hangfire biết Job xịt và tự động Retry
            }
        }
    }
}
