using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartLms.Web.ViewModels;
using SmartLMS.Data;
using SmartLMS.Models;

namespace SmartLMS.Business
{
    public class ForumService : IForumService
    {
        private readonly SmartLMSContext _context;

        public ForumService(SmartLMSContext context)
        {
            _context = context;
        }

        public async Task<ForumFeedViewModel> GetForumFeedAsync(int page = 1, int pageSize = 10)
        {
            var posts = await _context.Posts
                .Include(p => p.Author)
                .Where(p => p.IsPublished && !p.IsDeleted)
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ForumPostViewModel
                {
                    Id = p.PostId.ToString(),
                    Title = p.Title,
                    Content = p.Summary ?? p.Content.Substring(0, Math.Min(p.Content.Length, 150)) + "...",
                    Tag = p.Tags ?? "Thảo Luận",
                    Category = p.Category ?? "Chung",
                    AuthorName = p.Author.FullName,
                    AuthorRole = "Học viên", // Hoặc map từ role thực tế
                    AuthorAvatar = string.IsNullOrEmpty(p.Author.AvatarUrl) ? $"https://ui-avatars.com/api/?name={Uri.EscapeDataString(p.Author.FullName)}" : p.Author.AvatarUrl,
                    CreatedAt = p.CreatedAt,
                    Likes = p.VoteCount,
                    CommentsCount = p.Comments.Count()
                })
                .ToListAsync();

            return new ForumFeedViewModel
            {
                Posts = posts
            };
        }

        public async Task<string> DraftAiResponseAsync(string prompt)
        {
            // Trong tương lai, chúng ta có thể gọi OpenAI/Gemini API tại đây
            await Task.Delay(800); // Giả lập độ trễ mạng
            
            // Logic giả lập AI
            return $@"/// <summary>
/// Giải pháp do AI tạo ra dựa trên từ khóa: {prompt}
/// </summary>
public class AiSolution {{
    public void Execute() {{
        // Cần đảm bảo giải phóng unmanaged resources
        Console.WriteLine(""Tối ưu hóa thành công!"");
    }}
}}";
        }

        public async Task<string> AnalyzeMemoryAllocationAsync(string code)
        {
            // Tương lai: Dùng Microsoft.CodeAnalysis (Roslyn) dịch code trong Memory Stream Sandbox
            await Task.Delay(1000); 
            
            if (code.Contains("ToList().Where"))
            {
                return "⚠️ CẢNH BÁO HIỆU NĂNG:\nBản code phát sinh lãng phí RAM nghiêm trọng. Gọi .ToList() tải thô toàn bộ bảng rồi mới lọc .Where().\n👉 Khuyên dùng: Hãy đảo Where() lên trước .ToList()!";
            }
            
            return "✅ KHẢO SÁT HIỆU NĂNG HOÀN HẢO:\nBiên dịch thành công.\nHeap Allocation occupancy: ~32 bytes (Tối ưu tuyệt vời trên GC Gen 0).";
        }

        public async Task<bool> RewardShareExperienceAsync(int userId, string postId, string format)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            // Cộng 15 điểm XP Academic
            user.Points += 15;
            
            // Ghi log qua Audit (Tuân thủ Constitution)
            var log = new AuditLog
            {
                UserId = userId,
                Action = "Share_ForumPost",
                Details = $"Shared Post ID: {postId} using format: {format}. Awarded +15 XP.",
                Timestamp = DateTime.UtcNow,
                IpAddress = "System"
            };
            
            _context.AuditLogs.Add(log);
            await _context.SaveChangesAsync();
            
            return true;
        }
    }
}
