import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Title, Text, Stack, 
  Group, Badge, ActionIcon, Box, SimpleGrid, 
  Tabs, ThemeIcon, Loader, Button, Avatar, Divider,
  ScrollArea, NavLink
} from '@mantine/core';
import { 
  LuBook, LuCode, LuFileText, LuMessageSquare, 
  LuStar, LuHeart, LuArrowLeft, LuPlay, 
  LuCheck, LuInfo, LuPenTool
} from 'react-icons/lu';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';
import { motion, AnimatePresence } from 'framer-motion';

export const StudyWorkspace = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('exercises');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiClient.get(`/api/student/course-content/${courseId}`);
        setContent(response.data);
        // Tự động chọn bài học đầu tiên
        if (response.data.modules?.[0]?.lessons?.[0]) {
          setSelectedLesson(response.data.modules[0].lessons[0]);
        }
      } catch (err) {
        console.error("Failed to fetch workspace content", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [courseId]);

  if (loading) return (
    <Stack align="center" justify="center" h="80vh">
      <Loader size="xl" color="brand" type="bars" />
      <Text fw={600} c="dimmed">Đang chuẩn bị không gian học tập...</Text>
    </Stack>
  );

  return (
    <Box className="min-h-screen bg-slate-50/50">
      <Container size="xl" py="md">
        <Group justify="space-between" mb="lg">
          <Button 
            variant="subtle" 
            color="gray" 
            leftSection={<LuArrowLeft size={16} />}
            onClick={() => navigate('/my-learning')}
          >
            Quay lại Kho khóa học
          </Button>
          <Group>
            <Badge size="lg" color="brand" variant="light">Pro Student</Badge>
          </Group>
        </Group>

        <Grid gutter="xl">
          {/* Cột trái: Sidebar danh sách bài học */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Paper radius="xl" p="md" withBorder className="glass">
              <Title order={4} mb="md" px="xs">Nội dung khóa học</Title>
              <ScrollArea h={600} offsetScrollbars>
                {content?.modules?.map((module) => (
                  <Box key={module.moduleId} mb="md">
                    <Text size="xs" fw={700} c="dimmed" mb={4} px="xs" tt="uppercase">
                      {module.title}
                    </Text>
                    <Stack gap={4}>
                      {module.lessons?.map((lesson) => (
                        <NavLink
                          key={lesson.lessonId}
                          label={lesson.title}
                          leftSection={
                            <ThemeIcon size="sm" variant="light" color={lesson.lessonType === 'Video' ? 'blue' : 'teal'}>
                              {lesson.lessonType === 'Video' ? <LuPlay size={12} /> : <LuFileText size={12} />}
                            </ThemeIcon>
                          }
                          active={selectedLesson?.lessonId === lesson.lessonId}
                          onClick={() => setSelectedLesson(lesson)}
                          className="rounded-lg"
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </ScrollArea>
            </Paper>
          </Grid.Col>

          {/* Cột chính: Workspace động */}
          <Grid.Col span={{ base: 12, md: 9 }}>
            <Stack gap="xl">
              {/* Header bài học đang chọn */}
              <Paper radius="xl" p="xl" withBorder className="glass bg-white">
                <Group justify="space-between" align="flex-start">
                  <Box>
                    <Title order={2} fw={900} className="tracking-tight">
                      {selectedLesson?.title || "Chọn bài học để bắt đầu"}
                    </Title>
                    <Text c="dimmed" size="sm" mt={4}>
                      Giảng viên: <Text span fw={700} c="brand">Nguyễn Thị Giang</Text> • Đánh giá: 4.9 ⭐
                    </Text>
                  </Box>
                  <Button variant="light" color="orange" leftSection={<LuHeart size={16} />}>
                    Donate ☕
                  </Button>
                </Group>
              </Paper>

              {/* 3 Trụ cột chính (Top Repositories) */}
              <SimpleGrid cols={3} spacing="lg">
                <Paper 
                  radius="xl" p="lg" withBorder 
                  className={`cursor-pointer transition-all ${activeTab === 'exercises' ? 'border-brand-500 bg-brand-50/50 shadow-lg' : 'hover:bg-white'}`}
                  onClick={() => setActiveTab('exercises')}
                >
                  <Group>
                    <ThemeIcon color="brand" radius="md" size="lg">
                      <LuBook size={20} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700} size="sm">Kho Bài Tập</Text>
                      <Text size="xs" c="dimmed">Flashcards & Quiz</Text>
                    </Box>
                  </Group>
                </Paper>

                <Paper 
                  radius="xl" p="lg" withBorder 
                  className={`cursor-pointer transition-all ${activeTab === 'code' ? 'border-indigo-500 bg-indigo-50/50 shadow-lg' : 'hover:bg-white'}`}
                  onClick={() => setActiveTab('code')}
                >
                  <Group>
                    <ThemeIcon color="indigo" radius="md" size="lg">
                      <LuCode size={20} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700} size="sm">Kho Bài Code</Text>
                      <Text size="xs" c="dimmed">Thực hành lập trình</Text>
                    </Box>
                  </Group>
                </Paper>

                <Paper 
                  radius="xl" p="lg" withBorder 
                  className={`cursor-pointer transition-all ${activeTab === 'articles' ? 'border-teal-500 bg-teal-50/50 shadow-lg' : 'hover:bg-white'}`}
                  onClick={() => setActiveTab('articles')}
                >
                  <Group>
                    <ThemeIcon color="teal" radius="md" size="lg">
                      <LuFileText size={20} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700} size="sm">Article/Tài liệu</Text>
                      <Text size="xs" c="dimmed">Kiến thức mở rộng</Text>
                    </Box>
                  </Group>
                </Paper>
              </SimpleGrid>

              {/* Khu vực (4): Danh sách hiển thị động */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Paper radius="xl" p="xl" withBorder className="glass bg-white min-h-[400px]">
                    <Group justify="space-between" mb="xl">
                      <Title order={3}>
                        {activeTab === 'exercises' && "📚 Hệ thống bài tập ôn luyện"}
                        {activeTab === 'code' && "💻 Thử thách lập trình"}
                        {activeTab === 'articles' && "📄 Tài liệu đi kèm"}
                      </Title>
                      <Badge size="lg" variant="dot">8 bài chưa làm</Badge>
                    </Group>

                    {/* Nội dung danh sách động */}
                    <Stack gap="md">
                      {activeTab === 'exercises' && (
                        <SimpleGrid cols={2}>
                          <Paper p="md" withBorder radius="md" className="hover:border-brand-500 cursor-pointer">
                            <Group>
                              <LuZap className="text-orange-500" />
                              <Box>
                                <Text fw={600}>Flashcard: Cơ bản về ASP.NET</Text>
                                <Text size="xs" c="dimmed">15 thẻ • Spaced Repetition</Text>
                              </Box>
                            </Group>
                          </Paper>
                          <Paper p="md" withBorder radius="md" className="hover:border-brand-500 cursor-pointer">
                            <Group>
                              <LuInfo className="text-blue-500" />
                              <Box>
                                <Text fw={600}>Quiz: Middleware & Pipeline</Text>
                                <Text size="xs" c="dimmed">10 câu hỏi • 80% pass</Text>
                              </Box>
                            </Group>
                          </Paper>
                        </SimpleGrid>
                      )}

                      {activeTab === 'code' && (
                        <Box ta="center" py={50}>
                          <LuCode size={48} className="text-slate-200 mb-4" />
                          <Text fw={700}>Bắt đầu thực hành Code bài này</Text>
                          <Button 
                            mt="md" color="indigo" radius="md"
                            onClick={() => navigate(`/coding/${selectedLesson?.lessonId}`)}
                          >
                            Mở IDE (Code Workspace)
                          </Button>
                        </Box>
                      )}

                      {activeTab === 'articles' && (
                        <Stack>
                          <Paper p="md" withBorder radius="md" className="flex justify-between items-center">
                            <Group>
                              <LuFileText className="text-teal-500" />
                              <Text fw={600}>Cấu trúc thư mục dự án mẫu.pdf</Text>
                            </Group>
                            <Button variant="light" size="xs">Tải xuống</Button>
                          </Paper>
                        </Stack>
                      )}

                      <Divider my="lg" label="Công cụ hỗ trợ" labelPosition="center" />
                      
                      <SimpleGrid cols={2}>
                         <Button 
                            variant="light" color="blue" fullWidth radius="md"
                            leftSection={<LuMessageSquare size={16} />}
                          >
                            Hỏi giảng viên bài này
                          </Button>
                          <Button 
                            variant="light" color="grape" fullWidth radius="md"
                            leftSection={<LuPenTool size={16} />}
                          >
                            Ghi chú lỗi sai (Mistake Note)
                          </Button>
                      </SimpleGrid>
                    </Stack>
                  </Paper>
                </motion.div>
              </AnimatePresence>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};
