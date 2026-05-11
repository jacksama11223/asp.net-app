import React from 'react';
import { 
  Box, Title, Text, Stack, Group, Button, SimpleGrid, Paper, Badge, ActionIcon, Progress
} from '@mantine/core';
import { LuPlus, LuPenTool, LuMoreVertical, LuUsers, LuClock, LuEye } from 'react-icons/lu';
import { motion } from 'framer-motion';

export const CourseManager = () => {
  const courses = [
    { id: 1, title: 'Lập trình Web với ASP.NET Core 8', students: 124, progress: 68, status: 'Active' },
    { id: 2, title: 'React Masterclass', students: 89, progress: 45, status: 'Draft' },
  ];

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <Box>
          <Title order={1} fw={900} className="tracking-tighter text-3xl text-slate-900">
            Quản lý Khóa học
          </Title>
          <Text c="dimmed" size="sm" mt={4}>Thiết kế và cập nhật giáo trình của bạn.</Text>
        </Box>
        <Button 
          variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} 
          leftSection={<LuPlus size={18} />} radius="md"
        >
          Tạo khóa học
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Paper p="lg" radius="xl" withBorder className="glass hover:border-brand-300 transition-colors cursor-pointer group">
              <Group justify="space-between" mb="md">
                <Badge color={course.status === 'Active' ? 'green' : 'orange'} variant="light">
                  {course.status}
                </Badge>
                <ActionIcon variant="subtle" color="gray">
                  <LuMoreVertical size={18} />
                </ActionIcon>
              </Group>
              
              <Title order={4} mb="xs" className="group-hover:text-brand-600 transition-colors">
                {course.title}
              </Title>
              
              <Group gap="xl" mb="xl">
                <Group gap={4}>
                  <LuUsers size={14} className="text-slate-400" />
                  <Text size="xs" c="dimmed" fw={600}>{course.students}</Text>
                </Group>
                <Group gap={4}>
                  <LuClock size={14} className="text-slate-400" />
                  <Text size="xs" c="dimmed" fw={600}>12 Lessons</Text>
                </Group>
              </Group>

              <Box mb="md">
                <Group justify="space-between" mb={4}>
                  <Text size="xs" fw={600} c="slate.7">Tiến độ TB</Text>
                  <Text size="xs" fw={700} c="brand.6">{course.progress}%</Text>
                </Group>
                <Progress value={course.progress} color="brand" size="sm" radius="xl" />
              </Box>

              <Group grow mt="auto" pt="sm" className="border-t border-slate-100">
                <Button variant="light" color="slate" size="xs" leftSection={<LuEye size={14} />}>
                  Preview
                </Button>
                <Button variant="light" color="brand" size="xs" leftSection={<LuPenTool size={14} />}>
                  Studio
                </Button>
              </Group>
            </Paper>
          </motion.div>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
