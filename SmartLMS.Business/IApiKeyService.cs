using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Business
{
    public interface IApiKeyService
    {
        Task<IEnumerable<ApiKey>> GetOrganizationKeysAsync(int organizationId);
        Task<(string RawKey, ApiKey ApiKey)> GenerateKeyAsync(int organizationId, string name);
        Task<ApiKey?> ValidateKeyAsync(string apiKey);
        Task<bool> RevokeKeyAsync(int keyId);
    }
}
