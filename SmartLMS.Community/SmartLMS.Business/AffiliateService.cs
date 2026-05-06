using QRCoder;
using System;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IAffiliateService
{
    string GenerateQRCodeBase64(string affiliateLink);
}

public class AffiliateService : IAffiliateService
{
    public string GenerateQRCodeBase64(string affiliateLink)
    {
        if (string.IsNullOrEmpty(affiliateLink)) return "";

        using (var qrGenerator = new QRCodeGenerator())
        using (var qrCodeData = qrGenerator.CreateQrCode(affiliateLink, QRCodeGenerator.ECCLevel.Q))
        using (var qrCode = new Base64QRCode(qrCodeData))
        {
            // Trả về chuỗi Base64 để nhúng thẳng vào thẻ <img> HTML
            return qrCode.GetGraphic(20);
        }
    }
}
