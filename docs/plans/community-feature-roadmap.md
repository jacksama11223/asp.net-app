# Lộ trình Phát triển & Nâng cấp Trải nghiệm (UX) SmartLMS.Community

Dựa trên yêu cầu mở rộng tính năng (Chia sẻ, Đính kèm tài liệu, Bình luận), tôi đã thiết kế một lộ trình chia làm 3 Giai đoạn (Phases) để đảm bảo hệ thống không bị "ngợp" và dễ dàng kiểm soát lỗi trong quá trình code.

---

## Giai đoạn 1: Sửa Lỗi Gốc & Dựng Khung Chi Tiết (Core Fixes & Details)
*Mục tiêu: Đảm bảo các luồng chức năng cơ bản hoạt động 100% trước khi lắp thêm tính năng mới.*

1. **Fix các lỗi API hiện tại (Báo cáo điều tra trước đó):**
   - Thêm `id` vào Form Hỏi Đáp (QA).
   - Viết API `CreateGroup` và `CreateEvent`.
2. **Xây dựng hệ thống Routing cho Trang Chi tiết (Details Pages):**
   - Xây dựng `QaDetail.cshtml`: Không gian đọc câu hỏi và trả lời rộng rãi.
   - Xây dựng `GroupDetail.cshtml`: Giao diện Bảng tin nhóm học.
   - Xây dựng `EventDetail.cshtml`: Thông tin sự kiện và danh sách người tham gia.
3. **Đồng bộ Giao diện (UI Synchronization):**
   - Phân tích UI thông qua script `analyze_ui_sync.cjs` cho thấy `Details.cshtml` (/hub/post/{id}) đang lệch pha (dùng Dark Theme).
   - Rewrite toàn bộ `Details.cshtml` sang hệ Light Theme (bg-white, text-slate-800, border-slate-150) để đồng bộ với toàn bộ hệ thống diễn đàn.

---

## Giai đoạn 2: Hệ thống Tương tác & Bình luận (Interactive Modules)
*Mục tiêu: Biến các trang tĩnh thành nơi thảo luận sôi nổi.*

1. **Bình luận trong Sự kiện (Event Comments):**
   - Thêm khu vực "Thảo luận trước/sau sự kiện" vào dưới cùng của `EventDetail.cshtml`. Sinh viên có thể đặt câu hỏi cho Diễn giả trước giờ G.
2. **Bình luận trong Nhóm (Group Discussion Board):**
   - Biến `GroupDetail.cshtml` thành một "Tiểu mạng xã hội". Thành viên trong nhóm có thể đăng status, bình luận và thả tim (Like) các hoạt động của nhóm.
3. **Đính kèm tài liệu (File Attachments):**
   - Bổ sung nút "Đính kèm" (Kẹp giấy) vào khung soạn thảo của QA, Group và Event.
   - Hỗ trợ tải lên ảnh lỗi code (PNG/JPG) hoặc tài liệu tóm tắt (PDF).

---

## Giai đoạn 3: Siêu Kết nối & Chia sẻ (Hyper-Connectivity)
*Mục tiêu: Xóa bỏ ranh giới giữa các trang, cho phép luân chuyển dữ liệu tự do.*

1. **Chia sẻ qua Tin nhắn & Nhóm Chat (Omni-Share Integration):**
   - Đảm bảo TẤT CẢ các trang (`QaDetail`, `EventDetail`, `GroupDetail`, và `Details.cshtml`) đều có nút **[Chia sẻ]**.
   - Bấm vào sẽ hiện Popup với 3 tùy chọn gửi: 
     1. *"Gửi vào Nhóm Chat Tổng (General Chat)"* qua SignalR (`window.sendPostToChat()`).
     2. *"Gửi vào Nhóm học B"*.
     3. *"Gửi vào tin nhắn riêng cho A"*.
   - Người nhận hoặc phòng chat chung sẽ thấy một "Thẻ (Card) xem trước" trực quan và bấm vào có thể nhảy ngay đến bài viết/sự kiện đó.
