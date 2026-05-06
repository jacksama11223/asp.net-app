using Microsoft.Extensions.Logging;
using SmartLMS.Models;
using SmartLMS.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Hangfire;
using System.Security.Cryptography;

namespace SmartLMS.Business;

public interface IWebhookService
{
    Task NotifyAsync(string eventType, object payload, int? organizationId = null);
    Task DispatchWebhookAsync(int webhookId, string eventType, string payloadJson);
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

    public async Task NotifyAsync(string eventType, object payload, int? organizationId = null)
    {
        var query = _context.Webhooks.Where(w => w.IsActive && w.EventType == eventType);
        
        if (organizationId.HasValue)
        {
            query = query.Where(w => w.OrganizationId == organizationId);
        }

        var webhooks = await query.ToListAsync();
        var payloadJson = JsonSerializer.Serialize(payload);

        foreach (var webhook in webhooks)
        {
            // Sử dụng Hangfire để gửi bất đồng bộ và hỗ trợ Retry nếu thất bại
            BackgroundJob.Enqueue<IWebhookService>(x => x.DispatchWebhookAsync(webhook.WebhookId, eventType, payloadJson));
        }
    }

    [AutomaticRetry(Attempts = 3)] // Hangfire tự động thử lại 3 lần nếu sập
    public async Task DispatchWebhookAsync(int webhookId, string eventType, string payloadJson)
    {
        var webhook = await _context.Webhooks.FindAsync(webhookId);
        if (webhook == null || !webhook.IsActive) return;

        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
        var signature = CreateSignature(payloadJson, webhook.Secret, timestamp);

        var request = new HttpRequestMessage(HttpMethod.Post, webhook.TargetUrl);
        request.Content = new StringContent(payloadJson, Encoding.UTF8, "application/json");
        
        // ENTERPRISE HEADERS
        request.Headers.Add("X-SmartLMS-Event", eventType);
        request.Headers.Add("X-SmartLMS-Timestamp", timestamp);
        request.Headers.Add("X-SmartLMS-Signature", signature);

        var response = await _httpClient.SendAsync(request);
        
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Webhook delivery failed to {webhook.TargetUrl}. Status: {response.StatusCode}");
        }

        _logger.LogInformation($"Webhook {eventType} gửi thành công tới {webhook.TargetUrl}");
    }

    private string CreateSignature(string payload, string secret, string timestamp)
    {
        if (string.IsNullOrEmpty(secret)) return string.Empty;

        var message = $"{timestamp}.{payload}";
        var keyBytes = Encoding.UTF8.GetBytes(secret);
        var messageBytes = Encoding.UTF8.GetBytes(message);

        using var hmac = new HMACSHA256(keyBytes);
        var hash = hmac.ComputeHash(messageBytes);
        return BitConverter.ToString(hash).Replace("-", "").ToLower();
    }
}
