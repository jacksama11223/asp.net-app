using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class CurriculumService : ICurriculumService
{
    private readonly SmartLMSContext _context;

    public CurriculumService(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CourseModule>> GetCurriculumAsync(int courseId)
    {
        return await _context.CourseModules
            .Include(m => m.Lessons)
            .Where(m => m.CourseId == courseId)
            .OrderBy(m => m.OrderIndex)
            .ToListAsync();
    }

    public async Task<CourseModule> AddModuleAsync(int courseId, string title)
    {
        var lastOrder = await _context.CourseModules
            .Where(m => m.CourseId == courseId)
            .MaxAsync(m => (int?)m.OrderIndex) ?? 0;

        var module = new CourseModule
        {
            CourseId = courseId,
            Title = title,
            OrderIndex = lastOrder + 1
        };

        _context.CourseModules.Add(module);
        await _context.SaveChangesAsync();
        return module;
    }

    public async Task<Lesson> AddLessonAsync(int moduleId, string title, string type)
    {
        var lastOrder = await _context.Lessons
            .Where(l => l.ModuleId == moduleId)
            .MaxAsync(l => (int?)l.OrderIndex) ?? 0;

        var lesson = new Lesson
        {
            ModuleId = moduleId,
            Title = title,
            OrderIndex = lastOrder + 1
        };

        _context.Lessons.Add(lesson);
        await _context.SaveChangesAsync();
        return lesson;
    }

    public async Task<bool> UpdateHierarchyAsync(List<ModuleOrderUpdate> updates)
    {
        try
        {
            foreach (var modUpdate in updates)
            {
                var module = await _context.CourseModules.FindAsync(modUpdate.ModuleId);
                if (module != null)
                {
                    module.OrderIndex = modUpdate.OrderIndex;
                    
                    foreach (var lessonUpdate in modUpdate.Lessons)
                    {
                        var lesson = await _context.Lessons.FindAsync(lessonUpdate.LessonId);
                        if (lesson != null)
                        {
                            lesson.OrderIndex = lessonUpdate.OrderIndex;
                        }
                    }
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> DeleteModuleAsync(int moduleId)
    {
        var module = await _context.CourseModules.FindAsync(moduleId);
        if (module == null) return false;

        _context.CourseModules.Remove(module);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteLessonAsync(int lessonId)
    {
        var lesson = await _context.Lessons.FindAsync(lessonId);
        if (lesson == null) return false;

        _context.Lessons.Remove(lesson);
        await _context.SaveChangesAsync();
        return true;
    }
}
