using Xunit;
using SmartLMS.Business.Security;
using SmartLMS.Data;
using SmartLMS.Models;
using SmartLMS.Business;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace SmartLMS.Tests;

public class EnterpriseDiagnosticTests
{
    // Test Giai đoạn 1: Encryption & Auditing
    [Fact]
    public void EncryptionService_Should_Encrypt_And_Decrypt_Correctlly()
    {
        var mockConfig = new Moq.Mock<Microsoft.Extensions.Configuration.IConfiguration>();
        mockConfig.Setup(c => c["Security:MasterKey"]).Returns("this_is_a_master_key_32_chars_long!!");
        mockConfig.Setup(c => c["Security:Salt"]).Returns("this_is_a_salt_16");

        var service = new AesEncryptionService(mockConfig.Object);
        var original = "student@example.com";
        
        var encrypted = service.Encrypt(original);
        var decrypted = service.Decrypt(encrypted);
        var hash = service.CreateHash(original);

        Assert.NotEqual(original, encrypted);
        Assert.Equal(original, decrypted);
        Assert.NotEmpty(hash);
    }

    [Fact]
    public async Task SmartLMSContext_Should_Generate_Audit_Logs()
    {
        var options = new DbContextOptionsBuilder<SmartLMSContext>()
            .UseInMemoryDatabase(databaseName: "AuditTestDB")
            .Options;

        using var context = new SmartLMSContext(options);
        var user = new User { Username = "tester", FullName = "Test User" };
        
        context.Users.Add(user);
        await context.SaveChangesAsync();

        user.FullName = "Updated Name";
        await context.SaveChangesAsync();

        var auditLog = await context.AuditLogs.FirstOrDefaultAsync(l => l.EntityName == "User");
        Assert.NotNull(auditLog); // Audit log phải tồn tại
        Assert.NotNull(auditLog.NewValues); // NewValues phải được ghi lại
    }

    // Test Giai đoạn 2: API Key Auth
    [Fact]
    public async Task ApiKeyService_Should_Generate_Valid_Keys()
    {
        var options = new DbContextOptionsBuilder<SmartLMSContext>()
            .UseInMemoryDatabase(databaseName: "ApiKeyTestDB_" + Guid.NewGuid())
            .Options;

        using var context = new SmartLMSContext(options);
        var service = new ApiKeyService(context);
        
        var (rawKey, apiKey) = await service.GenerateKeyAsync(1, "Partner Test");

        // Kiểm tra key được tạo đúng định dạng
        Assert.StartsWith("slms_", rawKey); // API key phải bắt đầu bằng 'slms_'
        Assert.NotNull(apiKey);
        Assert.Equal("Partner Test", apiKey.Name);
    }
}
