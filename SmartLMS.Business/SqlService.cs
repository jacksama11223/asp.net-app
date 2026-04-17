using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class SqlService : ISqlService
{
    private readonly string _connectionString;

    public SqlService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
    }

    private IDbConnection CreateConnection() => new SqlConnection(_connectionString);

    public async Task<SqlExecutionResult> ExecuteQueryAsync(string sql, string userName)
    {
        var result = new SqlExecutionResult { Success = true };
        using var db = CreateConnection();
        
        try
        {
            // Logging Audit (Async)
            var auditSql = "INSERT INTO SqlAuditLogs (UserName, QueryContent) VALUES (@UserName, @QueryContent); SELECT SCOPE_IDENTITY();";
            var auditId = await db.ExecuteScalarAsync<int>(auditSql, new { UserName = userName, QueryContent = sql });

            if (sql.Trim().StartsWith("SELECT", StringComparison.OrdinalIgnoreCase))
            {
                result.Data = await db.QueryAsync(sql);
                result.RowsAffected = ((List<dynamic>)result.Data).Count;
                result.Message = $"Duyệt thành công {result.RowsAffected} bản ghi.";
            }
            else
            {
                result.RowsAffected = await db.ExecuteAsync(sql);
                result.Message = $"Thực thi thành công. Số dòng bị ảnh hưởng: {result.RowsAffected}";
            }

            // Update Audit Status
            await db.ExecuteAsync("UPDATE SqlAuditLogs SET RowsAffected = @Rows, ExecutionStatus = 'Success' WHERE AuditId = @Id", 
                new { Rows = result.RowsAffected, Id = auditId });
        }
        catch (Exception ex)
        {
            result.Success = false;
            result.Error = ex.Message;
            result.Message = "Thực thi thất bại.";
            
            // Log Error to DB if possible
            try { 
                await db.ExecuteAsync("UPDATE SqlAuditLogs SET ExecutionStatus = 'Error', ErrorMessage = @Msg WHERE QueryContent = @Sql", 
                    new { Msg = ex.Message, Sql = sql }); 
            } catch { /* Silent */ }
        }

        return result;
    }

    public async Task<IEnumerable<dynamic>> GetDbHealthAsync()
    {
        using var db = CreateConnection();
        return await db.QueryAsync("sp_GetDBHealth", commandType: CommandType.StoredProcedure);
    }
}
