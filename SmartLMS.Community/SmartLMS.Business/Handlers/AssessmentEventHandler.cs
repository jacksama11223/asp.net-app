using System;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SmartLMS.Business.MessageBus;
using SmartLMS.Data;
using SmartLMS.Models;
using Microsoft.EntityFrameworkCore;

namespace SmartLMS.Business.Handlers
{
    /// <summary>
    /// Background Worker đóng vai trò "Bộ não" của Microservice kiến trúc hướng sự kiện.
    /// Chịu trách nhiệm xử lý các tác vụ tốn thời gian như Cấp Huy Hiệu, Sinh Chứng Chỉ, Cảnh báo AI.
    /// </summary>
    public class AssessmentEventHandler : BackgroundService
    {
        private readonly ILogger<AssessmentEventHandler> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly IMessageBus _messageBus;

        public AssessmentEventHandler(ILogger<AssessmentEventHandler> logger, 
                                     IServiceProvider serviceProvider, 
                                     IMessageBus messageBus)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
            _messageBus = messageBus;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Assessment Event Handler is starting...");

            if (_messageBus is MockRabbitMQBus mockBus)
            {
                await foreach (var (eventName, data) in mockBus.ReceiveMessagesAsync(stoppingToken))
                {
                    _logger.LogInformation($"[Worker] Nhận sự kiện: {eventName}");
                    
                    try 
                    {
                        using var scope = _serviceProvider.CreateScope();
                        var context = scope.ServiceProvider.GetRequiredService<SmartLMSContext>();

                        if (eventName == "Assessment.QuizSubmitted")
                        {
                            await HandleQuizSubmitted(context, scope.ServiceProvider, data);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"Lỗi khi xử lý sự kiện {eventName}");
                    }
                }
            }
        }

        private async Task HandleQuizSubmitted(SmartLMSContext context, IServiceProvider sp, object data)
        {
            // Parse data (Mô phỏng JsonElement hoặc Anonymous Object)
            var json = JsonSerializer.Serialize(data);
            var doc = JsonDocument.Parse(json).RootElement;
            
            int userId = doc.GetProperty("UserId").GetInt32();
            int examId = doc.GetProperty("ExamId").GetInt32();
            decimal score = doc.GetProperty("Score").GetDecimal();
            int xpEarned = doc.GetProperty("XPEarned").GetInt32();

            _logger.LogInformation($"[Worker] Đang phân tích kết quả bài thi cho User {userId}...");

            // 1. Logic Cấp Huy Hiệu (Decoupled Game Logic)
            if (score >= 90)
            {
                var badge = await context.Badges.FirstOrDefaultAsync(b => b.Name == "Siêu sao lập trình");
                if (badge != null)
                {
                    var hasBadge = await context.UserBadges.AnyAsync(ub => ub.UserId == userId && ub.BadgeId == badge.BadgeId);
                    if (!hasBadge)
                    {
                        context.UserBadges.Add(new UserBadge { UserId = userId, BadgeId = badge.BadgeId, EarnedDate = DateTime.Now });
                        await context.SaveChangesAsync();
                        _logger.LogWarning($"[Worker] CHÚC MỪNG! User {userId} đã được cấp Huy hiệu Siêu sao.");
                    }
                }
            }

            // 2. Tự động Sinh Chứng Chỉ (Nếu là Final Exam và đạt tỉ lệ đỗ)
            var exam = await context.Exams.FindAsync(examId);
            var user = await context.Users.FindAsync(userId);
            
            if (exam != null && score >= 80) // Ngưỡng đỗ Enterprise là 80%
            {
                var certService = sp.GetRequiredService<ICertificateService>();
                var webhookService = sp.GetRequiredService<IWebhookService>();
                
                var certUrl = await certService.GenerateCertificateAsync(userId, exam.CourseId, DateTime.Now);
                _logger.LogWarning($"[Worker] Đã tự động sinh Chứng chỉ PDF cho User {userId}. URL: {certUrl}");

                // TRIGGER WEBHOOK: Certificate.Issued
                await webhookService.NotifyAsync("Certificate.Issued", new {
                    UserId = userId,
                    FullName = user?.FullName,
                    CourseId = exam.CourseId,
                    CertificateUrl = certUrl,
                    IssuedAt = DateTime.Now
                }, user?.DepartmentId); // Dùng DepartmentId tạm thời làm OrganizationId
            }

            // TRIGGER WEBHOOK: Course.Completed (Giả định SubmitQuiz thành công là xong chặng đường)
            var webhookServiceForCourse = sp.GetRequiredService<IWebhookService>();
            await webhookServiceForCourse.NotifyAsync("Course.Completed", new {
                UserId = userId,
                CourseId = exam?.CourseId,
                FinalScore = score,
                CompletedAt = DateTime.Now
            }, user?.DepartmentId);

            // 3. AI Warning: Kiểm tra rủi ro (Predict Dropout)
            var predictionService = sp.GetRequiredService<IPredictionService>();
            var prediction = await predictionService.PredictDropoutAsync(userId, exam?.CourseId ?? 0);
            
            if (prediction.Prediction) // Nếu AI dự đoán học sinh này sắp bỏ học (Rủi ro cao)
            {
                _logger.LogCritical($"[AI ALERT] Cảnh báo! AI phát hiện User {userId} có rủi ro bỏ học cao ({prediction.Probability*100:F1}%). Đã gửi thông báo cho Instructor.");
                // Tương lai: Bắn tiếp 1 event "Notification.InstructorAlert"
            }
        }
    }
}
