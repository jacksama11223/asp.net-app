using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
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
            // Hardcoded config for test flow.
            // In a real scenario, this would come from the database config table.
            return Ok(new
            {
                BankId = "MB",
                AccountNo = "0987654321", // Replace with real account number
                AccountName = "NGUYEN VAN A", // Replace with real account name
                TestAmount = 3000
            });
        }

        [HttpPost("checkout/{courseId}")]
        public async Task<IActionResult> Checkout(int courseId)
        {
            var course = await _context.Courses.FindAsync(courseId);
            if (course == null) return NotFound("Khóa học không tồn tại.");

            var txnRef = DateTime.Now.Ticks.ToString();
            
            // Tìm user có sẵn hoặc dùng user test (VD: id = 1)
            var testUser = await _context.Users.FirstOrDefaultAsync() ?? new User { UserId = 1 };

            var invoice = new Invoice
            {
                UserId = testUser.UserId,
                CourseId = course.CourseId,
                Amount = 3000, // TEST AMOUNT
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
    }
}
