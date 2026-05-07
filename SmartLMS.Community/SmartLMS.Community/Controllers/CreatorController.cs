using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Community.Controllers
{
    [Authorize(Roles = "Instructor")]
    public class CreatorController : Controller
    {
        private readonly ICourseService _courseService;
        private readonly IUserService _userService;

        public CreatorController(ICourseService courseService, IUserService userService)
        {
            _courseService = courseService;
            _userService = userService;
        }

        public async Task<IActionResult> Dashboard()
        {
            var userId = int.Parse(User.FindFirstValue("UserId") ?? "0");
            var allCourses = await _courseService.GetAllCoursesAsync();
            var myCourses = allCourses.Where(c => c.InstructorId == userId).ToList();

            ViewBag.CreatorName = User.Identity?.Name;
            ViewBag.TotalCourses = myCourses.Count;
            ViewBag.TotalStudents = 0; // Will be linked to Enrollments later
            ViewBag.TotalArticles = 0;
            ViewBag.Reputation = 5.0;

            return View(myCourses);
        }

        [HttpGet]
        public IActionResult Create() => View();

        [HttpPost]
        public async Task<IActionResult> Create(Course course)
        {
            var userId = int.Parse(User.FindFirstValue("UserId") ?? "0");
            course.InstructorId = userId;
            course.Status = "Published"; // Default to published for community

            await _courseService.CreateAsync(course);

            return RedirectToAction(nameof(Dashboard));
        }
    }
}
