import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Title, Text, Button, Stack, 
  Group, Badge, Accordion, List, ThemeIcon, Image, Avatar,
  Loader, Divider, Box, SimpleGrid, Modal, Textarea, Rating
} from '@mantine/core';
import { 
  LuPlay, LuBookOpen, LuSparkles, LuZap, 
  LuUsers, LuClock, LuSend, LuArrowLeft
} from 'react-icons/lu';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';
import { toast } from 'sonner';

export const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState(false);
  const [myRating, setMyRating] = useState(5);
  const [myReview, setMyReview] = useState('');
  const token = localStorage.getItem('slms_token');

  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/public/courses/${id}`);
        setCourse(response.data);
        setCurriculum(response.data.modules || []);
        // Lấy reviews nếu API tồn tại
        try {
          const reviewRes = await axios.get(`${BASE_URL}/api/courses/${id}/reviews`);
          setReviews(reviewRes.data || []);
        } catch { /* API chưa có - bỏ qua */ }
      } catch (err) {
        console.error("Failed to fetch course details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmitReview = async () => {
    try {
      await apiClient.post(`/api/student/review`, {
        courseId: parseInt(id),
        rating: myRating,
        comment: myReview
      });
      toast.success('Cảm ơn bạn đã đánh giá khóa học!');
      setReviewModal(false);
      setMyReview('');
    } catch (err) {
      toast.error('Không thể gửi đánh giá. Vui lòng thử lại.');
    }
  };

  if (loading) return <Stack align="center" py={100}><Loader size="xl" color="brand" type="bars" /></Stack>;
  if (!course) return <Text>Course not found</Text>;

  const avgRating = course.rating || 4.5;
  const instructorName = course.instructorName || course.instructor?.fullName || 'Hệ thống SmartLMS';
  const instructorInitial = instructorName.charAt(0).toUpperCase();

  return (
    <Container size="lg" py="xl">
      {/* Review Modal */}
      <Modal opened={reviewModal} onClose={() => setReviewModal(false)} title="Đánh giá khóa học" radius="lg" centered>
        <Stack gap="lg" p="md">
          <Box ta="center">
            <Text fw={700} mb="md">Bạn đánh giá khóa học này như thế nào?</Text>
            <Rating value={myRating} onChange={setMyRating} size="xl" />
          </Box>
          <Textarea
            placeholder="Chia sẻ trải nghiệm học tập của bạn..."
            minRows={4}
            radius="md"
            value={myReview}
            onChange={(e) => setMyReview(e.target.value)}
          />
          <Button 
            color="brand" radius="md" size="md" fullWidth
            leftSection={<LuSend size={16} />}
            onClick={handleSubmitReview}
          >
            Gửi đánh giá
          </Button>
        </Stack>
      </Modal>

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
              
              {/* Instructor Info - Sprint 1: Hiển thị tên tác giả */}
              <Group mt="xl" gap="xl">
                <Group gap="xs">
                  <Avatar size="md" color="brand" radius="xl">{instructorInitial}</Avatar>
                  <Box>
                    <Text size="xs" c="dimmed">Giảng viên</Text>
                    <Text size="sm" fw={700}>{instructorName}</Text>
                  </Box>
                </Group>
                <Group gap="xs">
                  <LuSparkles className="text-yellow-500" size={16} />
                  <Text size="sm" fw={700}>{avgRating.toFixed(1)} ({course.ratingCount || 0} đánh giá)</Text>
                </Group>
                <Group gap="xs">
                  <LuUsers className="text-slate-400" size={16} />
                  <Text size="sm" fw={500}>{course.enrollmentCount || 0} học viên</Text>
                </Group>
                <Group gap="xs">
                  <LuClock className="text-slate-400" size={16} />
                  <Text size="sm" fw={500}>{course.totalHours || '0'} giờ</Text>
                </Group>
              </Group>
            </Box>

            <Divider />

            {/* What you'll learn */}
            <Box>
              <Title order={2} mb="lg" className="tracking-tight">Bạn sẽ học được gì</Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {(course.learningObjectives || [
                  'Nắm vững kiến thức nền tảng và ứng dụng thực tế.',
                  'Xây dựng dự án thực tế từ đầu đến cuối.',
                  'Hiểu sâu các khái niệm và phương pháp hiện đại.',
                  'Tự tin phỏng vấn và làm việc tại doanh nghiệp.'
                ]).map((obj, i) => (
                  <Group key={i} align="flex-start" wrap="nowrap">
                    <LuZap className="text-brand-600 mt-1 shrink-0" size={18} />
                    <Text size="sm">{obj}</Text>
                  </Group>
                ))}
              </SimpleGrid>
            </Box>

            {/* Curriculum */}
            <Box>
              <Group justify="space-between" mb="lg">
                <Title order={2} className="tracking-tight">Chương trình học</Title>
                <Text size="sm" c="dimmed" fw={600}>{curriculum.length} Chương • {curriculum.reduce((s, m) => s + (m.lessons?.length || 0), 0)} Bài học</Text>
              </Group>
              
              <Accordion variant="separated" radius="md">
                {curriculum.map((module) => (
                  <Accordion.Item key={module.moduleId} value={module.title}>
                    <Accordion.Control>
                      <Group justify="space-between" pr="md">
                        <Text fw={700}>{module.title}</Text>
                        <Text size="xs" c="dimmed">{module.lessons?.length || 0} bài học</Text>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <List spacing="sm" size="sm" center icon={
                        <ThemeIcon color="brand" size={24} radius="xl">
                          <LuPlay size={14} />
                        </ThemeIcon>
                      }>
                        {module.lessons?.map((lesson) => (
                          <List.Item key={lesson.lessonId}>
                            <Group justify="space-between">
                              <Text fw={500}>{lesson.title}</Text>
                              <Badge variant="light" color={lesson.lessonType === 'Video' ? 'blue' : 'teal'} size="xs">
                                {lesson.lessonType || 'Video'}
                              </Badge>
                            </Group>
                          </List.Item>
                        ))}
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Box>

            {/* Sprint 1: Review Section */}
            <Box>
              <Group justify="space-between" mb="lg">
                <Title order={2} className="tracking-tight">Đánh giá từ học viên</Title>
                <Button 
                  variant="light" color="brand" radius="md"
                  leftSection={<LuSparkles size={16} />}
                  onClick={() => setReviewModal(true)}
                >
                  Viết đánh giá
                </Button>
              </Group>

              {/* Rating Summary */}
              <Paper p="xl" radius="xl" withBorder className="bg-brand-50/30 mb-xl">
                <Group gap="xl">
                  <Box ta="center">
                    <Text size="64px" fw={900} className="text-brand-600 leading-none">{avgRating.toFixed(1)}</Text>
                    <Rating value={Math.round(avgRating)} readOnly size="sm" mt={4} />
                    <Text size="xs" c="dimmed" mt={4}>{course.ratingCount || 0} đánh giá</Text>
                  </Box>
                  <Box className="flex-1">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <Group key={star} gap="xs" mb={4}>
                        <Text size="xs" w={8}>{star}</Text>
                        <LuSparkles size={10} className="text-yellow-500" />
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 rounded-full h-2 transition-all"
                            style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }}
                          />
                        </div>
                      </Group>
                    ))}
                  </Box>
                </Group>
              </Paper>

              {/* Review List */}
              {reviews.length > 0 ? reviews.map((review, i) => (
                <Paper key={i} p="lg" radius="xl" withBorder mb="md">
                  <Group mb="sm">
                    <Avatar size="sm" color="brand" radius="xl">{review.userName?.charAt(0) || 'U'}</Avatar>
                    <Box>
                      <Text size="sm" fw={700}>{review.userName || 'Học viên ẩn danh'}</Text>
                      <Rating value={review.rating} readOnly size="xs" />
                    </Box>
                  </Group>
                  <Text size="sm" c="dimmed">{review.comment}</Text>
                </Paper>
              )) : (
                <Text c="dimmed" ta="center" py="xl">Chưa có đánh giá nào. Hãy là người đầu tiên!</Text>
              )}
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
                size="lg" radius="md" color="brand" fullWidth
                onClick={() => navigate(`/checkout/${id}`)}
              >
                Đăng Ký Ngay
              </Button>
              <Button 
                size="lg" radius="md" variant="light" color="orange" fullWidth
                leftSection={<LuZap size={16} />}
                onClick={() => setReviewModal(true)}
              >
                Ủng hộ Giảng viên ☕
              </Button>
              <Button size="lg" radius="md" variant="light" color="gray" fullWidth
                leftSection={<LuSparkles size={16} />}
              >
                Thêm vào yêu thích
              </Button>
            </Stack>

            <Text size="xs" ta="center" mt="md" c="dimmed">30-Day Money-Back Guarantee</Text>

            <Box mt="xl">
              <Text fw={700} size="sm" mb="md">Khóa học bao gồm:</Text>
              <Stack gap="xs">
                <Group gap="xs">
                  <LuPlay size={16} className="text-brand-600" />
                  <Text size="xs">Video bài giảng chất lượng cao</Text>
                </Group>
                <Group gap="xs">
                  <LuBookOpen size={16} className="text-brand-600" />
                  <Text size="xs">Tài liệu và bài tập thực hành</Text>
                </Group>
                <Group gap="xs">
                  <LuClock size={16} className="text-brand-600" />
                  <Text size="xs">Truy cập trọn đời</Text>
                </Group>
                <Group gap="xs">
                  <LuZap size={16} className="text-brand-600" />
                  <Text size="xs">Chứng chỉ hoàn thành</Text>
                </Group>
              </Stack>
            </Box>

            {/* Sprint 1: Instructor Profile Card */}
            <Divider my="xl" />
            <Box>
              <Text fw={700} size="sm" mb="md">Về giảng viên</Text>
              <Group>
                <Avatar size="lg" color="brand" radius="xl">{instructorInitial}</Avatar>
                <Box>
                  <Text fw={700}>{instructorName}</Text>
                  <Text size="xs" c="dimmed">Chuyên gia SmartLMS</Text>
                  <Group gap={4} mt={4}>
                    <LuSparkles size={12} className="text-yellow-500" />
                    <Text size="xs" fw={600}>{avgRating.toFixed(1)}</Text>
                    <Text size="xs" c="dimmed">• {course.enrollmentCount || 0} học viên</Text>
                  </Group>
                </Box>
              </Group>
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
