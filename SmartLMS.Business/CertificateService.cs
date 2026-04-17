using DinkToPdf;
using DinkToPdf.Contracts;
using System;
using System.IO;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface ICertificateService
{
    Task<string> GenerateCertificateAsync(int userId, int courseId, DateTime issueDate);
}

public class CertificateService : ICertificateService
{
    private readonly IConverter _pdfConverter;
    private readonly SmartLMS.Data.SmartLMSContext _context;

    public CertificateService(IConverter pdfConverter, SmartLMS.Data.SmartLMSContext context)
    {
        _pdfConverter = pdfConverter;
        _context = context;
    }

    public async Task<string> GenerateCertificateAsync(int userId, int courseId, DateTime issueDate)
    {
        var user = await _context.Users.FindAsync(userId);
        var course = await _context.Courses.FindAsync(courseId);

        if (user == null || course == null) return string.Empty;

        string studentName = user.FullName ?? user.Username ?? "Unknown Student";
        string courseName = course.Title ?? "Unknown Course";

        // Phân tích tọa độ từ JSON
        var configJson = course.CertificateConfigJson ?? "{\"fullName\":{\"x\":350,\"y\":250},\"date\":{\"x\":500,\"y\":450},\"courseName\":{\"x\":350,\"y\":350}}";
        var config = System.Text.Json.JsonSerializer.Deserialize<System.Collections.Generic.Dictionary<string, System.Collections.Generic.Dictionary<string, double>>>(configJson);

        string templateUrl = course.CertificateTemplateUrl ?? "https://img.freepik.com/free-vector/elegant-certificate-template-vector-with-professional-design-blue-gold-tone_53876-116528.jpg";

        var htmlTemplate = $@"
        <html>
            <head>
                <style>
                    body {{ margin: 0; padding: 0; font-family: 'Arial', serif; }}
                    .cert-wrapper {{ 
                        width: 800px; height: 565px; 
                        background-image: url('{templateUrl}');
                        background-size: 100% 100%;
                        position: relative;
                    }}
                    .element {{ position: absolute; font-weight: bold; color: #4338ca; font-size: 24px; }}
                </style>
            </head>
            <body>
                <div class='cert-wrapper'>
                    <div class='element' style='left: {config!["fullName"]["x"]}px; top: {config!["fullName"]["y"]}px;'>{studentName}</div>
                    <div class='element' style='left: {config!["courseName"]["x"]}px; top: {config!["courseName"]["y"]}px;'>{courseName}</div>
                    <div class='element' style='left: {config!["date"]["x"]}px; top: {config!["date"]["y"]}px;'>{issueDate:dd/MM/yyyy}</div>
                </div>
            </body>
        </html>";

        var globalSettings = new GlobalSettings
        {
            ColorMode = ColorMode.Color,
            Orientation = Orientation.Landscape,
            PaperSize = PaperKind.A4,
            Margins = new MarginSettings { Top = 10, Bottom = 10, Left = 10, Right = 10 },
            DocumentTitle = $"Certificate_{studentName}"
        };

        var objectSettings = new ObjectSettings
        {
            PagesCount = true,
            HtmlContent = htmlTemplate,
            WebSettings = { DefaultEncoding = "utf-8" }
        };

        var pdf = new HtmlToPdfDocument()
        {
            GlobalSettings = globalSettings,
            Objects = { objectSettings }
        };

        // Render PDF synchronously, logic bọc bên ngoài sẽ dùng Task.Run hoặc Hangfire
        var fileContent = _pdfConverter.Convert(pdf);
        
        string fileName = $"Cert_{Guid.NewGuid():N}.pdf";
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "certificates", fileName);
        
        Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
        await File.WriteAllBytesAsync(filePath, fileContent);

        return $"/certificates/{fileName}";
    }
}
