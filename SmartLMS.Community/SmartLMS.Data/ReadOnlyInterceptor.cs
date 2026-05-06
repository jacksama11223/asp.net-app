using System.Data.Common;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;

namespace SmartLMS.Data;

public class ReadOnlyInterceptor : DbCommandInterceptor
{
    private readonly string _readOnlyConnectionString;

    public ReadOnlyInterceptor(IConfiguration configuration)
    {
        _readOnlyConnectionString = configuration.GetConnectionString("ReadOnlyConnection") 
            ?? configuration.GetConnectionString("DefaultConnection");
    }

    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command, 
        CommandEventData eventData, 
        InterceptionResult<DbDataReader> result)
    {
        // Tạm dừng logic chuyển hướng kết nối để ổn định MariaDB
        /*
        if (command.CommandText.StartsWith("SELECT", System.StringComparison.OrdinalIgnoreCase))
        {
            if (command.Connection.ConnectionString != _readOnlyConnectionString)
            {
                command.Connection.Close();
                command.Connection.ConnectionString = _readOnlyConnectionString;
                command.Connection.Open();
            }
        }
        */
        return result;
    }

    public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(
        DbCommand command, 
        CommandEventData eventData, 
        InterceptionResult<DbDataReader> result, 
        CancellationToken cancellationToken = default)
    {
        /*
        if (command.CommandText.StartsWith("SELECT", System.StringComparison.OrdinalIgnoreCase))
        {
            if (command.Connection.ConnectionString != _readOnlyConnectionString)
            {
                command.Connection.Close();
                command.Connection.ConnectionString = _readOnlyConnectionString;
                command.Connection.Open();
            }
        }
        */
        return new ValueTask<InterceptionResult<DbDataReader>>(result);
    }
}
