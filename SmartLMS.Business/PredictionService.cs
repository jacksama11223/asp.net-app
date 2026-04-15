using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers;
using SmartLMS.Data.Repositories;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class StudentDropoutData
{
    [LoadColumn(0)] public float Progress { get; set; }
    [LoadColumn(1)] public float AvgScore { get; set; }
    [LoadColumn(2)] public bool IsDropout { get; set; }
}

public class DropoutPrediction
{
    [ColumnName("PredictedLabel")] public bool Prediction { get; set; }
    public float Probability { get; set; }
    public float Score { get; set; }
    
    // Feature Contribution (XAI)
    public float ProgressContribution { get; set; }
    public float ScoreContribution { get; set; }
    public float ActivityContribution { get; set; }
}

public interface IPredictionService
{
    Task<DropoutPrediction> PredictDropoutAsync(int userId, int courseId);
}

public class PredictionService : IPredictionService
{
    private readonly SmartLMS.Data.SmartLMSContext _context;
    private readonly MLContext _mlContext;
    private static ITransformer? _model;
    private static object _lock = new object();

    public PredictionService(SmartLMS.Data.SmartLMSContext context)
    {
        _context = context;
        _mlContext = new MLContext(seed: 0);
    }

    private void TrainModelIfNode()
    {
        lock (_lock)
        {
            if (_model != null) return;

            // Mock Data cho việc training
            var trainingData = new List<StudentDropoutData>
            {
                new() { Progress = 80, AvgScore = 8, IsDropout = false },
                new() { Progress = 20, AvgScore = 3, IsDropout = true },
                new() { Progress = 90, AvgScore = 9, IsDropout = false },
                new() { Progress = 10, AvgScore = 2, IsDropout = true },
                new() { Progress = 50, AvgScore = 5, IsDropout = false }
            };

            var dataView = _mlContext.Data.LoadFromEnumerable(trainingData);
            var pipeline = _mlContext.Transforms.CopyColumns(outputColumnName: "Label", inputColumnName: nameof(StudentDropoutData.IsDropout))
                .Append(_mlContext.Transforms.Concatenate("Features", nameof(StudentDropoutData.Progress), nameof(StudentDropoutData.AvgScore)))
                .Append(_mlContext.BinaryClassification.Trainers.SdcaLogisticRegression());

            _model = pipeline.Fit(dataView);
        }
    }

    public async Task<DropoutPrediction> PredictDropoutAsync(int userId, int courseId)
    {
        TrainModelIfNode();

        // Lấy dữ liệu thực tế của sinh viên từ Database
        var enrollment = _context.Enrollments.FirstOrDefault(e => e.UserId == userId && e.CourseId == courseId);
        var input = new StudentDropoutData 
        { 
            Progress = (float)(enrollment?.Progress ?? 0), 
            AvgScore = (float)(enrollment?.AvgScore ?? 0) 
        };

        var predictionEngine = _mlContext.Model.CreatePredictionEngine<StudentDropoutData, DropoutPrediction>(_model);
        var result = predictionEngine.Predict(input);

        // XAI Logic: Sử dụng CalculateFeatureContribution
        var dataView = _mlContext.Data.LoadFromEnumerable(new List<StudentDropoutData> { input });
        
        // Trích xuất predictor từ TransformerChain
        var predictor = ((TransformerChain<ITransformer>)_model).LastOrDefault() as ISingleFeaturePredictionTransformer<ICalculateFeatureContribution>;
        
        if (predictor != null)
        {
            var xaiTransformer = _mlContext.Transforms.CalculateFeatureContribution(predictor).Fit(dataView);
            var transformedData = xaiTransformer.Transform(dataView);
            var contributions = _mlContext.Data.CreateEnumerable<FeatureContributionData>(transformedData, reuseRowObject: false).First();
            
            result.ProgressContribution = contributions.FeatureContributions?[0] ?? 0;
            result.ScoreContribution = contributions.FeatureContributions?[1] ?? 0;
        }
        
        return result;
    }

    private class FeatureContributionData
    {
        public float[] FeatureContributions { get; set; } = [];
    }
}
