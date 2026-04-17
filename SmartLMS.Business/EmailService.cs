using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using SmartLMS.Models;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
}

public class EmailService : IEmailService
{
    private readonly SmtpSettings _smtpSettings;

    public EmailService(IOptions<SmtpSettings> smtpSettings)
    {
        _smtpSettings = smtpSettings.Value;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_smtpSettings.SenderName, _smtpSettings.Username));
        message.To.Add(new MailboxAddress("", to));
        message.Subject = subject;

        var bodyBuilder = new BodyBuilder { HtmlBody = body };
        message.Body = bodyBuilder.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync(_smtpSettings.Host, _smtpSettings.Port, _smtpSettings.EnableSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.Auto);
        
        if (!string.IsNullOrEmpty(_smtpSettings.Username))
        {
            await client.AuthenticateAsync(_smtpSettings.Username, _smtpSettings.Password);
        }

        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}
