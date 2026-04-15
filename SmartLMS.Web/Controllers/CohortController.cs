using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

[Authorize(Roles = "Admin")]
public class CohortController : Controller
{
    private readonly ICohortService _cohortService;
    private readonly IUserService _userService;

    public CohortController(ICohortService cohortService, IUserService userService)
    {
        _cohortService = cohortService;
        _userService = userService;
    }

    public async Task<IActionResult> Index()
    {
        var cohorts = await _cohortService.GetAllCohortsAsync();
        return View(cohorts);
    }

    [HttpPost]
    public async Task<IActionResult> Create(string name, string description)
    {
        var success = await _cohortService.CreateCohortAsync(name, description);
        return Json(new { success });
    }

    public async Task<IActionResult> Members(int id)
    {
        var students = await _cohortService.GetStudentsInCohortAsync(id);
        ViewBag.CohortId = id;
        return View(students);
    }

    [HttpPost]
    public async Task<IActionResult> AddStudent(int userId, int cohortId)
    {
        var success = await _cohortService.AddStudentToCohortAsync(userId, cohortId);
        return Json(new { success });
    }

    [HttpPost]
    public async Task<IActionResult> RemoveStudent(int userId, int cohortId)
    {
        var success = await _cohortService.RemoveStudentFromCohortAsync(userId, cohortId);
        return Json(new { success });
    }
}
