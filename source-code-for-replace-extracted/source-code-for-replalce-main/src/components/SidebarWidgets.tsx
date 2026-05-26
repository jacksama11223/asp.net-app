import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, Users, Award, BookOpen, Clock, Heart, X, Sparkles } from 'lucide-react';
import { ANNOUNCEMENTS, THE_LEADERBOARD } from '../data/mockData';

interface SidebarWidgetsProps {
  onSelectItem?: (type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member', id: string) => void;
}

export default function SidebarWidgets({ onSelectItem }: SidebarWidgetsProps) {
  const [expandedAnnId, setExpandedAnnId] = useState<string | null>(null);
  const [selectedMemberBubble, setSelectedMemberBubble] = useState<{ name: string; avatar: string; phrase: string } | null>(null);

  const customPhrases = [
    "Đang chăm chỉ code bài tập .NET Core!",
    "Bị lỗi CORS bí nãy giờ, cứu tui với!",
    "Hôm nay quyết tâm giải xong 5 bài LeetCode.",
    "Webinar tối nay hot lắm nè, mọi người nhớ đăng ký nha.",
    "Clean Architecture viết khó nhưng sướng thật sự.",
    "Môn Cấu trúc dữ liệu học khó quá huhu.",
    "Có ai muốn kết bạn lập nhóm học SQL không?",
    "Hỏi đáp trên SmartLMS siêu nhanh, thích ghê!"
  ];

  const handleActiveMemberClick = (name: string, avatar: string, index: number) => {
    setSelectedMemberBubble({
      name,
      avatar,
      phrase: customPhrases[index % customPhrases.length]
    });
  };

  return (
    <aside className="w-80 hidden lg:block space-y-6 shrink-0 select-none">
      
      {/* Announcements Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
        <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-cyan-500 rounded-full inline-block"></span>
          <Megaphone size={16} className="text-cyan-500 animate-pulse" />
          Thông báo mới nhất (Announcements)
        </h3>

        <ul className="space-y-4">
          {ANNOUNCEMENTS.map((ann, index) => {
            const isExpanded = expandedAnnId === ann.id;
            return (
              <li 
                key={ann.id} 
                onClick={() => setExpandedAnnId(isExpanded ? null : ann.id)}
                className="group cursor-pointer border-b border-slate-50 last:border-none pb-3 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold text-slate-700 group-hover:text-cyan-600 transition-colors leading-snug">
                    {ann.title}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[10px] text-slate-400 font-semibold">{ann.time}</span>
                  <span className="text-[10px] text-cyan-600 font-bold group-hover:underline">
                    {isExpanded ? 'Thu nhỏ' : 'Xem chi tiết'}
                  </span>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-slate-50 border border-slate-100 rounded-xl p-2.5 mt-2 text-[11px] text-slate-500 whitespace-pre-wrap leading-relaxed"
                    >
                      {ann.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Active Members Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
        <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-blue-500 rounded-full inline-block"></span>
          <Users size={16} className="text-blue-500" />
          Thành viên trực tuyến ({THE_LEADERBOARD.length})
        </h3>

        <div className="grid grid-cols-4 gap-3">
          {THE_LEADERBOARD.map((member, idx) => (
            <div
              key={member.name}
              onClick={() => {
                handleActiveMemberClick(member.name, member.avatar, idx);
                onSelectItem?.('member', member.name);
              }}
              title={`Trạng thái của ${member.name} (Bấm xem hồ sơ)`}
              className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden border-2 border-white shadow-sm hover:scale-110 hover:border-cyan-500 transition-all cursor-pointer relative group-row/avatar"
            >
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-xs font-bold text-cyan-600 hover:bg-cyan-50 py-2.5 rounded-xl transition-all border border-dashed border-cyan-200">
          Mời bạn cùng học chung bài
        </button>
      </div>

      {/* Active Speech bubbles dialog feedback card */}
      <AnimatePresence>
        {selectedMemberBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="bg-cyan-50/70 border border-cyan-100 rounded-2xl p-4 flex gap-3 relative shadow-inner shadow-cyan-100/30"
          >
            <button 
              onClick={() => setSelectedMemberBubble(null)}
              className="absolute top-2 right-2 text-cyan-600 hover:text-cyan-800 rounded-lg p-0.5"
            >
              <X size={14} />
            </button>
            <div 
              onClick={() => onSelectItem?.('member', selectedMemberBubble.name)}
              className="w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 shadow border border-cyan-100 cursor-pointer"
              title="Xem hồ sơ"
            >
              <img src={selectedMemberBubble.avatar} alt="Avatar member selected" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p 
                onClick={() => onSelectItem?.('member', selectedMemberBubble.name)}
                className="text-[10px] text-cyan-700 font-bold uppercase tracking-wider hover:text-cyan-650 hover:underline cursor-pointer"
                title="Xem hồ sơ"
              >
                {selectedMemberBubble.name}
              </p>
              <p className="text-[11.5px] text-slate-800 leading-tight italic font-medium mt-1">
                "{selectedMemberBubble.phrase}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips educational container widget */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-xs text-slate-500 space-y-2.5">
        <h4 className="font-bold text-slate-700 flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-500" />
          Học tập thông minh cùng AI
        </h4>
        <p className="leading-relaxed">
          Sử dụng nút thảo luận để chia sẻ kiến thức hữu hiệu. Câu trả lời chính xác được thầy cô gắn nhãn <strong>Giải Pháp chuẩn</strong> sẽ nhận ngay <strong>+50 điểm tích lũy</strong> vào bảng xếp hạng!
        </p>
      </div>

    </aside>
  );
}
