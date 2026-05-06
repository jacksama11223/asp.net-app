using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Web.Controllers;

public class CodingChallengeManagementController : Controller
{
    private readonly SmartLMSContext _context;

    public CodingChallengeManagementController(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var challenges = await _context.CodingChallenges
            .Include(c => c.Course)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();
        return View(challenges);
    }

    public async Task<IActionResult> Create()
    {
        ViewBag.Courses = await _context.Courses.ToListAsync();
        return View(new CodingChallenge());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CodingChallenge challenge)
    {
        if (ModelState.IsValid)
        {
            _context.Add(challenge);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        ViewBag.Courses = await _context.Courses.ToListAsync();
        return View(challenge);
    }

    public async Task<IActionResult> Edit(int id)
    {
        var challenge = await _context.CodingChallenges
            .Include(c => c.TestCases)
            .FirstOrDefaultAsync(m => m.Id == id);
        
        if (challenge == null) return NotFound();

        ViewBag.Courses = await _context.Courses.ToListAsync();
        return View(challenge);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, CodingChallenge challenge)
    {
        if (id != challenge.Id) return NotFound();

        if (ModelState.IsValid)
        {
            _context.Update(challenge);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(challenge);
    }

    [HttpPost]
    public async Task<IActionResult> AddTestCase(int challengeId, string input, string expectedOutput)
    {
        var testCase = new TestCase
        {
            CodingChallengeId = challengeId,
            Input = input,
            ExpectedOutput = expectedOutput
        };
        _context.TestCases.Add(testCase);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Edit), new { id = challengeId });
    }
}
