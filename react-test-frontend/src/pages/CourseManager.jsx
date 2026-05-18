import React, { useState, useEffect } from 'react';
import { 
  Box, Title, Text, Stack, Group, Button, SimpleGrid, Paper, Badge, 
  ActionIcon, Progress, Loader, Modal, TextInput, Textarea, NumberInput,
  Select, Divider, Table, Checkbox, Card, Grid, Tabs
} from '@mantine/core';
import { 
  LuPlus, LuPenTool, LuSettings, LuUsers, LuClock, LuEye, LuZap, 
  LuTrash2, LuBookOpen, LuChevronRight, LuSparkles
} from 'react-icons/lu';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Custom states for sandbox manager tab
  const [challenges, setChallenges] = useState([]);
  const [challengesLoading, setChallengesLoading] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState('courses');
  const [availableLessons, setAvailableLessons] = useState([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);
  
  // Course Modal States
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({ courseId: 0, title: '', category: 'L\u1eadp tr\u00ecnh', price: 0, status: 'Draft' });
  const [savingCourse, setSavingCourse] = useState(false);

  // Studio Mode States
  const [studioOpen, setStudioOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [studioLoading, setStudioLoading] = useState(false);

  // Challenge Modal States
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [challengeForm, setChallengeForm] = useState({
    id: 0,
    title: '',
    description: '',
    points: 100,
    language: 'csharp',
    templateCode: '// B\u1eaft \u0111\u1ea7u code...\nusing System;\n\npublic class Program {\n    public static void Main() {\n        Console.WriteLine("Hello World");\n    }\n}',
    courseId: 0,
    lessonId: 0,
    testCases: []
  });
  const [savingChallenge, setSavingChallenge] = useState(false);

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/compiler/courses');
      setCourses(response.data);
    } catch (err) {
      console.error("Failed to fetch instructor courses", err);
      toast.error("Kh\u00f4ng th\u1ec3 t\u1ea3i danh s\u00e1ch kh\u00f3a h\u1ecdc.");
    } finally {
      setLoading(false);
    }
  };

  const fetchChallenges = async () => {
    setChallengesLoading(true);
    try {
      const response = await apiClient.get('/api/compiler/challenges');
      setChallenges(response.data);
    } catch (err) {
      console.error("Failed to fetch challenges", err);
      toast.error("Kh\u00f4ng th\u1ec3 t\u1ea3i danh s\u00e1ch b\u00e0i t\u1eadp l\u1eadp tr\u00ecnh.");
    } finally {
      setChallengesLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (activeMainTab === 'challenges') {
      fetchChallenges();
    }
  }, [activeMainTab]);

  useEffect(() => {
    if (challengeModalOpen && challengeForm.courseId > 0) {
      const fetchLessons = async () => {
        setLessonsLoading(true);
        try {
          const response = await apiClient.get(`/api/compiler/courses/${challengeForm.courseId}/lessons`);
          // Flatten lessons from all modules
          const allLessons = response.data.flatMap(m => m.lessons || []);
          setAvailableLessons(allLessons);
        } catch (err) {
          console.error("Failed to fetch lessons for course", err);
        } finally {
          setLessonsLoading(false);
        }
      };
      fetchLessons();
    } else {
      setAvailableLessons([]);
    }
  }, [challengeForm.courseId, challengeModalOpen]);

  const handleSaveCourse = async () => {
    if (!courseForm.title) {
      toast.error("Vui l\u00f2ng \u0111i\u1ec1n ti\u00eau \u0111\u1ec1 kh\u00f3a h\u1ecdc.");
      return;
    }
    setSavingCourse(true);
    try {
      await apiClient.post('/api/compiler/courses/save', courseForm);
      toast.success(courseForm.courseId > 0 ? "C\u1eadp nh\u1eadt kh\u00f3a h\u1ecdc th\u00e0nh c\u00f4ng!" : "T\u1ea1o kh\u00f3a h\u1ecdc m\u1edbi th\u00e0nh c\u00f4ng!");
      setCourseModalOpen(false);
      fetchCourses();
    } catch (err) {
      console.error("Save course error", err);
      toast.error("Lỗi khi lưu thông tin khóa học.");
    } finally {
      setSavingCourse(false);
    }
  };

  const handleOpenStudio = async (course) => {
    setSelectedCourse(course);
    setStudioOpen(true);
    setStudioLoading(true);
    try {
      const response = await apiClient.get(`/api/compiler/courses/${course.courseId}/lessons`);
      setModules(response.data);
    } catch (err) {
      console.error("Failed to load studio details", err);
      toast.error("Không thể tải giáo trình khóa học.");
    } finally {
      setStudioLoading(false);
    }
  };

  const handleOpenChallengeEditor = async (lesson) => {
    setSelectedLesson(lesson);
    setChallengeModalOpen(true);
    if (lesson.hasChallenge && lesson.challengeId) {
      try {
        const response = await apiClient.get(`/api/compiler/challenges/${lesson.challengeId}`);
        const c = response.data;
        setChallengeForm({
          id: c.id,
          title: c.title,
          description: c.description,
          points: c.points,
          language: c.language || 'csharp',
          templateCode: c.templateCode || '',
          courseId: selectedCourse?.courseId || c.courseId || 0,
          lessonId: lesson.lessonId || c.lessonId || 0,
          testCases: c.testCases || []
        });
      } catch (err) {
        console.error("Load challenge detail error", err);
      }
    } else {
      setChallengeForm({
        id: 0,
        title: `Bài thực hành: ${lesson.title}`,
        description: `Viết chương trình thực hiện yêu cầu sau...\nInput: \nOutput mong muốn: `,
        points: 100,
        language: 'csharp',
        templateCode: '// Bắt đầu viết code C# tại đây...\nusing System;\n\npublic class Program {\n    public static void Main() {\n        // Code của bạn\n    }\n}',
        courseId: selectedCourse?.courseId || 0,
        lessonId: lesson.lessonId || 0,
        testCases: [
          { input: '2', expectedOutput: 'True', isHidden: false }
        ]
      });
    }
  };

  const handleAddTestCase = () => {
    setChallengeForm(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: '', expectedOutput: '', isHidden: false }]
    }));
  };

  const handleRemoveTestCase = (index) => {
    setChallengeForm(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, idx) => idx !== index)
    }));
  };

  const handleTestCaseChange = (index, field, value) => {
    setChallengeForm(prev => {
      const updated = [...prev.testCases];
      updated[index][field] = value;
      return { ...prev, testCases: updated };
    });
  };

  const handleSaveChallenge = async () => {
    if (!challengeForm.title || !challengeForm.description) {
      toast.error("Vui lòng điền đầy đủ tiêu đề và yêu cầu đề bài.");
      return;
    }
    if (!challengeForm.courseId || !challengeForm.lessonId) {
      toast.error("Vui lòng chọn Khóa học và Bài giảng để liên kết thử thách.");
      return;
    }
    setSavingChallenge(true);
    try {
      const payload = {
        ...challengeForm,
        courseId: Number(challengeForm.courseId),
        lessonId: Number(challengeForm.lessonId)
      };
      await apiClient.post('/api/compiler/challenges/save', payload);
      toast.success("Lưu cấu hình đề bài & testcases thành công!");
      setChallengeModalOpen(false);
      
      // Reload based on source
      if (activeMainTab === 'challenges') {
        fetchChallenges();
      } else {
        handleOpenStudio(selectedCourse);
      }
    } catch (err) {
      console.error("Save challenge error", err);
      toast.error("Lỗi khi lưu đề bài thực hành.");
    } finally {
      setSavingChallenge(false);
    }
  };

  if (loading) return (
    <Stack align="center" justify="center" h="50vh">
      <Loader size="xl" color="brand" />
      <Text c="dimmed">Đang tải không gian làm việc của Giảng viên...</Text>
    </Stack>
  );

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <Box>
          <Title order={1} fw={900} className="tracking-tighter text-3xl text-slate-900">
            Qu\u1ea3n l\u00fd Kh\u00f3a h\u1ecdc & Sandbox L\u1eadp tr\u00ecnh
          </Title>
          <Text c="dimmed" size="sm" mt={4}>Thi\u1ebft k\u1ebf kh\u00f3a h\u1ecdc, ch\u01b0\u01a1ng tr\u00ecnh h\u1ecdc v\u00e0 c\u00e1c b\u00e0i t\u1eadp bi\u00ean d\u1ecbch code C# Roslyn Sandbox cho h\u1ecdc vi\u00ean.</Text>
        </Box>
        <Group>
          {activeMainTab === 'courses' ? (
            <Button 
              variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} 
              leftSection={<LuPlus size={18} />} radius="md"
              onClick={() => {
                setCourseForm({ courseId: 0, title: '', category: 'L\u1eadp tr\u00ecnh', price: 0, status: 'Draft' });
                setCourseModalOpen(true);
              }}
            >
              T\u1ea1o kh\u00f3a h\u1ecdc
            </Button>
          ) : (
            <Button
              variant="gradient" gradient={{ from: 'indigo', to: 'brand' }}
              leftSection={<LuPlus size={18} />} radius="md"
              onClick={() => {
                setChallengeForm({
                  id: 0,
                  title: '',
                  description: '',
                  points: 100,
                  language: 'csharp',
                  templateCode: '// B\u1eaft \u0111\u1ea7u vi\u1ebft code C# t\u1ea1i \u0111\u00e2y...\nusing System;\n\npublic class Program {\n    public static void Main() {\n        // Code c\u1ee7a b\u1ea1n\n    }\n}',
                  courseId: courses[0]?.courseId || 0,
                  lessonId: 0,
                  testCases: [{ input: '4', expectedOutput: 'True', isHidden: false }]
                });
                setChallengeModalOpen(true);
              }}
            >
              T\u1ea1o b\u00e0i th\u1ef1c h\u00e0nh Code
            </Button>
          )}
        </Group>
      </Group>

      <Tabs value={activeMainTab} onChange={setActiveMainTab} variant="outline" radius="xl" className="w-full">
        <Tabs.List mb="lg">
          <Tabs.Tab value="courses" leftSection={<LuBookOpen size={16} />}>
            Danh s\u00e1ch Kh\u00f3a h\u1ecdc ({courses.length})
          </Tabs.Tab>
          <Tabs.Tab value="challenges" leftSection={<LuPenTool size={16} />}>
            Ng\u00e2n h\u00e0ng b\u00e0i t\u1eadp Code (Sandbox)
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="courses">
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">
            {courses.map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Paper p="lg" radius="xl" withBorder className="glass hover:border-brand-300 transition-colors cursor-pointer group">
                  <Group justify="space-between" mb="md">
                    <Badge color={course.status === 'Published' ? 'green' : 'orange'} variant="light">
                      {course.status}
                    </Badge>
                    <ActionIcon variant="subtle" color="gray" onClick={() => {
                      setCourseForm({
                        courseId: course.courseId,
                        title: course.title,
                        category: course.category || '',
                        price: course.price || 0,
                        status: course.status || 'Draft'
                      });
                      setCourseModalOpen(true);
                    }}>
                      <LuSettings size={18} />
                    </ActionIcon>
                  </Group>
                  
                  <Title order={4} mb="xs" className="group-hover:text-brand-600 transition-colors">
                    {course.title}
                  </Title>
                  
                  <Group gap="xl" mb="xl">
                    <Group gap={4}>
                      <LuUsers size={14} className="text-slate-400" />
                      <Text size="xs" c="dimmed" fw={600}>{course.studentsCount} H\u1ecdc vi\u00ean</Text>
                    </Group>
                    <Group gap={4}>
                      <LuZap size={14} className="text-brand-300 self-end mt-1" />
                      <Text size="xs" c="dimmed" fw={600}>{course.lessonsCount} B\u00e0i h\u1ecdc</Text>
                    </Group>
                  </Group>

                  <Group grow mt="auto" pt="sm" className="border-t border-slate-100">
                    <Button variant="light" color="slate" size="xs" leftSection={<LuEye size={14} />} onClick={() => navigate(`/course/${course.courseId}`)}>
                      Xem chi ti\u1ebft
                    </Button>
                    <Button variant="light" color="brand" size="xs" leftSection={<LuPenTool size={14} />} onClick={() => handleOpenStudio(course)}>
                      Studio
                    </Button>
                  </Group>
                </Paper>
              </motion.div>
            ))}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="challenges">
          {challengesLoading ? (
            <Stack align="center" justify="center" py={50}>
              <Loader size="lg" color="indigo" />
              <Text c="dimmed">\u0110ang t\u1ea3i danh s\u00e1ch b\u00e0i t\u1eadp l\u1eadp tr\u00ecnh...</Text>
            </Stack>
          ) : challenges.length === 0 ? (
            <Card withBorder radius="xl" p="xl" ta="center" className="bg-slate-50/50">
              <LuPenTool size={48} className="text-slate-300 mx-auto mb-4" />
              <Title order={3}>Ch\u01b0a c\u00f3 b\u00e0i t\u1eadp Code n\u00e0o</Title>
              <Text c="dimmed" mt="xs" mb="lg">H\u00e3y t\u1ea1o b\u00e0i th\u1ef1c h\u00e0nh l\u1eadp tr\u00ecnh C# \u0111\u1ea7u ti\u00ean \u0111\u1ec3 b\u1ed5 sung v\u00e0o b\u00e0i h\u1ecdc cho h\u1ecdc vi\u00ean th\u1ef1c h\u00e0nh sandbox!</Text>
              <Button
                variant="gradient" gradient={{ from: 'indigo', to: 'brand' }} radius="md"
                leftSection={<LuPlus size={16} />}
                onClick={() => {
                  setChallengeForm({
                    id: 0,
                    title: '',
                    description: '',
                    points: 100,
                    language: 'csharp',
                    templateCode: '// B\u1eaft \u0111\u1ea7u vi\u1ebft code C# t\u1ea1i \u0111\u00e2y...\nusing System;\n\npublic class Program {\n    public static void Main() {\n        // Code c\u1ee7a b\u1ea1n\n    }\n}',
                    courseId: courses[0]?.courseId || 0,
                    lessonId: 0,
                    testCases: [{ input: '4', expectedOutput: 'True', isHidden: false }]
                  });
                  setChallengeModalOpen(true);
                }}
              >
                T\u1ea1o b\u00e0i t\u1eadp Code ngay
              </Button>
            </Card>
          ) : (
            <Paper radius="xl" p="md" withBorder className="overflow-hidden">
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Th\u1eed th\u00e1ch</Table.Th>
                    <Table.Th>Kh\u00f3a h\u1ecdc li\u00ean k\u1ebft</Table.Th>
                    <Table.Th>B\u00e0i gi\u1ea3ng li\u00ean k\u1ebft</Table.Th>
                    <Table.Th>\u0110i\u1ec3m XP</Table.Th>
                    <Table.Th>Ng\u00f4n ng\u1eef</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>Thao t\u00e1c</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {challenges.map((c) => (
                    <Table.Tr key={c.id}>
                      <Table.Td fw={700} className="text-slate-800">{c.title}</Table.Td>
                      <Table.Td><Badge color="blue" variant="light">{c.courseTitle}</Badge></Table.Td>
                      <Table.Td><Text size="sm" c="dimmed">{c.lessonTitle}</Text></Table.Td>
                      <Table.Td fw={600} color="orange">{c.points} XP</Table.Td>
                      <Table.Td><Badge color="indigo">{c.language}</Badge></Table.Td>
                      <Table.Td style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <Button 
                          variant="light" color="indigo" size="xs" leftSection={<LuPenTool size={12} />}
                          onClick={() => {
                            handleOpenChallengeEditor({
                              hasChallenge: true,
                              challengeId: c.id,
                              lessonId: c.lessonId,
                              title: c.lessonTitle
                            });
                          }}
                        >
                          S\u1eeda
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Paper>
          )}
        </Tabs.Panel>
      </Tabs>

      {/* MODAL T\u1ea0O / S\u1eeca KH\u00d3A H\u1eccC */}
      <Modal opened={courseModalOpen} onClose={() => setCourseModalOpen(false)} title={courseForm.courseId > 0 ? "C\u1ea5u h\u00ecnh Kh\u00f3a h\u1ecdc" : "T\u1ea1o Kh\u00f3a h\u1ecdc m\u1edbi"} radius="xl" p="md">
        <Stack gap="md">
          <TextInput 
            label="Ti\u00eau \u0111\u1ec1 Kh\u00f3a h\u1ecdc" 
            placeholder="V\u00ed d\u1ee5: L\u1eadp tr\u00ecnh C# c\u01a1 b\u1ea3n"
            value={courseForm.title}
            onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
            required
          />
          <TextInput 
            label="Danh m\u1ee5c" 
            placeholder="L\u1eadp tr\u00ecnh, Database, Frontend..."
            value={courseForm.category}
            onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
          />
          <NumberInput 
            label="Gi\u00e1 kh\u00f3a h\u1ecdc (VN\u0110)" 
            value={courseForm.price}
            onChange={(val) => setCourseForm({ ...courseForm, price: Number(val) })}
            min={0}
          />
          <Select 
            label="Tr\u1ea1ng th\u00e1i"
            data={['Draft', 'Published', 'Archived']}
            value={courseForm.status}
            onChange={(val) => setCourseForm({ ...courseForm, status: val || 'Draft' })}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" color="gray" onClick={() => setCourseModalOpen(false)}>H\u1ee7y</Button>
            <Button color="brand" onClick={handleSaveCourse} loading={savingCourse}>L\u01b0u l\u1ea1i</Button>
          </Group>
        </Stack>
      </Modal>

      {/* MODAL STUDIO QU\u1ea2N L\u00dd GI\u00c1O TR\u00ccNH & B\u00c0I T\u1ea2P CODE */}
      <Modal opened={studioOpen} onClose={() => setStudioOpen(false)} title={`Studio Kh\u00f3a h\u1ecdc: ${selectedCourse?.title}`} size="xl" radius="xl" p="md">
        {studioLoading ? (
          <Stack align="center" justify="center" py={50}>
            <Loader size="lg" color="brand" />
            <Text c="dimmed">\u0110ang n\u1ea1p d\u1eef li\u1ec7u gi\u00e1o tr\u00ecnh...</Text>
          </Stack>
        ) : (
          <Stack gap="lg">
            <Box>
              <Text size="sm" c="dimmed">B\u00ean d\u01b0\u1edbi l\u00e0 danh s\u00e1ch module v\u00e0 b\u00e0i gi\u1ea3ng. B\u1ea1n c\u00f3 th\u1ec3 th\u00eam ho\u1eb7c c\u1ea5u h\u00ecnh b\u00e0i th\u1ef1c h\u00e0nh l\u1eadp tr\u00ecnh tr\u1ef1c ti\u1ebfp cho t\u1eebng b\u00e0i gi\u1ea3ng.</Text>
            </Box>
            <Divider />
            
            {modules.length === 0 ? (
              <Text ta="center" py="xl" c="dimmed">Kh\u00f3a h\u1ecdc n\u00e0i ch\u01b0a c\u00f3 ch\u01b0\u01a1ng tr\u00ecnh h\u1ecdc t\u1eadp n\u00e0o. H\u00e3y kh\u1edfi t\u1ea1o module tr\u00ean h\u1ec7 th\u1ed1ng qu\u1ea3n l\u00fd ch\u00ednh.</Text>
            ) : (
              modules.map((mod) => (
                <Card key={mod.moduleId} withBorder radius="md" p="md" className="bg-slate-50/50">
                  <Text fw={700} c="brand" size="md" mb="md">{mod.title}</Text>
                  <Stack gap="xs">
                    {mod.lessons.map((lesson) => (
                      <Paper key={lesson.lessonId} p="sm" radius="md" withBorder className="bg-white flex justify-between items-center">
                        <Group>
                          <LuBookOpen size={16} className="text-slate-400" />
                          <Box>
                            <Text fw={600} size="sm">{lesson.title}</Text>
                            <Text size="xs" c="dimmed">Lo\u1ea1i: {lesson.lessonType}</Text>
                          </Box>
                        </Group>
                        <Group>
                          {lesson.hasChallenge ? (
                            <Badge color="green" variant="light" leftSection={<LuSparkles size={10} />}>
                              \u0110\u00e3 c\u00f3 Sandbox Code
                            </Badge>
                          ) : (
                            <Badge color="gray" variant="light">
                              Ch\u01b0a c\u00f3 Sandbox
                            </Badge>
                          )}
                          <Button 
                            variant="light" 
                            color={lesson.hasChallenge ? "green" : "brand"} 
                            size="xs" 
                            leftSection={<LuPenTool size={12} />}
                            onClick={() => handleOpenChallengeEditor(lesson)}
                          >
                            C\u1ea5u h\u00ecnh Code
                          </Button>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Card>
              ))
            )}
            
            <Group justify="flex-end" mt="md">
              <Button onClick={() => setStudioOpen(false)}>Ho\u00e0n t\u1ea5t</Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* MODAL C\u1ea4U H\u00ccNH COMPILER SANDBOX \u0110\u1ec0 B\u00c0I & TESTCASES */}
      <Modal opened={challengeModalOpen} onClose={() => setChallengeModalOpen(false)} title="C\u1ea5u h\u00ecnh Sandbox th\u1ef1c h\u00e0nh L\u1eadp tr\u00ecnh" size="lg" radius="xl" p="md">
        <Stack gap="md">
          {/* Li\u00ean k\u1ebft Kh\u00f3a h\u1ecdc & B\u00e0i h\u1ecdc khi t\u1ea1o m\u1edbi t\u1eeb Dashboard ch\u00ednh */}
          {(challengeForm.id === 0 || activeMainTab === 'challenges') && (
            <Grid gutter="xs">
              <Grid.Col span={6}>
                <Select
                  label="Kh\u00f3a h\u1ecdc li\u00ean k\u1ebft"
                  placeholder="Ch\u1ecdn kh\u00f3a h\u1ecdc..."
                  data={courses.map(c => ({ value: String(c.courseId), label: c.title }))}
                  value={challengeForm.courseId ? String(challengeForm.courseId) : null}
                  onChange={(val) => setChallengeForm({ ...challengeForm, courseId: Number(val), lessonId: 0 })}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="B\u00e0i gi\u1ea3ng li\u00ean k\u1ebft"
                  placeholder={lessonsLoading ? "\u0110ang n\u1ea1p b\u00e0i gi\u1ea3ng..." : "Ch\u1ecdn b\u00e0i gi\u1ea3ng..."}
                  disabled={!challengeForm.courseId || lessonsLoading}
                  data={availableLessons.map(l => ({ value: String(l.lessonId), label: `${l.title} (${l.lessonType})` }))}
                  value={challengeForm.lessonId ? String(challengeForm.lessonId) : null}
                  onChange={(val) => setChallengeForm({ ...challengeForm, lessonId: Number(val) })}
                  required
                />
              </Grid.Col>
            </Grid>
          )}

          <TextInput 
            label="Ti\u00eau \u0111\u1ec1 b\u00e0i th\u1ef1c h\u00e0nh" 
            placeholder="V\u00ed d\u1ee5: T\u00ednh t\u1ed5ng c\u00e1c s\u1ed1 ch\u1eb5n trong m\u1ea3ng"
            value={challengeForm.title}
            onChange={(e) => setChallengeForm({ ...challengeForm, title: e.target.value })}
            required
          />
          <Textarea 
            label="Y\u00eau c\u1ea7u \u0111\u1ec1 b\u00e0i (M\u00f4 t\u1ea3 chi ti\u1ebft)"
            placeholder="M\u00f4 t\u1ea3 thu\u1eadt to\u00e1n c\u1ea7n vi\u1ebft, input \u0111\u1ea7u v\u00e0o v\u00e0 k\u1ebft qu\u1ea3 output mong mu\u1ed1n tr\u1ea3 v\u1ec1..."
            minRows={3}
            value={challengeForm.description}
            onChange={(e) => setChallengeForm({ ...challengeForm, description: e.target.value })}
            required
          />
          <Grid>
            <Grid.Col span={6}>
              <NumberInput 
                label="\u0110i\u1ec3m th\u01b0\u1edfng (XP)"
                value={challengeForm.points}
                onChange={(val) => setChallengeForm({ ...challengeForm, points: Number(val) })}
                min={10}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select 
                label="Ng\u00f4n ng\u1eef bi\u00ean d\u1ecbch"
                data={[{ value: 'csharp', label: 'C# (Roslyn Sandbox)' }]}
                value={challengeForm.language}
                onChange={(val) => setChallengeForm({ ...challengeForm, language: val || 'csharp' })}
              />
            </Grid.Col>
          </Grid>

          <Textarea 
            label="M\u00e3 ngu\u1ed3n khung m\u1eabu (Template Code)"
            placeholder="// Cung c\u1ea5p code m\u1eabu ban \u0111\u1ea7u \u0111\u1ec3 h\u1ecdc vi\u00ean vi\u1ebft ti\u1ebfp..."
            minRows={5}
            fontFamily="monospace"
            value={challengeForm.templateCode}
            onChange={(e) => setChallengeForm({ ...challengeForm, templateCode: e.target.value })}
          />

          <Divider label="H\u1ec7 th\u1ed1ng Test Cases ki\u1ec3m th\u1eed t\u1ef1 \u0111\u1ed9ng (Auto-grader)" labelPosition="center" />
          
          <Stack gap="xs">
            {challengeForm.testCases.map((tc, index) => (
              <Paper key={index} p="xs" radius="md" withBorder className="bg-slate-50">
                <Grid align="flex-end" gutter="xs">
                  <Grid.Col span={4}>
                    <TextInput 
                      label="Tham s\u1ed1 Input" 
                      placeholder="V\u00ed d\u1ee5: 10" 
                      value={tc.input}
                      onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput 
                      label="Output mong \u0111\u1ee3i" 
                      placeholder="V\u00ed d\u1ee5: 30" 
                      value={tc.expectedOutput}
                      onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={3} className="pb-2">
                    <Checkbox 
                      label="\u1ea8n ki\u1ec3m th\u1eed" 
                      checked={tc.isHidden}
                      onChange={(e) => handleTestCaseChange(index, 'isHidden', e.target.checked)}
                    />
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <ActionIcon color="red" variant="light" onClick={() => handleRemoveTestCase(index)}>
                      <LuTrash2 size={16} />
                    </ActionIcon>
                  </Grid.Col>
                </Grid>
              </Paper>
            ))}
            <Button variant="light" color="indigo" size="xs" leftSection={<LuPlus size={14} />} onClick={handleAddTestCase}>
              Th\u00eam TestCase m\u1edbi
            </Button>
          </Stack>

          <Group justify="flex-end" mt="md">
            <Button variant="light" color="gray" onClick={() => setChallengeModalOpen(false)}>H\u1ee7y</Button>
            <Button color="green" onClick={handleSaveChallenge} loading={savingChallenge}>L\u01b0u & \u00c1p d\u1ee5ng</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};
