using System.IO;
using System.Threading.Tasks;

namespace SmartLMS.Business
{
    public interface IStorageService
    {
        Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType);
        Task<bool> DeleteFileAsync(string fileUrl);
    }
}
