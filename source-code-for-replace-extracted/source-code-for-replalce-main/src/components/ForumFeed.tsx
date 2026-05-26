import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Video, 
  Paperclip,
  Search,
  Filter,
  Plus,
  Compass,
  AlertCircle,
  Hash,
  Send,
  Sparkles,
  Code,
  Trophy,
  Users,
  Copy,
  Check,
  BarChart2,
  Flame,
  Lightbulb,
  Layers,
  BookOpen,
  Terminal,
  Settings,
  Award,
  HelpCircle
} from 'lucide-react';
import { Post, Comment, UserRole } from '../types';

interface ForumFeedProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  currentUser: { name: string; avatar: string; role: UserRole };
  searchQuery: string;
  onSelectItem?: (type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member', id: string) => void;
}

export default function ForumFeed({ posts, setPosts, currentUser, searchQuery, onSelectItem }: ForumFeedProps) {
  // Post Creation States
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  
  // 10 Discussion Helper Modules States
  const [activeToolkitModule, setActiveToolkitModule] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  // 3-Step Sequential Sharing States
  const [sharingPost, setSharingPost] = useState<Post | null>(null);
  const [sharingStep, setSharingStep] = useState<number>(1); // 1, 2, or 3
  const [shareFormat, setShareFormat] = useState<'link' | 'markdown' | 'classroom'>('link');
  const [shareCustomNote, setShareCustomNote] = useState('Mời các đồng học cùng thảo luận vấn nạn C# này nhé!');
  const [simulatedScoreXpAdded, setSimulatedScoreXpAdded] = useState(false);
  const [isCopyingSharedLink, setIsCopyingSharedLink] = useState(false);

  // 1. AI Draft Assistant states
  const [aiDraftPrompt, setAiDraftPrompt] = useState('hỏi cách dùng IDisposable để giải phóng file stream trong C#');
  const [aiDraftResult, setAiDraftResult] = useState<{ title: string; content: string; tag: string } | null>(null);
  const [isAiDrafting, setIsAiDrafting] = useState(false);

  // 2. C# Sandbox states
  const [csSandboxCode, setCsSandboxCode] = useState(`using System;

class Program {
    static void Main() {
        // Viết code thử nghiệm GC allocations tại đây
        int[] numbers = {1, 2, 3, 4, 5};
        Console.WriteLine("GC Gen: " + GC.GetGeneration(numbers));
    }
}`);
  const [csSandboxReport, setCsSandboxReport] = useState<{ formatted: string; logs: string; recommendations: string[] } | null>(null);
  const [isCsCompiling, setIsCsCompiling] = useState(false);

  // 3. Inspirational Generator / Meme states
  const [selectedMemeIdx, setSelectedMemeIdx] = useState(0);
  const developerMemes = [
    {
      title: "Cấm rò rỉ bộ nhớ",
      quote: "Khi dùng Struct thay vì Class cho dữ liệu nhỏ dưới 16 bytes để bảo toàn Generation 0 của Garbage Collector!",
      category: "Memory Optimization",
      emoji: "🧠"
    },
    {
      title: "Trùm Async Await",
      quote: "Đừng bao giờ sử dụng .Result hoặc .Wait() trên ASP.NET Core kẻo ThreadPool Starvation gõ cửa căn hộ của bạn!",
      category: "Async Best Practices",
      emoji: "⚡"
    },
    {
      title: "Entity Framework Core Master",
      quote: "Query chỉ để Read thì nhớ bỏ .AsNoTracking() vào, nếu không CRM / ERP của bạn sẽ tải chậm hơn ốc sên đi chợ!",
      category: "Database Performance",
      emoji: "🐢"
    },
    {
      title: "Dependency Injection Lifetimes",
      quote: "Inject một Transient service vào Singleton service là cách nhanh nhất để tạo ra các Bug tâm linh kỳ bí!",
      category: "System Design",
      emoji: "👻"
    },
    {
      title: "Clean Architecture Isolate",
      quote: "Nhớ rằng Domain Core không được chứa bất kỳ package tham chiếu nào đến EF Core hay Web API. Clean là phải thật sạch!",
      category: "Software Architecture",
      emoji: "🛡️"
    }
  ];

  // 4. Flashcard C# states
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const csharpFlashcards = [
    {
      front: "Memory Struct vs Class",
      back: "Value type (Struct) cấp phát nhanh trên STACK, tự huỷ khi hết scope. Reference type (Class) cấp phát trên HEAP, phụ thuộc Garbage Collector (GC) dọn dẹp lúc rảnh."
    },
    {
      front: "Tác dụng của AsNoTracking là gì?",
      back: "Tắt cơ chế quản lý trạng thái (Change Tracker) của EF Core đối với truy vấn Read-Only, giúp giảm tải RAM và tăng tốc độ xử lý câu lệnh SQL."
    },
    {
      front: "Phân biệt GC Generation 0, 1, 2",
      back: "Gen 0: Các đối tượng có vòng đời cực ngắn vừa tạo. Gen 1: Vùng đệm dọn dẹp. Gen 2: Các đối tượng static hoặc singleton sống lâu năm. Tần suất thu dọn Gen 0 > Gen 1 > Gen 2."
    },
    {
      front: "Sự khác biệt Transient vs Scoped vs Singleton?",
      back: "Transient: Khởi tạo mới mỗi lần request. Scoped: Một instance duy nhất cho mỗi HTTP Request. Singleton: Khởi tạo duy nhất 1 lần cho cả vòng đời chạy ứng dụng."
    }
  ];

  // 5. Thread Summarizer states
  const [threadInput, setThreadInput] = useState('Thành viên A: Ai bị lỗi slow query khi dùng LINQ Multiple Joins không?\nThành viên B: Chắc chắn là chưa cài index hoặc nạp bộ nhớ ToList() trước đó rồi.\nThành viên C: Đúng thế, ToList() sớm sẽ kéo hết dữ liệu thô về RAM rồi mới lọc trên RAM!');
  const [threadSummaryResult, setThreadSummaryResult] = useState<string | null>(null);
  const [isSummarizingThread, setIsSummarizingThread] = useState(false);

  // 6. Error map levels states
  const [errorInputText, setErrorInputText] = useState('DbUpdateConcurrencyException: Database operation expected to affect 1 row(s) but actually affected 0 row(s)...');
  const [mappedLevelResult, setMappedLevelResult] = useState<{ node: string; level: string; desc: string; advice: string[] } | null>(null);

  // 7. Bounty setter states
  const [bountyPoints, setBountyPoints] = useState(50);
  const [bountyTitle, setBountyTitle] = useState('Cách cấu hình Serilog để tự động dọn dẹp log file lớn hơn 20MB');
  const [bountyContent, setBountyContent] = useState('Ứng dụng web .NET của mình sinh ra quá nhiều tệp log, làm trần ổ đĩa nhanh chóng. Cần giải pháp xử lý rolling file với kích thước giới hạn.');

  // 8. Quality auditor states
  const [auditorInput, setAuditorInput] = useState('Lỗi EF Core: Truy vấn LINQ bị chậm khi join 3 bảng. Có ai sửa giùm không? Đây là code: var result = db.Users.ToList().Where(...)');
  const [auditorResult, setAuditorResult] = useState<{ score: number; level: string; tips: string[] } | null>(null);

  // 9. Group recruiter states
  const [recruitTopic, setRecruitTopic] = useState('Học nhóm C# Diagnostics & Memory Management');
  const [recruitSchedule, setRecruitSchedule] = useState('Tối Thứ Ba & Thứ Năm lúc 20h30');
  const [recruitTarget, setRecruitTarget] = useState('Nắm vững các kỹ thuật kiểm tra và tối ưu Heap/Stack, Garbage Collection thực chiến dọn rác .NET');
  const [recruitCodeResult, setRecruitCodeResult] = useState<string | null>(null);

  // 10. Community Poll creator states
  const [pollQuestion, setPollQuestion] = useState('Nên chọn thư viện nào để gửi tin nhắn thông điệp Distributed Queue tốt nhất?');
  const [pollOptions, setPollOptions] = useState(['RabbitMQ (AMQP)', 'Apache Kafka High-Throughput Engine', 'Redis Pub/Sub', 'MassTransit wrapper']);
  const [pollVotes, setPollVotes] = useState<number[]>([18, 11, 7, 14]);
  const [userVotedIdx, setUserVotedIdx] = useState<number | null>(null);
  const [customPolls, setCustomPolls] = useState<Array<{question: string, options: string[], votes: number[], votedIdx: number | null}>>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('StudyWorkspace');
  const [newPostTag, setNewPostTag] = useState('Discussion');
  const [selectedAttachment, setSelectedAttachment] = useState<'image' | 'video' | 'file' | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  
  // Feed Filter States
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeTag, setActiveTag] = useState<string>('All');

  // Comment Posting State (keyed by post ID)
  const [activeCommentBox, setActiveCommentBox] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Collect unique categories & tags for filtering selector
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  const tags = ['All', 'Discussion', 'Bug Report', 'Share Resource', 'Study Tips', 'Recruitment'];

  // 1. AI Draft Assistant simulator
  const handleSimulateDraftAssistant = () => {
    if (!aiDraftPrompt.trim()) return;
    setIsAiDrafting(true);
    setTimeout(() => {
      let draftTitle = "Cách giải phóng tài nguyên hệ thống C# với IDisposable và using block";
      let draftContent = `Chào các bạn học viên, mình vừa tìm hiểu xong cách giải phóng ô nhớ với IDisposable trong .NET Core.

Khi làm việc với các unmanaged resources (như FileStream, DbConnection, Network sockets), hệ thống không tự động dọn dẹp RAM ngay. Ta cần áp dụng pattern IDisposable chuẩn chỉnh:

\`\`\`csharp
public class FileManager : IDisposable 
{
    private FileStream _stream;
    
    public void Dispose() 
    {
        _stream?.Dispose();
        GC.SuppressFinalize(this); // Tiết kiệm công việc Garbage Collector
    }
}
\`\`\`

Dùng cú pháp lệnh gọn \`using var manager = new FileManager()\` giúp tự giải phóng thông minh ngay khi hết phạm vi hàm. Đảm bảo ứng dụng chạy siêu mượt!`;
      let draftTag = "Study Tips";

      if (aiDraftPrompt.toLowerCase().includes("linq") || aiDraftPrompt.toLowerCase().includes("chậm") || aiDraftPrompt.toLowerCase().includes("lọc")) {
        draftTitle = "Bí quyết tối ưu hóa truy vấn LINQ so với SQL thuần";
        draftContent = `Thân chào mọi người, mình xin thảo luận cách tránh nạp quá tải RAM khi lấy dữ liệu ra từ EF Core.

Khi kết hợp nhiều bảng, các bạn hãy nhớ kỹ 3 nguyên tắc vàng:
1. Sử dụng lệnh .AsNoTracking() cho câu truy vấn chỉ đọc (Read-only) để tắt Change Tracker.
2. Tránh dính lỗi hiệu năng N+1 (sử dụng .Include() để nạp trước hoặc bật .AsSplitQuery()).
3. Sắp xếp bộ lọc lọc dữ liệu .Where() sớm nhất có thể trước khi thực hiện nạp (.ToList() / .ToArray()).

Chúc cả nhà build ứng dụng .NET nhanh như chớp!`;
        draftTag = "C# Advanced";
      } else if (aiDraftPrompt.toLowerCase().includes("api") || aiDraftPrompt.toLowerCase().includes("middleware") || aiDraftPrompt.toLowerCase().includes("asp")) {
        draftTitle = "Cấu trúc xây dựng Custom Exception Middleware trong ASP.NET Core Web API";
        draftContent = `Chào cả nhà, đây là chia sẻ của mình về triển khai cơ cấu Middleware thống nhất mã lỗi API.

Để xử lý khủng hoảng lỗi tập trung dòng nghiệp vụ, hãy tạo Custom Middleware:
\`\`\`csharp
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    public ExceptionHandlingMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        try {
            await _next(context);
        } catch (Exception ex) {
            await HandleExceptionAsync(context, ex);
        }
    }
}
\`\`\`
Đăng ký vào app.UseMiddleware<ExceptionHandlingMiddleware>() để ứng dụng có độ tin cậy tuyệt hảo!`;
        draftTag = "Web Development";
      }

      setAiDraftResult({ title: draftTitle, content: draftContent, tag: draftTag });
      setIsAiDrafting(false);
    }, 1000);
  };

  // 2. C# Compiler Sandbox simulator
  const handleSimulateCsSandbox = () => {
    setIsCsCompiling(true);
    setTimeout(() => {
      let logs = "Compilation successful (0 warnings, 0 errors)\nOutput: GC Gen: 0\nHeap Allocation state: Optimal\nManaged Memory occupied: ~44 bytes";
      let recommendations = [
        "Mã nguồn chạy tốt với Garbage Collector phân vùng thế hệ.",
        "Mẹo: Bạn đang sử dụng Struct Array? Hãy đảm bảo không boxing dữ liệu vô lý.",
        "Khuyên nghị: Dùng BenchmarkDotNet để lấy thời gian chạy chính xác nanoseconds."
      ];

      if (csSandboxCode.includes("ToList()") && csSandboxCode.includes("Where")) {
        logs = "Compilation Warning: CS1998 - Potential Memory Waste!\nWarning: .ToList() called before .Where() filters data directly in DBMS.";
        recommendations = [
          "⚠️ ĐÃ PHÁT HIỆN LỖI HIỆU NĂNG: Bạn gọi .ToList() trước rồi mới .Where() lọc dữ liệu.",
          "Điểm trừ: Việc này buộc .NET kéo toàn bộ bảng về RAM rồi mới xử lý, cực kỳ lãng phí tài nguyên.",
          "Khắc phục: Hãy đưa .Where() lên trước .ToList() để câu lệnh SQL SELECT được lọc ở SQL Server / PostgreSQL."
        ];
      }

      setCsSandboxReport({
        formatted: csSandboxCode.trim(),
        logs,
        recommendations
      });
      setIsCsCompiling(false);
    }, 900);
  };

  // 5. Thread Summarizer simulator
  const handleSimulateSummarizer = () => {
    if (!threadInput) return;
    setIsSummarizingThread(true);
    setTimeout(() => {
      setThreadSummaryResult(`📌 Tóm tắt tóm tắt cốt lõi cuộc đối thoại:
- Vấn đề: Truy vấn LINQ bị chậm hoặc rò rỉ RAM (Out-Of-Memory) khi nạp danh sách dữ liệu.
- Nguyên nhân: Việc gọi .ToList() sớm kéo quá nhiều dữ liệu chưa lọc về tầng Application.
- Thống nhất giải pháp:
  1. Di chuyển bộ lọc lọc dữ liệu (.Where) lên trước phương thức nạp (.ToList) để tiến hành truy vấn tại DB.
  2. Áp dụng .AsNoTracking() và lập chỉ mục (Non-clustered Index) trên SQL DBMS.`);
      setIsSummarizingThread(false);
    }, 1200);
  };

  // 6. Error map levels simulator
  const handleSimulateErrorClassifier = () => {
    if (!errorInputText) return;
    let node = "C# OOP & Memory Diagnostics";
    let level = "Junior Level";
    let desc = "Lỗi rò rỉ tài nguyên, phân cấp dữ liệu cấu trúc sai lệch.";
    let advice = [
      "Quản lý bộ nhớ Stack và Heap, đảm bảo các struct không vượt mức 16 bytes",
      "Sử dụng chỉ thị ref/out hợp lý khi đẩy tham số vào hàm nhằm hạn chế nhân bản deep copy",
      "Triển khai dọn dẹp thông qua hàm Hủy (Finalizer) kết hợp IDisposable pattern."
    ];

    if (errorInputText.toLowerCase().includes("concurrency") || errorInputText.toLowerCase().includes("dbupdate") || errorInputText.toLowerCase().includes("ef") || errorInputText.toLowerCase().includes("tracking")) {
      node = "Entity Framework Core Performance";
      level = "Mid Level";
      desc = "Lỗi đồng quy hoặc sai lệch cơ cấu Change Tracker, không đồng nhất cơ sở dữ liệu.";
      advice = [
        "Kiểm tra xem dữ liệu có bị chỉnh sửa song song đồng thời từ 2 luồng công việc hay không",
        "Áp dụng cơ chế Optimistic Concurrency Control (OCC) bằng cột [Timestamp] hoặc RowVersion",
        "Nếu chỉ đọc dữ liệu thô, hãy bật .AsNoTracking() để bỏ qua hệ đếm Change Tracker."
      ];
    } else if (errorInputText.toLowerCase().includes("rabbitmq") || errorInputText.toLowerCase().includes("amqp") || errorInputText.toLowerCase().includes("connection") || errorInputText.toLowerCase().includes("docker")) {
      node = "Distributed Systems & Microservices";
      level = "Expert Master";
      desc = "Lỗi ngắt kết nối mạng lưới kênh truyền thông distributed RabbitMQ AMQP.";
      advice = [
        "Sử dụng cơ chế tự động kết nối lại (AutomaticRecoveryEnabled = true)",
        "Đảm bảo đã khai báo Exchange và Queue trùng khớp cấu hình routing key trước khi đẩy message",
        "Triển khai Polly Circuit Breaker pattern để xử lý mạng chập chờn."
      ];
    } else if (errorInputText.toLowerCase().includes("dependency") || errorInputText.toLowerCase().includes("singleton") || errorInputText.toLowerCase().includes("lifetime")) {
      node = "ASP.NET Core Web API Architecture";
      level = "Advanced Level";
      desc = "Vi phạm vòng đời Dependency Injection (Captive Dependency).";
      advice = [
        "Không bao giờ inject một Scoped service trực tiếp vào một Singleton service",
        "Hãy sử dụng IServiceScopeFactory để khởi tạo scope nhân tạo khi Singleton cần giải quyết tác vụ",
        "Đặt mức chạy thử nghiệm ValidateScopes = true trong tập tin tệp appsettings.Development.json."
      ];
    }

    setMappedLevelResult({ node, level, desc, advice });
  };

  // 7. Post Bounty Question
  const handleCreateBountyPost = () => {
    if (!bountyTitle.trim() || !bountyContent.trim()) return;

    const bountyPost: Post = {
      id: `post-bounty-${Date.now()}`,
      title: `[🏆 TREO THƯỞNG ${bountyPoints} XP] ${bountyTitle}`,
      content: `${bountyContent}\n\n-----------\n🎁 Ý kiến giải đáp tối ưu được tác giả duyệt giải pháp sẽ nhận ngay thưởng nóng ${bountyPoints} điểm tích lũy học thuật từ quỹ cá nhân mình!`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      createdAt: new Date().toISOString(),
      likes: 1,
      likedByUser: true,
      commentsCount: 0,
      comments: [],
      category: "C# Advanced",
      tag: "Discussion"
    };

    setPosts([bountyPost, ...posts]);
    setActiveToolkitModule(null);
    setBountyTitle('');
    setBountyContent('');
  };

  // 8. Quality auditor simulator
  const handleSimulateAuditor = () => {
    if (!auditorInput) return;
    let score = 55;
    let level = "Chất lượng Trung Bình (C)";
    let tips = [
      "⚠️ Thiếu khối lệnh tường minh: Nên bao bọc mã nguồn C# bằng thẻ markdown triplebacktick ```csharp để cộng đồng dễ đọc định dạng thụt lề.",
      "⚠️ Mô tả câu hỏi quá súc tích: Hãy điền sâu mô tả môi trường .NET Core runtime (ví dụ .NET 8 hay dòng lệnh test Console).",
      "💡 Gốc lỗi nằm ở dòng mã của bạn: Bạn đang sử dụng .Where() sau khi nạp danh sách .ToList(), điều này phá hủy hiệu ứng tối ưu hóa DB."
    ];

    if (auditorInput.includes("```") || auditorInput.includes("csharp")) {
      score = 94;
      level = "Xuất Sắc đạt chuẩn Hub (A+)";
      tips = [
        "✅ Trình bày bài viết tuyệt vời! Có gắn khối mã nguồn code block chuẩn hóa thẩm mỹ.",
        "✅ Mô tả chi tiết, rõ ràng biến cố để hướng dẫn đồng môn cùng mổ xẻ.",
        "🚀 Điểm thưởng tiềm năng: Sẽ hiển thị nổi bật và ưu tiên giới thiệu đến đội ngũ Giáo viên hỗ trợ."
      ];
    }

    setAuditorResult({ score, level, tips });
  };

  // 9. Generate recruiter study group templates
  const handleSimulateRecruiter = () => {
    const text = `📢 TUYỂN ĐỒNG ĐỘI LẬP NHÓM TỰ HỌC THẤM THÍA C# 📢

📌 CHỦ ĐỀ CHÍNH: ${recruitTopic}
🕒 LỊCH TRÌNH SINH HOẠT: ${recruitSchedule}
🎯 MỤC TIÊU NHÓM: ${recruitTarget}
🛡️ CAM KẾT: Học thật - Nghiêm túc, tích cực trao đổi trên SmartLMS Hub để đạt điểm XP cao mỗi tuần!

💬 Đồng môn có nhã hứng vui lòng bình luận bên dưới bài viết hoặc click trực tiếp mục Nhóm Tự Học để tham gia ngay nhé!`;
    setRecruitCodeResult(text);
  };

  // 10. Post Poll to feed
  const handlePostPollToFeed = () => {
    if (!pollQuestion.trim()) return;

    const newPollPost: Post = {
      id: `post-poll-${Date.now()}`,
      title: `📊 [KHẢO SÁT HỮU NGHỊ] ${pollQuestion}`,
      content: `Mỗi người hãy biểu quyết ý kiến đóng góp cho chủ đề khảo sát dưới đây nhé:\n\n` + 
        pollOptions.map((o, i) => `🔹 Lựa chọn ${i+1}: ${o}`).join('\n') + 
        `\n\n(Bình luận câu trả lời bên dưới để ban cán sự ghi nhận trực tiếp)`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      createdAt: new Date().toISOString(),
      likes: 2,
      likedByUser: false,
      commentsCount: 0,
      comments: [],
      category: "StudyWorkspace",
      tag: "Discussion"
    };

    setPosts([newPollPost, ...posts]);
    
    // Also save to active list
    setCustomPolls([{
      question: pollQuestion,
      options: pollOptions,
      votes: pollVotes.map(v => v),
      votedIdx: null
    }, ...customPolls]);

    setActiveToolkitModule(null);
    setPollQuestion('');
  };

  // Handle Like
  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          likedByUser: !post.likedByUser
        };
      }
      return post;
    }));
  };

  // Handle Create Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    let finalAttachmentUrl = attachmentUrl;
    if (selectedAttachment === 'image' && !attachmentUrl) {
      finalAttachmentUrl = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60`;
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: newPostTitle,
      content: newPostContent,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedByUser: false,
      commentsCount: 0,
      comments: [],
      category: newPostCategory,
      tag: newPostTag,
      attachmentType: selectedAttachment || undefined,
      attachmentUrl: selectedAttachment ? finalAttachmentUrl : undefined
    };

    setPosts([newPost, ...posts]);
    
    // Reset Form
    setNewPostTitle('');
    setNewPostContent('');
    setSelectedAttachment(null);
    setAttachmentUrl('');
    setIsCreatingPost(false);
  };

  // Handle Add Comment
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      createdAt: new Date().toISOString(),
      content: text
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // Filter Posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesTag = activeTag === 'All' || post.tag === activeTag;

    return matchesSearch && matchesCategory && matchesTag;
  });

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'Instructor': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Mentor': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category selection bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter size={14} className="text-slate-400" /> Chủ đề:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">Thẻ:</span>
          <select 
            value={activeTag} 
            onChange={(e) => setActiveTag(e.target.value)}
            className="bg-slate-50 text-slate-600 text-sm px-3 py-1.5 rounded-xl border border-slate-100 outline-none focus:ring-2 focus:ring-cyan-500 font-medium cursor-pointer"
          >
            {tags.map(t => (
              <option key={t} value={t}>{t === 'All' ? 'Tất cả thẻ' : t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* =========================================================================
          🚀 DISCUSSION HUB WORKSPACE TOOLKIT (10 ADVANCED INTEGRATION MODULES)
         ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-50 to-cyan-50/20 border border-cyan-150/80 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white shadow-md shadow-cyan-100">
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-850 uppercase tracking-wide">
                Hộp Công Cụ Thảo Luận Thông Minh
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                10 Phân hệ Lập trình đóng góp ý kiến thông minh
              </p>
            </div>
          </div>
          {activeToolkitModule && (
            <button
              onClick={() => {
                setActiveToolkitModule(null);
                setCopiedText(false);
              }}
              className="text-xs text-cyan-650 hover:text-cyan-800 font-black flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-150 transition-all shadow-xs"
            >
              ← Trở lại danh mục công cụ
            </button>
          )}
        </div>

        {/* 10 MODULES GRID SELECTOR (Visible if no module is currently selected) */}
        {!activeToolkitModule ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            {/* Module 1: AI Post Assistant */}
            <button
              onClick={() => setActiveToolkitModule('ai-draft')}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-orange-55 text-orange-600 group-hover:bg-orange-100/60 transition-colors">
                <Sparkles size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">1. Trợ lý Soạn thảo AI</span>
              <span className="text-[9px] text-slate-450 leading-none">Format bài đăng chuẩn</span>
            </button>

            {/* Module 2: C# Sandbox Formatter */}
            <button
              onClick={() => {
                setActiveToolkitModule('cs-sandbox');
                setCsSandboxReport(null);
              }}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-cyan-55 text-cyan-600 group-hover:bg-cyan-100/60 transition-colors">
                <Terminal size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">2. Hộp cát Lập trình C#</span>
              <span className="text-[9px] text-slate-450 leading-none">Kiểm tra hiệu năng code</span>
            </button>

            {/* Module 3: Quote & Meme Generator */}
            <button
              onClick={() => setActiveToolkitModule('meme-gen')}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-purple-55 text-purple-600 group-hover:bg-purple-100/60 transition-colors">
                <Flame size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">3. Động lực & Meme Code</span>
              <span className="text-[9px] text-slate-450 leading-none">Cố khí thế đồng học</span>
            </button>

            {/* Module 4: Flashcard Terminology */}
            <button
              onClick={() => {
                setActiveToolkitModule('flashcard');
                setIsFlashcardFlipped(false);
              }}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-blue-55 text-blue-600 group-hover:bg-blue-100/60 transition-colors">
                <BookOpen size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">4. C# Flashcards</span>
              <span className="text-[9px] text-slate-450 leading-none">Tăng nhớ thuật nhớ</span>
            </button>

            {/* Module 5: Thread Summarizer */}
            <button
              onClick={() => {
                setActiveToolkitModule('summarizer');
                setThreadSummaryResult(null);
              }}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-emerald-55 text-emerald-600 group-hover:bg-emerald-100/60 transition-colors">
                <Layers size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">5. Tóm tắt Đàm luận</span>
              <span className="text-[9px] text-slate-450 leading-none">Nắm vững cốt lõi thớt</span>
            </button>

            {/* Module 6: Curriculum Error Map */}
            <button
              onClick={() => {
                setActiveToolkitModule('error-map');
                setMappedLevelResult(null);
              }}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-indigo-55 text-indigo-600 group-hover:bg-indigo-100/60 transition-colors">
                <Compass size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">6. Bản đồ Lỗi Giáo trình</span>
              <span className="text-[9px] text-slate-450 leading-none">Đối chiếu lộ trình .NET</span>
            </button>

            {/* Module 7: Reward Bounty Post */}
            <button
              onClick={() => setActiveToolkitModule('bounty-maker')}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-amber-55 text-amber-600 group-hover:bg-amber-100/60 transition-colors">
                <Trophy size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">7. Bài viết Treo thưởng XP</span>
              <span className="text-[9px] text-slate-450 leading-none">Dành điểm giải mã bug</span>
            </button>

            {/* Module 8: Community Code Quality Check */}
            <button
              onClick={() => {
                setActiveToolkitModule('auditor');
                setAuditorResult(null);
              }}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-rose-55 text-rose-600 group-hover:bg-rose-100/60 transition-colors">
                <Award size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">8. Kiểm định Chất lượng</span>
              <span className="text-[9px] text-slate-450 leading-none">Kiểm tra bài đăng mẫu</span>
            </button>

            {/* Module 9: Team-up Group Recruiter */}
            <button
              onClick={() => {
                setActiveToolkitModule('recruiter');
                setRecruitCodeResult(null);
              }}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-teal-55 text-teal-600 group-hover:bg-teal-100/60 transition-colors">
                <Users size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">9. Tuyển học nhóm</span>
              <span className="text-[9px] text-slate-450 leading-none">Sinh bản thảo rủ rê</span>
            </button>

            {/* Module 10: LMS Interactive Polls */}
            <button
              onClick={() => setActiveToolkitModule('poll-maker')}
              className="p-4 bg-white hover:bg-cyan-50/30 border border-slate-150 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-pink-55 text-pink-600 group-hover:bg-pink-100/60 transition-colors">
                <BarChart2 size={18} />
              </div>
              <span className="text-[11.5px] font-extrabold text-slate-800 leading-tight">10. Trưng cầu & Khảo sát</span>
              <span className="text-[9px] text-slate-450 leading-none">Biểu quyết ý kiến</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-150 rounded-xl p-5 shadow-xs text-left"
          >
            {/* MODULE 1: AI DRAFT ASSIST WORKSPACE */}
            {activeToolkitModule === 'ai-draft' && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                  <Sparkles size={16} className="text-orange-500" />
                  <h4 className="text-xs font-black text-slate-850">Trợ Lý Soạn Thảo AI - Định dạng & Khuyến nghị</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-[10.5px] text-slate-450 font-medium">Nhập mong muốn hoặc chủ đề chính của bạn. Chúng tôi sẽ tự động đề xuất tiêu chuẩn định dạng cấu trúc, tags kỹ nghệ, và bài đăng mẫu cực thấu đáo.</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiDraftPrompt}
                      onChange={(e) => setAiDraftPrompt(e.target.value)}
                      placeholder="Ví dụ: hỏi cách dùng IDisposable để giải phóng file stream, hoặc các truy vấn LINQ chậm..."
                      className="flex-1 bg-slate-50 border border-slate-150 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-cyan-500 font-semibold"
                    />
                    <button
                      onClick={handleSimulateDraftAssistant}
                      disabled={isAiDrafting || !aiDraftPrompt}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm shrink-0 flex items-center gap-1"
                    >
                      {isAiDrafting ? 'Đang soạn thảo...' : 'Tối ưu bằng AI ⚡'}
                    </button>
                  </div>
                </div>

                {aiDraftResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-slate-50/55 border border-slate-150 rounded-xl space-y-3"
                  >
                    <div className="flex justify-between items-center bg-white p-2 border border-slate-100 rounded-lg">
                      <span className="text-[9.5px] font-black uppercase text-cyan-650 tracking-wider">Bản nháp được tối ưu:</span>
                      <span className="text-[9px] font-black bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">Thẻ kiến nghị: #{aiDraftResult.tag}</span>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-black text-slate-800">{aiDraftResult.title}</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-wrap font-sans bg-white border border-slate-100 rounded-lg p-3 max-h-52 overflow-y-auto">
                        {aiDraftResult.content}
                      </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => {
                          setNewPostTitle(aiDraftResult.title);
                          setNewPostContent(aiDraftResult.content);
                          setNewPostTag(aiDraftResult.tag);
                          setIsCreatingPost(true);
                          setActiveToolkitModule(null);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Check size={13} />
                        Áp dụng bản thảo này ngay
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* MODULE 2: C# COMPILER SANDBOX WORKSPACE */}
            {activeToolkitModule === 'cs-sandbox' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-1.5">
                    <Terminal size={16} className="text-cyan-500" />
                    <h4 className="text-xs font-black text-slate-850">C# Compiler Sandbox - Thực hành nạp & kiểm soát GC</h4>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCsSandboxCode(`using System;
using System.Collections.Generic;
using System.Linq;

class Sandbox {
    static void Main() {
        var db = new List<string> { "Apple", "Banana", "Cherry" };
        // LỖI: Gọi .ToList() làm tốn RAM trước khi .Where lọc
        var lazyCheck = db.ToList().Where(x => x.StartsWith("B")).ToList();
        Console.WriteLine(string.Join(",", lazyCheck));
    }
}`)}
                      className="bg-rose-50 text-rose-700 hover:bg-rose-100 text-[10px] font-bold px-2 py-1 rounded"
                    >
                      Nạp code lỗi ToList()
                    </button>
                    <button
                      onClick={() => setCsSandboxCode(`using System;

class Sandbox {
    static void Main() {
        // Struct tối ưu hóa lưu trữ trực tiếp trên Stack
        Point3D p = new Point3D(10, 20, 30);
        Console.WriteLine($"Point allocation on Stack.");
    }
}
struct Point3D {
    public int X, Y, Z;
    public Point3D(int x, int y, int z) { X = x; Y = y; Z = z; }
}`)}
                      className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 text-[10px] font-bold px-2 py-1 rounded"
                    >
                      Nạp code tối ưu Struct
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10.5px] text-slate-450 font-semibold">Viết hoặc kiểm chứng cấu trúc code block của bạn để phân tích hiệu suất bộ nhớ trong C#/EF Core:</p>
                  <textarea
                    value={csSandboxCode}
                    onChange={(e) => setCsSandboxCode(e.target.value)}
                    rows={6}
                    className="w-full bg-slate-900 text-cyan-300 p-4.5 rounded-xl font-mono text-[11px] leading-relaxed outline-none focus:ring-1 focus:ring-cyan-500 border-none resize-none"
                  />
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleSimulateCsSandbox}
                      disabled={isCsCompiling}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                    >
                      {isCsCompiling ? 'Đang đo đạc...' : 'Biên dịch & Đo đạc hiệu năng ô nhớ ⚡'}
                    </button>
                  </div>
                </div>

                {csSandboxReport && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3.5"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-405 block">Trạng thái biên dịch giả lập (Console Log):</span>
                      <pre className="bg-slate-950 text-emerald-400 p-3 rounded-lg font-mono text-[10px] mt-1.5 border border-slate-800 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        {csSandboxReport.logs}
                      </pre>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-405 block">Khuyến nghị từ Giáo Viên AI học thuật:</span>
                      <div className="space-y-1">
                        {csSandboxReport.recommendations.map((rec, i) => (
                          <div key={i} className="text-[11px] font-semibold text-slate-700 flex items-start gap-1.5 font-sans leading-relaxed">
                            <span>💡</span>
                            <p>{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* MODULE 3: PROGRAMMING QUOTES & MEME GENERATOR */}
            {activeToolkitModule === 'meme-gen' && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                  <Flame size={16} className="text-purple-500" />
                  <h4 className="text-xs font-black text-slate-850">Động lực & Meme Lập trình C# thấu đạt</h4>
                </div>
                <p className="text-[10.5px] text-slate-450 font-medium">Lập trình đôi khi đau đầu, hãy cùng nạp năng lượng tinh thần vượt qua bug hóc bằng các thẻ danh ngôn học thuật chất lượng:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Meme Visual Display */}
                  <div className="bg-stone-50 border border-amber-300 p-6 rounded-xl flex flex-col justify-between space-y-4 relative overflow-hidden select-none">
                    <div className="text-3xl shrink-0">{developerMemes[selectedMemeIdx].emoji}</div>
                    <div className="space-y-2">
                      <span className="text-[9px] bg-amber-100 text-amber-800 font-black px-2 py-0.5 rounded tracking-wide uppercase">{developerMemes[selectedMemeIdx].category}</span>
                      <p className="text-xs font-black text-slate-800 leading-relaxed font-serif italic">"{developerMemes[selectedMemeIdx].quote}"</p>
                    </div>
                    <div className="text-[8.5px] text-slate-400 font-mono tracking-widest font-black uppercase border-t border-dashed border-slate-200 pt-2 text-right">
                      SmartLMS Hub Motivation Card
                    </div>
                  </div>

                  {/* Actions Selector */}
                  <div className="space-y-3.5 flex flex-col justify-center">
                    <div className="space-y-1 text-xs">
                      <span className="text-slate-400 font-bold block">Danh mục thẻ khả dụng:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {developerMemes.map((m, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedMemeIdx(idx);
                              setCopiedText(false);
                            }}
                            className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-colors border cursor-pointer ${
                              selectedMemeIdx === idx 
                                ? 'bg-purple-600 text-white border-purple-600 shadow-sm' 
                                : 'bg-slate-50 text-slate-655 border-slate-150 hover:bg-slate-100'
                            }`}
                          >
                            Thẻ {idx+1}: {m.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const fullText = `[ĐỘNG LỰC C#] "${developerMemes[selectedMemeIdx].quote}" - Chủ đề ${developerMemes[selectedMemeIdx].category}`;
                          navigator.clipboard.writeText(fullText);
                          setCopiedText(true);
                        }}
                        className="flex-1 py-2 bg-slate-900 text-white text-xs font-extrabold rounded-lg hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Copy size={13} />
                        {copiedText ? 'Đã sao chép thẻ!' : 'Sao chép văn bản thẻ'}
                      </button>
                      <button
                        onClick={() => {
                          setNewPostTitle(`Thẻ động lực lập trình: ${developerMemes[selectedMemeIdx].title}`);
                          setNewPostContent(`Gửi tặng mọi người thẻ lời khuyên rất thấu đáo về chủ đề: [${developerMemes[selectedMemeIdx].category}]\n\n"${developerMemes[selectedMemeIdx].quote}"\n\nChúc mọi người học tập vui vẻ!`);
                          setNewPostTag('Study Tips');
                          setIsCreatingPost(true);
                          setActiveToolkitModule(null);
                        }}
                        className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        🎁 Đăng thẻ này lên Hub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 4: ACTIVE RECALL FLASHCARDS */}
            {activeToolkitModule === 'flashcard' && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                  <BookOpen size={16} className="text-blue-500" />
                  <h4 className="text-xs font-black text-slate-850">C# Active Recall - Thẻ ghi nhớ định nghĩa căn bản</h4>
                </div>
                <p className="text-[10.5px] text-slate-450 font-medium font-sans">Vượt qua các câu hỏi phỏng vấn hóc búa nhất bằng phương pháp ôn tập chủ động hồi tưởng:</p>

                <div className="flex flex-col items-center space-y-4 py-2">
                  <div 
                    onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                    className={`w-full max-w-sm h-40 rounded-2xl p-6 flex flex-col justify-between items-center text-center cursor-pointer select-none transition-all duration-300 border shadow-inner ${
                      isFlashcardFlipped 
                        ? 'bg-gradient-to-br from-emerald-50/40 to-cyan-50/20 border-emerald-300 ring-2 ring-emerald-50' 
                        : 'bg-gradient-to-br from-slate-50 to-blue-50/20 border-slate-200'
                    }`}
                  >
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      {isFlashcardFlipped ? 'Mặt Sau (Trả Lời đầy đủ)' : 'Mặt Trước (Hỏi căn bản)'}
                    </span>

                    <p className={`text-xs ${isFlashcardFlipped ? 'font-bold text-slate-700 leading-relaxed' : 'font-black text-slate-900 text-[14px]'} leading-snug`}>
                      {isFlashcardFlipped 
                        ? csharpFlashcards[currentFlashcardIdx].back 
                        : csharpFlashcards[currentFlashcardIdx].front}
                    </p>

                    <span className="text-[10px] text-cyan-600 font-extrabold underline decoration-dashed">
                      {isFlashcardFlipped ? 'Nhấn để xem câu hỏi →' : 'Nhấn để lật đáp án →'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between w-full max-w-sm">
                    <button
                      onClick={() => {
                        const prevIdx = (currentFlashcardIdx - 1 + csharpFlashcards.length) % csharpFlashcards.length;
                        setCurrentFlashcardIdx(prevIdx);
                        setIsFlashcardFlipped(false);
                      }}
                      className="text-xs font-extrabold text-slate-500 hover:text-slate-800 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      ← Thẻ trước
                    </button>
                    <span className="text-[11px] font-bold text-slate-400 font-mono">
                      Thẻ {currentFlashcardIdx+1} / {csharpFlashcards.length}
                    </span>
                    <button
                      onClick={() => {
                        const nextIdx = (currentFlashcardIdx + 1) % csharpFlashcards.length;
                        setCurrentFlashcardIdx(nextIdx);
                        setIsFlashcardFlipped(false);
                      }}
                      className="text-xs font-extrabold text-slate-500 hover:text-slate-800 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      Thẻ sau →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 5: DISCUSSION FORUM THREAD SUMMARIZER */}
            {activeToolkitModule === 'summarizer' && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                  <Layers size={16} className="text-emerald-500" />
                  <h4 className="text-xs font-black text-slate-850">Trình Tóm Tắt Đàm Luận Diễn Đàn đa chiều</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-[10.5px] text-slate-450 font-medium">Bản tổng kết thông thái. Hãy dán một loạt các dòng comment rườm rà dưới post lỗi, chúng tôi sẽ nén lại thành kết luận giải pháp duy nhất:</p>
                  <textarea
                    value={threadInput}
                    onChange={(e) => setThreadInput(e.target.value)}
                    rows={4}
                    placeholder="Dán các comment tại đây..."
                    className="w-full bg-slate-50 border border-slate-150 rounded-xl p-3 text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSimulateSummarizer}
                      disabled={isSummarizingThread || !threadInput}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1"
                    >
                      {isSummarizingThread ? 'Đang tóm lược...' : 'Kết xuất Tóm lược Thảo luận ⚡'}
                    </button>
                  </div>
                </div>

                {threadSummaryResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-emerald-50/50 border border-emerald-150 rounded-xl space-y-2 text-xs font-semibold text-emerald-855"
                  >
                    <p className="text-[10.5px] font-black uppercase text-emerald-700">Báo cáo tóm tắt đồng thuận từ AI:</p>
                    <p className="leading-relaxed whitespace-pre-wrap font-sans text-slate-700">{threadSummaryResult}</p>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          const fullPostContent = `[TÓM TẮT GIẢI PHÁP] Tổng hợp thảo luận lỗi LINQ Performance:\n\n${threadSummaryResult}`;
                          setNewPostTitle("Báo cáo giải pháp tối ưu LINQ thớt thảo luận");
                          setNewPostContent(fullPostContent);
                          setNewPostTag("Study Tips");
                          setIsCreatingPost(true);
                          setActiveToolkitModule(null);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black px-3 py-1.5 rounded-lg border-none cursor-pointer"
                      >
                        Đăng bài báo cáo giải pháp lên Hub
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* MODULE 6: CURRICULUM ERROR MAP CLASSIFIER */}
            {activeToolkitModule === 'error-map' && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                  <Compass size={16} className="text-indigo-500" />
                  <h4 className="text-xs font-black text-slate-850">Phác Đồ Định Vị Lỗi Giáo Trình .NET Core</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-[10.5px] text-slate-450 font-medium">Bạn gặp một bug lạ khi chạy mã? Hãy nhập dòng stacktrace hoặc từ khóa chính. Hệ thống sẽ lập tức định vị khối kĩ năng giáo trình của bản đồ .NET cần bồi đắp:</p>
                  
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-600">
                    Gợi ý dán lỗi:
                    <button onClick={() => setErrorInputText('DbUpdateConcurrencyException: Expected 1 but affected 0')} className="underline text-indigo-600 cursor-pointer">Lỗi EF Concurrency</button>
                    <button onClick={() => setErrorInputText('DependencyInjection.CaptiveDependencyException: Lifetime checks violation')} className="underline text-indigo-600 cursor-pointer">Lỗi DI Singleton/Scoped</button>
                    <button onClick={() => setErrorInputText('SocketException: AMQP RabbitMQ Connection failed on 0.0.0.0:5672')} className="underline text-indigo-600 cursor-pointer">Lỗi Connection RabbitMQ Distributed</button>
                  </div>

                  <input
                    type="text"
                    value={errorInputText}
                    onChange={(e) => setErrorInputText(e.target.value)}
                    placeholder="Mã error log hoặc thông tin mô tả rắc rối..."
                    className="w-full bg-slate-50 border border-slate-150 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-cyan-500 font-semibold"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSimulateErrorClassifier}
                      className="bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      Bản đồ học tập .NET →
                    </button>
                  </div>
                </div>

                {mappedLevelResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4.5 bg-slate-50 border border-slate-150 rounded-xl space-y-3"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2 bg-white p-2.5 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-extrabold">Đăng ký kiến thức:</span>
                        <strong className="text-xs text-indigo-750 font-black">{mappedLevelResult.node}</strong>
                      </div>
                      <span className="text-[10px] font-black bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{mappedLevelResult.level}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10.5px] font-black text-slate-800">Biến chứng thường gặp:</span>
                      <p className="text-[11px] font-medium text-slate-500">{mappedLevelResult.desc}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10.5px] font-black text-slate-800">Giải pháp xử lý khuyên dùng:</span>
                      <ul className="space-y-1">
                        {mappedLevelResult.advice.map((item, idx) => (
                          <li key={idx} className="text-[11px] font-semibold text-slate-600 flex items-start gap-1 font-sans">
                            <span className="text-indigo-500">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* MODULE 7: REWARD BOUNTY WRITER */}
            {activeToolkitModule === 'bounty-maker' && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                  <Trophy size={16} className="text-amber-500" />
                  <h4 className="text-xs font-black text-slate-850">Kiến Tạo Câu Hỏi Treo Giải Thưởng Học Thuật (XP Bounty)</h4>
                </div>
                <p className="text-[10.5px] text-slate-450 font-medium">Bí lỗi rắc rối? Treo ngay điểm học tập XP của bạn làm giải thưởng thưởng nóng cho đồng học giải được nhanh nhất. Tác giả trả lời xuất sắc sẽ nhận trọn điểm của bạn khi bạn duyệt bài.</p>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-black text-slate-700">Số điểm XP treo thưởng:</label>
                      <select
                        value={bountyPoints}
                        onChange={(e) => setBountyPoints(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-150 text-xs px-3.5 py-2.5 rounded-xl outline-none text-slate-700 font-bold"
                      >
                        <option value={20}>🎁 20 XP Bounty</option>
                        <option value={50}>🎁 50 XP Bounty (Tiêu chuẩn)</option>
                        <option value={100}>🎁 100 XP Bounty (Khẩn cấp)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-black text-slate-700">Tiêu đề bài viết rắc rối:</label>
                      <input
                        type="text"
                        value={bountyTitle}
                        onChange={(e) => setBountyTitle(e.target.value)}
                        placeholder="Tiêu đề vụ việc..."
                        className="w-full bg-slate-50 border border-slate-150 text-xs px-3.5 py-2.5 rounded-xl outline-none font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-black text-slate-700">Nội dung chi tiết & Log kèm mã nguồn:</label>
                    <textarea
                      value={bountyContent}
                      onChange={(e) => setBountyContent(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-150 rounded-xl p-3 text-xs font-semibold text-slate-700 outline-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleCreateBountyPost}
                      disabled={!bountyTitle || !bountyContent}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-black px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                    >
                      <Trophy size={14} />
                      Đăng bài viết Treo Thưởng 🏆
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 8: DISCUSSION CODE QUALITY CHECKS */}
            {activeToolkitModule === 'auditor' && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                  <Award size={16} className="text-rose-500" />
                  <h4 className="text-xs font-black text-slate-850">Hệ Thống Thẩm Định Chất Lượng Thảo Luận Học Thuật</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-[10.5px] text-slate-450 font-medium font-sans">Kiểm nghiệm chất lượng văn tuyển. Hãy paste bài viết mẫu của bạn tại đây, AI sẽ quét độ chi tiết, định dạng sourcecode, lỗi cú pháp thô thiển để chấm điểm và đưa đề án cải thiện:</p>
                  
                  <textarea
                    value={auditorInput}
                    onChange={(e) => setAuditorInput(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-150 rounded-xl p-3 text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setAuditorInput('Lỗi Entity Framework Core: Tại sao dùng .Include() rồi join vẫn chậm?')}
                      className="text-[10px] text-slate-400 font-bold hover:underline"
                    >
                      Nạp bài thô thiếu code
                    </button>
                    <button
                      onClick={() => setAuditorInput('Cách dùng struct Point3D tối ưu hóa Stack:\n```csharp\nstruct Point3D { public int X; }\n```')}
                      className="text-[10px] text-slate-400 font-bold hover:underline"
                    >
                      Nạp bài chuẩn mực có code block
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSimulateAuditor}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      Bắt đầu thẩm định chất lượng bài ⚡
                    </button>
                  </div>
                </div>

                {auditorResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3.5"
                  >
                    <div className="flex items-center justify-between bg-white border border-slate-100 p-2.5 rounded-lg">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Chỉ số uy tín nội lượng:</span>
                        <span className="text-xs font-black text-slate-800">{auditorResult.level}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-black text-rose-650">{auditorResult.score}</span>
                        <span className="text-[10px] font-bold text-slate-400">/100</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10.5px] font-black text-slate-800">Lời giải chi tiết cấu trúc nâng thứ hạng bài:</span>
                      <div className="space-y-1.5">
                        {auditorResult.tips.map((tip, idx) => (
                          <div key={idx} className="text-[11px] font-semibold text-slate-700 flex items-start gap-1 font-sans leading-relaxed">
                            <span>⚡</span>
                            <p>{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* MODULE 9: GROUP RECRUITINVITATION GENERATOR */}
            {activeToolkitModule === 'recruiter' && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                  <Users size={16} className="text-teal-500" />
                  <h4 className="text-xs font-black text-slate-850">Trình Khởi Tạo Tin Nhắn Chiêu Mộ Thành Viên Nhóm Tự Học</h4>
                </div>
                <p className="text-[10.5px] text-slate-450 font-medium">Bạn muốn rủ rê thành lập nhóm tự học chung thực tế? Hãy chỉnh sửa tiêu chuẩn dưới đây để xuất ra văn bản mời thầu học thuật sinh động:</p>

                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-0.5">
                      <label className="text-[10.5px] font-black text-slate-700">Mục tiêu học nhóm:</label>
                      <input
                        type="text"
                        value={recruitTopic}
                        onChange={(e) => setRecruitTopic(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-150 text-xs px-3.5 py-2.5 rounded-xl outline-none font-semibold"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[10.5px] font-black text-slate-700">Lịch trình họp chung:</label>
                      <input
                        type="text"
                        value={recruitSchedule}
                        onChange={(e) => setRecruitSchedule(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-150 text-xs px-3.5 py-2.5 rounded-xl outline-none font-semibold"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[10.5px] font-black text-slate-700">Thời lượng dự tính:</label>
                      <input
                        type="text"
                        value={recruitTarget}
                        onChange={(e) => setRecruitTarget(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-150 text-xs px-3.5 py-2.5 rounded-xl outline-none font-semibold"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSimulateRecruiter}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-black px-4 py-2 rounded-xl cursor-pointer"
                    >
                      Sinh bản thảo thư mời ⚡
                    </button>
                  </div>
                </div>

                {recruitCodeResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3.5"
                  >
                    <pre className="bg-white p-3 border border-slate-100 rounded-lg text-slate-750 font-mono text-[10.5px] leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-52 font-sans select-all">
                      {recruitCodeResult}
                    </pre>
                    <div className="flex justify-end gap-2.5">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(recruitCodeResult);
                          setCopiedText(true);
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Copy size={13} />
                        {copiedText ? 'Đã sao chép!' : 'Sao chép thư tuyển'}
                      </button>
                      <button
                        onClick={() => {
                          setNewPostTitle(`[TUYỂN ĐỒNG ĐỘI] ${recruitTopic}`);
                          setNewPostContent(recruitCodeResult);
                          setNewPostTag('Recruitment');
                          setIsCreatingPost(true);
                          setActiveToolkitModule(null);
                        }}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black px-4 py-2 rounded-xl cursor-pointer"
                      >
                        Đăng bài chiêu mộ lên Hub
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* MODULE 10: COMMUNTIY OPINION SURVEYS & POLLS */}
            {activeToolkitModule === 'poll-maker' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-1.5">
                    <BarChart2 size={16} className="text-pink-500" />
                    <h4 className="text-xs font-black text-slate-850">Biểu Quyết Thảo Luận & Khảo Sát Đồng Học</h4>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9.5px] font-black uppercase text-pink-650 tracking-wider">Khảo sát cộng đồng đang diễn ra:</span>
                    <h5 className="text-xs font-black text-slate-800 leading-snug">{pollQuestion || "Nên chọn thư viện nào để gửi tin nhắn thông điệp Distributed Queue tốt nhất?"}</h5>
                  </div>

                  <div className="space-y-2">
                    {pollOptions.map((opt, idx) => {
                      const totalVotes = pollVotes.reduce((a, b) => a + b, 0);
                      const percent = totalVotes > 0 ? Math.round((pollVotes[idx] / totalVotes) * 100) : 0;
                      const hasVoted = userVotedIdx !== null;

                      return (
                        <div 
                          key={idx}
                          onClick={() => {
                            if (!hasVoted) {
                              const updated = [...pollVotes];
                              updated[idx] += 1;
                              setPollVotes(updated);
                              setUserVotedIdx(idx);
                            }
                          }}
                          className={`relative p-3.5 rounded-xl border transition-all cursor-pointer select-none overflow-hidden flex items-center justify-between ${
                            userVotedIdx === idx 
                              ? 'bg-pink-50/10 border-pink-300 shadow-sm ring-1 ring-pink-50' 
                              : 'bg-white border-slate-150 hover:bg-slate-50'
                          }`}
                        >
                          {/* Percent bar background fill */}
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-pink-100/35 transition-all"
                            style={{ width: `${percent}%` }}
                          />

                          <span className="text-xs font-bold text-slate-750 relative z-10 font-sans">{idx+1}. {opt}</span>
                          <span className="text-xs font-black text-pink-700 relative z-10 uppercase font-mono">
                            {pollVotes[idx]} lượt ({percent}%) {userVotedIdx === idx && '✓'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3.5 border-t border-slate-100 pt-3">
                  <p className="text-[10.5px] text-slate-450 font-medium">Bạn muốn khởi tạo biểu quyết mới? Điền câu hỏi biểu trưng của bạn để tạo bài viết trưng cầu:</p>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                      placeholder="Câu hỏi khảo sát mới..."
                      className="flex-1 bg-slate-50 border border-slate-150 text-xs px-3.5 py-2.5 rounded-xl outline-none font-semibold"
                    />
                    <button
                      onClick={handlePostPollToFeed}
                      disabled={!pollQuestion}
                      className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-black px-4 py-2 rounded-xl cursor-pointer shadow-sm shrink-0"
                    >
                      Khởi tạo cuộc trưng cầu 📊
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Create Post Area */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        {!isCreatingPost ? (
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200">
              <img src={currentUser.avatar} alt="Me" referrerPolicy="no-referrer" />
            </div>
            <button 
              onClick={() => setIsCreatingPost(true)}
              className="flex-1 bg-slate-50 hover:bg-slate-100/80 text-left text-slate-400 text-sm px-5 py-3 rounded-xl border border-slate-100 transition-all cursor-pointer flex items-center justify-between"
            >
              <span>Bạn muốn chia sẻ điều gì hoặc hỏi đề toán nào...</span>
              <Plus size={18} className="text-slate-400" />
            </button>
          </div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            onSubmit={handleCreatePost} 
            className="space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">Tạo bài thảo luận mới</h3>
              <button 
                type="button" 
                onClick={() => setIsCreatingPost(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                Hủy bỏ
              </button>
            </div>

            <div className="space-y-3">
              <input 
                type="text" 
                required
                placeholder="Tiêu đề thảo luận (ví dụ: Giải đáp thắc mắc bài tập .NET Core)" 
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 font-medium placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Chủ đề khóa học</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full bg-slate-50 border-none text-sm px-4 py-2.5 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="StudyWorkspace">StudyWorkspace</option>
                    <option value="C# Advanced">C# Advanced</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Database Systems">Database Systems</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Events & News">Events & News</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Thẻ bài viết</label>
                  <select
                    value={newPostTag}
                    onChange={(e) => setNewPostTag(e.target.value)}
                    className="w-full bg-slate-50 border-none text-sm px-4 py-2.5 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Discussion">Discussion</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Share Resource">Share Resource</option>
                    <option value="Study Tips">Study Tips</option>
                    <option value="Recruitment">Recruitment</option>
                  </select>
                </div>
              </div>

              <textarea 
                required
                placeholder="Nội dung thảo luận chi tiết... Học viên SmartLMS có thể cùng nhau hỗ trợ."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={4}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition-all text-sm"
              />

              {selectedAttachment && (
                <div className="p-3 bg-cyan-50/60 rounded-xl border border-cyan-100 text-xs text-cyan-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 capitalize font-medium">
                    <Sparkles size={14} className="text-cyan-600 animate-pulse" />
                    Đã chuẩn bị đính kèm {selectedAttachment} mẫu
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setSelectedAttachment(null)}
                    className="text-cyan-800 hover:text-cyan-950 underline font-bold"
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  title="Đính kèm ảnh"
                  onClick={() => setSelectedAttachment('image')}
                  className={`p-2 rounded-lg transition-all ${selectedAttachment === 'image' ? 'bg-cyan-100 text-cyan-600' : 'text-slate-400 hover:bg-slate-50 hover:text-cyan-600'}`}
                >
                  <ImageIcon size={20} />
                </button>
                <button
                  type="button"
                  title="Đính kèm video"
                  onClick={() => setSelectedAttachment('video')}
                  className={`p-2 rounded-lg transition-all ${selectedAttachment === 'video' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-blue-600'}`}
                >
                  <Video size={20} />
                </button>
                <button
                  type="button"
                  title="Đính kèm tài liệu"
                  onClick={() => setSelectedAttachment('file')}
                  className={`p-2 rounded-lg transition-all ${selectedAttachment === 'file' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                  <Paperclip size={20} />
                </button>
              </div>

              <button 
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm px-6 py-2 rounded-xl transition-all shadow-md active:scale-95"
              >
                Đăng bài lên Hub
              </button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Search results banner if searching */}
      {searchQuery && (
        <div className="text-sm text-slate-500 font-medium">
          Tìm thấy <span className="text-cyan-600 font-bold">{filteredPosts.length}</span> bài thảo luận phù hợp với "{searchQuery}"
        </div>
      )}

      {/* Feed List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <motion.div
                key={post.id}
                layoutId={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200/80 shadow-sm shadow-slate-100/60 hover:shadow-md transition-all duration-250 group/card"
              >
                {/* Post Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                      <img src={post.authorAvatar} alt={post.authorName} referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-800 text-sm hover:text-cyan-600 transition-colors cursor-pointer">
                          {post.authorName}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${getRoleBadgeStyle(post.authorRole)}`}>
                          {post.authorRole}
                        </span>
                        {post.tag && (
                          <span className="bg-slate-50 text-slate-500 border border-slate-100 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                            #{post.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {new Date(post.createdAt).toLocaleDateString('vi', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })} &#183; {' '}
                        {new Date(post.createdAt).toLocaleTimeString('vi', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold px-2.5 py-1 rounded-lg">
                      {post.category}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div 
                  onClick={() => onSelectItem?.('post', post.id)}
                  className="space-y-3 cursor-pointer group-hover/card:bg-slate-50/20 p-1.5 rounded-xl transition-all"
                  id={`post-click-${post.id}`}
                >
                  <h4 className="text-base font-extrabold text-slate-800 group-hover/card:text-cyan-600 transition-colors leading-snug flex items-center gap-1.5">
                    {post.title}
                    <span className="text-[10px] text-cyan-500 font-bold opacity-0 group-hover/card:opacity-100 transition-opacity whitespace-nowrap">
                      (Nêu ý kiến →)
                    </span>
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-semibold">
                    {post.content}
                  </p>

                  {/* Attachment Previews */}
                  {post.attachmentType === 'image' && (
                    <div className="relative rounded-xl overflow-hidden bg-slate-100 max-h-72 border border-slate-100 my-2">
                      <img 
                        src={post.attachmentUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"} 
                        alt="Attached image"
                        className="w-full object-cover max-h-72"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {post.attachmentType === 'video' && (
                    <div className="w-full bg-amber-50 border border-amber-100 text-xs text-amber-800 rounded-xl p-4 flex items-center gap-3 my-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
                        <Video size={18} />
                      </div>
                      <div>
                        <p className="font-bold">Đính kèm video bài giảng</p>
                        <p className="text-[10px] text-amber-700/80 font-semibold text-amber-600">Nhấp để xem nguồn học liệu chi tiết.</p>
                      </div>
                    </div>
                  )}
                  {post.attachmentType === 'file' && (
                    <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between text-xs text-slate-600 my-2">
                      <div className="flex items-center gap-2">
                        <Paperclip size={15} className="text-cyan-600" />
                        <span className="font-bold">tai-lieu-on-tap-dat-chuan.docx</span>
                      </div>
                      <span className="text-[10px] bg-slate-100 font-bold px-1.5 py-0.5 rounded text-slate-400">2.1 MB</span>
                    </div>
                  )}
                </div>

                {/* Engagement Section */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-xl transition-all ${
                        post.likedByUser 
                          ? 'bg-rose-50 text-rose-600' 
                          : 'text-slate-500 hover:text-rose-600 hover:bg-slate-50'
                      }`}
                    >
                      <Heart size={17} className={post.likedByUser ? 'fill-rose-500 text-rose-500' : ''} />
                      <span>{post.likes}</span>
                    </button>

                    <button 
                      onClick={() => setActiveCommentBox(activeCommentBox === post.id ? null : post.id)}
                      className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-xl transition-all ${
                        activeCommentBox === post.id 
                          ? 'bg-cyan-50 text-cyan-600' 
                          : 'text-slate-500 hover:text-cyan-600 hover:bg-slate-50'
                      }`}
                    >
                      <MessageSquare size={17} />
                      <span>{post.commentsCount}</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setSharingPost(post);
                        setSharingStep(1);
                        setShareFormat('link');
                        setShareCustomNote(`Mình thấy bài thảo luận "${post.title}" này vô cùng bổ ích, mời mọi người vào cùng học tập!`);
                        setSimulatedScoreXpAdded(false);
                      }}
                      className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <Share2 size={17} className={sharingPost?.id === post.id ? 'text-indigo-600' : ''} />
                      <span>Chia sẻ</span>
                    </button>
                  </div>
                </div>

                {/* Comments Area */}
                <AnimatePresence>
                  {(activeCommentBox === post.id || post.comments.length > 0) && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-4 pt-4 border-t border-slate-50 space-y-4"
                    >
                      {/* Comments List */}
                      {post.comments.length > 0 && (
                        <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                          {post.comments.map(c => (
                            <div key={c.id} className="text-xs flex gap-2 items-start bg-white p-2.5 rounded-xl border border-slate-100">
                              <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                <img src={c.authorAvatar} alt={c.authorName} referrerPolicy="no-referrer" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-800 text-xs">{c.authorName}</span>
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border scale-95 ${getRoleBadgeStyle(c.authorRole)}`}>
                                    {c.authorRole}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    {new Date(c.createdAt).toLocaleDateString('vi', { month: 'short', day: 'numeric' })}
                                  </span>
                                </div>
                                <p className="text-slate-600 mt-1">{c.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment Input Box */}
                      {activeCommentBox === post.id && (
                        <div className="flex gap-2 items-center">
                          <input 
                            type="text"
                            placeholder="Nhập câu trả lời của bạn, nhấn Gửi..."
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(post.id);
                              }
                            }}
                            className="flex-1 text-xs bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
                          />
                          <button 
                            onClick={() => handleAddComment(post.id)}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-xl transition-all shadow active:scale-95 shrink-0"
                          >
                            <Send size={15} />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 space-y-2">
              <AlertCircle className="mx-auto text-slate-300" size={32} />
              <p className="font-bold text-slate-600">Không tìm thấy cuộc thảo luận nào!</p>
              <p className="text-xs">Hãy thử thay đổi từ khóa tìm kiếm hoặc lọc chủ đề khác.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          🌟 INTUATIVE 3-STEP SEQUENTIAL POST SHARING USER FLOW
         ========================================================================= */}
      <AnimatePresence>
        {sharingPost && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white px-6 py-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <Share2 size={18} className="text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-white">Lan Tỏa Thảo Luận Học Thuật</h3>
                    <p className="text-[10px] text-cyan-100 font-bold uppercase tracking-widest mt-0.5">3 bước chia sẻ thông thái tích lũy tài nguyên</p>
                  </div>
                </div>
                <button
                  onClick={() => setSharingPost(null)}
                  className="text-white/80 hover:text-white bg-white/5 hover:bg-white/15 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer"
                >
                  Đóng
                </button>
              </div>

              {/* Step Navigation Progress Indicators */}
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                {[1, 2, 3].map((step) => {
                  const isActive = sharingStep === step;
                  const isCompleted = sharingStep > step;
                  return (
                    <div key={step} className="flex-1 flex items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                            isActive
                              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-100 ring-2 ring-cyan-50'
                              : isCompleted
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isCompleted ? <Check size={14} strokeWidth={3} /> : step}
                        </div>
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wide hidden sm:inline ${
                            isActive ? 'text-slate-800' : isCompleted ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {step === 1 ? 'Phương thức' : step === 2 ? 'Xem trước' : 'Hoàn thành (+15 XP)'}
                        </span>
                      </div>
                      {step < 3 && (
                        <div
                          className={`flex-1 h-0.5 mx-4 rounded-full ${
                            sharingStep > step ? 'bg-emerald-400' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Scrollable Content Container */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1 select-none">
                {/* STEP 1: CONFIGURE FORMAT & SOURCE */}
                {sharingStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide mb-1">Bước 1: Chọn hình thức chia sẻ</h4>
                      <p className="text-[11px] text-slate-405 font-medium">Tối ưu cách truyền đạt thông tin khối kiến thức đến các nền tảng học thuật.</p>
                    </div>

                    <div className="space-y-3">
                      {/* Option 1: Copy Smart Link */}
                      <div
                        onClick={() => setShareFormat('link')}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-center ${
                          shareFormat === 'link'
                            ? 'bg-cyan-50/20 border-cyan-500 ring-2 ring-cyan-50'
                            : 'bg-white border-slate-150 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${shareFormat === 'link' ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Copy size={18} />
                        </div>
                        <div className="flex-1 text-left">
                          <strong className="text-xs font-black text-slate-800 block">1. Liên kết thông minh (Smart Link)</strong>
                          <span className="text-[10px] text-slate-400 font-semibold">Tạo URL rút gọn tối ưu SEO, kèm mã tracking đóng góp của học viên.</span>
                        </div>
                      </div>

                      {/* Option 2: Formatted Academic Markdown */}
                      <div
                        onClick={() => setShareFormat('markdown')}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-center ${
                          shareFormat === 'markdown'
                            ? 'bg-indigo-50/20 border-indigo-500 ring-2 ring-indigo-50'
                            : 'bg-white border-slate-150 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${shareFormat === 'markdown' ? 'bg-indigo-550 text-white bg-indigo-650' : 'bg-slate-100 text-slate-500'}`}>
                          <Code size={18} />
                        </div>
                        <div className="flex-1 text-left">
                          <strong className="text-xs font-black text-slate-800 block">2. Định dạng học thuật (Markdown Code)</strong>
                          <span className="text-[10px] text-slate-450 font-semibold">Tự động cấu trúc hóa tiêu đề, thẻ, và nội dung kèm markdown code block để lưu trữ.</span>
                        </div>
                      </div>

                      {/* Option 3: Stream to SmartLMS virtual Classroom */}
                      <div
                        onClick={() => setShareFormat('classroom')}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-center ${
                          shareFormat === 'classroom'
                            ? 'bg-pink-50/20 border-pink-500 ring-2 ring-pink-50'
                            : 'bg-white border-slate-150 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${shareFormat === 'classroom' ? 'bg-pink-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Users size={18} />
                        </div>
                        <div className="flex-1 text-left">
                          <strong className="text-xs font-black text-slate-800 block">3. Đẩy liên kết truyền thông lên LMS Class</strong>
                          <span className="text-[10px] text-slate-455 font-semibold">Gửi đề xuất học tập dạng thông báo đẩy đến tất cả đồng môn lớp phụ trách.</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => setSharingStep(2)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-extrabold px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer border-none"
                      >
                        Tiếp tục: Xem trước & Hiệu chỉnh
                        <span>→</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PREVIEW & CUSTOM MESSAGE */}
                {sharingStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide mb-1">Bước 2: Hiệu chỉnh lời tựa & Xem trước nội dung</h4>
                      <p className="text-[11px] text-slate-405 font-medium">Lời khích lệ học thuật đi kèm sẽ kích cầu tinh thần cùng mổ xẻ thớt thảo luận.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-450 block uppercase">Viết tự giới thiệu ngắn (lời dẫn):</label>
                      <textarea
                        value={shareCustomNote}
                        onChange={(e) => setShareCustomNote(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-150 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-cyan-500 font-semibold text-slate-750"
                        placeholder="Bạn có muốn nhắn gửi lời khuyên gì khi chia sẻ thớt này?"
                      />
                    </div>

                    {/* Pre-styled Live Snippet Preview Bubble */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-450 block uppercase">Xem trước thông điệp hiển thị thực tế:</span>
                      <div className="bg-gradient-to-br from-slate-50 to-indigo-50/10 border border-indigo-100 rounded-2xl p-4.5 space-y-3 relative overflow-hidden">
                        <div className="flex items-center gap-2 pb-2.5 border-b border-dashed border-slate-150">
                          <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                            <img src={currentUser.avatar} alt="Me" referrerPolicy="no-referrer" />
                          </div>
                          <span className="text-[10px] text-slate-550 font-extrabold">{currentUser.name}</span>
                          <span className="text-[9px] bg-slate-200/60 text-slate-450 px-1.5 py-0.5 rounded uppercase font-bold tracking-widest leading-none font-mono">Đang chia sẻ</span>
                        </div>

                        {shareCustomNote && (
                          <p className="text-xs text-indigo-950 font-black italic">
                            💬 "{shareCustomNote}"
                          </p>
                        )}

                        {/* Block representation based on selected shareFormat */}
                        <div className="bg-white border border-slate-150/80 p-3 rounded-xl space-y-1.5 text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] bg-cyan-100 text-cyan-700 px-1.5 py-0.5 rounded font-black max-w-max uppercase tracking-wider leading-none">
                              #{sharingPost.tag || 'StudyTips'}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">{sharingPost.category}</span>
                          </div>
                          <h5 className="text-[11.5px] font-black text-slate-800 leading-tight">
                            {sharingPost.title}
                          </h5>
                          
                          {shareFormat === 'link' && (
                            <div className="text-[9px] font-mono bg-slate-50 text-blue-600 p-1.5 rounded border border-dashed border-blue-100 break-all select-all">
                              https://smartlms-hub.edu/posts/{sharingPost.id}?ref={currentUser.name.toLowerCase().replace(/\s+/g, '')}
                            </div>
                          )}

                          {shareFormat === 'markdown' && (
                            <div className="text-[9px] font-mono bg-slate-900 text-emerald-400 p-2 rounded max-h-24 overflow-y-auto whitespace-pre leading-relaxed">
                              {`### [C# Thảo Luận] ${sharingPost.title}\n> ${sharingPost.content.substring(0, 80)}...\n- Chia sẻ bởi: @${currentUser.name}`}
                            </div>
                          )}

                          {shareFormat === 'classroom' && (
                            <div className="text-[10px] text-pink-650 font-semibold flex items-center gap-1">
                              <span>📢</span>
                              <span>Truyền tin thông báo đẩy lên diễn đàn lớp học Virtual-Class C# Advanced</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSharingStep(1)}
                        className="text-slate-500 hover:text-slate-800 text-xs font-bold bg-slate-50 border border-slate-155 px-4 py-2.5 rounded-xl cursor-pointer"
                      >
                        ← Quay lại
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          // Simulating server action to complete share
                          setSharingStep(3);
                          setSimulatedScoreXpAdded(true);
                        }}
                        className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer border-none"
                      >
                        Xác nhận & Chia sẻ Ngay 🚀
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: SUCCESS & XP REWARD CRACKER */}
                {sharingStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center space-y-4 py-4"
                  >
                    {/* Glowing Big Success Award Emblem */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100 scale-100 animate-pulse">
                        <Trophy size={32} />
                      </div>
                      <div className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-lg border-2 border-white uppercase tracking-wider shadow animate-bounce">
                        +15 XP
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-850 uppercase tracking-wide">Chia sẻ giáo tài lý tưởng hoàn tất!</h4>
                      <p className="text-[11px] text-slate-450 font-medium mt-0.5">Trường học ghi nhận +15 điểm đóng góp học thuật của bạn vào bảng xếp hạng tuần này.</p>
                    </div>

                    <div className="bg-slate-50/80 border border-slate-150 p-4 rounded-2xl w-full text-left space-y-2">
                      <span className="text-[9.5px] uppercase font-black text-slate-400 tracking-wider block">Chia sẻ thành công theo hình thức:</span>
                      <strong className="text-xs font-black text-cyan-700 uppercase p-1 bg-cyan-50 border border-cyan-150 rounded text-[10px]">
                        {shareFormat === 'link' ? 'Liên kết thông minh URL' : shareFormat === 'markdown' ? 'Mã Markdown định dạng' : 'Bản tin Lớp học LMS Direct'}
                      </strong>

                      <div className="space-y-1 border-t border-dashed border-slate-200 pt-2 text-[10.5px] font-semibold text-slate-600 leading-relaxed font-sans">
                        <p>✓ Đã nén ngắn gọn đường truyền dữ liệu.</p>
                        <p>✓ Đăng kí thẻ đóng góp tài liệu của lớp hữu nghị.</p>
                        <p>✓ Hệ thống ghi nhận phát hành mã nguồn sạch.</p>
                      </div>

                      {shareFormat === 'link' && (
                        <div className="mt-2.5">
                          <input
                            type="text"
                            readOnly
                            value={`https://smartlms-hub.edu/posts/${sharingPost.id}?ref=${currentUser.name.toLowerCase().replace(/\s+/g, '')}`}
                            className="w-full bg-white border border-slate-150 text-xs px-3 py-2 rounded-xl text-slate-705 outline-none font-mono"
                          />
                          <button
                            onClick={() => {
                              setIsCopyingSharedLink(true);
                              navigator.clipboard.writeText(`https://smartlms-hub.edu/posts/${sharingPost.id}?ref=${currentUser.name.toLowerCase().replace(/\s+/g, '')}`);
                              setTimeout(() => setIsCopyingSharedLink(false), 2000);
                            }}
                            className="mt-1.5 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none"
                          >
                            <Copy size={12} />
                            {isCopyingSharedLink ? "Đã sao chép liên kết chia sẻ!" : "Sao chép liên kết chia sẻ"}
                          </button>
                        </div>
                      )}

                      {shareFormat === 'markdown' && (
                        <div className="mt-2.5">
                          <textarea
                            readOnly
                            rows={3}
                            value={`### [C# Thảo Luận] ${sharingPost.title}\n\n${shareCustomNote ? `> ${shareCustomNote}\n\n` : ''}\`\`\`csharp\n${sharingPost.content}\n\`\`\`\n\n*Chia sẻ bởi: @${currentUser.name} trên SmartLMS Hub*`}
                            className="w-full bg-slate-900 text-emerald-400 text-[10px] p-2.5 rounded-xl outline-none font-mono resize-none leading-relaxed border-none"
                          />
                          <button
                            onClick={() => {
                              setIsCopyingSharedLink(true);
                              navigator.clipboard.writeText(`### [C# Thảo Luận] ${sharingPost.title}\n\n${shareCustomNote ? `> ${shareCustomNote}\n\n` : ''}\`\`\`csharp\n${sharingPost.content}\n\`\`\`\n\n*Chia sẻ bởi: @${currentUser.name} trên SmartLMS Hub*`);
                              setTimeout(() => setIsCopyingSharedLink(false), 2005);
                            }}
                            className="mt-1.5 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none"
                          >
                            <Copy size={12} />
                            {isCopyingSharedLink ? "Đã sao chép định dạng MD!" : "Sao chép nội dung Markdown"}
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSharingPost(null)}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black py-3 rounded-xl transition-all shadow shadow-cyan-100 cursor-pointer border-none"
                    >
                      Tuyệt vời! Hoàn thành & Quay lại thớt
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
