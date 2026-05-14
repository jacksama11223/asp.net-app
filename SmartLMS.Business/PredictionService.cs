using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class PredictionService : IPredictionService
{
    private readonly SmartLMSContext _context;

    public PredictionService(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task<double> PredictStudentRiskAsync(int userId, int courseId)
    {
        // Luồng AI: Phân tích dựa trên MistakeLog
        var mistakes = await _context.MistakeLogs
            .Where(m => m.UserId == userId && m.CourseId == courseId)
            .CountAsync();

        var totalAttempts = await _context.QuizAttempts
            .Where(a => a.UserId == userId)
            .CountAsync();

        // Thuật toán AI đơn giản (Sẽ được nâng cấp bằng ML.NET Model)
        // Risk = (Số lỗi / Tổng lần làm bài) * 100
        if (totalAttempts == 0) return 0;
        
        double risk = (double)mistakes / (totalAttempts * 2) * 100;
        return risk > 100 ? 100 : risk;
    }

    public async Task TrainModelAsync()
    {
        // Logic: Chạy ML.NET để huấn luyện lại Model dựa trên dữ liệu lịch sử trong DB
        // Sẽ được thực hiện trên Server 156 (Worker) để tránh tốn RAM server chính
        await Task.Delay(1000); // Simulate training
    }
}
