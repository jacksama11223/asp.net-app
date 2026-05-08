using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using SmartLMS.Business;
using System.Security.Claims;

namespace SmartLMS.Web.Controllers.Api;

[Route("api/payment")]
[ApiController]
[Authorize]
public class PaymentApiController : ControllerBase
{
    private readonly SmartLMSContext _context;
    private readonly IPaymentGateway _paymentGateway;
    private readonly IConfiguration _config;

    public PaymentApiController(SmartLMSContext context, IPaymentGateway paymentGateway, IConfiguration config)
    {
        _context = context;
        _paymentGateway = paymentGateway;
        _config = config;
    }

    [HttpPost("create-invoice")]
    public async Task<ActionResult> CreateInvoice([FromBody] PaymentRequest request)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("UserId");
        if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

        var course = await _context.Courses.FindAsync(request.CourseId);
        if (course == null) return NotFound("Course not found");

        var txnRef = DateTime.Now.Ticks.ToString();
        var invoice = new Invoice
        {
            UserId = userId,
            CourseId = course.CourseId,
            Amount = course.DiscountPrice ?? course.Price ?? 0,
            Status = "Pending",
            TransactionReference = txnRef,
            CreatedAt = DateTime.Now
        };

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        string returnUrl = _config["VNPay:ReturnUrl"] ?? Url.Action("VnpayReturn", "Payment", null, Request.Scheme) ?? "";
        string paymentUrl = _paymentGateway.CreatePaymentUrl(txnRef, invoice.Amount, returnUrl);

        return Ok(new { paymentUrl });
    }
}

public class PaymentRequest
{
    public int CourseId { get; set; }
}
