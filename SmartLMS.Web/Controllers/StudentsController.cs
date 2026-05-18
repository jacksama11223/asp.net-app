using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Threading.Tasks;
using System.Linq;
using System.Text;

namespace SmartLMS.Web.Controllers;

    public class StudentsController : Controller
    {
        private readonly IStudentService _studentService;
        private readonly IPredictionService _predictionService;

        public StudentsController(IStudentService studentService, IPredictionService predictionService)
        {
            _studentService = studentService;
            _predictionService = predictionService;
        }

        public IActionResult Index() => View();

        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _studentService.GetAllStudentsAsync();
            return Json(new { data = students });
        }

        [HttpPost]
        public async Task<IActionResult> Nudge(int id)
        {
            await _studentService.SendNudgeAsync(id);
            return Json(new { success = true, message = "Đã đưa thông báo vào hàng đợi gửi mail (Hangfire)." });
        }

        [HttpGet]
        public async Task<IActionResult> RiskAnalysis(int id)
        {
            // CourseId = 0 đại diện cho tổng quát toàn bộ khóa học
            var prediction = await _predictionService.PredictDropoutAsync(id, 0);
            return PartialView("_RiskAnalysisPartial", prediction);
        }

        [HttpGet]
        public async Task<IActionResult> ExportReport()
        {
            var students = await _studentService.GetAllStudentsAsync();
            var csv = new StringBuilder();
            csv.AppendLine("FullName,Email,CourseCount,AvgProgress,RiskLevel");
            foreach (var s in students)
            {
                csv.AppendLine($"{s.FullName},{s.Email},{s.CourseCount},{s.AvgProgress},{s.RiskLevel}");
            }
            return File(Encoding.UTF8.GetBytes(csv.ToString()), "text/csv", "students_risk_report.csv");
        }
    }
