import React from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Topbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-20 border-b border-border-base bg-card-base/50 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
      <div className="relative w-96 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand-primary transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search courses, students, analytics..." 
          className="w-full bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-brand-primary/30 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl flex items-center justify-center border border-border-base bg-card-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
        </button>

        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-border-base bg-card-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell size={20} className="text-text-secondary" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-card-base"></span>
        </button>

        <div className="h-8 w-px bg-border-base mx-2"></div>

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-text-primary group-hover:text-brand-primary transition-colors">Admin User</p>
            <p className="text-[10px] uppercase font-black tracking-widest text-text-secondary">Premium Plan</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-[2px]">
            <div className="w-full h-full rounded-[10px] bg-card-base flex items-center justify-center overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                alt="Avatar"
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          <ChevronDown size={14} className="text-text-secondary group-hover:translate-y-0.5 transition-transform" />
        </div>
      </div>
    </header>
  );
};
