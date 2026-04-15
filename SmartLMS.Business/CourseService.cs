using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Business;

// ─────────────────────────────────────────────────────────────
// Interface
// ─────────────────────────────────────────────────────────────
public interface ICourseService
{
    Task<IEnumerable<Course>> GetAllCoursesAsync();
    Task<Course?> GetCourseByIdAsync(int id);
    Task<Course> CreateAsync(Course course);
    Task<Course?> UpdateAsync(Course course);
    Task<bool> SoftDeleteAsync(int id);
    Task<bool> ToggleStatusAsync(int id, string newStatus);
    Task<bool> BulkToggleStatusAsync(int[] ids, string newStatus);
    Task<bool> BulkDeleteAsync(int[] ids);
    Task<CourseStatsDto> GetStatsAsync();
}

// ─────────────────────────────────────────────────────────────
// DTO cho Stats Cards trên đầu trang
// ─────────────────────────────────────────────────────────────
public class CourseStatsDto
{
    public int Total { get; set; }
    public int Published { get; set; }
    public int Draft { get; set; }
    public int Archived { get; set; }
    public int TotalEnrollments { get; set; }
}

// ─────────────────────────────────────────────────────────────
// Implementation
// ─────────────────────────────────────────────────────────────
public class CourseService : ICourseService
{
    private readonly SmartLMSContext _context;

    public CourseService(SmartLMSContext context)
    {
        _context = context;
    }

    /// <summary>Lấy tất cả khóa học chưa bị xóa mềm (HasQueryFilter tự động lọc IsDeleted=1).</summary>
    public async Task<IEnumerable<Course>> GetAllCoursesAsync()
    {
        return await _context.Courses
            .Include(c => c.Instructor)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();
    }

    public async Task<Course?> GetCourseByIdAsync(int id)
    {
        return await _context.Courses
            .Include(c => c.Instructor)
            .FirstOrDefaultAsync(c => c.CourseId == id);
    }

    public async Task<Course> CreateAsync(Course course)
    {
        course.CreatedAt = DateTime.Now;
        course.UpdatedAt = DateTime.Now;
        course.IsDeleted = false;
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return course;
    }

    public async Task<Course?> UpdateAsync(Course course)
    {
        var existing = await _context.Courses.FindAsync(course.CourseId);
        if (existing == null) return null;

        existing.Title              = course.Title;
        existing.Description        = course.Description;
        existing.Category           = course.Category;
        existing.Price              = course.Price;
        existing.Status             = course.Status;
        existing.ThumbnailUrl       = course.ThumbnailUrl;
        existing.InstructorId       = course.InstructorId;
        existing.AI_BaseSalaryImpact = course.AI_BaseSalaryImpact;
        existing.UpdatedAt          = DateTime.Now;

        await _context.SaveChangesAsync();
        return existing;
    }

    /// <summary>Soft Delete – chỉ set IsDeleted = true, KHÔNG xóa khỏi DB.</summary>
    public async Task<bool> SoftDeleteAsync(int id)
    {
        // Phải IgnoreQueryFilters để tìm thấy khóa đã bị filter
        var course = await _context.Courses
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(c => c.CourseId == id);

        if (course == null) return false;

        course.IsDeleted  = true;
        course.UpdatedAt  = DateTime.Now;
        await _context.SaveChangesAsync();
        return true;
    }

    /// <summary>Đổi trạng thái: Draft / Published / Archived.</summary>
    public async Task<bool> ToggleStatusAsync(int id, string newStatus)
    {
        var allowed = new[] { "Draft", "Published", "Archived" };
        if (!allowed.Contains(newStatus)) return false;

        var course = await _context.Courses.FindAsync(id);
        if (course == null) return false;

        await _context.SaveChangesAsync();
        return true;
    }

    /// <summary>Cập nhật trạng thái hàng loạt cho nhiều ID.</summary>
    public async Task<bool> BulkToggleStatusAsync(int[] ids, string newStatus)
    {
        var allowed = new[] { "Draft", "Published", "Archived" };
        if (!allowed.Contains(newStatus)) return false;

        var courses = await _context.Courses
            .Where(c => ids.Contains(c.CourseId))
            .ToListAsync();

        foreach (var c in courses)
        {
            c.Status    = newStatus;
            c.UpdatedAt = DateTime.Now;
        }

        await _context.SaveChangesAsync();
        return true;
    }

    /// <summary>Xóa mềm hàng loạt cho nhiều ID.</summary>
    public async Task<bool> BulkDeleteAsync(int[] ids)
    {
        var courses = await _context.Courses
            .Where(c => ids.Contains(c.CourseId))
            .ToListAsync();

        foreach (var c in courses)
        {
            c.IsDeleted = true;
            c.UpdatedAt = DateTime.Now;
        }

        await _context.SaveChangesAsync();
        return true;
    }

    /// <summary>Thống kê nhanh cho Stats Cards.</summary>
    public async Task<CourseStatsDto> GetStatsAsync()
    {
        var courses = await _context.Courses
            .Include(c => c.Enrollments)
            .ToListAsync();

        return new CourseStatsDto
        {
            Total            = courses.Count,
            Published        = courses.Count(c => c.Status == "Published"),
            Draft            = courses.Count(c => c.Status == "Draft"),
            Archived         = courses.Count(c => c.Status == "Archived"),
            TotalEnrollments = courses.Sum(c => c.Enrollments.Count)
        };
    }
}
