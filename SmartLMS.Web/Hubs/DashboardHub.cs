using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SmartLMS.Web.Hubs;

public class DashboardHub : Hub
{
    public async Task SendActivityNotification(string user, string action)
    {
        await Clients.All.SendAsync("ReceiveActivity", user, action, DateTime.Now.ToString("HH:mm:ss"));
    }
}
