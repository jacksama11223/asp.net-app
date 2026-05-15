using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

[Authorize]
public class CodingChallengeController : Controller
{
    private readonly ICompilerService _compilerService;
    private readonly SmartLMS.Data.SmartLMSContext _context;

    public CodingChallengeController(ICompilerService compilerService, SmartLMS.Data.SmartLMSContext context)
    {
        _compilerService = compilerService;
        _context = context;
    }

    public async Task<IActionResult> Solve(int id)
    {
        var challenge = await _context.CodingChallenges
            .Include(c => c.TestCases)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (challenge == null) return NotFound();

        return View(challenge);
    }

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] SubmissionDto submission)
    {
        var challenge = await _context.CodingChallenges
            .Include(c => c.TestCases)
            .FirstOrDefaultAsync(c => c.Id == submission.ChallengeId);

        if (challenge == null) return NotFound();

        var result = await _compilerService.ExecuteAsync(submission.Code, challenge.Language, challenge.TestCases.ToList());
        
        // Luồng Mistake Analysis: Nếu sai, ghi log lại
        if (!result.Success || result.TestCaseResults.Any(t => !t.Passed))
        {
            _context.MistakeLogs.Add(new MistakeLog
            {
                UserId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0"),
                CourseId = challenge.CourseId ?? 0,
                LessonId = challenge.LessonId ?? 0,
                MistakeType = "CodingError",
                CorrectionNote = result.Message,
                CreatedAt = System.DateTime.Now
            });
            await _context.SaveChangesAsync();
        }

        return Json(result);
    }
}

public class SubmissionDto
{
    public int ChallengeId { get; set; }
    public string Code { get; set; } = string.Empty;
}
