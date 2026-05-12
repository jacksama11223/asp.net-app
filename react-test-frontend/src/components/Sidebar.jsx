import React from 'react';
import { 
  Box, NavLink, Stack, Text, ThemeIcon, Group, ActionIcon, Tooltip, Divider
} from '@mantine/core';
import { 
  LuLayoutDashboard, LuBookOpen, LuUsers, LuZap, LuSettings, 
  LuLogOut, LuSparkles, LuArrowLeft, LuPenTool, LuSend
} from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const studentNav = [
  { label: 'Dashboard', icon: LuLayoutDashboard, path: '/dashboard', color: 'brand' },
  { label: 'Marketplace', icon: LuBookOpen, path: '/courses', color: 'indigo' },
  { label: 'Kho khóa học', icon: LuBookOpen, path: '/my-learning', color: 'teal' },
  { label: 'Cộng đồng', icon: LuUsers, path: '/community', color: 'blue' },
  { label: 'Bạn bè', icon: LuUsers, path: '/community/friends', color: 'pink' },
  { label: 'Wiki cá nhân', icon: LuSparkles, path: '/wiki', color: 'violet' },
  { label: 'Success Engine', icon: LuZap, path: '/ai', color: 'orange' },
];

const instructorNav = [
  { label: 'Creator Studio', icon: LuLayoutDashboard, path: '/dashboard', color: 'indigo' },
  { label: 'Quản lý Khóa học', icon: LuPenTool, path: '/creator/courses', color: 'brand' },
  { label: 'Trung tâm Tin nhắn', icon: LuSend, path: '/creator/messages', color: 'teal' },
  { label: 'Analytics & Doanh thu', icon: LuZap, path: '/creator/analytics', color: 'orange' },
  { label: 'Học viên', icon: LuUsers, path: '/creator/students', color: 'violet' },
];

export const Sidebar = ({ collapsed, onToggle, closeMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('slms_user') || '{}');
  const isInstructor = user.role === 'Admin' || user.role === 'Instructor';

  const navData = isInstructor ? instructorNav : studentNav;

  const handleLogout = () => {
    localStorage.removeItem('slms_token');
    localStorage.removeItem('slms_user');
    navigate('/');
  };

  return (
    <Box className="h-full flex flex-col glass border-r-0 rounded-r-[2rem] shadow-none overflow-hidden bg-white/60 transition-all duration-300">
      <Stack p={collapsed ? 'md' : 'xl'} gap="xl" className="flex-1 transition-all duration-300">
        
        {/* Header & Toggle */}
        <Group justify={collapsed ? "center" : "space-between"} mb="xl" className="transition-all duration-300">
          {!collapsed && (
            <Group gap="sm">
              <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: 'brand', to: 'indigo' }}>
                <LuZap size={24} />
              </ThemeIcon>
              <Text size="xl" fw={900} tracking="tighter" className="text-slate-900">SmartLMS</Text>
            </Group>
          )}
          {collapsed && (
            <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} onClick={onToggle} className="cursor-pointer">
              <LuZap size={24} />
            </ThemeIcon>
          )}
          
          <ActionIcon variant="subtle" color="gray" onClick={onToggle} title="Toggle Sidebar">
            {collapsed ? <LuArrowLeft size={20} /> : <LuSettings size={20} />}
          </ActionIcon>
        </Group>

        {/* Navigation Links */}
        <Stack gap="xs" className="flex-1">
          {navData.map((item) => {
            const isActive = location.pathname === item.path;
            const NavItem = (
              <NavLink
                key={item.path}
                component={Link}
                to={item.path}
                onClick={closeMobile}
                label={item.label}
                leftSection={
                  <ThemeIcon size="md" radius="md" variant={isActive ? 'filled' : 'light'} color={item.color}>
                    <item.icon size={16} />
                  </ThemeIcon>
                }
                active={isActive}
                variant="filled"
                className={`rounded-xl transition-all duration-200 ${collapsed ? 'py-3 px-2 justify-center lg:justify-center' : 'py-3 px-4'} ${
                  isActive 
                    ? 'bg-brand-500/10 text-brand-600' 
                    : 'hover:bg-black/5 text-slate-500 font-medium'
                }`}
                styles={{
                  label: { 
                    fontWeight: 600, 
                    fontSize: '0.9rem',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    '@media (min-width: 768px)': {
                      display: collapsed ? 'none' : 'block',
                      fontSize: '0.95rem'
                    }
                  },
                  section: { margin: collapsed ? 0 : undefined }
                }}
              />
            );

            return collapsed ? (
              <Tooltip label={item.label} position="right" withArrow key={item.path}>
                {NavItem}
              </Tooltip>
            ) : NavItem;
          })}
        </Stack>
      </Stack>

      <Divider opacity={0.5} />

      {/* Footer / Settings / Logout */}
      <Box p={collapsed ? 'md' : 'xl'} className="bg-black/5 transition-all duration-300">
        <Stack gap="xs">
          <Tooltip label="Settings" position="right" disabled={!collapsed}>
            <NavLink
              component={Link}
              to="/settings"
              onClick={closeMobile}
              label="Cài đặt"
              leftSection={<LuSettings size={18} />}
              className={`rounded-xl text-slate-500 hover:bg-black/5 ${collapsed ? 'justify-center px-0' : ''}`}
              styles={{ 
                section: { margin: collapsed ? 0 : undefined },
                label: {
                  display: 'block',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '@media (min-width: 768px)': {
                    display: collapsed ? 'none' : 'block'
                  }
                }
              }}
            />
          </Tooltip>
          
          <Tooltip label="Đăng xuất" position="right" color="red" disabled={!collapsed}>
            <NavLink
              onClick={handleLogout}
              label="Đăng xuất"
              leftSection={<LuLogOut size={18} />}
              className={`rounded-xl text-red-500 hover:bg-red-500/10 transition-colors ${collapsed ? 'justify-center px-0' : ''}`}
              styles={{ 
                section: { margin: collapsed ? 0 : undefined }, 
                label: { 
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '@media (min-width: 768px)': {
                    display: collapsed ? 'none' : 'block'
                  }
                } 
              }}
            />
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );
};
