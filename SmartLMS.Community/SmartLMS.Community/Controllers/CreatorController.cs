using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Linq;

namespace SmartLMS.Community.Controllers
{
    public class CreatorController : Controller
    {
        private readonly ICourseService _courseService;

        public CreatorController(ICourseService courseService)
        {
            _courseService = _courseService;
        }

        public async Task<IActionResult> Dashboard()
        {
            // Mock data for Creator (Will be linked to Logged-in Instructor later)
            ViewBag.CreatorName = "Giảng viên Cao cấp";
            ViewBag.TotalCourses = 5;
            ViewBag.TotalStudents = 1250;
            ViewBag.TotalArticles = 12;
            ViewBag.Reputation = 4.8;

            return View();
        }
    }
}
