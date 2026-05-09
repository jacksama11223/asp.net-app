using MediatR;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Business.Events;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class BookingService : IBookingService
{
    private readonly SmartLMSContext _context;
    private readonly IMediator _mediator;

    public BookingService(SmartLMSContext context, IMediator mediator)
    {
        _context = context;
        _mediator = mediator;
    }

    public async Task<IEnumerable<Booking>> GetStudentBookingsAsync(int studentId)
    {
        return await _context.Bookings
            .Include(b => b.Tutor)
            .Where(b => b.StudentId == studentId)
            .OrderByDescending(b => b.StartTime)
            .ToListAsync();
    }

    public async Task<IEnumerable<Booking>> GetTutorBookingsAsync(int tutorId)
    {
        return await _context.Bookings
            .Include(b => b.Student)
            .Where(b => b.TutorId == tutorId)
            .OrderByDescending(b => b.StartTime)
            .ToListAsync();
    }

    public async Task<Booking> CreateBookingAsync(int studentId, int tutorId, DateTime startTime, int durationMinutes)
    {
        // 1. Kiểm tra trùng lịch của giảng viên
        var endTime = startTime.AddMinutes(durationMinutes);
        var isBusy = await _context.Bookings.AnyAsync(b => 
            b.TutorId == tutorId && 
            b.Status != "Cancelled" &&
            ((startTime >= b.StartTime && startTime < b.EndTime) || (endTime > b.StartTime && endTime <= b.EndTime)));

        if (isBusy) throw new Exception("Giảng viên đã có lịch trong khoảng thời gian này.");

        // 2. Tạo booking
        var booking = new Booking
        {
            StudentId = studentId,
            TutorId = tutorId,
            StartTime = startTime,
            EndTime = endTime,
            Status = "Pending",
            CreatedAt = DateTime.Now
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        // [MODULAR] Không gọi NotificationService trực tiếp nữa.
        // Phát Event để NotificationEventHandler tự xử lý.
        await _mediator.Publish(new BookingCreatedEvent(
            studentId, tutorId, "", startTime, ""));

        return booking;
    }

    public async Task<bool> UpdateBookingStatusAsync(int bookingId, string status)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
        if (booking == null) return false;

        booking.Status = status;
        await _context.SaveChangesAsync();

        // [MODULAR] Phát Event để NotificationEventHandler xử lý thông báo.
        await _mediator.Publish(new BookingCreatedEvent(
            booking.StudentId, booking.TutorId, "", booking.StartTime, ""));

        return true;
    }

    public async Task<IEnumerable<User>> GetAvailableTutorsAsync(DateTime date)
    {
        // Lấy danh sách giảng viên (Role = "Instructor") và chưa bị xóa
        return await _context.Users
            .Where(u => u.Role == "Instructor" && !u.IsDeleted)
            .ToListAsync();
    }
}
