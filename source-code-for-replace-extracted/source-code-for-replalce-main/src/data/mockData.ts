import { Post, Resource, Event, Question, StudyGroup, LeaderboardEntry } from '../types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Hỏi về lỗi đồng bộ Video Progress trong StudyWorkspace',
    content: 'Mình đang xem video tới phút thứ 2 thì trang web mất kết nối API, bị lỗi 404 liên tục. Có bạn nào bị lỗi này không và khắc phục thế nào vậy nhỉ? Đang chuẩn bị thi cuối khóa mà kẹt quá!',
    authorName: 'Trần Văn Hoàng',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hoang',
    authorRole: 'Student',
    createdAt: '2026-05-20T08:30:00Z',
    likes: 24,
    likedByUser: false,
    commentsCount: 1,
    category: 'StudyWorkspace',
    tag: 'Bug Report',
    comments: [
      {
        id: 'c1',
        authorName: 'Nguyễn Thị Minh',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh',
        authorRole: 'Mentor',
        createdAt: '2026-05-20T09:12:00Z',
        content: 'Bạn thử xóa Cookie và Cache trình duyệt đi xem sao nhé. Nếu vẫn bị thì do máy chủ lúc đó quá tải, giờ thử load lại chắc ổn rồi đó!'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Tài liệu hướng dẫn học C# Advanced Enterprise',
    content: 'Chào các học viên, đây là link tài liệu và mẫu mã nguồn phục vụ học phần C# Advanced Enterprise. Mọi người tải về làm mẫu báo cáo đồ án cuối khóa, lưu ý phần thiết kế kiến trúc Clean Architecture nhé.',
    authorName: 'Thầy Phạm Đức Minh',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DucMinh',
    authorRole: 'Instructor',
    createdAt: '2026-05-20T07:15:00Z',
    likes: 42,
    likedByUser: false,
    commentsCount: 2,
    category: 'C# Advanced',
    tag: 'Share Resource',
    comments: [
      {
        id: 'c2',
        authorName: 'Lê Tuấn Tú',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tu',
        authorRole: 'Student',
        createdAt: '2026-05-20T07:35:00Z',
        content: 'Cảm ơn Thầy ạ, tài liệu siêu xịn và chi tiết.'
      },
      {
        id: 'c3',
        authorName: 'Phạm Hồng Phong',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Phong',
        authorRole: 'Student',
        createdAt: '2026-05-20T08:10:00Z',
        content: 'Kiến trúc này kết nối SQL Server chuẩn luôn thầy ơi.'
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Bí quyết đạt điểm A+ môn Cấu trúc dữ liệu & Giải thuật',
    content: 'Mình vừa hoàn thành xuất sắc môn DSA kỳ này. Muốn chia sẻ 3 thói quen cốt lõi: 1) Vẽ sơ đồ cây trên giấy trước khi viết code, 2) Tập trung vào phân tích thời gian chạy (Big O), và 3) Làm bài trên LeetCode hàng ngày.',
    authorName: 'Phan Bảo Nam',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
    authorRole: 'Student',
    createdAt: '2026-05-19T14:22:00Z',
    likes: 56,
    likedByUser: false,
    commentsCount: 0,
    category: 'Data Structures',
    tag: 'Study Tips',
    comments: []
  },
  {
    id: 'post-4',
    title: 'Mời tham gia Hackathon "GreenTech Future 2026"',
    content: 'Cuộc thi lập trình công nghệ xanh chính thức khởi động! Giải thưởng lên tới 50 triệu và cơ hội thực tập tại các tập đoàn lớn. Đội mình hiện có 3 thành viên, cần tuyển thêm 1 bạn làm Frontend React cứng.',
    authorName: 'Vũ Thùy Linh',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linh',
    authorRole: 'Student',
    createdAt: '2026-05-18T10:05:00Z',
    likes: 19,
    likedByUser: false,
    commentsCount: 0,
    category: 'Events & News',
    tag: 'Recruitment',
    comments: []
  }
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'Giáo trình Clean Architecture ứng dụng trong .NET 8 / v9',
    description: 'Tài liệu chi tiết hướng dẫn thiết kế Domain-Driven Design (DDD) cùng Web API trong .NET, bao gồm mã nguồn ví dụ.',
    authorName: 'Lê Vương Lâm',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lam',
    authorRole: 'Instructor',
    subject: '.NET Development',
    downloadCount: 184,
    fileSize: '4.8 MB',
    fileType: 'PDF',
    createdAt: '2026-05-15T03:00:00Z',
    likes: 38,
    likedByUser: false
  },
  {
    id: 'res-2',
    title: 'Cheat Sheet SQL Queries cơ bản đến nâng cao',
    description: 'Tổng hợp đầy đủ các kiểu JOIN, Subquery, Window Functions và các mẹo tối ưu hóa câu lệnh SELECT.',
    authorName: 'Nguyễn Thị Minh',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh',
    authorRole: 'Mentor',
    subject: 'Database Systems',
    downloadCount: 312,
    fileSize: '1.2 MB',
    fileType: 'PDF',
    createdAt: '2026-05-18T11:45:00Z',
    likes: 54,
    likedByUser: false
  },
  {
    id: 'res-3',
    title: 'Template Đồ án tốt nghiệp Công nghệ thông tin',
    description: 'File Word mẫu đạt chuẩn định dạng báo cáo khoa học kèm sơ đồ thực tế hệ thống UML.',
    authorName: 'Trần Đại Nghĩa',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nghia',
    authorRole: 'Admin',
    subject: 'General Info',
    downloadCount: 95,
    fileSize: '12.4 MB',
    fileType: 'DOCX',
    createdAt: '2026-05-19T06:20:00Z',
    likes: 18,
    likedByUser: false
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: 'Webinar: Định hướng nghề nghiệp Lập trình viên .NET với AI',
    description: 'Chia sẻ từ các chuyên gia hàng đầu về cách tận dụng AI trong việc phát triển ứng dụng .NET lớn, xu hướng tuyển dụng cuối năm 2026.',
    speaker: 'Anh Nguyễn Tiến Dũng (Director of .NET Solutions)',
    speakerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dung',
    date: '2026-05-28',
    time: '19:30 - 21:30',
    platform: 'Microsoft Teams & SmartLMS Live',
    registeredCount: 145,
    registeredByUser: false,
    category: 'webinar'
  },
  {
    id: 'evt-2',
    title: 'WorkShop: Xây dựng RESTful API chuẩn RESTful & NestJS',
    description: 'Thực hành từng bước thiết lập ứng dụng backend với NestJS, xác thực JWT, kết nối PostgreSQL.',
    speaker: 'Phạm Minh Quân (Senior Tech Lead)',
    speakerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quan',
    date: '2026-06-02',
    time: '14:00 - 17:00',
    platform: 'Lab Room 302 & Zoom',
    registeredCount: 80,
    registeredByUser: false,
    category: 'workshop'
  },
  {
    id: 'evt-3',
    title: 'Học nhóm ôn thi Giải thuật buổi tối',
    description: 'Giải các đề thi giữa kỳ năm ngoái phần Đồ thị (Graph) và Cây khung nhỏ nhất.',
    speaker: 'Nguyễn Hoài Nam (Mentor DSA)',
    speakerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HoaiNam',
    date: '2026-05-23',
    time: '20:00 - 22:00',
    platform: 'Discord Room Alpha',
    registeredCount: 32,
    registeredByUser: false,
    category: 'study_session'
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    title: 'Làm thế nào để fix lỗi CORS khi gọi API từ ExpressJS lên Angular?',
    content: 'Em cấu hình cors() trong Express rồi nhưng Angular vẫn báo Blocked by CORS policy khi gửi PATCH request.',
    authorName: 'Đặng Tuấn Kiệt',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiet',
    authorRole: 'Student',
    createdAt: '2026-05-21T02:15:00Z',
    votes: 8,
    votedByUser: undefined,
    answersCount: 2,
    solved: true,
    tags: ['Web Dev', 'ExpressJS', 'Angular', 'CORS'],
    answers: [
      {
        id: 'ans-1',
        authorName: 'Vũ Đức Thịnh',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thinh',
        authorRole: 'Mentor',
        content: 'Bạn kiểm tra lại headers ở Angular xem có gửi thêm gì lạ không. Ở Express, hãy đảm bảo bạn dùng middleware cors() trước toàn bộ các routes khác như thế này:\n\n```javascript\napp.use(cors({\n  origin: "http://localhost:4200",\n  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],\n  credentials: true\n}));\n```\n\nVà đảm bảo preflight (OPTIONS request) được xử lý nhé.',
        createdAt: '2026-05-21T03:02:00Z',
        votes: 12,
        isAccepted: true
      },
      {
        id: 'ans-2',
        authorName: 'Trương Hoàng Anh',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HoangAnh',
        authorRole: 'Student',
        content: 'Đúng r đấy, mình cũng bị y hệt, đưa middleware cors() lên trên đầu cùng là được á.',
        createdAt: '2026-05-21T04:10:00Z',
        votes: 2,
        isAccepted: false
      }
    ]
  },
  {
    id: 'q-2',
    title: 'Sự khác biệt giữa IEnumerable và IQueryable trong C# là gì?',
    content: 'Khi nào nên sử dụng mỗi loại khi truy vấn Database bằng Entity Framework Core? Giúp em phân biệt hiệu năng của chúng với.',
    authorName: 'Phùng Bảo Ngọc',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngoc',
    authorRole: 'Student',
    createdAt: '2026-05-20T12:00:00Z',
    votes: 15,
    votedByUser: undefined,
    answersCount: 1,
    solved: false,
    tags: ['C#', '.NET', 'Entity Framework', 'Database'],
    answers: [
      {
        id: 'ans-3',
        authorName: 'Thầy Phạm Đức Minh',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DucMinh',
        authorRole: 'Instructor',
        content: 'Nguyên tắc vàng:\n1. **IQueryable**: Thích hợp khi truy vấn dữ liệu từ DB. Câu lệnh được dịch sang SQL và chạy ở DB Server (Server-side filtering). Chỉ lấy đúng bản ghi cần thiết về bộ nhớ.\n2. **IEnumerable**: Thích hợp khi làm việc với In-memory collection. Toàn bộ dữ liệu được load về RAM rồi mới filter (Client-side filtering).\n\nDo đó, luôn dùng `IQueryable` trước khi gọi `.ToList()` hoặc `.ToListAsync()`.',
        createdAt: '2026-05-20T13:45:00Z',
        votes: 24,
        isAccepted: false
      }
    ]
  }
];

export const INITIAL_GROUPS: StudyGroup[] = [
  {
    id: 'grp-1',
    name: '.NET Core Backend Experts',
    subject: '.NET Development',
    memberCount: 78,
    maxMembers: 120,
    description: 'Nơi trao đổi kinh nghiệm lập trình backend, xử lý microservices, Docker, CI/CD và kiến trúc Microservices.',
    creatorName: 'Thầy Phạm Đức Minh',
    joinedByUser: true,
    nextMeeting: '2026-05-28 19:30'
  },
  {
    id: 'grp-2',
    name: 'Cày LeetCode 30 Ngày',
    subject: 'Algorithms',
    memberCount: 112,
    maxMembers: 150,
    description: 'Nhóm dành cho các bạn quyết tâm giải ít nhất 1 bài giải thuật mỗi ngày để chuẩn bị cho phỏng vấn FAANG.',
    creatorName: 'Phan Bảo Nam',
    joinedByUser: false,
    nextMeeting: '2026-05-24 21:00'
  },
  {
    id: 'grp-3',
    name: 'UI/UX Design Lovers 🎨',
    subject: 'Design',
    memberCount: 45,
    maxMembers: 60,
    description: 'Học hỏi Figma, nghiên cứu lý thuyết màu sắc, cách bố trí Layout và cải thiện tính khả dụng hệ thống.',
    creatorName: 'Vũ Thùy Linh',
    joinedByUser: false
  }
];

export const THE_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Nguyễn Văn Đạt', role: 'Student', points: 2840, badges: ['🥇 DSA Master', '💡 Top Contributor', '📅 Daily Streak'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dat', weeklyGain: 340 },
  { rank: 2, name: 'Thầy Phạm Đức Minh', role: 'Instructor', points: 2510, badges: ['🏫 Helpful Professor', '📖 Author'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DucMinh', weeklyGain: 120 },
  { rank: 3, name: 'Lê Minh Khôi', role: 'Student', points: 1980, badges: ['⚡ Bug Hunter', '🗣️ Moderator'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khoi', weeklyGain: 280 },
  { rank: 4, name: 'Đặng Tuấn Kiệt', role: 'Student', points: 1650, badges: ['🔥 LeetCoder', '📚 Constant Scholar'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiet', weeklyGain: 190 },
  { rank: 5, name: 'Nguyễn Thị Minh', role: 'Mentor', points: 1420, badges: ['🌟 Elite Mentor'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh', weeklyGain: 90 },
  { rank: 6, name: 'Phùng Bảo Ngọc', role: 'Student', points: 1210, badges: ['🎨 Creative Mind'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngoc', weeklyGain: 150 },
  { rank: 7, name: 'Vũ Thùy Linh', role: 'Student', points: 1180, badges: ['🚀 Organizer'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linh', weeklyGain: 210 }
];

export const ANNOUNCEMENTS = [
  { id: 'ann-1', title: 'Khởi động cuộc thi Hackathon SmartLMS 2026', time: '2 giờ trước', description: 'Đăng ký dự thi giải thưởng lên tới 100 triệu đồng.' },
  { id: 'ann-2', title: 'Cập nhật hệ thống: Chức năng Workspace học tập nhóm', time: 'Hôm qua', description: 'Đã tích hợp bảng vẽ chung Real-time Whiteboard vào nhóm học.' },
  { id: 'ann-3', title: 'Hạn chót hoàn thành học phần nâng cao SQL', time: '2 ngày trước', description: 'Để lấy chứng chỉ, các bạn cần nộp bài lab trước ngày 25/05.' }
];
