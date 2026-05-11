import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Paper, Grid, Title, Text, Group, SimpleGrid, Progress, Badge, ThemeIcon, Box, Stack, Button, Loader, Table, ActionIcon, Modal, Textarea, ScrollArea, Avatar
} from '@mantine/core';
import { LuSparkles, LuZap, LuClock, LuBookOpen, LuUsers, LuPlay, LuPlus, LuSend } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, getDashboardStats, getEngagementChart } from '../api';
import { COURSE_TRENDS, AI_RISK_DATA } from '../utils/mockData';
import { toast } from 'sonner';

// --- Shared Components ---
const CardWrapper = ({ children, p = "xl", className = "" }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <Paper p={p} radius="xl" className={`glass bg-white border-slate-100 shadow-xl hover:border-brand-500/50 transition-colors ${className}`}>
      {children}
    </Paper>
  </motion.div>
);

const StatCard = ({ label, value, change, color, icon: Icon }) => (
  <CardWrapper p="lg">
    <Group justify="space-between" mb="xs">
      <ThemeIcon size="lg" radius="md" variant="light" color={color}>
        <Icon size={20} />
      </ThemeIcon>
      {change && <Badge color="green" variant="light" size="sm">{change}</Badge>}
    </Group>
    <Box>
      <Text size="xs" fw={700} tt="uppercase" tracking="widest" c="dimmed">{label}</Text>
      <Title order={2} fw={900} className="tracking-tight">{value}</Title>
    </Box>
  </CardWrapper>
);

