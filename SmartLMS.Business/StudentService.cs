using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Hangfire;

namespace SmartLMS.Business;

    public class StudentService : IStudentService
    {
        private readonly string _connectionString;
        private readonly IPredictionService _predictionService;
        private readonly IEmailService _emailService;

        public StudentService(IConfiguration configuration, IPredictionService predictionService, IEmailService emailService)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _predictionService = predictionService;
            _emailService = emailService;
        }

        private IDbConnection CreateConnection() => new SqlConnection(_connectionString);

        public async Task<IEnumerable<StudentViewModel>> GetAllStudentsAsync()
        {
            using var db = CreateConnection();
            var sql = @"
                SELECT u.UserId, u.FullName, u.Email,
                       COUNT(e.EnrollmentId) as CourseCount,
                       ISNULL(AVG(e.Progress), 0) as AvgProgress
                FROM Users u
                LEFT JOIN Enrollments e ON u.UserId = e.UserId
                WHERE u.UserType = 'Student'
                GROUP BY u.UserId, u.FullName, u.Email";

            var students = await db.QueryAsync<StudentViewModel>(sql);
            
            foreach (var s in students)
            {
                // Thực tế nên dùng Batch hoặc lưu kết quả Score vào DB để nhanh hơn
                // Ở đây demo gọi trực tiếp cho danh sách nhỏ
                var prediction = await _predictionService.PredictDropoutAsync(s.UserId, 0); // CourseId = 0 là trung bình
                s.RiskLevel = prediction.Prediction ? "High" : (prediction.Probability > 0.3 ? "Medium" : "Low");
            }

            return students;
        }

        public async Task SendNudgeAsync(int userId)
        {
            // Đẩy task gửi mail vào hàng đợi Hangfire
            // User.FullName và Email nên lấy từ DB trong Job để đảm bảo data mới nhất
            Hangfire.BackgroundJob.Enqueue(() => ProcessNudgeEmail(userId));
        }

        // Phương thức này sẽ được Hangfire gọi ngầm
        public async Task ProcessNudgeEmail(int userId)
        {
            using var db = CreateConnection();
            var user = await db.QueryFirstOrDefaultAsync<User>("SELECT * FROM Users WHERE UserId = @Id", new { Id = userId });
            if (user == null || string.IsNullOrEmpty(user.Email)) return;

            string subject = "🔔 Cảnh báo tiến độ học tập - SmartLMS.AI";
            string body = $"Chào {user.FullName}, chúng tôi nhận thấy bạn đang gặp khó khăn trong việc hoàn thành khóa học. Hãy quay lại học tập ngay hôm nay nhé!";
            
            await _emailService.SendEmailAsync(user.Email, subject, body);
        }
    }
