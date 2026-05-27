using System;
using System.Collections.Generic;

namespace SmartLms.Community.ViewModels
{
    public class ForumFeedViewModel
    {
        public List<ForumPostViewModel> Posts { get; set; } = new List<ForumPostViewModel>();
    }

    public class ForumPostViewModel
    {
        public string Id { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string Tag { get; set; } = "C#";
        public string Category { get; set; } = "General";
        
        // Author Info
        public string AuthorName { get; set; } = null!;
        public string AuthorRole { get; set; } = "Học viên";
        public string AuthorAvatar { get; set; } = "https://ui-avatars.com/api/?name=User";
        
        public DateTime CreatedAt { get; set; }
        public int Likes { get; set; }
        public int CommentsCount { get; set; }
        
        public List<ForumCommentViewModel> Comments { get; set; } = new List<ForumCommentViewModel>();
    }

    public class ForumCommentViewModel
    {
        public string Id { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string AuthorId { get; set; } = null!;
        public string AuthorName { get; set; } = null!;
        public string AuthorAvatar { get; set; } = null!;
        public string CreatedAt { get; set; } = null!;
    }
}
