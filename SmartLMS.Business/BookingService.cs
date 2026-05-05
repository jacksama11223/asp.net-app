using Microsoft.EntityFrameworkCore;
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
    private readonly INotificationService _notificationService;

    public BookingService(SmartLMSContext context, INotificationService notificationService)
    {
        _context = context;
        _notificationService = notificationService;
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

        // 3. Thông báo cho giảng viên
        await _notificationService.NotifyUserAsync(tutorId, "Yêu cầu đặt lịch mới", $"Sinh viên yêu cầu học lúc {startTime:dd/MM HH:mm}", "Booking");

        return booking;
    }

    public async Task<bool> UpdateBookingStatusAsync(int bookingId, string status)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
        if (booking == null) return false;

        booking.Status = status;
        await _context.SaveChangesAsync();

        // Thông báo cho sinh viên
        await _notificationService.NotifyUserAsync(booking.StudentId, "Cập nhật trạng thái lịch hẹn", $"Lịch hẹn của bạn đã được chuyển thành: {status}", "Booking");

        return true;
    }

    public async Task<IEnumerable<User>> GetAvailableTutorsAsync(DateTime date)
    {
        // Lấy danh sách giảng viên (UserType = 2/Tutor) và không bận cả ngày (ví dụ đơn giản)
        return await _context.Users
            .Where(u => u.UserType == 2 && !u.IsDeleted)
            .ToListAsync();
    }
}
