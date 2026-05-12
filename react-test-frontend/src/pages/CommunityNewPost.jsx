import React, { useState } from 'react';
import {
  Box, Title, Text, Stack, Group, Paper, Button,
  TextInput, Textarea, Badge, Select, MultiSelect, Divider
} from '@mantine/core';
import {
  LuArrowLeft, LuSend, LuZap, LuBookOpen, LuSparkles, LuSearch
} from 'react-icons/lu';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Sprint 2: Trang tạo bài viết mới lên cộng đồng
// Hỗ trợ trích xuất từ bài học hoặc viết mới
export const CommunityNewPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Nhận context từ StudyWorkspace nếu được truyền vào (trích xuất bài học)
  const prefilledContext = location.state?.extractedContent || '';
  const prefillTitle = location.state?.lessonTitle ? `[Hỏi đáp] ${location.state.lessonTitle}` : '';

  const [title, setTitle] = useState(prefillTitle);
  const [content, setContent] = useState(prefilledContext);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const categories = [
    { value: 'ASP.NET', label: 'ASP.NET Core' },
    { value: 'React', label: 'React / Frontend' },
    { value: 'DevOps', label: 'Docker & DevOps' },
    { value: 'SQL', label: 'Database & SQL' },
    { value: 'AI/ML', label: 'AI & Machine Learning' },
    { value: 'General', label: 'Chung' },
  ];

  const tagOptions = [
    { value: 'bug', label: '🐛 Bug' },
    { value: 'question', label: '❓ Câu hỏi' },
    { value: 'discussion', label: '💬 Thảo luận' },
    { value: 'tip', label: '💡 Mẹo hay' },
    { value: 'review', label: '⭐ Review' },
  ];

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !category) {
      toast.error('Vui lòng điền đầy đủ Tiêu đề, Nội dung và Danh mục.');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.post('/api/community/posts', { title, content, category, tags });
      toast.success('Bài viết đã được đăng lên cộng đồng!');
      navigate('/community');
    } catch {
      toast.error('Không thể đăng bài. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maw={860} mx="auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Stack gap="xl">
          {/* Header */}
          <Group>
            <Button
              variant="subtle" color="gray" radius="xl"
              leftSection={<LuArrowLeft size={16} />}
              onClick={() => navigate('/community')}
            >
              Quay lại Cộng đồng
            </Button>
          </Group>

          <Box>
            <Title order={1} fw={900} className="tracking-tighter text-3xl text-slate-900">
              Đặt câu hỏi mới
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Hãy mô tả rõ vấn đề để cộng đồng có thể giúp bạn hiệu quả nhất.
            </Text>
          </Box>

          {/* Source indicator nếu được trích xuất từ bài học */}
          {location.state?.lessonTitle && (
            <Paper radius="xl" p="md" className="bg-brand-50 border border-brand-100">
              <Group gap="xs">
                <LuBookOpen size={16} className="text-brand-500" />
                <Text size="sm" fw={600} c="brand">
                  Trích xuất từ bài học: <b>{location.state.lessonTitle}</b>
                </Text>
              </Group>
            </Paper>
          )}

          {/* Notion-like Header Section */}
          <Paper radius="xl" className="overflow-hidden bg-white shadow-sm border border-slate-200">
            {/* Cover Image */}
            <Box h={180} className="bg-gradient-to-r from-brand-500 to-indigo-600 relative group">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
               <Button 
                variant="white" size="xs" radius="xl" 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                leftSection={<LuSparkles size={14} />}
               >
                 Thay ảnh bìa
               </Button>
            </Box>

            <Stack p="xl" gap="md" className="relative">
              {/* Emoji Icon Picker Placeholder */}
              <Box className="absolute -top-10 left-10">
                <Paper radius="2rem" p="sm" shadow="xl" withBorder className="bg-white cursor-pointer hover:scale-105 transition-transform w-20 h-20 flex items-center justify-center text-4xl">
                  {location.state?.lessonTitle ? '❓' : '📝'}
                </Paper>
              </Box>

              <Box mt="xl">
                <TextInput
                  placeholder="Tiêu đề bài viết..."
                  variant="unstyled"
                  size="xl"
                  styles={{ 
                    input: { 
                      fontSize: '2.5rem', 
                      fontWeight: 900, 
                      letterSpacing: '-0.05em',
                      height: 'auto',
                      padding: 0,
                      color: '#1e293b'
                    } 
                  }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                
                <Group gap="xs" mt="sm">
                  {location.state?.lessonTitle && (
                    <Badge variant="dot" color="brand" size="lg">
                      Nguồn: {location.state.lessonTitle}
                    </Badge>
                  )}
                  <Select
                    placeholder="Chọn danh mục"
                    variant="unstyled"
                    data={categories}
                    value={category}
                    onChange={setCategory}
                    styles={{ input: { fontWeight: 600, color: '#64748b' } }}
                  />
                </Group>
              </Box>

              <Divider />

              <Box>
                 <Textarea
                    placeholder="Bắt đầu viết nội dung của bạn ở đây... (Hỗ trợ Markdown)"
                    variant="unstyled"
                    minRows={12}
                    size="lg"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    styles={{ 
                      input: { 
                        fontSize: '1.1rem', 
                        lineHeight: 1.8,
                        padding: 0,
                        color: '#334155'
                      } 
                    }}
                 />
              </Box>

              <Group justify="space-between" mt="xl">
                 <MultiSelect
                    placeholder="Thêm tag..."
                    variant="filled"
                    data={tagOptions}
                    value={tags}
                    onChange={setTags}
                    radius="xl"
                    className="flex-1 max-w-md"
                 />
                 <Group>
                    <Button variant="subtle" color="gray" radius="xl" onClick={() => navigate('/community')}>Hủy</Button>
                    <Button
                      size="md" radius="xl" color="brand"
                      leftSection={<LuSend size={16} />}
                      loading={submitting}
                      onClick={handleSubmit}
                      className="shadow-xl shadow-brand-500/30 px-8"
                    >
                      Đăng bài viết
                    </Button>
                 </Group>
              </Group>
            </Stack>
          </Paper>

          {/* Tips */}
          <Paper radius="xl" p="xl" withBorder className="bg-indigo-50/50 border-indigo-100">
            <Group mb="md">
              <LuSparkles size={20} className="text-indigo-500" />
              <Text fw={700} c="indigo">Mẹo để nhận được câu trả lời tốt</Text>
            </Group>
            <Stack gap="xs">
              {[
                'Mô tả rõ bạn đã thử cách nào rồi và kết quả ra sao.',
                'Dán code lỗi vào khung nội dung (trong dấu ``` ```).',
                'Thêm log hoặc error message để cộng đồng dễ debug.',
                'Chọn đúng danh mục để chuyên gia phù hợp có thể hỗ trợ bạn.',
              ].map((tip, i) => (
                <Group key={i} gap="xs" align="flex-start">
                  <LuZap size={14} className="text-indigo-400 mt-1 shrink-0" />
                  <Text size="sm" c="indigo.7">{tip}</Text>
                </Group>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </motion.div>
    </Box>
  );
};
