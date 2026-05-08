using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SmartLMS.Data;
using SmartLMS.Business;
using SmartLMS.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace SmartLMS.Web.Controllers;

public class PaymentController : Controller
{
    private readonly SmartLMSContext _context;
    private readonly ILogger<PaymentController> _logger;
    private readonly IPaymentGateway _paymentGateway;

    public PaymentController(SmartLMSContext context, ILogger<PaymentController> logger, IPaymentGateway paymentGateway, IConfiguration config)
    {
        _context = context;
        _logger = logger;
        _paymentGateway = paymentGateway;
        _config = config;
    }

    private readonly IConfiguration _config;

    [Microsoft.AspNetCore.Authorization.Authorize]
    public async Task<IActionResult> Checkout(int courseId)
    {
        var course = await _context.Courses.FindAsync(courseId);
        if (course == null) return NotFound();

        string currentUserName = User.Identity?.Name ?? "";
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == currentUserName);
        if (user == null) return Unauthorized();

        // 1. Tạo Invoice mới ở trạng thái Pending
        var txnRef = DateTime.Now.Ticks.ToString();
        var invoice = new Invoice
        {
            UserId = user.UserId,
            CourseId = course.CourseId,
            Amount = course.DiscountPrice ?? course.Price ?? 0,
            Status = "Pending",
            TransactionReference = txnRef,
            CreatedAt = DateTime.Now
        };

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        // 2. Tạo URL thanh toán VNPay
        string returnUrl = _config["VNPay:ReturnUrl"] ?? Url.Action("VnpayReturn", "Payment", null, Request.Scheme) ?? "";
        string paymentUrl = _paymentGateway.CreatePaymentUrl(txnRef, invoice.Amount, returnUrl);

        _logger.LogInformation("Redirecting User {UserId} to VNPay for Course {CourseId}. TxnRef: {TxnRef}", user.UserId, courseId, txnRef);
        
        return Redirect(paymentUrl);
    }

    public async Task<IActionResult> VnpayReturn()
    {
        var queryDictionary = Request.Query.ToDictionary(k => k.Key, v => v.Value.ToString());
        var vnp_ResponseCode = queryDictionary.GetValueOrDefault("vnp_ResponseCode");
        var vnp_SecureHash = queryDictionary.GetValueOrDefault("vnp_SecureHash");
        var vnp_TxnRef = queryDictionary.GetValueOrDefault("vnp_TxnRef");

        _logger.LogInformation("VNPay Return received for TxnRef: {TxnRef}, ResponseCode: {ResponseCode}", vnp_TxnRef, vnp_ResponseCode);

        // 1. Kiểm tra chữ ký bảo mật
        if (vnp_SecureHash == null || !_paymentGateway.VerifyChecksum(queryDictionary, vnp_SecureHash))
        {
            ViewBag.Error = "Chữ ký không hợp lệ (Signature mismatch).";
            return View("Failure");
        }

        if (vnp_ResponseCode == "00")
        {
            // 2. Xử lý Ghi danh ngay lập tức (Dự phòng cho IPN)
            var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.TransactionReference == vnp_TxnRef);
            if (invoice != null && invoice.Status == "Pending")
            {
                invoice.Status = "Paid";
                invoice.PaidAt = DateTime.Now;

                var exists = await _context.Enrollments.AnyAsync(e => e.UserId == invoice.UserId && e.CourseId == invoice.CourseId);
                if (!exists)
                {
                    _context.Enrollments.Add(new Enrollment
                    {
                        UserId = invoice.UserId,
                        CourseId = invoice.CourseId,
                        LastAccessDate = DateTime.Now,
                        Progress = 0,
                        IsCompleted = false
                    });
                }
                await _context.SaveChangesAsync();
                _logger.LogInformation("Auto-enrolled user {UserId} to course {CourseId} via Return URL", invoice.UserId, invoice.CourseId);
            }

            ViewBag.TxnRef = vnp_TxnRef;
            return View("Success");
        }
        else
        {
            ViewBag.Error = $"Giao dịch không thành công. Mã lỗi: {vnp_ResponseCode}";
            return View("Failure");
        }
    }

    [HttpGet]
    [HttpPost]
    public async Task<IActionResult> VnpayIPN()
    {
        _logger.LogInformation("VNPay IPN (Webhook) received at {Time}", DateTime.Now);
        
        var queryDictionary = Request.Query.ToDictionary(k => k.Key, v => v.Value.ToString());
        var vnp_ResponseCode = queryDictionary.GetValueOrDefault("vnp_ResponseCode");
        var vnp_SecureHash = queryDictionary.GetValueOrDefault("vnp_SecureHash");
        var vnp_TxnRef = queryDictionary.GetValueOrDefault("vnp_TxnRef");
        var vnp_AmountStr = queryDictionary.GetValueOrDefault("vnp_Amount");

        // 1. Kiểm tra Checksum
        if (vnp_SecureHash == null || !_paymentGateway.VerifyChecksum(queryDictionary, vnp_SecureHash))
        {
            return Json(new { RspCode = "97", Message = "Invalid Checksum" });
        }

        // 2. Xử lý Invoice
        var invoice = await _context.Invoices
            .Include(i => i.Course)
            .FirstOrDefaultAsync(i => i.TransactionReference == vnp_TxnRef);

        if (invoice == null) return Json(new { RspCode = "01", Message = "Order not found" });
        if (invoice.Status != "Pending") return Json(new { RspCode = "02", Message = "Order already processed" });

        // 3. Kiểm tra số tiền
        if (long.TryParse(vnp_AmountStr, out long vnpAmt) && (vnpAmt / 100m) != invoice.Amount)
        {
            return Json(new { RspCode = "04", Message = "Invalid Amount" });
        }

        // 4. Cập nhật kết quả
        if (vnp_ResponseCode == "00")
        {
            invoice.Status = "Paid";
            invoice.PaidAt = DateTime.Now;

            // Tự động Ghi danh
            var exists = await _context.Enrollments.AnyAsync(e => e.UserId == invoice.UserId && e.CourseId == invoice.CourseId);
            if (!exists)
            {
                _context.Enrollments.Add(new Enrollment
                {
                    UserId = invoice.UserId,
                    CourseId = invoice.CourseId,
                    LastAccessDate = DateTime.Now,
                    Progress = 0,
                    IsCompleted = false
                });
            }
            
            await _context.SaveChangesAsync();
            
            // Thông báo qua Message Bus (Lite Mode: Mock)
            var bus = HttpContext.RequestServices.GetRequiredService<SmartLMS.Business.MessageBus.IMessageBus>();
            await bus.PublishAsync("PaymentSuccess", new { invoice.InvoiceId, invoice.UserId });
        }
        else
        {
            invoice.Status = "Failed";
            await _context.SaveChangesAsync();
        }

        return Json(new { RspCode = "00", Message = "Confirm success" });
    }
}
