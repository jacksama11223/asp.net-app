using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace SmartLMS.Web.Controllers;

public class SqlRequest
{
    public string? Sql { get; set; }
}

[Authorize(Roles = "Admin")]
public class SqlManagementController : Controller
{
    private readonly ISqlService _sqlService;

    public SqlManagementController(ISqlService sqlService)
    {
        _sqlService = sqlService;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Execute([FromBody] SqlRequest request)
    {
        string? sql = request.Sql;
        if (string.IsNullOrWhiteSpace(sql)) return Json(new { success = false, message = "SQL không được để trống." });

        var result = await _sqlService.ExecuteQueryAsync(sql, "Admin_Master");
        return Json(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetHealth()
    {
        var health = await _sqlService.GetDbHealthAsync();
        return Json(health);
    }
}
