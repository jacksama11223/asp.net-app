import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  FileText, 
  Search, 
  Upload, 
  ThumbsUp, 
  File, 
  CheckCircle,
  FileCode,
  Tag,
  BookOpen
} from 'lucide-react';
import { Resource, UserRole } from '../types';

interface ResourceSharingProps {
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  currentUser: { name: string; avatar: string; role: UserRole };
  searchQuery: string;
  onSelectItem?: (type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member', id: string) => void;
}

export default function ResourceSharing({ resources, setResources, currentUser, searchQuery, onSelectItem }: ResourceSharingProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSubject, setNewSubject] = useState('.NET Development');
  const [newFileType, setNewFileType] = useState('PDF');
  const [newSize, setNewSize] = useState('3.5 MB');

  const [activeSubject, setActiveSubject] = useState<string>('All');

  // Subjects list
  const subjects = ['All', '.NET Development', 'Database Systems', 'General Info'];

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newRes: Resource = {
      id: `res-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      subject: newSubject,
      downloadCount: 0,
      fileSize: newSize,
      fileType: newFileType,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedByUser: false
    };

    setResources([newRes, ...resources]);
    setNewTitle('');
    setNewDesc('');
    setIsUploading(false);
  };

  const handleLike = (resId: string) => {
    setResources(prev => prev.map(r => {
      if (r.id === resId) {
        return {
          ...r,
          likes: r.likedByUser ? r.likes - 1 : r.likes + 1,
          likedByUser: !r.likedByUser
        };
      }
      return r;
    }));
  };

  const handleDownloadStub = (resId: string) => {
    setResources(prev => prev.map(r => {
      if (r.id === resId) {
        return { ...r, downloadCount: r.downloadCount + 1 };
      }
      return r;
    }));
    alert(`Bắt đầu tải file tài liệu học tập của SmartLMS thành công!`);
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = activeSubject === 'All' || res.subject === activeSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Search and filter header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <BookOpen size={14} className="text-slate-400" /> Môn học:
          </span>
          {subjects.map(subj => (
            <button
              key={subj}
              onClick={() => setActiveSubject(subj)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                activeSubject === subj 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {subj === 'All' ? 'Tất cả tài liệu' : subj}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsUploading(!isUploading)}
          className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
        >
          <Upload size={16} />
          Đăng tài liệu mới
        </button>
      </div>

      {/* Upload Slide Panel */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleUpload} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Upload size={16} className="text-cyan-500" />
                  Chia sẻ tài liệu & Đề thi thử
                </h3>
                <button
                  type="button"
                  onClick={() => setIsUploading(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Hủy bỏ
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Tiêu đề tài liệu (ví dụ: Tổng hợp đề thi thử DSA kỳ 1 năm 2025)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 font-medium placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
                />

                <textarea
                  required
                  placeholder="Mô tả nội dung tài liệu, cách tải hoặc tóm tắt các điểm quan trọng..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition-all text-sm"
                />

                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Môn học / Lĩnh vực</label>
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full bg-slate-50 border-none text-sm px-4 py-2.5 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value=".NET Development">.NET Development</option>
                      <option value="Database Systems">Database Systems</option>
                      <option value="General Info">General Info</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Định dạng</label>
                    <select
                      value={newFileType}
                      onChange={(e) => setNewFileType(e.target.value)}
                      className="w-full bg-slate-50 border-none text-sm px-4 py-2.5 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOCX">DOCX</option>
                      <option value="ZIP">ZIP</option>
                      <option value="RAR">RAR</option>
                      <option value="XLSX">XLSX</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Dung lượng</label>
                    <input
                      type="text"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      placeholder="e.g. 2.4 MB"
                      className="w-full bg-slate-50 border-none text-sm px-4 py-2.5 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm px-6 py-2 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Xác nhận tải lên
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.length > 0 ? (
          filteredResources.map(res => (
            <motion.div
              key={res.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onSelectItem?.('resource', res.id)}
              className="bg-white rounded-2xl p-5 border border-slate-100 flex gap-4 hover:shadow-md transition-all group/res cursor-pointer"
            >
              {/* Left File Type Graphic Icon */}
              <div className="w-12 h-14 bg-cyan-50 group-hover/res:bg-cyan-100/80 rounded-xl flex flex-col items-center justify-center border border-cyan-100/50 shrink-0 text-cyan-600 font-bold transition-all">
                <FileText size={20} className="mb-0.5" />
                <span className="text-[9px] uppercase tracking-wider">{res.fileType}</span>
              </div>

              {/* Right Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {res.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {res.fileSize}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mt-1 mb-1 leading-snug group-hover/res:text-cyan-600 transition-all truncate">
                    {res.title}
                  </h4>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                {/* Footer of resource */}
                <div className="pt-3 mt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-200">
                      <img src={res.authorAvatar} alt={res.authorName} referrerPolicy="no-referrer" />
                    </div>
                    <span className="font-medium truncate max-w-[100px] text-slate-500">{res.authorName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleLike(res.id); }}
                      className={`flex items-center gap-1 p-1 hover:text-rose-600 transition-all ${res.likedByUser ? 'text-rose-500 font-bold' : ''}`}
                    >
                      <ThumbsUp size={13} className={res.likedByUser ? 'fill-rose-500' : ''} />
                      <span>{res.likes}</span>
                    </button>

                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDownloadStub(res.id); }}
                      className="flex items-center gap-1 bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-600 px-2.5 py-1 rounded-lg font-bold transition-all"
                    >
                      <Download size={13} />
                      <span>{res.downloadCount}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 space-y-2">
            <p className="font-bold">Không tìm thấy tài liệu phù hợp.</p>
            <p className="text-xs">Hãy sửa đổi nội dung tìm kiếm hoặc chuyển sang bộ lọc khác.</p>
          </div>
        )}
      </div>
    </div>
  );
}
