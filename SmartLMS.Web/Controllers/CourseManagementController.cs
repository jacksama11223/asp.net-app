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
            await PopulateInstructorsAsync();
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
            var coursesFromDb = await _context.Courses
                .Include(c => c.Instructor)
                .Select(c => new {
                    c.CourseId,
                    Title = c.Title ?? "(Chưa đặt tên)",
                    Category = c.Category ?? "",
                    InstructorName = c.Instructor != null ? c.Instructor.FullName : "N/A",
                    Price = c.Price ?? 0,
                    Status = c.Status ?? "Draft",
                    ThumbnailUrl = c.ThumbnailUrl ?? "",
                    CreatedAt = c.CreatedAt
                })
                .ToListAsync();

            var courses = coursesFromDb.Select(c => new {
                courseId        = c.CourseId,
                title           = c.Title,
                category        = c.Category,
                instructorName  = c.InstructorName,
                price           = c.Price,
                priceFormatted  = string.Format("{0:N0}", c.Price) + " đ",
                status          = c.Status,
                thumbnailUrl    = c.ThumbnailUrl,
                createdAt       = c.CreatedAt.HasValue ? c.CreatedAt.Value.ToString("dd/MM/yyyy") : ""
            }).ToList();

            // Lấy Trend Data thực tế cho từng khóa học
            var result = new List<object>();
            foreach (var c in courses)
            {
                var trend = await _courseService.GetTrendDataAsync(c.courseId);
                result.Add(new {
                    c.courseId, c.title, c.category, c.instructorName, c.price, c.priceFormatted,
                    c.status, c.thumbnailUrl, c.createdAt,
                    enrollmentTrend = trend
                });
            }

            return Json(new { data = result });
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            await PopulateInstructorsAsync();
            return View(new Course { Status = "Draft", Price = 0 });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Course course, Microsoft.AspNetCore.Http.IFormFile? thumbnail)
        {
            if (ModelState.IsValid)
            {
                if (thumbnail != null && thumbnail.Length > 0)
                {
                    course.ThumbnailUrl = await HandleFileUpload(thumbnail);
                }

                await _courseService.CreateAsync(course);
                return RedirectToAction(nameof(Index));
            }
            await PopulateInstructorsAsync(course.InstructorId);
            return View(course);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var course = await _courseService.GetCourseByIdAsync(id);
            if (course == null) return NotFound();

            await PopulateInstructorsAsync(course.InstructorId);
            return View(course);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Course course, Microsoft.AspNetCore.Http.IFormFile? thumbnail)
        {
            if (ModelState.IsValid)
            {
                if (thumbnail != null && thumbnail.Length > 0)
                {
                    course.ThumbnailUrl = await HandleFileUpload(thumbnail);
                }

                await _courseService.UpdateAsync(course);
                return RedirectToAction(nameof(Index));
            }
            await PopulateInstructorsAsync(course.InstructorId);
            return View(course);
        }

        private async Task<string> HandleFileUpload(Microsoft.AspNetCore.Http.IFormFile file)
        {
            var fileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(file.FileName);
            var filePath = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "wwwroot", "uploads", "courses", fileName);

            using (var stream = new System.IO.FileStream(filePath, System.IO.FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return "/uploads/courses/" + fileName;
        }

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
        // CURRICULUM TREE BUILDER & UPDATE
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
            if (updates == null) return Json(new { success = false });

            foreach (var update in updates)
            {
                if (update.Id == null) continue;

                if (update.Id.StartsWith("mod_"))
                {
                    int id = int.Parse(update.Id.Replace("mod_", ""));
                    var module = await _context.CourseModules.FindAsync(id);
                    if (module != null) module.OrderIndex = update.Order;
                }
                else if (update.Id.StartsWith("les_"))
                {
                    int id = int.Parse(update.Id.Replace("les_", ""));
                    var lesson = await _context.Lessons.FindAsync(id);
                    if (lesson != null)
                    {
                        lesson.OrderIndex = update.Order;
                        // Nếu có ParentId trong DTO, ta có thể cập nhật ModuleId của Lesson tại đây
                        if (update.ParentId != null && update.ParentId.StartsWith("mod_"))
                        {
                            lesson.ModuleId = int.Parse(update.ParentId.Replace("mod_", ""));
                        }
                    }
                }
            }

            await _context.SaveChangesAsync();
            return Json(new { success = true });
        }

        public class TreeUpdateDto { public string? Id { get; set; } public string? ParentId { get; set; } public int Order { get; set; } }

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
