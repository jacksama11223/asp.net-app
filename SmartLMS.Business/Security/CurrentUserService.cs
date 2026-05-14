using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using SmartLMS.Models.Security;

namespace SmartLMS.Business.Security;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int? UserId 
    {
        get 
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(userIdClaim, out var id) ? id : null;
        }
    }
    
    public string? Username => _httpContextAccessor.HttpContext?.User?.Identity?.Name;
}
