import React, { useState, useEffect } from 'react';
import { 
  Container, SimpleGrid, Card, Image, Title, Text, 
  Progress, Button, Group, Stack, Badge, Box, Loader, Paper,
  ActionIcon, ThemeIcon, Grid, RingProgress
} from '@mantine/core';
import { LuSparkles, LuBookOpen, LuUsers, LuArrowLeft, LuClock, LuZap, LuSearch } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const MyLearning = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('slms_user') || '{}');
  const token = localStorage.getItem('slms_token');

  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/student/enrolled-courses');
        setEnrolledCourses(response.data);
      } catch (err) {
        console.error("Failed to fetch enrolled courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return (
    <Stack align="center" py={100} gap="md">
      <Loader size="xl" color="brand" type="bars" />
      <Text fw={600} className="animate-pulse">Đang chuẩn bị trạm trung chuyển của bạn...</Text>
    </Stack>
  );

  return (
    <Container size="xl" py="xl">
      <Stack gap={40}>
        
        {/* Lời chào & Mục tiêu ngày */}
        <Box className="bg-gradient-to-r from-brand-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={1} fw={900} size={36} className="tracking-tight">Chào mừng trở lại, {user.fullName?.split(' ').pop() || 'bạn'}! 👋</Title>
              <Text size="lg" mt="xs" className="opacity-90">Hôm nay là một ngày tuyệt vời để chinh phục kiến thức mới.</Text>
              
              <Group mt="xl" gap="xl">
                <Box>
                  <Text size="xs" tt="uppercase" fw={700} className="opacity-70 mb-1">Mục tiêu ngày</Text>
                  <Group gap="xs">
                    <LuSearch size={20} className="text-yellow-400" />
                    <Text fw={800} size="xl">2/5 <Text span size="sm" fw={500} className="opacity-80">Bài học</Text></Text>
                  </Group>
                </Box>
                <Box>
                  <Text size="xs" tt="uppercase" fw={700} className="opacity-70 mb-1">Đang duy trì</Text>
                  <Group gap="xs">
                    <LuSparkles size={20} className="text-orange-400" />
                    <Text fw={800} size="xl">3 <Text span size="sm" fw={500} className="opacity-80">Ngày liên tiếp</Text></Text>
                  </Group>
                </Box>
              </Group>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 4 }} className="flex justify-center md:justify-end">
              <RingProgress
                size={140}
                thickness={14}
                roundCaps
                sections={[{ value: 40, color: 'yellow' }]}
                label={
                  <Text ta="center" fw={900} size="xl">40%</Text>
                }
              />
            </Grid.Col>
          </Grid>
        </Box>

        {/* Nhiệm vụ hôm nay (Spaced Repetition & Weak points) */}
        <Box>
          <Title order={3} fw={800} mb="lg" className="flex items-center gap-2">
            <LuClock className="text-brand-500" /> Nhiệm vụ hôm nay
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <Card shadow="sm" radius="xl" withBorder className="border-blue-100 bg-blue-50/30 hover:shadow-md transition-shadow">
              <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={48} radius="xl" color="blue" variant="light">
                  <LuBookOpen size={24} />
                </ThemeIcon>
                <Box style={{ flex: 1 }}>
                  <Group justify="space-between" mb="xs">
                    <Title order={4}>Ôn tập Thẻ nhớ (SRS)</Title>
                    <Badge color="blue" variant="filled">24 thẻ đến hạn</Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mb="md">
                    Hệ thống AI đã chọn ra các thẻ nhớ cần ôn tập để củng cố trí nhớ dài hạn của bạn.
                  </Text>
                  <Button variant="light" color="blue" fullWidth rightSection={<LuPlay size={16} />}>
                    Bắt đầu ôn tập
                  </Button>
                </Box>
              </Group>
            </Card>

            <Card shadow="sm" radius="xl" withBorder className="border-orange-100 bg-orange-50/30 hover:shadow-md transition-shadow">
              <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={48} radius="xl" color="orange" variant="light">
                  <LuSettings size={24} />
                </ThemeIcon>
                <Box style={{ flex: 1 }}>
                  <Group justify="space-between" mb="xs">
                    <Title order={4}>Khắc phục điểm yếu</Title>
                    <Badge color="orange" variant="filled">3 bài tập</Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mb="md">
                    Các bài tập được AI tự động tạo ra dựa trên những lỗi sai gần đây của bạn trong phần C# Basics.
                  </Text>
                  <Button variant="light" color="orange" fullWidth rightSection={<LuPlay size={16} />}>
                    Luyện tập ngay
                  </Button>
                </Box>
              </Group>
            </Card>
          </SimpleGrid>
        </Box>

        {/* Khóa học đang học */}
        <Box>
          <Group justify="space-between" mb="lg">
            <Title order={3} fw={800} className="flex items-center gap-2">
              <LuBookOpen className="text-brand-500" /> Tiếp tục học
            </Title>
            <Button variant="subtle" color="brand" onClick={() => navigate('/courses')}>
              Khám phá thêm
            </Button>
          </Group>

          {enrolledCourses.length === 0 ? (
            <Paper p={60} withBorder radius="xl" className="bg-slate-50/50 border-dashed border-2 text-center">
              <Box className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
                <LuBookOpen size={48} className="text-slate-300" />
              </Box>
              <Title order={4}>Chưa có khóa học nào</Title>
              <Text c="dimmed" mt="xs" mb="lg" maw={400} mx="auto">
                Bạn chưa ghi danh khóa học nào. Hãy bắt đầu hành trình bằng cách chọn một khóa học phù hợp nhé!
              </Text>
              <Button radius="md" color="brand" onClick={() => navigate('/courses')}>
                Đến danh mục khóa học
              </Button>
            </Paper>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {enrolledCourses.map((enrollment) => (
                <Card 
                  key={enrollment.enrollmentId} 
                  shadow="sm" 
                  radius="xl" 
                  withBorder 
                  className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                >
                  <Card.Section className="overflow-hidden">
                    <Image
                      src={enrollment.course?.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop"}
                      height={160}
                      alt={enrollment.course?.title}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </Card.Section>

                  <Stack mt="md" gap="xs" style={{ flex: 1 }}>
                    <Badge size="xs" variant="light" color="blue" radius="sm">
                      {enrollment.course?.category || 'Development'}
                    </Badge>
                    <Title order={5} lineClamp={2} className="min-h-[2.5rem]">
                      {enrollment.course?.title}
                    </Title>
                    
                    <Box mt="auto" pt="sm">
                      <Group justify="space-between" mb={4}>
                        <Text size="xs" fw={700} c="brand">{enrollment.progress || 0}% Đã hoàn thành</Text>
                        {enrollment.progress === 100 && <LuSparkles size={14} className="text-yellow-500" />}
                      </Group>
                      <Progress 
                        value={enrollment.progress || 0} 
                        size="sm" 
                        radius="xl" 
                        color="brand" 
                        animated={enrollment.progress > 0 && enrollment.progress < 100}
                      />
                    </Box>
                  </Stack>

                  <Button 
                    fullWidth 
                    mt="md" 
                    size="md"
                    radius="md"
                    variant={enrollment.progress === 100 ? 'light' : 'filled'}
                    color={enrollment.progress === 100 ? 'green' : 'brand'}
                    rightSection={<LuPlay size={16} />}
                    onClick={() => navigate(`/study/${enrollment.courseId}`)}
                  >
                    {enrollment.progress === 100 ? 'Xem lại' : (enrollment.progress > 0 ? 'Học tiếp' : 'Vào học ngay')}
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Stack>
    </Container>
  );
};
