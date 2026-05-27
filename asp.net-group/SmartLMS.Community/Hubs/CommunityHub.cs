using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Security.Claims;
using System.Text.Json;
using System.Collections.Generic;

namespace SmartLMS.Community.Hubs;

public class CommunityHub : Hub
{
    private readonly SmartLMSContext _context;

    public CommunityHub(SmartLMSContext context)
    {
        _context = context;
    }

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
    public async Task SendMessageToAll(string senderName, string senderAvatar, string message, string postUrl, string previewTitle = "", string previewDesc = "")
    {
        var userId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        
        var chatMsg = new CommunityChatMessage
        {
            SenderId = userId,
            SenderName = senderName ?? "Thành viên",
            SenderAvatar = senderAvatar ?? "",
            MessageText = message ?? "",
            PostUrl = postUrl ?? "",
            PreviewTitle = previewTitle ?? "",
            PreviewDesc = previewDesc ?? "",
            Timestamp = DateTime.UtcNow
        };
        
        _context.CommunityChatMessages.Add(chatMsg);
        await _context.SaveChangesAsync();

        await Clients.All.SendAsync("ReceiveMessage", chatMsg.Id, senderName, senderAvatar, message, postUrl, previewTitle, previewDesc);
    }

    public async Task ReactToMessage(int messageId, string emoji)
    {
        var msg = await _context.CommunityChatMessages.FindAsync(messageId);
        if (msg != null)
        {
            var reactions = new Dictionary<string, int>();
            if (!string.IsNullOrEmpty(msg.ReactionsJson))
            {
                try { reactions = JsonSerializer.Deserialize<Dictionary<string, int>>(msg.ReactionsJson); } catch { }
            }
            if (reactions.ContainsKey(emoji)) reactions[emoji]++;
            else reactions[emoji] = 1;
            
            msg.ReactionsJson = JsonSerializer.Serialize(reactions);
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("MessageReacted", messageId, msg.ReactionsJson);
        }
    }
}
