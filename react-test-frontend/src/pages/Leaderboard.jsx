import React, { useState, useEffect } from 'react';
import {
  Container, Stack, Title, Text, Group, Paper, Avatar,
  Badge, Tabs, Table, ThemeIcon, Box, SimpleGrid, Button,
  Skeleton, Alert
} from '@mantine/core';
import {
  LuZap, LuTrophy, LuStar, LuSparkles, LuArrowLeft,
  LuRefreshCw, LuTriangleAlert
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCommunityLeaderboard } from '../api';

export const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('alltime');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = () => {
    setLoading(true);
    setError(null);
    getCommunityLeaderboard()
      .then(res => {
        const users = res?.users || [];
        setLeaderboardData(users);
      })
      .catch(err => {
        console.error('Leaderboard fetch error:', err);
        setError('Không thể tải dữ liệu bảng xếp hạng từ Community Hub. Hãy đảm bảo port 3080 đang chạy.');
        setLeaderboardData([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [activeTab]);

  const topThree = leaderboardData.slice(0, 3);
  const restUsers = leaderboardData.slice(3);

  const rankColors = ['orange', 'gray', 'yellow'];
  const rankLabels = ['#1', '#2', '#3'];

  return (
    <Container size="lg" py="xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Stack gap="xl">
          {/* Header */}
          <Group justify="space-between">
            <Stack gap={0}>
              <Group gap="xs">
                <Button variant="subtle" color="gray" p={0} onClick={() => navigate(-1)}>
                  <LuArrowLeft size={20} />
                </Button>
                <Title order={1} fw={900} size={42} className="tracking-tighter">
                  Hall of{' '}
                  <Text span variant="gradient" gradient={{ from: 'orange', to: 'red' }} inherit>
                    Fame
                  </Text>
                </Title>
              </Group>
              <Text c="dimmed" size="lg" ml={32}>
                Dữ liệu thật từ SmartLMS Community Hub 🏆
              </Text>
            </Stack>
            <Group>
              <ThemeIcon size={64} radius="xl" variant="light" color="orange">
                <LuTrophy size={32} />
              </ThemeIcon>
              <Button
                variant="light"
                color="gray"
                radius="xl"
                leftSection={<LuRefreshCw size={14} />}
                onClick={fetchLeaderboard}
                loading={loading}
              >
                Cập nhật
              </Button>
            </Group>
          </Group>

          {/* Error Alert */}
          {error && (
            <Alert icon={<LuTriangleAlert size={16} />} color="orange" radius="xl">
              {error}
            </Alert>
          )}

          {/* Podiums (Top 3) */}
          {loading
            ? (
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="xl">
                {[0, 1, 2].map(i => (
                  <Paper key={i} p="xl" radius="2rem" withBorder>
                    <Stack align="center" gap="sm">
                      <Skeleton circle height={100} />
                      <Skeleton height={16} width={80} />
                      <Skeleton height={14} width={60} />
                    </Stack>
                  </Paper>
                ))}
              </SimpleGrid>
            )
            : topThree.length > 0 && (
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="xl">
                {topThree.map((user, i) => (
                  <motion.div
                    key={user.userId}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Paper
                      p="xl"
                      radius="2rem"
                      withBorder
                      className={`text-center relative overflow-hidden bg-white shadow-xl ${i === 0 ? 'border-orange-200' : ''}`}
                    >
                      {i === 0 && (
                        <Box className="absolute top-0 right-0 p-4">
                          <LuSparkles className="text-orange-500 animate-pulse" size={24} />
                        </Box>
                      )}
                      <Avatar
                        size={100}
                        mx="auto"
                        radius="xl"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userId}`}
                        className="border-4 border-white shadow-lg mb-md"
                      />
                      <Badge variant="filled" color={rankColors[i]} size="xl" radius="xl" mb="md" mt="sm">
                        Rank {rankLabels[i]}
                      </Badge>
                      <Title order={3}>{user.userName}</Title>
                      <Group justify="center" gap="xs" mt="xs">
                        <Text fw={900} size="xl" c="orange">
                          {(user.totalPoints || 0).toLocaleString()}
                        </Text>
                        <LuZap size={18} className="text-orange-500" />
                        <Text size="sm" c="dimmed">điểm</Text>
                      </Group>
                    </Paper>
                  </motion.div>
                ))}
              </SimpleGrid>
            )
          }

          {/* Leaderboard Table */}
          <Paper p="xl" radius="2rem" withBorder className="glass mt-xl">
            <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="xl" mb="xl">
              <Tabs.List grow>
                <Tabs.Tab value="alltime">Tất cả thời gian</Tabs.Tab>
                <Tabs.Tab value="weekly">Tuần này</Tabs.Tab>
                <Tabs.Tab value="monthly">Tháng này</Tabs.Tab>
              </Tabs.List>
            </Tabs>

            {loading
              ? (
                <Stack gap="md">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Group key={i}>
                      <Skeleton circle height={36} width={36} />
                      <Skeleton height={14} width={160} />
                      <Skeleton height={14} width={80} ml="auto" />
                    </Group>
                  ))}
                </Stack>
              )
              : restUsers.length === 0
                ? (
                  <Text ta="center" c="dimmed" py="xl">
                    {error ? 'Community Hub đang offline' : 'Chưa có dữ liệu'}
                  </Text>
                )
                : (
                  <Table verticalSpacing="md" className="leaderboard-table">
                    <thead>
                      <tr>
                        <th style={{ width: 80 }}>Hạng</th>
                        <th>Học viên</th>
                        <th style={{ textAlign: 'right' }}>Tổng Điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restUsers.map((user) => (
                        <tr key={user.userId} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                          <td>
                            <Text fw={800} size="lg" c="dimmed">#{user.rank}</Text>
                          </td>
                          <td>
                            <Group gap="sm">
                              <Avatar
                                size="sm"
                                radius="xl"
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userId}`}
                              />
                              <Text fw={700}>{user.userName}</Text>
                            </Group>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <Group gap={4} justify="flex-end">
                              <Text fw={900} c="orange">
                                {(user.totalPoints || 0).toLocaleString()}
                              </Text>
                              <LuZap size={14} className="text-orange-500" />
                            </Group>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )
            }

            {/* Link to full community leaderboard */}
            <Box ta="center" mt="xl">
              <Button
                component="a"
                href="http://localhost:3080/hub/leaderboard"
                target="_blank"
                variant="light"
                color="orange"
                radius="xl"
                rightSection={<LuStar size={14} />}
              >
                Xem bảng xếp hạng đầy đủ trên Community Hub
              </Button>
            </Box>
          </Paper>
        </Stack>
      </motion.div>
    </Container>
  );
};
