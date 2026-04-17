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

namespace SmartLMS.Web.Controllers;

[Route("api/[controller]")]
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
        var user = await _userService.AuthenticateAsync(request.Username, request.Password);
        
        if (user == null)
        {
            return Unauthorized(new { message = "Tài khoản hoặc mật khẩu không chính xác." });
        }

        var token = CreateToken(user);
        return Ok(new { 
            token = token,
            username = user.Username,
            role = user.Role,
            fullName = user.FullName
        });
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username ?? ""),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
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
}
