import React, { useState, useEffect } from 'react';
import { 
  Container, Stack, Title, Text, Group, Button, 
  TextInput, Card, Badge, Avatar, ActionIcon, Box, SimpleGrid, Paper
} from '@mantine/core';
import { 
  LuSearch, LuPlus, LuMessageSquare, LuEye, 
  LuArrowBigUp, LuCheck, LuFilter
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('slms_token');

  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get(`/api/community/posts?search=${search}`);
      setPosts(response.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap={40}>
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={1} fw={900} size={36} className="tracking-tight">Cộng đồng Hỏi-Đáp</Title>
            <Text c="dimmed" size="lg">Nơi kết nối tri thức và giải đáp mọi thắc mắc cùng chuyên gia.</Text>
          </Box>
          <Button 
            size="lg" 
            radius="md" 
            color="brand" 
            leftSection={<LuPlus size={20} />}
            onClick={() => {/* Open Modal to Create Post */}}
          >
            Đặt câu hỏi mới
          </Button>
        </Group>

        <Group gap="md">
          <TextInput
            placeholder="Tìm kiếm câu hỏi, chủ đề hoặc từ khóa..."
            leftSection={<LuSearch size={18} className="text-brand-500" />}
            size="lg"
            radius="xl"
            className="flex-1 glass"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchPosts()}
          />
          <ActionIcon size={54} radius="xl" variant="light" color="gray">
            <LuFilter size={24} />
          </ActionIcon>
        </Group>

        {loading ? (
          <Text ta="center" py={100}>Đang tải các cuộc thảo luận...</Text>
        ) : (
          <SimpleGrid cols={1} spacing="md">
            {posts.map((post) => (
              <Card 
                key={post.postId} 
                p="lg" 
                radius="xl" 
                withBorder 
                className="hover:shadow-md transition-all hover:border-brand-200 group cursor-pointer"
                onClick={() => navigate(`/community/${post.postId}`)}
              >
                <Group wrap="nowrap" align="flex-start" gap="xl">
                  <Stack align="center" gap={4} className="bg-slate-50 p-2 rounded-xl min-w-[60px]">
                    <ActionIcon variant="subtle" color="gray">
                      <LuArrowBigUp size={24} />
                    </ActionIcon>
                    <Text fw={800} size="lg">{post.voteCount}</Text>
                  </Stack>

                  <Box style={{ flex: 1 }}>
                    <Group gap="xs" mb={8}>
                      <Badge variant="dot" color="brand">{post.category || 'General'}</Badge>
                      <Text size="xs" c="dimmed">Đăng bởi {post.author.fullName} • {new Date(post.createdAt).toLocaleDateString('vi-VN')}</Text>
                    </Group>
                    
                    <Title order={4} mb="xs" className="group-hover:text-brand-600 transition-colors">
                      {post.title} {post.hasVerifiedAnswer && <LuCheck size={18} className="text-green-500 inline ml-1" />}
                    </Title>
                    
                    <Text size="sm" c="dimmed" lineClamp={2} mb="md">
                      {post.summary || "Bấm vào để xem chi tiết cuộc thảo luận này..."}
                    </Text>

                    <Group gap="xl">
                      <Group gap={6} c="dimmed">
                        <LuMessageSquare size={16} />
                        <Text size="xs" fw={600}>{post.commentCount} bình luận</Text>
                      </Group>
                      <Group gap={6} c="dimmed">
                        <LuEye size={16} />
                        <Text size="xs" fw={600}>{post.viewCount} lượt xem</Text>
                      </Group>
                    </Group>
                  </Box>

                  <Avatar radius="md" size="lg" color="brand" variant="light">
                    {post.author.fullName.charAt(0)}
                  </Avatar>
                </Group>
              </Card>
            ))}
            
            {posts.length === 0 && (
              <Paper p={100} withBorder radius="2rem" className="bg-slate-50/50 border-dashed border-2 text-center">
                <Text c="dimmed" size="lg">Không tìm thấy câu hỏi nào phù hợp với tìm kiếm của bạn.</Text>
                <Button variant="subtle" mt="md" onClick={() => {setSearch(''); fetchPosts();}}>Xem tất cả</Button>
              </Paper>
            )}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};
