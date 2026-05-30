import '../assets/css/gamification-frames.css';
import React, { useState, useEffect } from 'react';
import { 
  Group, 
  TextInput, 
  ActionIcon, 
  Indicator, 
  Avatar, 
  Text, 
  Box, 
  Menu,
  UnstyledButton,
  Badge,
  Popover,
  Stack,
  Divider,
  ScrollArea,
  Burger
} from '@mantine/core';
import { LuSearch, LuZap, LuSettings, LuUsers, LuLogOut, LuSparkles } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const Topbar = ({ mobileOpened, toggleMobile }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('slms_user') || '{}');
  const token = localStorage.getItem('slms_token');
  
  const [gamification, setGamification] = useState({ totalXP: 0, currentStreak: 0, level: 1 });
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    if (!token) return;
    
    // Fetch Gamification Stats (silent fail - không kick user ra ngoài nếu lỗi)
    apiClient.get('/api/gamification/status')
      .then(res => { if (Array.isArray(res.data) || typeof res.data === 'object') setGamification(res.data); })
      .catch(() => {}); // Silent fail cho background API

    // Fetch Notifications (silent fail)
    apiClient.get('/api/notifications')
      .then(res => {
        if (Array.isArray(res.data)) {
          setNotifications(res.data);
          setUnreadCount(res.data.filter(n => !n.isRead).length);
        }
      })
      .catch(() => {}); // Silent fail cho background API
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('slms_token');
    localStorage.removeItem('slms_user');
    navigate('/');
  };

  const handleMarkAsRead = (id) => {
    apiClient.post(`/api/notifications/${id}/read`).then(() => {
      setNotifications(prev => prev.map(n => n.notificationId === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    });
  };

  return (
    <Group justify="space-between" h="100%" px={{ base: 'sm', md: 'xl' }} className="bg-transparent flex-nowrap overflow-hidden">
      <Group gap="sm" wrap="nowrap">
        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
        <TextInput
          placeholder="Search..."
          leftSection={<LuSearch size={18} className="text-brand-500" />}
          w={{ base: 140, xs: 180, sm: 300, md: 400 }}
          radius="xl"
          variant="unstyled"
          className="glass border-black/5 px-4 bg-white/40"
          styles={{ input: { color: '#0f172a' } }}
        />
      </Group>

      <Group gap={{ base: 'xs', sm: 'lg' }} wrap="nowrap">
        {/* Gamification Stats */}
        <Group gap="xs" className="bg-orange-50/50 px-2 py-1.5 rounded-full border border-orange-100" visibleFrom="xs">
          <LuSparkles size={16} className="text-orange-500" />
          <Text fw={800} size="sm" className="text-orange-600">{gamification.currentStreak}</Text>
        </Group>
        
        <Group gap="xs" className="bg-yellow-50/50 px-2 py-1.5 rounded-full border border-yellow-100 mr-1" visibleFrom="xs">
          <LuZap size={16} className="text-yellow-500" />
          <Text fw={800} size="sm" className="text-yellow-600">{gamification.totalXP}</Text>
        </Group>

        {/* Notification Bell */}
        <Popover width={320} position="bottom-end" shadow="xl" radius="lg">
          <Popover.Target>
            <Indicator color="red" offset={4} size={10} disabled={unreadCount === 0} label={unreadCount} withBorder processing>
              <ActionIcon variant="subtle" color="gray" size="lg" radius="md" className="hover:bg-black/5" onClick={() => navigate('/community')}>
                <LuZap size={20} className="text-slate-600" />
              </ActionIcon>
            </Indicator>
          </Popover.Target>
          <Popover.Dropdown p={0} className="border-slate-100 overflow-hidden">
            <Box p="md" className="bg-slate-50 border-b border-slate-100">
              <Text fw={700}>Thông báo của bạn</Text>
            </Box>
            <ScrollArea h={300}>
              {notifications.length === 0 ? (
                <Text c="dimmed" ta="center" py="xl" size="sm">Bạn chưa có thông báo nào.</Text>
              ) : (
                <Stack gap={0}>
                  {notifications.map(n => (
                    <UnstyledButton 
                      key={n.notificationId} 
                      className={`p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${!n.isRead ? 'bg-brand-50/30' : ''}`}
                      onClick={() => handleMarkAsRead(n.notificationId)}
                    >
                      <Group wrap="nowrap" align="flex-start">
                        {!n.isRead && <Box w={8} h={8} className="bg-brand-500 rounded-full mt-1.5" />}
                        <Box>
                          <Text size="sm" fw={!n.isRead ? 600 : 500}>{n.title}</Text>
                          <Text size="xs" c="dimmed" lineClamp={2} mt={2}>{n.message}</Text>
                        </Box>
                      </Group>
                    </UnstyledButton>
                  ))}
                </Stack>
              )}
            </ScrollArea>
          </Popover.Dropdown>
        </Popover>

        {/* User Profile */}
        <Menu shadow="xl" width={220} position="bottom-end" radius="lg">
          <Menu.Target>
            <UnstyledButton className="hover:bg-black/5 p-1.5 rounded-2xl transition-all">
              <Group gap="sm">
                <Box visibleFrom="md" style={{ textAlign: 'right' }}>
                  <Text size="sm" fw={700} className="text-slate-900 leading-none mb-1">{user.fullName || 'Student'}</Text>
                  <Text size="10px" tt="uppercase" fw={900} c="dimmed">Cấp độ {gamification.level}</Text>
                </Box>
                <Avatar size="md" radius="lg" src={null} color="brand" className="avatar-border-wrap avatar-lvl-99 shadow-lg shadow-brand-500/20">
                  <LuSparkles size={18} />
                </Avatar>
                <LuSettings size={14} className="text-slate-400" />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown className="glass border-black/5 p-2 bg-white/90">
            <Menu.Label>Hồ sơ & Cộng đồng</Menu.Label>
            <Menu.Item leftSection={<LuUsers size={16} />} onClick={() => navigate('/profile/1')}>Hồ sơ cá nhân</Menu.Item>
            <Menu.Item leftSection={<LuSettings size={16} />} onClick={() => navigate('/tutor/profile/edit')}>Cài đặt</Menu.Item>
            <Menu.Divider className="border-black/5" />
            <Menu.Item color="red" leftSection={<LuLogOut size={16} />} onClick={handleLogout}>
              Đăng xuất
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};
