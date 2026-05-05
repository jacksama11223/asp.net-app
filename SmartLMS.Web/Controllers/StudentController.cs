using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly SmartLMSContext _context;

    public StudentController(SmartLMSContext context)
    {
        _context = context;
    }

    [HttpGet("enrolled-courses")]
    public async Task<ActionResult<IEnumerable<Enrollment>>> GetEnrolledCourses()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var enrollments = await _context.Enrollments
            .Include(e => e.Course)
            .ThenInclude(c => c!.Instructor)
            .Where(e => e.UserId == userId && !e.IsDeleted)
            .ToListAsync();

        return Ok(enrollments);
    }
}
