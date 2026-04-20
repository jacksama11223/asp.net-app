namespace SmartLMS.Models.Security;

public interface IEncryptionService
{
    string Encrypt(string plainText);
    string Decrypt(string cipherText);
    string CreateHash(string input);
}
