using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace SmartLMS.Business
{
    public class MockVideoTranscoderService : IVideoTranscoderService
    {
        private readonly ILogger<MockVideoTranscoderService> _logger;

        public MockVideoTranscoderService(ILogger<MockVideoTranscoderService> logger)
        {
            _logger = logger;
        }

        public async Task<bool> TranscodeToHlsAsync(int lessonId, string sourceVideoUrl)
        {
            _logger.LogInformation($"[FFMPEG MOCK] Đang khởi động tiến trình cắt Video (LessonId: {lessonId}): {sourceVideoUrl}");
            
            // Giả lập tiến trình cắt MP4 thành hệ thống m3u8 tốn rất nhiều thời gian (Mô phỏng 5 giây)
            // Trong thực tế, lúc này CPU Server Video Encoding sẽ full load 100%
            await Task.Delay(5000);

            _logger.LogInformation($"[FFMPEG MOCK] Hoàn tất nén HLS m3u8 (Chống tải lậu) cho LessonId: {lessonId}. Các file chunk đã được đẩy lên S3.");
            return true;
        }
    }
}
