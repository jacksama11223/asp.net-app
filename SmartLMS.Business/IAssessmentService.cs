using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Business
{
    public interface IAssessmentService
    {
        Task<IEnumerable<dynamic>> GetLeaderboardAsync(int? departmentId = null);
        Task<IEnumerable<Question>> GetQuestionsAsync(int hierarchyLevel, int? departmentId);
        Task<(IEnumerable<QuestionDto> Items, int TotalCount)> GetQuestionsPagedAsync(int hierarchyLevel, int? departmentId, int pageIndex, int pageSize, string? search = null);
        Task<IEnumerable<Exam>> GetExamsAsync(int hierarchyLevel, int? departmentId);
        Task<IEnumerable<Badge>> GetBadgesAsync();
        Task<IEnumerable<dynamic>> GetItemAnalysisAsync(int? departmentId = null);
        Task<bool> SaveQuestionAsync(Question question, int adminHierarchyLevel, int? adminDeptId);

        // Nộp bài thi và xử lý Game hóa
        Task<QuizResultDto> SubmitQuizAsync(int userId, int examId, Dictionary<int, string> answers);

        // Lấy thành tích cá nhân
        Task<dynamic> GetMyAchievementsAsync(int userId);
    }

    public class QuizResultDto
    {
        public decimal Score { get; set; }
        public int XPEarned { get; set; }
        public List<string> NewBadges { get; set; } = new();
    }
}
