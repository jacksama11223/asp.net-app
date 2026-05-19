import React, { useState } from 'react';
import {
  Container, Stack, Title, Text, Group, Paper, Avatar,
  Badge, Tabs, Table, ThemeIcon, Box, SimpleGrid, Button
} from '@mantine/core';
import {
  LuZap, LuTrophy, LuStar, LuSparkles, LuArrowLeft, LuSearch
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('weekly');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const topThree = [
    { name: 'Hoàng Anh', xp: 12450, courses: 15, badges: 8, avatar: 'H', color: 'orange' },
    { name: 'Minh Đức', xp: 10200, courses: 12, badges: 6, avatar: 'M', color: 'blue' },
    { name: 'Thanh Vân', xp: 9800, courses: 10, badges: 7, avatar: 'V', color: 'teal' },
  ];

  const [boardOthers, setBoardOthers] = useState([
    { rank: 4, name: 'Quốc Bảo', xp: 8500, courses: 8, badges: 5 },
    { rank: 5, name: 'Mai Linh', xp: 7200, courses: 7, badges: 4 },
    { rank: 6, name: 'Tuấn Kiệt', xp: 6800, courses: 6, badges: 4 },
    { rank: 7, name: 'Hương Giang', xp: 5400, courses: 5, badges: 3 },
  ]);

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setBoardOthers(prev => [
        ...prev,
        { rank: prev.length + 4, name: 'Khánh Vy', xp: 4800, courses: 4, badges: 3 },
        { rank: prev.length + 5, name: 'Đức Huy', xp: 4200, courses: 3, badges: 2 },
        { rank: prev.length + 6, name: 'Minh Trang', xp: 3900, courses: 3, badges: 2 }
      ]);
      setIsLoadingMore(false);
    }, 600);
  };

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
                    Hall of <Text span variant="gradient" gradient={{ from: 'orange', to: 'red' }} inherit>Fame</Text>
                  </Title>
               </Group>
               <Text c="dimmed" size="lg" ml={32}>Vinh danh những nhà chinh phục tri thức xuất sắc nhất.</Text>
            </Stack>
            <ThemeIcon size={64} radius="xl" variant="light" color="orange">
               <LuTrophy size={32} />
            </ThemeIcon>
          </Group>

          {/* Podiums (Top 3) */}
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="xl">
            {topThree.map((user, i) => (
              <motion.div 
                key={i} 
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: i * 0.1 }}
              >
                <Paper 
                  p="xl" radius="2rem" withBorder 
                  className={`text-center relative overflow-hidden bg-white shadow-xl ${i === 0 ? 'border-orange-200' : ''}`}
                >
                  {i === 0 && (
                    <Box className="absolute top-0 right-0 p-4">
                       <LuSparkles className="text-orange-500 animate-pulse" size={24} />
                    </Box>
                  )}
                  <Avatar 
                    size={100} mx="auto" radius="xl" color={user.color} 
                    className="border-4 border-white shadow-lg mb-md"
                  >
                    {user.avatar}
                  </Avatar>
                  <Badge variant="filled" color={user.color} size="xl" radius="xl" mb="md">
                    Rank #{i + 1}
                  </Badge>
                  <Title order={3}>{user.name}</Title>
                  <Text fw={900} size="xl" className={`text-${user.color}-600`} mt="xs">{user.xp.toLocaleString()} XP</Text>
                  
                  <Group justify="center" mt="md" gap="xl">
                     <Box>
                        <Text size="xs" c="dimmed" fw={700}>COURSES</Text>
                        <Text fw={800}>{user.courses}</Text>
                     </Box>
                     <Box>
                        <Text size="xs" c="dimmed" fw={700}>BADGES</Text>
                        <Text fw={800}>{user.badges}</Text>
                     </Box>
                  </Group>
                </Paper>
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Leaderboard Table */}
          <Paper p="xl" radius="2rem" withBorder className="glass mt-xl">
             <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="xl" mb="xl">
                <Tabs.List grow>
                  <Tabs.Tab value="weekly">Tuần này</Tabs.Tab>
                  <Tabs.Tab value="monthly">Tháng này</Tabs.Tab>
                  <Tabs.Tab value="alltime">Tất cả</Tabs.Tab>
                </Tabs.List>
             </Tabs>

             <Table verticalSpacing="md" className="leaderboard-table">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>Rank</th>
                    <th>Học viên</th>
                    <th style={{ textAlign: 'center' }}>Khóa học</th>
                    <th style={{ textAlign: 'center' }}>Huy hiệu</th>
                    <th style={{ textAlign: 'right' }}>Tổng XP</th>
                  </tr>
                </thead>
                <tbody>
                  {boardOthers.map((user) => (
                    <tr key={user.rank} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                      <td><Text fw={800} size="lg" c="dimmed">#{user.rank}</Text></td>
                      <td>
                        <Group gap="sm">
                          <Avatar size="sm" radius="xl" color="gray">{user.name.charAt(0)}</Avatar>
                          <Text fw={700}>{user.name}</Text>
                        </Group>
                      </td>
                      <td style={{ textAlign: 'center' }}>{user.courses}</td>
                      <td style={{ textAlign: 'center' }}>{user.badges}</td>
                      <td style={{ textAlign: 'right' }}>
                         <Group gap={4} justify="flex-end">
                            <Text fw={900} color="brand">{user.xp.toLocaleString()}</Text>
                            <LuZap size={14} className="text-orange-500" />
                         </Group>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </Table>
             
             <Box ta="center" mt="xl">
                <Button 
                  variant="light" 
                  color="brand" 
                  radius="xl"
                  loading={isLoadingMore}
                  onClick={handleLoadMore}
                >
                  Tải thêm cao thủ
                </Button>
             </Box>
          </Paper>
        </Stack>
      </motion.div>
    </Container>
  );
};
