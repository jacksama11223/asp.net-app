using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface ISmartLmsHub
{
    Task ReceiveNotification(string title, string message, string type);
    Task ReceiveActivity(string user, string action, string timestamp);
}
