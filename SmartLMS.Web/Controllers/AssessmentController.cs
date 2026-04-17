using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace SmartLMS.Web.Controllers;

[Authorize(Roles = "Admin")]
public class AssessmentController : Controller
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public AssessmentController(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection") ?? "";
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<IActionResult> Leaderboard()
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = "SELECT TOP 10 FullName, Username, TotalXP FROM Users ORDER BY TotalXP DESC";
        var topUsers = await connection.QueryAsync<dynamic>(sql);
        return View(topUsers);
    }

    public IActionResult QuizWizard()
    {
        return View();
    }
}
