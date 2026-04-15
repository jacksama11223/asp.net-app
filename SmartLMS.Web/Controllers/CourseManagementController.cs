using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Web.Controllers
{
    public class CourseManagementController : Controller
    {
        private readonly SmartLMSContext _context;

        public CourseManagementController(SmartLMSContext context)
        {
            _context = context;
        }

        // GET: CourseManagement
        public async Task<IActionResult> Index()
        {
            var courses = await _context.Courses
                .Include(c => c.Instructor)
                .ToListAsync();
            return View(courses);
        }

        // GET: CourseManagement/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CourseManagement/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Title,Description,Category,Price,Status,ThumbnailUrl")] Course course)
        {
            if (ModelState.IsValid)
            {
                course.CreatedAt = DateTime.Now;
                course.UpdatedAt = DateTime.Now;
                course.InstructorId = await GetCurrentUserIdAsync(); // dummy logic for now

                _context.Add(course);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(course);
        }

        // GET: CourseManagement/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return NotFound();

            var course = await _context.Courses.FindAsync(id);
            if (course == null) return NotFound();
            
            return View(course);
        }

        // POST: CourseManagement/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("CourseId,Title,Description,Category,Price,Status,ThumbnailUrl,InstructorId,CreatedAt")] Course course)
        {
            if (id != course.CourseId) return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    course.UpdatedAt = DateTime.Now;
                    _context.Update(course);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CourseExists(course.CourseId))
                        return NotFound();
                    else
                        throw;
                }
                return RedirectToAction(nameof(Index));
            }
            return View(course);
        }

        // GET: CourseManagement/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();

            var course = await _context.Courses
                .FirstOrDefaultAsync(m => m.CourseId == id);
            if (course == null) return NotFound();

            return View(course);
        }

        // POST: CourseManagement/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course != null)
            {
                _context.Courses.Remove(course);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.CourseId == id);
        }

        private async Task<int> GetCurrentUserIdAsync()
        {
            // Fallback to first user for demo purposes if not auth based
            var user = await _context.Users.FirstOrDefaultAsync();
            return user?.UserId ?? 1;
        }
    }
}
