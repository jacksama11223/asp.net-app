using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ClosedXML.Excel;
using System;

namespace SmartLMS.Web.Controllers;

[Authorize(Roles = "Admin")]
public class UserManagementController : Controller
{
    private readonly IUserService _userService;

    public UserManagementController(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<IActionResult> Index()
    {
        var users = await _userService.GetAllUsersAsync();
        return View(users);
    }

    [HttpPost]
    public async Task<IActionResult> UpdateStatus(int userId, int status)
    {
        var success = await _userService.UpdateUserStatusAsync(userId, status);
        return Json(new { success });
    }

    [HttpGet]
    public async Task<IActionResult> ExportToExcel()
    {
        var users = await _userService.GetAllUsersAsync();

        using (var workbook = new XLWorkbook())
        {
            var worksheet = workbook.Worksheets.Add("Users");
            var currentRow = 1;

            // Headers
            worksheet.Cell(currentRow, 1).Value = "ID";
            worksheet.Cell(currentRow, 2).Value = "Full Name";
            worksheet.Cell(currentRow, 3).Value = "Username";
            worksheet.Cell(currentRow, 4).Value = "Email";
            worksheet.Cell(currentRow, 5).Value = "Role";
            worksheet.Cell(currentRow, 6).Value = "Status";
            worksheet.Cell(currentRow, 7).Value = "Created Date";

            // Formatting headers
            var headerRange = worksheet.Range(1, 1, 1, 7);
            headerRange.Style.Font.Bold = true;
            headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#4e73df");
            headerRange.Style.Font.FontColor = XLColor.White;

            // Data
            foreach (var user in users)
            {
                currentRow++;
                worksheet.Cell(currentRow, 1).Value = user.UserId;
                worksheet.Cell(currentRow, 2).Value = user.FullName;
                worksheet.Cell(currentRow, 3).Value = user.Username;
                worksheet.Cell(currentRow, 4).Value = user.Email;
                worksheet.Cell(currentRow, 5).Value = user.Role;
                worksheet.Cell(currentRow, 6).Value = user.Status == 1 ? "Active" : user.Status == 2 ? "Banned" : "Pending";
                worksheet.Cell(currentRow, 7).Value = user.CreatedDate?.ToString("yyyy-MM-dd HH:mm");
            }

            worksheet.Columns().AdjustToContents();

            using (var stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                var content = stream.ToArray();
                return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"UserList_{DateTime.Now:yyyyMMdd}.xlsx");
            }
        }
    }

    [HttpGet]
    public async Task<IActionResult> Search(string term)
    {
        var users = await _userService.GetAllUsersAsync();
        var results = users
            .Where(u => u.Role == "Student" && 
                       ((u.FullName != null && u.FullName.Contains(term, StringComparison.OrdinalIgnoreCase)) || 
                        (u.Username != null && u.Username.Contains(term, StringComparison.OrdinalIgnoreCase))))
            .Select(u => new { id = u.UserId, text = $"{(u.FullName ?? "N/A")} ({u.Username ?? "N/A"})" })
            .Take(10);
        return Json(results);
    }

    [HttpGet]
    public async Task<IActionResult> GetAuditTrail(int? userId = null)
    {
        var logs = await _userService.GetAuditTrailAsync(userId);
        return PartialView("_AuditTrailPartial", logs);
    }
}