2. **Chuyển tiếp Tài liệu (Document Forwarding):**
   - Nếu một thành viên tải lên một tài liệu PDF trong trang **Chia sẻ Tài nguyên (Resources)**.
   - Một người khác có thể bấm nút **[Chuyển tiếp]** để bê thẳng tài liệu đó vào trong **Nhóm học** của họ để cùng thảo luận mà không cần tải về rồi upload lại.
3. **Trích dẫn (Quote & Reference):**
   - Khi trả lời một bài viết QA, người dùng có thể gõ dấu `@` để trích dẫn một Sự kiện sắp diễn ra hoặc gõ `#` để trích dẫn một Nhóm học có liên quan.

---

### 👉 Quyết định Triển khai
Để đảm bảo tiến độ và chất lượng, tôi đề xuất chúng ta sẽ **Code dứt điểm Giai đoạn 1** trước. Sau khi trang Chi tiết chạy mượt mà, chúng ta sẽ đắp dần Giai đoạn 2 và 3 lên.

---

## Kế hoạch Cập nhật Database & Nền tảng API (Database & API Foundation)
*Dựa trên kết quả rà soát từ script `analyze_backend_requirements.cjs`, hệ thống hiện đang thiếu các cấu trúc ngầm để phục vụ Giai đoạn 4 và 5. Cần hoàn thiện các mục sau TRƯỚC KHI code giao diện:*

### 1. Cập nhật Model & SmartLMSContext (Thực thi Migration)
Cần bổ sung các lớp (Models) sau vào thư mục `SmartLMS.Models` và khai báo `DbSet` trong `SmartLMSContext`:
- **`EntityBacklink`**: Bảng lưu trữ liên kết chéo (Backlinks đa thực thể) cho Giai đoạn 4.
- **`UserRating`**: Bảng lưu trữ đánh giá chéo giữa các người dùng (1-5 sao, nhận xét) cho Giai đoạn 5.
- **`User` (Identity)**: Bổ sung trường `int AcademicXP { get; set; }` để theo dõi điểm kinh nghiệm học thuật.
- *Lưu ý:* Bảng Badge (Thành tích) đã tồn tại.

### 2. Xây dựng Controllers & API Backend
Tạo các module Backend để giao tiếp với Frontend:
- **`ProfileController` (MVC) & `ProfileApiController`:** Xử lý render trang Hồ sơ cá nhân và lấy thông tin lịch sử hoạt động, điểm đánh giá của user.
- **`BacklinkService` & API:** Xây dựng Regex bóc tách `[[post:ID]]` và API `GET /backlinks/{targetType}/{targetId}`.
- **API Rating:** Viết API `POST /api/ProfileApi/rate` để lưu điểm đánh giá.

### 3. Lệnh Migration (Chạy trên Local -> Đẩy lên VPS MariaDB)
Sau khi khai báo xong Models, chạy lệnh:
```bash
dotnet ef migrations add AddCommunityProfileAndBacklinks --project SmartLMS.Data --startup-project SmartLMS.Web
dotnet ef database update --project SmartLMS.Data --startup-project SmartLMS.Web
```

---

## Giai đoạn 4: Mạng Lưới Tri Thức Toàn Diện (Obsidian-like Backlinks)
*Mục tiêu: Xây dựng hệ thống liên kết 2 chiều (Bi-directional linking) đa thực thể, giúp người dùng dễ dàng theo dõi mạch kiến thức giống như công cụ Obsidian giữa Bài viết, QA, Sự kiện và Nhóm học.*

