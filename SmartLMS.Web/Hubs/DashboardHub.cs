using Microsoft.AspNetCore.SignalR;
using SmartLMS.Business;
using System;
using System.Threading.Tasks;

namespace SmartLMS.Web.Hubs;

public class DashboardHub : Hub<ISmartLmsHub>
{
    public override async Task OnConnectedAsync()
    {
        if (Context.User.IsInRole("Admin"))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Admins");
        }
        await base.OnConnectedAsync();
    }

    public async Task SendActivity(string user, string action)
    {
        await Clients.All.ReceiveActivity(user, action, DateTime.Now.ToString("HH:mm:ss"));
    }
}
