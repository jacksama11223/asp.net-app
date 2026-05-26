import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronUp, 
  ChevronDown, 
  CheckCircle, 
  Plus, 
  AlertCircle, 
  MessageSquare, 
  Send,
  Sparkles,
  HelpCircle,
  Hash
} from 'lucide-react';
import { Question, Answer, UserRole } from '../types';

interface QASectionProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  currentUser: { name: string; avatar: string; role: UserRole };
  searchQuery: string;
  onSelectItem?: (type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member', id: string) => void;
}

export default function QASection({ questions, setQuestions, currentUser, searchQuery, onSelectItem }: QASectionProps) {
  const [isAsking, setIsAsking] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTagsString, setNewTagsString] = useState('React, Frontend');
  
  // Voting states
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [newAnswerText, setNewAnswerText] = useState('');

  // Ask Question
  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagsArray = newTagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newQ: Question = {
      id: `q-${Date.now()}`,
      title: newTitle,
      content: newContent,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      createdAt: new Date().toISOString(),
      votes: 0,
      votedByUser: undefined,
      answersCount: 0,
      solved: false,
      tags: tagsArray,
      answers: []
    };

    setQuestions([newQ, ...questions]);
    setNewTitle('');
    setNewContent('');
    setIsAsking(false);
  };

  // Submit Answer to Question
  const handleAnswer = (qId: string) => {
    if (!newAnswerText.trim()) return;

    const newAns: Answer = {
      id: `ans-${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      content: newAnswerText,
      createdAt: new Date().toISOString(),
      votes: 0,
      votedByUser: undefined,
      isAccepted: false
    };

    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          answersCount: q.answersCount + 1,
          answers: [...q.answers, newAns]
        };
      }
      return q;
    }));

    setNewAnswerText('');
  };

  // Vote on Question
  const handleVoteQuestion = (qId: string, dir: 'up' | 'down') => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        let diff = 0;
        let newVote: 'up' | 'down' | undefined = dir;

        if (q.votedByUser === dir) {
          diff = dir === 'up' ? -1 : 1;
          newVote = undefined;
        } else if (q.votedByUser === undefined) {
          diff = dir === 'up' ? 1 : -1;
        } else {
          diff = dir === 'up' ? 2 : -2;
        }

        return {
          ...q,
          votes: q.votes + diff,
          votedByUser: newVote
        };
      }
      return q;
    }));
  };

  // Vote on Answer
  const handleVoteAnswer = (qId: string, ansId: string, dir: 'up' | 'down') => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const updatedAnswers = q.answers.map(ans => {
          if (ans.id === ansId) {
            let diff = 0;
            let newVote: 'up' | 'down' | undefined = dir;

            if (ans.votedByUser === dir) {
              diff = dir === 'up' ? -1 : 1;
              newVote = undefined;
            } else if (ans.votedByUser === undefined) {
              diff = dir === 'up' ? 1 : -1;
            } else {
              diff = dir === 'up' ? 2 : -2;
            }

            return {
              ...ans,
              votes: ans.votes + diff,
              votedByUser: newVote
            };
          }
          return ans;
        });

        return {
          ...q,
          answers: updatedAnswers
        };
      }
      return q;
    }));
  };

  // Toggle Accept Answer (Instructors / Mentors / Creator only, let student click to toggle for mock feel)
  const toggleAcceptAnswer = (qId: string, ansId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const updatedAnswers = q.answers.map(ans => {
          if (ans.id === ansId) {
            return { ...ans, isAccepted: !ans.isAccepted };
          }
          return { ...ans, isAccepted: false }; // only one is accepted
        });

        const isAnyAccepted = updatedAnswers.some(ans => ans.isAccepted);

        return {
          ...q,
          solved: isAnyAccepted,
          answers: updatedAnswers
        };
      }
      return q;
    }));
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
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
      {/* Q&A section action header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-cyan-500 animate-pulse" />
          <span className="text-sm font-semibold text-slate-700">Chuyên mục Hỏi &amp; Đáp học tập</span>
        </div>

        <button
          onClick={() => setIsAsking(!isAsking)}
          className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
        >
          <Plus size={16} />
          Đặt câu hỏi cho Hub
        </button>
      </div>

      {/* Ask question form overlay slide */}
      <AnimatePresence>
        {isAsking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAsk} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-sm">Đặt câu hỏi học hỏi</h3>
                <button
                  type="button"
                  onClick={() => setIsAsking(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Hủy bỏ
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Tiêu đề câu hỏi ngắn gọn (Ví dụ: Tại sao EF Core báo lỗi Tracking behavior?)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 font-medium placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
                />

                <textarea
                  required
                  placeholder="Mô tả lỗi của bạn, đính kèm code block hoặc các bước xảy ra vấn đề..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition-all text-sm font-mono"
                />

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Từ khóa ngăn cách bằng dấu phẩy (,)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. C#, ASP.NET Core, EF Core"
                    value={newTagsString}
                    onChange={(e) => setNewTagsString(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm px-6 py-2 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Đăng câu hỏi
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions Stack */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(q => {
            const isExpanded = expandedQuestionId === q.id;
            return (
              <motion.div
                key={q.id}
                layout
                className={`bg-white rounded-2xl border p-6 transition-all shadow-sm ${
                  q.solved ? 'border-emerald-100/80 bg-emerald-50/10' : 'border-slate-100'
                }`}
              >
                {/* Main question visual grid */}
                <div className="flex gap-4">
                  {/* Voting component panel */}
                  <div className="flex flex-col items-center justify-center bg-slate-50 p-1.5 rounded-xl border border-slate-100 shrink-0 h-22 w-11 mt-1">
                    <button
                      onClick={() => handleVoteQuestion(q.id, 'up')}
                      className={`p-1 rounded hover:bg-slate-200 transition-all ${q.votedByUser === 'up' ? 'text-cyan-600' : 'text-slate-400'}`}
                    >
                      <ChevronUp size={20} />
                    </button>
                    <span className="text-xs font-bold text-slate-700 my-0.5">{q.votes}</span>
                    <button
                      onClick={() => handleVoteQuestion(q.id, 'down')}
                      className={`p-1 rounded hover:bg-slate-200 transition-all ${q.votedByUser === 'down' ? 'text-rose-600' : 'text-slate-400'}`}
                    >
                      <ChevronDown size={20} />
                    </button>
                  </div>

                  {/* Body content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 font-medium">
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-100">
                          <img src={q.authorAvatar} alt={q.authorName} referrerPolicy="no-referrer" />
                        </div>
                        <span className="font-bold text-slate-700">{q.authorName}</span>
                        <span className={`text-[8px] font-bold px-1 py-0.2 rounded border scale-90 ${getRoleBadgeStyle(q.authorRole)}`}>
                          {q.authorRole}
                        </span>
                        <span>&#183;</span>
                        <span>Hỏi cách đây {new Date(q.createdAt).toLocaleDateString('vi')}</span>
                      </div>

                      {q.solved ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                          <CheckCircle size={10} /> Đã giải quyết
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                          Chờ trả lời
                        </span>
                      )}
                    </div>

                    <h4 
                      onClick={() => onSelectItem?.('question', q.id)}
                      className="font-bold text-slate-800 text-base leading-snug hover:text-cyan-600 cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      {q.title}
                      <span className="text-[10px] text-cyan-500 font-bold opacity-100 transition-opacity">
                        (Mở bài thảo luận chuyên sâu →)
                      </span>
                    </h4>

                    <p className="text-slate-600 text-xs font-mono leading-relaxed truncate max-h-6">
                      {q.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {q.tags.map(t => (
                        <span key={t} className="bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <Hash size={9} />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub-Answers Panel details toggling */}
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-500">
                  <button 
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="flex items-center gap-1.5 text-cyan-600 hover:text-cyan-700"
                  >
                    <MessageSquare size={14} />
                    <span>{q.answersCount} Câu trả lời</span>
                  </button>

                  <button 
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="text-slate-400 hover:underline"
                  >
                    {isExpanded ? 'Thu gọn chi tiết' : 'Xem & Trả lời câu hỏi'}
                  </button>
                </div>

                {/* EXPANDED PANEL OF DETAILS */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-4 pt-4 border-t border-slate-100 space-y-4"
                    >
                      {/* Deep description question detail text field */}
                      <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-50 text-sm text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
                        {q.content}
                      </div>

                      {/* Answers Stack */}
                      {q.answers.length > 0 && (
                        <div className="space-y-4 pt-2">
                          <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Danh sách phản hồi</h5>
                          {q.answers.map(ans => (
                            <div 
                              key={ans.id} 
                              className={`p-4 rounded-xl border flex gap-3 ${
                                ans.isAccepted ? 'bg-emerald-50/40 border-emerald-100/80' : 'bg-white border-slate-100'
                              }`}
                            >
                              {/* Answer voting side */}
                              <div className="flex flex-col items-center shrink-0">
                                <button
                                  onClick={() => handleVoteAnswer(q.id, ans.id, 'up')}
                                  className={`p-1 rounded hover:bg-slate-100 ${ans.votedByUser === 'up' ? 'text-cyan-600' : 'text-slate-400'}`}
                                >
                                  <ChevronUp size={16} />
                                </button>
                                <span className="text-[11px] font-bold text-slate-600">{ans.votes}</span>
                                <button
                                  onClick={() => handleVoteAnswer(q.id, ans.id, 'down')}
                                  className={`p-1 rounded hover:bg-slate-100 ${ans.votedByUser === 'down' ? 'text-rose-600' : 'text-slate-400'}`}
                                >
                                  <ChevronDown size={16} />
                                </button>
                              </div>

                              {/* Answer content */}
                              <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center justify-between gap-1.5 flex-wrap text-[10px] text-slate-400">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-100">
                                      <img src={ans.authorAvatar} alt={ans.authorName} referrerPolicy="no-referrer" />
                                    </div>
                                    <span className="font-bold text-slate-700">{ans.authorName}</span>
                                    <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded border scale-90 ${getRoleBadgeStyle(ans.authorRole)}`}>
                                      {ans.authorRole}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-400">
                                      {new Date(ans.createdAt).toLocaleDateString('vi')}
                                    </span>
                                    <button
                                      onClick={() => toggleAcceptAnswer(q.id, ans.id)}
                                      className={`px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider transition-all ${
                                        ans.isAccepted
                                          ? 'bg-emerald-600 text-white'
                                          : 'bg-slate-100 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700'
                                      }`}
                                    >
                                      {ans.isAccepted ? '✓ Tốt nhất' : 'Xác nhận Giải Pháp'}
                                    </button>
                                  </div>
                                </div>

                                <p className="text-slate-600 text-xs font-mono whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-xl border border-slate-50">
                                  {ans.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Write responsive input answer form */}
                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-bold text-slate-400">Viết câu trả lời của bạn</label>
                        <div className="flex gap-2 items-end">
                          <textarea
                            placeholder="Nhập câu trả lời kỹ thuật chi tiết tại đây (hỗ trợ code)..."
                            value={newAnswerText}
                            onChange={(e) => setNewAnswerText(e.target.value)}
                            rows={2}
                            className="flex-1 bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 font-mono resize-none"
                          />
                          <button
                            onClick={() => handleAnswer(q.id)}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white p-3.5 rounded-xl transition-all shadow active:scale-95 shrink-0"
                          >
                            <Send size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        ) : (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 space-y-2">
            <AlertCircle className="mx-auto text-slate-300" size={32} />
            <p className="font-bold">Không tìm thấy câu hỏi học môn học này.</p>
            <p className="text-xs">Hãy chuyển đổi bộ lọc tìm kiếm hoặc tự đặt một câu hỏi mới!</p>
          </div>
        )}
      </div>
    </div>
  );
}
