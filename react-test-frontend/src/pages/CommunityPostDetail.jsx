import React, { useState, useEffect } from 'react';
import { Container, Stack, Title, Text, Group, Avatar, Badge, Paper, ActionIcon, Box, Button, Textarea, Menu } from '@mantine/core';
import { LuReply, LuPencil, LuTrash, LuShare } from 'react-icons/lu';
import { FiMoreVertical } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';
import { toast } from 'sonner';

// SVG Icons from Phase 1
import LoveIcon from '../assets/icons/react_love.svg';
import HahaIcon from '../assets/icons/react_haha.svg';
import UpvoteIcon from '../assets/icons/vote_up_active.svg';

export const CommunityPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  
  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => { fetchPostDetail(); }, [id]);

  const fetchPostDetail = async () => {
    try {
      const response = await apiClient.get(`/api/community/posts/${id}`);
      setPost(response.data);
    } catch {
      // Mock Data if API fails
      setPost({
        postId: id,
        title: 'Cách tối ưu React Component Render?',
        content: 'Mọi người cho mình hỏi làm sao để chống re-render thừa trong React?',
        createdAt: new Date().toISOString(),
        author: { fullName: 'Minh Tuấn', userId: 1 },
        threadedComments: [
          {
            comment: { commentId: 101, content: 'Dùng React.memo nha bạn @Minh Tuấn.', createdAt: new Date().toISOString(), author: { fullName: 'Hoàng', userId: 2 }, upvotes: 5 },
            replies: [
              { commentId: 102, content: 'Cảm ơn bác, để em thử.', createdAt: new Date().toISOString(), author: { fullName: 'Minh Tuấn', userId: 1 }, upvotes: 0 }
            ]
          }
        ]
      });
    } finally { setLoading(false); }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      await apiClient.post(`/api/community/posts/${id}/comment`, { content: newComment });
      toast.success('Đã gửi bình luận');
      setNewComment('');
      fetchPostDetail();
    } catch {
      toast.success('Đã giả lập gửi bình luận!');
      setNewComment('');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await apiClient.delete(`/api/community/comments/${commentId}`);
      toast.success('Bình luận đã được xóa (Hoàn tác)');
      fetchPostDetail();
    } catch {
      toast.success('Đã giả lập xóa bình luận!');
    }
  };

  const renderContentWithMentions = (text) => {
    // Parse @username and wrap in mention-tag
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, i) => 
      part.startsWith('@') 
        ? <span key={i} className="mention-tag bg-blue-100 text-blue-600 px-1 rounded cursor-pointer">{part}</span> 
        : part
    );
  };

  const renderComment = (item, isReply = false) => {
    const { comment, replies } = item.comment ? item : { comment: item, replies: [] };
    
    return (
      <Box key={comment.commentId} className={isReply ? "comment-thread-line ml-8 pl-4 border-l-2 border-slate-200" : "mt-4"}>
        <Group align="flex-start" wrap="nowrap">
          <Avatar radius="xl" color="brand">{comment.author?.fullName?.charAt(0)}</Avatar>
          <Box flex={1}>
            <Paper p="md" radius="lg" className="bg-slate-50 relative group">
              <Group justify="space-between" mb="xs">
                <Group gap="xs">
                  <Text fw={700} size="sm">{comment.author?.fullName}</Text>
                  {comment.author?.userId === post?.author?.userId && <Badge size="xs" color="brand">Tác giả</Badge>}
                  <Text size="xs" c="dimmed">{new Date(comment.createdAt).toLocaleString('vi-VN')}</Text>
                  {comment.isEdited && <Text size="xs" c="dimmed">(đã sửa)</Text>}
                </Group>
                
                {/* Menu Xóa/Sửa */}
                <Menu position="bottom-end">
                  <Menu.Target>
                    <ActionIcon variant="subtle" className="opacity-0 group-hover:opacity-100 transition-opacity"><FiMoreVertical size={16} /></ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<LuPencil size={14} />}>Sửa bình luận</Menu.Item>
                    <Menu.Item color="red" leftSection={<LuTrash size={14} />} onClick={() => handleDeleteComment(comment.commentId)}>Xóa</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              <Text size="sm">{renderContentWithMentions(comment.content)}</Text>
              
              {/* Interaction Bar with 3D Popup */}
              <Group mt="md" gap="lg" className="reaction-trigger">
                <Group gap="xs" className="cursor-pointer text-slate-500 hover:text-brand-600">
                   <img src={UpvoteIcon} alt="Upvote" width={16} height={16} />
                   <Text size="xs" fw={700}>{comment.upvotes || 0}</Text>
                </Group>
                <Group gap="xs" className="cursor-pointer text-slate-500 hover:text-brand-600">
                   <LuReply size={16} />
                   <Text size="xs" fw={600}>Trả lời</Text>
                </Group>

                {/* 3D Reaction Popup */}
                <Box className="reaction-popup absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg p-1 flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform scale-95 group-hover:scale-100 z-10 pointer-events-none group-hover:pointer-events-auto">
                   <img src={LoveIcon} alt="Love" className="w-8 h-8 hover:scale-125 cursor-pointer transition-transform" onClick={() => toast('Đã thả tim')} />
                   <img src={HahaIcon} alt="Haha" className="w-8 h-8 hover:scale-125 cursor-pointer transition-transform" onClick={() => toast('Đã thả haha')} />
                </Box>
              </Group>
            </Paper>

            {/* Recursively render replies */}
            {replies && replies.length > 0 && (
              <Stack gap="sm" mt="sm">
                {replies.map(reply => renderComment(reply, true))}
              </Stack>
            )}
          </Box>
        </Group>
      </Box>
    );
  };

  if (loading) return <Container py="xl"><Text>Đang tải...</Text></Container>;

  return (
    <Container size="md" py="xl">
      <Button variant="subtle" onClick={() => navigate('/community')} mb="lg">← Quay lại diễn đàn</Button>
      
      {/* Main Post */}
      <Paper p="xl" radius="lg" withBorder className="shadow-sm">
        <Title order={2} mb="md">{post.title}</Title>
        <Group mb="xl">
          <Avatar radius="xl" color="indigo">{post.author?.fullName?.charAt(0)}</Avatar>
          <Box>
            <Text fw={700}>{post.author?.fullName}</Text>
            <Text size="xs" c="dimmed">{new Date(post.createdAt).toLocaleString('vi-VN')}</Text>
          </Box>
        </Group>
        <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</Text>
      </Paper>

      {/* Comment Section */}
      <Title order={4} mt="xl" mb="md">Bình luận ({post.threadedComments?.length || 0})</Title>
      
      <Paper p="md" radius="lg" withBorder mb="xl">
        <Textarea 
          placeholder="Bạn nghĩ gì về chủ đề này? (Gõ @ để nhắc tên ai đó...)" 
          minRows={3} 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          mb="sm"
        />
        <Group justify="flex-end">
          <Button color="brand" onClick={handlePostComment}>Gửi bình luận</Button>
        </Group>
      </Paper>

      <Stack gap="md">
        {post.threadedComments?.map(item => renderComment(item))}
      </Stack>
    </Container>
  );
};
