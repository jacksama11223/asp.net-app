import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';
import { COURSE_TRENDS, AI_RISK_DATA, RECENT_ACTIVITY } from '../utils/mockData';
import { Zap, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const Card = ({ children, className }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-card-base border border-border-base rounded-3xl p-6 shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

export const Dashboard = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <section>
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
          Welcome back, <span className="text-gradient">Admin</span> 👋
        </h1>
        <p className="text-text-secondary mt-1">Here is what's happening with your students today.</p>
      </section>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '12,450', change: '+12%', color: 'brand-primary' },
          { label: 'Avg. Progress', value: '78%', change: '+5%', color: 'brand-secondary' },
          { label: 'Active Courses', value: '156', change: '+8', color: 'brand-accent' },
          { label: 'AI Accuracy', value: '94.2%', change: '+1.5%', color: 'emerald-500' },
        ].map((stat, i) => (
          <Card key={i} className="hover:border-brand-primary/20 transition-all duration-300">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-text-primary">{stat.value}</h3>
              <span className={`text-xs font-bold bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg`}>
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Trend Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <TrendingUp size={20} className="text-brand-primary" />
                Enrollment Trends
              </h3>
              <p className="text-xs text-text-secondary">Growth analysis over the last 6 months</p>
            </div>
            <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-1.5 text-xs font-bold outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COURSE_TRENDS}>
                <defs>
                  <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b20" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="enrollments" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorEnroll)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Prediction Chart */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Zap size={20} className="text-yellow-400 fill-yellow-400" />
            <h3 className="text-lg font-bold text-text-primary">AI Risk Analysis</h3>
          </div>
          
          <div className="space-y-6">
            {AI_RISK_DATA.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-text-secondary">{item.name}</span>
                  <span className="text-text-primary">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex gap-3">
              <AlertTriangle className="text-amber-500 shrink-0" size={18} />
              <p className="text-[11px] leading-relaxed text-amber-500/90 font-medium">
                AI has detected 12 students with declining engagement patterns in the last 24 hours. Consider sending a nudge.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
            <Clock size={20} className="text-brand-secondary" />
            Recent Activity
          </h3>
          <div className="space-y-5">
            {RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start pb-4 border-b border-border-base last:border-0 border-dashed">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  activity.type === 'achievement' ? 'bg-emerald-500/10 text-emerald-500' :
                  activity.type === 'ai_alert' ? 'bg-amber-500/10 text-amber-500' :
                  'bg-brand-primary/10 text-brand-primary'
                }`}>
                  {activity.type === 'achievement' ? <CheckCircle2 size={16} /> :
                   activity.type === 'ai_alert' ? <AlertTriangle size={16} /> :
                   <TrendingUp size={16} />}
                </div>
                <div>
                  <p className="text-sm text-text-primary">
                    <span className="font-bold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-[10px] text-text-secondary mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-xs font-bold text-brand-primary hover:underline">
            View All Logs
          </button>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Create Course', icon: BookOpen, desc: 'Add new content', color: 'bg-brand-primary' },
            { label: 'Invite Student', icon: Users, desc: 'Bulk or individual', color: 'bg-brand-secondary' },
            { label: 'AI Prediction', icon: Zap, desc: 'Run latest model', color: 'bg-yellow-500' },
            { label: 'Export Data', icon: TrendingUp, desc: 'CSV or JSON', color: 'bg-emerald-500' },
          ].map((action, i) => (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={i} 
              className="bg-card-base border border-border-base rounded-3xl p-6 text-left hover:shadow-xl hover:border-brand-primary/20 transition-all flex flex-col justify-between"
            >
              <div className={`w-10 h-10 rounded-xl ${action.color} text-white flex items-center justify-center mb-4`}>
                <action.icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">{action.label}</h4>
                <p className="text-[11px] text-text-secondary mt-1">{action.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
};
