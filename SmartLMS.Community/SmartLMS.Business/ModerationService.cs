using Microsoft.ML;
using Microsoft.ML.Data;
using System.Collections.Generic;
using System.Linq;

namespace SmartLMS.Business;

public interface IModerationService
{
    bool IsSpamOrToxic(string text);
}

// Lớp dữ liệu đầu vào (Comment của học viên)
public class ReviewData
{
    [LoadColumn(0)]
    public string Text { get; set; } = string.Empty;

    [LoadColumn(1)]
    public bool IsToxic { get; set; }
}

// Lớp kết quả đầu ra sau khi chạy ML.NET
public class ToxicPrediction
{
    [ColumnName("PredictedLabel")]
    public bool Prediction { get; set; }

    public float Probability { get; set; }
    public float Score { get; set; }
}

public class ModerationService : IModerationService
{
    private readonly MLContext _mlContext;
    private ITransformer? _model;
    private static object _lock = new object();
    private PredictionEngine<ReviewData, ToxicPrediction>? _predictionEngine;

    public ModerationService()
    {
        _mlContext = new MLContext(seed: 0);
        TrainDummyModel(); // Trong thực tế, model phân tích văn bản cần được train bằng file .tsv lớn
    }

    private void TrainDummyModel()
    {
        lock (_lock)
        {
            if (_model != null) return;

            // Dữ liệu mẫu cực nhỏ gọn để demo thuật toán
            var trainingData = new List<ReviewData>
            {
                new ReviewData { Text = "Giảng viên dạy quá chán, video giật lag dở tệ", IsToxic = true },
                new ReviewData { Text = "Khóa học lừa đảo, đòi lại tiền", IsToxic = true },
                new ReviewData { Text = "Spam spam click link nhận quà", IsToxic = true },
                new ReviewData { Text = "Khóa học rất bổ ích, cảm ơn thầy", IsToxic = false },
                new ReviewData { Text = "Video số 2 hơi bị mờ, có thể fix lại không?", IsToxic = false },
                new ReviewData { Text = "Mình đã ứng dụng thành công, quá tuyệt", IsToxic = false }
            };

            var dataView = _mlContext.Data.LoadFromEnumerable(trainingData);

            // Pipeline: Convert text -> Text Featurizing -> Logistic Regression
            var pipeline = _mlContext.Transforms.Text.FeaturizeText("Features", nameof(ReviewData.Text))
                            .Append(_mlContext.Transforms.CopyColumns("Label", nameof(ReviewData.IsToxic)))
                            .Append(_mlContext.BinaryClassification.Trainers.SdcaLogisticRegression(labelColumnName: "Label", featureColumnName: "Features"));

            _model = pipeline.Fit(dataView);
            _predictionEngine = _mlContext.Model.CreatePredictionEngine<ReviewData, ToxicPrediction>(_model);
        }
    }

    public bool IsSpamOrToxic(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return false;

        var input = new ReviewData { Text = text };

        ToxicPrediction result;
        lock (_lock)
        {
            result = _predictionEngine!.Predict(input);
        }

        return result.Prediction;
    }
}
