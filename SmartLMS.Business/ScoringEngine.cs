using SmartLMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace SmartLMS.Business;

public interface IScoringEngine
{
    decimal CalculateScore(IEnumerable<Question> questions, Dictionary<int, string> userAnswers);
    int CalculateTotalXP(IEnumerable<Question> questions, Dictionary<int, string> userAnswers);
}

public class ScoringEngine : IScoringEngine
{
    public decimal CalculateScore(IEnumerable<Question> questions, Dictionary<int, string> userAnswers)
    {
        if (!questions.Any()) return 0;

        int correctCount = 0;
        foreach (var question in questions)
        {
            if (userAnswers.TryGetValue(question.QuestionId, out var answer))
            {
                if (string.Equals(answer.Trim(), question.CorrectAnswer.Trim(), System.StringComparison.OrdinalIgnoreCase))
                {
                    correctCount++;
                }
            }
        }

        return (decimal)correctCount / questions.Count() * 100;
    }

    public int CalculateTotalXP(IEnumerable<Question> questions, Dictionary<int, string> userAnswers)
    {
        int totalXP = 0;
        foreach (var question in questions)
        {
            if (userAnswers.TryGetValue(question.QuestionId, out var answer))
            {
                if (string.Equals(answer.Trim(), question.CorrectAnswer.Trim(), System.StringComparison.OrdinalIgnoreCase))
                {
                    totalXP += question.XPValue;
                }
            }
        }
        return totalXP;
    }
}
