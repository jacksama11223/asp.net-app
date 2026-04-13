using Microsoft.ML;
using Microsoft.ML.Data;
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
}

public interface IPredictionService
{
    Task<DropoutPrediction> PredictDropoutAsync(int userId, int courseId);
}

public class PredictionService : IPredictionService
{
    private readonly IRepository<Enrollment> _enrollmentRepository;
    private readonly MLContext _mlContext;
    private ITransformer? _model;

    public PredictionService(IRepository<Enrollment> enrollmentRepository)
    {
        _enrollmentRepository = enrollmentRepository;
        _mlContext = new MLContext(seed: 0);
    }

    public async Task<DropoutPrediction> PredictDropoutAsync(int userId, int courseId)
    {
        // 1. Lấy dữ liệu mẫu từ DB để train (thực tế nên cache model)
        var enrollments = await _enrollmentRepository.GetAllAsync();
        var trainingData = enrollments.Select(e => new StudentDropoutData
        {
            Progress = (float)(e.Progress ?? 0),
            AvgScore = (float)(e.AvgScore ?? 0),
            IsDropout = e.IsDropout ?? false
        }).ToList();

        // 2. Build Pipeline
        var dataView = _mlContext.Data.LoadFromEnumerable(trainingData);
        var pipeline = _mlContext.Transforms.CopyColumns(outputColumnName: "Label", inputColumnName: nameof(StudentDropoutData.IsDropout))
            .Append(_mlContext.Transforms.Concatenate("Features", nameof(StudentDropoutData.Progress), nameof(StudentDropoutData.AvgScore)))
            .Append(_mlContext.BinaryClassification.Trainers.SdcaLogisticRegression());

        // 3. Train Model
        _model = pipeline.Fit(dataView);

        // 4. Predict cho User hiện tại
        var userEnrollment = trainingData.FirstOrDefault() ; // Mock lấy record đầu tiên hoặc query thật
        var predictionEngine = _mlContext.Model.CreatePredictionEngine<StudentDropoutData, DropoutPrediction>(_model);
        
        // Giả lập data từ User cần check
        var input = new StudentDropoutData { Progress = 10, AvgScore = 3 }; // Ví dụ: lười học
        return predictionEngine.Predict(input);
    }
}
