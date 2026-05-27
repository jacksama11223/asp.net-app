using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SmartLMS.Community.Hubs;

public class CommunityHub : Hub
{
    // Clients can call this to join a specific group (e.g. Study Group ID, or Event ID, or Chat Room)
    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }

    // Send a message to a specific room/group
    public async Task SendMessageToGroup(string groupName, string senderName, string senderAvatar, string message, string postUrl)
    {
        await Clients.Group(groupName).SendAsync("ReceiveMessage", senderName, senderAvatar, message, postUrl);
    }

    // Send a message to the general global chat
    public async Task SendMessageToAll(string senderName, string senderAvatar, string message, string postUrl)
    {
        await Clients.All.SendAsync("ReceiveMessage", senderName, senderAvatar, message, postUrl);
    }
}
