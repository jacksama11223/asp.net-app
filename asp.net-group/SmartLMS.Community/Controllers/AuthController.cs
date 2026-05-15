using Microsoft.AspNetCore.Mvc;
using SmartLMS.Models;
using System.Threading.Tasks;

namespace SmartLMS.Community.Controllers;

public class AuthController : Controller
{
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpGet]
    public IActionResult Register()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Login(string username, string password)
    {
        // 🛡️ Logic xác thực cho Hub
        ViewBag.Message = "Đang xác thực vào Community Hub...";
        return View();
    }

    [HttpPost]
    public IActionResult Register(User user)
    {
        // 🛡️ Logic đăng ký cho Hub
        ViewBag.Message = "Đang khởi tạo tài khoản thành viên...";
        return View();
    }
}
