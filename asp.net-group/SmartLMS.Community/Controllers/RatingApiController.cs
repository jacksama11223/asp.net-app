using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RatingApiController : ControllerBase
{
    private readonly SmartLMSContext _db;
    private readonly INotificationService _notificationService;

    public RatingApiController(SmartLMSContext db, INotificationService notificationService)
    {
        _db = db;
        _notificationService = notificationService;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> RateUser([FromBody] RateUserRequest req)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int reviewerId)) return Unauthorized();

        if (reviewerId == req.TargetUserId)
        {
            return BadRequest(new { message = "Bạn không thể tự đánh giá chính mình." });
        }

        if (req.Score < 1 || req.Score > 5)
        {
            return BadRequest(new { message = "Điểm đánh giá phải từ 1 đến 5 sao." });
        }

        var targetUser = await _db.Users.FindAsync(req.TargetUserId);
        if (targetUser == null)
        {
            return NotFound(new { message = "Người dùng không tồn tại." });
        }

        var existingRating = await _db.UserRatings
            .FirstOrDefaultAsync(r => r.ReviewerId == reviewerId && r.TargetUserId == req.TargetUserId);

        if (existingRating != null)
        {
            // Cập nhật đánh giá
            existingRating.Score = req.Score;
            existingRating.Comment = req.Comment;
            existingRating.CreatedAt = DateTime.UtcNow;
        }
        else
        {
            // Thêm mới
            var rating = new UserRating
            {
                ReviewerId = reviewerId,
                TargetUserId = req.TargetUserId,
                Score = req.Score,
                Comment = req.Comment,
                CreatedAt = DateTime.UtcNow
            };
            _db.UserRatings.Add(rating);
        }

        await _db.SaveChangesAsync();

        // Gửi thông báo cho Target User
        var reviewer = await _db.Users.FindAsync(reviewerId);
        string reviewerName = reviewer?.FullName ?? "Một thành viên";
        await _notificationService.NotifyUserAsync(
            req.TargetUserId, 
            "Đánh giá mới", 
            $"{reviewerName} vừa đánh giá bạn {req.Score} sao.",
            "Community",
            $"/Community/Profile/{reviewerId}"
        );

        return Ok(new { success = true, message = "Đánh giá của bạn đã được ghi nhận!" });
    }
}

public class RateUserRequest
{
    public int TargetUserId { get; set; }
    public int Score { get; set; }
    public string Comment { get; set; } = string.Empty;
}
