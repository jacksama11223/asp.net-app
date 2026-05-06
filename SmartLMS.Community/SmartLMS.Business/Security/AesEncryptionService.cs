using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;

using SmartLMS.Models.Security;

namespace SmartLMS.Business.Security;

public class AesEncryptionService : IEncryptionService
{
    private readonly byte[] _key;
    private readonly byte[] _iv;

    public AesEncryptionService(IConfiguration configuration)
    {
        var masterKey = configuration["Security:MasterKey"] ?? "SmartLMS_Default_Master_Key_2026_!!";
        var salt = configuration["Security:Salt"] ?? "SmartLMS_Salt_2026";
        
        using var deriveBytes = new Rfc2898DeriveBytes(masterKey, Encoding.UTF8.GetBytes(salt), 10000, HashAlgorithmName.SHA256);
        _key = deriveBytes.GetBytes(32); // AES-256
        _iv = deriveBytes.GetBytes(16);
    }

    public string Encrypt(string plainText)
    {
        if (string.IsNullOrEmpty(plainText)) return plainText;

        using var aes = Aes.Create();
        aes.Key = _key;
        aes.IV = _iv;

        using var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
        using var ms = new MemoryStream();
        using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
        using (var sw = new StreamWriter(cs))
        {
            sw.Write(plainText);
        }

        return Convert.ToBase64String(ms.ToArray());
    }

    public string Decrypt(string cipherText)
    {
        if (string.IsNullOrEmpty(cipherText)) return cipherText;

        try
        {
            using var aes = Aes.Create();
            aes.Key = _key;
            aes.IV = _iv;

            using var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
            using var ms = new MemoryStream(Convert.FromBase64String(cipherText));
            using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
            using var sr = new StreamReader(cs);
            
            return sr.ReadToEnd();
        }
        catch
        {
            // Nếu không giải mã được (ví dụ dữ liệu cũ chưa mã hóa), trả về nguyên bản
            return cipherText;
        }
    }

    public string CreateHash(string input)
    {
        if (string.IsNullOrEmpty(input)) return input;
        
        using var hmac = new HMACSHA256(_key);
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.ToLower().Trim()));
        return Convert.ToBase64String(hash);
    }
}
