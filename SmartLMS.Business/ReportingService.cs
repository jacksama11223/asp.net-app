using Dapper;
using MySqlConnector;
using Microsoft.Extensions.Configuration;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IReportingService
{
    Task<DashboardStats> GetDashboardStatsAsync();
    Task<IEnumerable<RecentActivityViewModel>> GetRecentActivitiesAsync(int top = 5);
    Task<object> GetEngagementChartDataAsync();
    Task<object> GetRoleDistributionAsync();
}

public class ReportingService : IReportingService
{
    private readonly string _connectionString;

    public ReportingService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
    }

    private IDbConnection CreateConnection() => new MySqlConnection(_connectionString);

    public async Task<DashboardStats> GetDashboardStatsAsync()
    {
        using var db = CreateConnection();
        return await db.QueryFirstOrDefaultAsync<DashboardStats>("sp_GetDashboardStats", commandType: CommandType.StoredProcedure) ?? new DashboardStats();
    }

    public async Task<IEnumerable<RecentActivityViewModel>> GetRecentActivitiesAsync(int top = 5)
    {
        using var db = CreateConnection();
        return await db.QueryAsync<RecentActivityViewModel>(
            "sp_GetRecentActivity", 
            new { Top = top }, 
            commandType: CommandType.StoredProcedure);
    }

    public async Task<object> GetEngagementChartDataAsync()
    {
        using var db = CreateConnection();
        // Lấy lượt tương tác trong 7 ngày gần nhất
        var sql = @"
            SELECT 
                FORMAT(Timestamp, 'dd/MM') as Day,
                ActionType,
                COUNT(*) as Count
            FROM ActivityLogs
            WHERE Timestamp >= DATEADD(day, -7, GETDATE())
            GROUP BY FORMAT(Timestamp, 'dd/MM'), ActionType
            ORDER BY MIN(Timestamp)";
        
        var rows = await db.QueryAsync(sql);
        
        // Nhóm lại theo ActionType để ApexCharts dễ vẽ
        var categories = rows.Select(r => (string)r.Day).Distinct().ToList();
        var series = rows.GroupBy(r => (string)r.ActionType)
                         .Select(g => new {
                             name = g.Key,
                             data = categories.Select(c => g.FirstOrDefault(x => x.Day == c)?.Count ?? 0).ToList()
                         });

        return new { categories, series };
    }

    public async Task<object> GetRoleDistributionAsync()
    {
        using var db = CreateConnection();
        var sql = "SELECT Role, COUNT(*) as Count FROM Users GROUP BY Role";
        var rows = await db.QueryAsync(sql);
        
        return new {
            labels = rows.Select(r => (string)r.Role).ToList(),
            series = rows.Select(r => (int)r.Count).ToList()
        };
    }
}
