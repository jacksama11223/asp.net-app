using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace SmartLMS.Business
{
    public class VNPayGateway : IPaymentGateway
    {
        private readonly IConfiguration _config;
        private readonly ILogger<VNPayGateway> _logger;
        private readonly string _hashSecret; // Chuỗi Hash (Ví dụ: FJDKSJFSDKL123)

        public VNPayGateway(IConfiguration config, ILogger<VNPayGateway> logger)
        {
            _config = config;
            _logger = logger;
            _hashSecret = _config["VNPay:HashSecret"] ?? "DUMMY_SECRET_FOR_LOCAL_TESTING_2026";
        }

        public string CreatePaymentUrl(string orderId, decimal amount, string returnUrl)
        {
            // Logic build URL (Lược giản để tập trung vào phần Verify Checksum)
            return $"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount={(long)(amount * 100)}&vnp_Command=pay&vnp_OrderInfo=ThanhToan_{orderId}";
        }

        public bool VerifyChecksum(IDictionary<string, string> queryData, string secureHash)
        {
            if (string.IsNullOrEmpty(secureHash) || queryData == null) return false;

            // Xóa mã hash cũ ra khỏi danh sách tham số để chuẩn bị tạo lại chữ ký
            var checkData = new Dictionary<string, string>(queryData);
            checkData.Remove("vnp_SecureHashType");
            checkData.Remove("vnp_SecureHash");

            // Build chuỗi theo chuẩn của VNPay: param1=value1&param2=value2 (Xếp theo bảng chữ cái)
            var signData = string.Join("&", checkData
                .Where(x => !string.IsNullOrEmpty(x.Value))
                .OrderBy(x => x.Key)
                .Select(x => $"{x.Key}={Uri.EscapeDataString(x.Value)}"));

            var myChecksum = GenerateHmacSHA512(_hashSecret, signData);

            // Kiểm tra chữ ký tự sinh có khớp với chữ ký VNPay gửi về không
            if (myChecksum.Equals(secureHash, StringComparison.InvariantCultureIgnoreCase))
            {
                return true;
            }

            _logger.LogWarning($"[VNPay Anti-Hack] Cảnh báo giả mạo chữ ký! Hash gốc: {secureHash} | Sinh ra: {myChecksum}");
            return false;
        }

        private static string GenerateHmacSHA512(string key, string inputData)
        {
            var hash = new StringBuilder();
            byte[] keyBytes = Encoding.UTF8.GetBytes(key);
            byte[] inputBytes = Encoding.UTF8.GetBytes(inputData);
            using (var hmac = new HMACSHA512(keyBytes))
            {
                byte[] hashValue = hmac.ComputeHash(inputBytes);
                foreach (var theByte in hashValue)
                {
                    hash.Append(theByte.ToString("x2"));
                }
            }

            return hash.ToString();
        }
    }
}
