using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers;
using Microsoft.EntityFrameworkCore;
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
    Task<DropoutPrediction> PredictDropoutAsync(int userId, int courseId, bool includeXai);
    Task TrainModelAsync();
}

public class PredictionService : IPredictionService
{
    private readonly SmartLMS.Data.SmartLMSContext _context;
    private readonly MLContext _mlContext;
    private static ITransformer? _model;
    private static object _lock = new object();
    private static PredictionEngine<StudentDropoutData, DropoutPrediction>? _predictionEngine;

    public PredictionService(SmartLMS.Data.SmartLMSContext context)
    {
        _context = context;
        _mlContext = new MLContext(seed: 0);
    }

    public async Task TrainModelAsync()
    {
        // Tải dữ liệu thực tế từ Database
        var data = _context.Enrollments
            .Select(e => new StudentDropoutData 
            { 
                Progress = (float)(e.Progress ?? 0), 
                AvgScore = (float)(e.AvgScore ?? 0), 
                IsDropout = e.IsDropout ?? false 
            }).ToList();

        if (!data.Any()) return;

        var dataView = _mlContext.Data.LoadFromEnumerable(data);
        var pipeline = _mlContext.Transforms.CopyColumns(outputColumnName: "Label", inputColumnName: nameof(StudentDropoutData.IsDropout))
            .Append(_mlContext.Transforms.Concatenate("Features", nameof(StudentDropoutData.Progress), nameof(StudentDropoutData.AvgScore)))
            .Append(_mlContext.BinaryClassification.Trainers.SdcaLogisticRegression());

        var builtModel = pipeline.Fit(dataView);
        
        
        lock (_lock)
        {
            _model = builtModel;
            _predictionEngine = _mlContext.Model.CreatePredictionEngine<StudentDropoutData, DropoutPrediction>(_model);
        }
        
        await Task.CompletedTask;
    }

    private void TrainModelIfNone()
    {
        lock (_lock)
        {
            if (_model != null) return;
        }
        TrainModelAsync().GetAwaiter().GetResult();
    }

    public async Task<DropoutPrediction> PredictDropoutAsync(int userId, int courseId)
    {
        return await PredictDropoutAsync(userId, courseId, true);
    }

    public async Task<DropoutPrediction> PredictDropoutAsync(int userId, int courseId, bool includeXai)
    {
        TrainModelIfNone();

        // Lấy dữ liệu thực tế của sinh viên từ Database
        var enrollment = await _context.Enrollments.FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId);
        var input = new StudentDropoutData 
        { 
            Progress = (float)(enrollment?.Progress ?? 0), 
            AvgScore = (float)(enrollment?.AvgScore ?? 0) 
        };

        DropoutPrediction result;
        lock (_lock)
        {
            result = _predictionEngine!.Predict(input);
        }

        if (!includeXai) return result;

        // XAI Logic: Sử dụng CalculateFeatureContribution
        var dataView = _mlContext.Data.LoadFromEnumerable(new List<StudentDropoutData> { input });
        
        // Trích xuất predictor từ TransformerChain một cách an toàn
        ITransformer? lastTransformer = null;
        if (_model is System.Collections.IEnumerable chain)
        {
            foreach (var t in chain)
            {
                if (t is ITransformer transformer) lastTransformer = transformer;
            }
        }
        else
        {
            lastTransformer = _model;
        }

        var predictor = lastTransformer as ISingleFeaturePredictionTransformer<ICalculateFeatureContribution>;
        
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
