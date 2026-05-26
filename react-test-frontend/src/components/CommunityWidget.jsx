import React, { useState, useEffect } from 'react';
import {
  Paper, Stack, Text, Group, Avatar, Badge, Box,
  Skeleton, ThemeIcon, Button, Anchor
} from '@mantine/core';
import { LuTrophy, LuCalendar, LuUsers, LuArrowRight, LuZap } from 'react-icons/lu';
import { getCommunityLeaderboard, getCommunityEvents, getCommunityStats } from '../api';
import { motion } from 'framer-motion';

// ── Mini Leaderboard Widget ───────────────────────────────────────────────────
export const MiniLeaderboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommunityLeaderboard()
      .then(res => setData(res?.users?.slice(0, 5) || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const rankColors = ['orange', 'gray', 'yellow', 'teal', 'blue'];

  return (
    <Paper p="lg" radius="xl" withBorder className="bg-white/80 backdrop-blur-sm">
      <Group justify="space-between" mb="md">
        <Group gap="xs">
          <ThemeIcon size={32} radius="xl" variant="light" color="orange">
            <LuTrophy size={16} />
          </ThemeIcon>
          <Text fw={800} size="sm">Bảng Xếp Hạng</Text>
        </Group>
        <Anchor
          href="http://localhost:3080/hub/leaderboard"
          target="_blank"
          size="xs"
          c="orange"
          fw={700}
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          Xem đầy đủ <LuArrowRight size={12} />
        </Anchor>
      </Group>

      <Stack gap="sm">
        {loading
          ? Array(5).fill(0).map((_, i) => (
              <Group key={i}>
                <Skeleton circle height={32} width={32} />
                <Skeleton height={12} width={120} />
                <Skeleton height={12} width={60} ml="auto" />
              </Group>
            ))
          : data.length === 0
            ? <Text c="dimmed" size="xs" ta="center">Chưa có dữ liệu xếp hạng</Text>
            : data.map((user, i) => (
                <motion.div
                  key={user.userId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Group gap="sm" wrap="nowrap">
                    <Badge
                      size="sm"
                      variant="filled"
                      color={rankColors[i] || 'gray'}
                      circle
                      style={{ minWidth: 24 }}
                    >
                      {i + 1}
                    </Badge>
                    <Avatar
                      size={28}
                      radius="xl"
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userId}`}
                    />
                    <Text size="xs" fw={700} flex={1} truncate>
                      {user.userName}
                    </Text>
                    <Group gap={4}>
                      <Text size="xs" fw={900} c="orange">
                        {(user.totalPoints || 0).toLocaleString()}
                      </Text>
                      <LuZap size={12} className="text-orange-500" />
                    </Group>
                  </Group>
                </motion.div>
              ))
        }
      </Stack>
    </Paper>
  );
};

// ── Upcoming Events Widget ────────────────────────────────────────────────────
export const UpcomingEventsWidget = () => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommunityEvents()
      .then(data => setEvents(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const typeColors = {
    webinar: 'purple',
    workshop: 'orange',
    coding_session: 'teal',
    default: 'blue',
  };

  return (
    <Paper p="lg" radius="xl" withBorder className="bg-white/80 backdrop-blur-sm">
      <Group justify="space-between" mb="md">
        <Group gap="xs">
          <ThemeIcon size={32} radius="xl" variant="light" color="violet">
            <LuCalendar size={16} />
          </ThemeIcon>
          <Text fw={800} size="sm">Sự Kiện Sắp Tới</Text>
        </Group>
        <Anchor
          href="http://localhost:3080/hub/events"
          target="_blank"
          size="xs"
          c="violet"
          fw={700}
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          Xem tất cả <LuArrowRight size={12} />
        </Anchor>
      </Group>

      <Stack gap="sm">
        {loading
          ? Array(3).fill(0).map((_, i) => (
              <Box key={i} p="sm" style={{ borderRadius: 12, background: '#f8fafc' }}>
                <Skeleton height={12} width="80%" mb={6} />
                <Skeleton height={10} width="50%" />
              </Box>
            ))
          : events.length === 0
            ? <Text c="dimmed" size="xs" ta="center">Chưa có sự kiện nào</Text>
            : events.map((evt, i) => {
                const color = typeColors[evt.eventType?.toLowerCase().replace(' ', '_')] || typeColors.default;
                const dateStr = evt.eventDate
                  ? new Date(evt.eventDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
                  : '??/??';

                return (
                  <motion.div
                    key={evt.id || i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Box
                      p="sm"
                      style={{
                        borderRadius: 12,
                        background: '#f8fafc',
                        borderLeft: `3px solid var(--mantine-color-${color}-5, #4f46e5)`,
                      }}
                    >
                      <Group justify="space-between" gap="xs" wrap="nowrap">
                        <Text size="xs" fw={700} truncate flex={1}>
                          {evt.title || 'Sự kiện'}
                        </Text>
                        <Badge size="xs" variant="light" color={color}>
                          {dateStr}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed" mt={2}>
                        {(evt.participants?.length || 0)} người đã đăng ký
                      </Text>
                    </Box>
                  </motion.div>
                );
              })
        }
      </Stack>
    </Paper>
  );
};

// ── Community Stats Banner ────────────────────────────────────────────────────
export const CommunityStatsBanner = () => {
  const [stats, setStats] = useState({ totalEvents: '...', totalGroups: '...' });

  useEffect(() => {
    getCommunityStats()
      .then(s => setStats({ totalEvents: s.totalEvents, totalGroups: s.totalGroups }))
      .catch(() => setStats({ totalEvents: 0, totalGroups: 0 }));
  }, []);

  return (
    <Paper
      p="lg"
      radius="xl"
      style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #7c3aed 100%)',
        color: 'white',
      }}
    >
      <Group justify="space-between" align="center">
        <Stack gap={2}>
          <Text size="xs" fw={700} c="white" opacity={0.8} tt="uppercase" lts={1}>
            🌟 SmartLMS Community Hub
          </Text>
          <Text fw={900} size="lg" c="white">
            {stats.totalGroups} nhóm · {stats.totalEvents} sự kiện đang hoạt động
          </Text>
          <Text size="xs" c="white" opacity={0.75}>
            Tham gia cộng đồng để cộng thêm điểm XP và leo bảng xếp hạng!
          </Text>
        </Stack>
        <Button
          component="a"
          href="http://localhost:3080"
          target="_blank"
          variant="white"
          color="violet"
          radius="xl"
          size="sm"
          rightSection={<LuArrowRight size={14} />}
        >
          Vào Hub
        </Button>
      </Group>
    </Paper>
  );
};

// ── Community Sidebar Widget ───────────────────────────────────────────────────
export const CommunitySidebarWidget = () => (
  <Stack gap="sm">
    <CommunityStatsBanner />
    <MiniLeaderboard />
    <UpcomingEventsWidget />
  </Stack>
);
