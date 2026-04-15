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

    [HttpPost]
    public async Task<IActionResult> Update(int id, string name, string description)
    {
        var success = await _cohortService.UpdateCohortAsync(id, name, description);
        return Json(new { success });
    }

    [HttpPost]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _cohortService.SoftDeleteCohortAsync(id);
        return Json(new { success });
    }

    [HttpPost]
    public async Task<IActionResult> ImportExcel(int cohortId, IFormFile file)
    {
        if (file == null || file.Length == 0) return Json(new { success = false, message = "File không hợp lệ." });

        using var stream = file.OpenReadStream();
        using var package = new OfficeOpenXml.ExcelPackage(stream);
        var worksheet = package.Workbook.Worksheets[0];
        int rowCount = worksheet.Dimension.Rows;
        int count = 0;

        for (int row = 2; row <= rowCount; row++) // Bỏ qua Header
        {
            try {
                var fullName = worksheet.Cells[row, 1].Value?.ToString();
                var email = worksheet.Cells[row, 2].Value?.ToString();
                var password = worksheet.Cells[row, 3].Value?.ToString() ?? "123456";
                var dobString = worksheet.Cells[row, 4].Value?.ToString();
                var hometown = worksheet.Cells[row, 5].Value?.ToString();

                if (string.IsNullOrEmpty(email)) continue;

                // 1. Tạo hoặc lấy User
                var user = await _userService.GetUserByEmailAsync(email);
                if (user == null)
                {
                    DateTime? dob = null;
                    if (DateTime.TryParse(dobString, out var d)) dob = d;

                    user = new SmartLMS.Models.User { 
                        FullName = fullName, 
                        Email = email, 
                        Username = email, 
                        UserType = "Student",
                        DateOfBirth = dob,
                        Hometown = hometown
                    };
                    await _userService.RegisterAsync(user, password);
                }

                // 2. Add to Cohort
                await _cohortService.AddStudentToCohortAsync(user.UserId, cohortId);
                count++;
            } catch { /* Bỏ qua dòng lỗi */ }
        }

        return Json(new { success = true, message = $"Đã nhập thành công {count} học viên vào lớp." });
    }
}
