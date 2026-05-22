using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text;

namespace SmartLMS.Web.Controllers.Api
{
    [Route("api/ui-export")]
    [ApiController]
    public class UiExportApiController : ControllerBase
    {
        private readonly string[] _allowedExtensions = new[] { ".jsx", ".js", ".tsx", ".ts", ".css", ".cshtml" };

        [HttpGet]
        public IActionResult ExportUiCode()
        {
            // Trong Docker (Linux), source code được map vào /app/source-code
            // Còn khi chạy Local ở Windows, nó sẽ là thư mục gốc của project (vd: c:\code\asp.net)
            string baseDir = Directory.Exists("/app/source-code") 
                ? "/app/source-code" 
                : Directory.GetParent(Directory.GetCurrentDirectory())?.FullName ?? Directory.GetCurrentDirectory();

            string[] targetDirs = new[]
            {
                Path.Combine(baseDir, "react-test-frontend", "src"),
                Path.Combine(baseDir, "SmartLMS.Web", "Views")
            };

            var allFiles = new List<string>();

            foreach (var dir in targetDirs)
            {
                if (Directory.Exists(dir))
                {
                    GetAllFiles(dir, allFiles);
                }
            }

            if (allFiles.Count == 0)
            {
                return NotFound(new { message = "Không tìm thấy file giao diện nào trong hệ thống.", baseDir });
            }

            var resultString = new StringBuilder();
            resultString.AppendLine("# TOÀN BỘ CODE GIAO DIỆN DỰ ÁN SMARTLMS\n");
            resultString.AppendLine("Dưới đây là toàn bộ mã nguồn liên quan đến giao diện (React và ASP.NET MVC).\n");

            foreach (var file in allFiles)
            {
                try
                {
                    var relativePath = Path.GetRelativePath(baseDir, file);
                    var content = System.IO.File.ReadAllText(file);
                    
                    resultString.AppendLine("\n// =========================================================================");
                    resultString.AppendLine($"// FILE: {relativePath}");
                    resultString.AppendLine("// =========================================================================\n");
                    resultString.AppendLine(content);
                    resultString.AppendLine("\n");
                }
                catch
                {
                    // Ignore unreadable files
                }
            }

            // Trả về file dưới dạng text tĩnh để người dùng có thể Download hoặc lưu trực tiếp
            var bytes = Encoding.UTF8.GetBytes(resultString.ToString());
            return File(bytes, "text/plain", "GiaoDienToanTap.txt");
        }

        private void GetAllFiles(string dirPath, List<string> arrayOfFiles)
        {
            try
            {
                var files = Directory.GetFiles(dirPath);
                foreach (var file in files)
                {
                    var ext = Path.GetExtension(file).ToLower();
                    if (_allowedExtensions.Contains(ext))
                    {
                        arrayOfFiles.Add(file);
                    }
                }

                var subDirs = Directory.GetDirectories(dirPath);
                foreach (var subDir in subDirs)
                {
                    var dirName = Path.GetFileName(subDir);
                    if (dirName != "node_modules" && dirName != "dist" && dirName != "bin" && dirName != "obj")
                    {
                        GetAllFiles(subDir, arrayOfFiles);
                    }
                }
            }
            catch
            {
                // Bỏ qua các thư mục không có quyền đọc
            }
        }
    }
}
