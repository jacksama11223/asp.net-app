# Kế Hoạch Mở Rộng Cơ Sở Dữ Liệu Cộng Đồng (Phase 6)

Để xây dựng một mạng xã hội thu nhỏ thực thụ với đầy đủ "đồ chơi" (Khảo sát, Reaction, Lịch sử chỉnh sửa), chúng ta cần thiết kế thêm một cụm Database mới. Kế hoạch này sẽ thêm các bảng vật lý và không phá vỡ bất kỳ logic cũ nào.

## 1. Bản Đồ Các Bảng Mới (Models)

### 1.1. Hệ thống Khảo sát (Inline Polls)
Để một người có thể tạo Poll trong bài đăng, ta cần 3 bảng liên kết: `Poll`, `PollOption`, và `PollVote`.

```csharp
// SmartLMS.Models/Poll.cs
public class Poll
{
    public int PollId { get; set; }
    public string Question { get; set; } = null!;
    public bool IsMultipleChoice { get; set; } = false;
    public DateTime? ExpiresAt { get; set; }
    
    // Liên kết với Comment hoặc Post (Dùng chung)
    public int? PostId { get; set; }
    public int? CommentId { get; set; }
    
    public virtual ICollection<PollOption> Options { get; set; } = new List<PollOption>();
}

// SmartLMS.Models/PollOption.cs
public class PollOption
{
    public int PollOptionId { get; set; }
    public int PollId { get; set; }
    public virtual Poll Poll { get; set; } = null!;
    
    public string Text { get; set; } = null!;
    public int VoteCount { get; set; } = 0; // Cache số lượt vote cho lẹ
}

// SmartLMS.Models/PollVote.cs
public class PollVote
{
    public int PollVoteId { get; set; }
    public int PollOptionId { get; set; }
    public int UserId { get; set; }
    public DateTime VotedAt { get; set; } = DateTime.Now;
}
```

### 1.2. Hệ thống Tương tác Đa dạng (Diverse Reactions)
Thay thế Upvote/Downvote đơn điệu bằng thả tim, haha, wow.

```csharp
// SmartLMS.Models/UserReaction.cs
public class UserReaction
{
    public int ReactionId { get; set; }
    public int UserId { get; set; }
    
    // Loại Reaction: "Like", "Love", "Insightful", "Haha"
    public string ReactionType { get; set; } = "Like"; 
    
    // Đa hình: Có thể reaction Post, Comment, hoặc Question
    public string EntityType { get; set; } = "Post"; // "Post", "Comment", "QA"
    public int EntityId { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
```

### 1.3. Lịch sử chỉnh sửa Bình luận (Edit History)
Minh bạch hóa nội dung, cho phép xem lại câu chữ trước khi bị sửa.

```csharp
// SmartLMS.Models/CommentEditHistory.cs
public class CommentEditHistory
{
    public int HistoryId { get; set; }
    public int CommentId { get; set; }
    public virtual Comment Comment { get; set; } = null!;
    
    public string OldContent { get; set; } = null!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
}
```

## 2. Nâng Cấp Bảng Cũ (`Comment.cs` & `Post.cs`)

Chúng ta cần "tiêm" thêm các trường phụ trợ vào `Comment.cs` hiện tại:
```csharp
// Bổ sung vào SmartLMS.Models/Comment.cs
public string AttachmentIds { get; set; } = string.Empty; // Danh sách ID ảnh (cách nhau dấu phẩy)
public bool IsPinned { get; set; } = false; // Ghim bình luận lên đầu
public bool IsEdited { get; set; } = false; // Đã chỉnh sửa chưa?
```

## 3. Cấu hình DbContext (`SmartLMSContext.cs`)

Vào file `SmartLMSContext.cs`, khai báo DbSet và tạo các khoá ngoại rành mạch để chống lỗi (Cascade Delete):
```csharp
public virtual DbSet<Poll> Polls { get; set; }
public virtual DbSet<PollOption> PollOptions { get; set; }
public virtual DbSet<PollVote> PollVotes { get; set; }
public virtual DbSet<UserReaction> UserReactions { get; set; }
public virtual DbSet<CommentEditHistory> CommentEditHistories { get; set; }

// Trong OnModelCreating:
modelBuilder.Entity<UserReaction>()
    .HasIndex(e => new { e.UserId, e.EntityType, e.EntityId })
    .IsUnique(); // Một người chỉ thả 1 cảm xúc cho 1 bài

modelBuilder.Entity<PollVote>()
    .HasIndex(e => new { e.UserId, e.PollOptionId })
    .IsUnique(); 
```

## 4. Các Bước Triển Khai (Dự kiến: 20 phút)
1. **Bước 1:** Tôi sẽ viết code tạo trực tiếp 5 file `.cs` cho 5 Model mới ở trên vào thư mục `SmartLMS.Models`.
2. **Bước 2:** Tôi sẽ chèn các dòng `DbSet` vào `SmartLMSContext.cs`.
3. **Bước 3:** Tôi chạy lệnh `dotnet ef migrations add AdvancedCommunityFeatures` để nó dịch ra mã SQL.
4. **Bước 4:** Tôi đưa ngài script SQL để chạy thẳng lên VPS như hôm qua. Xong!

Ngài có "Duyệt" bản vẽ thiết kế Database này không? Nếu ngài Ok, tôi sẽ chuyển từ dạng tài liệu này thành các thao tác **viết file Code C#** ngay lập tức.
