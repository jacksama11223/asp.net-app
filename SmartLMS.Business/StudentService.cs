using Dapper;
using MySqlConnector;
using Microsoft.EntityFrameworkCore;
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
        private readonly SmartLMSContext _context;

        public StudentService(IConfiguration configuration, IPredictionService predictionService, IEmailService emailService, SmartLMSContext context)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
            _predictionService = predictionService;
            _emailService = emailService;
            _context = context;
        }

        private IDbConnection CreateConnection() => new MySqlConnection(_connectionString);

        public async Task<IEnumerable<StudentViewModel>> GetAllStudentsAsync()
        {
            using var db = CreateConnection();
            var sql = @"
                SELECT u.UserId, u.FullName, u.Email,
                       COUNT(e.EnrollmentId) as CourseCount,
                       IFNULL(AVG(e.Progress), 0) as AvgProgress
                FROM Users u
                LEFT JOIN Enrollments e ON u.UserId = e.UserId
                WHERE u.Role = 'Student' OR u.UserType = 'Student'
                GROUP BY u.UserId, u.FullName, u.Email";

            var students = await db.QueryAsync<StudentViewModel>(sql);
            var allEnrollments = await db.QueryAsync<dynamic>("SELECT UserId, CourseId FROM Enrollments");
            var userEnrollments = allEnrollments.ToLookup(x => (int)x.UserId, x => (int)x.CourseId);

            foreach (var s in students)
            {
                var courseIds = userEnrollments[s.UserId].ToList();
                if (courseIds.Any())
                {
                    double totalProbability = 0;
                    foreach(var c in courseIds)
                    {
                        // includeXai = false để tăng tốc độ lặp danh sách
                        var prediction = await _predictionService.PredictDropoutAsync(s.UserId, c, false);
                        totalProbability += prediction.Probability;
                    }
                    var avgProb = totalProbability / courseIds.Count;
                    s.RiskLevel = avgProb > 0.5 ? "High" : (avgProb > 0.3 ? "Medium" : "Low");
                }
                else
                {
                    s.RiskLevel = "Low";
                }
            }

            return students;
        }

        public Task SendNudgeAsync(int userId)
        {
            // Đẩy task gửi mail vào hàng đợi Hangfire
            // User.FullName và Email nên lấy từ DB trong Job để đảm bảo data mới nhất
            Hangfire.BackgroundJob.Enqueue(() => ProcessNudgeEmail(userId));
            return Task.CompletedTask;
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

        public async Task<object> GetCourseContentForWorkspaceAsync(int courseId, string userId)
        {
            var modules = await _context.CourseModules
                .Include(m => m.Lessons)
                .Where(m => m.CourseId == courseId)
                .OrderBy(m => m.OrderIndex)
                .ToListAsync();

            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.CourseId == courseId && e.UserId == userId);

            return new {
                Modules = modules,
                Progress = enrollment?.Progress ?? 0
            };
        }

        public async Task LogMistakeAsync(MistakeLog log)
        {
            _context.MistakeLogs.Add(log);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MistakeLog>> GetMistakeNotebookAsync(string userId, int courseId)
        {
            return await _context.MistakeLogs
                .Include(m => m.Lesson)
                .Where(m => m.UserId == userId && m.Lesson.Module.CourseId == courseId)
                .ToListAsync();
        }

        public async Task AskQuestionAsync(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Flashcard>> GetFlashcardsForLessonAsync(int lessonId)
        {
            return await _context.Flashcards
                .Where(f => f.LessonId == lessonId)
                .ToListAsync();
        }

        public async Task UpdateFlashcardProgressAsync(int flashcardId, bool wasCorrect)
        {
            var card = await _context.Flashcards.FindAsync(flashcardId);
            if (card == null) return;

            card.LastReviewDate = DateTime.UtcNow;
            if (wasCorrect)
            {
                card.IntervalDays *= 2; // Simple multiplier
                card.NextReviewDate = DateTime.UtcNow.AddDays(card.IntervalDays);
            }
            else
            {
                card.IntervalDays = 1;
                card.NextReviewDate = DateTime.UtcNow.AddDays(1);
            }
            await _context.SaveChangesAsync();
        }
    }
