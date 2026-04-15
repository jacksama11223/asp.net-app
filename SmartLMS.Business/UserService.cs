using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SmartLMS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using BCrypt.Net;

namespace SmartLMS.Business;

public class UserService : IUserService
{
    private readonly string _connectionString;

    public UserService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    private IDbConnection CreateConnection() => new SqlConnection(_connectionString);

    public async Task<User?> AuthenticateAsync(string username, string password)
    {
        using var db = CreateConnection();
        var sql = "SELECT * FROM Users WHERE Username = @Username AND Status = 1";
        var user = await db.QueryFirstOrDefaultAsync<User>(sql, new { Username = username });

        if (user != null && !string.IsNullOrEmpty(user.PasswordHash))
        {
            try
            {
                if (BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                {
                    return user;
                }
            }
            catch (BCrypt.Net.SaltParseException)
            {
                // Nếu hash không hợp lệ, trả về null (có thể ghi log tại đây)
                return null;
            }
        }
        return null;
    }

    public async Task<bool> RegisterAsync(User user, string password)
    {
        using var db = CreateConnection();
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
        user.CreatedDate = DateTime.Now;
        user.Status = 1; // Mặc định là Active

        var sql = @"INSERT INTO Users (Username, FullName, Email, Role, PasswordHash, Status, CreatedDate) 
                    VALUES (@Username, @FullName, @Email, @Role, @PasswordHash, @Status, @CreatedDate)";
        
        var affected = await db.ExecuteAsync(sql, user);
        return affected > 0;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        using var db = CreateConnection();
        return await db.QueryAsync<User>("SELECT * FROM Users ORDER BY CreatedDate DESC");
    }

    public async Task<bool> UpdateUserStatusAsync(int userId, int status)
    {
        using var db = CreateConnection();
        var affected = await db.ExecuteAsync("UPDATE Users SET Status = @Status WHERE UserId = @Id", new { Status = status, Id = userId });
        return affected > 0;
    }

    public async Task<bool> SetPasswordAsync(int userId, string newPassword)
    {
        using var db = CreateConnection();
        var hash = BCrypt.Net.BCrypt.HashPassword(newPassword);
        var affected = await db.ExecuteAsync("UPDATE Users SET PasswordHash = @Hash WHERE UserId = @Id", new { Hash = hash, Id = userId });
        return affected > 0;
    }
}
