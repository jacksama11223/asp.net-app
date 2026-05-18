import React, { useState, useEffect } from 'react';
import { 
  Box, Title, Text, Stack, Group, Button, SimpleGrid, Paper, Badge, 
  ActionIcon, Progress, Loader, Modal, TextInput, Textarea, NumberInput,
  Select, Divider, Table, Checkbox, Card, Grid
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
  
  // Course Modal States
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({ courseId: 0, title: '', category: 'Lập trình', price: 0, status: 'Draft' });
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
    templateCode: '// Bắt đầu code...\nusing System;\n\npublic class Program {\n    public static void Main() {\n        Console.WriteLine("Hello World");\n    }\n}',
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
      toast.error("Không thể tải danh sách khóa học.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSaveCourse = async () => {
    if (!courseForm.title) {
      toast.error("Vui lòng điền tiêu đề khóa học.");
      return;
    }
    setSavingCourse(true);
    try {
      await apiClient.post('/api/compiler/courses/save', courseForm);
      toast.success(courseForm.courseId > 0 ? "Cập nhật khóa học thành công!" : "Tạo khóa học mới thành công!");
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
    setSavingChallenge(true);
    try {
      const payload = {
        ...challengeForm,
        courseId: selectedCourse.courseId,
        lessonId: selectedLesson.lessonId
      };
      await apiClient.post('/api/compiler/challenges/save', payload);
      toast.success("Lưu cấu hình đề bài & testcases thành công!");
      setChallengeModalOpen(false);
      // Reload studio
      handleOpenStudio(selectedCourse);
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
            Quản lý Khóa học & Bài tập Code
          </Title>
          <Text c="dimmed" size="sm" mt={4}>Thiết kế và quản lý bài tập lập trình trực tiếp cho học viên.</Text>
        </Box>
        <Button 
          variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} 
          leftSection={<LuPlus size={18} />} radius="md"
          onClick={() => {
            setCourseForm({ courseId: 0, title: '', category: 'Lập trình', price: 0, status: 'Draft' });
            setCourseModalOpen(true);
          }}
        >
          Tạo khóa học
        </Button>
      </Group>

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
                  <Text size="xs" c="dimmed" fw={600}>{course.studentsCount} Học viên</Text>
                </Group>
                <Group gap={4}>
                  <LuZap size={14} className="text-brand-300 self-end mt-1" />
                  <Text size="xs" c="dimmed" fw={600}>{course.lessonsCount} Bài học</Text>
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

      {/* MODAL TẠO / SỬA KHÓA HỌC */}
      <Modal opened={courseModalOpen} onClose={() => setCourseModalOpen(false)} title={courseForm.courseId > 0 ? "Cấu hình Khóa học" : "Tạo Khóa học mới"} radius="xl" p="md">
        <Stack gap="md">
          <TextInput 
            label="Tiêu đề Khóa học" 
            placeholder="Ví dụ: Lập trình C# cơ bản"
            value={courseForm.title}
            onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
            required
          />
          <TextInput 
            label="Danh mục" 
            placeholder="Lập trình, Database, Frontend..."
            value={courseForm.category}
            onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
          />
          <NumberInput 
            label="Giá khóa học (VNĐ)" 
            value={courseForm.price}
            onChange={(val) => setCourseForm({ ...courseForm, price: Number(val) })}
            min={0}
          />
          <Select 
            label="Trạng thái"
            data={['Draft', 'Published', 'Archived']}
            value={courseForm.status}
            onChange={(val) => setCourseForm({ ...courseForm, status: val || 'Draft' })}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" color="gray" onClick={() => setCourseModalOpen(false)}>Hủy</Button>
            <Button color="brand" onClick={handleSaveCourse} loading={savingCourse}>Lưu lại</Button>
          </Group>
        </Stack>
      </Modal>

      {/* MODAL STUDIO QUẢN LÝ GIÁO TRÌNH & BÀI TẬP CODE */}
      <Modal opened={studioOpen} onClose={() => setStudioOpen(false)} title={`Studio Khóa học: ${selectedCourse?.title}`} size="xl" radius="xl" p="md">
        {studioLoading ? (
          <Stack align="center" justify="center" py={50}>
            <Loader size="lg" color="brand" />
            <Text c="dimmed">Đang nạp dữ liệu giáo trình...</Text>
          </Stack>
        ) : (
          <Stack gap="lg">
            <Box>
              <Text size="sm" c="dimmed">Bên dưới là danh sách module và bài giảng. Bạn có thể thêm hoặc cấu hình bài thực hành lập trình trực tiếp cho từng bài giảng.</Text>
            </Box>
            <Divider />
            
            {modules.length === 0 ? (
              <Text ta="center" py="xl" c="dimmed">Khóa học này chưa có chương trình học tập nào. Hãy khởi tạo module trên hệ thống quản lý chính.</Text>
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
                            <Text size="xs" c="dimmed">Loại: {lesson.lessonType}</Text>
                          </Box>
                        </Group>
                        <Group>
                          {lesson.hasChallenge ? (
                            <Badge color="green" variant="light" leftSection={<LuSparkles size={10} />}>
                              Đã có Sandbox Code
                            </Badge>
                          ) : (
                            <Badge color="gray" variant="light">
                              Chưa có Sandbox
                            </Badge>
                          )}
                          <Button 
                            variant="light" 
                            color={lesson.hasChallenge ? "green" : "brand"} 
                            size="xs" 
                            leftSection={<LuPenTool size={12} />}
                            onClick={() => handleOpenChallengeEditor(lesson)}
                          >
                            Cấu hình Code
                          </Button>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Card>
              ))
            )}
            
            <Group justify="flex-end" mt="md">
              <Button onClick={() => setStudioOpen(false)}>Hoàn tất</Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* MODAL CẤU HÌNH COMPILER SANDBOX ĐỀ BÀI & TESTCASES */}
      <Modal opened={challengeModalOpen} onClose={() => setChallengeModalOpen(false)} title="Cấu hình Sandbox thực hành Lập trình" size="lg" radius="xl" p="md">
        <Stack gap="md">
          <TextInput 
            label="Tiêu đề bài thực hành" 
            placeholder="Ví dụ: Tính tổng các số chẵn trong mảng"
            value={challengeForm.title}
            onChange={(e) => setChallengeForm({ ...challengeForm, title: e.target.value })}
            required
          />
          <Textarea 
            label="Yêu cầu đề bài (Mô tả chi tiết)"
            placeholder="Mô tả thuật toán cần viết, input đầu vào và kết quả output mong muốn trả về..."
            minRows={3}
            value={challengeForm.description}
            onChange={(e) => setChallengeForm({ ...challengeForm, description: e.target.value })}
            required
          />
          <Grid>
            <Grid.Col span={6}>
              <NumberInput 
                label="Điểm thưởng (XP)"
                value={challengeForm.points}
                onChange={(val) => setChallengeForm({ ...challengeForm, points: Number(val) })}
                min={10}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select 
                label="Ngôn ngữ biên dịch"
                data={[{ value: 'csharp', label: 'C# (Roslyn Sandbox)' }]}
                value={challengeForm.language}
                onChange={(val) => setChallengeForm({ ...challengeForm, language: val || 'csharp' })}
              />
            </Grid.Col>
          </Grid>

          <Textarea 
            label="Mã nguồn khung mẫu (Template Code)"
            placeholder="// Cung cấp code mẫu ban đầu để học viên viết tiếp..."
            minRows={5}
            fontFamily="monospace"
            value={challengeForm.templateCode}
            onChange={(e) => setChallengeForm({ ...challengeForm, templateCode: e.target.value })}
          />

          <Divider label="Hệ thống Test Cases kiểm thử tự động (Auto-grader)" labelPosition="center" />
          
          <Stack gap="xs">
            {challengeForm.testCases.map((tc, index) => (
              <Paper key={index} p="xs" radius="md" withBorder className="bg-slate-50">
                <Grid align="flex-end" gutter="xs">
                  <Grid.Col span={4}>
                    <TextInput 
                      label="Tham số Input" 
                      placeholder="Ví dụ: 10" 
                      value={tc.input}
                      onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput 
                      label="Output mong đợi" 
                      placeholder="Ví dụ: 30" 
                      value={tc.expectedOutput}
                      onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={3} className="pb-2">
                    <Checkbox 
                      label="Ẩn kiểm thử" 
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
              Thêm TestCase mới
            </Button>
          </Stack>

          <Group justify="flex-end" mt="md">
            <Button variant="light" color="gray" onClick={() => setChallengeModalOpen(false)}>Hủy</Button>
            <Button color="green" onClick={handleSaveChallenge} loading={savingChallenge}>Lưu & Áp dụng</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};
