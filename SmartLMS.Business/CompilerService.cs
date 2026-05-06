using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using SmartLMS.Models;
using System.Reflection;

namespace SmartLMS.Business;

public class CompilerService : ICompilerService
{
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
            // Thiết lập môi trường chạy script (Sandbox cơ bản)
            var scriptOptions = ScriptOptions.Default
                .WithReferences(typeof(object).Assembly, typeof(Enumerable).Assembly)
                .WithImports("System", "System.Collections.Generic", "System.Linq", "System.Text");

            foreach (var testCase in testCases)
            {
                var tcResult = new TestCaseResult
                {
                    TestCaseId = testCase.Id,
                    ExpectedOutput = testCase.ExpectedOutput
                };

                try
                {
                    // Trong thực tế, chúng ta nên bọc code của học viên vào một class/method 
                    // để xử lý input truyền vào. Ở đây tôi giả định code của học viên là một script
                    // và biến 'input' đã được định nghĩa sẵn.
                    
                    var globals = new { input = testCase.Input };
                    var executionResult = await CSharpScript.EvaluateAsync(code, scriptOptions, globals);
                    
                    string actualOutput = executionResult?.ToString() ?? string.Empty;
                    tcResult.ActualOutput = actualOutput;

                    if (actualOutput.Trim() == testCase.ExpectedOutput.Trim())
                    {
                        tcResult.Passed = true;
                    }
                    else
                    {
                        tcResult.Passed = false;
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
                : "Một số bài kiểm tra chưa đạt. Hãy thử lại nhé!";
        }
        catch (Exception ex)
        {
            result.Success = false;
            result.Message = "Lỗi biên dịch: " + ex.Message;
        }

        return result;
    }
}
