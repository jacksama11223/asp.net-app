using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class ResourceRagService : IResourceRagService
{
    private readonly ILogger<ResourceRagService> _logger;

    public ResourceRagService(ILogger<ResourceRagService> logger)
    {
        _logger = logger;
    }

    public async Task ProcessPdfForRagAsync(int resourceId, string fileUrl)
    {
        // Hàm này sẽ được Hangfire gọi dưới nền (Background Thread)
        // 1. Dùng PDFBox / iTextSharp để extract text
        // 2. Chia text thành các đoạn nhỏ (Chunks)
        // 3. Gọi model text-embedding (Ollama / OpenAI)
        // 4. Lưu vector vào Vector Database (PgVector / Qdrant)

        _logger.LogInformation($"[Hangfire Job] Đang trích xuất Text và nhúng Vector (Embedding) PDF {fileUrl} cho Resource {resourceId}");
        
        // Giả lập thời gian xử lý AI
        await Task.Delay(3000); 
        
        _logger.LogInformation($"[Hangfire Job] Hoàn tất quá trình Vector hóa cho Resource {resourceId}!");
    }

    public async Task<string> AnswerQuestionAsync(int resourceId, string question)
    {
        // Quá trình Retrieval-Augmented Generation (RAG)
        // 1. Nhúng câu hỏi (question) thành Vector
        // 2. Truy vấn top K đoạn text (chunks) tương đồng nhất từ Vector Database
        // 3. Nạp chunks + câu hỏi vào Prompt
        // 4. Gọi LLM để sinh câu trả lời

        // Giả lập độ trễ mạng khi gọi LLM API
        await Task.Delay(2000); 

        return $"🤖 **AI SmartLMS trả lời:** Dựa trên nội dung tài liệu, câu trả lời cho \"{question}\" là: Phần này tập trung vào việc áp dụng kiến trúc phần mềm thực tế. Bạn có thể đọc kỹ phần hướng dẫn cấu hình ở trang số 4 của tài liệu để hiểu rõ hơn!";
    }
}
