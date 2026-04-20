import React, { useState, useEffect } from 'react';
import { createApiClient, getCourses } from '../api';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  BookOpen, 
  Clock, 
  Star,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Courses = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('slms_api_key') || '');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (apiKey) handleFetch();
  }, [apiKey]);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const client = createApiClient(apiKey);
      const data = await getCourses(client);
      setCourses(data);
    } catch (err) {
      setError('Connection failed. Please check your API Key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Courses</h1>
          <p className="text-text-secondary mt-1">Manage your curriculum and content delivery.</p>
        </div>
        <button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-primary/20 transition-all active:scale-95">
          <Plus size={20} />
          Create New Course
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search by title, instructor..." 
            className="w-full bg-card-base border border-border-base rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-primary/30 transition-all"
          />
        </div>
        <button className="bg-card-base border border-border-base rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-card-base border border-border-base rounded-3xl h-[400px] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={course.courseId} 
              className="group bg-card-base border border-border-base rounded-3xl overflow-hidden hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300"
            >
              <div className="relative h-48">
                <img 
                  src={course.thumbnailUrl || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="bg-brand-primary/90 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">
                    ID {course.courseId}
                  </span>
                  <span className="bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1">
                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                    4.8
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-text-primary line-clamp-1 group-hover:text-brand-primary transition-colors">
                    {course.courseName}
                  </h2>
                  <button className="text-text-secondary hover:text-text-primary">
                    <MoreVertical size={18} />
                  </button>
                </div>
                
                <p className="text-text-secondary text-xs line-clamp-2 mb-6 min-h-[32px]">
                  {course.summary || 'Expertly designed curriculum to master industry standards and practical skills.'}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-text-secondary">
                    <BookOpen size={14} className="text-brand-primary" />
                    <span>{course.lessonCount || 0} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-text-secondary">
                    <Users size={14} className="text-brand-secondary" />
                    <span>{course.instructorName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border-base">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Price</span>
                    <span className="text-lg font-black text-text-primary">
                      {course.price === 0 ? 'FREE' : `$${course.price}`}
                    </span>
                  </div>
                  <button className="bg-slate-100 dark:bg-slate-800 hover:bg-brand-primary hover:text-white text-text-primary text-[11px] font-black uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all">
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
