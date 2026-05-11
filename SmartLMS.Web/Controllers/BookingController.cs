using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpGet("student")]
    public async Task<ActionResult<IEnumerable<Booking>>> GetStudentBookings()
    {
        var userId = int.Parse(User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value ?? "0");
        var result = await _bookingService.GetStudentBookingsAsync(userId);
        return Ok(result);
    }

    [HttpGet("tutor")]
    public async Task<ActionResult<IEnumerable<Booking>>> GetTutorBookings()
    {
        var userId = int.Parse(User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value ?? "0");
        var result = await _bookingService.GetTutorBookingsAsync(userId);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Booking>> CreateBooking([FromBody] BookingRequest request)
    {
        var userId = int.Parse(User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value ?? "0");
        try
        {
            var result = await _bookingService.CreateBookingAsync(userId, request.TutorId, request.StartTime, request.DurationMinutes);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
    {
        var success = await _bookingService.UpdateBookingStatusAsync(id, status);
        if (!success) return NotFound();
        return NoContent();
    }

    [HttpGet("tutors")]
    public async Task<ActionResult<IEnumerable<User>>> GetTutors([FromQuery] DateTime date)
    {
        var result = await _bookingService.GetAvailableTutorsAsync(date);
        return Ok(result);
    }
}

public class BookingRequest
{
    public int TutorId { get; set; }
    public DateTime StartTime { get; set; }
    public int DurationMinutes { get; set; }
}

