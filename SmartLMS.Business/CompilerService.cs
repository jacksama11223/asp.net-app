using SmartLMS.Models;
using System.Text;
using System.Text.Json;
using System.Net.Http;

namespace SmartLMS.Business;

public class CompilerService : ICompilerService
{
    private readonly HttpClient _httpClient;
    private const string JDOODLE_CLIENT_ID = "135294bcbc937200a1df023f9aea2d92";
    private const string JDOODLE_CLIENT_SECRET = "19e6234ab772a33327a6f899851866b88cd94556cba6ebab819d6e36b100b2e1";

    public CompilerService()
    {
        _httpClient = new HttpClient();
    }

    public async Task<CompilerResult> ExecuteAsync(string code, string language, List<TestCase> testCases)
    {
        if (language.ToLower() != "csharp")
        {
            return new CompilerResult 
            { 
                Success = false, 
                Message = "Hiện tại chỉ hỗ trợ ngôn ngữ C#. Các ngôn ngữ khác sẽ sớm được cập nhật." 
            };
        }

        var result = new CompilerResult { Success = true };

        try
        {
            foreach (var testCase in testCases)
            {
                var tcResult = new TestCaseResult
                {
                    TestCaseId = testCase.Id,
                    ExpectedOutput = testCase.ExpectedOutput
                };

                try
                {
                    var requestBody = new
                    {
                        clientId = JDOODLE_CLIENT_ID,
                        clientSecret = JDOODLE_CLIENT_SECRET,
                        script = code,
                        stdin = testCase.Input,
                        language = "csharp",
                        versionIndex = "4" // C# mono
                    };

                    var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
                    var response = await _httpClient.PostAsync("https://api.jdoodle.com/v1/execute", content);
                    
                    if (response.IsSuccessStatusCode)
                    {
                        var jsonStr = await response.Content.ReadAsStringAsync();
                        using var doc = JsonDocument.Parse(jsonStr);
                        
                        // JDoodle trả về { "output": "kết quả", "statusCode": 200, "memory": "...", "cpuTime": "..." }
                        if (doc.RootElement.TryGetProperty("output", out var outputElement))
                        {
                            string actualOutput = outputElement.GetString() ?? string.Empty;
                            tcResult.ActualOutput = actualOutput;

                            // JDoodle output thường có \n ở cuối
                            if (actualOutput.Trim() == testCase.ExpectedOutput.Trim())
                            {
                                tcResult.Passed = true;
                            }
                            else
                            {
                                tcResult.Passed = false;
                            }
                        }
                        else
                        {
                            tcResult.Passed = false;
                            tcResult.ErrorMessage = "JDoodle không trả về output hợp lệ.";
                        }
                    }
                    else
                    {
                        tcResult.Passed = false;
                        tcResult.ErrorMessage = $"JDoodle API Error: {response.StatusCode}";
                    }
                }
                catch (Exception ex)
                {
                    tcResult.Passed = false;
                    tcResult.ErrorMessage = ex.Message;
                }

                result.TestCaseResults.Add(tcResult);
            }

            result.Message = result.TestCaseResults.All(t => t.Passed) 
                ? "Chúc mừng! Bạn đã vượt qua tất cả các bài kiểm tra." 
                : "Một số bài kiểm tra chưa đạt. Hãy kiểm tra lại Output nhé!";
        }
        catch (Exception ex)
        {
            result.Success = false;
            result.Message = "Lỗi kết nối JDoodle: " + ex.Message;
        }

        return result;
    }
}
