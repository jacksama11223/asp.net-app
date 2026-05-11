import React, { useState, useEffect } from 'react';
import {
  Stack, Title, Text, Group, Button,
  TextInput, Card, Badge, Avatar, ActionIcon, Box, SimpleGrid, Paper, Tabs
} from '@mantine/core';
import {
  LuSearch, LuPlus, LuEye,
  LuZap, LuSettings, LuUsers, LuBookOpen, LuSend
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
    <Stack gap="xl">
      {/* Header */}
      <Group justify="space-between" align="flex-end">
        <Box>
          <Title order={1} fw={900} size={36} className="tracking-tight text-slate-900">
            Cộng đồng <Text span variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} inherit>Hỏi-Đáp</Text>
          </Title>
          <Text c="dimmed" size="sm" mt={4}>Nơi kết nối tri thức và giải đáp mọi thắc mắc cùng chuyên gia.</Text>
        </Box>
        {/* Sprint 2: Link tạo bài viết mới */}
        <Button
          size="md" radius="xl" color="brand"
          leftSection={<LuPlus size={18} />}
          onClick={() => navigate('/community/post/new')}
          className="shadow-lg shadow-brand-500/20"
        >
          Đặt câu hỏi mới
        </Button>
      </Group>

      {/* Search Bar */}
      <Paper radius="xl" p="sm" withBorder className="glass bg-white/80">
        <Group>
          <TextInput
            placeholder="Tìm kiếm câu hỏi, chủ đề hoặc từ khóa..."
            leftSection={<LuSearch size={18} className="text-brand-500" />}
            size="md" radius="xl" variant="unstyled"
            className="flex-1 px-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchPosts()}
          />
          <Button variant="light" color="gray" radius="xl" size="md" leftSection={<LuSettings size={16} />}>
            Lọc
          </Button>
        </Group>
      </Paper>

      {/* Category Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="xl">
        <Tabs.List>
          {categories.map(cat => (
            <Tabs.Tab key={cat} value={cat} className="capitalize">
              {cat === 'all' ? 'Tất cả' : cat}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      {/* Posts List */}
      {loading ? (
        <Text ta="center" py={100} c="dimmed">Đang tải các cuộc thảo luận...</Text>
      ) : (
        <SimpleGrid cols={1} spacing="md">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.postId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                p="lg" radius="xl" withBorder
                className="hover:shadow-md transition-all hover:border-brand-200 group cursor-pointer bg-white"
                onClick={() => navigate(`/community/${post.postId}`)}
              >
                <Group wrap="nowrap" align="flex-start" gap="xl">
                  {/* Vote Column */}
                  <Stack align="center" gap={4} className="bg-brand-50 p-3 rounded-xl min-w-[56px]">
                    <ActionIcon variant="subtle" color="brand" onClick={(e) => { e.stopPropagation(); }}>
                      <LuZap size={20} />
                    </ActionIcon>
                    <Text fw={900} size="lg" className="text-brand-700">{post.voteCount}</Text>
                    <Text size="9px" c="dimmed">vote</Text>
                  </Stack>

                  {/* Content */}
                  <Box style={{ flex: 1 }}>
                    <Group gap="xs" mb={8}>
                      <Badge variant="light" color="brand">{post.category || 'General'}</Badge>
                      {post.hasVerifiedAnswer && (
                        <Badge variant="filled" color="teal" size="xs" leftSection={<LuBookOpen size={10} />}>
                          Đã có đáp án
                        </Badge>
                      )}
                      <Text size="xs" c="dimmed">
                        Đăng bởi <b>{post.author.fullName}</b> • {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </Text>
                    </Group>

                    <Title order={4} mb="xs" className="group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </Title>

                    <Text size="sm" c="dimmed" lineClamp={2} mb="md">
                      {post.summary || "Bấm vào để xem chi tiết cuộc thảo luận này..."}
                    </Text>

                    <Group gap="xl">
                      <Group gap={6} c="dimmed">
                        <LuSend size={14} />
                        <Text size="xs" fw={600}>{post.commentCount} bình luận</Text>
                      </Group>
                      <Group gap={6} c="dimmed">
                        <LuEye size={14} />
                        <Text size="xs" fw={600}>{post.viewCount} lượt xem</Text>
                      </Group>
                      <Group gap={6} c="dimmed">
                        <LuUsers size={14} />
                        <Text size="xs" fw={600}>Cộng đồng SmartLMS</Text>
                      </Group>
                    </Group>
                  </Box>

                  <Avatar radius="xl" size="lg" color="brand" variant="light">
                    {post.author.fullName.charAt(0)}
                  </Avatar>
                </Group>
              </Card>
            </motion.div>
          ))}

          {filteredPosts.length === 0 && (
            <Paper p={80} withBorder radius="2xl" className="bg-slate-50/50 border-dashed border-2 text-center">
              <LuSearch size={40} className="text-slate-200 mx-auto mb-4" />
              <Text c="dimmed" size="lg">Không tìm thấy câu hỏi nào phù hợp.</Text>
              <Button variant="subtle" mt="md" onClick={() => { setSearch(''); setActiveTab('all'); fetchPosts(); }}>
                Xem tất cả
              </Button>
            </Paper>
          )}
        </SimpleGrid>
      )}
    </Stack>
  );
};
