using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CurriculumController : ControllerBase
{
    private readonly ICurriculumService _curriculumService;

    public CurriculumController(ICurriculumService curriculumService)
    {
        _curriculumService = curriculumService;
    }

    [HttpGet("{courseId}")]
    [AllowAnonymous] // Cho phép xem syllabus trước khi mua
    public async Task<ActionResult<IEnumerable<CourseModule>>> GetCurriculum(int courseId)
    {
        var result = await _curriculumService.GetCurriculumAsync(courseId);
        return Ok(result);
    }

    [HttpPost("module")]
    [Authorize(Roles = "Admin,Instructor")]
    public async Task<ActionResult<CourseModule>> AddModule(int courseId, string title)
    {
        var result = await _curriculumService.AddModuleAsync(courseId, title);
        return Ok(result);
    }

    [HttpPost("lesson")]
    [Authorize(Roles = "Admin,Instructor")]
    public async Task<ActionResult<Lesson>> AddLesson(int moduleId, string title, string type)
    {
        var result = await _curriculumService.AddLessonAsync(moduleId, title, type);
        return Ok(result);
    }
}