// --- Instructor Dashboard ---
const InstructorDashboard = ({ user, apiClient, navigate }) => {
  const [courses, setCourses] = useState([]);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  // Lấy danh sách khóa học của giảng viên (giả lập hoặc API thực nếu có)
  useEffect(() => {
    // Tạm thời gọi API public courses để hiển thị mẫu, thực tế cần gọi /api/instructor/courses
    const fetchCourses = async () => {
      try {
        const res = await apiClient.get('/api/public/courses');
        setCourses(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCourses();
  }, []);

  const openChat = async (studentId, courseId) => {
    setActiveStudent({ id: studentId, name: 'Học viên Test', courseId });
    setChatModalOpen(true);
    try {
      const res = await apiClient.get(`/api/messages/history/${courseId}/${studentId}`);
      setMessages(res.data);
    } catch (e) {
      toast.error('Chưa có lịch sử chat');
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return;
    try {
      const res = await apiClient.post('/api/messages/send', {
        receiverId: activeStudent.id,
        courseId: activeStudent.courseId,
        content: messageInput
      });
      setMessages([...messages, { ...res.data, senderId: user.userId, senderName: user.fullName }]);
      setMessageInput('');
      toast.success('Đã gửi tin nhắn');
    } catch (e) {
      toast.error('Lỗi gửi tin nhắn');
    }
  };

  return (
    <Stack gap="xl">
      <Box mb="md">
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={1} fw={900} className="tracking-tighter text-4xl text-slate-900">
              Creator Studio, <Text span variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} inherit>{user.fullName || 'Instructor'}</Text> 🚀
            </Title>
            <Text c="dimmed" size="sm" mt={4}>Chào mừng trở lại. Hôm nay có <Text span c="green.7" fw={700}>12</Text> học viên mới tham gia khóa học của bạn!</Text>
          </Box>
          <Button 
            variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} radius="md" size="lg"
            leftSection={<LuPlus size={20} />}
            className="shadow-xl shadow-indigo-500/30"
          >
            Tạo Khóa Học Mới
          </Button>
        </Group>
      </Box>

      <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} gap="lg">
        <StatCard label="Tổng Học Viên" value="1,245" change="+12" color="indigo" icon={LuUsers} />
        <StatCard label="Khóa Đang Dạy" value={courses.length} color="blue" icon={LuBookOpen} />
        <StatCard label="Đánh giá TB" value="4.9" change="⭐" color="yellow" icon={LuZap} />
        <StatCard label="Doanh Thu Tháng" value="15.4M" change="+2.1M" color="teal" icon={LuSparkles} />
      </SimpleGrid>

      <Grid gutter="xl">
        {/* Module: My Courses Tracking */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <CardWrapper>
            <Group justify="space-between" mb="xl">
              <Group gap="xs">
                <LuBookOpen size={20} className="text-indigo-600" />
                <Title order={3} className="tracking-tight">Quản lý Khóa Học</Title>
              </Group>
              <Button variant="light" size="xs">Xem tất cả</Button>
            </Group>
            
            <Table striped highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Tên khóa học</Table.Th>
                  <Table.Th>Số lượng HS</Table.Th>
                  <Table.Th>Tiến độ TB</Table.Th>
                  <Table.Th>Doanh thu</Table.Th>
                  <Table.Th>Thao tác</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {courses.slice(0, 4).map((c) => (
                  <Table.Tr key={c.courseId}>
                    <Table.Td fw={500}>{c.title}</Table.Td>
                    <Table.Td>{Math.floor(Math.random() * 50) + 10} học viên</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Progress value={Math.floor(Math.random() * 60) + 30} color="indigo" size="sm" className="w-24" />
                        <Text size="xs">{Math.floor(Math.random() * 60) + 30}%</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(c.price * 5)}</Table.Td>
                    <Table.Td>
                      <ActionIcon color="indigo" variant="light" onClick={() => openChat(2, c.courseId)} title="Nhắn tin cho học viên (Test)">
                        <LuSend size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </CardWrapper>
        </Grid.Col>

        {/* Module: Course Creation Banner */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <CardWrapper className="bg-gradient-to-br from-indigo-500 to-cyan-600 border-none text-white">
            <Stack align="center" ta="center" gap="md" py="xl">
              <ThemeIcon size={64} radius="xl" color="white" variant="light">
                <LuPlay size={32} />
              </ThemeIcon>
              <Title order={3}>Bạn có ý tưởng mới?</Title>
              <Text size="sm" opacity={0.9}>
                Studio tạo khóa học của SmartLMS tích hợp AI giúp bạn soạn giáo trình, tạo Quiz và Video dễ dàng hơn bao giờ hết.
              </Text>
              <Button color="white" variant="white" c="indigo" mt="md" radius="md" size="md">
                Bắt đầu Studio
              </Button>
            </Stack>
          </CardWrapper>
        </Grid.Col>
      </Grid>

      {/* Chat Modal */}
      <Modal opened={chatModalOpen} onClose={() => setChatModalOpen(false)} title={`Chat với ${activeStudent?.name}`} size="lg" radius="md">
        <Stack gap="md">
          <ScrollArea h={300} className="bg-slate-50 p-md rounded-md">
            <Stack gap="xs">
              {messages.length === 0 ? (
                <Text c="dimmed" ta="center" mt="xl">Chưa có tin nhắn nào. Hãy gửi lời chào!</Text>
              ) : (
                messages.map((m, i) => (
                  <Box key={i} ta={m.senderId === user.userId ? 'right' : 'left'}>
                    <Badge variant="filled" color={m.senderId === user.userId ? 'indigo' : 'gray'} size="lg" tt="none">
                      {m.content}
                    </Badge>
                  </Box>
                ))
              )}
            </Stack>
          </ScrollArea>
          <Group align="flex-end">
            <Textarea 
              placeholder="Nhập tin nhắn..." 
              value={messageInput} 
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1"
              minRows={2}
            />
            <ActionIcon size="xl" color="indigo" variant="filled" onClick={sendMessage}>
              <LuSend size={20} />
            </ActionIcon>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

// --- Student Dashboard (Giữ nguyên logic cũ) ---
const StudentDashboard = ({ user, stats, chartData, navigate }) => {
  const formattedChartData = chartData.categories.map((cat, idx) => {
    const obj = { name: cat };
    chartData.series.forEach(s => { obj[s.name] = s.data[idx]; });
    return obj;
  });

  return (
    <Stack gap="xl">
      <Box mb="md">
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={1} fw={900} className="tracking-tighter text-4xl text-slate-900">
              Morning, <Text span variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} inherit>{user.fullName || 'Student'}</Text> ✨
            </Title>
            <Text c="dimmed" size="sm" mt={4}>Your AI success probability is currently <Text span c="green.7" fw={700}>{stats?.dropoutRiskRate || '92.4'}%</Text>. Keep it up!</Text>
          </Box>
          <Group>
            <Button variant="light" color="brand" radius="md" leftSection={<LuClock size={18} />} onClick={() => navigate('/booking')}>Book Tutor</Button>
            <Button variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} radius="md" leftSection={<LuZap size={18} />} onClick={() => navigate('/courses')}>Start Learning</Button>
          </Group>
        </Group>
      </Box>

      <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} gap="lg">
        <StatCard label="Total Students" value={stats?.totalStudents || 0} change="+2" color="brand" icon={LuUsers} />
        <StatCard label="Avg Completion" value={`${stats?.avgCompletionRate || 0}%`} change="+14%" color="blue" icon={LuClock} />
        <StatCard label="Dropout Risk" value={`${stats?.dropoutRiskRate || 0}%`} change="AI" color="orange" icon={LuZap} />
        <StatCard label="Total Revenue" value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats?.totalRevenue || 0)} change="LIVE" color="teal" icon={LuZap} />
      </SimpleGrid>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <CardWrapper>
            <Group justify="space-between" mb="xl">
              <Box>
                <Group gap="xs" mb={4}>
                  <LuSparkles size={20} color="var(--mantine-color-brand-600)" />
                  <Title order={3} className="tracking-tight text-slate-800">Learning Momentum</Title>
                </Group>
                <Text size="xs" c="dimmed">Your engagement data over the last 30 days</Text>
              </Box>
              <Button variant="subtle" size="xs" rightSection={<LuPlay size={14} />}>Export Analytics</Button>
            </Group>

            <Box h={300}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={COURSE_TRENDS}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis hide />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '16px' }} />
                  <Area type="monotone" dataKey="enrollments" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardWrapper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <CardWrapper>
            <Group gap="xs" mb="xl">
              <LuZap size={20} color="orange" />
              <Title order={3} className="tracking-tight text-slate-800">AI Success Insights</Title>
            </Group>
            <Stack gap="xl">
              {AI_RISK_DATA.map((item) => (
                <Box key={item.name}>
                  <Group justify="space-between" mb="xs">
                    <Text size="xs" fw={700} c="dimmed">{item.name}</Text>
                    <Badge variant="light" color={item.color}>{item.value}% Probability</Badge>
                  </Group>
                  <Progress value={item.value} color={item.color} size="xl" radius="xl" className="bg-slate-100" />
                </Box>
              ))}
            </Stack>
          </CardWrapper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

// --- Main Wrapper ---
export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState({ categories: [], series: [] });
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
        const [statsData, engagementData] = await Promise.all([
          getDashboardStats(apiClient),
          getEngagementChart(apiClient)
        ]);
        setStats(statsData);
        setChartData(engagementData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Box p={50}><Loader size="xl" /></Box>;

  if (user.role === 'Admin' || user.role === 'Instructor') {
    return <InstructorDashboard user={user} apiClient={apiClient} navigate={navigate} />;
  }

  return <StudentDashboard user={user} stats={stats} chartData={chartData} navigate={navigate} />;
};
