using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Threading.Tasks;

namespace SmartLMS.Business
{
    public class S3StorageService : IStorageService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly ILogger<S3StorageService> _logger;
        private readonly string _bucketName;
        private readonly string _cloudFrontUrl;

        public S3StorageService(IAmazonS3 s3Client, IConfiguration configuration, ILogger<S3StorageService> logger)
        {
            _s3Client = s3Client;
            _logger = logger;
            _bucketName = configuration["AWS:BucketName"] ?? "smartlms-assets";
            _cloudFrontUrl = configuration["AWS:CloudFrontUrl"] ?? "";
        }

        public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
        {
            try
            {
                var fileKey = $"uploads/{Guid.NewGuid()}_{fileName}";
                
                var fileTransferUtility = new TransferUtility(_s3Client);
                var uploadRequest = new TransferUtilityUploadRequest
                {
                    InputStream = fileStream,
                    Key = fileKey,
                    BucketName = _bucketName,
                    ContentType = contentType,
                    CannedACL = S3CannedACL.PublicRead
                };

                await fileTransferUtility.UploadAsync(uploadRequest);
                
                _logger.LogInformation($"[S3] Uploaded {fileName} to bucket {_bucketName}. Key: {fileKey}");

                if (!string.IsNullOrEmpty(_cloudFrontUrl))
                {
                    return $"{_cloudFrontUrl.TrimEnd('/')}/{fileKey}";
                }

                return $"https://{_bucketName}.s3.amazonaws.com/{fileKey}";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[S3] Error uploading file {fileName}");
                throw;
            }
        }

        public async Task<bool> DeleteFileAsync(string fileUrl)
        {
            try
            {
                // Extract key from URL
                var uri = new Uri(fileUrl);
                var key = uri.AbsolutePath.TrimStart('/');

                await _s3Client.DeleteObjectAsync(_bucketName, key);
                _logger.LogInformation($"[S3] Deleted object {key} from bucket {_bucketName}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[S3] Error deleting file {fileUrl}");
                return false;
            }
        }
    }
}
