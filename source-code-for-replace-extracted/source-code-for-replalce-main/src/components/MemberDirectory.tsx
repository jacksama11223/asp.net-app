import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, UserCheck, UserPlus, Mail, Award, BookOpen, Clock, X, Send } from 'lucide-react';
import { THE_LEADERBOARD } from '../data/mockData';
import { UserRole } from '../types';

interface MemberDirectoryProps {
  searchQuery: string;
  onSelectItem?: (type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member', id: string) => void;
}

interface SelectedMember {
  name: string;
  avatar: string;
  role: UserRole;
  points: number;
  badges: string[];
}

export default function MemberDirectory({ searchQuery, onSelectItem }: MemberDirectoryProps) {
  const [activeRole, setActiveRole] = useState<'all' | UserRole>('all');
  const [followingMembers, setFollowingMembers] = useState<Record<string, boolean>>({
    'Thầy Phạm Đức Minh': true,
    'Nguyễn Thị Minh': true
  });
  
  // Message Modal States
  const [messagingMember, setMessagingMember] = useState<SelectedMember | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messagesLog, setMessagesLog] = useState<string[]>([]);

  // Toggle follow/unfollow
  const toggleFollow = (name: string) => {
    setFollowingMembers(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Trigger Send Message Mock Action
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !messagingMember) return;
    
    // Simulate real local feedback
    setMessagesLog([...messagesLog, messageText]);
    setMessageText('');
  };

  const filteredMembers = THE_LEADERBOARD.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = activeRole === 'all' || member.role === activeRole;

    return matchesSearch && matchesRole;
  });

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'Instructor': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Mentor': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Admin': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-cyan-50 text-cyan-700 border-cyan-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Role select list */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2">Loc theo vai tro:</span>
          <button
            onClick={() => setActiveRole('all')}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              activeRole === 'all' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả thành viên
          </button>
          <button
            onClick={() => setActiveRole('Student')}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              activeRole === 'Student' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Học viên (Students)
          </button>
          <button
            onClick={() => setActiveRole('Instructor')}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              activeRole === 'Instructor' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Giảng viên (Instructors)
          </button>
          <button
            onClick={() => setActiveRole('Mentor')}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              activeRole === 'Mentor' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Cố vấn học tập (Mentors)
          </button>
        </div>
      </div>

      {/* Grid of Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => {
          const isFollowing = !!followingMembers[member.name];
          return (
            <motion.div
              key={member.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-between hover:shadow-md transition-all text-center relative overflow-hidden"
            >
              {/* Decorative top strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>

               <div 
                onClick={() => onSelectItem?.('member', member.name)} 
                className="space-y-3 pt-2 cursor-pointer group/member"
              >
                {/* Profile Pic */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 mx-auto group-hover/member:ring-2 group-hover/member:ring-cyan-400 transition-all">
                  <img src={member.avatar} alt={member.name} referrerPolicy="no-referrer" />
                </div>

                {/* Name & Role */}
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover/member:text-cyan-600 transition-colors">
                    {member.name}
                  </h4>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1.5 uppercase tracking-wider ${getRoleBadgeStyle(member.role)}`}>
                    {member.role}
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 justify-center max-h-12 overflow-y-hidden py-1">
                  {member.badges.map(b => (
                    <span key={b} className="bg-slate-50 text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded border border-slate-100 flex items-center gap-0.5">
                      <Award size={10} className="text-cyan-500" />
                      {b.replace(/[^\w\s\+]/g, '').trim()}
                    </span>
                  ))}
                </div>

                {/* Quick Academic stats */}
                <div className="grid grid-cols-2 gap-2 text-[11px] py-2.5 border-y border-slate-50 text-slate-500">
                  <div className="text-left pl-3">
                    <span className="block text-[10px] text-slate-400 font-medium">LMS Tích lũy</span>
                    <strong className="text-slate-700">{member.points} Điểm</strong>
                  </div>
                  <div className="text-right pr-3 border-l border-slate-50">
                    <span className="block text-[10px] text-slate-400 font-medium">Hoạt động tuần</span>
                    <strong className="text-emerald-600">+{member.weeklyGain}</strong>
                  </div>
                </div>
              </div>

              {/* Action columns */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
                <button
                  onClick={() => toggleFollow(member.name)}
                  className={`flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl transition-all ${
                    isFollowing
                      ? 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck size={13} />
                      Đã theo dõi
                    </>
                  ) : (
                    <>
                      <UserPlus size={13} />
                      Theo dõi
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setMessagingMember(member);
                    setMessagesLog([]);
                  }}
                  className="flex items-center justify-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold py-2 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  <Mail size={13} />
                  Nhắn tin
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Direct Messaging Dialog Portal */}
      <AnimatePresence>
        {messagingMember && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-md shadow-xl border border-slate-100 flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-5 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 border border-white/20">
                    <img src={messagingMember.avatar} alt={messagingMember.name} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{messagingMember.name}</h4>
                    <span className="text-[10px] bg-white/20 text-white font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {messagingMember.role}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setMessagingMember(null)}
                  className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages Feed body */}
              <div className="p-5 h-64 overflow-y-auto bg-slate-50 space-y-3 flex flex-col justify-end">
                <div className="text-center text-[10px] text-slate-400 py-1 bg-white rounded-xl border border-slate-100">
                  Phòng hội thoại riêng tư bảo mật của SmartLMS. Hoạt động của bạn tuân thủ nội quy Hub.
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {/* Default welcome answer to display real dialogue response */}
                  <div className="text-xs bg-white rounded-2xl p-3 border border-slate-100 max-w-[85%] self-start text-slate-600">
                    Chào bạn! Mình có thể giúp gì cho bạn trong việc học tập khóa học SmartLMS không?
                  </div>

                  {messagesLog.map((logMsg, idx) => (
                    <div 
                      key={idx} 
                      className="text-xs bg-cyan-600 text-white rounded-2xl p-3 max-w-[85%] ml-auto text-left"
                    >
                      {logMsg}
                    </div>
                  ))}
                </div>
              </div>

              {/* Send Form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex gap-2 bg-white">
                <input
                  type="text"
                  required
                  placeholder="Gửi tin nhắn riêng tới thành viên..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 bg-slate-50 text-xs px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white p-2.5 rounded-xl transition-all shadow active:scale-95 shrink-0"
                >
                  <Send size={15} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
