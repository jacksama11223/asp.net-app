using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SmartLMS.Web.Hubs
{
    public class GamificationHub : Hub
    {
        // Gửi thông báo khi có người vừa nhận được XP mới
        public async Task NotifyXPUpdate(string username, int xpGained, int totalXP)
        {
            await Clients.All.SendAsync("ReceiveXPUpdate", username, xpGained, totalXP);
        }

        // Gửi thông báo khi có người nhận được Huy hiệu (Badge)
        public async Task NotifyNewBadge(string username, string badgeName, string lottieUrl)
        {
            await Clients.All.SendAsync("ReceiveNewBadge", username, badgeName, lottieUrl);
        }
    }
}
