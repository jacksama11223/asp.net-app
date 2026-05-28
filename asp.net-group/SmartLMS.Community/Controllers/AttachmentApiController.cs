using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Community.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AttachmentApiController : ControllerBase
    {
        private readonly SmartLMSContext _context;
        private readonly IWebHostEnvironment _env;

        // Giới hạn dung lượng: 15MB
        private const long MAX_FILE_SIZE = 15 * 1024 * 1024;
        private readonly string[] ALLOWED_EXTENSIONS = { ".pdf", ".zip", ".png", ".jpg", ".jpeg", ".docx" };

        public AttachmentApiController(SmartLMSContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Không có file nào được tải lên." });

            if (file.Length > MAX_FILE_SIZE)
                return BadRequest(new { message = "Dung lượng file vượt quá giới hạn 15MB." });

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!ALLOWED_EXTENSIONS.Contains(extension))
                return BadRequest(new { message = "Định dạng file không được hỗ trợ. Chỉ chấp nhận .pdf, .zip, .png, .jpg, .jpeg, .docx" });

            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out int userId))
                return Unauthorized();

            // Lưu trữ file
            var uploadsFolder = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "uploads", "attachments");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(file.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileUrl = $"/uploads/attachments/{uniqueFileName}";

            var attachment = new Attachment
            {
                FileName = file.FileName,
                FileUrl = fileUrl,
                FileType = extension.Replace(".", ""),
                FileSize = file.Length,
                UploaderId = userId,
                UploadedAt = DateTime.UtcNow
            };

            _context.Attachments.Add(attachment);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = attachment.Id,
                fileName = attachment.FileName,
                fileUrl = attachment.FileUrl,
                message = "Tải lên thành công"
            });
        }
    }
}
