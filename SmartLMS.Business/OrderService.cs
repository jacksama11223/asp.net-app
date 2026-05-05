using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class OrderService : IOrderService
{
    private readonly SmartLMSContext _context;

    public OrderService(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task<Invoice> CreateInvoiceAsync(int userId, int courseId, string? couponCode = null)
    {
        var course = await _context.Courses.FindAsync(courseId);
        if (course == null) throw new Exception("Không tìm thấy khóa học.");

        decimal finalPrice = course.Price;

        if (!string.IsNullOrEmpty(couponCode))
        {
            finalPrice = await CalculateDiscountedPriceAsync(courseId, couponCode);
        }

        var invoice = new Invoice
        {
            UserId = userId,
            CourseId = courseId,
            Amount = finalPrice,
            Status = "Pending",
            TransactionReference = $"SLMS_{DateTime.Now:yyyyMMddHHmmss}_{userId}",
            CreatedAt = DateTime.Now
        };

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();
        return invoice;
    }

    public async Task<bool> ProcessPaymentSuccessAsync(string transactionReference, string bankCode)
    {
        var invoice = await _context.Invoices
            .FirstOrDefaultAsync(i => i.TransactionReference == transactionReference);

        if (invoice == null || invoice.Status == "Paid") return false;

        // 1. Cập nhật trạng thái hóa đơn
        invoice.Status = "Paid";
        invoice.PaidAt = DateTime.Now;
        invoice.VnpayBankCode = bankCode;

        // 2. Tự động ghi danh (Enrollment)
        var exists = await _context.Enrollments
            .AnyAsync(e => e.UserId == invoice.UserId && e.CourseId == invoice.CourseId);

        if (!exists)
        {
            var enrollment = new Enrollment
            {
                UserId = invoice.UserId,
                CourseId = invoice.CourseId,
                EnrollDate = DateTime.Now,
                Progress = 0,
                Status = "Active"
            };
            _context.Enrollments.Add(enrollment);
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> CancelInvoiceAsync(int invoiceId)
    {
        var invoice = await _context.Invoices.FindAsync(invoiceId);
        if (invoice == null) return false;

        invoice.Status = "Cancelled";
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<decimal> CalculateDiscountedPriceAsync(int courseId, string couponCode)
    {
        var course = await _context.Courses.FindAsync(courseId);
        if (course == null) return 0;

        var coupon = await _context.Coupons
            .FirstOrDefaultAsync(c => c.Code == couponCode && c.IsActive && (c.ExpiryDate == null || c.ExpiryDate > DateTime.Now));

        if (coupon == null) return course.Price;

        if (coupon.DiscountType == "Percentage")
        {
            return course.Price * (1 - coupon.DiscountAmount / 100);
        }
        
        return Math.Max(0, course.Price - coupon.DiscountAmount);
    }
}
