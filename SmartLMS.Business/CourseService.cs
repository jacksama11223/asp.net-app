using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Dapper;
using SmartLMS.Data;
using SmartLMS.Models;
using Microsoft.Extensions.Caching.Distributed;
using SmartLMS.Business.Extensions;

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
    Task<int[]> GetTrendDataAsync(int courseId);
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
    private readonly IDistributedCache _cache;

    public CourseService(SmartLMSContext context, IDistributedCache cache)
    {
        _context = context;
        _cache = cache;
    }

    /// <summary>Lấy tất cả khóa học chưa bị xóa mềm (Đã tối ưu hóa Cache).</summary>
    public async Task<IEnumerable<Course>> GetAllCoursesAsync()
    {
        var cacheKey = "AllActiveCoursesList";
        var cachedData = await _cache.GetRecordAsync<IEnumerable<Course>>(cacheKey);
        
        if (cachedData != null) return cachedData;

        var freshData = await _context.Courses
            .Include(c => c.Instructor)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

        await _cache.SetRecordAsync(cacheKey, freshData, TimeSpan.FromMinutes(10));
        return freshData;
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

        course.Status = newStatus;
        course.UpdatedAt = DateTime.Now;

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

    /// <summary>Thống kê nhanh cho Stats Cards (Đã tối ưu hóa qua Distributed Cache/Redis).</summary>
    public async Task<CourseStatsDto> GetStatsAsync()
    {
        var cacheKey = "CourseAdminDashboardStats";
        
        // 1. Tìm trong Redis / In-Memory Cache trước
        var cachedStats = await _cache.GetRecordAsync<CourseStatsDto>(cacheKey);
        if (cachedStats != null)
        {
            return cachedStats; // Trả về siêu tốc 1ms
        }

        // 2. Không có thì mới Query SQL Server (Heavy Operation)
        var freshStats = new CourseStatsDto
        {
            Total            = await _context.Courses.CountAsync(),
            Published        = await _context.Courses.CountAsync(c => c.Status == "Published"),
            Draft            = await _context.Courses.CountAsync(c => c.Status == "Draft"),
            Archived         = await _context.Courses.CountAsync(c => c.Status == "Archived"),
            TotalEnrollments = await _context.Enrollments.CountAsync()
        };

        // 3. Nạp lại vào Redis (Sống được 5 phút trước khi bay hơi)
        await _cache.SetRecordAsync(cacheKey, freshStats, TimeSpan.FromMinutes(5));

        return freshStats;
    }

    /// <summary>Lấy dữ liệu Trend thực tế từ Enrollments cho 7 ngày gần nhất.</summary>
    public async Task<int[]> GetTrendDataAsync(int courseId)
    {
        // Tạo mảng 7 ngày gần nhất
        var days = Enumerable.Range(0, 7)
            .Select(i => DateTime.Today.AddDays(-6 + i))
            .ToList();

        // Lấy enrollments 7 ngày gần nhất cho khóa học này
        var since = DateTime.Today.AddDays(-6);
        var enrollments = await _context.Enrollments
            .Where(e => e.CourseId == courseId && e.LastAccessDate >= since)
            .Select(e => e.LastAccessDate!.Value.Date)
            .ToListAsync();

        // Đếm số lượt truy cập mỗi ngày
        var trend = days
            .Select(d => enrollments.Count(e => e == d))
            .ToArray();

        return trend;
    }
}
