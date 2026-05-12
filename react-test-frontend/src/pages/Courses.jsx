import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  SimpleGrid, 
  Title, 
  Text, 
  Button, 
  TextInput, 
  Group, 
  Image, 
  Badge, 
  Box, 
  Stack,
  Loader,
  Alert,
  Avatar
} from '@mantine/core';
import { 
  LuSearch, 
  LuSettings, 
  LuBookOpen, 
  LuSparkles,
  LuZap,
  LuUsers
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardWrapper = ({ children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
    <Paper 
      radius="xl" 
      className="glass bg-white/5 border-white/10 overflow-hidden shadow-2xl hover:border-brand-500/50 transition-all duration-300 group"
    >
      {children}
    </Paper>
  </motion.div>
);

import { BASE_URL } from '../api';

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [parent] = useAutoAnimate();
  const navigate = useNavigate();

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/api/public/courses`);
      setCourses(response.data);
    } catch (err) {
      setError('Failed to load courses. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const filteredCourses = courses.filter(c => 
    (c.courseName || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.instructorName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack gap="xl">
      <Box>
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={1} fw={900} className="tracking-tighter text-4xl text-slate-900">
              Course <Text span variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} inherit>Marketplace</Text> 📚
            </Title>
            <Text c="dimmed" size="sm" mt={4}>Choose from 150+ expert-led courses to boost your career.</Text>
          </Box>
          <Group gap="sm">
            <Button variant="default" radius="md">My Learning</Button>
            <Button variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} radius="md" className="shadow-lg shadow-brand-500/20">Browse Categories</Button>
          </Group>
        </Group>
      </Box>

      <Group grow className="glass p-2 rounded-2xl bg-white/60 backdrop-blur-md border border-black/5">
        <TextInput
          placeholder="Search by title, instructor, or category..."
          leftSection={<LuSearch size={18} className="text-brand-600" />}
          radius="xl"
          size="md"
          variant="unstyled"
          className="px-4 text-slate-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button 
          variant="light" 
          color="gray"
          leftSection={<LuSettings size={18} />} 
          size="md" 
          radius="xl"
          style={{ flexGrow: 0 }}
          className="mr-2"
        >
          Filters
        </Button>
      </Group>

      {error && (
        <Alert icon={<LuZap size={16} />} title="Connection Error" color="red" radius="xl" variant="light">
          {error}
        </Alert>
      )}

      {loading ? (
        <Stack align="center" py={100} gap="md">
          <Loader color="brand" size="xl" type="bars" />
          <Text c="dimmed" fw={600}>Curating your learning experience...</Text>
        </Stack>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl" ref={parent}>
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <CardWrapper key={course.courseId} index={index}>
                <Box className="relative">
                  <Image
                    src={course.thumbnailUrl || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop`}
                    height={200}
                    alt={course.courseName}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge color="brand" variant="filled" size="xs" radius="sm">
                      {course.category || 'Professional'}
                    </Badge>
                  </div>
                </Box>

                <Stack p="xl" gap="md">
                  <Title order={3} className="tracking-tight leading-tight group-hover:text-brand-600 transition-colors text-slate-900">
                    {course.courseName}
                  </Title>

                  <Group gap="sm">
                    <Avatar radius="xl" size="sm" src={null} color="brand">
                      <LuUsers size={14} />
                    </Avatar>
                    <Text size="sm" fw={700} className="text-slate-700">
                      {course.instructorName || "Hệ thống SmartLMS"}
                    </Text>
                  </Group>

                  <Text size="sm" c="dimmed" lineClamp={2} className="leading-relaxed">
                    {course.summary || 'Expert-designed curriculum to master high-demand industry skills through practical applications.'}
                  </Text>

                  <Group justify="space-between" mt="md" align="center">
                    <Stack gap={0}>
                      <Text size="18px" fw={900} className="text-slate-900">
                        {course.price === 0 ? 'FREE' : `$${course.price}`}
                      </Text>
                      <Group gap={4}>
                        <LuSparkles size={10} className="text-yellow-500" />
                        <Text size="10px" fw={700} c="dimmed">
                          {course.rating?.toFixed(1) || "4.5"} ({course.ratingCount || 0})
                        </Text>
                      </Group>
                    </Stack>
                    <Button 
                      variant="light" 
                      color="brand" 
                      radius="md" 
                      onClick={() => navigate(`/course/${course.courseId}`)}
                      rightSection={<LuBookOpen size={16} />}
                      className="hover:bg-brand-600 hover:text-white transition-all shadow-md shadow-brand-500/10"
                    >
                      Xem Chi Tiết
                    </Button>
                  </Group>
                </Stack>
              </CardWrapper>
            ))}
          </AnimatePresence>
        </SimpleGrid>
      )}

      {!loading && filteredCourses.length === 0 && (
        <Stack align="center" py={100}>
          <Text c="dimmed" size="lg">No courses found matching "{search}"</Text>
          <Button variant="subtle" color="brand" onClick={() => setSearch('')}>Clear Search</Button>
        </Stack>
      )}
    </Stack>
  );
};
