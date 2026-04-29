using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers.Api.Public
{
    [Route("api/public/payment")]
    [ApiController]
    public class PublicPaymentApiController : ControllerBase
    {
        private readonly SmartLMSContext _context;

        public PublicPaymentApiController(SmartLMSContext context)
        {
            _context = context;
        }

        [HttpGet("config")]
        public IActionResult GetPaymentConfig()
        {
            var configPath = Path.Combine(Directory.GetCurrentDirectory(), "bank_config.json");
            if (System.IO.File.Exists(configPath))
            {
                var json = System.IO.File.ReadAllText(configPath);
                return Content(json, "application/json");
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
            if (course == null) return NotFound("Khóa học không tồn tại.");

            var txnRef = DateTime.Now.Ticks.ToString();
            
            // Đọc số tiền test từ config
            int testAmount = 3000;
            var configPath = Path.Combine(Directory.GetCurrentDirectory(), "bank_config.json");
            if (System.IO.File.Exists(configPath))
            {
                var json = System.IO.File.ReadAllText(configPath);
                using var doc = JsonDocument.Parse(json);
                if (doc.RootElement.TryGetProperty("TestAmount", out var amountProp))
                {
                    testAmount = amountProp.GetInt32();
                }
            }

            var testUser = await _context.Users.FirstOrDefaultAsync() ?? new User { UserId = 1 };

            var invoice = new Invoice
            {
                UserId = testUser.UserId,
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
                Message = "Tạo đơn hàng thành công, vui lòng quét mã QR."
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

            return Ok(new { Message = "Thanh toán thành công! Khóa học đã được mở." });
        }

        [HttpPost("sepay-webhook")]
        public async Task<IActionResult> SePayWebhook([FromBody] SePayWebhookPayload payload)
        {
            if (payload == null || string.IsNullOrEmpty(payload.transactionContent))
            {
                return BadRequest(new { success = false, message = "Invalid payload" });
            }

            // Tìm mã đơn hàng (18 chữ số) trong nội dung chuyển khoản
            var match = System.Text.RegularExpressions.Regex.Match(payload.transactionContent, @"\d{15,20}");
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

            // Kiểm tra số tiền chuyển có đủ không (Chấp nhận lớn hơn hoặc bằng)
            if (payload.amountIn >= invoice.Amount)
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
        public string gateway { get; set; }
        public string transactionDate { get; set; }
        public string accountNumber { get; set; }
        public decimal amountIn { get; set; }
        public decimal amountOut { get; set; }
        public string transactionContent { get; set; }
        public string referenceNumber { get; set; }
        public string code { get; set; }
    }
}
