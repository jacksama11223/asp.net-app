using Microsoft.Extensions.Logging;
using SmartLMS.Models;
using SmartLMS.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IWebhookService
{
    Task NotifyAsync(string eventType, object payload);
}

public class WebhookService : IWebhookService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<WebhookService> _logger;
    private readonly SmartLMSContext _context;

    public WebhookService(HttpClient httpClient, ILogger<WebhookService> logger, SmartLMSContext context)
    {
        _httpClient = httpClient;
        _logger = logger;
        _context = context;
    }

    public async Task NotifyAsync(string eventType, object payload)
    {
        try 
        {
            var webhooks = await _context.Webhooks
                .Where(w => w.IsActive && w.EventType == eventType)
                .ToListAsync();

            if (webhooks.Count == 0) return;

            foreach (var webhook in webhooks)
            {
                _logger.LogInformation($"Gửi Webhook [{eventType}] tới {webhook.TargetUrl}");
                
                var json = JsonSerializer.Serialize(new {
                    @event = eventType,
                    data = payload,
                    timestamp = System.DateTime.UtcNow
                });

                var content = new StringContent(json, Encoding.UTF8, "application/json");
                
                // Gửi ở chế độ fire-and-forget hoặc catch error để không làm hỏng flow chính
                _ = _httpClient.PostAsync(webhook.TargetUrl, content).ContinueWith(t => {
                    if (t.IsFaulted) {
                        _logger.LogError(t.Exception, $"Gửi Webhook tới {webhook.TargetUrl} thất bại.");
                    }
                });
            }
        }
        catch (System.Exception ex)
        {
            _logger.LogWarning($"Không thể gửi Webhook (có thể bảng chưa tồn tại): {ex.Message}");
        }
    }
}
