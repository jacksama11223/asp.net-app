using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Data;
using SmartLMS.Models;
using SmartLMS.Community.ViewModels;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace SmartLMS.Community.Controllers;

public class AuthController : Controller
{
    private readonly SmartLMSContext _db;

    public AuthController(SmartLMSContext db)
    {
        _db = db;
    }

    // ─────────────────────────────────────────────────
    // GET /Auth/Login
    // ─────────────────────────────────────────────────
    [HttpGet]
    public IActionResult Login(string? returnUrl = null)
    {
        if (User.Identity?.IsAuthenticated == true)
            return Redirect(returnUrl ?? "/hub");

        ViewBag.ReturnUrl = returnUrl;
        return View();
    }

    // ─────────────────────────────────────────────────
    // POST /Auth/Login
    // ─────────────────────────────────────────────────
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model, string? returnUrl = null)
    {
        ViewBag.ReturnUrl = returnUrl;

        if (!ModelState.IsValid)
            return View(model);

        // Tìm user theo email
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == model.Email);

        if (user == null)
        {
            ModelState.AddModelError("", "Email hoặc mật khẩu không đúng.");
            return View(model);
        }

        // Xác thực mật khẩu (hash BCrypt)
        bool passwordValid = false;
        try
        {
            passwordValid = BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash);
        }
        catch
        {
            // Fallback nếu password chưa hash
            passwordValid = user.PasswordHash == model.Password;
        }

        if (!passwordValid)
        {
            ModelState.AddModelError("", "Email hoặc mật khẩu không đúng.");
            return View(model);
        }

        // Tạo Claims và đăng nhập
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Name,           user.FullName ?? user.Email),
            new Claim(ClaimTypes.Email,          user.Email),
            new Claim(ClaimTypes.Role,           user.Role ?? "Student"),
        };

        var identity  = new ClaimsIdentity(claims, Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties
        {
            IsPersistent     = model.RememberMe,
            ExpiresUtc       = model.RememberMe
                               ? DateTimeOffset.UtcNow.AddDays(30)
                               : DateTimeOffset.UtcNow.AddHours(8),
        });

        return Redirect(returnUrl ?? "/hub");
    }

    // ─────────────────────────────────────────────────
    // GET /Auth/Register
    // ─────────────────────────────────────────────────
    [HttpGet]
    public IActionResult Register()
    {
        if (User.Identity?.IsAuthenticated == true)
            return Redirect("/hub");

        return View();
    }

    // ─────────────────────────────────────────────────
    // POST /Auth/Register
    // ─────────────────────────────────────────────────
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (!ModelState.IsValid)
            return View(model);

        // Kiểm tra email đã tồn tại
        if (await _db.Users.AnyAsync(u => u.Email == model.Email))
        {
            ModelState.AddModelError("Email", "Email này đã được sử dụng.");
            return View(model);
        }

        // Tạo user mới
        var user = new User
        {
            FullName     = model.FullName,
            Email        = model.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
            Role         = "Student",
            CreatedDate  = DateTime.UtcNow,
            Status       = 1,  // Active
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        // Đăng nhập ngay sau khi đăng ký
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Name,           user.FullName ?? user.Email),
            new Claim(ClaimTypes.Email,          user.Email),
            new Claim(ClaimTypes.Role,           "Student"),
        };

        var identity  = new ClaimsIdentity(claims, Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme, principal);

        TempData["WelcomeMessage"] = $"Chào mừng {user.FullName} đến với SmartLMS Community Hub!";
        return Redirect("/hub");
    }

    // ─────────────────────────────────────────────────
    // GET /Auth/Logout
    // ─────────────────────────────────────────────────
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/Auth/Login");
    }
}
