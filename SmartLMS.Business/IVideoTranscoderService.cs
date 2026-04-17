using System.Threading.Tasks;

namespace SmartLMS.Business
{
    public interface IVideoTranscoderService
    {
        /// <summary>
        /// Nén và cắt Video MP4 truyền thống thành định dạng HLS (.m3u8) để chống download lậu.
        /// Chạy ngầm trong Background Server (Hangfire).
        /// </summary>
        Task<bool> TranscodeToHlsAsync(int lessonId, string sourceVideoUrl);
    }
}
