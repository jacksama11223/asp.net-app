import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  LogIn, 
  LogOut, 
  User, 
  Bell, 
  MessageSquare, 
  BookOpen, 
  Calendar, 
  Users, 
  HelpCircle, 
  GraduationCap, 
  Trophy,
  Check,
  ShieldCheck
} from 'lucide-react';

// Type definitions and initial data
import { Post, Resource, Event, Question, StudyGroup, UserRole } from './types';
import { 
  INITIAL_POSTS, 
  INITIAL_RESOURCES, 
  INITIAL_EVENTS, 
  INITIAL_QUESTIONS, 
  INITIAL_GROUPS, 
  THE_LEADERBOARD 
} from './data/mockData';

// Modular children components
import ForumFeed from './components/ForumFeed';
import ResourceSharing from './components/ResourceSharing';
import EventListings from './components/EventListings';
import MemberDirectory from './components/MemberDirectory';
import QASection from './components/QASection';
import StudyGroups from './components/StudyGroups';
import Leaderboard from './components/Leaderboard';
import SidebarWidgets from './components/SidebarWidgets';
import DetailViewHub from './components/DetailViewHub';
import AuthModule from './components/AuthModule';
import AiMentorSection from './components/AiMentorSection';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Current tab state switcher
  const [activeTab, setActiveTab] = useState<'discussion' | 'resources' | 'events' | 'members' | 'qa' | 'groups' | 'leaderboard' | 'mentor'>('discussion');

  // Selected Detail Page Selector
  const [selectedDetail, setSelectedDetail] = useState<{ type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member'; id: string } | null>(null);

  // Helper code to handle tab clicks and always reset selectedDetail pop-up/view
  const handleSelectTab = (tab: 'discussion' | 'resources' | 'events' | 'members' | 'qa' | 'groups' | 'leaderboard' | 'mentor') => {
    setActiveTab(tab);
    setSelectedDetail(null);
    setSearchQuery('');
  };

  const handleHashtagClick = (tag: string) => {
    setSelectedDetail(null);
    setSearchQuery(tag);
  };

  const [userPoints, setUserPoints] = useState<number>(350);

  const onUpdateUserPoints = (p: number) => {
    setUserPoints(prev => prev + p);
  };

  // Search input query
  const [searchQuery, setSearchQuery] = useState('');

  // Main shared reactive database states
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [groups, setGroups] = useState<StudyGroup[]>(INITIAL_GROUPS);

  // Simulated identity/accounts lists
  const availableAccounts = [
    {
      id: 'acc-1',
      name: 'Trần Văn Hoàng',
      role: 'Student' as UserRole,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hoang'
    },
    {
      id: 'acc-2',
      name: 'Thầy Phạm Đức Minh',
      role: 'Instructor' as UserRole,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DucMinh'
    },
    {
      id: 'acc-3',
      name: 'Nguyễn Thị Minh',
      role: 'Mentor' as UserRole,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh'
    }
  ];

  const [currentUser, setCurrentUser] = useState(availableAccounts[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Display helpful alert confirmation
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSwitchAccount = (acc: typeof availableAccounts[0]) => {
    setCurrentUser(acc);
    setIsLoginModalOpen(false);
    showToast(`Đã chuyển đổi tài khoản: Đăng nhập với tư cách ${acc.name} (${acc.role}) thành công!`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 relative">
      
      {/* Toast Alert Notice */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-55 bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-750"
          >
            <Check size={14} className="text-emerald-500 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header element */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-cyan-100 py-4 shadow-sm select-none">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleSelectTab('discussion')}>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200">
              <span className="text-white font-extrabold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 tracking-tight leading-tight">
                SmartLMS Hub
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">distributed learning hub</p>
            </div>
          </div>

          {/* Search bar & Live accounts actions */}
          <div className="flex flex-wrap items-center justify-end gap-3.5 w-full sm:w-auto">
            
            {/* Search Input field */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm thảo luận, tài liệu, lớp học..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-100/80 border-none text-slate-700 placeholder-slate-450 rounded-full w-48 sm:w-64 focus:ring-2 focus:ring-cyan-500 focus:bg-white text-xs transition-all outline-none font-medium"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-450" />
            </div>

            {/* Profile Action dropdown login switcher */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 border border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
              >
                <LogIn size={13} />
                <span>Đổi Vai Trò</span>
              </button>

              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 border-2 border-white shadow shadow-cyan-100 shrink-0">
                  <img src={currentUser.avatar} alt="Author avatar" referrerPolicy="no-referrer" />
                </div>
                <div className="hidden md:block text-left">
                  <span className="text-xs font-bold text-slate-800 block leading-tight">{currentUser.name}</span>
                  <span className="text-[9px] bg-cyan-50 border border-cyan-100 text-cyan-700 px-2 py-0.2 rounded-full uppercase tracking-tighter font-black">
                    {currentUser.role}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Navigation menu tab list */}
      <nav className="bg-white border-b border-cyan-100 sticky top-[73px] md:top-[69px] z-40 shadow-sm select-none overflow-x-auto">
        <div className="container mx-auto px-6 flex gap-6 md:gap-8 whitespace-nowrap min-w-max">
          <button 
            onClick={() => handleSelectTab('discussion')}
            className={`py-3.5 text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'discussion' ? 'border-cyan-600 text-cyan-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-cyan-600'
            }`}
          >
            <MessageSquare size={15} />
            Diễn đàn Thảo luận
          </button>

          <button 
            onClick={() => handleSelectTab('resources')}
            className={`py-3.5 text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'resources' ? 'border-cyan-600 text-cyan-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-cyan-600'
            }`}
          >
            <BookOpen size={15} />
            Chia sẻ Tài nguyên
          </button>

          <button 
            onClick={() => handleSelectTab('events')}
            className={`py-3.5 text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'events' ? 'border-cyan-600 text-cyan-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-cyan-600'
            }`}
          >
            <Calendar size={15} />
            Danh sách Sự kiện
          </button>

          <button 
            onClick={() => handleSelectTab('qa')}
            className={`py-3.5 text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'qa' ? 'border-cyan-600 text-cyan-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-cyan-600'
            }`}
          >
            <HelpCircle size={15} />
            Chuyên mục Q&amp;A
          </button>

          <button 
            onClick={() => handleSelectTab('groups')}
            className={`py-3.5 text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'groups' ? 'border-cyan-600 text-cyan-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-cyan-600'
            }`}
          >
            <GraduationCap size={15} />
            Nhóm tự học chung
          </button>

          <button 
            onClick={() => handleSelectTab('members')}
            className={`py-3.5 text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'members' ? 'border-cyan-600 text-cyan-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-cyan-600'
            }`}
          >
            <Users size={15} />
            Danh mục Thành viên
          </button>

          <button 
            onClick={() => handleSelectTab('leaderboard')}
            className={`py-3.5 text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'leaderboard' ? 'border-cyan-600 text-cyan-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-cyan-600'
            }`}
          >
            <Trophy size={15} />
            Bảng vinh danh
          </button>

          <button 
            onClick={() => handleSelectTab('mentor')}
            className={`py-3.5 text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'mentor' ? 'border-cyan-600 text-cyan-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-cyan-600'
            }`}
          >
            <Sparkles size={15} className="text-pink-500 animate-pulse" />
            Trợ Lý AI Mentor (Hot)
          </button>
        </div>
      </nav>

      {/* Main Container Workspace layout */}
      <main className="container mx-auto px-4 py-6 md:py-8 flex flex-col lg:flex-row gap-6 md:gap-8 flex-1">
        
        {/* Left Sidebar: Channels & Tags */}
        <aside className="w-56 hidden xl:flex flex-col gap-2 shrink-0 select-none">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kênh học tập & Thảo luận</div>
          
          <button 
            onClick={() => handleSelectTab('discussion')}
            className={`flex items-center gap-3 px-3.5 py-2.5 text-left text-xs font-bold rounded-xl transition-all ${activeTab === 'discussion' ? 'bg-white shadow-sm text-cyan-600 font-extrabold border border-cyan-100/55' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span className={activeTab === 'discussion' ? 'text-cyan-500 font-black text-sm' : 'text-slate-400 text-sm'}>#</span> Thảo luận chung
          </button>
          
          <button 
            onClick={() => handleSelectTab('qa')}
            className={`flex items-center gap-3 px-3.5 py-2.5 text-left text-xs font-bold rounded-xl transition-all ${activeTab === 'qa' ? 'bg-white shadow-sm text-cyan-600 font-extrabold border border-cyan-100/55' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span className={activeTab === 'qa' ? 'text-cyan-500 font-black text-sm' : 'text-slate-400 text-sm'}>#</span> Giải đáp thắc mắc (Q&A)
          </button>

          <button 
            onClick={() => handleSelectTab('resources')}
            className={`flex items-center gap-3 px-3.5 py-2.5 text-left text-xs font-bold rounded-xl transition-all ${activeTab === 'resources' ? 'bg-white shadow-sm text-cyan-600 font-extrabold border border-cyan-100/55' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span className={activeTab === 'resources' ? 'text-cyan-500 font-black text-sm' : 'text-slate-400 text-sm'}>#</span> Kho tài nguyên
          </button>

          <button 
            onClick={() => handleSelectTab('events')}
            className={`flex items-center gap-3 px-3.5 py-2.5 text-left text-xs font-bold rounded-xl transition-all ${activeTab === 'events' ? 'bg-white shadow-sm text-cyan-600 font-extrabold border border-cyan-100/55' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span className={activeTab === 'events' ? 'text-cyan-500 font-black text-sm' : 'text-slate-400 text-sm'}>#</span> Tin tức & Sự kiện
          </button>

          <button 
            onClick={() => handleSelectTab('groups')}
            className={`flex items-center gap-3 px-3.5 py-2.5 text-left text-xs font-bold rounded-xl transition-all ${activeTab === 'groups' ? 'bg-white shadow-sm text-cyan-600 font-extrabold border border-cyan-100/55' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span className={activeTab === 'groups' ? 'text-cyan-500 font-black text-sm' : 'text-slate-400 text-sm'}>#</span> Nhóm tự học
          </button>

          <button 
            onClick={() => handleSelectTab('mentor')}
            className={`flex items-center gap-3 px-3.5 py-2.5 text-left text-xs font-bold rounded-xl transition-all ${activeTab === 'mentor' ? 'bg-white shadow-sm text-cyan-600 font-extrabold border border-cyan-100/55' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
          >
            <Sparkles size={14} className="text-pink-500 animate-pulse shrink-0" />
            <span className="truncate">Trợ lý AI Mentor (Hot)</span>
          </button>

          <div className="mt-6 px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Từ khóa tiêu biểu</div>
          <div className="flex flex-wrap gap-2 px-3">
            <button onClick={() => handleHashtagClick('.NET')} className="px-2 py-1 bg-cyan-100 text-cyan-700 text-[10px] font-bold rounded-lg hover:bg-cyan-200 transition-colors cursor-pointer">#dotnet</button>
            <button onClick={() => handleHashtagClick('C#')} className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-lg hover:bg-blue-200 transition-colors cursor-pointer">#csharp</button>
            <button onClick={() => handleHashtagClick('SQL')} className="px-2 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-lg hover:bg-purple-200 transition-colors cursor-pointer">#database</button>
            <button onClick={() => handleHashtagClick('Structures')} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg hover:bg-emerald-200 transition-colors cursor-pointer">#algorithms</button>
            <button onClick={() => handleHashtagClick('AI')} className="px-2 py-1 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg hover:bg-rose-200 transition-colors cursor-pointer">#ai</button>
          </div>
        </aside>

        {/* Navigated tab views content panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.15 }}
            >
              {selectedDetail ? (
                <DetailViewHub
                  selectedDetail={selectedDetail}
                  onBack={() => setSelectedDetail(null)}
                  currentUser={{
                    id: currentUser.id,
                    name: currentUser.name,
                    role: currentUser.role,
                    avatar: currentUser.avatar,
                    major: 'Kỹ nghệ Phần mềm',
                    points: userPoints
                  }}
                  posts={posts}
                  setPosts={setPosts}
                  resources={resources}
                  setResources={setResources}
                  events={events}
                  setEvents={setEvents}
                  questions={questions}
                  setQuestions={setQuestions}
                  groups={groups}
                  setGroups={setGroups}
                  showToast={showToast}
                  onUpdateUserPoints={onUpdateUserPoints}
                  onSelectItem={(type, id) => setSelectedDetail({ type, id })}
                />
              ) : (
                <>
                  {activeTab === 'discussion' && (
                    <ForumFeed 
                      posts={posts} 
                      setPosts={setPosts} 
                      currentUser={currentUser} 
                      searchQuery={searchQuery} 
                      onSelectItem={(type, id) => setSelectedDetail({ type, id })}
                    />
                  )}

                  {activeTab === 'resources' && (
                    <ResourceSharing 
                      resources={resources} 
                      setResources={setResources} 
                      currentUser={currentUser} 
                      searchQuery={searchQuery} 
                      onSelectItem={(type, id) => setSelectedDetail({ type, id })}
                    />
                  )}

                  {activeTab === 'events' && (
                    <EventListings 
                      events={events} 
                      setEvents={setEvents} 
                      searchQuery={searchQuery} 
                      onSelectItem={(type, id) => setSelectedDetail({ type, id })}
                    />
                  )}

                  {activeTab === 'qa' && (
                    <QASection 
                      questions={questions} 
                      setQuestions={setQuestions} 
                      currentUser={currentUser} 
                      searchQuery={searchQuery} 
                      onSelectItem={(type, id) => setSelectedDetail({ type, id })}
                    />
                  )}

                  {activeTab === 'groups' && (
                    <StudyGroups 
                      groups={groups} 
                      setGroups={setGroups} 
                      currentUser={currentUser} 
                      searchQuery={searchQuery} 
                      onSelectItem={(type, id) => setSelectedDetail({ type, id })}
                    />
                  )}

                  {activeTab === 'members' && (
                    <MemberDirectory 
                      searchQuery={searchQuery} 
                      onSelectItem={(type, id) => setSelectedDetail({ type, id })}
                    />
                  )}

                  {activeTab === 'leaderboard' && (
                    <Leaderboard 
                      entries={THE_LEADERBOARD} 
                      onSelectItem={(type, id) => setSelectedDetail({ type, id })}
                    />
                  )}

                  {activeTab === 'mentor' && (
                    <AiMentorSection
                      currentUser={{
                        id: currentUser.id,
                        name: currentUser.name,
                        role: currentUser.role,
                        avatar: currentUser.avatar,
                        major: 'Kỹ nghệ Phần mềm',
                        points: userPoints
                      }}
                      onUpdateUserPoints={onUpdateUserPoints}
                      showToast={showToast}
                    />
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar widgets container */}
        <SidebarWidgets onSelectItem={(type, id) => setSelectedDetail({ type, id })} />

      </main>

      {/* Footer information panel */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center select-none">
        <div className="container mx-auto px-4 text-slate-400 text-xs font-semibold uppercase tracking-wider space-y-1">
          <p>&copy; 2026 SmartLMS.AI Community Hub. Môi trường học tập phân tán cao chu đáo.</p>
          <p className="text-[9px] font-medium text-slate-350">Hệ thống học tập thông minh & vinh danh học thuật trực quan.</p>
        </div>
      </footer>

      {/* Account Selection Modal & Integrated AuthModule Secure Portal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <AuthModule
            onLogin={(user) => {
              setCurrentUser({
                id: user.id,
                name: user.name,
                role: user.role,
                avatar: user.avatar
              });
              setUserPoints(user.points);
            }}
            onClose={() => setIsLoginModalOpen(false)}
            currentUser={currentUser}
            showToast={showToast}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
