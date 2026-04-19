using System;

namespace SmartLMS.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Paid, Cancelled
        
        // Mã giao dịch duy nhất từ VNPay (vnp_TxnRef)
        public string? TransactionReference { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? PaidAt { get; set; }
        public string? VnpayBankCode { get; set; }
        
        // Navigation properties
        public virtual User? User { get; set; }
        public virtual Course? Course { get; set; }
    }
}
