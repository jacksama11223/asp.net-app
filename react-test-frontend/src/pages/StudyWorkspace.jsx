import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Title, Text, Stack, 
  Group, Badge, ActionIcon, Box, SimpleGrid, 
  Tabs, ThemeIcon, Loader, Button, Avatar, Divider,
  ScrollArea, NavLink, AspectRatio, RingProgress
} from '@mantine/core';
import { 
  LuBookOpen, LuSettings, LuZap, LuUsers, 
  LuSparkles, LuLayoutDashboard, LuArrowLeft, LuPlay, 
  LuPenTool, LuExternalLink, LuSearch, LuSend
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
  const [bookmarked, setBookmarked] = useState(false);
  const [completionRate, setCompletionRate] = useState(45); // Mock completion rate

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
        // Tự động chọn bài học đầu tiên từ module đầu tiên
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

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = url.split('v=')[1] || url.split('/').pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

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
            <RingProgress
              size={50}
              thickness={4}
              sections={[{ value: completionRate, color: 'brand' }]}
              label={<Text ta="center" size="xs" fw={700}>{completionRate}%</Text>}
            />
            <Badge size="lg" color="brand" variant="light" leftSection={<LuSparkles size={12} />}>Premium Learner</Badge>
          </Group>
        </Group>

        <Grid gutter="xl">
          {/* Cột trái: Sidebar danh sách bài học */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Paper radius="xl" p="md" withBorder className="glass shadow-sm sticky top-4">
              <Group mb="md" px="xs">
                <LuBookOpen size={18} className="text-brand-500" />
                <Title order={4}>Lộ trình học tập</Title>
              </Group>
              <ScrollArea h="calc(100vh - 200px)" offsetScrollbars>
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
                          description={lesson.lessonType}
                          leftSection={
                            <ThemeIcon size="sm" variant="light" color={lesson.lessonType === 'Video' ? 'blue' : 'teal'}>
                              {lesson.lessonType === 'Video' ? <LuPlay size={12} /> : <LuSettings size={12} />}
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
              {/* Header bài học */}
              <Paper radius="xl" p="xl" withBorder className="glass bg-white shadow-sm">
                <Stack gap="md">
                   <Group justify="space-between" align="flex-start">
                    <Box>
                      <Title order={2} fw={900} className="tracking-tight text-slate-800">
                        {selectedLesson?.title || "Chọn bài học để bắt đầu"}
                      </Title>
                      <Text c="dimmed" size="sm" mt={4}>
                        Module: <Text span fw={700} c="brand">Nền tảng kiến thức</Text> • Thưởng: <Text span fw={700} color="orange">{selectedLesson?.points || 0} XP</Text>
                      </Text>
                    </Box>
                    <Group>
                       <Button 
                        variant={bookmarked ? "filled" : "light"} 
                        color="orange" 
                        leftSection={<LuZap size={16} />}
                        onClick={() => setBookmarked(!bookmarked)}
                      >
                        {bookmarked ? "Đã lưu dấu trang" : "Đánh dấu trang"}
                      </Button>
                    </Group>
                  </Group>

                  {/* Vùng hiển thị Video hoặc Content */}
                  {selectedLesson?.lessonType === 'Video' && selectedLesson?.videoUrl ? (
                    <AspectRatio ratio={16 / 9} radius="xl" className="overflow-hidden shadow-2xl border-4 border-slate-100">
                      <iframe
                        src={getEmbedUrl(selectedLesson.videoUrl)}
                        title="Lesson Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </AspectRatio>
                  ) : (
                    <Paper p="xl" radius="xl" bg="slate.0" withBorder>
                       <div className="prose max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: selectedLesson?.content || "<p>Chưa có nội dung văn bản cho bài học này.</p>" }} />
                       </div>
                    </Paper>
                  )}
                </Stack>
              </Paper>

              {/* Tabs bổ trợ: Exercises, Code, Articles */}
              <SimpleGrid cols={3} spacing="lg">
                <Paper 
                  radius="xl" p="lg" withBorder 
                  className={`cursor-pointer transition-all border-2 ${activeTab === 'exercises' ? 'border-brand-500 bg-brand-50/50 shadow-md' : 'border-transparent hover:bg-white'}`}
                  onClick={() => setActiveTab('exercises')}
                >
                  <Group>
                    <ThemeIcon color="brand" radius="md" size="lg" variant={activeTab === 'exercises' ? 'filled' : 'light'}>
                      <LuBookOpen size={20} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700} size="sm">Hệ thống Bài tập</Text>
                      <Text size="xs" c="dimmed">{selectedLesson?.flashcardCount || 0} Flashcards & Quiz</Text>
                    </Box>
                  </Group>
                </Paper>

                <Paper 
                  radius="xl" p="lg" withBorder 
                  className={`cursor-pointer transition-all border-2 ${activeTab === 'code' ? 'border-indigo-500 bg-indigo-50/50 shadow-md' : 'border-transparent hover:bg-white'}`}
                  onClick={() => setActiveTab('code')}
                >
                  <Group>
                    <ThemeIcon color="indigo" radius="md" size="lg" variant={activeTab === 'code' ? 'filled' : 'light'}>
                      <LuPenTool size={20} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700} size="sm">Thực hành Code</Text>
                      <Text size="xs" c="dimmed">{selectedLesson?.hasChallenge ? '1 Thử thách' : 'Chưa có bài code'}</Text>
                    </Box>
                  </Group>
                </Paper>

                <Paper 
                  radius="xl" p="lg" withBorder 
                  className={`cursor-pointer transition-all border-2 ${activeTab === 'articles' ? 'border-teal-500 bg-teal-50/50 shadow-md' : 'border-transparent hover:bg-white'}`}
                  onClick={() => setActiveTab('articles')}
                >
                  <Group>
                    <ThemeIcon color="teal" radius="md" size="lg" variant={activeTab === 'articles' ? 'filled' : 'light'}>
                      <LuSettings size={20} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700} size="sm">Tài liệu mở rộng</Text>
                      <Text size="xs" c="dimmed">PDF & Slide bài giảng</Text>
                    </Box>
                  </Group>
                </Paper>
                <Paper 
                  radius="xl" p="lg" withBorder 
                  className={`cursor-pointer transition-all border-2 ${activeTab === 'weakPoints' ? 'border-red-500 bg-red-50/50 shadow-md' : 'border-transparent hover:bg-white'}`}
                  onClick={() => setActiveTab('weakPoints')}
                >
                  <Group>
                    <ThemeIcon color="red" radius="md" size="lg" variant={activeTab === 'weakPoints' ? 'filled' : 'light'}>
                      <LuSearch size={20} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700} size="sm">Điểm yếu của tôi</Text>
                      <Text size="xs" c="dimmed">Phân tích bằng AI</Text>
                    </Box>
                  </Group>
                </Paper>
              </SimpleGrid>

              {/* Content Panel động */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + (selectedLesson?.lessonId || '')}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Paper radius="xl" p="xl" withBorder className="glass bg-white min-h-[300px] shadow-sm">
                    {/* Exercises Panel */}
                    {activeTab === 'exercises' && (
                      <Stack gap="md">
                        <Title order={3}>📚 Bài tập củng cố</Title>
                        {selectedLesson?.flashcardCount > 0 ? (
                           <Paper p="md" withBorder radius="md" className="hover:border-brand-500 cursor-pointer group" onClick={() => navigate(`/flashcards/${selectedLesson.lessonId}`)}>
                            <Group justify="space-between">
                              <Group>
                                <LuZap className="text-orange-500 group-hover:scale-125 transition-transform" />
                                <Box>
                                  <Text fw={600}>Bộ Flashcards: {selectedLesson.title}</Text>
                                  <Text size="xs" c="dimmed">{selectedLesson.flashcardCount} thẻ • Spaced Repetition</Text>
                                </Box>
                              </Group>
                              <LuExternalLink size={16} className="text-slate-300" />
                            </Group>
                          </Paper>
                        ) : (
                          <Text c="dimmed" ta="center" py="xl">Chưa có Flashcard cho bài học này.</Text>
                        )}
                        
                        <Paper p="md" withBorder radius="md" className="hover:border-blue-500 cursor-pointer group">
                          <Group>
                            <LuSparkles className="text-blue-500 group-hover:rotate-12 transition-transform" />
                            <Box>
                              <Text fw={600}>Quiz kiến thức nhanh</Text>
                              <Text size="xs" c="dimmed">Tự động tạo bởi AI dựa trên nội dung bài</Text>
                            </Box>
                          </Group>
                        </Paper>
                      </Stack>
                    )}

                    {/* Code Panel */}
                    {activeTab === 'code' && (
                       <Box ta="center" py={50}>
                        <LuPenTool size={48} className="text-slate-200 mb-4" />
                        <Title order={4}>{selectedLesson?.hasChallenge ? 'Sẵn sàng thử thách?' : 'Bài học này chưa có thử thách code'}</Title>
                        {selectedLesson?.hasChallenge ? (
                          <Button 
                            mt="md" color="indigo" radius="md" size="lg"
                            onClick={() => navigate(`/coding/${selectedLesson.challengeId}`)}
                          >
                            Mở IDE & Bắt đầu Code
                          </Button>
                        ) : (
                          <Text c="dimmed" mt="xs">Giảng viên đang biên soạn bài tập thực hành...</Text>
                        )}
                      </Box>
                    )}

                    {/* Articles Panel */}
                    {activeTab === 'articles' && (
                       <Stack>
                        <Title order={3}>📄 Tài liệu giáo trình</Title>
                        <Paper p="md" withBorder radius="md" className="flex justify-between items-center hover:bg-slate-50 transition-colors">
                          <Group>
                            <LuSettings className="text-teal-500" />
                            <Box>
                               <Text fw={600}>Slide bài giảng: {selectedLesson?.title}</Text>
                               <Text size="xs" c="dimmed">Định dạng: PDF • 1.2 MB</Text>
                            </Box>
                          </Group>
                          <Button variant="light" size="xs">Xem / Tải xuống</Button>
                        </Paper>
                        <Divider label="Tài liệu tham khảo" labelPosition="center" />
                        <Text size="sm" c="dimmed" ta="center">Không có tài liệu tham khảo bổ sung.</Text>
                      </Stack>
                    )}
                    {/* Weak Points Panel */}
                    {activeTab === 'weakPoints' && (
                      <Stack>
                        <Title order={3}>🎯 Phân tích điểm yếu</Title>
                        <Text c="dimmed" size="sm">Dựa trên kết quả bài tập Flashcard và Quiz, hệ thống AI phát hiện bạn thường xuyên sai ở các chủ đề sau:</Text>
                        <SimpleGrid cols={2} spacing="md">
                          <Paper p="md" withBorder radius="md" className="border-red-200 bg-red-50">
                            <Group justify="space-between" mb="xs">
                              <Badge color="red" variant="filled">Khái niệm cốt lõi</Badge>
                              <Text size="xs" fw={700} c="red">Sai 4 lần</Text>
                            </Group>
                            <Text size="sm" fw={600}>Dependency Injection Lifecycle</Text>
                            <Text size="xs" c="dimmed" mt="xs">Khuyên dùng: Xem lại Module 2, Bài 3</Text>
                          </Paper>
                          <Paper p="md" withBorder radius="md" className="border-orange-200 bg-orange-50">
                            <Group justify="space-between" mb="xs">
                              <Badge color="orange" variant="filled">Thực hành</Badge>
                              <Text size="xs" fw={700} c="orange">Sai 2 lần</Text>
                            </Group>
                            <Text size="sm" fw={600}>Kết nối Entity Framework</Text>
                            <Text size="xs" c="dimmed" mt="xs">Khuyên dùng: Làm lại thử thách code Module 3</Text>
                          </Paper>
                        </SimpleGrid>
                      </Stack>
                    )}
                  </Paper>
                </motion.div>
              </AnimatePresence>

              {/* Footer Tools */}
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                  <Button 
                    variant="light" color="blue" fullWidth radius="xl" size="md"
                    leftSection={<LuSend size={16} />}
                    className="hover:shadow-md transition-shadow"
                    onClick={() => navigate('/community/post/new', { 
                      state: { 
                        lessonTitle: selectedLesson?.title,
                        extractedContent: `Tôi có thắc mắc về bài học **${selectedLesson?.title || ''}**:\n\n[Mô tả vấn đề của bạn ở đây...]` 
                      } 
                    })}
                  >
                    Hỏi Cộng đồng
                  </Button>
                  <Button 
                    variant="light" color="indigo" fullWidth radius="xl" size="md"
                    leftSection={<LuUsers size={16} />}
                    className="hover:shadow-md transition-shadow"
                  >
                    Hỏi giảng viên
                  </Button>
                  <Button 
                    variant="light" color="grape" fullWidth radius="xl" size="md"
                    leftSection={<LuPenTool size={16} />}
                    className="hover:shadow-md transition-shadow"
                  >
                    Ghi chú cá nhân (Wiki)
                  </Button>
              </SimpleGrid>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};