### 1. Ý tưởng & Luồng hoạt động (Workflow)
- Khi người dùng viết bài hoặc **bình luận ở bất kỳ đâu** (Bình luận bài viết, Thảo luận Sự kiện, Bảng tin Nhóm, Trả lời QA), họ có thể dùng cú pháp bọc trong ngoặc vuông kép để nhắc đến nội dung khác:
  - `[[post:123]]`: Trỏ tới Bài viết diễn đàn ID 123.
  - `[[qa:456]]`: Trỏ tới Câu hỏi Hỏi-Đáp ID 456.
  - `[[event:789]]`: Trỏ tới Sự kiện ID 789.
  - `[[group:10]]`: Trỏ tới Nhóm tự học ID 10.
- Lúc lưu bài/bình luận, Backend sẽ dùng Regex để bóc tách các cú pháp này và lưu vào bảng Cross-Reference (VD: `EntityBacklink`).
- Khi người dùng mở trang Chi tiết của nội dung được nhắc tới (Ví dụ mở trang Sự kiện 789):
  - Bên dưới sẽ xuất hiện một khu vực **"Được nhắc tới trong (X bình luận/bài viết)"**.
  - Sẽ hiển thị trích dẫn của các bình luận trỏ đến nó kèm icon 🔗 (Link) và lượt nhắc để thấy mạch kết nối tri thức.

### 2. Code mẫu (Module C# Backend Regex & API)
Để làm được điều này, ta cần một Service chuyên bóc tách Backlink mỗi khi tạo bài viết mới:

```csharp
// 1. Model Database (Thêm vào SmartLMSContext)
public class EntityBacklink
{
    [Key]
    public int Id { get; set; }
    
    // Nguồn nhắc đến (Bình luận, Bài viết, v.v...)
    public string SourceType { get; set; } = null!; // "Post", "QaAnswer", "EventDiscussion", "GroupPost"
    public int SourceId { get; set; }
    
    // Mục tiêu bị nhắc đến (Bài viết, QA, Sự kiện, Nhóm)
    public string TargetType { get; set; } = null!; // "Post", "QA", "Event", "Group"
    public int TargetId { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// 2. Logic Bóc tách đa thực thể (BacklinkExtractor) trong Service
public class BacklinkService
{
    private readonly SmartLMSContext _context;
    public BacklinkService(SmartLMSContext context) { _context = context; }

    public async Task ExtractAndSaveBacklinks(string sourceType, int sourceId, string content)
    {
        // Hỗ trợ nhiều loại tiền tố: post, qa, event, group
        var regex = new Regex(@"\[\[(post|qa|event|group):(\d+)\]\]");
        var matches = regex.Matches(content);
        
        foreach(Match match in matches)
        {
            var targetType = match.Groups[1].Value.ToUpper(); // POST, QA, EVENT, GROUP
            var targetId = int.Parse(match.Groups[2].Value);

            // Tránh tự trỏ đệ quy (nếu nguồn và đích trùng loại & ID)
            if (sourceType.ToUpper() == targetType && sourceId == targetId) continue;

            var exists = await _context.EntityBacklinks
                .AnyAsync(b => b.SourceType == sourceType && b.SourceId == sourceId && 
                               b.TargetType == targetType && b.TargetId == targetId);
                               
            if(!exists)
            {
                _context.EntityBacklinks.Add(new EntityBacklink 
                { 
                    SourceType = sourceType, 
                    SourceId = sourceId, 
                    TargetType = targetType, 
                    TargetId = targetId 
                });
            }
        }
        await _context.SaveChangesAsync();
    }
}

// 3. API Lấy danh sách Backlinks Đa năng
[HttpGet("backlinks/{targetType}/{targetId}")]
public async Task<IActionResult> GetBacklinks(string targetType, int targetId)
{
    var backlinks = await _context.EntityBacklinks
        .Where(b => b.TargetType.ToUpper() == targetType.ToUpper() && b.TargetId == targetId)
        .OrderByDescending(b => b.CreatedAt)
        .ToListAsync();
        
    // Cần có logic Join động hoặc lấy thông tin ngắn gọn của Source ở đây...
    
    return Ok(new {
        TotalMentions = backlinks.Count,
        Backlinks = backlinks // Danh sách các ID tham chiếu để FE tự render
    });
}
```

