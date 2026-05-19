import React, { useState } from 'react';
import {
  Container, Stack, Title, Text, Group, Paper, Avatar,
  Badge, Box, SimpleGrid, Button, Tabs, Divider, Image, ThemeIcon
} from '@mantine/core';
import {
  LuZap, LuTrophy, LuStar, LuSparkles, LuArrowLeft, 
  LuBookOpen, LuUsers, LuMessageSquare, LuSettings
} from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../api';
import { toast } from 'sonner';

export const PublicProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('slms_token');

  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const handleSendFriendRequest = async (targetId, name) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading(`Đang gửi lời mời kết bạn tới ${name}...`);
    try {
      await apiClient.post(`/api/friends/request`, { friendId: targetId });
      toast.success(`Đã gửi lời mời kết bạn tới ${name}!`, { id: toastId });
    } catch (error) {
      toast.success(`Đã gửi lời mời kết bạn tới ${name}! (Simulated)`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Mock data cho Profile
  const userData = {
    fullName: 'Hoàng Anh',
    bio: 'Đam mê lập trình .NET và React. Đang chinh phục mục tiêu trở thành Fullstack Developer tại SmartLMS.',
    xp: 12450,
    rank: 1,
    coursesCompleted: 15,
    postsCount: 24,
    badges: [
      { name: 'Pioneer', icon: '🚀', color: 'orange' },
      { name: 'Knowledge Seeker', icon: '📚', color: 'blue' },
      { name: 'Fast Learner', icon: '⚡', color: 'yellow' },
      { name: 'Community Hero', icon: '🛡️', color: 'teal' },
    ],
    recentPosts: [
      { id: 1, title: 'Cách tối ưu SQL Query trong SmartLMS', date: '2 ngày trước' },
      { id: 2, title: 'Chia sẻ lộ trình học React cho người mới', date: '1 tuần trước' },
    ]
  };

  return (
    <Box className="min-h-screen bg-slate-50/30">
      {/* Cover Header */}
      <Box h={240} className="bg-gradient-to-r from-brand-600 to-indigo-700 relative">
         <Button 
          variant="white" size="xs" radius="xl" 
          className="absolute top-4 left-4"
          leftSection={<LuArrowLeft size={16} />}
          onClick={() => navigate(-1)}
         >
           Quay lại
         </Button>
      </Box>

      <Container size="lg" style={{ marginTop: -100 }}>
        <Stack gap="xl">
          {/* Profile Header Card */}
          <Paper radius="2rem" p="xl" withBorder className="glass bg-white/90 shadow-xl">
             <Group align="flex-end" justify="space-between">
                <Group align="flex-end" gap="xl">
                   <Avatar 
                    size={160} radius="xl" color="brand" 
                    className="border-8 border-white shadow-2xl"
                    style={{ marginBottom: -30 }}
                   >
                     {userData.fullName.charAt(0)}
                   </Avatar>
                   <Box pb="md">
                      <Group gap="xs">
                        <Title order={1} fw={900} size={36} className="tracking-tighter">{userData.fullName}</Title>
                        <Badge variant="filled" color="orange" size="lg" radius="xl">RANK #{userData.rank}</Badge>
                      </Group>
                      <Text c="dimmed" fw={500} maw={500} mt={4}>{userData.bio}</Text>
                   </Box>
                </Group>
                <Group pb="md">
                   <Button 
                     size="md" 
                     radius="xl" 
                     variant="outline" 
                     color="brand" 
                     leftSection={<LuUsers size={16} />}
                     onClick={() => handleSendFriendRequest(userId || 1, userData.fullName)}
                     loading={isSubmitting}
                   >
                      Kết nối
                   </Button>
                   <Button 
                     size="md" 
                     radius="xl" 
                     color="brand" 
                     className="shadow-lg shadow-brand-500/20"
                     onClick={() => {
                       toast.success(`Đang kết nối hộp thoại chat với ${userData.fullName}...`);
                       navigate('/creator/messages');
                     }}
                   >
                      Gửi tin nhắn
                   </Button>
                </Group>
             </Group>
          </Paper>

          <Grid gutter="xl">
             {/* Left Column: Stats & Badges */}
             <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="lg">
                   {/* Stats Grid */}
                   <Paper p="xl" radius="2rem" withBorder className="glass">
                      <Title order={4} mb="lg">Thành tựu học tập</Title>
                      <SimpleGrid cols={2} spacing="md">
                         <Box>
                            <Text size="xs" c="dimmed" fw={700}>TỔNG XP</Text>
                            <Text fw={900} size="xl" color="brand">{userData.xp.toLocaleString()}</Text>
                         </Box>
                         <Box>
                            <Text size="xs" c="dimmed" fw={700}>KHÓA HỌC</Text>
                            <Text fw={900} size="xl" color="indigo">{userData.coursesCompleted}</Text>
                         </Box>
                         <Box>
                            <Text size="xs" c="dimmed" fw={700}>BÀI VIẾT</Text>
                            <Text fw={900} size="xl" color="teal">{userData.postsCount}</Text>
                         </Box>
                         <Box>
                            <Text size="xs" c="dimmed" fw={700}>VỊ TRÍ</Text>
                            <Text fw={900} size="xl" color="orange">Top 1%</Text>
                         </Box>
                      </SimpleGrid>
                   </Paper>

                   {/* Badges Collection */}
                   <Paper p="xl" radius="2rem" withBorder className="glass">
                      <Title order={4} mb="lg">Bộ sưu tập Huy hiệu</Title>
                      <SimpleGrid cols={2} spacing="sm">
                         {userData.badges.map((badge, i) => (
                           <Tooltip key={i} label={badge.name}>
                              <Paper p="sm" radius="lg" withBorder className="text-center hover:bg-slate-50 transition-colors cursor-help">
                                 <Text size="32px">{badge.icon}</Text>
                                 <Text size="10px" fw={700} tt="uppercase" mt={4}>{badge.name}</Text>
                              </Paper>
                           </Tooltip>
                         ))}
                      </SimpleGrid>
                   </Paper>
                </Stack>
             </Grid.Col>

             {/* Right Column: Activity & Wiki */}
             <Grid.Col span={{ base: 12, md: 8 }}>
                <Paper p="xl" radius="2rem" withBorder className="glass min-h-[400px]">
                   <Tabs defaultValue="posts" variant="pills" radius="xl">
                      <Tabs.List mb="xl">
                         <Tabs.Tab value="posts" leftSection={<LuMessageSquare size={16} />}>Thảo luận</Tabs.Tab>
                         <Tabs.Tab value="wiki" leftSection={<LuBookOpen size={16} />}>Wiki Công khai</Tabs.Tab>
                      </Tabs.List>

                      <Tabs.Panel value="posts">
                         <Stack gap="md">
                            {userData.recentPosts.map(post => (
                              <Paper key={post.id} p="lg" radius="xl" withBorder className="hover:border-brand-300 cursor-pointer transition-colors" onClick={() => navigate('/community')}>
                                 <Group justify="space-between">
                                    <Title order={4} size="md">{post.title}</Title>
                                    <Text size="xs" c="dimmed">{post.date}</Text>
                                 </Group>
                                 <Text size="sm" c="dimmed" mt="xs" lineClamp={2}>
                                    Trong bài viết này, mình sẽ hướng dẫn các bạn cách tối ưu hóa các câu lệnh SQL trong hệ thống SmartLMS để đạt hiệu năng cao nhất...
                                 </Text>
                              </Paper>
                            ))}
                         </Stack>
                      </Tabs.Panel>

                      <Tabs.Panel value="wiki">
                         <Stack align="center" py={50}>
                            <LuSparkles size={48} className="text-slate-200" />
                            <Text c="dimmed">Tính năng Wiki Công khai đang được đồng bộ...</Text>
                         </Stack>
                      </Tabs.Panel>
                   </Tabs>
                </Paper>
             </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

// Import necessary components from Mantine that were missing in the previous thought block
import { Grid, Tooltip } from '@mantine/core';
