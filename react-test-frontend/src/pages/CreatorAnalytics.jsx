import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Box, Title, Text, Stack, Group, Paper, SimpleGrid,
  ThemeIcon, Badge, Select, Loader, RingProgress
} from '@mantine/core';
import {
  LuZap, LuUsers, LuBookOpen, LuArrowLeft, LuSparkles, LuClock
} from 'react-icons/lu';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../api';

// Màu biểu đồ
const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

// Dữ liệu mẫu khi API chưa có
const MOCK_REVENUE = [
  { month: 'T1', revenue: 4200000, students: 12 },
  { month: 'T2', revenue: 6800000, students: 19 },
  { month: 'T3', revenue: 5100000, students: 15 },
  { month: 'T4', revenue: 9200000, students: 27 },
  { month: 'T5', revenue: 7600000, students: 22 },
];

const MOCK_COURSES = [
  { name: 'ASP.NET Core 8', value: 45 },
  { name: 'React Masterclass', value: 30 },
  { name: 'Docker & DevOps', value: 25 },
];

export const CreatorAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('5');
  const token = localStorage.getItem('slms_token');

  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await apiClient.get('/api/instructor/analytics');
        setStats(res.data);
      } catch {
        // Dùng mock data nếu API chưa có
        setStats({
          totalRevenue: 32900000,
          totalStudents: 95,
          activeCourses: 3,
          completionRate: 72,
          revenueData: MOCK_REVENUE,
          courseDistribution: MOCK_COURSES,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return (
    <Stack align="center" justify="center" h="80vh">
      <Loader size="xl" color="brand" type="bars" />
    </Stack>
  );

  const statCards = [
    {
      label: 'Tổng doanh thu',
      value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue),
      icon: LuZap,
      color: 'brand',
      change: '+24%',
    },
    {
      label: 'Tổng học viên',
      value: stats.totalStudents,
      icon: LuUsers,
      color: 'indigo',
      change: '+12%',
    },
    {
      label: 'Khóa học hoạt động',
      value: stats.activeCourses,
      icon: LuBookOpen,
      color: 'teal',
      change: '+1',
    },
    {
      label: 'Tỷ lệ hoàn thành',
      value: `${stats.completionRate}%`,
      icon: LuSparkles,
      color: 'orange',
      change: '+5%',
    },
  ];

  return (
    <Stack gap="xl">
      {/* Header */}
      <Box>
        <Title order={1} fw={900} className="tracking-tighter text-3xl text-slate-900">
          Analytics & Doanh thu
        </Title>
        <Text c="dimmed" size="sm" mt={4}>Theo dõi hiệu suất giảng dạy và doanh thu thời gian thực.</Text>
      </Box>

      {/* Stat Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Paper radius="xl" p="xl" withBorder className="glass bg-white shadow-sm hover:shadow-md transition-shadow">
              <Group justify="space-between" mb="md">
                <ThemeIcon size="lg" radius="md" color={card.color} variant="light">
                  <card.icon size={20} />
                </ThemeIcon>
                <Badge color="teal" variant="light" size="sm">{card.change} tháng này</Badge>
              </Group>
              <Text size="28px" fw={900} className="text-slate-900 leading-tight">{card.value}</Text>
              <Text size="sm" c="dimmed" mt={4}>{card.label}</Text>
            </Paper>
          </motion.div>
        ))}
      </SimpleGrid>

      {/* Charts Row */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
        {/* Revenue Chart */}
        <Paper radius="xl" p="xl" withBorder className="glass bg-white shadow-sm">
          <Group justify="space-between" mb="xl">
            <Box>
              <Title order={3} fw={800}>Biểu đồ Doanh thu</Title>
              <Text size="xs" c="dimmed">5 tháng gần nhất</Text>
            </Box>
            <Select
              size="xs"
              radius="md"
              data={[{ value: '5', label: '5 tháng' }, { value: '12', label: '12 tháng' }]}
              value={period}
              onChange={setPeriod}
              w={100}
            />
          </Group>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats.revenueData || MOCK_REVENUE}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>

        {/* Student Enrollment Chart */}
        <Paper radius="xl" p="xl" withBorder className="glass bg-white shadow-sm">
          <Box mb="xl">
            <Title order={3} fw={800}>Học viên đăng ký mới</Title>
            <Text size="xs" c="dimmed">Theo từng tháng</Text>
          </Box>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.revenueData || MOCK_REVENUE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="students" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Học viên mới" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </SimpleGrid>

      {/* Bottom Row */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
        {/* Course Distribution Pie */}
        <Paper radius="xl" p="xl" withBorder className="glass bg-white shadow-sm">
          <Title order={3} fw={800} mb="xl">Phân bổ học viên theo Khóa học</Title>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={stats.courseDistribution || MOCK_COURSES}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {(stats.courseDistribution || MOCK_COURSES).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Completion Rate */}
        <Paper radius="xl" p="xl" withBorder className="glass bg-white shadow-sm">
          <Title order={3} fw={800} mb="xl">Chỉ số hiệu suất</Title>
          <Stack gap="lg">
            <Group justify="space-between" align="center">
              <Box>
                <Text fw={700}>Tỷ lệ hoàn thành khóa học</Text>
                <Text size="xs" c="dimmed">Trung bình toàn hệ thống</Text>
              </Box>
              <RingProgress
                size={80}
                thickness={8}
                sections={[{ value: stats.completionRate, color: 'brand' }]}
                label={<Text ta="center" size="xs" fw={700}>{stats.completionRate}%</Text>}
              />
            </Group>

            <Group justify="space-between" align="center">
              <Box>
                <Text fw={700}>Tỷ lệ hài lòng</Text>
                <Text size="xs" c="dimmed">Dựa trên đánh giá sao</Text>
              </Box>
              <RingProgress
                size={80}
                thickness={8}
                sections={[{ value: 88, color: 'teal' }]}
                label={<Text ta="center" size="xs" fw={700}>88%</Text>}
              />
            </Group>

            <Group justify="space-between" align="center">
              <Box>
                <Text fw={700}>Tỷ lệ tái đăng ký</Text>
                <Text size="xs" c="dimmed">Học viên mua khóa thứ 2</Text>
              </Box>
              <RingProgress
                size={80}
                thickness={8}
                sections={[{ value: 42, color: 'orange' }]}
                label={<Text ta="center" size="xs" fw={700}>42%</Text>}
              />
            </Group>
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
};
