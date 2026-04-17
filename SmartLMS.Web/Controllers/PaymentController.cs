using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SmartLMS.Data;
using SmartLMS.Business;
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
        
        // Nhận toàn bộ tham số URL động (Vì có thể VNPay gửi dư biến)
        var queryDictionary = Request.Query.ToDictionary(k => k.Key, v => v.Value.ToString());

        var vnp_ResponseCode = queryDictionary.GetValueOrDefault("vnp_ResponseCode");
        var vnp_SecureHash = queryDictionary.GetValueOrDefault("vnp_SecureHash");

        // BẢO MẬT: Kiểm tra chữ ký (Checksum) trước khi đụng vào Data
        if (!_paymentGateway.VerifyChecksum(queryDictionary, vnp_SecureHash))
        {
            _logger.LogWarning("VNPay Webhook: Phát hiện chữ ký không hợp lệ! Khóa IP!");
            return Json(new { RspCode = "97", Message = "Invalid Checksum" }); // Mã 97 là mã VNPay sẽ hiểu là Chữ ký sai
        }

        if (vnp_ResponseCode == "00")
        {
            // Giao dịch thành công -> Cập nhật Database
            // _context.Enrollments.Update(...);
            _logger.LogInformation("VNPay Webhook: Giao dịch thành công, đã cập nhật hóa đơn.");
            return Json(new { RspCode = "00", Message = "Confirm success" });
        }

        return Json(new { RspCode = "01", Message = "Order not found or error" });
    }
}
