using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using SmartLMS.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;

namespace SmartLMS.Business;

public class UserService : IUserService
{
    private readonly SmartLMSContext _context;
    private readonly IEncryptionService _encryptionService;

    public UserService(SmartLMSContext context, IEncryptionService encryptionService)
    {
        _context = context;
        _encryptionService = encryptionService;
    }

    public async Task<User?> AuthenticateAsync(string username, string password)
    {
        // Username không mã hóa nên tìm kiếm trực tiếp bình thường
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == username && u.Status == 1);

        if (user != null && !string.IsNullOrEmpty(user.PasswordHash))
        {
            if (BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return user;
            }
        }
        return null;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        if (string.IsNullOrEmpty(email)) return null;

        // SỬ DỤNG BLIND INDEX (HASH) ĐỂ TÌM KIẾM
        var emailHash = _encryptionService.CreateHash(email);
        return await _context.Users
            .FirstOrDefaultAsync(u => u.EmailHash == emailHash);
    }

    public async Task<bool> RegisterAsync(User user, string password)
    {
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
        user.CreatedDate = DateTime.Now;
        user.Status = 1;
        
        // EmailHash sẽ được tự động tạo trong SmartLMSContext.SaveChangesAsync
        
        _context.Users.Add(user);
        var affected = await _context.SaveChangesAsync();
        return affected > 0;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        // Mặc định trả về toàn bộ, controller sẽ lọc dựa trên quyền hạn
        return await _context.Users
            .OrderByDescending(u => u.CreatedDate)
            .ToListAsync();
    }

    public async Task<IEnumerable<User>> GetUsersByHierarchyAsync(int requesterHierarchyLevel, int? requesterDepartmentId)
    {
        IQueryable<User> query = _context.Users;

        // RBAC Logic:
        // Cấp 1 (SuperAdmin): Thấy hết
        // Cấp 2 (DeptAdmin): Thấy cùng phòng ban
        // Cấp 3 (Staff): Thấy chính mình (hoặc lọc thêm tùy nghiệp vụ)

        if (requesterHierarchyLevel == 2)
        {
            query = query.Where(u => u.DepartmentId == requesterDepartmentId);
        }
        else if (requesterHierarchyLevel >= 3)
        {
            // Staff chỉ thấy những người quản lý trực tiếp hoặc chính mình (giả định đơn giản cho demo)
            query = query.Where(u => u.HierarchyLevel >= 3);
        }

        return await query.OrderByDescending(u => u.CreatedDate).ToListAsync();
    }

    public async Task<bool> UpdateUserStatusAsync(int userId, int status)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return false;

        user.Status = status;
        var affected = await _context.SaveChangesAsync();
        return affected > 0;
    }

    public async Task<bool> SetPasswordAsync(int userId, string newPassword)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return false;

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
        var affected = await _context.SaveChangesAsync();
        return affected > 0;
    }

    public async Task<IEnumerable<AuditLog>> GetAuditTrailAsync(int? userId = null)
    {
        IQueryable<AuditLog> query = _context.AuditLogs;
        
        if (userId.HasValue)
        {
            query = query.Where(l => l.UserId == userId.Value);
        }

        return await query.OrderByDescending(l => l.Timestamp)
                          .Take(100) // Giới hạn 100 bản ghi gần nhất để tối ưu hiệu năng
                          .ToListAsync();
    }
}
