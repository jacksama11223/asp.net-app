using SmartLMS.Models;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IOrderService
{
    Task<Invoice> CreateInvoiceAsync(int userId, int courseId, string? couponCode = null);
    Task<bool> ProcessPaymentSuccessAsync(string transactionReference, string bankCode);
    Task<bool> CancelInvoiceAsync(int invoiceId);
    Task<decimal> CalculateDiscountedPriceAsync(int courseId, string couponCode);
}
