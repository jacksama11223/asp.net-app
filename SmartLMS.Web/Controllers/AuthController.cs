using Microsoft.AspNetCore.Mvc;
using SmartLMS.Models;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

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
        // 🛡️ Logic xác thực sẽ được tích hợp tại đây
        // Tạm thời trả về View để ngài thấy giao diện
        ViewBag.Message = "Hệ thống xác thực đang được kết nối...";
        return View();
    }

    [HttpPost]
    public IActionResult Register(User user)
    {
        // 🛡️ Logic đăng ký sẽ được tích hợp tại đây
        ViewBag.Message = "Đang khởi tạo tài khoản mới...";
        return View();
    }
}
