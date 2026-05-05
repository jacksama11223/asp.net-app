using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface INotificationService
{
    Task NotifyAdminAsync(string title, string message, string type = "Info");
    Task NotifyUserAsync(int userId, string title, string message, string type = "Info");
    Task BroadcastAsync(string title, string message, string type = "Info");
}
