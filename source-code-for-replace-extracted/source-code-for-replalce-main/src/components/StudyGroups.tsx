import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Plus, CheckCircle, HelpCircle, GraduationCap, Video, BookOpen } from 'lucide-react';
import { StudyGroup } from '../types';

interface StudyGroupsProps {
  groups: StudyGroup[];
  setGroups: React.Dispatch<React.SetStateAction<StudyGroup[]>>;
  currentUser: { name: string; avatar: string };
  searchQuery: string;
  onSelectItem?: (type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member', id: string) => void;
}

export default function StudyGroups({ groups, setGroups, currentUser, searchQuery, onSelectItem }: StudyGroupsProps) {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSubject, setNewSubject] = useState('.NET Development');
  const [newDesc, setNewDesc] = useState('');
  const [newMaxMembers, setNewMaxMembers] = useState(50);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDesc.trim()) return;

    const newGroup: StudyGroup = {
      id: `grp-${Date.now()}`,
      name: newName,
      subject: newSubject,
      memberCount: 1, // creator is the first member
      maxMembers: newMaxMembers,
      description: newDesc,
      creatorName: currentUser.name,
      joinedByUser: true,
      nextMeeting: undefined
    };

    setGroups([newGroup, ...groups]);
    setNewName('');
    setNewDesc('');
    setIsCreatingGroup(false);
  };

  const handleJoinLeave = (id: string) => {
    setGroups(prev => prev.map(grp => {
      if (grp.id === id) {
        const joined = grp.joinedByUser;
        return {
          ...grp,
          memberCount: joined ? grp.memberCount - 1 : grp.memberCount + 1,
          joinedByUser: !joined
        };
      }
      return grp;
    }));
  };

  const filteredGroups = groups.filter(grp => {
    const matchesSearch = 
      grp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grp.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Category header action banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <GraduationCap size={16} className="text-cyan-500" />
          <span>Danh sách phòng tự học và nhóm học</span>
        </div>

        <button
          onClick={() => setIsCreatingGroup(!isCreatingGroup)}
          className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
        >
          <Plus size={16} />
          Tạo nhóm học mới
        </button>
      </div>

      {/* Creation form slide */}
      <AnimatePresence>
        {isCreatingGroup && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleCreateGroup} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-sm">Tạo nhóm học viên mới</h3>
                <button
                  type="button"
                  onClick={() => setIsCreatingGroup(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Hủy bỏ
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Tên nhóm học tập (Đọc sách lập trình, Ôn giải thuật...)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 font-medium placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Chọn chủ đề</label>
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full bg-slate-50 border-none text-sm px-4 py-2.5 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value=".NET Development">.NET Development</option>
                      <option value="Algorithms">Algorithms</option>
                      <option value="Database Systems">Database Systems</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Thành viên tối đa</label>
                    <input
                      type="number"
                      required
                      min={5}
                      max={200}
                      value={newMaxMembers}
                      onChange={(e) => setNewMaxMembers(parseInt(e.target.value) || 50)}
                      className="w-full bg-slate-50 border-none text-sm px-4 py-2.5 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <textarea
                  required
                  placeholder="Mô tả mục tiêu của nhóm, lịch trình thảo luận chung, kỳ vọng..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition-all text-sm"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm px-6 py-2 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Xác nhận Tạo Nhóm
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Study Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredGroups.length > 0 ? (
          filteredGroups.map(grp => (
            <motion.div
              key={grp.id}
              layout
              className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-all space-y-4"
            >
              {/* Header block details */}
              <div 
                onClick={() => onSelectItem?.('group', grp.id)}
                className="cursor-pointer group/grp space-y-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    {grp.subject}
                  </span>
                  
                  <span className="text-[10.5px] font-semibold text-slate-450 flex items-center gap-1 shrink-0">
                    <Users size={12} className="text-cyan-500" />
                    <strong>{grp.memberCount}</strong>/<strong>{grp.maxMembers}</strong> thành viên
                  </span>
                </div>

                <h4 className="font-bold text-slate-800 text-base mt-2 mb-1 leading-snug group-hover/grp:text-cyan-600 transition-colors flex items-center gap-1">
                  {grp.name}
                  <span className="text-[9px] text-cyan-500 font-bold opacity-0 group-hover/grp:opacity-100 transition-opacity whitespace-nowrap">
                    (Vào phòng →)
                  </span>
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                  {grp.description}
                </p>
              </div>

              {/* Internal upcoming meeting widgets */}
              {grp.nextMeeting && (
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex items-center gap-3 text-xs text-slate-605">
                  <Video size={16} className="text-cyan-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-700 block">Lịch họp nhóm sắp tới:</span>
                    <span className="text-[10px] text-slate-400 font-medium">{grp.nextMeeting} (Online Zoom)</span>
                  </div>
                </div>
              )}

              {/* Creator details and Join CTA button */}
              <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold">
                <span className="text-[10.5px] font-bold text-slate-400">
                  Phòng của: <strong className="text-slate-600 font-bold">{grp.creatorName}</strong>
                </span>

                <button
                  onClick={() => handleJoinLeave(grp.id)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm ${
                    grp.joinedByUser
                      ? 'bg-cyan-50 text-cyan-600 border border-cyan-100 hover:bg-cyan-100 flex items-center gap-1'
                      : 'bg-cyan-600 hover:bg-cyan-700 text-white hover:shadow'
                  }`}
                >
                  {grp.joinedByUser ? (
                    <>
                      <CheckCircle size={12} />
                      Đã gia nhập nhóm
                    </>
                  ) : (
                    'Xin vào nhóm'
                  )}
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 space-y-2">
            <p className="font-bold">Không tìm thấy nhóm học nào phù hợp.</p>
            <p className="text-xs">Hãy sửa đổi nội dung tìm kiếm hoặc tự tạo một phòng mới!</p>
          </div>
        )}
      </div>
    </div>
  );
}
