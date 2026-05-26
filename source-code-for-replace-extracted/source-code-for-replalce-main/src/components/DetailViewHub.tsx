import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, MessageSquare, Heart, Share2, Award, Download, ThumbsUp, Star, Calendar, 
  Clock, MapPin, Users, CheckCircle, ChevronUp, ChevronDown, Check, HelpCircle, 
  Send, Sparkles, Video, BookOpen, Trash, Shield, Compass, Code, Printer, Link2, Play,
  TrendingUp
} from 'lucide-react';
import { Post, Resource, Event, Question, StudyGroup, Comment, Answer, UserRole } from '../types';

interface DetailViewHubProps {
  selectedDetail: { type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member'; id: string } | null;
  onBack: () => void;
  currentUser: { id: string; name: string; role: UserRole; avatar: string; major?: string; points: number };
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  groups: StudyGroup[];
  setGroups: React.Dispatch<React.SetStateAction<StudyGroup[]>>;
  showToast: (msg: string) => void;
  onUpdateUserPoints: (pointsToAdd: number) => void;
  onSelectItem?: (type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member', id: string) => void;
}

export default function DetailViewHub(props: DetailViewHubProps) {
  if (!props.selectedDetail) return null;
  const { type, id } = props.selectedDetail;
  switch (type) {
    case 'post':
      return <PostDetailView {...props} id={id} />;
    case 'resource':
      return <ResourceDetailView {...props} id={id} />;
    case 'event':
      return <EventDetailView {...props} id={id} />;
    case 'question':
      return <QuestionDetailView {...props} id={id} />;
    case 'group':
      return <GroupDetailView {...props} id={id} />;
    case 'member':
      return <MemberDetailView {...props} id={id} />;
    default:
      return null;
  }
}

function PostDetailView({
  id,
  onBack,
  currentUser,
  posts,
  setPosts,
  showToast,
  onSelectItem
}: DetailViewHubProps & { id: string }) {
  const post = posts.find(p => p.id === id);
  if (!post) return <div className="p-6 bg-white rounded-3xl text-center font-bold text-slate-500">Không tìm thấy bài viết này.</div>;

  const [commentText, setCommentText] = useState('');
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

    const handleLike = () => {
      setPosts(prev => prev.map(p => {
        if (p.id === post.id) {
          return {
            ...p,
            likes: p.likedByUser ? p.likes - 1 : p.likes + 1,
            likedByUser: !p.likedByUser
          };
        }
        return p;
      }));
    };

    const handleAddComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!commentText.trim()) return;

      const newComment: Comment = {
        id: `c-${Date.now()}`,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        authorRole: currentUser.role,
        createdAt: new Date().toISOString(),
        content: commentText
      };

      setPosts(prev => prev.map(p => {
        if (p.id === post.id) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      }));
      setCommentText('');
      showToast('Đăng bình luận đóng góp thành công!');
    };

    const triggerLmsAiHelper = () => {
      setAiAnalyzing(true);
      setAiResponse(null);
      setTimeout(() => {
        setAiAnalyzing(false);
        setAiResponse(
          `🤖 [SmartLMS Hub AI trợ giúp]: Dựa trên bài đăng "${post.title}", hệ thống gợi ý bạn hướng đi sau:\n\n` +
          `1. Kiểm tra lại việc thiết lập cấu hình CORS của dự án ASP.NET Core trong tệp Program.cs.\n` +
          `2. Đảm bảo sử dụng mẫu 'Clean Architecture' bằng cách phân tách biệt lập tầng Domain, Application, và Infrastructure để giảm thiểu rủi ro nghẽn luồng truy vấn.\n` +
          `3. Thử tải lại giáo trình trong mục 'Kho tài nguyên của Hub' để lấy nguyên mẫu thực hành .cs hoàn chỉnh.`
        );
        showToast('Trợ lý học thuật AI phân tích thành công!');
      }, 1500);
    };

