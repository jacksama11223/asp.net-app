using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class StudentService : IStudentService
{
    private readonly string _connectionString;

    public StudentService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    private IDbConnection CreateConnection() => new SqlConnection(_connectionString);

    public async Task<IEnumerable<StudentViewModel>> GetAllStudentsAsync()
    {
        using var db = CreateConnection();
        
        // Truy vấn 1000+ sinh viên hiệu năng cao bằng SQL nguyên bản
        // Tính toán số lượng khóa học và tiến độ trung bình
        var sql = @"
            SELECT 
                u.UserId, 
                u.FullName, 
                u.Email,
                COUNT(e.EnrollmentId) as CourseCount,
                ISNULL(AVG(e.Progress), 0) as AvgProgress
            FROM Users u
            LEFT JOIN Enrollments e ON u.UserId = e.UserId
            WHERE u.Role = 'Student'
            GROUP BY u.UserId, u.FullName, u.Email";

        var students = await db.QueryAsync<StudentViewModel>(sql);
        
        // Gán Risk Level đơn giản (GIẢ LẬP AI)
        foreach (var s in students)
        {
            if (s.CourseCount > 0 && s.AvgProgress < 30)
                s.RiskLevel = "High";
            else if (s.CourseCount > 0 && s.AvgProgress < 70)
                s.RiskLevel = "Medium";
            else
                s.RiskLevel = "Low";
        }

        return students;
    }
}
