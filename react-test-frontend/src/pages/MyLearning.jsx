import React, { useState, useEffect } from 'react';
import { 
  Container, SimpleGrid, Card, Image, Title, Text, 
  Progress, Button, Group, Stack, Badge, Box, Loader, Paper
} from '@mantine/core';
import { LuPlay, LuTrophy, LuBookOpen } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const MyLearning = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <Stack align="center" py={100}><Loader size="xl" /></Stack>;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Box>
          <Title order={1} fw={900}>My Learning</Title>
          <Text c="dimmed">Continue where you left off and achieve your goals.</Text>
        </Box>

        {enrolledCourses.length === 0 ? (
          <Paper p={50} withBorder radius="md" style={{ textAlign: 'center' }}>
            <LuBookOpen size={48} className="text-slate-200 mx-auto mb-md" />
            <Text fw={700}>You haven't enrolled in any courses yet.</Text>
            <Button mt="md" variant="light" color="brand" onClick={() => navigate('/courses')}>Browse Courses</Button>
          </Paper>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {enrolledCourses.map((enrollment) => (
              <Card key={enrollment.enrollmentId} shadow="sm" radius="md" withBorder className="hover:shadow-lg transition-shadow">
                <Card.Section>
                  <Image
                    src={enrollment.course?.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop"}
                    height={160}
                    alt={enrollment.course?.title}
                  />
                </Card.Section>

                <Stack mt="md" gap="xs">
                  <Badge size="xs" variant="light" color="blue">{enrollment.course?.category || 'Development'}</Badge>
                  <Title order={4} lineClamp={1}>{enrollment.course?.title}</Title>
                  <Text size="xs" c="dimmed">By {enrollment.course?.instructor?.fullName || 'Expert Instructor'}</Text>
                  
                  <Box mt="sm">
                    <Group justify="space-between" mb={4}>
                      <Text size="xs" fw={700}>{enrollment.progress || 0}% Complete</Text>
                      {enrollment.progress === 100 && <LuTrophy size={14} className="text-yellow-500" />}
                    </Group>
                    <Progress value={enrollment.progress || 0} size="sm" radius="xl" color="brand" />
                  </Box>

                  <Button 
                    fullWidth 
                    mt="md" 
                    variant={enrollment.progress === 100 ? 'light' : 'filled'}
                    color={enrollment.progress === 100 ? 'green' : 'brand'}
                    leftSection={<LuPlay size={14} />}
                    onClick={() => navigate(`/lesson/${enrollment.courseId}`)}
                  >
                    {enrollment.progress === 100 ? 'Review Course' : (enrollment.progress > 0 ? 'Continue' : 'Start Learning')}
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};
