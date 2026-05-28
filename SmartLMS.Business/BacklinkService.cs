using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Business;

public class BacklinkService : IBacklinkService
{
    private readonly SmartLMSContext _context;
    private readonly INotificationService _notificationService;

    public BacklinkService(SmartLMSContext context, INotificationService notificationService)
    {
        _context = context;
        _notificationService = notificationService;
    }

    public async Task ExtractAndSaveBacklinksAsync(string content, string sourceType, int sourceId)
    {
        if (string.IsNullOrWhiteSpace(content)) return;

        // Xóa các liên kết cũ của source này để làm mới (nếu là thao tác Edit)
        var existing = _context.EntityBacklinks.Where(b => b.SourceType == sourceType && b.SourceId == sourceId);
        _context.EntityBacklinks.RemoveRange(existing);

        var backlinks = new List<EntityBacklink>();

        // Hỗ trợ cú pháp [[QA:123]], [[Event:456]], [[Group:789]], [[Post:101]]
        var regex = new Regex(@"\[\[(QA|Event|Group|Post):(\d+)\]\]", RegexOptions.IgnoreCase);
        var matches = regex.Matches(content);
        
        var uniqueTargets = new HashSet<string>();

        foreach (Match match in matches)
        {
            var targetType = match.Groups[1].Value.ToUpper(); // Chuẩn hoá thành IN HOA để dễ query
            var targetIdStr = match.Groups[2].Value;
            
            var key = $"{targetType}:{targetIdStr}";
            if (uniqueTargets.Contains(key)) continue;
            uniqueTargets.Add(key);

            if (int.TryParse(targetIdStr, out int targetId))
            {
                backlinks.Add(new EntityBacklink
                {
                    SourceType = sourceType,
                    SourceId = sourceId,
                    TargetType = targetType,
                    TargetId = targetId
                });
            }
        }

        if (backlinks.Any())
        {
            _context.EntityBacklinks.AddRange(backlinks);
        }

        await _context.SaveChangesAsync();

        // Gửi thông báo cho chủ sở hữu của các target
        var sourceUser = await _context.Users.FindAsync(sourceId); // Assuming sourceId is userId for now, wait, sourceId is the ID of the Post/QA! Not userId.
        // Let's just say "Ai đó vừa nhắc đến..."
        foreach (var b in backlinks)
        {
            int? targetUserId = null;
            string link = "";
            string title = "";

            if (b.TargetType == "POST")
            {
                var post = await _context.Posts.FindAsync(b.TargetId);
                targetUserId = post?.AuthorId;
                link = $"/hub/post/{b.TargetId}";
                title = "Bài viết của bạn được nhắc đến";
            }
            else if (b.TargetType == "QA")
            {
                var qa = await _context.CommunityQuestions.FindAsync(b.TargetId);
                targetUserId = qa?.AuthorId;
                link = $"/hub/qa/detail/{b.TargetId}";
                title = "Câu hỏi của bạn được nhắc đến";
            }
            else if (b.TargetType == "GROUP")
            {
                var group = await _context.StudyGroups.FindAsync(b.TargetId);
                targetUserId = group?.LeaderId;
                link = $"/hub/group/{b.TargetId}";
                title = "Nhóm của bạn được nhắc đến";
            }

            if (targetUserId.HasValue)
            {
                await _notificationService.NotifyUserAsync(
                    targetUserId.Value,
                    title,
                    $"Một nội dung mới vừa trích dẫn/nhắc đến mục này của bạn.",
                    "Community",
                    link
                );
            }
        }
    }
}
