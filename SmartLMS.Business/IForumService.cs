using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLms.Web.ViewModels;
using SmartLMS.Models;

namespace SmartLMS.Business
{
    public interface IForumService
    {
        Task<ForumFeedViewModel> GetForumFeedAsync(int page = 1, int pageSize = 10);
        Task<string> DraftAiResponseAsync(string prompt);
        Task<string> AnalyzeMemoryAllocationAsync(string code);
        Task<bool> RewardShareExperienceAsync(int userId, string postId, string format);
    }
}
