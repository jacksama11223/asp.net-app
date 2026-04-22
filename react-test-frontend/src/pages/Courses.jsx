import React, { useState, useEffect } from 'react';
import { createApiClient, getCourses } from '../api';
import { 
  Paper, 
  Grid, 
  SimpleGrid, 
  Title, 
  Text, 
  Button, 
  TextInput, 
  Group, 
  Image, 
  Badge, 
  ActionIcon, 
  Box, 
  Stack,
  Loader,
  Alert,
  Card,
  Menu
} from '@mantine/core';
import { 
  LuPlus, 
  LuSearch, 
  LuFilter, 
  LuEllipsisVertical, 
  LuBookOpen, 
  LuClock, 
  LuStar,
  LuUsers,
  LuCircleAlert
} from 'react-icons/lu';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const Courses = () => {
  const [apiKey] = useState(localStorage.getItem('slms_api_key') || '');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [parent] = useAutoAnimate();

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const client = createApiClient(apiKey);
      const data = await getCourses(client);
      setCourses(data);
    } catch (err) {
      setError('Connection failed. Please check your API Key and Backend status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiKey) handleFetch();
  }, [apiKey]);

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between" align="flex-end">
        <Box>
          <Title order={1} fw={900}>Courses</Title>
          <Text c="dimmed" size="sm">Manage your curriculum and content delivery.</Text>
        </Box>
        <Button 
          leftSection={<LuPlus size={20} />} 
          size="md" 
          radius="md" 
          boxShadow="var(--mantine-shadow-md)"
        >
          Create New Course
        </Button>
      </Group>

      <Group grow>
        <TextInput
          placeholder="Search by title, instructor..."
          leftSection={<LuSearch size={18} />}
          radius="md"
          size="md"
        />
        <Button 
          variant="default" 
          leftSection={<LuFilter size={18} />} 
          size="md" 
          radius="md"
          style={{ flexGrow: 0 }}
        >
          Filters
        </Button>
      </Group>

      {error && (
        <Alert icon={<LuCircleAlert size={16} />} title="Error" color="red" radius="md">
          {error}
        </Alert>
      )}

      {loading ? (
        <Group justify="center" py="xl">
          <Loader color="brand" size="xl" type="dots" />
        </Group>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg" ref={parent}>
          {courses.map((course) => (
            <Card 
              key={course.courseId} 
              shadow="sm" 
              padding="lg" 
              radius="lg" 
              withBorder
              style={{ transition: 'transform 0.2s ease', cursor: 'pointer' }}
              onClick={() => {}}
            >
              <Card.Section>
                <Image
                  src={course.thumbnailUrl || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop`}
                  height={160}
                  alt={course.courseName}
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Badge color="brand" variant="light">ID {course.courseId}</Badge>
                <Menu position="bottom-end" shadow="md">
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <LuEllipsisVertical size={18} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>Edit Course</Menu.Item>
                    <Menu.Item>View Analytics</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item color="red">Delete</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              <Title order={4} mb="xs" lineClamp={1}>{course.courseName}</Title>

              <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                {course.summary || 'Expertly designed curriculum to master industry standards and practical skills.'}
              </Text>

              <Grid mb="lg">
                <Grid.Col span={6}>
                  <Group gap={4}>
                    <LuBookOpen size={14} color="var(--mantine-color-brand-filled)" />
                    <Text size="10px" fw={700} tt="uppercase">{course.lessonCount || 0} Lessons</Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Group gap={4}>
                    <LuUsers size={14} color="var(--mantine-color-brand-filled)" />
                    <Text size="10px" fw={700} tt="uppercase">{course.instructorName}</Text>
                  </Group>
                </Grid.Col>
              </Grid>

              <Card.Section inheritPadding py="md" style={{ borderTop: '1px solid var(--mantine-color-dark-4)' }}>
                <Group justify="space-between">
                  <Box>
                    <Text size="10px" fw={700} tt="uppercase" c="dimmed">Price</Text>
                    <Text fw={900} size="lg">
                      {course.price === 0 ? 'FREE' : `$${course.price}`}
                    </Text>
                  </Box>
                  <Button variant="light" color="brand" radius="md" size="xs">
                    Register Now
                  </Button>
                </Group>
              </Card.Section>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
};
