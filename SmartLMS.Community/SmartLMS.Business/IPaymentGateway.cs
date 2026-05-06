using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLMS.Business
{
    public interface IPaymentGateway
    {
        string CreatePaymentUrl(string orderId, decimal amount, string returnUrl);
        bool VerifyChecksum(IDictionary<string, string> queryData, string secureHash);
    }
}
