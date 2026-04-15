using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Business;

public interface ICohortService
{
    Task<IEnumerable<dynamic>> GetAllCohortsAsync();
    Task<Cohort?> GetCohortByIdAsync(int id);
    Task<bool> CreateCohortAsync(string name, string description);
    Task<bool> UpdateCohortAsync(int id, string name, string description);
    Task<bool> SoftDeleteCohortAsync(int id);
    Task<IEnumerable<User>> GetStudentsInCohortAsync(int cohortId);
    Task<bool> AddStudentToCohortAsync(int userId, int cohortId);
    Task<bool> RemoveStudentFromCohortAsync(int userId, int cohortId);
}