### 3. Tích hợp UI Frontend & Trải nghiệm Nhập liệu (UX)
- Khi load trang `/hub/post/{id}`, gọi thêm API `/backlinks` để render danh sách trích dẫn bên dưới bài viết.
- Thêm hiệu ứng chớp tắt (highlight pulse) khi click từ bài này nhảy sang bài kia.
- **Tối ưu Form Nhập liệu (Ghost Text / Smart Placeholder):**
  - Quét hệ thống (`analyze_textarea_placeholders.cjs`) cho thấy toàn bộ các ô `<textarea>` hiện tại (trang Index, QA, Group, Event) đều CHƯA CÓ hướng dẫn cú pháp `[[`.
  - **Nhiệm vụ:** Viết module JS (ví dụ `textarea-hints.js`) lắng nghe sự kiện `keyup` trên mọi thẻ `<textarea>`. Khi người dùng gõ, sẽ có một "Placeholder ảo" (Ghost Text mờ ở phía sau) hoặc một Tooltip nổi lên gợi ý: *"Gõ [[ để trích dẫn Bài viết/QA, @ cho Sự kiện, # cho Nhóm"*.
  - Tích hợp thêm tính năng Autocomplete: Khi người dùng gõ `[[`, sẽ xổ ra một dropdown dạng danh sách nhỏ gợi ý các ID bài viết/câu hỏi phổ biến để chọn nhanh mà không cần nhớ ID.

---

## Giai đoạn 5: Hồ Sơ Cá Nhân & Danh Tiếng Học Thuật (Academic Profile & Reputation)
*Mục tiêu: Cá nhân hóa trải nghiệm người dùng, vinh danh những người có đóng góp lớn và tạo độ tin cậy thông qua hệ thống đánh giá chéo.*

### 1. Đồng bộ Link Avatar (Toàn hệ thống)
- Kết quả test qua `analyze_avatar_links.cjs` cho thấy các trang `QaDetail`, `GroupDetail`, `EventDetail` đang **bị thiếu** link ở avatar của người bình luận.
- **Nhiệm vụ:** Bọc tất cả các thẻ `<img>` avatar bằng thẻ `<a href="/profile/{AuthorId}">` trên toàn bộ các view để đảm bảo ai cũng có thể click vào xem hồ sơ của người khác.

### 2. Trang Hồ Sơ Của Tôi (My Profile)
- Tạo module `ProfileController` và view `Index.cshtml` dành cho trang cá nhân.
- Khi người dùng tự vào trang của mình (Ví dụ bấm vào avatar ở góc phải trên cùng), họ có thể:
  - Xem thống kê điểm XP (Academic XP).
  - Quản lý các tài liệu đã tải lên, các câu hỏi đã hỏi.
  - Chỉnh sửa thông tin cá nhân cơ bản.

### 3. Trang Hồ Sơ Công Khai & Đánh Giá (Public Profile & Rating)
- Khi một người dùng `A` truy cập vào trang `/profile/{id_cua_B}`, họ sẽ thấy:
  - Các đóng góp nổi bật của `B` (Các câu trả lời QA được Vote cao nhất).
  - Bảng thành tích (Huy hiệu/Badges).
- **Hệ thống Đánh Giá (Peer Review / Rating):**
  - Thêm một nút **"Đánh giá người dùng này"** (Chỉ hiện khi `A` khác `B`).
  - Giao diện đánh giá gồm: Chấm điểm (1-5 sao về độ nhiệt tình / chuyên môn) và để lại Lời nhận xét ngắn gọn (Ví dụ: "Giải thích code siêu dễ hiểu!").
  - Điểm trung bình này sẽ được hiển thị ngay cạnh Avatar của người đó trong các khu vực bình luận để tăng độ uy tín (Ví dụ: ⭐️ 4.9).
