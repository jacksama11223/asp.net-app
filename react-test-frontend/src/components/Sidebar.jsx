import React from 'react';
import { NavLink, Stack, Box, Text, ThemeIcon, Group } from '@mantine/core';
import { 
  LuLayoutDashboard, 
  LuBookOpen, 
  LuUsers, 
  LuZap, 
  LuSettings, 
  LuCircleHelp 
} from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const MENU_ITEMS = [
  { icon: LuLayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: LuBookOpen, label: 'Courses', path: '/courses' },
  { icon: LuUsers, label: 'Students', path: '/students' },
  { icon: LuZap, label: 'AI Predictor', path: '/ai' },
  { icon: LuSettings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const [parent] = useAutoAnimate();

  return (
    <Box 
      component="aside" 
      w={260} 
      h="100vh" 
      p="md" 
      style={(theme) => ({
        borderRight: `1px solid ${theme.colors.dark[4]}`,
        backgroundColor: theme.colors.dark[7],
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0
      })}
    >
      <Group p="md" mb="xl">
        <ThemeIcon size="xl" radius="md" variant="filled" color="brand">
          <LuZap size={24} />
        </ThemeIcon>
        <Text size="xl" fw={900} tracking="tight">
          SmartLMS<Text span c="brand" inherit>.AI</Text>
        </Text>
      </Group>

      <Stack gap="xs" ref={parent}>
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            component={Link}
            to={item.path}
            label={item.label}
            leftSection={<item.icon size={20} />}
            active={location.pathname === item.path}
            color="brand"
            variant="light"
            styles={{
              root: { borderRadius: 'var(--mantine-radius-md)' }
            }}
          />
        ))}
      </Stack>

      <Box mt="auto" p="md">
        <Box 
          p="md" 
          style={(theme) => ({ 
            backgroundColor: theme.colors.dark[6], 
            borderRadius: theme.radius.lg,
            border: `1px solid ${theme.colors.dark[4]}`
          })}
        >
          <Group mb="xs">
            <ThemeIcon size="sm" radius="xl" variant="light" color="brand">
              <LuCircleHelp size={14} />
            </ThemeIcon>
            <Text size="xs" fw={700} tt="uppercase" c="dimmed">AI Support</Text>
          </Group>
          <Text size="xs" c="dimmed" mb="md">
            Learn how to maximize student engagement with AI insights.
          </Text>
          <NavLink
            label="View Tutorials"
            variant="filled"
            bg="dark.4"
            styles={{ root: { borderRadius: 'var(--mantine-radius-sm)', textAlign: 'center' } }}
          />
        </Box>
      </Box>
    </Box>
  );
};
