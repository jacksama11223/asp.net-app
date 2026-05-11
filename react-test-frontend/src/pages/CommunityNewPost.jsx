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

          {/* Form */}
          <Paper radius="xl" p="xl" withBorder className="glass bg-white shadow-sm">
            <Stack gap="lg">
              {/* Title */}
              <Box>
                <Text fw={700} mb={6} size="sm">Tiêu đề câu hỏi <Text span c="red">*</Text></Text>
                <TextInput
                  placeholder="Ví dụ: Làm sao xử lý lỗi 401 Unauthorized trong ASP.NET Core?"
                  radius="xl"
                  size="md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Text size="xs" c="dimmed" mt={4}>Hãy đặt câu hỏi cụ thể và rõ ràng để nhận được câu trả lời tốt nhất.</Text>
              </Box>

              {/* Category & Tags */}
              <Group grow>
                <Box>
                  <Text fw={700} mb={6} size="sm">Danh mục <Text span c="red">*</Text></Text>
                  <Select
                    placeholder="Chọn danh mục phù hợp"
                    data={categories}
                    value={category}
                    onChange={setCategory}
                    radius="xl"
                    size="md"
                  />
                </Box>
                <Box>
                  <Text fw={700} mb={6} size="sm">Thẻ tag (không bắt buộc)</Text>
                  <MultiSelect
                    placeholder="Thêm tag..."
                    data={tagOptions}
                    value={tags}
                    onChange={setTags}
                    radius="xl"
                    size="md"
                    maxValues={3}
                  />
                </Box>
              </Group>

              <Divider />

              {/* Content */}
              <Box>
                <Text fw={700} mb={6} size="sm">Nội dung chi tiết <Text span c="red">*</Text></Text>
                <Textarea
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải. Hãy thêm code, ảnh chụp màn hình nếu cần..."
                  minRows={10}
                  radius="xl"
                  size="md"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  styles={{ input: { fontFamily: 'inherit', lineHeight: 1.7 } }}
                />
                <Group justify="space-between" mt={4}>
                  <Text size="xs" c="dimmed">Hỗ trợ Markdown để định dạng văn bản.</Text>
                  <Text size="xs" c="dimmed">{content.length} ký tự</Text>
                </Group>
              </Box>

              {/* Preview Card */}
              {title && (
                <Paper radius="xl" p="lg" className="bg-slate-50 border border-slate-200">
                  <Text size="xs" fw={700} c="dimmed" mb="xs" tt="uppercase">Xem trước</Text>
                  <Group gap="xs" mb="xs">
                    {category && <Badge variant="light" color="brand">{category}</Badge>}
                    {tags.map(t => <Badge key={t} variant="dot" color="gray" size="xs">{t}</Badge>)}
                  </Group>
                  <Title order={4}>{title}</Title>
                  <Text size="sm" c="dimmed" lineClamp={3} mt="xs">{content}</Text>
                </Paper>
              )}

              {/* Submit */}
              <Group justify="flex-end" mt="md">
                <Button variant="default" radius="xl" onClick={() => navigate('/community')}>
                  Hủy
                </Button>
                <Button
                  size="md" radius="xl" color="brand"
                  leftSection={<LuSend size={16} />}
                  loading={submitting}
                  onClick={handleSubmit}
                  className="shadow-md shadow-brand-500/20"
                >
                  Đăng lên Cộng đồng
                </Button>
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
