import React, { useState, useEffect } from 'react';
import { 
  Container, Title, Text, Paper, Stack, Group, 
  Badge, ActionIcon, Table, Button, Loader,
  Box, ThemeIcon, Select, TextInput, Tooltip,
  SegmentedControl
} from '@mantine/core';
import { 
  LuBookOpen, LuZap, LuSearch, LuArrowLeft,
  LuClock, LuMessageSquare, LuTrash2, LuSparkles
} from 'react-icons/lu';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { SimpleGrid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';
import { motion, AnimatePresence } from 'framer-motion';

const MistakeNotebook = () => {
  const navigate = useNavigate();
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, resolved
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    fetchMistakes();
  }, [filter]);

  const fetchMistakes = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/student/mistakes');
      setMistakes(response.data);
    } catch (err) {
      console.error("Failed to fetch mistakes", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id, confidence) => {
    try {
      await apiClient.post(`/api/student/mistakes/${id}/resolve?confidence=${confidence}`);
      fetchMistakes();
    } catch (err) {
      console.error("Failed to resolve mistake", err);
    }
  };

  const filteredMistakes = mistakes.filter(m => {
    const matchesSearch = m.userAnswer?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.lesson?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'pending') return !m.isResolved && matchesSearch;
    if (filter === 'resolved') return m.isResolved && matchesSearch;
    return matchesSearch;
  });

  if (loading) return (
    <Stack align="center" justify="center" h="80vh">
      <Loader size="xl" color="brand" type="bars" />
      <Text fw={600} c="dimmed">Đang mở sổ tay lỗi sai...</Text>
    </Stack>
  );

  return (
    <Box className="min-h-screen bg-slate-50/50">
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Header */}
          <Group justify="space-between" align="flex-start">
            <Stack gap={4}>
              <Group>
                <ActionIcon variant="light" color="gray" radius="xl" onClick={() => navigate(-1)}>
                  <LuArrowLeft size={18} />
                </ActionIcon>
                <Title order={1} fw={900} className="tracking-tight">Sổ tay lỗi sai</Title>
              </Group>
              <Text c="dimmed">Dựa trên phương pháp Spaced Repetition để giúp bạn nhớ lâu hơn</Text>
            </Stack>
            <Button 
              variant="light" 
              color="brand" 
              leftSection={<LuSparkles size={16} />}
              className="hover:shadow-md transition-shadow"
            >
              AI Phân tích tổng thể
            </Button>
          </Group>

          {/* Stats Bar */}
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
             <Paper p="md" radius="xl" withBorder className="glass">
               <Group>
                 <ThemeIcon size="xl" color="red" variant="light" radius="md">
                   <FiAlertCircle size={24} />
                 </ThemeIcon>
                 <Box>
                   <Text size="xs" c="dimmed" fw={700}>CẦN ÔN TẬP</Text>
                   <Text size="xl" fw={900}>{mistakes.filter(m => !m.isResolved).length}</Text>
                 </Box>
               </Group>
             </Paper>
             <Paper p="md" radius="xl" withBorder className="glass">
               <Group>
                 <ThemeIcon size="xl" color="teal" variant="light" radius="md">
                   <FiCheckCircle size={24} />
                 </ThemeIcon>
                 <Box>
                   <Text size="xs" c="dimmed" fw={700}>ĐÃ VƯỢT QUA</Text>
                   <Text size="xl" fw={900}>{mistakes.filter(m => m.isResolved).length}</Text>
                 </Box>
               </Group>
             </Paper>
             <Paper p="md" radius="xl" withBorder className="glass">
               <Group>
                 <ThemeIcon size="xl" color="blue" variant="light" radius="md">
                   <LuZap size={24} />
                 </ThemeIcon>
                 <Box>
                   <Text size="xs" c="dimmed" fw={700}>TIẾP THU</Text>
                   <Text size="xl" fw={900}>{mistakes.length > 0 ? Math.round((mistakes.filter(m => m.isResolved).length / mistakes.length) * 100) : 0}%</Text>
                 </Box>
               </Group>
             </Paper>
          </SimpleGrid>

          {/* Filters */}
          <Paper p="md" radius="xl" withBorder className="glass">
            <Group justify="space-between">
              <SegmentedControl
                value={filter}
                onChange={setFilter}
                radius="xl"
                color="brand"
                data={[
                  { label: 'Tất cả', value: 'all' },
                  { label: 'Chưa sửa', value: 'pending' },
                  { label: 'Hoàn thành', value: 'resolved' },
                ]}
              />
              <TextInput 
                placeholder="Tìm kiếm lỗi sai..." 
                leftSection={<LuSearch size={14} />}
                radius="xl"
                w={300}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
              />
            </Group>
          </Paper>

          {/* List */}
          <AnimatePresence mode="popLayout">
            {filteredMistakes.length > 0 ? (
              <Stack gap="md">
                {filteredMistakes.map((m) => (
                  <motion.div
                    key={m.mistakeLogId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Paper p="xl" radius="xl" withBorder className={`glass transition-all hover:shadow-lg ${m.isResolved ? 'opacity-70 bg-slate-50' : ''}`}>
                      <Stack gap="md">
                        <Group justify="space-between">
                          <Group>
                            <Badge color={m.isResolved ? 'teal' : 'red'} variant="light">
                              {m.mistakeType || 'Lỗi kiến thức'}
                            </Badge>
                            <Text size="xs" c="dimmed" fw={700}>
                              BÀI HỌC: <Text span fw={800} c="brand">{m.lesson?.title}</Text>
                            </Text>
                          </Group>
                          <Group gap="xs">
                            <LuClock size={14} className="text-slate-400" />
                            <Text size="xs" c="dimmed">Ôn tập: {m.nextReviewDate ? new Date(m.nextReviewDate).toLocaleDateString() : 'Chưa hẹn'}</Text>
                          </Group>
                        </Group>

                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                          <Box p="md" radius="md" bg="red.0" className="border border-red-100">
                             <Text size="xs" fw={800} c="red" mb={4}>CÂU TRẢ LỜI CỦA BẠN</Text>
                             <Text size="sm">{m.userAnswer}</Text>
                          </Box>
                          <Box p="md" radius="md" bg="teal.0" className="border border-teal-100">
                             <Text size="xs" fw={800} c="teal" mb={4}>ĐÁP ÁN ĐÚNG</Text>
                             <Text size="sm" fw={600}>{m.correctAnswer}</Text>
                          </Box>
                        </SimpleGrid>

                        {m.correctionNote && (
                          <Paper p="md" radius="md" withBorder bg="white">
                            <Group align="flex-start">
                              <LuMessageSquare size={16} className="text-blue-500 mt-1" />
                              <Box flex={1}>
                                <Text size="xs" fw={800} c="blue">GHI CHÚ HỌC TẬP</Text>
                                <Text size="sm">{m.correctionNote}</Text>
                              </Box>
                            </Group>
                          </Paper>
                        )}

                        {/* AI Tutor Feedback - New in Phase 2 */}
                        <Paper 
                          p="md" radius="md" 
                          className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 shadow-sm"
                        >
                          <Group align="flex-start">
                            <ThemeIcon variant="light" color="indigo" radius="xl">
                              <LuSparkles size={14} />
                            </ThemeIcon>
                            <Box flex={1}>
                               <Text size="xs" fw={800} c="indigo">LỜI KHUYÊN TỪ GIA SƯ AI</Text>
                               <Text size="sm" italic className="text-slate-700">
                                 {m.mistakeType === 'Logic' 
                                   ? "Có vẻ bạn đang nhầm lẫn giữa Lifecycle và Scope. Hãy xem lại cơ chế 'Dependency Injection' ở chương 2 để nắm vững cách quản lý bộ nhớ nhé!"
                                   : "Lỗi này thường do việc đặt tên biến không rõ ràng. AI khuyên bạn nên tuân thủ quy tắc PascalCase để tránh nhầm lẫn."}
                               </Text>
                            </Box>
                          </Group>
                        </Paper>

                        {!m.isResolved && (
                          <Group justify="space-between" mt="md">
                            <Button 
                              variant="subtle" size="xs" color="blue" 
                              leftSection={<LuMessageSquare size={14} />}
                              onClick={() => navigate('/community/post/new', {
                                state: {
                                  lessonTitle: m.lesson?.title,
                                  extractedContent: `Tôi đang gặp thắc mắc về một lỗi sai trong bài **${m.lesson?.title}**:\n\n- **Câu trả lời của tôi:** ${m.userAnswer}\n- **Đáp án đúng:** ${m.correctAnswer}\n\n[Mô tả thêm vấn đề của bạn ở đây...]`
                                }
                              })}
                            >
                              Hỏi cộng đồng
                            </Button>
                            <Group gap="xs">
                              <Text size="xs" c="dimmed">Mức độ tự tin?</Text>
                              <Group gap={4}>
                                {[1, 2, 3, 4, 5].map(v => (
                                  <ActionIcon 
                                    key={v} 
                                    variant="light" 
                                    color={v <= 2 ? 'red' : v <= 3 ? 'orange' : 'teal'}
                                    onClick={() => handleResolve(m.mistakeLogId, v)}
                                  >
                                    {v}
                                  </ActionIcon>
                                ))}
                              </Group>
                            </Group>
                          </Group>
                        )}
                      </Stack>
                    </Paper>
                  </motion.div>
                ))}
              </Stack>
            ) : (
              <Paper p={100} radius="xl" withBorder className="glass" ta="center">
                <FiCheckCircle size={64} className="text-teal-200 mb-4 mx-auto" />
                <Title order={3} c="dimmed">Tuyệt vời! Không có lỗi sai nào cần ôn tập.</Title>
                <Text c="dimmed" mt="xs">Hãy tiếp tục học để rèn luyện tư duy nhé.</Text>
              </Paper>
            )}
          </AnimatePresence>
        </Stack>
      </Container>
    </Box>
  );
};

export default MistakeNotebook;
