import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Title, Text, Button, Stack, 
  Group, Badge, Accordion, List, ThemeIcon, Image, Avatar,
  Loader, Divider, Box, SimpleGrid
} from '@mantine/core';
import { 
  LuPlayCircle, LuFileText, LuHelpCircle, LuCheckCircle2, 
  LuUsers, LuClock, LuStar, LuBookOpen 
} from 'react-icons/lu';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/public/courses/${id}`);
        setCourse(response.data);
        setCurriculum(response.data.modules || []);
      } catch (err) {
        console.error("Failed to fetch course details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Stack align="center" py={100}><Loader size="xl" /></Stack>;
  if (!course) return <Text>Course not found</Text>;

  return (
    <Container size="lg" py="xl">
      <Grid gutter={40}>
        {/* Left Column: Info & Syllabus */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="xl">
            <Box>
              <Badge color="brand" variant="light" size="lg" mb="md">
                {course.category || 'Professional Course'}
              </Badge>
              <Title order={1} fw={900} size={42} className="tracking-tight text-slate-900">
                {course.courseName}
              </Title>
              <Text size="lg" c="dimmed" mt="md" className="leading-relaxed">
                {course.summary || 'Master high-demand industry skills through our comprehensive, expert-designed curriculum with real-world projects.'}
              </Text>
              
              <Group mt="xl" gap="xl">
                <Group gap="xs">
                  <Avatar size="sm" color="brand">{course.instructor?.fullName?.charAt(0)}</Avatar>
                  <Text size="sm" fw={700}>{course.instructor?.fullName || "Hệ thống SmartLMS"}</Text>
                </Group>
                <Group gap="xs">
                  <LuStar className="text-yellow-500 fill-yellow-500" size={16} />
                  <Text size="sm" fw={700}>{course.rating?.toFixed(1) || "4.5"} ({course.ratingCount || 0} đánh giá)</Text>
                </Group>
                <Group gap="xs">
                  <LuUsers className="text-slate-400" size={16} />
                  <Text size="sm" fw={500}>15,240 students</Text>
                </Group>
              </Group>
            </Box>

            <Divider />

            <Box>
              <Title order={2} mb="lg" className="tracking-tight">What you'll learn</Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {[1, 2, 3, 4].map((i) => (
                  <Group key={i} align="flex-start" wrap="nowrap">
                    <LuCheckCircle2 className="text-brand-600 mt-1 shrink-0" size={18} />
                    <Text size="sm">Core industry concepts and advanced practical methodologies.</Text>
                  </Group>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Group justify="space-between" mb="lg">
                <Title order={2} className="tracking-tight">Curriculum</Title>
                <Text size="sm" c="dimmed" fw={600}>{curriculum.length} Sections • 45 Lectures</Text>
              </Group>
              
              <Accordion variant="separated" radius="md">
                {curriculum.map((module) => (
                  <Accordion.Item key={module.moduleId} value={module.title}>
                    <Accordion.Control>
                      <Group justify="space-between" pr="md">
                        <Text fw={700}>{module.title}</Text>
                        <Text size="xs" c="dimmed">{module.lessons?.length || 0} lessons</Text>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <List spacing="sm" size="sm" center icon={
                        <ThemeIcon color="brand" size={24} radius="xl">
                          <LuPlayCircle size={14} />
                        </ThemeIcon>
                      }>
                        {module.lessons?.map((lesson) => (
                          <List.Item key={lesson.lessonId}>
                            <Group justify="space-between">
                              <Text fw={500}>{lesson.title}</Text>
                              <Text size="xs" c="dimmed">12:30</Text>
                            </Group>
                          </List.Item>
                        ))}
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Box>
          </Stack>
        </Grid.Col>

        {/* Right Column: Pricing & CTA */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Paper 
            shadow="xl" 
            p="xl" 
            radius="xl" 
            withBorder 
            className="sticky top-24 bg-white border-slate-100"
          >
            <Image
              src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop"}
              radius="lg"
              mb="xl"
            />
            
            <Group justify="space-between" align="flex-end" mb="xl">
              <div>
                <Text size="sm" c="dimmed" td="line-through">VNĐ 2,400,000</Text>
                <Title order={2} fw={900} className="text-3xl text-slate-900">
                  {course.price === 0 ? 'FREE' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                </Title>
              </div>
              <Badge color="red" size="lg" variant="filled">85% OFF</Badge>
            </Group>

            <Stack gap="md">
               <Button 
                size="lg" 
                radius="md" 
                color="brand" 
                fullWidth
                onClick={() => navigate(`/checkout/${id}`)}
              >
                Đăng Ký Ngay
              </Button>
              {course.instructor?.donateUrl && (
                <Button 
                  size="lg" 
                  radius="md" 
                  variant="light" 
                  color="orange" 
                  fullWidth
                  component="a"
                  href={course.instructor.donateUrl}
                  target="_blank"
                >
                  Donate Cho Tác Giả ☕
                </Button>
              )}
              <Button size="lg" radius="md" variant="light" color="gray" fullWidth>
                Thêm vào yêu thích
              </Button>
            </Stack>

            <Text size="xs" ta="center" mt="md" c="dimmed">30-Day Money-Back Guarantee</Text>

            <Box mt="xl">
              <Text fw={700} size="sm" mb="md">This course includes:</Text>
              <Stack gap="xs">
                <Group gap="xs">
                  <LuPlayCircle size={16} className="text-brand-600" />
                  <Text size="xs">15 hours on-demand video</Text>
                </Group>
                <Group gap="xs">
                  <LuFileText size={16} className="text-brand-600" />
                  <Text size="xs">24 downloadable resources</Text>
                </Group>
                <Group gap="xs">
                  <LuClock size={16} className="text-brand-600" />
                  <Text size="xs">Full lifetime access</Text>
                </Group>
                <Group gap="xs">
                  <LuBookOpen size={16} className="text-brand-600" />
                  <Text size="xs">Certificate of completion</Text>
                </Group>
              </Stack>
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
