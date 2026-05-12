import React, { useState, useEffect } from 'react';
import {
  Container, Stack, Title, Text, Group, Button, 
  TextInput, Badge, Avatar, Table, Paper, ActionIcon, Box, Tooltip
} from '@mantine/core';
import {
  LuSearch, LuPlus, LuMessageSquare, LuEye, 
  LuZap, LuClock, LuChevronUp, LuFilter, LuMoreHorizontal
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const ForumHome = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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
      // Mock data phong cách Forum
      setPosts([
        { 
          id: 1, title: '[Thảo luận] Có nên dùng Clean Architecture cho dự án nhỏ?', 
          author: 'Hoàng Anh', replies: 42, views: '1.2k', 
          category: 'Kiến trúc', lastPost: '2 phút trước', 
          isSticky: true, isHot: true 
        },
        { 
          id: 2, title: 'Share tài liệu học Docker từ Zero đến Hero', 
          author: 'Minh Đức', replies: 12, views: '850', 
          category: 'DevOps', lastPost: '15 phút trước',
          isSticky: false, isHot: false
        },
        { 
          id: 3, title: 'Lỗi 500 khi deploy ASP.NET Core lên Ubuntu 22.04', 
          author: 'Thanh Vân', replies: 5, views: '210', 
          category: 'Bug', lastPost: '1 giờ trước',
          isSticky: false, isHot: false
        },
      ]);
    } finally { setLoading(false); }
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header Forum */}
        <Group justify="space-between">
          <Box>
            <Title order={1} fw={900} size={38} className="tracking-tighter">
              SmartLMS <Text span c="brand" inherit>Forum</Text>
            </Title>
            <Text c="dimmed" size="sm">Cộng đồng chia sẻ tri thức và hỗ trợ kỹ thuật 24/7.</Text>
          </Box>
          <Button 
            size="md" radius="xl" color="brand" 
            leftSection={<LuPlus size={18} />}
            onClick={() => navigate('/community/post/new')}
          >
            Tạo chủ đề mới
          </Button>
        </Group>

        {/* Search & Statistics */}
        <Paper p="md" radius="xl" withBorder className="bg-slate-50/50 shadow-sm">
           <Group grow>
              <TextInput 
                placeholder="Tìm kiếm trong diễn đàn..." 
                leftSection={<LuSearch size={18} />}
                radius="xl"
                size="md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchPosts()}
              />
              <Group gap="xl" justify="flex-end" px="md">
                 <Box ta="center">
                    <Text fw={900} size="lg">1,240</Text>
                    <Text size="10px" c="dimmed" tt="uppercase">Chủ đề</Text>
                 </Box>
                 <Box ta="center">
                    <Text fw={900} size="lg">8,500</Text>
                    <Text size="10px" c="dimmed" tt="uppercase">Bài viết</Text>
                 </Box>
                 <Box ta="center">
                    <Text fw={900} size="lg">145</Text>
                    <Text size="10px" c="dimmed" tt="uppercase">Online</Text>
                 </Box>
              </Group>
           </Group>
        </Paper>

        {/* Forum Thread List */}
        <Paper radius="xl" withBorder className="overflow-hidden shadow-sm">
          <Table verticalSpacing="md" horizontalSpacing="xl" highlightOnHover>
             <thead className="bg-slate-50">
                <tr>
                  <th>Chủ đề</th>
                  <th style={{ width: 120, textAlign: 'center' }}>Thống kê</th>
                  <th style={{ width: 200 }}>Bài cuối</th>
                </tr>
             </thead>
             <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="cursor-pointer hover:bg-slate-50/50" onClick={() => navigate(`/community/${post.id}`)}>
                    <td>
                      <Group gap="md" wrap="nowrap">
                         <ThemeIcon 
                          variant="light" 
                          color={post.isSticky ? 'orange' : 'brand'} 
                          size="lg" radius="xl"
                         >
                           {post.isSticky ? <LuChevronUp size={20} /> : <LuMessageSquare size={18} />}
                         </ThemeIcon>
                         <Box>
                            <Group gap="xs" mb={4}>
                               {post.isSticky && <Badge color="orange" size="xs">Dán lên đầu</Badge>}
                               {post.isHot && <Badge color="red" size="xs">HOT</Badge>}
                               <Badge variant="outline" color="gray" size="xs">{post.category}</Badge>
                            </Group>
                            <Text fw={700} size="md" className="hover:text-brand-600 transition-colors">
                               {post.title}
                            </Text>
                            <Text size="xs" c="dimmed">Bởi <b>{post.author}</b> • {post.lastPost}</Text>
                         </Box>
                      </Group>
                    </td>
                    <td>
                       <Stack gap={2} align="center">
                          <Group gap={4}>
                             <Text size="sm" fw={800}>{post.replies}</Text>
                             <LuMessageSquare size={12} className="text-slate-400" />
                          </Group>
                          <Group gap={4}>
                             <Text size="xs" c="dimmed">{post.views}</Text>
                             <LuEye size={10} className="text-slate-400" />
                          </Group>
                       </Stack>
                    </td>
                    <td>
                       <Group gap="sm">
                          <Avatar size="sm" radius="xl" color="brand">{post.author.charAt(0)}</Avatar>
                          <Box>
                             <Text size="xs" fw={700}>{post.author}</Text>
                             <Text size="xs" c="dimmed">{post.lastPost}</Text>
                          </Box>
                       </Group>
                    </td>
                  </tr>
                ))}
             </tbody>
          </Table>
        </Paper>

        {/* Pagination placeholder */}
        <Group justify="center">
           <Button variant="light" color="gray" radius="xl" size="xs">1</Button>
           <Button variant="subtle" color="gray" radius="xl" size="xs">2</Button>
           <Button variant="subtle" color="gray" radius="xl" size="xs">3</Button>
           <Text c="dimmed" size="xs">...</Text>
           <Button variant="subtle" color="gray" radius="xl" size="xs">Cuối</Button>
        </Group>
      </Stack>
    </Container>
  );
};
