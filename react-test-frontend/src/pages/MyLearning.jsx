import React, { useState, useEffect } from 'react';
import { 
  Container, SimpleGrid, Card, Image, Title, Text, 
  Progress, Button, Group, Stack, Badge, Box, Loader, Paper,
  Tabs, ActionIcon, Tooltip
} from '@mantine/core';
import { 
  LuPlay, LuTrophy, LuBookOpen, LuBrain, 
  LuInfo, LuArrowRight, LuLayoutGrid, LuList
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const MyLearning = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');
  const navigate = useNavigate();

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
  }, []);

  if (loading) return (
    <Stack align="center" py={100} gap="md">
      <Loader size="xl" color="brand" type="bars" />
      <Text fw={600} className="animate-pulse">Đang chuẩn bị kho kiến thức của bạn...</Text>
    </Stack>
  );

  return (
    <Container size="lg" py="xl">
      <Stack gap={40}>
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={1} fw={900} size={36} className="tracking-tight">Kho khóa học</Title>
              <Text c="dimmed" size="lg">Học tập mỗi ngày để nâng cao kỹ năng của bạn.</Text>
            </Box>
            <Button 
              variant="light" 
              color="brand" 
              leftSection={<LuBookOpen size={18} />}
              onClick={() => navigate('/courses')}
            >
              Khám phá thêm
            </Button>
          </Group>
        </Box>

        <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="xl" color="brand">
          <Tabs.List mb="xl">
            <Tabs.Tab value="courses" leftSection={<LuLayoutGrid size={16} />}>Đang học</Tabs.Tab>
            <Tabs.Tab value="mistakes" leftSection={<LuAlertTriangle size={16} />}>Sổ tay lỗi sai</Tabs.Tab>
            <Tabs.Tab value="flashcards" leftSection={<LuBrain size={16} />}>Thẻ nhớ (SRS)</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="courses">
            {enrolledCourses.length === 0 ? (
              <Paper p={80} withBorder radius="xl" className="bg-slate-50/50 border-dashed border-2">
                <Stack align="center" gap="md">
                  <Box className="bg-white p-6 rounded-full shadow-md">
                    <LuBookOpen size={64} className="text-slate-300" />
                  </Box>
                  <Title order={3}>Chưa có khóa học nào</Title>
                  <Text c="dimmed" ta="center" maw={400}>
                    Bắt đầu hành trình học tập ngay hôm nay bằng cách đăng ký các khóa học chất lượng từ chuyên gia.
                  </Text>
                  <Button size="lg" radius="md" color="brand" onClick={() => navigate('/courses')} mt="md">
                    Tìm kiếm khóa học ngay
                  </Button>
                </Stack>
              </Paper>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
                {enrolledCourses.map((enrollment) => (
                  <Card 
                    key={enrollment.enrollmentId} 
                    shadow="sm" 
                    radius="xl" 
                    withBorder 
                    className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <Card.Section className="overflow-hidden">
                      <Image
                        src={enrollment.course?.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop"}
                        height={180}
                        alt={enrollment.course?.title}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    </Card.Section>

                    <Stack mt="md" gap="xs">
                      <Badge size="xs" variant="light" color="blue" radius="sm">
                        {enrollment.course?.category || 'Development'}
                      </Badge>
                      <Title order={4} lineClamp={2} className="min-h-[3rem]">
                        {enrollment.course?.title}
                      </Title>
                      
                      <Box mt="sm">
                        <Group justify="space-between" mb={4}>
                          <Text size="xs" fw={700} c="brand">{enrollment.progress || 0}% Đã hoàn thành</Text>
                          {enrollment.progress === 100 && <LuTrophy size={14} className="text-yellow-500" />}
                        </Group>
                        <Progress 
                          value={enrollment.progress || 0} 
                          size="sm" 
                          radius="xl" 
                          color="brand" 
                          animated={enrollment.progress > 0 && enrollment.progress < 100}
                        />
                      </Box>

                      <Button 
                        fullWidth 
                        mt="md" 
                        size="md"
                        radius="md"
                        variant={enrollment.progress === 100 ? 'light' : 'filled'}
                        color={enrollment.progress === 100 ? 'green' : 'brand'}
                        rightSection={<LuArrowRight size={16} />}
                        onClick={() => navigate(`/study/${enrollment.courseId}`)}
                      >
                        {enrollment.progress === 100 ? 'Xem lại' : (enrollment.progress > 0 ? 'Học tiếp' : 'Bắt đầu ngay')}
                      </Button>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="mistakes">
            <Paper p={50} radius="xl" withBorder style={{ textAlign: 'center' }} className="bg-orange-50/30 border-orange-100">
               <LuInfo size={48} className="text-orange-300 mx-auto mb-md" />
               <Title order={3}>Sổ tay lỗi sai</Title>
               <Text c="dimmed">Tính năng đang được hoàn thiện. Nơi lưu trữ các bài tập bạn làm sai để luyện tập lại.</Text>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="flashcards">
             <Paper p={50} radius="xl" withBorder style={{ textAlign: 'center' }} className="bg-blue-50/30 border-blue-100">
               <LuBrain size={48} className="text-blue-300 mx-auto mb-md" />
               <Title order={3}>Kho thẻ nhớ SRS</Title>
               <Text c="dimmed">Luyện tập ghi nhớ kiến thức thông qua phương pháp lặp lại ngắt quãng.</Text>
            </Paper>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};
