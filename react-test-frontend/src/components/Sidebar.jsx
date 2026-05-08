import React from 'react';
import { 
  Box, 
  NavLink, 
  Stack, 
  Text, 
  ThemeIcon, 
  Group,
  Button
} from '@mantine/core';
import { 
  LuLayoutDashboard, 
  LuBookOpen, 
  LuUsers, 
  LuZap, 
  LuSettings, 
  LuLogOut
} from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navData = [
  { label: 'Dashboard', icon: LuLayoutDashboard, path: '/dashboard', color: 'brand' },
  { label: 'Marketplace', icon: LuBookOpen, path: '/courses', color: 'indigo' },
  { label: 'Kho khóa học', icon: LuBookOpen, path: '/my-learning', color: 'teal' },
  { label: 'Community', icon: LuUsers, path: '/students', color: 'blue' },
  { label: 'Success Engine', icon: LuZap, path: '/ai', color: 'orange' },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('slms_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('slms_token');
    localStorage.removeItem('slms_user');
    navigate('/');
  };

  return (
    <Box className="h-full flex flex-col glass border-r-0 rounded-r-[2rem] shadow-none overflow-hidden bg-white/60">
      <Stack p="xl" gap="xl" className="flex-1">
        <Group justify="center" mb="xl">
          <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: 'brand', to: 'indigo' }}>
            <LuZap size={24} />
          </ThemeIcon>
          <Text size="xl" fw={900} tracking="tighter" className="text-slate-900">SmartLMS</Text>
        </Group>

        <Stack gap="xs" className="flex-1">
          {navData.map((item) => (
            <NavLink
              key={item.path}
              component={Link}
              to={item.path}
              label={item.label}
              leftSection={
                <ThemeIcon size="md" radius="md" variant={location.pathname === item.path ? 'filled' : 'light'} color={item.color}>
                  <item.icon size={16} />
                </ThemeIcon>
              }
              active={location.pathname === item.path}
              variant="filled"
              className={`rounded-xl transition-all duration-200 py-3 ${
                location.pathname === item.path 
                  ? 'bg-brand-500/10 text-brand-600' 
                  : 'hover:bg-black/5 text-slate-500 font-medium'
              }`}
              styles={{
                label: { fontWeight: 600, fontSize: '0.95rem' }
              }}
            />
          ))}
        </Stack>
      </Stack>

      <Box p="xl" className="border-t border-black/5 bg-black/5">
        <Stack gap="xs">
          <NavLink
            component={Link}
            to="/settings"
            label="Settings"
            leftSection={<LuSettings size={18} />}
            className="rounded-xl text-slate-500 hover:bg-black/5"
          />
          <NavLink
            onClick={handleLogout}
            label="Logout"
            leftSection={<LuLogOut size={18} />}
            className="rounded-xl text-red-500 hover:bg-red-500/5 transition-colors"
          />
        </Stack>
      </Box>
    </Box>
  );
};
