using SmartLMS.Models;

namespace SmartLMS.Business;

public interface ICompilerService
{
    Task<CompilerResult> ExecuteAsync(string code, string language, List<TestCase> testCases);
}

public class CompilerResult
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<TestCaseResult> TestCaseResults { get; set; } = new();
    public string? OverallOutput { get; set; }
}

public class TestCaseResult
{
    public int TestCaseId { get; set; }
    public bool Passed { get; set; }
    public string ActualOutput { get; set; } = string.Empty;
    public string ExpectedOutput { get; set; } = string.Empty;
    public string? ErrorMessage { get; set; }
}
