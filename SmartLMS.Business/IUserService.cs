using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Business;

public interface IUserService
{
    Task<User?> AuthenticateAsync(string username, string password);
    Task<bool> RegisterAsync(User user, string password);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<bool> UpdateUserStatusAsync(int userId, int status);
    Task<bool> SetPasswordAsync(int userId, string newPassword);
}
