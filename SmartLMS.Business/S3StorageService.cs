using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace SmartLMS.Business
{
    public class S3StorageService : IStorageService
    {
        private readonly ILogger<S3StorageService> _logger;

        public S3StorageService(ILogger<S3StorageService> logger)
        {
            _logger = logger;
        }

        public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
        {
            // GIẢ LẬP AWS S3 SDK
            // Khi có account AWS, ta sẽ thêm mã lệnh:
            // var s3Client = new AmazonS3Client(...);
            // var putRequest = new PutObjectRequest { BucketName = "smartlms-assets", Key = fileName, InputStream = fileStream };
            // await s3Client.PutObjectAsync(putRequest);

            // Tạm thời Fake việc Upload lên S3 tốn 500ms
            await Task.Delay(500);
            
            var cloudFrontUrl = $"https://d123cdn.cloudfront.net/images/courses/{Guid.NewGuid()}_{fileName}";
            
            _logger.LogInformation($"[Mock S3] Đã upload thành công {fileName} lên S3 Bucket. URL: {cloudFrontUrl}");

            return cloudFrontUrl;
        }

        public async Task<bool> DeleteFileAsync(string fileUrl)
        {
            await Task.Delay(200);
            _logger.LogInformation($"[Mock S3] Đã xóa file tại S3 Bucket: {fileUrl}");
            return true;
        }
    }
}
