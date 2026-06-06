using SmartLMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface ICurriculumService
{
    Task<IEnumerable<CourseModule>> GetCurriculumAsync(int courseId);
    Task<CourseModule> AddModuleAsync(int courseId, string title);
    Task<Lesson> AddLessonAsync(int moduleId, string title, string type);
    Task<bool> UpdateHierarchyAsync(List<ModuleOrderUpdate> updates);
    Task<bool> DeleteModuleAsync(int moduleId);
    Task<bool> DeleteLessonAsync(int lessonId);
}

public class ModuleOrderUpdate
{
    public int ModuleId { get; set; }
    public int OrderIndex { get; set; }
    public List<LessonOrderUpdate> Lessons { get; set; } = new();
}

public class LessonOrderUpdate
{
    public int LessonId { get; set; }
    public int OrderIndex { get; set; }
}
