using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface ISqlService
{
    Task<SqlExecutionResult> ExecuteQueryAsync(string sql, string userName);
    Task<IEnumerable<dynamic>> GetDbHealthAsync();
}

public class SqlExecutionResult
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public IEnumerable<dynamic>? Data { get; set; }
    public int RowsAffected { get; set; }
    public string? Error { get; set; }
}
