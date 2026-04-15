using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace SmartLMS.Business;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var smtpData = _configuration.GetSection("Smtp");
        var host = smtpData["Host"] ?? "smtp.gmail.com";
        var port = int.Parse(smtpData["Port"] ?? "587");
        var username = smtpData["Username"]; // Email của bạn
        var password = smtpData["Password"]; // App Password của bạn

        using var client = new SmtpClient(host, port)
        {
            Credentials = new NetworkCredential(username, password),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(username ?? "noreply@smartlms.vn", "SmartLMS AI"),
            Subject = subject,
            Body = body,
            IsBodyHtml = true
        };
        mailMessage.To.Add(to);

        await client.SendMailAsync(mailMessage);
    }
}
