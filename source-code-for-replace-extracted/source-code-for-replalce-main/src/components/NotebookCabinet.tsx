import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookMarked, 
  X, 
  Trash2, 
  Save, 
  Sparkles, 
  Edit3, 
  Search, 
  CheckCircle, 
  ChevronRight, 
  BookOpen, 
  FileText, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Resource } from '../types';

interface NotebookCabinetProps {
  isOpen: boolean;
  onClose: () => void;
  resources: Resource[];
  bookmarkedIds: string[];
  onRemoveBookmark: (id: string) => void;
  personalNotes: { [key: string]: string };
  onSaveNote: (resourceId: string, text: string) => void;
  showToast: (msg: string) => void;
  onSelectItem?: (type: 'resource', id: string) => void;
}

export default function NotebookCabinet({
  isOpen,
  onClose,
  resources,
  bookmarkedIds,
  onRemoveBookmark,
  personalNotes,
  onSaveNote,
  showToast,
  onSelectItem
}: NotebookCabinetProps) {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'journal'>('bookmarks');
  const [selectedResId, setSelectedResId] = useState<string | null>(null);
  const [noteEditBuffer, setNoteEditBuffer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  // General journal state for overall study diaries (not resource-specific)
  const [generalJournal, setGeneralJournal] = useState(() => {
    return localStorage.getItem('smart_lms_journal') || 
      `📓 NHẬT KÝ HỌC TẬP CỦA TÔI\n--------------------------\n- Hôm nay: Bắt đầu nghiên cứu về Clean Architecture.\n- Mục tiêu ngày mai: Thực hành viết Generic Repository trong .NET Core và giải quyết các lỗi liên quan đến Async/Await.`;
  });

  useEffect(() => {
    localStorage.setItem('smart_lms_journal', generalJournal);
  }, [generalJournal]);

  // Sync buffer when selected item changes
  useEffect(() => {
    if (selectedResId) {
      setNoteEditBuffer(personalNotes[selectedResId] || '');
      setAiSummary(null);
    }
  }, [selectedResId, personalNotes]);

  const bookmarkedItems = resources.filter(r => bookmarkedIds.includes(r.id));
  const filteredBookmarks = bookmarkedItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveResourceNote = () => {
    if (!selectedResId) return;
    onSaveNote(selectedResId, noteEditBuffer);
    showToast('💾 Đã lưu trữ ghi chú cá nhân thành công!');
  };

  const handleGenerateAiSummary = async () => {
    if (!selectedResId) return;
    const item = resources.find(r => r.id === selectedResId);
    if (!item) return;

    setAiLoading(true);
    setAiSummary(null);

    try {
      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Hãy tóm tắt ngắn gọn tài liệu dưới đây dưới dạng các dấu đầu dòng gạch đầu dòng (bullet points) dễ hiểu nhất, đồng thời thêm 2 từ khóa nổi bật thích hợp:\nTên tài liệu: ${item.title}\nChủ đề: ${item.subject}\nMô tả: ${item.description}\nGhi chú cá nhân của tôi về tài liệu: ${noteEditBuffer || 'Chưa ghi chú.'}`,
          history: [],
          userRole: 'Student'
        })
      });

      if (!response.ok) throw new Error('Cổng phân tích AI lỗi');
      const data = await response.json();
      setAiSummary(data.reply);
      showToast('✨ AI đã gút lại dàn ý ghi chú cho bạn!');
    } catch (err) {
      setAiSummary('⚠️ Không thể liên lạc được với máy chủ AI. Hãy kiểm tra API Key trong menu Secrets.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[99]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[450px] max-w-full bg-white shadow-2xl z-[100] flex flex-col border-l border-slate-100"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white shadow-md shadow-pink-200">
                  <BookMarked size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-800 leading-none">Sổ Tay Học Tập</h2>
                  <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider">Phase 5: Bookmark & Notes Drawer</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Slider Switch tabs */}
            <div className="px-5 py-3 border-b border-slate-100/75 flex gap-2">
              <button
                onClick={() => { setActiveTab('bookmarks'); setSelectedResId(null); }}
                className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'bookmarks' ? 'bg-cyan-50 text-cyan-700 border border-cyan-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <BookOpen size={13} />
                Tài nguyên đã lưu ({bookmarkedIds.length})
              </button>
              <button
                onClick={() => { setActiveTab('journal'); }}
                className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'journal' ? 'bg-cyan-50 text-cyan-700 border border-cyan-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <FileText size={13} />
                Nhật ký học thuật
              </button>
            </div>

            {/* Drawer Body Area */}
            <div className="flex-1 overflow-y-auto p-5">
              
              {/* TAB 1: BOOKMARK LIST */}
              {activeTab === 'bookmarks' && (
                <div className="space-y-4 h-full flex flex-col justify-between">
                  {!selectedResId ? (
                    <div className="space-y-4 flex-1">
                      {/* Search Bar inside drawer */}
                      <div className="relative">
                        <Search size={14} className="absolute left-3.5 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Lọc tài nguyên đã lưu trữ..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder-slate-400"
                        />
                      </div>

                      {filteredBookmarks.length === 0 ? (
                        <div className="text-center py-16 space-y-3.5">
                          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl mx-auto flex items-center justify-center text-lg text-slate-400">
                            🏷️
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-slate-700">Chưa có bài lưu nào!</p>
                            <p className="text-[10px] text-slate-400 font-medium px-4 leading-relaxed mt-1">
                              Bấm biểu tượng Bookmark ở chuyên mục "Tài nguyên" ngoài trang chủ để đính kèm giáo trình và xem nhanh tại đây bất cứ lúc nào.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2.5 max-h-[460px] overflow-y-auto">
                          {filteredBookmarks.map(item => (
                            <div 
                              key={item.id}
                              className="p-3 bg-white border border-slate-100 rounded-2xl hover:border-cyan-100 hover:shadow-xs transition-all flex justify-between items-start gap-4 text-left group"
                            >
                              <div className="space-y-1.5 flex-1 min-w-0">
                                <span className="bg-slate-50 text-slate-500 border border-slate-100 text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                                  {item.subject}
                                </span>
                                <h4 className="text-xs font-bold text-slate-800 leading-snug truncate group-hover:text-cyan-600 transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-[10px] text-slate-400 font-medium truncate">
                                  Tệp tin: {item.fileType} &#183; Dung lượng: {item.fileSize}
                                </p>
                              </div>

                              <div className="flex gap-1 shrink-0">
                                <button
                                  onClick={() => setSelectedResId(item.id)}
                                  className="p-1.5 bg-cyan-50 text-cyan-600 hover:bg-cyan-100 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all"
                                  title="Ghi chép nhanh"
                                >
                                  <Edit3 size={12} />
                                  Ghi chú
                                </button>
                                <button
                                  onClick={() => onRemoveBookmark(item.id)}
                                  className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg transition-all"
                                  title="Bỏ đánh dấu"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* COMPONENT NOTE PAD EDITOR FOR SPECIFIC BOOKMARK */
                    <div className="space-y-4 flex flex-col h-full">
                      {/* Back tracker */}
                      <button
                        onClick={() => setSelectedResId(null)}
                        className="text-xs font-black text-slate-500 hover:text-cyan-600 flex items-center gap-1 transition-colors self-start"
                      >
                        &larr; Trở lại danh sách lưu trữ
                      </button>

                      {/* Header bookmark metadata */}
                      {(() => {
                        const activeItem = resources.find(r => r.id === selectedResId);
                        if (!activeItem) return null;
                        return (
                          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1.5">
                            <span className="text-[9px] font-black text-cyan-600 uppercase tracking-widest">{activeItem.subject}</span>
                            <h3 className="text-xs font-black text-slate-800 leading-snug">{activeItem.title}</h3>
                            <button
                              onClick={() => {
                                if (onSelectItem) {
                                  onSelectItem('resource', activeItem.id);
                                  onClose();
                                }
                              }}
                              className="text-[10px] text-cyan-600 hover:underline font-bold inline-flex items-center gap-0.5"
                            >
                              Xem trang tài liệu chi tiết <ArrowRight size={10} />
                            </button>
                          </div>
                        );
                      })()}

                      {/* Text editor */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Ghi chú cá nhân của tôi:</label>
                        <textarea
                          placeholder="Nhập thông tin quan trọng cần nhớ của cuốn sách, tài liệu này để ghi nhớ sâu sắc..."
                          value={noteEditBuffer}
                          onChange={(e) => setNoteEditBuffer(e.target.value)}
                          rows={6}
                          className="w-full p-3.5 bg-slate-55 border border-slate-200 text-xs font-semibold rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none leading-relaxed text-slate-850"
                        />
                      </div>

                      {/* Control buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveResourceNote}
                          className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Save size={13} />
                          Lưu trữ ghi chú
                        </button>

                        <button
                          onClick={handleGenerateAiSummary}
                          disabled={aiLoading}
                          className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-indigo-600 text-white hover:opacity-90 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                        >
                          <Sparkles size={13} className={aiLoading ? 'animate-spin' : ''} />
                          <span>{aiLoading ? 'AI phân tích...' : 'Mentor tóm tắt'}</span>
                        </button>
                      </div>

                      {/* AI Generated summary inside notebook */}
                      <AnimatePresence>
                        {aiSummary && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 text-xs mt-2 overflow-y-auto max-h-[160px] text-slate-700 leading-relaxed"
                          >
                            <span className="font-extrabold text-[9px] text-purple-700 uppercase tracking-widest block mb-1">💡 Tóm lược thông minh bằng AI:</span>
                            <div className="whitespace-pre-wrap">{aiSummary}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: GENERAL LEARNING WORK DIARY */}
              {activeTab === 'journal' && (
                <div className="space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3 flex-1 flex flex-col">
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3.5 text-[11px] text-amber-800 leading-relaxed font-semibold flex items-start gap-2">
                      <Info size={14} className="shrink-0 mt-0.5 text-amber-600" />
                      <span>
                        Đây là trang nhật ký cá nhân giúp bạn lên kế hoạch code C# và .NET mỗi ngày. Nội dung được tự động kéo dài và lưu trữ trực tuyến tại trình duyệt của bạn (Local Storage).
                      </span>
                    </div>

                    <textarea
                      value={generalJournal}
                      onChange={(e) => setGeneralJournal(e.target.value)}
                      rows={14}
                      className="w-full flex-1 p-4 bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-cyan-500 text-xs font-mono text-slate-800 leading-relaxed rounded-2xl resize-none"
                      placeholder="Gõ nhật ký học lập trình tại đây..."
                    />
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100/60">
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-emerald-500" />
                      Tự động lưu trữ khi gõ
                    </span>
                    <button
                      onClick={() => {
                        showToast('📓 Đã sao lưu bản nhật ký học lập trình của ngày hôm nay!');
                      }}
                      className="text-[10px] font-black text-cyan-600 hover:underline"
                    >
                      Bấm sao lưu thủ công
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
