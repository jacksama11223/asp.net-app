import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Trophy, TrendingUp, Sparkles, Star, ThumbsUp } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onSelectItem?: (type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member', id: string) => void;
}

export default function Leaderboard({ entries, onSelectItem }: LeaderboardProps) {
  const [congratsLog, setCongratsLog] = useState<Record<string, number>>({});

  const triggerCongrats = (name: string) => {
    setCongratsLog(prev => ({
      ...prev,
      [name]: (prev[name] || 0) + 1
    }));
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-white shadow shadow-amber-300">
            <Trophy size={14} className="animate-bounce" />
          </div>
        );
      case 2:
        return (
          <div className="w-7 h-7 bg-slate-350 rounded-full flex items-center justify-center text-slate-800 font-bold text-xs shadow border border-slate-250">
            2
          </div>
        );
      case 3:
        return (
          <div className="w-7 h-7 bg-amber-700 rounded-full flex items-center justify-center text-amber-100 font-bold text-xs shadow border border-amber-600">
            3
          </div>
        );
      default:
        return (
          <div className="w-7 h-7 bg-slate-105 rounded-full flex items-center justify-center text-slate-650 font-bold text-xs">
            {rank}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic top motivational block */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg shadow-cyan-100/50">
        <div className="space-y-1 text-center md:text-left">
          <span className="bg-white/15 text-white/95 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-max mx-auto md:mx-0">
            <Sparkles size={11} className="text-amber-300 animate-spin" />
            Bảng vinh danh SmartLMS
          </span>
          <h3 className="font-bold text-lg md:text-xl">Bảng xếp hạng Cộng đồng Học Tập</h3>
          <p className="text-white/80 text-xs">Cố gắng tích lũy điểm học tập bằng cách trả lời câu hỏi và làm bài để được vinh danh!</p>
        </div>

        <div className="flex gap-4 items-center bg-white/10 p-3 rounded-2xl border border-white/10 text-center text-xs">
          <div>
            <span className="block text-[10px] text-white/70">Top Hoạt động Tuần</span>
            <strong className="text-base text-amber-300 flex items-center gap-1 justify-center mt-0.5">
              <TrendingUp size={15} />
              +340 Điểm
            </strong>
          </div>
        </div>
      </div>

      {/* Leaderboard Entries List Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6 text-center w-16">Thứ Hạng</th>
                <th className="py-4 px-6">Thành viên</th>
                <th className="py-4 px-6 text-center">LMS Role</th>
                <th className="py-4 px-6 text-right">Tổng LMS Điểm</th>
                <th className="py-4 px-6 text-center select-none">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {entries.map((entry) => {
                const congratsCount = congratsLog[entry.name] || 0;
                return (
                  <motion.tr
                    key={entry.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-slate-50/50 transition-colors group/row ${
                      entry.rank <= 3 ? 'bg-slate-50/20' : ''
                    }`}
                  >
                    {/* Rank Badge Column */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {getRankBadge(entry.rank)}
                      </div>
                    </td>

                    {/* Member Column */}
                    <td className="py-4 px-6">
                      <div 
                        onClick={() => onSelectItem?.('member', entry.name)}
                        className="flex items-center gap-3 cursor-pointer group/member-row"
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-150 shrink-0 group-hover/member-row:ring-2 group-hover/member-row:ring-cyan-500 transition-all">
                          <img src={entry.avatar} alt={entry.name} referrerPolicy="no-referrer" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 text-sm block truncate group-hover/row:text-cyan-600 group-hover/member-row:text-cyan-600 transition-colors">
                            {entry.name} <span className="text-[9px] text-cyan-500 font-bold opacity-0 group-hover/member-row:opacity-100 transition-opacity">(Hồ sơ →)</span>
                          </span>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {entry.badges.map(b => (
                              <span key={b} className="bg-slate-50 text-[9px] font-bold text-slate-400 px-1.5 py-0.2 rounded border border-slate-100">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role column */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                        entry.role === 'Instructor' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                        entry.role === 'Mentor' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        entry.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        'bg-cyan-55 text-cyan-705 border-cyan-100'
                      }`}>
                        {entry.role}
                      </span>
                    </td>

                    {/* Points Balance Column */}
                    <td className="py-4 px-6 text-right">
                      <div>
                        <span className="font-bold text-slate-800 text-sm">
                          {entry.points.toLocaleString('en')}
                        </span>
                        <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">
                          Tăng +{entry.weeklyGain} tuần này
                        </span>
                      </div>
                    </td>

                    {/* Action congratulations Column */}
                    <td className="py-4 px-6 text-center select-none">
                      <button
                        onClick={() => triggerCongrats(entry.name)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                          congratsCount > 0
                            ? 'bg-amber-50 text-amber-600 scale-105 border border-amber-200'
                            : 'bg-slate-100 hover:bg-amber-50 text-slate-500 hover:text-amber-600 border border-slate-100'
                        }`}
                      >
                        <Star size={12} className={congratsCount > 0 ? 'fill-amber-400 text-amber-400 animate-pulse' : ''} />
                        <span>Chúc mừng</span>
                        {congratsCount > 0 && (
                          <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full scale-95">
                            {congratsCount}
                          </span>
                        )}
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
