import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Code, 
  CheckCircle, 
  RefreshCw, 
  BookOpen, 
  Trophy, 
  AlertCircle, 
  ChevronRight, 
  MessageSquare,
  HelpCircle,
  Lightbulb,
  CornerDownRight
} from 'lucide-react';

interface AiMentorSectionProps {
  currentUser: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    major: string;
    points: number;
  };
  onUpdateUserPoints: (p: number) => void;
  showToast: (msg: string) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export default function AiMentorSection({ currentUser, onUpdateUserPoints, showToast }: AiMentorSectionProps) {
  const [mentorTab, setMentorTab] = useState<'chat' | 'quiz' | 'explainer' | 'roadmap' | 'badges'>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Xin chào **${currentUser.name}**! Tôi là **AI Study Mentor** của bạn tại SmartLMS Hub. \n\nTôi chuyên sâu về hệ sinh thái **.NET/C#, SQL Server, Kiến trúc phần mềm (Clean Architecture, Microservices)** và hệ thống phân tán. Bạn có câu hỏi nào hôm nay không?`,
      timestamp: new Date().toLocaleTimeString('vi', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quiz Arena state
  const [quizTopic, setQuizTopic] = useState('.NET Core Web API');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      question: "Sự khác biệt cốt lõi giữa Transient và Scoped lifetimes trong ASP.NET Core Dependency Injection là gì?",
      options: [
        "Transient tạo mới thực thể mỗi lần được yêu cầu; Scoped tạo mới một lần cho mỗi HTTP request.",
        "Transient chỉ sống trong RAM; Scoped được lưu xuống Redis Cache.",
        "Transient chạy bất đồng bộ; Scoped chạy đồng bộ tuần tự.",
        "Transient thích hợp cho Database Context; Scoped dành cho helper gọn nhẹ."
      ],
      correctAnswerIndex: 0,
      explanation: "Transient lifetime tạo ra một thực thể mới mỗi lần service được request từ service provider. Scoped lifetime tạo ra một thực thể duy nhất cho toàn bộ vòng đời của mỗi HTTP Request."
    }
  ]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  // Explain code state
  const [codeSnippet, setCodeSnippet] = useState(
    `public async Task<UserDto> GetUserWithCacheAsync(string userId)\n{\n    var cacheKey = $"user-{userId}";\n    var cachedUser = await _cache.GetStringAsync(cacheKey);\n    \n    if (!string.IsNullOrEmpty(cachedUser))\n    {\n        return JsonSerializer.Deserialize<UserDto>(cachedUser);\n    }\n    \n    var user = await _db.Users.FindAsync(userId);\n    if (user != null)\n    {\n        await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(user), \n            new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10) });\n    }\n    return user;\n}`
  );
  const [complexityLevel, setComplexityLevel] = useState<'beginner' | 'expert'>('expert');
  const [explanationOutput, setExplanationOutput] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  // Roadmap (Phase 4) and Certification (Phase 2)
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-1');
  const [selectedCertificate, setSelectedCertificate] = useState<{
    id: string;
    title: string;
    points: number;
    desc: string;
    prefix: string;
  } | null>(null);

  const roadmapNodes = [
    {
      id: 'node-1',
      number: '01',
      title: 'C# OOP & Memory Diagnostics',
      desc: 'Nắm vững hướng đối tượng nâng cao, Garbage Collection, Stack/Heap Allocation, và quản lý ô nhớ với Struct vs class.',
      level: 'Junior Level',
      status: 'unlocked' as const,
      quizTopic: 'C# OOP & Memory Diagnostics',
      keyConcepts: ['Memory Struct vs class', 'GC Generational Collection', 'IDisposable Pattern', 'Ref / Out / Readonly modifiers']
    },
    {
      id: 'node-2',
      number: '02',
      title: 'Entity Framework Core Performance',
      desc: 'Tìm hiểu truy vấn tối ưu, cơ chế Change Tracker, Lazy Loading vs Eager Loading, và Debug SQL raw queries.',
      level: 'Mid Level',
      status: currentUser.points >= 200 ? ('unlocked' as const) : ('locked' as const),
      quizTopic: 'Entity Framework Core Performance',
      keyConcepts: ['AsNoTracking Queries', 'Split Queries migration', 'Query compilation & caching', 'Raw SQL execution safely']
    },
    {
      id: 'node-3',
      number: '03',
      title: 'ASP.NET Core Web API Architecture',
      desc: 'Cấu trúc Controller vs Minimal APIs, Middleware pipeline, Custom Exception handling, và Dependency Injection Lifetimes.',
      level: 'Advanced Level',
      status: currentUser.points >= 400 ? ('unlocked' as const) : ('locked' as const),
      quizTopic: '.NET Core Web API',
      keyConcepts: ['Middleware pipelines order', 'DI Transient Scoped Singleton', 'Filters vs Interceptors', 'Minimal APIs endpoint mapping']
    },
    {
      id: 'node-4',
      number: '04',
      title: 'Enterprise Architecture & DDD',
      desc: 'Thiết kế hệ thống bám sát định dạng Clean Architecture, áp dụng CQRS bằng MediatR và Domain-Driven Design (DDD).',
      level: 'Senior Architect',
      status: currentUser.points >= 600 ? ('unlocked' as const) : ('locked' as const),
      quizTopic: 'Clean Architecture & MediatR',
      keyConcepts: ['MediatR CQRS Architecture', 'Domain entities vs Value Objects', 'Repository & Unit of Work patterns', 'Separation of concerns grid']
    },
    {
      id: 'node-5',
      number: '05',
      title: 'Distributed Systems & Microservices',
      desc: 'Vận hành hệ thống phân tán hiệu năng cao với RabbitMQ AMQP, Redis Distributed Caching, gRPC và container Docker.',
      level: 'Expert Master',
      status: currentUser.points >= 800 ? ('unlocked' as const) : ('locked' as const),
      quizTopic: 'Microservices & Redis Caching',
      keyConcepts: ['AMQP Message Brokering', 'Redis Distributed Lock', 'gRPC IDL syntax proto3', 'Docker Multi-stage compilation']
    }
  ];

  const skillBadges = [
    { id: 'b-1', title: 'Tập sự C# Core', points: 100, desc: 'Chứng nhận mức độ nắm vững lập trình căn bản & quản lý bộ nhớ C#.', prefix: '🥉' },
    { id: 'b-2', title: 'Kiện tướng LINQ & Database', points: 400, desc: 'Chứng nhận mức độ tối ưu hóa cơ sở dữ liệu & truy vấn phức tạp.', prefix: '🥈' },
    { id: 'b-3', title: 'Kiến trúc sư Clean Architecture', points: 700, desc: 'Tư duy thiết kế độc lập, phân chia tầng dữ liệu linh hoạt, tách biệt nghiệp vụ.', prefix: '🥇' },
    { id: 'b-4', title: 'Bậc thầy Microservices Phân tán', points: 1000, desc: 'Quản lý thông điệp, chịu lỗi tốt, đồng bộ hóa dữ liệu thời gian thực.', prefix: '👑' }
  ];

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatLoading]);

  // General server-side calling proxy helper
  const queryMentorAPI = async (endpoint: string, payload: object) => {
    try {
      const response = await fetch(`/api/mentor/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  // SEND CHAT MESSAGE
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isChatLoading) return;

    const userMsg: Message = {
      role: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString('vi', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsChatLoading(true);

    try {
      // Build a simplified history context to send to API
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        text: m.text
      }));

      const data = await queryMentorAPI('chat', {
        message: userMsg.text,
        history,
        userRole: currentUser.role
      });

      setMessages(prev => [...prev, {
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString('vi', { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'model',
        text: `⚠️ **Lỗi kết nối AI:** ${err.message || 'Không thể liên lạc được với backend AI. Hãy chắc chắn bạn đã chạy server và điền đầy đủ API key.'}`,
        timestamp: new Date().toLocaleTimeString('vi', { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // GENERATE BESPOKE QUIZ
  const handleGenerateQuiz = async () => {
    setIsGeneratingQuiz(true);
    setSelectedOption(null);
    setIsQuizSubmitted(false);
    setCurrentQuestionIdx(0);
    setQuizScore(0);

    try {
      const data = await queryMentorAPI('quiz', {
        topic: quizTopic,
        userRole: currentUser.role
      });
      
      if (data.questions && data.questions.length > 0) {
        setQuizQuestions(data.questions);
        showToast(`🎲 Đã khởi tạo bộ câu đố thực hành C# về ${quizTopic}!`);
      } else {
        throw new Error("Dữ liệu câu hỏi bị rỗng.");
      }
    } catch (err: any) {
      showToast(`⚠️ Không tạo được Quiz: ${err.message}`);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  // SUBMIT SELECTED QUIZ OPTION
  const handleSubmitQuizAnswer = () => {
    if (selectedOption === null || isQuizSubmitted) return;

    const currentQ = quizQuestions[currentQuestionIdx];
    const isCorrect = selectedOption === currentQ.correctAnswerIndex;
    
    setIsQuizSubmitted(true);
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      onUpdateUserPoints(15);
      showToast("🎉 Chính xác! Bạn nhận được +15 XP năng lực học thuật.");
    } else {
      showToast("❌ Tiếc quá, sai mất rồi! Đọc giải thích bên dưới để nhớ sâu nhé.");
    }
  };

  // NEXT QUIZ QUESTION
  const handleNextQuizQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsQuizSubmitted(false);
    } else {
      showToast(`🏆 Bạn đã hoàn thành bài thực hành! Điểm số: ${quizScore}/${quizQuestions.length}`);
    }
  };

  // CODE EXPLAINER CALL
  const handleExplainCode = async () => {
    if (!codeSnippet.trim() || isExplaining) return;

    setIsExplaining(true);
    setExplanationOutput(null);

    try {
      const data = await queryMentorAPI('explain', {
        code: codeSnippet,
        level: complexityLevel
      });

      setExplanationOutput(data.explanation);
      onUpdateUserPoints(5);
      showToast("✨ AI đã phân tích mã nguồn thành công! +5 điểm tích lũy học tập.");
    } catch (err: any) {
      setExplanationOutput(`⚠️ **Thao tác lỗi:** ${err.message || 'Lỗi phân tích mã nguồn.'}`);
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row h-[620px]">
      
      {/* Sub menu controls - Left rail on wide screen, top grid on mobile */}
      <div className="w-full md:w-60 bg-slate-50 p-5 flex flex-col justify-between border-r border-slate-100 shrink-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-800 leading-none">AI Study Mentor</h2>
              <span className="text-[10px] text-cyan-600 font-bold uppercase tracking-wider">Hỗ trợ 24/7 .NET Core</span>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setMentorTab('chat')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-xl transition-all text-left cursor-pointer ${mentorTab === 'chat' ? 'bg-cyan-600 text-white shadow shadow-cyan-200' : 'text-slate-650 hover:bg-slate-100'}`}
            >
              <MessageSquare size={14} />
              <span>Thảo luận cùng AI</span>
            </button>

            <button
              onClick={() => setMentorTab('quiz')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-xl transition-all text-left cursor-pointer ${mentorTab === 'quiz' ? 'bg-cyan-600 text-white shadow shadow-cyan-200' : 'text-slate-650 hover:bg-slate-100'}`}
            >
              <HelpCircle size={14} />
              <span>Đấu trường C# Quiz</span>
            </button>

            <button
              onClick={() => setMentorTab('explainer')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-xl transition-all text-left cursor-pointer ${mentorTab === 'explainer' ? 'bg-cyan-600 text-white shadow shadow-cyan-200' : 'text-slate-650 hover:bg-slate-100'}`}
            >
              <Code size={14} />
              <span>Trình giải nghĩa Code</span>
            </button>

            <button
              onClick={() => setMentorTab('roadmap')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-xl transition-all text-left cursor-pointer ${mentorTab === 'roadmap' ? 'bg-cyan-600 text-white shadow shadow-cyan-200' : 'text-slate-650 hover:bg-slate-100'}`}
            >
              <BookOpen size={14} />
              <span>Lộ trình .NET Developer</span>
            </button>

            <button
              onClick={() => setMentorTab('badges')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-xl transition-all text-left cursor-pointer ${mentorTab === 'badges' ? 'bg-cyan-600 text-white shadow shadow-cyan-200' : 'text-slate-650 hover:bg-slate-100'}`}
            >
              <Trophy size={14} className="text-amber-500" />
              <span>Chứng chỉ học thuật</span>
            </button>
          </div>
        </div>

        {/* Informative Tips of distributed systems */}
        <div className="hidden md:block bg-cyan-50 border border-cyan-100 rounded-2xl p-3.5">
          <h4 className="text-[10px] uppercase font-black text-cyan-800 mb-1 flex items-center gap-1">
            <Lightbulb size={12} /> Mẹo tự học thông minh
          </h4>
          <p className="text-[10px] leading-relaxed text-slate-600 font-medium">
            Hãy thử dán lỗi StackTrace hoặc Exception của C# khi làm việc với Entity Framework vào tab chat để chatbot phân tích ngay vấn đề.
          </p>
        </div>
      </div>

      {/* Main interaction workspace */}
      <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
        
        {/* INTERACTION ONE: DISCUSSION CHATBOT */}
        {mentorTab === 'chat' && (
          <>
            {/* Header profile area */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 overflow-hidden flex items-center justify-center font-bold text-indigo-700 text-sm">
                    💬
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800">Cơ chế trao đổi bài học với Gemini</h3>
                  <p className="text-[10px] text-slate-400 font-bold">Role: {currentUser.role} &#183; Định dạng Markdown tiêu chuẩn</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setMessages([{
                    role: 'model',
                    text: 'Đã thiết lập lại bối cảnh trò chuyện! Bạn muốn tìm hiểu gì tiếp theo về phân tán .NET?',
                    timestamp: new Date().toLocaleTimeString('vi', { hour: '2-digit', minute: '2-digit' })
                  }]);
                }}
                className="p-1 px-2.5 text-[10px] font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-150 flex items-center gap-1 transition-all"
                title="Làm mới cuộc trò chuyện"
              >
                <RefreshCw size={10} /> Làm mới
              </button>
            </div>

            {/* Conversation Log Flow */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[460px]">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}
                >
                  {msg.role === 'model' && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-100/80 border border-cyan-200 shrink-0 flex items-center justify-center text-xs">
                      🤖
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl p-4 text-xs font-semibold leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-slate-50 text-slate-800 border border-slate-100/80 rounded-tl-none'}`}>
                    <div className="whitespace-pre-line prose-sm">
                      {msg.text}
                    </div>
                    <span className={`block text-[8px] mt-1.5 ${msg.role === 'user' ? 'text-cyan-100 text-right' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="flex justify-start items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-100/80 border border-cyan-200 shrink-0 flex items-center justify-center text-xs animate-spin">
                    🌀
                  </div>
                  <div className="bg-slate-50 text-slate-400 border border-slate-100 rounded-2xl p-3 text-xs font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    <span>Mentor đang tư duy câu trả lời...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat form entry bar */}
            <form onSubmit={handleSendChat} className="p-4 border-t border-slate-100 flex items-center gap-2 bg-slate-50/50">
              <input
                type="text"
                placeholder="Ví dụ: Đọc dữ liệu khổng lồ với EF Core cần Optimize thế nào?..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isChatLoading}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium focus:ring-2 focus:ring-cyan-500 outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isChatLoading}
                className="w-10 h-10 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center transition-colors disabled:opacity-40 shadow shadow-cyan-200"
              >
                <Send size={15} />
              </button>
            </form>
          </>
        )}

        {/* INTERACTION TWO: C# QUIZ CHALLENGE ARENA */}
        {mentorTab === 'quiz' && (
          <div className="p-6 space-y-5 flex-1 overflow-y-auto">
            {/* Setting parameters */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="space-y-1 text-left w-full sm:w-auto">
                <label className="text-[10px] text-slate-400 font-bold uppercase block">Chủ đề trắc nghiệm học máy</label>
                <select 
                  value={quizTopic} 
                  onChange={(e) => setQuizTopic(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-xs rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-bold"
                >
                  <option value=".NET Core Web API">.NET Core Web API (Controllers, DI, Middleware)</option>
                  <option value="Entity Framework Core">Entity Framework Core (LINQ Queries, Migration, Tracking)</option>
                  <option value="C# Concurrent Programming">C# Concurrent (Task Parallel Library, Lock, Channels)</option>
                  <option value="Software Architectures">Software Architectures (Clean Architecture, CQRS, DDD)</option>
                  <option value="Database Performance">Database Optimization (Query Performance, Indexing, Partitioning)</option>
                </select>
              </div>

              <button
                onClick={handleGenerateQuiz}
                disabled={isGeneratingQuiz}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-black rounded-xl hover:shadow-lg transition-all disabled:opacity-55 shrink-0 flex items-center gap-2"
              >
                <Sparkles size={13} className={isGeneratingQuiz ? 'animate-spin' : ''} />
                <span>{isGeneratingQuiz ? 'Đang tạo câu đố...' : 'Đổi Bộ Câu Hỏi Mới'}</span>
              </button>
            </div>

            {/* Quiz panel display */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] bg-cyan-50 text-cyan-700 border border-cyan-100 font-bold px-2 py-0.5 rounded-full">
                  Câu hỏi {currentQuestionIdx + 1} / {quizQuestions.length}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Trophy size={13} className="text-amber-500" />
                  Điểm số tích lũy: <strong className="text-slate-800 font-extrabold">{quizScore}</strong>
                </span>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-800 leading-relaxed">
                  {quizQuestions[currentQuestionIdx].question}
                </h4>

                <div className="space-y-2">
                  {quizQuestions[currentQuestionIdx].options.map((opt, oIdx) => {
                    let btnClass = "border-slate-150 hover:bg-slate-50 text-slate-700";
                    
                    if (selectedOption === oIdx) {
                      btnClass = "bg-cyan-50 border-cyan-500 text-cyan-800 ring-1 ring-cyan-500";
                    }
                    if (isQuizSubmitted) {
                      if (oIdx === quizQuestions[currentQuestionIdx].correctAnswerIndex) {
                        btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800 font-black";
                      } else if (selectedOption === oIdx) {
                        btnClass = "bg-rose-50 border-rose-400 text-rose-800";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isQuizSubmitted}
                        onClick={() => setSelectedOption(oIdx)}
                        className={`w-full p-3 text-left text-xs font-semibold rounded-xl border transition-all flex items-start gap-2.5 group ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-cyan-100 group-hover:text-cyan-700 text-[10px] flex items-center justify-center shrink-0 uppercase font-black">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Question rationale block */}
                <AnimatePresence>
                  {isQuizSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs mt-3 text-slate-650"
                    >
                      <span className="font-extrabold text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Kiến thức chuyên sâu:</span>
                      <p className="leading-relaxed whitespace-pre-line">
                        {quizQuestions[currentQuestionIdx].explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submissions action triggers */}
                <div className="flex justify-end pt-2 border-t border-slate-50">
                  {!isQuizSubmitted ? (
                    <button
                      onClick={handleSubmitQuizAnswer}
                      disabled={selectedOption === null}
                      className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-extrabold disabled:opacity-40 transition-colors"
                    >
                      Xác nhận câu trả lời
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1"
                    >
                      <span>{currentQuestionIdx < quizQuestions.length - 1 ? 'Câu tiếp theo' : 'Kết thúc bộ đề'}</span>
                      <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTION THREE: SMART CODE EXPLAINER */}
        {mentorTab === 'explainer' && (
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            <div className="space-y-1">
              <h3 className="text-xs font-extrabold text-slate-800">Giải nghĩa mã nguồn chi tiết</h3>
              <p className="text-[10px] text-slate-400 font-medium">Bóc tách tư duy thuật toán, cấu trúc lưu trữ và độ phức tạp bộ nhớ RAM/CPU.</p>
            </div>

            <div className="space-y-2">
              <textarea
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                rows={7}
                placeholder="Dán code C# hoặc SQL vào đây để phân tích..."
                className="w-full p-4 font-mono text-[11px] bg-slate-900 text-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 leading-relaxed border border-slate-700"
              />
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500">Mức độ lý giải:</span>
                  <div className="inline-flex rounded-lg bg-slate-100 p-1">
                    <button
                      onClick={() => setComplexityLevel('beginner')}
                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${complexityLevel === 'beginner' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Dễ hiểu
                    </button>
                    <button
                      onClick={() => setComplexityLevel('expert')}
                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${complexityLevel === 'expert' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Chuyên sâu (Expert)
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleExplainCode}
                  disabled={isExplaining || !codeSnippet.trim()}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-extrabold transition-all disabled:opacity-50 inline-flex items-center gap-2 w-full sm:w-auto justify-center shadow shadow-cyan-200"
                >
                  {isExplaining ? <RefreshCw size={13} className="animate-spin" /> : <Code size={13} />}
                  <span>{isExplaining ? 'AI đang phân tích...' : 'Phân tích mã nguồn'}</span>
                </button>
              </div>
            </div>

            {/* Structured explanation display */}
            <AnimatePresence>
              {explanationOutput && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed shadow-inner max-h-[170px] overflow-y-auto"
                >
                  <div className="flex items-center gap-1.5 text-cyan-700 font-extrabold uppercase tracking-widest text-[10px] mb-2.5">
                    <CheckCircle size={12} /> Báo cáo giải nghĩa mã nguồn
                  </div>
                  {explanationOutput}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* INTERACTION FOUR: LEARNING ROADMAP (Phase 4) */}
        {mentorTab === 'roadmap' && (
          <div className="p-6 space-y-5 flex-1 overflow-y-auto flex flex-col md:flex-row gap-6">
            
            {/* Steps line track */}
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-cyan-650 font-extrabold uppercase tracking-widest block">Lộ trình học tập cá nhân hóa</span>
                <h3 className="font-extrabold text-slate-800 text-sm">Học phần phát triển .NET Enterprise Developer</h3>
              </div>

              <div className="relative border-l-2 border-slate-205 pl-5 ml-2.5 space-y-5 py-1">
                {roadmapNodes.map((node) => {
                  const isActive = selectedNodeId === node.id;
                  const isUnlocked = node.status === 'unlocked';

                  let badgeColor = "bg-slate-200 text-slate-500 border-slate-200";
                  if (isUnlocked) {
                    badgeColor = isActive 
                      ? "bg-cyan-600 text-white ring-4 ring-cyan-100 border-cyan-600"
                      : "bg-white text-cyan-600 border-cyan-600 hover:bg-cyan-50";
                  }

                  return (
                    <div 
                      key={node.id} 
                      onClick={() => {
                        if (isUnlocked) {
                          setSelectedNodeId(node.id);
                        } else {
                          showToast(`🔒 Bạn cần tích lũy thêm điểm học thuật để mở khóa bài học: ${node.title}`);
                        }
                      }}
                      className={`relative cursor-pointer transition-all ${isUnlocked ? 'opacity-100' : 'opacity-40'}`}
                    >
                      {/* Node circle */}
                      <span className={`absolute -left-8.5 top-0.5 w-6 h-6 rounded-full border-2 text-[10px] font-black flex items-center justify-center transition-all ${badgeColor}`}>
                        {node.number}
                      </span>

                      <div>
                        <h4 className={`text-xs font-bold leading-snug ${isActive ? 'text-cyan-750 font-extrabold' : 'text-slate-700'}`}>
                          {node.title} {!isUnlocked && '🔒'}
                        </h4>
                        <span className="text-[9px] text-slate-400 font-extrabold tracking-wider">{node.level}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Node Details */}
            <div className="w-full md:w-64 bg-slate-50 border border-slate-100 p-4 rounded-3xl shrink-0 flex flex-col justify-between space-y-4 text-left">
              {(() => {
                const node = roadmapNodes.find(n => n.id === selectedNodeId);
                if (!node) return null;
                return (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white border border-slate-100 p-2 rounded-xl">
                        <span className="text-[9px] font-black uppercase text-cyan-605 tracking-widest">{node.level}</span>
                        <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md">✓ Khả dụng</span>
                      </div>

                      <h4 className="text-xs font-black text-slate-805 leading-snug">{node.title}</h4>
                      <p className="text-[11.5px] font-medium text-slate-500 leading-relaxed">{node.desc}</p>

                      <div className="space-y-1.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Khái niệm then chốt:</span>
                        <div className="flex flex-wrap gap-1.5 h-[110px] overflow-y-auto">
                          {node.keyConcepts.map((concept, idx) => (
                            <span key={idx} className="bg-white border border-slate-150 rounded-lg px-2 py-1 text-[9.5px] font-bold text-slate-700 leading-none">
                              # {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setQuizTopic(node.quizTopic);
                          setMentorTab('quiz');
                          showToast(`🎯 Đã kích hoạt Đấu trường C# Quiz cho chủ đề: ${node.quizTopic}. Bạn đã sẵn sàng chưa?`);
                        }}
                        className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white border-none rounded-xl text-xs font-black transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles size={11} className="animate-pulse" />
                        Làm Quiz luyện năng lực
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>

          </div>
        )}

        {/* INTERACTION FIVE: BADGES & CERTIFICATES (Phase 2) */}
        {mentorTab === 'badges' && (
          <div className="p-6 space-y-5 flex-1 overflow-y-auto">
            <div className="space-y-1">
              <span className="text-[10px] text-cyan-600 font-extrabold uppercase tracking-widest block">Điểm năng lực học thuật: {currentUser.points} XP</span>
              <h3 className="font-extrabold text-slate-805 text-sm">Kho Chứng nhận Học thuật Thông minh</h3>
              <p className="text-[10px] text-slate-400 font-medium font-sans">Bảng vinh danh thông minh. Tích lũy điểm khi hoàn thiện bài tập, giải đáp Q&A hoặc qua Quiz để mở khóa các danh hiệu quốc tế cao quý.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillBadges.map((badge) => {
                const isUnlocked = currentUser.points >= badge.points;
                return (
                  <div 
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-4 text-left ${
                      isUnlocked 
                        ? 'bg-gradient-to-br from-amber-50/20 to-amber-100/10 border-amber-200/65 shadow-xs ring-1 ring-amber-100/50' 
                        : 'bg-white border-slate-100 opacity-60'
                    }`}
                  >
                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-2xl shadow-xs shrink-0 select-none">
                      {isUnlocked ? badge.prefix : '🔒'}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0 font-sans">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-extrabold text-slate-850 truncate">{badge.title}</h4>
                        <span className="text-[9px] font-black text-amber-700 shrink-0 uppercase bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-md">
                          {badge.points} XP
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold leading-relaxed line-clamp-2">{badge.desc}</p>
                      
                      {isUnlocked ? (
                        <button
                          onClick={() => setSelectedCertificate(badge)}
                          className="text-[9px] hover:underline text-cyan-600 hover:text-cyan-700 font-black flex items-center gap-1 cursor-pointer pt-1"
                        >
                          🏅 Xem & Xuất Certificate
                        </button>
                      ) : (
                        <p className="text-[9px] text-rose-500 font-bold pt-1">
                          Cần thêm {badge.points - currentUser.points} XP để mở khóa
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tips footer badge */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-start gap-2.5">
              <span className="text-xs">💡</span>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed font-sans">
                Chứng chỉ học thuật của SmartLMS Hub sử dụng công nghệ thẩm định tự động, ghi nhận tên thật của bạn dựa theo dữ liệu hồ sơ cá nhân và được xếp hàng ưu tiên cao trong danh sách Roster tuyển dụng doanh nghiệp thành viên.
              </p>
            </div>

          </div>
        )}

      </div>

      {/* DYNAMIC VIRTUAL CERTIFICATE MODAL LAYOUT */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-stone-50 border-8 border-double border-amber-400 p-8 md:p-12 rounded-lg max-w-lg w-full shadow-2xl relative text-center space-y-6 overflow-hidden"
            >
              {/* Corner ornamental scrolls */}
              <div className="absolute top-2 left-2 text-amber-300 font-mono text-xs">◆</div>
              <div className="absolute top-2 right-2 text-amber-300 font-mono text-xs">◆</div>
              <div className="absolute bottom-2 left-2 text-amber-300 font-mono text-xs">◆</div>
              <div className="absolute bottom-2 right-2 text-amber-300 font-mono text-xs">◆</div>

              <div className="space-y-1.5">
                <span className="text-xl md:text-2xl block">{selectedCertificate.prefix}</span>
                <h2 className="font-serif text-amber-800 text-lg md:text-xl font-bold tracking-widest uppercase">
                  CERTIFICATE OF ACHIEVEMENT
                </h2>
                <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                  HỘI ĐỒNG KHẢO THÍ HỌC THUẬT SMARTLMS HUB
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-serif italic text-slate-605">SmartLMS Hub trang trọng biểu dương thành tích học tập xuất sắc của:</p>
                <h3 className="font-serif text-xl md:text-2xl font-black text-slate-900 border-b border-dashed border-slate-300 pb-2 max-w-xs mx-auto italic tracking-wide">
                  {currentUser.name}
                </h3>
                <p className="text-[11.5px] font-medium text-slate-500 max-w-sm mx-auto leading-relaxed font-sans">
                  Đã hoàn thành xuất sắc các chỉ tiêu khảo hạch lập trình hệ sinh thái .NET Core & C# nâng cao, chứng tỏ năng khiếu vượt trội và được vinh danh giải thưởng cao nhất:
                  <strong className="block text-slate-800 mt-1 uppercase text-xs font-bold font-sans tracking-wide">
                    {selectedCertificate.title}
                  </strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 items-center pt-4 border-t border-slate-200 text-[9.5px] font-bold text-slate-400 font-mono">
                <div className="space-y-1">
                  <p className="text-slate-505 italic font-serif">Chỉnh đống & Thẩm định bởi</p>
                  <p className="text-slate-800 font-black">AI STUDY MENTOR ROBOT</p>
                  <div className="text-[8px] text-emerald-600 font-black underline">VERIFIED CODE: #LMS-{(Date.now() % 1000000)}</div>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-505 italic font-serif">Giám đốc Đào tạo</p>
                  <p className="text-slate-800 font-black">PROF. DR. PHẠM ĐỨC MINH</p>
                  <p className="text-[8px] text-amber-600 font-black">AI SIGNED CERTIFICATE</p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 border-none text-white text-xs font-black rounded-lg transition-colors cursor-pointer"
                >
                  Đóng chứng nhận
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
