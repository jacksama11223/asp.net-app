using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Caching.Distributed;
using Dapper;
using SmartLMS.Business.Extensions;
using SmartLMS.Models;

namespace SmartLMS.Business
{
    public class AssessmentService : IAssessmentService
    {
        private readonly string _connectionString;
        private readonly IDistributedCache _cache;

        public AssessmentService(IConfiguration configuration, IDistributedCache cache)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
            _cache = cache;
        }

        public async Task<IEnumerable<dynamic>> GetLeaderboardAsync(int? departmentId = null)
        {
            string cacheKey = $"leaderboard_{departmentId ?? 0}";
            var leaderboard = await _cache.GetRecordAsync<List<dynamic>>(cacheKey);

            if (leaderboard == null)
            {
                using IDbConnection db = new SqlConnection(_connectionString);
                var sql = "SELECT TOP 10 FullName, Username, TotalXP FROM Users ";
                if (departmentId.HasValue) 
                    sql += "WHERE DepartmentId = @DeptId ";
                sql += "ORDER BY TotalXP DESC";

                var result = await db.QueryAsync<dynamic>(sql, new { DeptId = departmentId });
                leaderboard = result.ToList();

                // Cache trong 10 phút như đề xuất
                await _cache.SetRecordAsync(cacheKey, leaderboard, TimeSpan.FromMinutes(10));
            }
            return leaderboard;
        }

        public async Task<IEnumerable<Question>> GetQuestionsAsync(int hierarchyLevel, int? departmentId)
        {
            using IDbConnection db = new SqlConnection(_connectionString);
            var sql = "SELECT * FROM Questions ";
            if (hierarchyLevel > 1 && departmentId.HasValue) // Not SuperAdmin
                sql += "WHERE (DepartmentId = @DeptId OR DepartmentId IS NULL)";
            
            return await db.QueryAsync<Question>(sql, new { DeptId = departmentId });
        }

        public async Task<(IEnumerable<QuestionDto> Items, int TotalCount)> GetQuestionsPagedAsync(int hierarchyLevel, int? departmentId, int pageIndex, int pageSize, string? search = null)
        {
            using IDbConnection db = new SqlConnection(_connectionString);
            var sqlBase = "FROM Questions WHERE 1=1 ";
            var parameters = new DynamicParameters();

            if (hierarchyLevel > 1 && departmentId.HasValue)
            {
                sqlBase += " AND (DepartmentId = @DeptId OR DepartmentId IS NULL) ";
                parameters.Add("DeptId", departmentId);
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                // Mặc định dùng LIKE để đảm bảo tương thích 100% (Sẽ nâng cấp lên FTS nếu SQL Server có cài đặt)
                sqlBase += " AND Content LIKE @SearchLike ";
                parameters.Add("SearchLike", $"%{search}%");
            }

            var countSql = "SELECT COUNT(*) " + sqlBase;
            var dataSql = "SELECT * " + sqlBase + " ORDER BY QuestionId DESC OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY";

            parameters.Add("Offset", pageIndex * pageSize);
            parameters.Add("Limit", pageSize);

            var total = await db.ExecuteScalarAsync<int>(countSql, parameters);
            var items = await db.QueryAsync<QuestionDto>(dataSql, parameters);

            return (items, total);
        }

        public async Task<IEnumerable<Exam>> GetExamsAsync(int hierarchyLevel, int? departmentId)
        {
            using IDbConnection db = new SqlConnection(_connectionString);
            var sql = "SELECT * FROM Exams ";
            if (hierarchyLevel > 1 && departmentId.HasValue)
                sql += "WHERE DepartmentId = @DeptId";

            return await db.QueryAsync<Exam>(sql, new { DeptId = departmentId });
        }

        public async Task<IEnumerable<Badge>> GetBadgesAsync()
        {
            using IDbConnection db = new SqlConnection(_connectionString);
            return await db.QueryAsync<Badge>("SELECT * FROM Badges");
        }

        public async Task<IEnumerable<dynamic>> GetItemAnalysisAsync(int? departmentId = null)
        {
            using IDbConnection db = new SqlConnection(_connectionString);
            var sql = @"
                SELECT Q.QuestionId, 
                       COUNT(QA.AttemptId) as TotalAttempts,
                       AVG(CAST(QA.Score as Float)) as AvgScore
                FROM Questions Q
                LEFT JOIN QuizAttempts QA ON Q.QuestionId = Q.QuestionId
                ";
            if (departmentId.HasValue)
                sql += " WHERE Q.DepartmentId = @DeptId ";
            
            sql += " GROUP BY Q.QuestionId";

            return await db.QueryAsync<dynamic>(sql, new { DeptId = departmentId });
        }

        public async Task<bool> SaveQuestionAsync(Question question, int adminHierarchyLevel, int? adminDeptId)
        {
            // Security Check: Admin can only save to their department unless SuperAdmin
            if (adminHierarchyLevel > 1)
            {
                question.DepartmentId = adminDeptId;
            }

            using IDbConnection db = new SqlConnection(_connectionString);
            var sql = "";
            if (question.QuestionId == 0)
            {
                sql = "INSERT INTO Questions (CourseId, Content, Options, CorrectAnswer, XPValue, DepartmentId) VALUES (@CourseId, @Content, @Options, @CorrectAnswer, @XPValue, @DepartmentId)";
            }
            else
            {
                sql = "UPDATE Questions SET Content=@Content, Options=@Options, CorrectAnswer=@CorrectAnswer, XPValue=@XPValue, DepartmentId=@DepartmentId WHERE QuestionId=@QuestionId";
            }

            var rows = await db.ExecuteAsync(sql, question);
            return rows > 0;
        }
    }
}
