using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IResourceRagService
{
    // Chạy ngầm bằng Hangfire khi Upload PDF
    Task ProcessPdfForRagAsync(int resourceId, string fileUrl); 
    
    // API gọi Real-time khi người dùng @AI
    Task<string> AnswerQuestionAsync(int resourceId, string question); 
}
