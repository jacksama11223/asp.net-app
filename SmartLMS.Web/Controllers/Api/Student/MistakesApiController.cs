using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Security.Claims;

namespace SmartLMS.Web.Controllers.Api.Student;

[Authorize]
[ApiController]
[Route("api/student/[controller]")]
public class MistakesApiController : ControllerBase
{
    private readonly SmartLMSContext _context;

    public MistakesApiController(SmartLMSContext context)
    {
        _context = context;
    }

    // Lấy danh sách lỗi sai của học viên
    [HttpGet]
    public async Task<IActionResult> GetMistakes(int? courseId = null)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var query = _context.MistakeLogs
            .Include(m => m.Lesson)
            .Where(m => m.UserId == userId);

        if (courseId.HasValue)
        {
            query = query.Where(m => m.CourseId == courseId.Value);
        }

        var mistakes = await query
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

        return Ok(mistakes);
    }

    // Lưu lỗi sai mới
    [HttpPost]
    public async Task<IActionResult> LogMistake([FromBody] MistakeLog log)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        log.UserId = userId;
        log.CreatedAt = DateTime.UtcNow;
        
        // Logic Spaced Repetition cơ bản: Hẹn ôn tập sau 1 ngày cho lỗi mới
        log.NextReviewDate = DateTime.UtcNow.AddDays(1);
        
        _context.MistakeLogs.Add(log);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Đã lưu vào sổ tay lỗi sai!", logId = log.MistakeLogId });
    }

    // Đánh dấu đã hiểu và sửa lỗi
    [HttpPost("{id}/resolve")]
    public async Task<IActionResult> ResolveMistake(int id, [FromQuery] int confidence)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var mistake = await _context.MistakeLogs.FirstOrDefaultAsync(m => m.MistakeLogId == id && m.UserId == userId);

        if (mistake == null) return NotFound();

        mistake.IsResolved = true;
        mistake.ConfidenceLevel = confidence;
        
        // Nếu tự tin cao (>=4), hẹn ôn tập sau 7 ngày. Nếu thấp, hẹn sau 2 ngày.
        mistake.NextReviewDate = confidence >= 4 ? DateTime.UtcNow.AddDays(7) : DateTime.UtcNow.AddDays(2);

        await _context.SaveChangesAsync();
        return Ok(new { message = "Đã cập nhật trạng thái lỗi sai!" });
    }
}
