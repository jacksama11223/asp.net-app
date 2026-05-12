import React, { useState, useEffect } from 'react';
import {
  Stack, Title, Text, Group, Button,
  TextInput, Card, Badge, Avatar, ActionIcon, Box, SimpleGrid, Paper, Tabs,
  Container, Loader, ThemeIcon
} from '@mantine/core';
import {
  LuSearch, LuPlus, LuEye,
  LuZap, LuSettings, LuUsers, LuBookOpen, LuSend, LuSparkles
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';
import { motion } from 'framer-motion';

export const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const token = localStorage.getItem('slms_token');

  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get(`/api/community/posts?search=${search}`);
      setPosts(response.data);
    } catch {
      // Mock data nếu API chưa sẵn sàng
      setPosts([
        { postId: 1, title: 'Cách xử lý lỗi JWT Token trong ASP.NET Core 8?', category: 'ASP.NET', voteCount: 24, commentCount: 8, viewCount: 142, hasVerifiedAnswer: true, createdAt: new Date(), author: { fullName: 'Nguyễn Văn A' }, summary: 'Tôi gặp lỗi 401 khi gọi API sau khi login...' },
        { postId: 2, title: 'Docker Compose: Làm sao kết nối .NET với MariaDB?', category: 'DevOps', voteCount: 15, commentCount: 5, viewCount: 89, hasVerifiedAnswer: false, createdAt: new Date(), author: { fullName: 'Trần Thị B' }, summary: 'Mình đã thử nhiều cách nhưng vẫn bị lỗi connection...' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'ASP.NET', 'React', 'DevOps', 'SQL', 'AI/ML'];

  const filteredPosts = posts.filter(p =>
    (activeTab === 'all' || p.category === activeTab) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.summary?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Container size="xl">
      <Stack gap="xl">
        {/* Header Section */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={1} fw={900} size={42} className="tracking-tighter text-slate-900 leading-none">
              Community <Text span variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} inherit>Hub</Text>
            </Title>
            <Text c="dimmed" size="md" mt={8} fw={500}>Nơi tri thức hội tụ và lan tỏa giữa những nhà chinh phục công nghệ.</Text>
          </Box>
          <Button
            size="lg" radius="xl" color="brand"
            leftSection={<LuPlus size={20} />}
            onClick={() => navigate('/community/post/new')}
            className="shadow-xl shadow-brand-500/20 px-8"
          >
            Đặt câu hỏi mới
          </Button>
        </Group>

        <Grid gutter={30}>
          {/* Main Feed Column */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="lg">
              {/* Search & Filter Bar */}
              <Paper radius="2rem" p="sm" withBorder className="glass bg-white/80 shadow-sm border-slate-100">
                <Group>
                  <TextInput
                    placeholder="Tìm kiếm cảm hứng học tập..."
                    leftSection={<LuSearch size={20} className="text-brand-500" />}
                    size="md" radius="xl" variant="unstyled"
                    className="flex-1 px-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="xl">
                    <Tabs.List>
                      {categories.slice(0, 4).map(cat => (
                        <Tabs.Tab key={cat} value={cat} className="capitalize px-6">
                          {cat === 'all' ? 'Tất cả' : cat}
                        </Tabs.Tab>
                      ))}
                      <Tabs.Tab value="wiki" leftSection={<LuBookOpen size={16} />} className="px-6 bg-indigo-50 text-indigo-600">
                        Wiki Tri thức
                      </Tabs.Tab>
                    </Tabs.List>
                  </Tabs>
                </Group>
              </Paper>

              {/* Posts List or Wiki List */}
              {loading ? (
                <Stack align="center" py={100}><Loader color="brand" type="dots" /></Stack>
              ) : (
                <Stack gap="md">
                  {activeTab === 'wiki' ? (
                    /* Public Wiki Snippets */
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                       {[
                         { title: 'Cấu trúc Modular Monolith', author: 'Admin', likes: 120, tags: ['Architecture'] },
                         { title: 'Tối ưu Docker Image', author: 'Hoàng Anh', likes: 85, tags: ['DevOps'] },
                         { title: 'React 19: Có gì mới?', author: 'Minh Đức', likes: 150, tags: ['Frontend'] },
                         { title: 'Security Best Practices', author: 'Thanh Vân', likes: 92, tags: ['Security'] },
                       ].map((wiki, i) => (
                         <Paper key={i} p="xl" radius="2rem" withBorder className="hover:shadow-lg transition-all cursor-pointer bg-white group">
                            <Group justify="space-between" mb="xs">
                               <ThemeIcon variant="light" color="indigo" radius="md">
                                  <LuBookOpen size={18} />
                               </ThemeIcon>
                               <Group gap={4}>
                                  <LuZap size={14} className="text-orange-500" />
                                  <Text size="xs" fw={700}>{wiki.likes}</Text>
                               </Group>
                            </Group>
                            <Title order={4} mb="xs" className="group-hover:text-indigo-600 transition-colors">{wiki.title}</Title>
                            <Text size="xs" c="dimmed" mb="md">Tác giả: <b>{wiki.author}</b></Text>
                            <Group gap={4}>
                               {wiki.tags.map(t => <Badge key={t} size="xs" variant="outline" color="gray">{t}</Badge>)}
                            </Group>
                         </Paper>
                       ))}
                    </SimpleGrid>
                  ) : (
                    /* Discussions List */
                    filteredPosts.map((post, i) => (
                      <motion.div
                        key={post.postId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Card
                          p={0} radius="2rem" withBorder
                          className="hover:shadow-xl transition-all border-slate-100 group cursor-pointer bg-white overflow-hidden"
                          onClick={() => navigate(`/community/${post.postId}`)}
                        >
                          <Group wrap="nowrap" gap={0}>
                            {/* Vote Side Panel */}
                            <Stack align="center" gap={4} p="xl" className="bg-slate-50/50 min-w-[80px] border-r border-slate-50">
                               <ActionIcon variant="subtle" color="brand" size="lg">
                                 <LuZap size={22} />
                               </ActionIcon>
                               <Text fw={900} size="xl" className="text-slate-800">{post.voteCount}</Text>
                               <Text size="xs" fw={700} c="dimmed" tt="uppercase" className="tracking-widest">Votes</Text>
                            </Stack>

                            {/* Post Info Body */}
                            <Box p="xl" flex={1}>
                               <Group justify="space-between" mb="xs">
                                 <Group gap="xs">
                                    <Badge color="brand" variant="light" size="lg">{post.category}</Badge>
                                    {post.hasVerifiedAnswer && <Badge color="teal" variant="filled">Solution Found</Badge>}
                                 </Group>
                                 <Text size="xs" c="dimmed" fw={600}>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</Text>
                               </Group>

                               <Title order={3} mb="sm" className="group-hover:text-brand-600 transition-colors tracking-tight">
                                  {post.title}
                               </Title>
                               
                               <Text size="sm" c="dimmed" lineClamp={2} mb="xl">
                                  {post.summary || "Bấm để khám phá thêm về cuộc thảo luận thú vị này cùng cộng đồng SmartLMS..."}
                                </Text>

                               <Group justify="space-between">
                                  <Group gap="md">
                                     <Avatar src={post.author.avatarUrl} radius="xl" size="sm" color="brand">
                                       {post.author.fullName.charAt(0)}
                                     </Avatar>
                                     <Box>
                                        <Text size="xs" fw={800}>{post.author.fullName}</Text>
                                        <Text size="10px" c="dimmed">Top Contributor</Text>
                                     </Box>
                                  </Group>
                                  <Group gap="lg">
                                     <Group gap={6} c="dimmed">
                                        <LuSend size={16} />
                                        <Text size="xs" fw={700}>{post.commentCount}</Text>
                                     </Group>
                                     <Group gap={6} c="dimmed">
                                        <LuEye size={16} />
                                        <Text size="xs" fw={700}>{post.viewCount}</Text>
                                     </Group>
                                  </Group>
                               </Group>
                            </Box>
                          </Group>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </Stack>
              )}
            </Stack>
          </Grid.Col>

          {/* Sidebar Column */}
          <Grid.Col span={{ base: 12, md: 4 }}>
             <Stack gap="xl" className="sticky top-4">
                {/* Community Stats */}
                <Paper p="xl" radius="2rem" withBorder className="bg-brand-600 text-white shadow-xl shadow-brand-500/20 border-none relative overflow-hidden">
                   <LuSparkles size={120} className="absolute -bottom-10 -right-10 opacity-10" />
                   <Title order={3} mb="xs">Gia đình SmartLMS</Title>
                   <Text size="sm" mb="xl" opacity={0.8}>Cùng nhau chinh phục kiến thức mỗi ngày.</Text>
                   <Group grow>
                      <Box>
                         <Text fw={900} size="xl">12.5k</Text>
                         <Text size="xs" opacity={0.7}>Học viên</Text>
                      </Box>
                      <Box>
                         <Text fw={900} size="xl">240+</Text>
                         <Text size="xs" opacity={0.7}>Chuyên gia</Text>
                      </Box>
                   </Group>
                </Paper>

                {/* Trending Tags */}
                <Paper p="xl" radius="2rem" withBorder className="glass">
                   <Title order={4} mb="md">Trending Topics</Title>
                   <Group gap="xs">
                      {['#DotNet8', '#React19', '#AI_Assistant', '#Docker_Compose', '#Machine_Learning', '#UI_UX'].map(tag => (
                        <Badge key={tag} variant="light" color="gray" size="lg" className="cursor-pointer hover:bg-slate-100 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                   </Group>
                </Paper>

                {/* Top Contributors Leaderboard */}
                <Paper p="xl" radius="2rem" withBorder className="glass">
                   <Group justify="space-between" mb="lg">
                      <Title order={4}>Bảng vinh danh</Title>
                      <Button variant="subtle" size="xs" color="brand" onClick={() => navigate('/leaderboard')}>
                         Xem tất cả
                      </Button>
                   </Group>
                   <Stack gap="md">
                      {[
                        { name: 'Hoàng Anh', xp: '12,450', rank: 1 },
                        { name: 'Minh Đức', xp: '10,200', rank: 2 },
                        { name: 'Thanh Vân', xp: '9,800', rank: 3 },
                      ].map((user, i) => (
                        <Group key={i} justify="space-between">
                           <Group gap="sm">
                              <Avatar size="sm" radius="xl" color={i === 0 ? 'orange' : 'gray'}>{user.name.charAt(0)}</Avatar>
                              <Box>
                                 <Text size="sm" fw={700}>{user.name}</Text>
                                 <Text size="xs" c="dimmed">{user.xp} XP</Text>
                              </Box>
                           </Group>
                           <Badge variant={i === 0 ? 'filled' : 'light'} color={i === 0 ? 'orange' : 'gray'}>#{user.rank}</Badge>
                        </Group>
                      ))}
                   </Stack>
                   <Button variant="light" fullWidth mt="xl" radius="xl" onClick={() => navigate('/community/friends')}>
                      Kết nối bạn bè
                   </Button>
                </Paper>
             </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};
