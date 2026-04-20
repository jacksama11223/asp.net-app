using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMS.Business
{
    public class ApiKeyService : IApiKeyService
    {
        private readonly SmartLMSContext _context;

        public ApiKeyService(SmartLMSContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ApiKey>> GetOrganizationKeysAsync(int organizationId)
        {
            return await _context.ApiKeys
                .Where(x => x.OrganizationId == organizationId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task<(string RawKey, ApiKey ApiKey)> GenerateKeyAsync(int organizationId, string name)
        {
            // 1. Tạo chuỗi ngẫu nhiên (32 byte -> 64 char hex)
            var bytes = new byte[32];
            RandomNumberGenerator.Fill(bytes);
            string rawKey = "slms_" + Convert.ToHexString(bytes).ToLower();

            // 2. Băm khóa để lưu trữ (Không lưu bản thô)
            string hashedKey = HashKey(rawKey);

            var apiKey = new ApiKey
            {
                OrganizationId = organizationId,
                Name = name,
                HashedKey = hashedKey,
                KeyPreview = rawKey.Substring(0, 10) + "...", // Hiển thị 5 char đầu để nhận diện
                CreatedAt = DateTime.Now,
                IsActive = true
            };

            _context.ApiKeys.Add(apiKey);
            await _context.SaveChangesAsync();

            return (rawKey, apiKey);
        }

        public async Task<ApiKey?> ValidateKeyAsync(string apiKey)
        {
            if (string.IsNullOrEmpty(apiKey)) return null;

            string hashed = HashKey(apiKey);
            var keyRepo = await _context.ApiKeys
                .Include(x => x.Organization)
                .FirstOrDefaultAsync(x => x.HashedKey == hashed && x.IsActive);

            if (keyRepo != null)
            {
                keyRepo.LastUsed = DateTime.Now;
                await _context.SaveChangesAsync();
            }

            return keyRepo;
        }

        public async Task<bool> RevokeKeyAsync(int keyId)
        {
            var key = await _context.ApiKeys.FindAsync(keyId);
            if (key == null) return false;

            key.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        private string HashKey(string rawKey)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(rawKey);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToHexString(hash).ToLower();
        }
    }
}
