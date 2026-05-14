using System.Security.Cryptography;
using System.Text;

namespace SmartLMS.Models.Security;

public class EncryptionService : IEncryptionService
{
    private readonly byte[] _key;
    private readonly byte[] _iv;

    public EncryptionService(Microsoft.Extensions.Configuration.IConfiguration configuration)
    {
        var masterKey = configuration["Security:MasterKey"] ?? "SmartLMS_Super_Secure_Key_32Chr!";
        var salt = configuration["Security:Salt"] ?? "SmartLMS_Vector!";

        // Đảm bảo Key đủ 32 bytes cho AES-256
        _key = Encoding.UTF8.GetBytes(masterKey.PadRight(32).Substring(0, 32));
        _iv = Encoding.UTF8.GetBytes(salt.PadRight(16).Substring(0, 16));
    }

    public string Encrypt(string plainText)
    {
        if (string.IsNullOrEmpty(plainText)) return plainText;

        using var aes = Aes.Create();
        aes.Key = _key;
        aes.IV = _iv;

        var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
        using var ms = new MemoryStream();
        using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
        {
            using (var sw = new StreamWriter(cs))
            {
                sw.Write(plainText);
            }
        }
        return Convert.ToBase64String(ms.ToArray());
    }

    public string Decrypt(string cipherText)
    {
        if (string.IsNullOrEmpty(cipherText)) return cipherText;

        using var aes = Aes.Create();
        aes.Key = _key;
        aes.IV = _iv;

        var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
        using var ms = new MemoryStream(Convert.FromBase64String(cipherText));
        using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
        using var sr = new StreamReader(cs);
        return sr.ReadToEnd();
    }

    public string CreateHash(string input)
    {
        if (string.IsNullOrEmpty(input)) return input;
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(bytes);
    }
}
