using System.Collections.Generic;
using FluentAssertions;
using Xunit;
using SmartLMS.Business;
using SmartLMS.Models;

namespace SmartLMS.Tests
{
    public class ScoringEngineTests
    {
        private readonly IScoringEngine _scoringEngine;

        public ScoringEngineTests()
        {
            _scoringEngine = new ScoringEngine();
        }

        [Fact]
        public void CalculateScore_ShouldReturn100_WhenAllAnswersCorrect()
        {
            // Arrange
            var questions = new List<Question>
            {
                new Question { QuestionId = 1, CorrectAnswer = "A", XPValue = 10 },
                new Question { QuestionId = 2, CorrectAnswer = "B", XPValue = 15 }
            };
            var answers = new Dictionary<int, string> { { 1, "A" }, { 2, "B" } };

            // Act
            var score = _scoringEngine.CalculateScore(questions, answers);

            // Assert
            score.Should().Be(100);
        }

        [Fact]
        public void CalculateScore_ShouldReturn50_WhenHalfAnswersCorrect()
        {
            var questions = new List<Question>
            {
                new Question { QuestionId = 1, CorrectAnswer = "A", XPValue = 10 },
                new Question { QuestionId = 2, CorrectAnswer = "B", XPValue = 15 }
            };
            var answers = new Dictionary<int, string> { { 1, "A" }, { 2, "C" } }; // Sai câu 2

            var score = _scoringEngine.CalculateScore(questions, answers);

            score.Should().Be(50);
        }

        [Fact]
        public void CalculateScore_ShouldIgnoreSpacesAndCase()
        {
            var questions = new List<Question>
            {
                new Question { QuestionId = 1, CorrectAnswer = "A ", XPValue = 10 },
                new Question { QuestionId = 2, CorrectAnswer = "Text Answer", XPValue = 15 }
            };
            var answers = new Dictionary<int, string> { { 1, " a" }, { 2, "TEXT ANSWER" } };

            var score = _scoringEngine.CalculateScore(questions, answers);
            var totalXP = _scoringEngine.CalculateTotalXP(questions, answers);

            score.Should().Be(100);
            totalXP.Should().Be(25);
        }

        [Fact]
        public void CalculateTotalXP_ShouldSumCorrectWeightedXP()
        {
            var questions = new List<Question>
            {
                new Question { QuestionId = 1, CorrectAnswer = "A", XPValue = 50 },
                new Question { QuestionId = 2, CorrectAnswer = "B", XPValue = 200 } // Trọng số cao
            };
            var answers = new Dictionary<int, string> { { 1, "C" }, { 2, "B" } }; // Chỉ đúng câu 2

            var totalXP = _scoringEngine.CalculateTotalXP(questions, answers);

            totalXP.Should().Be(200); // Nhận được trọng số của câu 2
        }
    }
}
