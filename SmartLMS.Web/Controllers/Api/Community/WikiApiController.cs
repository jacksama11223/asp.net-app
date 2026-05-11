using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers.Api.Community;

[Route("api/wiki")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class WikiApiController : ControllerBase
{
    private readonly SmartLMSContext _context;

    public WikiApiController(SmartLMSContext context)
    {
        _context = context;
    }

    [HttpGet("pages")]
    public async Task<IActionResult> GetUserPages()
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var pages = await _context.DocumentPages
            .Where(p => p.UserId == userId && !p.IsDeleted)
            .OrderByDescending(p => p.UpdatedAt)
            .Select(p => new {
                p.DocumentPageId,
                p.Title,
                p.Icon,
                p.ParentId,
                p.IsPublic,
                p.UpdatedAt
            })
            .ToListAsync();

        return Ok(pages);
    }

    [HttpGet("pages/{id}")]
    public async Task<IActionResult> GetPageDetail(int id)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var page = await _context.DocumentPages
            .FirstOrDefaultAsync(p => p.DocumentPageId == id && !p.IsDeleted && (p.UserId == userId || p.IsPublic));

        if (page == null) return NotFound();

        return Ok(page);
    }

    [HttpPost("pages")]
    public async Task<IActionResult> CreatePage([FromBody] DocumentPage page)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        page.UserId = userId;
        page.CreatedAt = DateTime.Now;
        page.UpdatedAt = DateTime.Now;

        _context.DocumentPages.Add(page);
        await _context.SaveChangesAsync();

        return Ok(page);
    }

    [HttpPut("pages/{id}")]
    public async Task<IActionResult> UpdatePage(int id, [FromBody] DocumentPage update)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var page = await _context.DocumentPages.FindAsync(id);
        if (page == null || page.UserId != userId) return NotFound();

        page.Title = update.Title;
        page.Content = update.Content;
        page.Icon = update.Icon;
        page.IsPublic = update.IsPublic;
        page.UpdatedAt = DateTime.Now;

        await _context.SaveChangesAsync();
        return Ok(page);
    }

    [HttpDelete("pages/{id}")]
    public async Task<IActionResult> DeletePage(int id)
    {
        var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var page = await _context.DocumentPages.FindAsync(id);
        if (page == null || page.UserId != userId) return NotFound();

        page.IsDeleted = true;
        await _context.SaveChangesAsync();

        return Ok(new { success = true });
    }
}


