using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Business;

public interface IUserService
{
    Task<User?> AuthenticateAsync(string username, string password);
    Task<User?> GetUserByEmailAsync(string email);
    Task<bool> RegisterAsync(User user, string password);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<IEnumerable<User>> GetUsersByHierarchyAsync(int requesterHierarchyLevel, int? requesterDepartmentId);
    Task<bool> UpdateUserStatusAsync(int userId, int status);
    Task<bool> SetPasswordAsync(int userId, string newPassword);
    Task<IEnumerable<AuditLog>> GetAuditTrailAsync(int? userId = null);
}
