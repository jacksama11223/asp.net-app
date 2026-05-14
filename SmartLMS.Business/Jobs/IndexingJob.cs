using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using Microsoft.Extensions.Logging;

namespace SmartLMS.Business.Jobs;

public interface IIndexingJob
{
    Task SyncCoursesToSearchEngineAsync();
}

public class IndexingJob : IIndexingJob
{
    private readonly SmartLMSContext _context;
    private readonly ISqlService _sqlService; // Dùng ISqlService để thực hiện Full-text Search Index nếu cần
    private readonly ILogger<IndexingJob> _logger;

    public IndexingJob(SmartLMSContext context, ISqlService sqlService, ILogger<IndexingJob> logger)
    {
        _context = context;
        _sqlService = sqlService;
        _logger = logger;
    }

    public async Task SyncCoursesToSearchEngineAsync()
    {
        _logger.LogInformation("🔍 Starting Background Sync to Search Engine...");
        
        var courses = await _context.Courses
            .Where(c => c.Status == 1 && !c.IsDeleted)
            .ToListAsync();

        foreach (var course in courses)
        {
            // Logic: Đẩy dữ liệu vào Search Engine (VD: Elasticsearch)
            // Hiện tại ta sẽ mô phỏng việc đánh Index thành công
            _logger.LogInformation("Indexed course: {Title}", course.Title);
        }

        _logger.LogInformation("✅ Search Engine Indexing Completed. Total: {Count} items.", courses.Count);
    }
}
