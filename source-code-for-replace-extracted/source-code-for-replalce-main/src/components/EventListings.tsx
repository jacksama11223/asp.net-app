import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';
import { Event } from '../types';

interface EventListingsProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  searchQuery: string;
  onSelectItem?: (type: 'post' | 'resource' | 'event' | 'question' | 'group' | 'member', id: string) => void;
}

export default function EventListings({ events, setEvents, searchQuery, onSelectItem }: EventListingsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'webinar' | 'workshop' | 'study_session'>('all');

  const handleRegister = (id: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === id) {
        return {
          ...evt,
          registeredCount: evt.registeredByUser ? evt.registeredCount - 1 : evt.registeredCount + 1,
          registeredByUser: !evt.registeredByUser
        };
      }
      return evt;
    }));
  };

  const filteredEvents = events.filter(evt => {
    const matchesSearch = 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || evt.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Category header */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeCategory === 'all' 
              ? 'bg-cyan-600 text-white shadow-sm' 
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          Tất cả sự kiện
        </button>
        <button
          onClick={() => setActiveCategory('webinar')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeCategory === 'webinar' 
              ? 'bg-purple-600 text-white shadow-sm' 
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          Webinars
        </button>
        <button
          onClick={() => setActiveCategory('workshop')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeCategory === 'workshop' 
              ? 'bg-amber-600 text-white shadow-sm' 
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          Workshops
        </button>
        <button
          onClick={() => setActiveCategory('study_session')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeCategory === 'study_session' 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          Học nhóm (Offline/Online)
        </button>
      </div>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(evt => (
            <motion.div
              key={evt.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              {/* Event Background & Speaker Header */}
              <div 
                onClick={() => onSelectItem?.('event', evt.id)}
                className="bg-slate-50 p-6 border-b border-slate-100 cursor-pointer hover:bg-slate-100/50 transition-all group/evt"
              >
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white ${
                  evt.category === 'webinar' ? 'bg-purple-600' :
                  evt.category === 'workshop' ? 'bg-amber-600' : 'bg-emerald-600'
                }`}>
                  {evt.category.replace('_', ' ')}
                </span>
                
                <h3 className="font-bold text-slate-800 text-base mt-3 mb-2 leading-snug group-hover/evt:text-cyan-600 transition-colors flex items-center gap-1">
                  {evt.title}
                  <span className="text-[9px] text-cyan-500 font-bold opacity-0 group-hover/evt:opacity-100 transition-opacity">
                    (Chi tiết →)
                  </span>
                </h3>
                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {/* Event Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={14} className="text-cyan-500 shrink-0" />
                    <span>Ngày: <strong>{new Date(evt.date).toLocaleDateString('vi', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={14} className="text-cyan-500 shrink-0" />
                    <span>Thời gian: <strong>{evt.time}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={14} className="text-cyan-500 shrink-0" />
                    <span className="truncate">Nền tảng: <strong className="text-slate-700">{evt.platform}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users size={14} className="text-cyan-500 shrink-0" />
                    <span>Số người đã đăng ký: <strong className="text-cyan-600">{evt.registeredCount} học viên</strong></span>
                  </div>
                </div>

                {/* Speaker info + Register CTA */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-slate-200">
                      <img src={evt.speakerAvatar} alt={evt.speaker} referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Diễn giả / Host</p>
                      <p className="text-xs font-bold text-slate-750 truncate">{evt.speaker}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegister(evt.id)}
                    className={`shrink-0 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm ${
                      evt.registeredByUser
                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center gap-1 border border-emerald-200/50'
                        : 'bg-cyan-600 hover:bg-cyan-700 text-white hover:shadow'
                    }`}
                  >
                    {evt.registeredByUser ? (
                      <>
                        <CheckCircle size={12} />
                        Đã đăng ký
                      </>
                    ) : (
                      'Đăng ký tham gia'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 space-y-2">
            <p className="font-bold">Không tìm thấy sự kiện nào.</p>
            <p className="text-xs">Vui lòng quay lại sau hoặc chuyển đổi bộ lọc danh mục.</p>
          </div>
        )}
      </div>
    </div>
  );
}
