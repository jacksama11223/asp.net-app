using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using Microsoft.Extensions.Logging;

namespace SmartLMS.Business.Jobs;

public interface IAuditCleanupJob
{
    Task CleanupOldLogsAsync();
}

public class AuditCleanupJob : IAuditCleanupJob
{
    private readonly SmartLMSContext _context;
    private readonly ILogger<AuditCleanupJob> _logger;

    public AuditCleanupJob(SmartLMSContext context, ILogger<AuditCleanupJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task CleanupOldLogsAsync()
    {
        _logger.LogInformation("Bắt đầu dọn dẹp Audit Log cũ (hơn 6 tháng)...");

        var cutoffDate = DateTime.Now.AddMonths(-6);
        
        // Sử dụng ExecuteDeleteAsync (EF Core 7+) để xóa nhanh mà không cần load vào RAM
        var deletedCount = await _context.AuditLogs
            .Where(x => x.Timestamp < cutoffDate)
            .ExecuteDeleteAsync();

        _logger.LogInformation($"Đã xóa thành công {deletedCount} bản ghi Audit Log cũ.");
    }
}
