using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace SmartLMS.Business;

public interface IWebhookService
{
    Task SendPayloadAsync(string url, object payload);
    Task NotifyAsync(string eventType, object payload, int? organizationId = null);
}

public class WebhookService : IWebhookService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<WebhookService> _logger;

    public WebhookService(IHttpClientFactory httpClientFactory, ILogger<WebhookService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    public async Task SendPayloadAsync(string url, object payload)
    {
        try
        {
            var client = _httpClientFactory.CreateClient();
            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(url, content);
            
            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("✅ Webhook sent successfully to {Url}", url);
            }
            else
            {
                _logger.LogWarning("⚠️ Webhook failed for {Url} with status {Status}", url, response.StatusCode);
            }
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "❌ Error sending Webhook to {Url}", url);
        }
    }

    public async Task NotifyAsync(string eventType, object payload, int? organizationId = null)
    {
        // Giả lập lấy URL Webhook từ cấu hình dựa trên eventType và organizationId
        var dummyUrl = "https://webhook.site/dummy-endpoint";
        var fullPayload = new { Event = eventType, Data = payload, OrgId = organizationId };
        
        await SendPayloadAsync(dummyUrl, fullPayload);
    }
}
