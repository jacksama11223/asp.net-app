using Dapper;
using Microsoft.Data.SqlClient;
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
}

public class ReportingService : IReportingService
{
    private readonly string _connectionString;

    public ReportingService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    private IDbConnection CreateConnection() => new SqlConnection(_connectionString);

    public async Task<DashboardStats> GetDashboardStatsAsync()
    {
        using var db = CreateConnection();
        return await db.QueryFirstOrDefaultAsync<DashboardStats>("sp_GetDashboardStats", commandType: CommandType.StoredProcedure);
    }

    public async Task<IEnumerable<RecentActivityViewModel>> GetRecentActivitiesAsync(int top = 5)
    {
        using var db = CreateConnection();
        return await db.QueryAsync<RecentActivityViewModel>(
            "sp_GetRecentActivity", 
            new { Top = top }, 
            commandType: CommandType.StoredProcedure);
    }
}
