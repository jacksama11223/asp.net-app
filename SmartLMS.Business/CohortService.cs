using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class CohortService : ICohortService
{
    private readonly string _connectionString;

    public CohortService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    private IDbConnection CreateConnection() => new SqlConnection(_connectionString);

    public async Task<IEnumerable<dynamic>> GetAllCohortsAsync()
    {
        using var db = CreateConnection();
        // Lấy danh sách cohort kèm số lượng sinh viên
        var sql = @"SELECT c.*, (SELECT COUNT(*) FROM UserCohorts WHERE CohortId = c.CohortId) as StudentCount 
                    FROM Cohorts c WHERE IsDeleted = 0";
        return await db.QueryAsync(sql);
    }

    public async Task<bool> CreateCohortAsync(string name, string description)
    {
        using var db = CreateConnection();
        var sql = "INSERT INTO Cohorts (Name, Description) VALUES (@Name, @Description)";
        var affected = await db.ExecuteAsync(sql, new { Name = name, Description = description });
        return affected > 0;
    }

    public async Task<IEnumerable<User>> GetStudentsInCohortAsync(int cohortId)
    {
        using var db = CreateConnection();
        var sql = @"SELECT u.* FROM Users u 
                    INNER JOIN UserCohorts uc ON u.UserId = uc.UserId 
                    WHERE uc.CohortId = @Id";
        return await db.QueryAsync<User>(sql, new { Id = cohortId });
    }

    public async Task<bool> AddStudentToCohortAsync(int userId, int cohortId)
    {
        using var db = CreateConnection();
        var sql = "IF NOT EXISTS (SELECT * FROM UserCohorts WHERE UserId = @UId AND CohortId = @CId) INSERT INTO UserCohorts (UserId, CohortId) VALUES (@UId, @CId)";
        var affected = await db.ExecuteAsync(sql, new { UId = userId, CId = cohortId });
        return affected > 0;
    }

    public async Task<bool> RemoveStudentFromCohortAsync(int userId, int cohortId)
    {
        using var db = CreateConnection();
        var sql = "DELETE FROM UserCohorts WHERE UserId = @UId AND CohortId = @CId";
        var affected = await db.ExecuteAsync(sql, new { UId = userId, CId = cohortId });
        return affected > 0;
    }
}
