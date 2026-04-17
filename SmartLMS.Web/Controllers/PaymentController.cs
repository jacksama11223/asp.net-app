using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SmartLMS.Data;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers;

public class PaymentController : Controller
{
    private readonly SmartLMSContext _context;
    private readonly ILogger<PaymentController> _logger;

    public PaymentController(SmartLMSContext context, ILogger<PaymentController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    [HttpPost]
    public async Task<IActionResult> VnpayIPN()
    {
        _logger.LogInformation("VNPay Webhook received at {Time}", System.DateTime.Now);
        
        // Nhận các tham số từ VNPay
        var vnp_ResponseCode = Request.Query["vnp_ResponseCode"];
        var vnp_OrderInfo = Request.Query["vnp_OrderInfo"];
        var vnp_Amount = Request.Query["vnp_Amount"];
        var vnp_TxnRef = Request.Query["vnp_TxnRef"];
        var vnp_SecureHash = Request.Query["vnp_SecureHash"];

        // Logic kiểm tra chữ ký (Checksum) sẽ được triển khai ở đây
        // if (ValidateSignature(vnp_SecureHash)) { ... }

        if (vnp_ResponseCode == "00")
        {
            // Giao dịch thành công -> Cập nhật Database
            // _context.Enrollments.Update(...);
            return Json(new { RspCode = "00", Message = "Confirm success" });
        }

        return Json(new { RspCode = "01", Message = "Order not found or error" });
    }
}
