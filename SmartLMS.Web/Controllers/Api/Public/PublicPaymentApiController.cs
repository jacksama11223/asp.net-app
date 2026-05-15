using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Linq;
using Microsoft.Extensions.Caching.Distributed;

namespace SmartLMS.Web.Controllers.Api.Public
{
    [Route("api/public/payment")]
    [ApiController]
    public class PublicPaymentApiController : ControllerBase
    {
        private readonly SmartLMSContext _context;
        private readonly Microsoft.Extensions.Caching.Distributed.IDistributedCache _cache;

        public PublicPaymentApiController(SmartLMSContext context, Microsoft.Extensions.Caching.Distributed.IDistributedCache cache)
        {
            _context = context;
            _cache = cache;
        }

        [HttpGet("config")]
        public async Task<IActionResult> GetPaymentConfig()
        {
            var cachedData = await _cache.GetStringAsync("BankConfig");
            if (!string.IsNullOrEmpty(cachedData))
            {
                return Content(cachedData, "application/json");
            }

            // Fallback
            return Ok(new
            {
                BankId = "MB",
                AccountNo = "0987654321",
                AccountName = "NGUYEN VAN A",
                TestAmount = 3000
            });
        }

        [HttpPost("checkout/{courseId}")]
        public async Task<IActionResult> Checkout(int courseId)
        {
            var course = await _context.Courses.FindAsync(courseId);
            if (course == null) return NotFound("KhÃ³a há»c khÃ´ng tá»“n táº¡i.");

            var txnRef = DateTime.Now.Ticks.ToString();
            
            // Äá»c sá»‘ tiá»n test tá»« config
            int testAmount = 3000;
            var cachedData = await _cache.GetStringAsync("BankConfig");
            if (!string.IsNullOrEmpty(cachedData))
            {
                using var doc = JsonDocument.Parse(cachedData);
                if (doc.RootElement.TryGetProperty("TestAmount", out var amountProp))
                {
                    testAmount = amountProp.GetInt32();
                }
            }

            // Láº¥y UserId tá»« Token náº¿u cÃ³
            var userIdStr = User.FindFirstValue("UserId") ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))?.Value;
            int userId = 1; // Máº·c Ä‘á»‹nh náº¿u khÃ´ng Ä‘Äƒng nháº­p (cho phÃ©p khÃ¡ch xem QR nhÆ°ng khÃ´ng khuyáº¿n khÃ­ch)
            
            if (!string.IsNullOrEmpty(userIdStr) && int.TryParse(userIdStr, out int parsedId))
            {
                userId = parsedId;
            }

            var invoice = new Invoice
            {
                UserId = userId,
                CourseId = course.CourseId,
                Amount = testAmount,
                Status = "Pending",
                TransactionReference = txnRef,
                CreatedAt = DateTime.Now
            };

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                InvoiceId = invoice.InvoiceId,
                TransactionReference = txnRef,
                Amount = invoice.Amount,
                Message = "Táº¡o Ä‘Æ¡n hÃ ng thÃ nh cÃ´ng, vui lÃ²ng quÃ©t mÃ£ QR."
            });
        }

        [HttpGet("status/{txnRef}")]
        public async Task<IActionResult> GetPaymentStatus(string txnRef)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.TransactionReference == txnRef);
            if (invoice == null) return NotFound();

            return Ok(new
            {
                Status = invoice.Status,
                IsPaid = invoice.Status == "Paid"
            });
        }

        [HttpPost("mock-webhook/{txnRef}")]
        public async Task<IActionResult> MockWebhook(string txnRef)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.TransactionReference == txnRef);
            if (invoice == null) return NotFound("Invoice not found.");

            if (invoice.Status == "Paid") return Ok(new { Message = "Already paid." });

            invoice.Status = "Paid";
            invoice.PaidAt = DateTime.Now;

            // Grant course access (Enrollment)
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

            return Ok(new { Message = "Thanh toÃ¡n thÃ nh cÃ´ng! KhÃ³a há»c Ä‘Ã£ Ä‘Æ°á»£c má»Ÿ." });
        }

        [HttpPost("sepay-webhook")]
        public async Task<IActionResult> SePayWebhook([FromBody] SePayWebhookPayload payload)
        {
            if (payload == null || string.IsNullOrEmpty(payload.content))
            {
                return BadRequest(new { success = false, message = "Invalid payload" });
            }

            // TÃ¬m mÃ£ Ä‘Æ¡n hÃ ng (18 chá»¯ sá»‘) trong ná»™i dung chuyá»ƒn khoáº£n
            var match = System.Text.RegularExpressions.Regex.Match(payload.content, @"\d{15,20}");
            if (!match.Success)
            {
                return Ok(new { success = true, message = "No invoice reference found, ignoring." });
            }

            string txnRef = match.Value;

            var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.TransactionReference == txnRef);
            if (invoice == null) 
            {
                return Ok(new { success = true, message = $"Invoice {txnRef} not found, ignoring." });
            }

            if (invoice.Status == "Paid") 
            {
                return Ok(new { success = true, message = "Already paid." });
            }

            // Kiá»ƒm tra sá»‘ tiá»n chuyá»ƒn cÃ³ Ä‘á»§ khÃ´ng (Cháº¥p nháº­n lá»›n hÆ¡n hoáº·c báº±ng)
            if (payload.transferAmount >= invoice.Amount)
            {
                invoice.Status = "Paid";
                invoice.PaidAt = DateTime.Now;

                // Grant course access (Enrollment)
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
                return Ok(new { success = true, message = "Payment verified and course unlocked." });
            }

            return Ok(new { success = true, message = "Amount is less than invoice amount." });
        }
    }

    public class SePayWebhookPayload
    {
        public long id { get; set; }
        public string? gateway { get; set; }
        public string? transactionDate { get; set; }
        public string? accountNumber { get; set; }
        public string? subAccount { get; set; }
        public decimal transferAmount { get; set; }
        public string? content { get; set; }
        public string? transferType { get; set; }
        public string? description { get; set; }
        public string? referenceCode { get; set; }
        public string? code { get; set; }
        public decimal accumulated { get; set; }
    }
}

