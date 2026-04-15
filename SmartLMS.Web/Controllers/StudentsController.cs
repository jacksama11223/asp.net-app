using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

public class StudentsController : Controller
{
    private readonly IStudentService _studentService;

    public StudentsController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public async Task<IActionResult> GetStudents()
    {
        var students = await _studentService.GetAllStudentsAsync();
        return Json(new { data = students });
    }

    [HttpPost]
    public IActionResult Nudge(int id)
    {
        // Giả lập gửi thông báo AI
        return Json(new { success = true, message = $"Đã gửi thông báo nhắc nhở tới sinh viên ID: {id}" });
    }
}
