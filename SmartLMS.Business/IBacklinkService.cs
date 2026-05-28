using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IBacklinkService
{
    Task ExtractAndSaveBacklinksAsync(string content, string sourceType, int sourceId);
}
