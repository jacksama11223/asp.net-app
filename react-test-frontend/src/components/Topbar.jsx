import React from 'react';
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
  Badge
} from '@mantine/core';
import { 
  LuSearch, 
  LuBell, 
  LuChevronDown,
  LuSettings,
  LuUsers,
  LuLogOut,
  LuSparkles
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export const Topbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('slms_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('slms_token');
    localStorage.removeItem('slms_user');
    navigate('/');
  };

  return (
    <Group justify="space-between" h="100%" px="xl" className="bg-transparent">
      <Group gap="xl">
        <TextInput
          placeholder="Search courses, lessons, notes..."
          leftSection={<LuSearch size={18} className="text-brand-400" />}
          w={400}
          radius="xl"
          variant="unstyled"
          className="glass bg-white/5 border-white/10 px-4"
          styles={{ 
            input: { color: '#fff' } 
          }}
        />
        
        <Badge variant="dot" color="brand" size="lg" className="bg-brand-500/5 px-4 h-9 font-bold border-brand-500/20">
          PRO STUDENT
        </Badge>
      </Group>

      <Group gap="lg">
        <Indicator color="brand" offset={4} size={8} withBorder processing>
          <ActionIcon variant="subtle" color="gray" size="lg" radius="md" className="hover:bg-white/5">
            <LuBell size={20} />
          </ActionIcon>
        </Indicator>

        <Menu shadow="xl" width={220} position="bottom-end" radius="lg">
          <Menu.Target>
            <UnstyledButton className="hover:bg-white/5 p-1.5 rounded-2xl transition-all">
              <Group gap="sm">
                <Box visibleFrom="md" style={{ textAlign: 'right' }}>
                  <Text size="sm" fw={700} className="text-white leading-none mb-1">{user.fullName || 'Student'}</Text>
                  <Text size="10px" tt="uppercase" fw={900} c="dimmed">{user.role || 'Member'}</Text>
                </Box>
                <Avatar 
                  size="md" 
                  radius="lg" 
                  src={null}
                  color="brand"
                  className="shadow-lg shadow-brand-500/20"
                >
                  <LuSparkles size={18} />
                </Avatar>
                <LuChevronDown size={14} className="text-slate-400" />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown className="glass border-white/10 p-2">
            <Menu.Label>Personal Space</Menu.Label>
            <Menu.Item leftSection={<LuUsers size={16} />}>My Profile</Menu.Item>
            <Menu.Item leftSection={<LuSettings size={16} />}>Preferences</Menu.Item>
            <Menu.Divider className="border-white/5" />
            <Menu.Item 
              color="red" 
              leftSection={<LuLogOut size={16} />}
              onClick={handleLogout}
            >
              Sign Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};
