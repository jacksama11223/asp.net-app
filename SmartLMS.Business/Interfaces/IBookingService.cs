using SmartLMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IBookingService
{
    Task<IEnumerable<Booking>> GetStudentBookingsAsync(int studentId);
    Task<IEnumerable<Booking>> GetTutorBookingsAsync(int tutorId);
    Task<Booking> CreateBookingAsync(int studentId, int tutorId, DateTime startTime, int durationMinutes);
    Task<bool> UpdateBookingStatusAsync(int bookingId, string status);
    Task<IEnumerable<User>> GetAvailableTutorsAsync(DateTime date);
}
