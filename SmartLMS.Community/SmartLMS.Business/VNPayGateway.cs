using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        public VNPayGateway(IConfiguration config, ILogger<VNPayGateway> logger)
        {
            _config = config;
            _logger = logger;
        }

        public string CreatePaymentUrl(string orderId, decimal amount, string returnUrl)
        {
            var vnpayConfig = _config.GetSection("VNPay");
            string baseUrl = vnpayConfig["BaseUrl"] ?? "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            string hashSecret = vnpayConfig["HashSecret"] ?? "";
            string tmnCode = vnpayConfig["TmnCode"] ?? "";

            var data = new SortedDictionary<string, string>(StringComparer.Ordinal);
            
            data.Add("vnp_Version", vnpayConfig["Version"] ?? "2.1.0");
            data.Add("vnp_Command", vnpayConfig["Command"] ?? "pay");
            data.Add("vnp_TmnCode", tmnCode);
            data.Add("vnp_Amount", ((long)(amount * 100)).ToString());
            data.Add("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            data.Add("vnp_CurrCode", vnpayConfig["CurrCode"] ?? "VND");
            data.Add("vnp_IpAddr", "127.0.0.1"); // Trong prod nên lấy IP thật của User
            data.Add("vnp_Locale", vnpayConfig["Locale"] ?? "vn");
            data.Add("vnp_OrderInfo", $"Thanh toan khoa hoc: {orderId}");
            data.Add("vnp_OrderType", "other");
            data.Add("vnp_ReturnUrl", returnUrl);
            data.Add("vnp_TxnRef", orderId);

            // Build query string
            StringBuilder query = new StringBuilder();
            StringBuilder hashData = new StringBuilder();

            foreach (var kv in data)
            {
                if (!string.IsNullOrEmpty(kv.Value))
                {
                    query.Append(WebUtility.UrlEncode(kv.Key) + "=" + WebUtility.UrlEncode(kv.Value) + "&");
                    hashData.Append(kv.Key + "=" + kv.Value + "&"); // VNPay raw hash data không encode value
                }
            }

            string queryString = query.ToString().TrimEnd('&');
            string rawHash = hashData.ToString().TrimEnd('&');

            // Tính chữ ký bảo mật
            string secureHash = GenerateHmacSHA512(hashSecret, rawHash);
            
            return baseUrl + "?" + queryString + "&vnp_SecureHash=" + secureHash;
        }

        public bool VerifyChecksum(IDictionary<string, string> queryData, string secureHash)
        {
            string hashSecret = _config["VNPay:HashSecret"] ?? "";
            
            var checkData = new SortedDictionary<string, string>(StringComparer.Ordinal);
            foreach (var kv in queryData)
            {
                if (kv.Key.StartsWith("vnp_") && kv.Key != "vnp_SecureHash" && kv.Key != "vnp_SecureHashType")
                {
                    checkData.Add(kv.Key, kv.Value);
                }
            }

            StringBuilder hashData = new StringBuilder();
            foreach (var kv in checkData)
            {
                if (!string.IsNullOrEmpty(kv.Value))
                {
                    hashData.Append(kv.Key + "=" + kv.Value + "&");
                }
            }

            string rawHash = hashData.ToString().TrimEnd('&');
            string myChecksum = GenerateHmacSHA512(hashSecret, rawHash);

            bool isValid = myChecksum.Equals(secureHash, StringComparison.InvariantCultureIgnoreCase);
            if (!isValid)
            {
                _logger.LogWarning("[VNPay Checksum Failed] Expected: {Expected}, Received: {Received}", myChecksum, secureHash);
            }
            return isValid;
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
