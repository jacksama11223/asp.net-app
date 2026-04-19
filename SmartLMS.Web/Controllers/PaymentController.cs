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

    public PaymentController(SmartLMSContext context, ILogger<PaymentController> logger, IPaymentGateway paymentGateway)
    {
        _context = context;
        _logger = logger;
        _paymentGateway = paymentGateway;
    }

    [HttpGet]
    [HttpPost]
    public async Task<IActionResult> VnpayIPN()
    {
        _logger.LogInformation("VNPay Webhook received at {Time}", System.DateTime.Now);
        
        var queryDictionary = Request.Query.ToDictionary(k => k.Key, v => v.Value.ToString());
        var vnp_ResponseCode = queryDictionary.GetValueOrDefault("vnp_ResponseCode");
        var vnp_SecureHash = queryDictionary.GetValueOrDefault("vnp_SecureHash");
        var vnp_TxnRef = queryDictionary.GetValueOrDefault("vnp_TxnRef");
        var vnp_AmountStr = queryDictionary.GetValueOrDefault("vnp_Amount");

        // 1. BẢO MẬT: Kiểm tra chữ ký (Checksum)
        if (!_paymentGateway.VerifyChecksum(queryDictionary, vnp_SecureHash))
        {
            _logger.LogWarning("VNPay Webhook: Phát hiện chữ ký không hợp lệ cho TxnRef: {TxnRef}!", vnp_TxnRef);
            return Json(new { RspCode = "97", Message = "Invalid Checksum" });
        }

        // 2. Tìm hóa đơn tương ứng trong Database
        var invoice = await _context.Invoices
            .Include(i => i.User)
            .Include(i => i.Course)
            .FirstOrDefaultAsync(i => i.TransactionReference == vnp_TxnRef);

        if (invoice == null)
        {
            _logger.LogWarning("VNPay Webhook: Không tìm thấy hóa đơn ID: {TxnRef}", vnp_TxnRef);
            return Json(new { RspCode = "01", Message = "Order not found" });
        }

        if (invoice.Status != "Pending")
        {
            return Json(new { RspCode = "02", Message = "Order already processed" });
        }

        // 3. Kiểm tra số tiền (vnp_Amount trả về nhân 100)
        if (long.TryParse(vnp_AmountStr, out long vnpAmountLong))
        {
            decimal actualAmount = vnpAmountLong / 100m;
            if (actualAmount != invoice.Amount)
            {
                _logger.LogCritical("VNPay Webhook: Sai lệch số tiền! DB: {DbAmt} | Webhook: {WbAmt}", invoice.Amount, actualAmount);
                return Json(new { RspCode = "04", Message = "Invalid Amount" });
            }
        }

        // 4. Xử lý khi thành công
        if (vnp_ResponseCode == "00")
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Cập nhật trạng thái hóa đơn
                invoice.Status = "Paid";
                invoice.PaidAt = DateTime.Now;

                // Tự động Ghi danh (Enrollment)
                var enrollment = new Enrollment
                {
                    UserId = invoice.UserId,
                    CourseId = invoice.CourseId,
                    Progress = 0,
                    AvgScore = 0,
                    LastAccessDate = DateTime.Now,
                    IsCompleted = false
                };
                _context.Enrollments.Add(enrollment);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                _logger.LogInformation("VNPay Webhook: Thanh toán thành công & Đã tự động ghi danh cho User {User} vào Course {Course}", invoice.UserId, invoice.CourseId);

                // 5. [EVENT-DRIVEN] Bắn tín hiệu cho hệ thống Email/Notification
                var messageBus = HttpContext.RequestServices.GetRequiredService<SmartLMS.Business.MessageBus.IMessageBus>();
                await messageBus.PublishAsync("Payment.Success", new {
                    InvoiceId = invoice.InvoiceId,
                    UserId = invoice.UserId,
                    CourseTitle = invoice.Course?.Title,
                    Amount = invoice.Amount
                });

                return Json(new { RspCode = "00", Message = "Confirm success" });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Lỗi khi xử lý lưu DB cho Webhook VNPay");
                return Json(new { RspCode = "99", Message = "Internal Error" });
            }
        }

        // Giao dịch lỗi (Khách hàng hủy hoặc thẻ lỗi)
        invoice.Status = "Failed";
        await _context.SaveChangesAsync();
        
        return Json(new { RspCode = "00", Message = "Order record updated (Failed status)" });
    }
}
