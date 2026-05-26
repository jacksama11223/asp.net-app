import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, User, Star, Feather, UserCheck, Eye, EyeOff, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModuleProps {
  onLogin: (user: { id: string; name: string; role: UserRole; avatar: string; major?: string; points: number }) => void;
  onClose: () => void;
  currentUser: { id: string; name: string; role: UserRole; avatar: string };
  showToast: (msg: string) => void;
}

export default function AuthModule({ onLogin, onClose, currentUser, showToast }: AuthModuleProps) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign up fields
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('Student');
  const [regMajor, setRegMajor] = useState('.NET Advanced');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preset logins validation
    if (username.trim() === 'gv1' && password === '1') {
      onLogin({
        id: 'acc-2',
        name: 'Thầy Phạm Đức Minh',
        role: 'Instructor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DucMinh',
        major: 'Khoa Công nghệ thông tin',
        points: 2510,
      });
      showToast('Đăng nhập Giảng viên Thầy Phạm Đức Minh (gv1) thành công!');
      onClose();
    } else if (username.trim() === 'sv1' && password === '1') {
      onLogin({
        id: 'acc-1',
        name: 'Trần Văn Hoàng',
        role: 'Student',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hoang',
        major: '.NET Development',
        points: 840,
      });
      showToast('Đăng nhập Sinh viên Trần Văn Hoàng (sv1) thành công!');
      onClose();
    } else {
      // Custom credentials check if exists or simulation
      if (username && password) {
        onLogin({
          id: `acc-${Date.now()}`,
          name: username,
          role: 'Student',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          major: 'Học viên Tự do',
          points: 100,
        });
        showToast(`Đăng nhập thành công học viên ${username}! (Tài khoản học tự động)`);
        onClose();
      } else {
        showToast('Vui lòng điền đầy đủ thông tin đăng nhập.');
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regUsername.trim() || !regPassword.trim()) {
      showToast('Vui lòng điền đầy đủ thông tin đăng ký.');
      return;
    }

    // Register success, automatically log in
    onLogin({
      id: `reg-${Date.now()}`,
      name: regName,
      role: regRole,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${regUsername}`,
      major: regMajor,
      points: 150, // Starting bonus points
    });
    
    showToast(`Đăng ký tài khoản ${regRole} cho ${regName} thành công! Nhận +150 điểm chào mừng.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-55 p-4">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        className="bg-white rounded-3xl overflow-hidden w-full max-w-md shadow-2xl border border-slate-100/80 relative"
      >
        {/* Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600"></div>

        {/* Dynamic header of auth modal */}
        <div className="p-6 bg-slate-50 border-b border-cyan-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md text-white">
              <Shield size={20} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm tracking-tight">SmartLMS Secure Portal</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hệ thống phân quyền thông tin</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-xs bg-slate-200 hover:bg-slate-300 transition-all font-black text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-full"
          >
            Đóng
          </button>
        </div>

        {/* Main interactive form workspace */}
        <div className="p-6 space-y-5">
          {/* Banner notification advising presets */}
          <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100/50 text-xs text-cyan-800 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles size={13} className="text-cyan-600 animate-spin" />
              Tài khoản thử nghiệm sẵn có:
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10.5px]">
              <div className="bg-white/75 p-2 rounded-xl border border-cyan-100">
                <span className="block font-black text-rose-700">Giảng viên / Thầy giáo</span>
                <span>User: <strong className="font-black text-slate-850">gv1</strong> | Pass: <strong className="font-black text-slate-850">1</strong></span>
              </div>
              <div className="bg-white/75 p-2 rounded-xl border border-cyan-100">
                <span className="block font-black text-cyan-700">Sinh viên học viên</span>
                <span>User: <strong className="font-black text-slate-850">sv1</strong> | Pass: <strong className="font-black text-slate-850">1</strong></span>
              </div>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setIsLoginView(true)}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                isLoginView ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Đăng Nhập
            </button>
            <button
              onClick={() => setIsLoginView(false)}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                !isLoginView ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Đăng Ký Tài Khoản
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLoginView ? (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleLoginSubmit}
                className="space-y-4"
              >
                {/* Username Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <User size={13} className="text-slate-400" />
                    Tài khoản hoặc Mã số học viên
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập 'gv1' hoặc 'sv1'"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-100 transition-all"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <Lock size={13} className="text-slate-400" />
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Nhập '1'"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl pl-4 pr-10 py-2.5 text-xs text-slate-800 font-semibold placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <UserCheck size={14} />
                  Xác nhận Đăng Nhập
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="register-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleRegisterSubmit}
                className="space-y-3.5"
              >
                {/* Reg Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Họ và Tên thành viên</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn Hải"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none"
                  />
                </div>

                {/* Reg Username */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Tên Đăng nhập / Tài khoản mới</label>
                  <input
                    type="text"
                    required
                    placeholder="ví dụ: hai_test"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Reg Password */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Mật khẩu</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu riêng tư"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Role Switcher */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Vai trò trong LMS</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Student">Học viên (Student)</option>
                    <option value="Instructor">Giảng viên giảng dạy (Instructor)</option>
                    <option value="Mentor">Cố vấn hỗ trợ học thuật (Mentor)</option>
                  </select>
                </div>

                {/* Major Choose */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Chuyên ngành định hướng</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. .NET Development, Khoa Toán Tin"
                    value={regMajor}
                    onChange={(e) => setRegMajor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-750 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <Star size={14} className="animate-spin" />
                  Xác nhận Tạo và Đăng Nhập
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
