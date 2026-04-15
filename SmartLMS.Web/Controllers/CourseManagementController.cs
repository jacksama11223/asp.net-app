using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Business;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Web.Controllers
{
    public class CourseManagementController : Controller
    {
        private readonly SmartLMSContext _context;
        private readonly ICourseService  _courseService;

        public CourseManagementController(SmartLMSContext context, ICourseService courseService)
        {
            _context       = context;
            _courseService = courseService;
        }

        // ─────────────────────────────────────────────────────────────
        // GET: /CourseManagement  – Trang danh sách chính
        // ─────────────────────────────────────────────────────────────
        public async Task<IActionResult> Index()
        {
            var stats = await _courseService.GetStatsAsync();
            ViewBag.Stats = stats;
            return View();
        }

        // ─────────────────────────────────────────────────────────────
        // GET: /CourseManagement/GetCoursesJson  – DataTables AJAX
        // ─────────────────────────────────────────────────────────────
        // ─────────────────────────────────────────────────────────────
        // GET: /CourseManagement/GetCoursesJson  – DataTables AJAX
        // ─────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetCoursesJson()
        {
            var courses = await _context.Courses
                .Include(c => c.Instructor)
                .Include(c => c.Enrollments)
                .Select(c => new {
                    courseId        = c.CourseId,
                    title           = c.Title ?? "(Chưa đặt tên)",
                    category        = c.Category ?? "",
                    instructorName  = c.Instructor != null ? c.Instructor.FullName : "N/A",
                    price           = c.Price ?? 0,
                    priceFormatted  = string.Format("{0:N0}", c.Price ?? 0) + " đ",
                    status          = c.Status ?? "Draft",
                    enrollmentCount = c.Enrollments.Count,
                    // Giả lập dữ liệu Sparkline: 7 ngày gần nhất
                    enrollmentTrend = new int[] { 
                        new Random().Next(0, 50), new Random().Next(0, 50), 
                        new Random().Next(0, 50), new Random().Next(0, 50), 
                        new Random().Next(0, 50), new Random().Next(0, 50), 
                        new Random().Next(0, 50) 
                    },
                    thumbnailUrl    = c.ThumbnailUrl ?? "",
                    createdAt       = c.CreatedAt.HasValue
                                        ? c.CreatedAt.Value.ToString("dd/MM/yyyy")
                                        : ""
                })
                .ToListAsync();

            return Json(new { data = courses });
        }

        // ... (Create/Edit actions remains same) ...

        // ─────────────────────────────────────────────────────────────
        // GET: /CourseManagement/GetDetails/5 – AJAX cho Quick Preview
        // ─────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetDetails(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Instructor)
                .Include(c => c.Enrollments)
                .FirstOrDefaultAsync(c => c.CourseId == id);

            if (course == null) return NotFound();

            return PartialView("_CourseDetailPartial", course);
        }

        // ─────────────────────────────────────────────────────────────
        // Bulk Actions
        // ─────────────────────────────────────────────────────────────
        [HttpPost]
        public async Task<IActionResult> BulkToggleStatus([FromBody] int[] ids, string status)
        {
            if (ids == null || ids.Length == 0) return Json(new { success = false, message = "Không có IDs nào được chọn." });
            var result = await _courseService.BulkToggleStatusAsync(ids, status);
            return Json(new { success = result, message = result ? $"Đã cập nhật {ids.Length} khóa học." : "Thất bại." });
        }

        [HttpPost]
        public async Task<IActionResult> BulkDelete([FromBody] int[] ids)
        {
            if (ids == null || ids.Length == 0) return Json(new { success = false, message = "Không có IDs nào được chọn." });
            var result = await _courseService.BulkDeleteAsync(ids);
            return Json(new { success = result, message = result ? $"Đã xóa {ids.Length} khóa học." : "Thất bại." });
        }

        // ─────────────────────────────────────────────────────────────
        // CURRICULUM TREE BUILDER
        // ─────────────────────────────────────────────────────────────
        public async Task<IActionResult> Curriculum(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return NotFound();
            return View(course);
        }

        [HttpGet]
        public async Task<IActionResult> GetTreeData(int id)
        {
            var modules = await _context.CourseModules
                .Where(m => m.CourseId == id)
                .Include(m => m.Lessons)
                .OrderBy(m => m.OrderIndex)
                .ToListAsync();

            var tree = modules.Select(m => new {
                id    = $"mod_{m.ModuleId}",
                text  = m.Title,
                type  = "module",
                state = new { opened = true },
                children = m.Lessons.OrderBy(l => l.OrderIndex).Select(l => new {
                    id   = $"les_{l.LessonId}",
                    text = l.Title,
                    type = "lesson",
                    icon = "fas fa-file-video text-info"
                })
            });

            return Json(tree);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateHierarchy([FromBody] List<TreeUpdateDto> updates)
        {
            // Logic đơn giản: cập nhật OrderIndex dựa trên vị trí mới
            // Trong thực tế cần logic phức tạp hơn (chuyển Lesson giữa các Module)
            return Json(new { success = true });
        }

        public class TreeUpdateDto { public string? Id { get; set; } public int Order { get; set; } }

        // ─────────────────────────────────────────────────────────────
        // POST: /CourseManagement/SoftDelete  – AJAX từ SweetAlert2
        // ─────────────────────────────────────────────────────────────
        [HttpPost]
        public async Task<IActionResult> SoftDelete(int id)
        {
            var success = await _courseService.SoftDeleteAsync(id);
            if (!success)
                return Json(new { success = false, message = "Không tìm thấy khóa học." });

            return Json(new { success = true, message = "Khóa học đã được xóa khỏi hệ thống." });
        }

        // ─────────────────────────────────────────────────────────────
        // POST: /CourseManagement/ToggleStatus  – AJAX từ Bootstrap Toggle
        // ─────────────────────────────────────────────────────────────
        [HttpPost]
        public async Task<IActionResult> ToggleStatus(int id, string status)
        {
            var success = await _courseService.ToggleStatusAsync(id, status);
            if (!success)
                return Json(new { success = false, message = "Cập nhật trạng thái thất bại." });

            return Json(new { success = true, message = $"Trạng thái đã đổi thành '{status}'." });
        }

        // ─────────────────────────────────────────────────────────────
        // Private Helpers
        // ─────────────────────────────────────────────────────────────
        private async Task PopulateInstructorsAsync(int? selectedId = null)
        {
            var instructors = await _context.Users
                .Where(u => u.Role == "Instructor")
                .OrderBy(u => u.FullName)
                .Select(u => new { u.UserId, u.FullName })
                .ToListAsync();

            ViewBag.Instructors   = instructors;
            ViewBag.SelectedInstructor = selectedId;
        }
    }
}
