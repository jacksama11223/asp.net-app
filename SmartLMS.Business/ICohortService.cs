using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Business;

public interface ICohortService
{
    Task<IEnumerable<dynamic>> GetAllCohortsAsync();
    Task<bool> CreateCohortAsync(string name, string description);
    Task<IEnumerable<User>> GetStudentsInCohortAsync(int cohortId);
    Task<bool> AddStudentToCohortAsync(int userId, int cohortId);
    Task<bool> RemoveStudentFromCohortAsync(int userId, int cohortId);
}
