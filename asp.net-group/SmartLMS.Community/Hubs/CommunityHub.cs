using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SmartLMS.Community.Hubs;

public class CommunityHub : Hub
{
    // Clients can call this to join a specific group (e.g. Study Group ID, or Event ID)
    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }
}
