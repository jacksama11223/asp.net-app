using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SmartLMS.Business;
using SmartLMS.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net.Http;
using System.Text.Json;

namespace SmartLMS.Web.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthApiController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;

    public AuthApiController(IUserService userService, IConfiguration configuration)
    {
        _userService = userService;
        _configuration = configuration;
    }

    [HttpPost("token")]
    public async Task<IActionResult> GenerateToken([FromBody] LoginRequest request)
    {
        if (!await VerifyCaptchaTokenAsync(request.CaptchaToken))
        {
            return BadRequest(new { message = "Xác thực reCAPTCHA thất bại. Vui lòng thử lại." });
        }

        var user = await _userService.AuthenticateAsync(request.Username, request.Password);
        
        if (user == null)
        {
            return Unauthorized(new { message = "Tài khoản hoặc mật khẩu không chính xác." });
        }

        // Đồng thời đăng ký session Cookie cho các trang Razor View (Coding Sandbox, Achievement Hub)
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username ?? ""),
            new Claim("FullName", user.FullName ?? ""),
            new Claim(ClaimTypes.Role, user.Role ?? "Student"),
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var authProperties = new AuthenticationProperties { IsPersistent = true };

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

        var token = CreateToken(user);
        return Ok(new { 
            token = token,
            username = user.Username,
            role = user.Role,
            fullName = user.FullName
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (!await VerifyCaptchaTokenAsync(request.CaptchaToken))
        {
            return BadRequest(new { message = "Xác thực reCAPTCHA thất bại. Vui lòng thử lại." });
        }

        // Check Email
        var existingEmail = await _userService.GetUserByEmailAsync(request.Email);
        if (existingEmail != null)
        {
            return BadRequest(new { message = "Email đã được sử dụng bởi tài khoản khác." });
        }

        // Check Username
        var allUsers = await _userService.GetAllUsersAsync();
        var existingUsername = allUsers.FirstOrDefault(u => u.Username?.ToLower() == request.Username.ToLower());
        if (existingUsername != null)
        {
            return BadRequest(new { message = "Tên đăng nhập này đã tồn tại. Vui lòng chọn tên khác." });
        }

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            FullName = request.FullName,
            Role = "Student",
            Status = 1 // Active
        };

        var success = await _userService.RegisterAsync(user, request.Password);
        if (!success)
        {
            return StatusCode(500, new { 
                message = "Đã xảy ra lỗi hệ thống khi đăng ký.",
                detail = "Không thể lưu thông tin người dùng vào cơ sở dữ liệu."
            });
        }

        return Ok(new { message = "Đăng ký thành công!" });
    }

    private async Task<bool> VerifyCaptchaTokenAsync(string captchaToken)
    {
        if (string.IsNullOrEmpty(captchaToken)) return false;

        var secretKey = _configuration["ReCaptcha:SecretKey"] ?? "6Lft5fYsAAAAABisoWKU89jqpBLjFuGVexgraMcY";
        using var client = new HttpClient();
        var response = await client.PostAsync($"https://www.google.com/recaptcha/api/siteverify?secret={secretKey}&response={captchaToken}", null);
        if (!response.IsSuccessStatusCode) return false;

        var jsonString = await response.Content.ReadAsStringAsync();
        using var jsonDoc = JsonDocument.Parse(jsonString);
        return jsonDoc.RootElement.GetProperty("success").GetBoolean();
    }

    private string CreateToken(User user)
    {
        // ... (existing code remains same)
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username ?? ""),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("UserId", user.UserId.ToString()),
            new Claim(ClaimTypes.Name, user.Username ?? ""),
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Role, user.Role ?? "Student")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"] ?? "Default_Secret_Key_For_SmartLMS_AI_2026"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryMinutes"] ?? "1440"));

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: expires,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string CaptchaToken { get; set; } = string.Empty;
}

public class RegisterRequest
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string CaptchaToken { get; set; } = string.Empty;
}
