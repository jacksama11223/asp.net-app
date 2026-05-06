using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Business;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Web.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class CompilerController : ControllerBase
{
    private readonly ICompilerService _compilerService;
    private readonly SmartLMSContext _context;

    public CompilerController(ICompilerService compilerService, SmartLMSContext context)
    {
        _compilerService = compilerService;
        _context = context;
    }

    [HttpPost("execute")]
    public async Task<IActionResult> ExecuteCode([FromBody] ExecuteRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Code))
        {
            return BadRequest("Mã nguồn không được để trống.");
        }

        // Lấy danh sách test cases từ Database dựa trên ChallengeId
        var challenge = await _context.CodingChallenges
            .Include(c => c.TestCases)
            .FirstOrDefaultAsync(c => c.Id == request.ChallengeId);

        if (challenge == null)
        {
            return NotFound("Không tìm thấy thử thách lập trình này.");
        }

        var result = await _compilerService.ExecuteAsync(request.Code, request.Language, challenge.TestCases.ToList());

        return Ok(result);
    }

    [HttpGet("challenges")]
    public async Task<IActionResult> GetChallenges()
    {
        var challenges = await _context.CodingChallenges
            .Select(c => new { c.Id, c.Title, c.Points, c.Language })
            .ToListAsync();
        return Ok(challenges);
    }

    [HttpGet("challenges/{id}")]
    public async Task<IActionResult> GetChallengeDetail(int id)
    {
        var challenge = await _context.CodingChallenges
            .Include(c => c.TestCases.Where(tc => !tc.IsHidden)) // Chỉ gửi test case không ẩn về frontend
            .FirstOrDefaultAsync(c => c.Id == id);

        if (challenge == null) return NotFound();

        return Ok(challenge);
    }
}

public class ExecuteRequest
{
    public int ChallengeId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Language { get; set; } = "csharp";
}
