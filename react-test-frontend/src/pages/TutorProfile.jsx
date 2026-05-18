import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Title, Text, Button, Group, Stack, Badge, 
  Avatar, Box, Progress, SimpleGrid, Card, ActionIcon, Loader
} from '@mantine/core';
import { LuArrowLeft, LuStar, LuSparkles, LuVideo, LuCalendar, LuMessageSquare, LuChevronRight } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const TutorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    // Giả lập/Fetch thông tin Tutor
    setTimeout(() => {
      setTutor({
        userId: id || 1,
        fullName: id === '2' ? 'Dr. Sarah Jenkins' : 'Lâm Minh Huy',
        email: id === '2' ? 'sarah.j@smartlms.ai' : 'huy.lam@smartlms.ai',
        avatarUrl: null,
        bio: 'Giảng viên Khoa học Máy tính với 8 năm kinh nghiệm thực chiến. Chuyên sâu về lập trình C#, ASP.NET Core, kiến trúc hệ thống Enterprise và Trí tuệ nhân tạo.',
        hourlyRate: 35,
        rating: 4.9,
        reviewsCount: 124,
        expertise: ['C# Language', 'ASP.NET Core MVC/API', 'Docker & Compose', 'SQL Server Integration'],
        skills: [
          { name: 'C# / Roslyn', level: 95 },
          { name: 'Backend Architectures', level: 90 },
          { name: 'Database Optimization', level: 85 },
          { name: 'AI Models Integration', level: 80 }
        ],
        feedbacks: [
          { id: 1, student: 'Trần Đại Nghĩa', rating: 5, date: '14/05/2026', comment: 'Thầy Huy giải thích cực kỳ cặn kẽ về cơ chế Memory Management và Garbage Collection trong C#. Rất đáng học!' },
          { id: 2, student: 'Nguyễn Thị Hoa', rating: 5, date: '02/05/2026', comment: 'Buổi review code 1-1 với thầy giúp em tối ưu hóa được 40% thời gian chạy của truy vấn Linq. Cảm ơn thầy!' }
        ]
      });
      setLoading(false);
    }, 600);
  }, [id]);

  if (loading) {
    return (
      <Stack align="center" justify="center" py={120}>
        <Loader size="xl" color="brand" type="bars" />
        <Text c="dimmed" fw={600}>Đang tải hồ sơ gia sư từ hệ thống AI...</Text>
      </Stack>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Button 
        variant="subtle" 
        color="gray" 
        leftSection={<LuArrowLeft size={16} />} 
        onClick={() => navigate(-1)}
        mb="lg"
      >
        Quay lại
      </Button>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
        {/* Left Side: General Profile Card */}
        <Box style={{ md: { colSpan: 1 } }}>
          <Paper radius="xl" p="xl" className="glass bg-white/60 border-black/5 shadow-xl text-center">
            <Avatar 
              size={120} 
              radius="100%" 
              className="mx-auto border-4 border-brand-500/20 shadow-lg shadow-brand-500/10 mb-md"
              src={tutor.avatarUrl}
              color="brand"
            >
              {tutor.fullName.charAt(0)}
            </Avatar>
            <Title order={2} fw={900} className="tracking-tight text-slate-900 mb-xs">{tutor.fullName}</Title>
            <Text size="sm" c="dimmed" mb="md">{tutor.email}</Text>

            <Group justify="center" gap={4} mb="lg">
              <LuStar size={16} className="text-yellow-500 fill-yellow-500" />
              <Text fw={700} size="sm" className="text-slate-800">{tutor.rating}</Text>
              <Text size="xs" c="dimmed">({tutor.reviewsCount} đánh giá)</Text>
            </Group>

            <Badge color="green" size="lg" variant="light" mb="xl">
              ${tutor.hourlyRate} / giờ tư vấn
            </Badge>

            <Stack gap="sm">
              <Button 
                variant="gradient" 
                gradient={{ from: 'brand', to: 'indigo' }} 
                radius="md"
                fullWidth
                leftSection={<LuCalendar size={18} />}
                onClick={() => navigate('/booking')}
              >
                Đặt Lịch Hẹn Ngay
              </Button>
              <Button 
                variant="light" 
                color="brand"
                radius="md"
                fullWidth
                leftSection={<LuMessageSquare size={18} />}
                onClick={() => navigate(`/creator/messages`)}
              >
                Nhắn Tin Trao Đổi
              </Button>
            </Stack>
          </Paper>
        </Box>

        {/* Right Side: Skill & Visualizations */}
        <Box style={{ md: { colSpan: 2 } }} className="flex flex-col gap-6">
          <Paper radius="xl" p="xl" className="glass bg-white/60 border-black/5 shadow-xl">
            <Title order={3} fw={900} mb="md" className="text-slate-900">Giới thiệu chuyên môn</Title>
            <Text className="leading-relaxed text-slate-700" mb="xl">
              {tutor.bio}
            </Text>

            <Title order={3} fw={900} mb="md" className="text-slate-900">Lĩnh vực chuyên sâu</Title>
            <Group gap="xs" mb="xl">
              {tutor.expertise.map((exp, idx) => (
                <Badge key={idx} variant="dot" color="brand" size="md">{exp}</Badge>
              ))}
            </Group>

            <Title order={3} fw={900} mb="md" className="text-slate-900">Đánh giá kỹ năng lập trình (AI Evaluated)</Title>
            <Stack gap="md" mb="lg">
              {tutor.skills.map((skill, idx) => (
                <Box key={idx}>
                  <Group justify="space-between" mb={4}>
                    <Text size="sm" fw={700} className="text-slate-800">{skill.name}</Text>
                    <Text size="sm" fw={800} color="brand">{skill.level}%</Text>
                  </Group>
                  <Progress value={skill.level} color="brand" radius="xl" size="sm" striped animated />
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Feedbacks list */}
          <Paper radius="xl" p="xl" className="glass bg-white/60 border-black/5 shadow-xl mt-6">
            <Title order={3} fw={900} mb="lg" className="text-slate-900">Nhận xét từ Học viên ({tutor.feedbacks.length})</Title>
            <Stack gap="lg">
              {tutor.feedbacks.map((f) => (
                <Card key={f.id} radius="md" withBorder p="md" className="bg-white/40">
                  <Group justify="space-between" mb="xs">
                    <Group gap="sm">
                      <Avatar size="sm" radius="xl" color="brand">{f.student.charAt(0)}</Avatar>
                      <Text fw={700} size="sm" className="text-slate-800">{f.student}</Text>
                    </Group>
                    <Text size="xs" c="dimmed">{f.date}</Text>
                  </Group>
                  <Group gap={4} mb="xs">
                    {[...Array(f.rating)].map((_, i) => (
                      <LuStar key={i} size={12} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </Group>
                  <Text size="sm" className="text-slate-700">{f.comment}</Text>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Box>
      </SimpleGrid>
    </Container>
  );
};
