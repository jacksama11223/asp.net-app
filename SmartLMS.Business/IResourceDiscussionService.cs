using SmartLMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLMS.Business;

public interface IResourceDiscussionService
{
    // Lấy cây bình luận cho một tài nguyên
    Task<IEnumerable<ResourceComment>> GetCommentTreeAsync(int resourceId);
    
    // Thêm bình luận mới (gốc hoặc trả lời)
    Task<ResourceComment> AddCommentAsync(int resourceId, int userId, string content, int? parentCommentId = null);
    
    // Upvote bình luận
    Task<bool> UpvoteCommentAsync(int commentId);
    
    // Đánh dấu xóa/ẩn bình luận (dành cho Moderator hoặc Tác giả)
    Task<bool> DeleteCommentAsync(int commentId, int requestingUserId, bool isAdminOrModerator);
    
    // Gửi báo cáo vi phạm
    Task<ResourceReport> ReportContentAsync(int resourceId, int reporterId, string reason);
}