    return (
      <div className="space-y-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-100 cursor-pointer"
        >
          <ArrowLeft size={14} /> Trở về Diễn đàn Thảo luận
        </button>

        {/* Detailed Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-5"
        >
          {/* Post Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div 
              onClick={() => onSelectItem?.('member', post.authorName)}
              className="flex items-center gap-3 cursor-pointer group/post-author"
              title="Xem hồ sơ"
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 border border-slate-150 group-hover/post-author:ring-2 group-hover/post-author:ring-cyan-400 transition-all">
                <img src={post.authorAvatar} alt={post.authorName} referrerPolicy="no-referrer" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-800 text-sm group-hover/post-author:text-cyan-600 transition-colors">{post.authorName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-cyan-100 text-cyan-700">
                    {post.authorRole}
                  </span>
                  {post.tag && (
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      #{post.tag}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Đăng ngày {new Date(post.createdAt).toLocaleString('vi')} <span className="text-[9px] text-cyan-500 font-bold opacity-0 group-hover/post-author:opacity-100 transition-opacity">(Xem hồ sơ →)</span></p>
              </div>
            </div>

            <span className="text-xs bg-cyan-50 border border-cyan-100/50 text-cyan-700 font-extrabold px-3 py-1 rounded-xl">
              {post.category}
            </span>
          </div>

          {/* Title & Body */}
          <div className="space-y-3">
            <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-snug">
              {post.title}
            </h1>
            <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            {/* Simulated file attachments */}
            {post.attachmentType === 'image' && (
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm max-h-96">
                <img 
                  src={post.attachmentUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"} 
                  alt="Attached content" 
                  className="w-full object-cover max-h-96" 
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            
            {post.attachmentType === 'video' && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100/60 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
                    <Play size={18} fill="white" />
                  </div>
                  <div>
                    <span className="font-bold block">Video Bài Giảng Đồng Bộ Đi Kèm</span>
                    <span className="text-amber-700/80">Nhấn mở trình xem thông minh từ máy chủ SmartLMS.</span>
                  </div>
                </div>
                <button 
                  onClick={() => { alert('Trình phát video đã mở ở máy chủ đào tạo!'); }} 
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Xem ngay
                </button>
              </div>
            )}

            {post.attachmentType === 'file' && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block text-xs">tai-lieu-on-tap-dat-chuan.docx</span>
                    <span className="text-slate-400">Dung lượng file: 2.1 MB</span>
                  </div>
                </div>
                <button 
                  onClick={() => showToast('Bắt đầu tải file tài liệu đính kèm thành công!')}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1"
                >
                  <Download size={13} /> Tải file
                </button>
              </div>
            )}
          </div>

          {/* Social Feedback Bar */}
          <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-4">
            <div className="flex gap-4">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                  post.likedByUser ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Heart size={16} className={post.likedByUser ? 'fill-rose-500 text-rose-500' : ''} />
                <span>{post.likes} lượt thích</span>
              </button>
              
              <button 
                onClick={triggerLmsAiHelper}
                disabled={aiAnalyzing}
                className="flex items-center gap-1.5 text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-all cursor-pointer"
              >
                <Sparkles size={14} className={aiAnalyzing ? 'animate-spin' : ''} />
                <span>{aiAnalyzing ? 'Trợ lý AI đang giải mã...' : 'Trợ lý học thuật AI'}</span>
              </button>
            </div>

            <span className="text-slate-400 text-xs font-semibold">
              Tổng {post.commentsCount} phản hồi từ cộng đồng
            </span>
          </div>

          {/* AI Advisor Panel display */}
          <AnimatePresence>
            {aiResponse && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-indigo-950 text-indigo-100 border border-indigo-900 rounded-2xl p-5 text-xs space-y-2 relative shadow-lg"
              >
                <h4 className="font-bold flex items-center gap-2 text-indigo-300">
                  <Sparkles size={14} className="animate-spin text-indigo-400" />
                  Mẫu sơ đồ kiến nghị thông minh từ SmartLMS AI Trợ giúp
                </h4>
                <p className="whitespace-pre-wrap leading-relaxed">{aiResponse}</p>
                <button 
                  onClick={() => setAiResponse(null)} 
                  className="absolute top-4 right-4 text-indigo-400 hover:text-white font-bold"
                >
                  Hủy xem
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comment Stream Area */}
          <div className="border-t border-slate-150 pt-5 space-y-4">
            <h3 className="font-black text-slate-800 text-sm">Bình luận từ học viên & Thầy cô</h3>
            
            {post.comments.length > 0 ? (
              <div className="space-y-3">
                {post.comments.map(c => (
                  <div key={c.id} className="p-4 bg-slate-50/50 hover:bg-slate-50 transition-all rounded-2xl border border-slate-100 flex gap-3 text-xs">
                    <div 
                      onClick={() => onSelectItem?.('member', c.authorName)}
                      className="w-8.5 h-8.5 rounded-lg overflow-hidden bg-slate-200 shrink-0 cursor-pointer hover:ring-2 hover:ring-cyan-500 transition-all"
                      title={`Xem hồ sơ của ${c.authorName}`}
                    >
                      <img src={c.authorAvatar} alt="Comment writer" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span 
                          onClick={() => onSelectItem?.('member', c.authorName)}
                          className="font-extrabold text-slate-700 cursor-pointer hover:text-cyan-600 hover:underline transition-colors"
                          title={`Xem hồ sơ của ${c.authorName}`}
                        >
                          {c.authorName}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-50 border border-cyan-100 text-cyan-700">
                          {c.authorRole}
                        </span>
                        <span className="text-slate-400 font-medium">
                          {new Date(c.createdAt).toLocaleDateString('vi')}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-semibold">{c.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-slate-50 text-center text-slate-400 text-xs font-semibold rounded-2xl">
                Chưa có ý kiến phản hồi nào. Hãy là người đầu tiên nêu thắc mắc hoặc đề xuất giải pháp!
              </div>
            )}

            {/* Post reply box */}
            <form onSubmit={handleAddComment} className="flex gap-2 items-center pt-2">
              <input 
                type="text"
                required
                placeholder="Nêu cảm nghĩ học tập của bạn ở đây để kiếm điểm đóng góp..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-100 transition-all font-semibold"
              />
              <button 
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-xl transition-all shadow shrink-0 active:scale-95 cursor-pointer"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
}

function ResourceDetailView({
  id,
  onBack,
  currentUser,
  resources,
  setResources,
  showToast,
  onSelectItem
}: DetailViewHubProps & { id: string }) {
  const res = resources.find(r => r.id === id);
  if (!res) return <div className="p-6 bg-white ...">Không tìm thấy tài nguyên.</div>;

  const [userRating, setUserRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [ratingsList, setRatingsList] = useState([
    { name: 'Nguyễn Tiến Đạt', rating: 5, comment: 'Sách biên thảo rất chi tiết, hình minh họa trực quan.' },
    { name: 'Phùng Bảo Ngọc', rating: 4, comment: 'Clean Architecture áp dụng EF Core chạy siêu mượt ạ.' }
  ]);

    const handleRatingSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!reviewText.trim()) return;
      setRatingsList([{ name: currentUser.name, rating: userRating, comment: reviewText }, ...ratingsList]);
      setReviewText('');
      showToast('Đóng góp nhận xét giáo trình khóa học thành công!');
    };

    const handleLike = () => {
      setResources(prev => prev.map(r => {
        if (r.id === res.id) {
          return {
            ...r,
            likes: r.likedByUser ? r.likes - 1 : r.likes + 1,
            likedByUser: !r.likedByUser
          };
        }
        return r;
      }));
    };

    const handleDownload = () => {
      setResources(prev => prev.map(r => {
        if (r.id === res.id) {
          return { ...r, downloadCount: r.downloadCount + 1 };
        }
        return r;
      }));
      showToast(`Bắt đầu tải tệp "${res.title}" (${res.fileSize}) thành công!`);
    };

    // Fake textbook pages containing actual clean csharp content
    const textbookPages: Record<number, { subtitle: string; code: string; text: string }> = {
      1: {
        subtitle: "Chương I: Nguyên lý Solid & Clean Architecture Tổng Quan",
        code: `// Define Domain Entity inside Core Layer
public class StudentCourse : BaseEntity {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal GPA { get; set; }
}`,
        text: "Clean Architecture chia ứng dụng thành các vòng tròn đồng tâm. Tầng Domain (Core) nằm ở lõi trung tâm của hệ thống và không phụ thuộc vào bất kỳ thư viện bên ngoài hay cơ sở dữ liệu nào. Mọi dòng dữ liệu phải hướng vào trong."
      },
      2: {
        subtitle: "Chương II: Repository Pattern & Dependency Injection",
        code: `// Infrastructure Persistence Layer Implementation
public class StudentRepository : IStudentRepository {
    private readonly ApplicationDbContext _context;
    
    public StudentRepository(ApplicationDbContext context) {
        _context = context;
    }
    
    public async Task<Student> GetByIdAsync(Guid id) {
        return await _context.Students.FindAsync(id);
    }
}`,
        text: "Mẫu Repository cô lập mã nguồn truy xuất dữ liệu thực tế khỏi mã logic vận hành nghiệp vụ. Điều này giúp dễ dàng viết Unit Test bằng cách sử dụng Mock mà không cần cơ sở dữ liệu vật lý chạy thật."
      },
      3: {
        subtitle: "Chương III: Tối ưu hóa truy vấn nâng cao với EF Core",
        code: `// Query Tuning sample
public async Task<List<Student>> GetTopStudentsAsync() {
    return await _context.Students
        .AsNoTracking() // Không lưu trạng thái theo dõi -> Tăng tốc độ RAM
        .Where(s => s.GPA >= 3.6)
        .OrderByDescending(s => s.GPA)
        .ToListAsync();
}`,
        text: "Sử dụng AsNoTracking() giúp Entity Framework Core bỏ qua việc tạo bản đồ lịch sử thay đổi của đối tượng, giảm thiểu đáng kể dung lượng bộ nhớ tạm sử dụng cho các luồng truy vấn chỉ đọc (Read-only)."
      }
    };

    return (
      <div className="space-y-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-100 cursor-pointer"
        >
          <ArrowLeft size={14} /> Trở về Kho Tài Nguyên
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-6"
        >
          {/* Main Info */}
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-slate-100 pb-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-16 bg-cyan-600 text-white rounded-2xl flex flex-col items-center justify-center font-extrabold text-[12px] shadow-lg shrink-0">
                <BookOpen size={24} className="mb-0.5" />
                <span className="text-[10px] uppercase">{res.fileType}</span>
              </div>
              <div>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {res.subject}
                </span>
                <h1 className="text-lg md:text-xl font-black text-slate-805 mt-1.5 leading-snug">
                  {res.title}
                </h1>
                <p className="text-slate-500 text-xs font-semibold mt-1">
                  Đăng bởi{" "}
                  <span 
                    onClick={() => onSelectItem?.('member', res.authorName)}
                    className="text-cyan-600 hover:text-cyan-700 font-extrabold hover:underline cursor-pointer transition-colors"
                    title={`Xem hồ sơ của ${res.authorName}`}
                  >
                    {res.authorName}
                  </span>{" "}
                  ({res.authorRole}) &#183; Dung lượng: {res.fileSize}
                </p>
              </div>
            </div>

            <button 
              onClick={handleDownload}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <Download size={15} />
              Tải về ({res.downloadCount} lượt)
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-800 text-sm">Mô tả giáo trình / tài liệu:</h3>
            <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100/60 font-medium">
              {res.description}
            </p>
          </div>

          {/* CURRICULUM TEXTBOOK PAGE PREVIEWER WIDGET */}
          <div className="border border-slate-150 rounded-3xl overflow-hidden bg-slate-950 text-slate-100">
            {/* Top preview control bar */}
            <div className="bg-slate-900 px-5 py-3 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-slate-300 font-mono font-bold">SmartLMS Giáo trình Trực tuyến (Xem mẫu 3 chương mẫu)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold select-none">
                <button 
                  onClick={() => setPageNumber(p => Math.max(1, p - 1))} 
                  disabled={pageNumber === 1}
                  className="px-2.5 py-1 bg-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-700"
                >
                  Trước
                </button>
                <span className="text-cyan-400 font-mono">Chương {pageNumber} / 3</span>
                <button 
                  onClick={() => setPageNumber(p => Math.min(3, p + 1))} 
                  disabled={pageNumber === 3}
                  className="px-2.5 py-1 bg-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-700"
                >
                  Tiếp
                </button>
              </div>
            </div>

            {/* Display textbook sample page content */}
            <div className="p-6 space-y-4">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide border-b border-slate-800 pb-1">
                {textbookPages[pageNumber].subtitle}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                {textbookPages[pageNumber].text}
              </p>
              
              <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 p-4 relative">
                <span className="absolute top-2 right-4 text-[9px] font-mono text-slate-500 font-bold">C# RESOURCE CODE</span>
                <pre className="text-xs text-teal-400 font-mono overflow-x-auto leading-relaxed">
                  <code>{textbookPages[pageNumber].code}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Likes & Feedback form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-150">
            {/* Reviews stream */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-slate-850 text-sm">Học viên nhận xét:</h4>
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-xl transition-all ${
                    res.likedByUser ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'text-slate-500 bg-slate-50'
                  }`}
                >
                  <ThumbsUp size={13} className={res.likedByUser ? 'fill-rose-500 text-rose-500' : ''} />
                  <span>Thích ({res.likes})</span>
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {ratingsList.map((rate, ind) => (
                  <div key={ind} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span 
                        onClick={() => onSelectItem?.('member', rate.name)}
                        className="font-black text-slate-705 hover:text-cyan-600 hover:underline cursor-pointer transition-colors"
                        title={`Xem hồ sơ của ${rate.name}`}
                      >
                        {rate.name}
                      </span>
                      <div className="flex text-amber-500">
                        {Array.from({ length: rate.rating }).map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-550 font-medium">{rate.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave ratings */}
            <form onSubmit={handleRatingSubmit} className="space-y-3 bg-slate-50/50 p-5 rounded-3xl border border-slate-100 text-xs">
              <h4 className="font-extrabold text-slate-850 text-sm">Gửi đánh giá chấm sao:</h4>
              
              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">Chọn số sao vinh danh chất lượng:</label>
                <div className="flex gap-1.5 cursor-pointer">
                  {[1, 2, 3, 4, 5].map(starIdx => (
                    <button
                      key={starIdx}
                      type="button"
                      onClick={() => setUserRating(starIdx)}
                      className="transition-all hover:scale-110"
                    >
                      <Star 
                        size={20} 
                        className={starIdx <= userRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">Lời nhận xét học thuật:</label>
                <textarea
                  required
                  placeholder="Giáo trình này giúp bạn hiểu gì về C# và .NET? Viết đánh giá..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-150 p-3 rounded-xl text-xs placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 resize-none font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold rounded-xl shadow cursor-pointer transition-all active:scale-95 text-xs text-center border-none"
              >
                Gửi bài Đánh giá giáo trình
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
}

function EventDetailView({
  id,
  onBack,
  currentUser,
  events,
  setEvents,
  showToast,
  onSelectItem
}: DetailViewHubProps & { id: string }) {
  const evt = events.find(e => e.id === id);
  if (!evt) return <div className="p-6 bg-white ...">Không tìm thấy sự kiện.</div>;

  const [preEventQuestion, setPreEventQuestion] = useState('');
  const [speakerQuestions, setSpeakerQuestions] = useState([
    { name: 'Nguyễn Tiến Trung', content: 'Thưa anh, kỹ sư .NET khi làm việc sâu về AI cần có kĩ thuật xử lý GPU không ạ?' },
    { name: 'Lê Thu Thủy', content: 'Buổi webinar có phân phối lại slide bài giảng sau khi kết thúc không ạ?' }
  ]);

    const handlePreEventPromptSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!preEventQuestion.trim()) return;
      setSpeakerQuestions([...speakerQuestions, { name: currentUser.name, content: preEventQuestion }]);
      setPreEventQuestion('');
      showToast('Gửi câu hỏi trước cho diễn giả thành công! Diễn giả sẽ giải đáp trực tiếp.');
    };

    const handleRegisterToggle = () => {
      setEvents(prev => prev.map(e => {
        if (e.id === evt.id) {
          const reg = e.registeredByUser;
          return {
            ...e,
            registeredCount: reg ? e.registeredCount - 1 : e.registeredCount + 1,
            registeredByUser: !reg
          };
        }
        return e;
      }));
      showToast(evt.registeredByUser ? 'Đã hủy đăng ký sự kiện thành công.' : 'Quý khách đã đăng ký thành công! Hãy tải Vé tham gia.');
    };

    return (
      <div className="space-y-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-100 cursor-pointer"
        >
          <ArrowLeft size={14} /> Trở về Danh sách Sự kiện
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md"
        >
          {/* Top banner styling based on category */}
          <div className={`p-6 md:p-8 text-white relative ${
            evt.category === 'webinar' ? 'bg-gradient-to-r from-purple-750 via-purple-600 to-indigo-650' :
            evt.category === 'workshop' ? 'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700' :
            'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600'
          }`}>
            <span className="bg-white/15 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
              Chuyên đề: {evt.category.toUpperCase().replace('_', ' ')}
            </span>
            <h1 className="text-xl md:text-2xl font-black tracking-tight mt-4 leading-snug">
              {evt.title}
            </h1>
            <p className="text-white/85 text-xs font-medium mt-2 leading-relaxed max-w-3xl">
              {evt.description}
            </p>

            {/* Event dynamic timing ticker banner */}
            <div className="flex gap-4 items-center bg-black/15 p-4 rounded-2xl border border-white/5 text-xs text-white mt-6 w-max max-w-full">
              <div>
                <span className="block text-[10px] text-white/70 font-semibold">Trạng thái phát sóng:</span>
                <strong className="text-amber-300 flex items-center gap-1 mt-0.5">
                  <Star size={11} className="animate-spin text-amber-300" />
                  Chuẩn bị phát sóng qua Microsoft Teams
                </strong>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event specifications */}
              <div className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h3 className="font-black text-slate-800 text-sm flex items-center gap-1.5">
                  <Calendar size={16} className="text-cyan-600" /> Thông số chi tiết sự kiện
                </h3>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-slate-400" />
                    <span>Lịch trình: {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-slate-400" />
                    <span>Ngày diễn ra: {evt.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-slate-400" />
                    <span>Nền tảng host: <strong className="text-slate-800">{evt.platform}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-slate-400" />
                    <span>Chỗ đã kín: <strong className="text-cyan-600">{evt.registeredCount} học viên đăng ký</strong></span>
                  </div>
                </div>

                {/* RSVP control */}
                <div className="pt-2 border-t border-slate-150 flex gap-2">
                  <button
                    onClick={handleRegisterToggle}
                    className={`flex-1 font-extrabold text-xs py-3.5 rounded-2xl transition-all text-center cursor-pointer shadow-sm ${
                      evt.registeredByUser
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    }`}
                  >
                    {evt.registeredByUser ? '✓ Hủy đăng ký vé' : 'Đăng ký nhận vé mời tham gia'}
                  </button>
                </div>
              </div>

              {/* Speaker Profiles */}
              <div className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h3 className="font-black text-slate-805 text-sm">Thông tin Diễn giả chính (Host)</h3>
                <div 
                  onClick={() => onSelectItem?.('member', evt.speaker)}
                  className="flex gap-4 items-center cursor-pointer group/speaker"
                  title="Xem hồ sơ"
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm shrink-0 group-hover/speaker:ring-2 group-hover/speaker:ring-cyan-500 transition-all">
                    <img src={evt.speakerAvatar} alt={evt.speaker} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm leading-tight group-hover/speaker:text-cyan-600 transition-colors">{evt.speaker}</h4>
                    <p className="text-[11px] text-indigo-700 font-bold uppercase tracking-wider mt-1">Đại diện SmartLMS Expert</p>
                    <p className="text-[11px] text-slate-400 mt-1">Senior Software Architect, hơn 10 năm kinh nghiệm trong các dự án di trú mảng tài chính. <span className="text-[10px] text-cyan-500 font-extrabold opacity-0 group-hover/speaker:opacity-100 transition-opacity">Xem hồ sơ →</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* INTEGRATED EVENT TICKET PASS DRAWER */}
            <AnimatePresence>
              {evt.registeredByUser && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 rounded-3xl p-6 border-2 border-dashed border-cyan-500/30 font-semibold text-xs space-y-4 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Ticket Header styling */}
                  <div className="flex justify-between items-center bg-cyan-600/10 px-4 py-2.5 rounded-xl border border-cyan-500/20">
                    <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300">SmartLMS Official Event Ticket</span>
                    <span className="text-[10px] font-mono text-cyan-400">VE-INV: #{evt.id.toUpperCase()}-08</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 justify-between items-center bg-white/5 p-4 rounded-2xl">
                    <div className="space-y-2 text-center sm:text-left">
                      <p className="text-[11px] text-slate-400 uppercase tracking-widest leading-none font-bold">Attendee Profile</p>
                      <div className="flex items-center gap-3 justify-center sm:justify-start">
                        <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20">
                          <img src={currentUser.avatar} alt="User Avatar" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-100">{currentUser.name}</p>
                          <p className="text-[10px] text-slate-400">Quyền tham dự: {currentUser.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 bg-slate-800/80 p-3 rounded-xl border border-slate-705 text-center sm:text-right">
                      <p className="text-[10px] text-cyan-400 font-mono">XÁC MINH CỔNG VÀO</p>
                      <p className="text-[10px] font-mono text-slate-300">Teams Code: <span className="text-white font-bold">LMS-CONF-992</span></p>
                      <p className="text-[10px] font-black text-emerald-400">VE-STT: ACTIVE PASS</p>
                    </div>
                  </div>

                  {/* Simulated barcode layout for rich visual aesthetic */}
                  <div className="flex justify-between items-center border-t border-dashed border-slate-750 pt-4 flex-wrap gap-2 select-none">
                    <div className="font-mono text-[9px] text-slate-500 space-y-0.5">
                      <p>||||| | | |||| || |||||| | |||| | |||||</p>
                      <p>982739182739812739817293</p>
                    </div>
                    <button 
                      onClick={() => alert(`Vé mời của học viên ${currentUser.name} đã được xếp hàng in trong luồng máy chủ!`)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-black px-4 py-2 rounded-xl flex items-center gap-1.5"
                    >
                      <Printer size={13} />
                      Đồng bộ in PDF vé mời
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Q&A Interactive board for Event */}
            <div className="border-t border-slate-150 pt-6 space-y-4">
              <h3 className="font-black text-slate-800 text-sm flex items-center gap-1.5">
                <MessageSquare size={16} className="text-cyan-600 animate-pulse" />
                Thắc mắc gửi diễn giả trước chương trình:
              </h3>

              <div className="space-y-3">
                {speakerQuestions.map((q, qidx) => (
                  <div key={qidx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span 
                        onClick={() => onSelectItem?.('member', q.name)}
                        className="font-bold text-slate-700 cursor-pointer hover:text-cyan-600 hover:underline transition-colors"
                        title={`Xem hồ sơ của ${q.name}`}
                      >
                        {q.name}
                      </span>
                      <span className="text-[9px] bg-slate-200 text-slate-500 px-1 rounded">Đặt thắc mắc</span>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{q.content}</p>
                  </div>
                ))}
              </div>

              {/* Leave prompt */}
              <form onSubmit={handlePreEventPromptSubmit} className="flex gap-2 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Gửi câu hỏi trước cho diễn giả (Ví dụ: Em muốn hỏi về lộ trình liên thông...)"
                  value={preEventQuestion}
                  onChange={(e) => setPreEventQuestion(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 focus:border-cyan-500 p-3 rounded-xl outline-none placeholder-slate-405 font-semibold"
                />
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 text-xs font-bold shrink-0 cursor-pointer border-none"
                >
                  Gửi câu thắc mắc
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    );
}

function QuestionDetailView({
  id,
  onBack,
  currentUser,
  questions,
  setQuestions,
  showToast,
  onUpdateUserPoints,
  onSelectItem
}: DetailViewHubProps & { id: string }) {
  const q = questions.find(item => item.id === id);
  if (!q) return <div className="p-6 bg-white ...">Không tìm thấy câu hỏi này.</div>;

  const [answerText, setAnswerText] = useState('');

    const handleVoteQuestion = (dir: 'up' | 'down') => {
      setQuestions(prev => prev.map(item => {
        if (item.id === q.id) {
          let diff = dir === 'up' ? 1 : -1;
          if (item.votedByUser === dir) {
            diff = dir === 'up' ? -1 : 1;
            return { ...item, votes: item.votes + diff, votedByUser: undefined };
          }
          return { ...item, votes: item.votes + diff, votedByUser: dir };
        }
        return item;
      }));
    };

    const handleAcceptAnswer = (ansId: string) => {
      if (currentUser.role !== 'Instructor' && currentUser.role !== 'Mentor') {
        showToast('Chỉ Giảng viên hoặc Mentor mới có quyền Phê duyệt Giải pháp chính xác!');
        return;
      }

      setQuestions(prev => prev.map(item => {
        if (item.id === q.id) {
          const updatedAnswers = item.answers.map(ans => {
            if (ans.id === ansId) {
              const acceptedState = !ans.isAccepted;
              if (acceptedState) {
                // Grant points in real-time
                onUpdateUserPoints(50);
                setTimeout(() => {
                  showToast('🏅 Đã chốt đây là giải pháp tối ưu nhất! Thưởng ngay +50 điểm hỗ trợ học viên.');
                }, 300);
              }
              return { ...ans, isAccepted: acceptedState };
            }
            return { ...ans, isAccepted: false };
          });

          return {
            ...item,
            solved: updatedAnswers.some(ans => ans.isAccepted),
            answers: updatedAnswers
          };
        }
        return item;
      }));
    };

    const handleVoteAnswer = (ansId: string, dir: 'up' | 'down') => {
      setQuestions(prev => prev.map(item => {
        if (item.id === q.id) {
          const updatedAnswers = item.answers.map(ans => {
            if (ans.id === ansId) {
              const diff = dir === 'up' ? 1 : -1;
              return { ...ans, votes: ans.votes + diff };
            }
            return ans;
          });
          return { ...item, answers: updatedAnswers };
        }
        return item;
      }));
    };

    const handleCreateAnswerSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!answerText.trim()) return;

      const newAns: Answer = {
        id: `ans-${Date.now()}`,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        authorRole: currentUser.role,
        content: answerText,
        createdAt: new Date().toISOString(),
        votes: 0,
        isAccepted: false
      };

      setQuestions(prev => prev.map(item => {
        if (item.id === q.id) {
          return {
            ...item,
            answersCount: item.answersCount + 1,
            answers: [...item.answers, newAns]
          };
        }
        return item;
      }));
      setAnswerText('');
      showToast('Đăng câu trả lời kỹ thuật thành công!');
    };

    return (
      <div className="space-y-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-100 cursor-pointer"
        >
          <ArrowLeft size={14} /> Trở về danh mục Q&amp;A
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-6"
        >
          {/* Main Question grid Header */}
          <div className="flex gap-4 border-b border-slate-100 pb-5">
            {/* Voting sidebar */}
            <div className="flex flex-col items-center justify-center bg-slate-50 p-2 border border-slate-205/60 rounded-2xl w-12 hover:border-cyan-200 transition-all select-none">
              <button 
                onClick={() => handleVoteQuestion('up')}
                className={`p-1 hover:bg-slate-100 rounded transition-all ${q.votedByUser === 'up' ? 'text-cyan-600' : 'text-slate-400'}`}
              >
                <ChevronUp size={22} />
              </button>
              <span className="text-sm font-black text-slate-800 my-0.5">{q.votes}</span>
              <button 
                onClick={() => handleVoteQuestion('down')}
                className={`p-1 hover:bg-slate-100 rounded transition-all ${q.votedByUser === 'down' ? 'text-rose-600' : 'text-slate-400'}`}
              >
                <ChevronDown size={22} />
              </button>
            </div>

            {/* Content main */}
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start gap-2 flex-wrap text-xs text-slate-400">
                <div 
                  onClick={() => onSelectItem?.('member', q.authorName)}
                  className="flex items-center gap-2 cursor-pointer group/q-author"
                  title="Xem hồ sơ"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100 border border-slate-150 shrink-0 group-hover/q-author:ring-2 group-hover/q-author:ring-cyan-500 transition-all">
                    <img src={q.authorAvatar} alt="Author" />
                  </div>
                  <span className="font-extrabold text-slate-700 group-hover/q-author:text-cyan-600 group-hover/q-author:underline transition-colors">{q.authorName}</span>
                  <span className="bg-slate-100 text-slate-500 font-bold px-1.5 py-0.2 rounded border scale-95">{q.authorRole}</span>
                  <span>| Đăng cách đây {new Date(q.createdAt).toLocaleDateString('vi')}</span>
                </div>

                {q.solved ? (
                  <span className="bg-emerald-100 text-emerald-850 px-3 py-1 font-bold text-[10.5px] rounded-full border border-emerald-200 flex items-center gap-1.5 uppercase tracking-wide">
                    <CheckCircle size={12} className="text-emerald-600" /> Đã phân định lời giải tốt nhất
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 font-bold text-[10.5px] rounded-full border border-amber-200 flex items-center gap-1.5 uppercase tracking-wide">
                    Chờ vinh danh lời giải
                  </span>
                )}
              </div>

              <h1 className="text-lg md:text-xl font-black text-slate-850 tracking-tight leading-snug">
                {q.title}
              </h1>

              <div className="bg-slate-50 border border-slate-105 p-4 rounded-2xl text-slate-700 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {q.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {q.tags.map(t => (
                  <span key={t} className="bg-slate-100 text-slate-550 border border-slate-201/20 text-[10px] font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-0.5">
                    # {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions Stack */}
          <div className="space-y-4">
            <h3 className="font-black text-slate-800 text-sm flex items-center gap-1.5">
              <span>Danh sách lời giải đề xuất ({q.answersCount})</span>
            </h3>

            {q.answers.length > 0 ? (
              <div className="space-y-4">
                {q.answers.map(ans => (
                  <div 
                    key={ans.id}
                    className={`p-5 rounded-3xl border flex gap-4 transition-all ${
                      ans.isAccepted ? 'bg-emerald-50/20 border-emerald-200/80 shadow-md shadow-emerald-50' : 'bg-white border-slate-100'
                    }`}
                  >
                    {/* Vote answers list */}
                    <div className="flex flex-col items-center shrink-0">
                      <button 
                        onClick={() => handleVoteAnswer(ans.id, 'up')}
                        className="p-1 hover:bg-slate-100 text-slate-400 hover:text-cyan-600 rounded"
                      >
                        <ChevronUp size={18} />
                      </button>
                      <span className="text-xs font-mono font-black text-slate-700 my-0.5">{ans.votes}</span>
                      <button 
                        onClick={() => handleVoteAnswer(ans.id, 'down')}
                        className="p-1 hover:bg-slate-100 text-slate-400 hover:text-rose-600 rounded"
                      >
                        <ChevronDown size={18} />
                      </button>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
                        <div 
                          onClick={() => onSelectItem?.('member', ans.authorName)}
                          className="flex items-center gap-2 cursor-pointer group/ans-author"
                          title="Xem hồ sơ"
                        >
                          <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100 border shrink-0 group-hover/ans-author:ring-2 group-hover/ans-author:ring-cyan-500 transition-all">
                            <img src={ans.authorAvatar} alt="Responder" />
                          </div>
                          <span className="font-extrabold text-slate-800 group-hover/ans-author:text-cyan-600 group-hover/ans-author:underline transition-colors">{ans.authorName}</span>
                          <span className="bg-slate-100 text-[9px] font-bold text-slate-500 px-1.5 py-0.2 rounded border uppercase scale-95">
                            {ans.authorRole}
                          </span>
                        </div>

                        {/* Mark accepted layout */}
                        <div className="flex gap-2">
                          {ans.isAccepted && (
                            <span className="bg-emerald-600 text-white font-extrabold px-3 py-1 text-[9px] rounded-full uppercase tracking-widest flex items-center gap-1 select-none">
                              <CheckCircle size={10} /> ĐÃ DUYỆT ĐÁP ÁN ĐÚNG
                            </span>
                          )}

                          {/* Instructor action panel */}
                          {(currentUser.role === 'Instructor' || currentUser.role === 'Mentor') && (
                            <button
                              onClick={() => handleAcceptAnswer(ans.id)}
                              className={`text-[9.5px] font-black px-3 py-1 rounded-xl uppercase tracking-wider transition-all border ${
                                ans.isAccepted
                                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-sm'
                              }`}
                            >
                              {ans.isAccepted ? 'Hủy chốt giải pháp' : '✓ Duyệt Đáp Án này!'}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-750">
                        {ans.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-slate-50 text-center text-slate-400 text-xs font-semibold rounded-2xl">
                Chưa có đề xuất giải bài nào. Viết câu trả lời của bạn ở dưới đây để được thầy cô phê duyệt và cộng Virtual LMS point nhé!
              </div>
            )}

            {/* Create answer */}
            <form onSubmit={handleCreateAnswerSubmit} className="space-y-2.5 bg-slate-50 p-5 rounded-3xl border border-slate-120">
              <h4 className="font-black text-slate-800 text-xs flex items-center gap-1">
                <Code size={14} className="text-cyan-600 animate-pulse" />
                Viết mã lệnh hoặc lời giải đề xuất của bạn:
              </h4>
              <textarea
                required
                placeholder="Nhập hướng dẫn fix lỗi kèm mã code C# nâng cao của bạn tại đây..."
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                rows={4}
                className="w-full bg-white border border-slate-205 focus:border-cyan-500 p-4 rounded-xl text-xs font-mono placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-100 resize-none font-semibold shadow-xs"
              />
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs px-6 py-3 rounded-2xl transition-all shadow active:scale-95 cursor-pointer flex items-center gap-1.5 ml-auto text-right mb-1 border-none"
              >
                <Code size={13} /> Đăng tải lời giải học thuật [Submit]
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
}

function GroupDetailView({
  id,
  onBack,
  currentUser,
  groups,
  setGroups,
  showToast,
  onSelectItem
}: DetailViewHubProps & { id: string }) {
  const grp = groups.find(g => g.id === id);
  if (!grp) return <div className="p-6 bg-white ...">Không tìm thấy nhóm học.</div>;

  const [groupNotes, setGroupNotes] = useState(
    `📝 Sổ ghi chú học nhóm - ${grp.name}\n` +
    `---------------------------------------\n` +
    `* Buổi học sắp tới chúng ta sẽ tập trung vào Chương 'Clean Architecture'.\n` +
    `* Bạn Hoài Nam: Chuẩn bị slide thuyết trình về DI Container.\n` +
    `* Các bạn khác: Hãy thử giải bài toán Tracking Behavior ở chuyên mục Q&A.`
  );

  const [chatMsgText, setChatMsgText] = useState('');
  const [groupChatLogs, setGroupChatLogs] = useState([
    { name: 'Phan Bảo Nam', content: 'Chào cả nhà, tối mai 20:00 chúng ta họp nhóm nhé.' },
    { name: 'Vũ Thùy Linh', content: 'Mình đã xem qua giáo trình Clean Architecture thầy Lâm phát, hay lắm!' }
  ]);

  // Phase 3 Kanban Board State
  const [groupTab, setGroupTab] = useState<'study' | 'kanban'>('study');
  const [kanbanTasks, setKanbanTasks] = useState([
    { id: 't-1', title: 'Thiết kế cơ sở dữ liệu SQL Server cho Module Thanh Toán', assignee: 'Phan Bảo Nam', column: 'todo' },
    { id: 't-2', title: 'Viết tài liệu Swagger API & Refactor Controllers', assignee: 'Vũ Thùy Linh', column: 'progress' },
    { id: 't-3', title: 'Tối ưu LINQ Entity Queries (Eager Loading)', assignee: 'Tôi (Học viên)', column: 'review' },
    { id: 't-4', title: 'Khởi tạo cấu trúc Clean Architecture & Dockerfile', assignee: 'Hoài Nam', column: 'done' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Tôi (Học viên)');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMsgText.trim()) return;
    setGroupChatLogs([...groupChatLogs, { name: currentUser.name, content: chatMsgText }]);
    setChatMsgText('');
  };

  const handleNotesSave = () => {
    showToast('📄 Đã tự động lưu lại văn bản bảng ghi chú học tập chung của nhóm!');
  };

  const handleJoinLeave = () => {
    setGroups(prev => prev.map(g => {
      if (g.id === grp.id) {
        const joined = g.joinedByUser;
        return {
          ...g,
          memberCount: joined ? g.memberCount - 1 : g.memberCount + 1,
          joinedByUser: !joined
        };
      }
      return g;
    }));
    showToast(grp.joinedByUser ? 'Đã rời khỏi phòng tự học học phần.' : 'Gia nhập phòng Workspace học nhóm thành công! Bắt đầu học bài cùng các bạn.');
  };

  // KANBAN ACTIONS
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      assignee: newTaskAssignee,
      column: 'todo' as const
    };
    setKanbanTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    showToast(`📊 Đã thêm mục tiêu công việc: "${newTask.title}" vào hàng chờ!`);
  };

  const handleMoveTaskColumn = (id: string, dir: 'left' | 'right') => {
    const columnsOrder = ['todo', 'progress', 'review', 'done'] as const;
    setKanbanTasks(prev => prev.map(tsk => {
      if (tsk.id === id) {
        const curIdx = columnsOrder.indexOf(tsk.column);
        let nextIdx = curIdx + (dir === 'right' ? 1 : -1);
        if (nextIdx >= 0 && nextIdx < columnsOrder.length) {
          const nextCol = columnsOrder[nextIdx];
          
          if (nextCol === 'done') {
            showToast('🥇 Tuyệt vời! Bạn hoàn thành một đầu việc của nhóm. Học tập cần mẫn nhận được +20 XP!');
            // Points update trigger
            if (currentUser && typeof (window as any)._onGlobalPointsUpdate === 'function') {
              (window as any)._onGlobalPointsUpdate(20);
            }
          }
          return { ...tsk, column: nextCol };
        }
      }
      return tsk;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setKanbanTasks(prev => prev.filter(t => t.id !== id));
    showToast('🗑️ Đã xóa nhiệm vụ học nhóm.');
  };

  const completedCount = kanbanTasks.filter(t => t.column === 'done').length;
  const completionPercentage = kanbanTasks.length > 0 
    ? Math.round((completedCount / kanbanTasks.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-100 cursor-pointer"
      >
        <ArrowLeft size={14} /> Trở về Danh sách Nhóm Học
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-6"
      >
        {/* Group Header */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-slate-100 pb-5">
          <div>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
              Chuyên ngành học: {grp.subject}
            </span>
            <h1 className="text-lg md:text-xl font-black text-slate-850 tracking-tight mt-1.5 leading-snug">
              {grp.name}
            </h1>
            <p className="text-slate-405 text-xs font-semibold mt-1">
              Chủ phòng:{" "}
              <span 
                onClick={() => onSelectItem?.('member', grp.creatorName)}
                className="text-cyan-600 hover:text-cyan-700 font-extrabold hover:underline cursor-pointer transition-colors"
                title={`Xem hồ sơ của ${grp.creatorName}`}
              >
                {grp.creatorName}
              </span>{" "}
              &#183; Roster: {grp.memberCount} / {grp.maxMembers} thành viên
            </p>
          </div>

          <button
            onClick={handleJoinLeave}
            className={`text-xs font-extrabold px-6 py-3 rounded-2xl transition-all shadow-sm shrink-0 cursor-pointer ${
              grp.joinedByUser
                ? 'bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            }`}
          >
            {grp.joinedByUser ? 'Rời khỏi phòng học' : 'Gia nhập Workspace'}
          </button>
        </div>

        <div className="space-y-3">
          <h4 className="font-extrabold text-slate-800 text-sm">Chỉ tiêu định hướng & nội quy nhóm:</h4>
          <p className="text-slate-605 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100/60 font-medium">
            {grp.description}
          </p>
        </div>

        {/* STUDY ROOM / KANBAN SWITCH TABS (Phase 3) */}
        <div className="flex border-b border-slate-100 pb-2 gap-3 select-none">
          <button
            onClick={() => setGroupTab('study')}
            className={`pb-2.5 text-xs md:text-sm font-bold transition-all relative cursor-pointer ${
              groupTab === 'study' ? 'text-cyan-600 font-black border-b-2 border-cyan-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            📖 Phòng Tự Học, Chat & Scribble
          </button>
          <button
            onClick={() => {
              if (!grp.joinedByUser) {
                showToast('⚠️ Vui lòng gia nhập workspace nhóm học này trước khi xem Kanban Board.');
                return;
              }
              setGroupTab('kanban');
            }}
            className={`pb-2.5 text-xs md:text-sm font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
              groupTab === 'kanban' ? 'text-cyan-600 font-black border-b-2 border-cyan-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            📊 Bảng Công Việc Kanban ({kanbanTasks.filter(t => t.column !== 'done').length} Tasks)
            <span className="bg-cyan-100 text-cyan-700 font-extrabold text-[9px] px-1.5 py-0.5 rounded-full select-none">Live</span>
          </button>
        </div>

        {/* TAB WORKSPACE RENDERS */}
        {groupTab === 'study' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            
            {/* COLUMN 1: INTERACTIVE WHITEBOARD NOTEPAD */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 text-slate-100 flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-[11px] font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                  Bản vẽ / Bảng ghi chép thảo luận chung (Scribble)
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sync State: Live</span>
              </div>

              <textarea
                disabled={!grp.joinedByUser}
                value={groupNotes}
                onChange={(e) => setGroupNotes(e.target.value)}
                rows={10}
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs font-mono text-teal-300 placeholder-slate-500 outline-none focus:ring-2 focus:ring-cyan-500 resize-none leading-relaxed"
                placeholder="Gia nhập nhóm để cùng ghi bài học tại đây..."
              />

              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-mono">Ý kiến ghi chú tự động lưu lại ở RAM của Hub.</span>
                <button
                  disabled={!grp.joinedByUser}
                  onClick={handleNotesSave}
                  className="bg-slate-800 text-slate-300 px-4 py-2 hover:bg-slate-700 text-xs font-black rounded-xl cursor-pointer disabled:opacity-30"
                >
                  Sao lưu nội dung
                </button>
              </div>
            </div>

            {/* COLUMN 2: LIVE DIALOG GROUP CHATTER */}
            <div className="bg-slate-50 border border-slate-150 rounded-3xl p-5 flex flex-col justify-between h-[360px]">
              <div className="pb-3 border-b border-slate-150 text-xs font-black text-slate-800">
                Kênh hội thoại trực tuyến (Chat)
              </div>

              {/* Chat frame */}
              <div className="flex-1 overflow-y-auto py-3 space-y-2.5 max-h-[220px]">
                {groupChatLogs.map((chat, idx) => (
                  <div key={idx} className="text-xs space-y-0.5">
                    <span 
                      onClick={() => onSelectItem?.('member', chat.name)}
                      className="font-extrabold text-slate-700 hover:text-cyan-600 hover:underline cursor-pointer transition-colors inline-block"
                      title={`Xem hồ sơ của ${chat.name}`}
                    >
                      {chat.name}:
                    </span>
                    <span className="inline-block bg-white border border-slate-200 px-3 py-1.5 rounded-xl font-semibold text-slate-650 max-w-[90%]">
                      {chat.content}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat input form */}
              <form onSubmit={handleSendMessage} className="flex gap-1 border-t border-slate-150 pt-3">
                <input
                  type="text"
                  disabled={!grp.joinedByUser}
                  required
                  placeholder={grp.joinedByUser ? "Nhập thông điệp trao đổi bài tập..." : "Vui lòng gia nhập để nhắn tin..."}
                  value={chatMsgText}
                  onChange={(e) => setChatMsgText(e.target.value)}
                  className="flex-1 bg-white text-xs px-3 py-2.5 rounded-xl border border-slate-205 outline-none focus:ring-1 focus:ring-cyan-500 font-semibold disabled:opacity-40"
                />
                <button
                  type="submit"
                  disabled={!grp.joinedByUser}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-30 text-white p-2.5 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer border-none"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>

          </div>
        ) : (
          /* KANBAN BOARD SYSTEM WORKSPACE */
          <div className="space-y-6 pt-2">
            
            {/* Overall Progress indicator */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-lg">
                  🏆
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800">Tiến độ bài tập lớn của Nhóm</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Hoàn thành các nhiệm vụ dưới đây để nhận giải thưởng XP chung</p>
                </div>
              </div>

              <div className="w-full sm:w-48 flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-600 transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-extrabold text-slate-800">{completionPercentage}%</span>
              </div>
            </div>

            {/* Drag & Cycle Kanban Rows */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* COLUMN 1: TODO */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-3 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-black text-slate-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    HÀNG CHỜ (TODO)
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded-md">
                    {kanbanTasks.filter(t => t.column === 'todo').length}
                  </span>
                </div>
                <div className="space-y-2.5 min-h-[150px]">
                  {kanbanTasks.filter(t => t.column === 'todo').map(task => (
                    <div key={task.id} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs space-y-1.5 relative group">
                      <p className="text-[11.5px] font-bold text-slate-800 leading-snug">{task.title}</p>
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold">
                        <span>👤 {task.assignee}</span>
                        <div className="flex gap-1">
                          <button onClick={() => handleDeleteTask(task.id)} className="text-rose-500 hover:text-rose-700 cursor-pointer">Xóa</button>
                          <button onClick={() => handleMoveTaskColumn(task.id, 'right')} className="text-cyan-600 hover:text-cyan-700 font-black cursor-pointer bg-cyan-50 px-1 rounded">Tiếp &rarr;</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2: IN PROGRESS */}
              <div className="bg-blue-50/20 border border-blue-100/55 rounded-2xl p-3 space-y-3">
                <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                  <span className="text-[10px] font-black text-blue-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    ĐANG LÀM (WORKING)
                  </span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded-md">
                    {kanbanTasks.filter(t => t.column === 'progress').length}
                  </span>
                </div>
                <div className="space-y-2.5 min-h-[150px]">
                  {kanbanTasks.filter(t => t.column === 'progress').map(task => (
                    <div key={task.id} className="p-3 bg-white border border-blue-50/60 rounded-xl shadow-xs space-y-1.5 relative">
                      <p className="text-[11.5px] font-bold text-slate-800 leading-snug">{task.title}</p>
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold">
                        <span>👤 {task.assignee}</span>
                        <div className="flex gap-1.5">
                          <button onClick={() => handleMoveTaskColumn(task.id, 'left')} className="text-slate-500 hover:text-slate-700 cursor-pointer">&larr; Lùi</button>
                          <button onClick={() => handleMoveTaskColumn(task.id, 'right')} className="text-cyan-600 hover:text-cyan-700 font-black cursor-pointer bg-cyan-50 px-1 rounded">Tiếp &rarr;</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3: REVIEW */}
              <div className="bg-amber-50/20 border border-amber-100/55 rounded-2xl p-3 space-y-3">
                <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                  <span className="text-[10px] font-black text-amber-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    KIỂM ĐỊNH (REVIEW)
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded-md">
                    {kanbanTasks.filter(t => t.column === 'review').length}
                  </span>
                </div>
                <div className="space-y-2.5 min-h-[150px]">
                  {kanbanTasks.filter(t => t.column === 'review').map(task => (
                    <div key={task.id} className="p-3 bg-white border border-amber-50/50 rounded-xl shadow-xs space-y-1.5 relative">
                      <p className="text-[11.5px] font-bold text-slate-800 leading-snug">{task.title}</p>
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold">
                        <span>👤 {task.assignee}</span>
                        <div className="flex gap-1.5">
                          <button onClick={() => handleMoveTaskColumn(task.id, 'left')} className="text-slate-500 hover:text-slate-700 cursor-pointer">&larr; Lùi</button>
                          <button onClick={() => handleMoveTaskColumn(task.id, 'right')} className="text-emerald-700 hover:text-emerald-800 font-black cursor-pointer bg-emerald-50 px-1.5 rounded">Xong ✓</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 4: DONE */}
              <div className="bg-emerald-50/20 border border-emerald-100/55 rounded-2xl p-3 space-y-3">
                <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                  <span className="text-[10px] font-black text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    HOÀN THÀNH (DONE)
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded-md">
                    {kanbanTasks.filter(t => t.column === 'done').length}
                  </span>
                </div>
                <div className="space-y-2.5 min-h-[150px]">
                  {kanbanTasks.filter(t => t.column === 'done').map(task => (
                    <div key={task.id} className="p-3 bg-white border border-emerald-50/30 rounded-xl shadow-xs space-y-1.5 relative">
                      <p className="text-[11.5px] font-bold text-slate-505 line-through">{task.title}</p>
                      <div className="flex justify-between items-center text-[9px] text-emerald-600 font-bold">
                        <span>👤 {task.assignee}</span>
                        <button onClick={() => handleMoveTaskColumn(task.id, 'left')} className="text-slate-400 hover:text-slate-600 cursor-pointer">Làm lại</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick addition task form */}
            <form onSubmit={handleAddTask} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col md:flex-row gap-3 items-end">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] text-slate-400 font-extrabold uppercase">Thêm đầu việc mới học nhóm:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Thiết kế file .env & viết Unit Test cho Auth..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-cyan-500 outline-none"
                />
              </div>

              <div className="w-full md:w-48 space-y-1">
                <label className="text-[10px] text-slate-400 font-extrabold uppercase font-sans">Giao phó cho:</label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="Tôi (Học viên)">Tôi (Học viên)</option>
                  <option value="Phan Bảo Nam">Phan Bảo Nam</option>
                  <option value="Vũ Thùy Linh">Vũ Thùy Linh</option>
                  <option value="Hoài Nam">Hoài Nam</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 border-none text-white text-xs font-black rounded-xl cursor-pointer shadow transition-all shrink-0 w-full md:w-auto text-center"
              >
                Giao việc
              </button>
            </form>
          </div>
        )}

      </motion.div>
    </div>
  );
}

function MemberDetailView({
  id,
  onBack,
  currentUser,
  showToast,
  onSelectItem
}: DetailViewHubProps & { id: string }) {
    // Look up in leaderboard catalog
    // Or mock up
    const memberName = id.replace(/-/g, ' ');
    const membersList = [
      { name: 'Nguyễn Văn Đạt', role: 'Student' as UserRole, points: 2840, studyHours: 94, major: '.NET Development Advanced', badges: ['🥇 DSA Master', '💡 Top Contributor', '📅 Daily Streak'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dat', weeklyGain: 340 },
      { name: 'Thầy Phạm Đức Minh', role: 'Instructor' as UserRole, points: 2510, studyHours: 215, major: 'Giảng viên Bộ môn Khoa Công nghệ thông tin', badges: ['🏫 Helpful Professor', '📖 Author'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DucMinh', weeklyGain: 120 },
      { name: 'Lê Minh Khôi', role: 'Student' as UserRole, points: 1980, studyHours: 80, major: 'Hệ thống Thông tin Doanh nghiệp', badges: ['⚡ Bug Hunter', '🗣️ Moderator'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khoi', weeklyGain: 280 },
      { name: 'Đặng Tuấn Kiệt', role: 'Student' as UserRole, points: 1650, studyHours: 72, major: 'Khoa Toán tin học', badges: ['🔥 LeetCoder', '📚 Constant Scholar'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiet', weeklyGain: 190 },
      { name: 'Nguyễn Thị Minh', role: 'Mentor' as UserRole, points: 1420, studyHours: 110, major: 'Trợ giảng Cố vấn Lớp C#', badges: ['🌟 Elite Mentor'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh', weeklyGain: 90 },
      { name: 'Phùng Bảo Ngọc', role: 'Student' as UserRole, points: 1210, studyHours: 64, major: 'Thiết kế Đồ họa mỹ thuật số', badges: ['🎨 Creative Mind'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngoc', weeklyGain: 150 },
      { name: 'Vũ Thùy Linh', role: 'Student' as UserRole, points: 1180, studyHours: 61, major: 'Kỹ sư Phần mềm an toàn thông tin', badges: ['🚀 Organizer'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linh', weeklyGain: 210 }
    ];

    const foundMember = membersList.find(m => m.name.toLowerCase() === id.toLowerCase()) || membersList[0];
    const [memberState, setMemberState] = useState(foundMember);
    const [dmText, setDmText] = useState('');
    const [dmLog, setDmLog] = useState<string[]>([]);

    useEffect(() => {
      setMemberState(foundMember);
    }, [id]);

    const handleSendDm = (e: React.FormEvent) => {
      e.preventDefault();
      if (!dmText.trim()) return;
      setDmLog([...dmLog, dmText]);
      setDmText('');
    };

    const handleDonatePoints = () => {
      // Award stars +10 points to member profile
      setMemberState(prev => ({
        ...prev,
        points: prev.points + 10
      }));
      showToast(`⭐ Đã tặng 1 Ngôi sao Khen Ngợi trị giá +10 LMS Point cho ${memberState.name}!`);
    };

    return (
      <div className="space-y-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-100 cursor-pointer"
        >
          <ArrowLeft size={14} /> Trở về danh sách thành viên
        </button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md space-y-6 p-6"
        >
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-between border-b border-slate-100 pb-5">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-18 h-18 rounded-3xl overflow-hidden bg-slate-50 border border-slate-150 shadow shrink-0">
                <img src={memberState.avatar} alt={memberState.name} />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-xl font-extrabold text-slate-800">{memberState.name}</h1>
                  <span className="bg-cyan-100 text-[10px] font-bold text-cyan-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-cyan-200">
                    {memberState.role}
                  </span>
                </div>
                <p className="text-slate-500 text-xs font-bold mt-1.5 leading-tight">{memberState.major}</p>
                <p className="text-[11px] text-slate-400 mt-1">Đã kiểm tra tài khoản hoạt động trong học kỳ I năm 2026.</p>
              </div>
            </div>

            <button
              onClick={handleDonatePoints}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-2xl flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <Star size={14} className="fill-white animate-spin" />
              Tặng Sao Khen Ngợi (+10đ)
            </button>
          </div>

          {/* Academic Stats grid layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Award className="text-cyan-500" size={22} />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tích lũy</span>
                <strong className="text-slate-800 text-sm font-mono">{memberState.points} điểm</strong>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Clock className="text-cyan-500" size={22} />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Số giờ học</span>
                <strong className="text-slate-800 text-sm font-mono">{memberState.studyHours} giờ</strong>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <TrendingUp className="text-emerald-500" size={22} />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Đóng góp tuần</span>
                <strong className="text-emerald-600 text-sm font-mono">+{memberState.weeklyGain}</strong>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <CheckCircle className="text-cyan-505" size={22} />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bản quyền học</span>
                <strong className="text-slate-800 text-sm font-bold">Standard</strong>
              </div>
            </div>
          </div>

          {/* Custom Graphical Representation using responsive SVG Coordinates representing study progression layout */}
          <div className="space-y-2.5 bg-slate-50 border border-slate-100 rounded-3xl p-5 text-slate-750">
            <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              📊 Biểu đồ tiến độ hoạt động tuần qua (Graphical Progress)
            </h4>
            <div className="h-32 w-full bg-white border border-slate-150 rounded-2xl p-4 flex items-end justify-between relative overflow-hidden">
              <div className="absolute top-2 left-4 text-[9px] font-mono text-slate-400 font-bold">LƯỢNG HOẠT ĐỘNG (LMS POINTS)</div>
              
              {/* Dynamic pure SVG graphics representing smooth week analysis bars */}
              <div className="w-10 text-center space-y-1.5 z-10">
                <div className="bg-cyan-500 w-full h-8 rounded-lg relative" title="Học bài: +12 điểm" />
                <span className="text-[9px] font-bold text-slate-450 font-mono block">Thứ 2</span>
              </div>
              <div className="w-10 text-center space-y-1.5 z-10">
                <div className="bg-cyan-500 w-full h-14 rounded-lg relative animate-pulse" title="Sửa lỗi: +30 điểm" />
                <span className="text-[9px] font-bold text-slate-450 font-mono">Thứ 3</span>
              </div>
              <div className="w-10 text-center space-y-1.5 z-10">
                <div className="bg-cyan-500 w-full h-6 rounded-lg" title="Lọc tin: +10 điểm" />
                <span className="text-[9px] font-bold text-slate-450 font-mono">Thứ 4</span>
              </div>
              <div className="w-10 text-center space-y-1.5 z-10">
                <div className="bg-cyan-500 w-full h-20 rounded-lg shadow shadow-cyan-200" title="Chốt bài tập: +50 điểm" />
                <span className="text-[9px] font-bold text-slate-450 font-mono">Thứ 5</span>
              </div>
              <div className="w-10 text-center space-y-1.5 z-10">
                <div className="bg-cyan-500 w-full h-11 rounded-lg" title="Học nhóm: +25 điểm" />
                <span className="text-[9px] font-bold text-slate-450 font-mono">Thứ 6</span>
              </div>
            </div>
          </div>

          {/* DM text chatter */}
          <div className="border-t border-slate-150 pt-5 space-y-4">
            <h4 className="font-extrabold text-slate-805 text-sm">Gửi tin nhắn riêng (DM) trực tiếp tới thành viên:</h4>
            
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 min-h-24 max-h-48 overflow-y-auto space-y-2 flex flex-col justify-end">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center border-b border-slate-150 pb-1.5 mb-1.5">
                Kênh nhắn tin bảo mật SmartLMS PM
              </p>
              
              <div className="text-xs bg-white rounded-xl p-3 border border-slate-100 max-w-[85%] self-start font-medium text-slate-600">
                Chào cậu, mình đã xem qua đóng góp của cậu trên diễn đàn thảo luận học nâng cao .NET Core, rất hân hạnh được hỗ trợ kết nối!
              </div>

              {dmLog.map((log, index) => (
                <div key={index} className="text-xs bg-cyan-600 text-white rounded-xl p-3 max-w-[85%] self-end">
                  {log}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendDm} className="flex gap-2 text-xs">
              <input 
                type="text"
                required
                placeholder={`Nhập thông điệp PM riêng tư gửi tới ${memberState.name}...`}
                value={dmText}
                onChange={(e) => setDmText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-205 focus:border-cyan-500 p-3 rounded-xl outline-none placeholder-slate-400 font-semibold"
              />
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-xl shadow active:scale-95 shrink-0 border-none cursor-pointer"
              >
                <Send size={15} />
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    );
}
