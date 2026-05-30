using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public class ResourceDiscussionService : IResourceDiscussionService
{
    private readonly SmartLMSContext _context;

    public ResourceDiscussionService(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ResourceComment>> GetCommentTreeAsync(int resourceId)
    {
        // Lấy tất cả comment của resource này (cả cha lẫn con), ko lấy comment đã bị xóa logic
        var allComments = await _context.ResourceComments
            .Include(c => c.User)
            .Where(c => c.ResourceId == resourceId && !c.IsDeleted)
            .OrderBy(c => c.CreatedAt)
            .ToListAsync();

        // Xây dựng cây bình luận trên RAM
        var commentDict = allComments.ToDictionary(c => c.Id);
        var rootComments = new List<ResourceComment>();

        foreach (var comment in allComments)
        {
            if (comment.ParentCommentId.HasValue && commentDict.ContainsKey(comment.ParentCommentId.Value))
            {
                var parent = commentDict[comment.ParentCommentId.Value];
                if (parent.Replies == null) parent.Replies = new List<ResourceComment>();
                parent.Replies.Add(comment);
            }
            else
            {
                rootComments.Add(comment);
            }
        }

        // Sắp xếp các root comment: ghim lên đầu, sau đó theo Upvotes và thời gian
        return rootComments
            .OrderByDescending(c => c.IsPinned)
            .ThenByDescending(c => c.Upvotes)
            .ThenByDescending(c => c.CreatedAt)
            .ToList();
    }

    public async Task<ResourceComment> AddCommentAsync(int resourceId, int userId, string content, int? parentCommentId = null)
    {
        var comment = new ResourceComment
        {
            ResourceId = resourceId,
            UserId = userId,
            Content = content,
            ParentCommentId = parentCommentId,
            CreatedAt = DateTime.UtcNow,
            Upvotes = 0,
            IsDeleted = false,
            IsPinned = false
        };

        _context.ResourceComments.Add(comment);
        await _context.SaveChangesAsync();
        
        // Load user info for response
        await _context.Entry(comment).Reference(c => c.User).LoadAsync();
        return comment;
    }

    public async Task<bool> UpvoteCommentAsync(int commentId)
    {
        var comment = await _context.ResourceComments.FindAsync(commentId);
        if (comment == null || comment.IsDeleted) return false;

        comment.Upvotes++;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteCommentAsync(int commentId, int requestingUserId, bool isAdminOrModerator)
    {
        var comment = await _context.ResourceComments.Include(c => c.Resource).FirstOrDefaultAsync(c => c.Id == commentId);
        if (comment == null || comment.IsDeleted) return false;

        // Quyền xóa: Admin/Mod, người viết comment, hoặc người đăng tải tài nguyên đó
        bool isAuthor = comment.UserId == requestingUserId;
        bool isResourceOwner = comment.Resource != null && comment.Resource.UploaderId == requestingUserId;

        if (isAdminOrModerator || isAuthor || isResourceOwner)
        {
            comment.IsDeleted = true; // Soft delete
            await _context.SaveChangesAsync();
            return true;
        }

        return false; // Không có quyền
    }

    public async Task<ResourceReport> ReportContentAsync(int resourceId, int reporterId, string reason)
    {
        var report = new ResourceReport
        {
            ResourceId = resourceId,
            ReporterId = reporterId,
            Reason = reason,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        _context.ResourceReports.Add(report);
        await _context.SaveChangesAsync();
        return report;
    }
}
