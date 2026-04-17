using Microsoft.Extensions.Options;
using SmartLMS.Models;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IZoomIntegrationService
{
    Task<string> CreateMeetingAsync(string topic, int durationMinutes, DateTime startTime);
}

public class ZoomIntegrationService : IZoomIntegrationService
{
    private readonly HttpClient _httpClient;
    private readonly ZoomConfig _config;

    public ZoomIntegrationService(HttpClient httpClient, IOptions<ZoomConfig> options)
    {
        _httpClient = httpClient;
        _config = options.Value;
    }

    private async Task<string> GetAccessTokenAsync()
    {
        var authString = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{_config.ClientId}:{_config.ClientSecret}"));
        
        var request = new HttpRequestMessage(HttpMethod.Post, $"https://zoom.us/oauth/token?grant_type=account_credentials&account_id={_config.AccountId}");
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", authString);

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var jsonStr = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(jsonStr);
        return doc.RootElement.GetProperty("access_token").GetString() ?? "";
    }

    public async Task<string> CreateMeetingAsync(string topic, int durationMinutes, DateTime startTime)
    {
        var token = await GetAccessTokenAsync();

        var meetingData = new
        {
            topic = topic,
            type = 2, // 2 = Scheduled meeting
            start_time = startTime.ToString("yyyy-MM-ddTHH:mm:ssZ"),
            duration = durationMinutes,
            timezone = "Asia/Ho_Chi_Minh",
            settings = new { host_video = true, participant_video = false, join_before_host = false }
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.zoom.us/v2/users/me/meetings");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        request.Content = new StringContent(JsonSerializer.Serialize(meetingData), Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var jsonStr = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(jsonStr);
        return doc.RootElement.GetProperty("join_url").GetString() ?? "";
    }
}
