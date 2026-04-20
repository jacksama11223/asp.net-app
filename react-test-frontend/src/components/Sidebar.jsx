import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Zap, 
  Settings, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: Zap, label: 'AI Predictor', path: '/ai' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen border-r border-border-base bg-card-base flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
          <Zap className="text-white fill-white" size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight text-text-primary">SmartLMS<span className="text-brand-primary">.AI</span></span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-brand-primary/10 text-brand-primary" 
                  : "text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-text-primary"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={cn(isActive && "animate-pulse")} />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && (
                <motion.div layoutId="active" className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-4 border border-border-base">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
              <HelpCircle size={16} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">AI Support</span>
          </div>
          <p className="text-[11px] text-text-secondary mb-3">Learn how to maximize student engagement with AI insights.</p>
          <button className="w-full py-2 bg-card-base border border-border-base rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            View Tutorials
          </button>
        </div>
      </div>
    </aside>
  );
};
