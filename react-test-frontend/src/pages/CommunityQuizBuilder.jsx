import React, { useState } from 'react';
import {
  Box, Title, Text, Stack, Group, Paper, Button,
  TextInput, Textarea, Select, SimpleGrid, Card, ActionIcon, Badge, Grid
} from '@mantine/core';
import {
  LuBookOpen, LuSparkles, LuPlay, LuZap, LuPlus, LuSettings, LuLayoutDashboard
} from 'react-icons/lu';
import { motion } from 'framer-motion';

export const CommunityQuizBuilder = () => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuizzes, setGeneratedQuizzes] = useState([]);

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedQuizzes([
        {
          id: 1,
          question: `Đâu là ưu điểm chính của ${topic || 'công nghệ này'}?`,
          options: ['Tăng hiệu suất', 'Dễ học', 'Bảo mật kém', 'Chạy chậm'],
          correct: 0,
          explanation: 'Nó được thiết kế tối ưu hóa bộ nhớ và tăng tốc độ xử lý.',
        },
        {
          id: 2,
          question: `Khi nào nên sử dụng ${topic || 'phương pháp này'} trong dự án thực tế?`,
          options: ['Dự án nhỏ', 'Microservices', 'Ứng dụng Monolithic', 'Không bao giờ'],
          correct: 1,
          explanation: 'Rất phù hợp để chia nhỏ dịch vụ (Microservices).',
        }
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Box maw={900} mx="auto" py="xl">
      <Stack gap="xl">
        <Box>
          <Title order={1} fw={900} className="tracking-tight text-3xl text-slate-900">
            Self Quiz Builder <Badge color="violet" variant="light">AI Powered</Badge>
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Nhập chủ đề bạn muốn học nghiệm, AI sẽ tự động tạo bộ câu hỏi trắc nghiệm và Flashcard để bạn luyện tập.
          </Text>
        </Box>

        <Grid layout>
          {/* Form Cấu hình */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Paper radius="xl" p="xl" withBorder className="glass bg-white sticky top-4">
              <Stack gap="md">
                <Group mb="xs">
                  <LuSparkles size={20} className="text-violet-500" />
                  <Text fw={700} size="lg">Cấu hình Bộ Quiz</Text>
                </Group>

                <Box>
                  <Text fw={600} size="sm" mb={4}>Chủ đề cốt lõi</Text>
                  <TextInput
                    placeholder="VD: React Hooks, ASP.NET Middleware..."
                    radius="md" size="md"
                    value={topic}
                    onChange={(e) => setTopic(e.currentTarget.value)}
                  />
                </Box>

                <Box>
                  <Text fw={600} size="sm" mb={4}>Ghi chú thêm (Tùy chọn)</Text>
                  <Textarea
                    placeholder="Dán đoạn văn bản hoặc mô tả chi tiết để AI hiểu sâu hơn..."
                    radius="md" size="md" minRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                  />
                </Box>

                <Box>
                  <Text fw={600} size="sm" mb={4}>Độ khó</Text>
                  <Select
                    data={['Easy', 'Medium', 'Hard', 'Expert']}
                    value={difficulty}
                    onChange={setDifficulty}
                    radius="md" size="md"
                  />
                </Box>

                <Button 
                  color="violet" radius="xl" size="lg" mt="md"
                  leftSection={<LuZap size={18} />}
                  loading={isGenerating}
                  onClick={handleGenerate}
                  className="shadow-lg shadow-violet-500/30"
                >
                  {isGenerating ? 'AI đang biên soạn...' : 'Tạo Quiz ngay'}
                </Button>
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Hiển thị Kết quả */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="md">
              {generatedQuizzes.length === 0 && !isGenerating ? (
                <Paper p={60} radius="xl" withBorder className="bg-slate-50 border-dashed text-center">
                  <LuBookOpen size={48} className="text-slate-300 mx-auto mb-4" />
                  <Text c="dimmed">Hoàn thành cấu hình bên trái để AI tự động biên soạn nội dung học tập cá nhân hóa cho bạn.</Text>
                </Paper>
              ) : null}

              {isGenerating && (
                <Paper p={60} radius="xl" withBorder className="bg-violet-50 border-violet-100 text-center">
                  <LuSparkles size={48} className="text-violet-400 mx-auto mb-4 animate-pulse" />
                  <Text c="violet" fw={600}>SmartLMS AI đang phân tích dữ liệu...</Text>
                </Paper>
              )}

              {!isGenerating && generatedQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card radius="xl" p="lg" withBorder className="shadow-sm hover:shadow-md transition-all">
                    <Badge color="violet" variant="light" mb="md">Câu {index + 1}</Badge>
                    <Title order={5} mb="lg" className="leading-relaxed">{quiz.question}</Title>
                    <SimpleGrid cols={2} spacing="sm">
                      {quiz.options.map((opt, i) => (
                        <Button 
                          key={i}
                          variant="light" color={i === quiz.correct ? 'teal' : 'gray'}
                          radius="md" size="md" justify="flex-start"
                          className="font-medium whitespace-normal h-auto py-3"
                        >
                          {opt}
                        </Button>
                      ))}
                    </SimpleGrid>
                    <Box mt="lg" p="md" className="bg-slate-50 rounded-lg">
                      <Text size="sm" fw={700} c="dimmed" mb={4}>Giải thích:</Text>
                      <Text size="sm">{quiz.explanation}</Text>
                    </Box>
                  </Card>
                </motion.div>
              ))}

              {generatedQuizzes.length > 0 && (
                <Group justify="flex-end" mt="md">
                  <Button variant="subtle" color="gray" leftSection={<LuPlus size={16} />}>Lưu vào Kho lưu trữ</Button>
                  <Button color="brand" radius="xl" leftSection={<LuPlay size={16} />}>Vào chế độ Thi thử</Button>
                </Group>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
};


