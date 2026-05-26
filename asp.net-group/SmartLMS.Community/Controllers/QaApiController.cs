using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Security.Claims;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QaApiController : ControllerBase
{
    private readonly ICommunityService _service;
    public QaApiController(ICommunityService service) => _service = service;

    // GET /api/QaApi/questions?status=All
    [HttpGet("questions")]
    public async Task<IActionResult> GetQuestions([FromQuery] string status = "All")
    {
        var questions = await _service.GetQuestionsAsync(status);
        return Ok(questions);
    }

    // POST /api/QaApi/questions  [Authorize]
    [HttpPost("questions")]
    [Authorize]
    public async Task<IActionResult> AskQuestion([FromBody] AskQuestionRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Title) || string.IsNullOrWhiteSpace(req.Content))
            return BadRequest(new { message = "Tiêu đề và nội dung không được để trống." });

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var question = new CommunityQuestion
        {
            Title     = req.Title,
            Content   = req.Content,
            AuthorId  = userId,
            CreatedAt = DateTime.UtcNow,
            Status    = "Unsolved",
        };

        var result = await _service.AskQuestionAsync(question);
        return Ok(new { success = true, questionId = result.Id, message = "Câu hỏi đã được gửi!" });
    }

    // POST /api/QaApi/questions/{id}/answers  [Authorize]
    [HttpPost("questions/{id}/answers")]
    [Authorize]
    public async Task<IActionResult> AddAnswer(int id, [FromBody] AddAnswerRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Content))
            return BadRequest(new { message = "Nội dung câu trả lời không được để trống." });

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

        var answer = new CommunityAnswer
        {
            QuestionId = id,
            Content    = req.Content,
            AuthorId   = userId,
            CreatedAt  = DateTime.UtcNow,
            Votes      = 0,
            IsVerified = false,
        };

        var result = await _service.AddAnswerAsync(answer);
        return Ok(new { success = true, answerId = result.Id, message = "Câu trả lời đã được gửi!" });
    }
}

public record AskQuestionRequest(string Title, string Content);
public record AddAnswerRequest(string Content);
