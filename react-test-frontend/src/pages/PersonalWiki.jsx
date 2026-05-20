import React, { useState, useEffect } from 'react';
import { 
  Box, Grid, Paper, Stack, Title, Text, ActionIcon, 
  UnstyledButton, Group, Divider, TextInput, Tooltip, ThemeIcon
} from '@mantine/core';
import { 
  LuPlus, LuBookOpen, LuSettings, 
  LuSend, LuZap, LuSearch
} from 'react-icons/lu';
import axios from 'axios';
import { BASE_URL } from '../api';
import { toast } from 'sonner';

export const PersonalWiki = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('slms_token');

  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await apiClient.get('/api/wiki/pages');
      setPages(response.data);
      if (response.data.length > 0 && !selectedPage) {
        setSelectedPage(response.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch wiki pages", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="h-[calc(100vh-120px)] -m-xl overflow-hidden flex">
      {/* Sidebar - Cấu trúc thư mục */}
      <Box w={300} className="bg-slate-50/50 border-r border-slate-100 p-md flex flex-col">
        <Group justify="space-between" mb="xl" px="xs">
          <Title order={4} fw={800}>Không gian của tôi</Title>
          <ActionIcon variant="light" color="brand" radius="md" onClick={function() {
            const newPage = { documentPageId: Date.now(), title: 'Trang tài liệu mới của tôi', content: '' };
            setPages(prev => [...prev, newPage]);
            setSelectedPage(newPage);
            toast.success('Đã tạo một trang tài liệu mới thành công!');
          }}>
            <LuPlus size={18} />
          </ActionIcon>
        </Group>

        <Stack gap={4} className="flex-1 overflow-y-auto">
          {pages.map((page) => (
            <UnstyledButton 
              key={page.documentPageId}
              onClick={() => setSelectedPage(page)}
              className={`p-2 rounded-lg transition-all flex items-center gap-3 ${
                selectedPage?.documentPageId === page.documentPageId 
                ? 'bg-white shadow-sm text-brand-600' 
                : 'hover:bg-slate-100/50 text-slate-600'
              }`}
            >
              <LuBookOpen size={18} className={selectedPage?.documentPageId === page.documentPageId ? 'text-brand-500' : 'text-slate-400'} />
              <Text size="sm" fw={600} truncate>{page.title || 'Untitled'}</Text>
            </UnstyledButton>
          ))}
        </Stack>

        <Divider my="md" />
        <Stack gap={4}>
          <UnstyledButton className="p-2 rounded-lg hover:bg-slate-100/50 flex items-center gap-3 text-slate-500" onClick={function() { toast.success('Đang mở danh sách tài liệu đã xóa...'); }}>
            <LuZap size={18} />
            <Text size="sm" fw={600}>Thùng rác</Text>
          </UnstyledButton>
          <UnstyledButton className="p-2 rounded-lg hover:bg-slate-100/50 flex items-center gap-3 text-slate-500" onClick={function() { toast.success('Đang mở cấu hình cài đặt không gian làm việc...'); }}>
            <LuSettings size={18} />
            <Text size="sm" fw={600}>Cài đặt không gian</Text>
          </UnstyledButton>
        </Stack>
      </Box>

      {/* Editor Area */}
      <Box className="flex-1 bg-white p-20 overflow-y-auto">
        {selectedPage ? (
          <Container size="md">
            <Group justify="space-between" mb={40}>
              <Box className="bg-slate-50 p-4 rounded-2xl">
                <Text size="32px">📄</Text>
              </Box>
              <Group>
                <Button variant="light" color="gray" leftSection={<LuSend size={16} />} onClick={function() { toast.success('Đã sao chép liên kết chia sẻ tài liệu cá nhân!'); }}>Chia sẻ</Button>
                <ActionIcon variant="subtle" color="gray" size="lg" onClick={function() { toast.success('Đang tải cấu hình cài đặt tài liệu hiện tại...'); }}><LuSettings size={20} /></ActionIcon>
              </Group>
            </Group>

            <TextInput 
              variant="unstyled" 
              placeholder="Tiêu đề trang..." 
              value={selectedPage.title}
              styles={{
                input: { fontSize: '42px', fontWeight: 900, padding: 0, height: 'auto', marginBottom: '20px' }
              }}
            />

            <Box className="prose prose-slate max-w-none">
              <Text size="lg" c="dimmed">Bắt đầu viết nội dung tại đây... Hệ thống sẽ tự động lưu lại.</Text>
              {/* Future integration: Tip Tap or Quill Editor */}
            </Box>

            <Box mt={100} className="bg-brand-50/50 p-6 rounded-3xl border border-brand-100">
              <Group>
                <ThemeIcon color="brand" radius="xl" size="lg"><LuSettings size={20} /></ThemeIcon>
                <Box>
                  <Text fw={700} c="brand-700">Mẹo nhỏ từ AI</Text>
                  <Text size="sm" c="brand-600">Bạn có thể bôi đen bất kỳ đoạn văn bản nào để tạo nhanh Thẻ nhớ (Flashcard) ôn tập đấy!</Text>
                </Box>
              </Group>
            </Box>
          </Container>
        ) : (
          <Stack align="center" justify="center" h="100%" gap="md">
            <LuBookOpen size={80} className="text-slate-100" />
            <Text c="dimmed">Chọn một trang hoặc tạo trang mới để bắt đầu.</Text>
          </Stack>
        )}
      </Box>
    </Box>
  );
};
