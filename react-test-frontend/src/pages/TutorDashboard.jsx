import React, { useState } from 'react';
import {
  Box, Title, Text, Stack, Group, Paper, Button,
  SimpleGrid, Card, ActionIcon, Badge, Avatar, RingProgress, Table, Grid
} from '@mantine/core';
import {
  LuLayoutDashboard, LuUsers, LuZap, LuClock, LuSend, LuPlay
} from 'react-icons/lu';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const TutorDashboard = () => {
  const navigate = useNavigate();

  // Mock data for Sprint 3
  const tutorStats = {
    rating: 4.9,
    reviews: 124,
    studentsHelped: 850,
    earnings: 12500000,
    upcomingSessions: 3
  };

  const bookingRequests = [
    { id: 1, student: 'Trần Văn X', topic: 'Debug React Hooks', date: '12/05 14:00', status: 'Pending' },
    { id: 2, student: 'Lê Thị Y', topic: 'Setup Docker Compose', date: '13/05 10:00', status: 'Confirmed' }
  ];

  const recentQuestions = [
    { id: 101, student: 'Nguyễn A', question: 'Tại sao useEffect lại chạy 2 lần ở StrictMode?', time: '10 phút trước' },
    { id: 102, student: 'Phạm B', question: 'Lỗi CORS khi gọi API từ Vite sang ASP.NET Core', time: '1 giờ trước' }
  ];

  return (
    <Box maw={1200} mx="auto" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={1} fw={900} className="tracking-tight text-3xl text-slate-900">
              Gia sư & Hỗ trợ <Badge color="orange" variant="light">Tutor Mode</Badge>
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Bảng điều khiển dành riêng cho giảng viên hỗ trợ 1:1 và trả lời cộng đồng.
            </Text>
          </Box>
          <Button color="orange" radius="xl" leftSection={<LuZap size={16} />}>
            Bật trạng thái Online
          </Button>
        </Group>

        {/* Thống kê hiệu suất */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          <Paper p="xl" radius="xl" withBorder className="glass bg-white">
            <Group justify="space-between" mb="md">
              <LuZap size={24} className="text-orange-500" />
              <Badge color="orange" variant="light">Đánh giá 5⭐</Badge>
            </Group>
            <Text size="32px" fw={900}>{tutorStats.rating}</Text>
            <Text size="sm" c="dimmed">Trung bình từ {tutorStats.reviews} đánh giá</Text>
          </Paper>

          <Paper p="xl" radius="xl" withBorder className="glass bg-white">
            <Group justify="space-between" mb="md">
              <LuUsers size={24} className="text-blue-500" />
            </Group>
            <Text size="32px" fw={900}>{tutorStats.studentsHelped}</Text>
            <Text size="sm" c="dimmed">Học viên đã hỗ trợ</Text>
          </Paper>

          <Paper p="xl" radius="xl" withBorder className="glass bg-white">
            <Group justify="space-between" mb="md">
              <LuClock size={24} className="text-teal-500" />
              <Badge color="teal" variant="light">Tuần này</Badge>
            </Group>
            <Text size="32px" fw={900}>{tutorStats.upcomingSessions}</Text>
            <Text size="sm" c="dimmed">Buổi Mentoring sắp tới</Text>
          </Paper>

          <Paper p="xl" radius="xl" withBorder className="bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30">
            <Text size="sm" fw={600} mb="md" className="opacity-80">Doanh thu (Tháng này)</Text>
            <Text size="32px" fw={900}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tutorStats.earnings)}
            </Text>
            <Text size="xs" mt="sm" className="opacity-80">Đã bao gồm tiền Donate và Mentoring 1:1</Text>
          </Paper>
        </SimpleGrid>

        <Grid layout>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="lg">
              {/* Mentoring Bookings */}
              <Paper p="xl" radius="xl" withBorder className="glass bg-white">
                <Group justify="space-between" mb="lg">
                  <Title order={3}>Lịch Mentoring 1:1</Title>
                  <Button variant="light" color="orange" size="xs" radius="xl">Quản lý lịch rảnh</Button>
                </Group>
                <Table verticalSpacing="md">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Học viên</Table.Th>
                      <Table.Th>Chủ đề</Table.Th>
                      <Table.Th>Thời gian</Table.Th>
                      <Table.Th>Trạng thái</Table.Th>
                      <Table.Th />
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {bookingRequests.map(b => (
                      <Table.Tr key={b.id}>
                        <Table.Td>
                          <Group gap="sm">
                            <Avatar size="sm" color="blue" radius="xl">{b.student.charAt(0)}</Avatar>
                            <Text size="sm" fw={600}>{b.student}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td><Text size="sm">{b.topic}</Text></Table.Td>
                        <Table.Td><Text size="sm" c="dimmed">{b.date}</Text></Table.Td>
                        <Table.Td>
                          <Badge color={b.status === 'Confirmed' ? 'teal' : 'orange'} variant="light">
                            {b.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          {b.status === 'Confirmed' ? (
                            <Button size="xs" color="teal" leftSection={<LuPlay size={14} />} onClick={() => window.open('https://meet.google.com/new', '_blank')}>
                              Vào phòng Google Meet
                            </Button>
                          ) : (
                            <Button size="xs" variant="light" color="orange">Duyệt</Button>
                          )}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="lg">
              {/* Live Q&A */}
              <Paper p="xl" radius="xl" withBorder className="glass bg-white">
                <Group justify="space-between" mb="lg">
                  <Title order={3}>Hỏi đáp khẩn cấp</Title>
                  <Badge color="red" variant="filled" className="animate-pulse">Live</Badge>
                </Group>
                <Stack gap="md">
                  {recentQuestions.map(q => (
                    <Card key={q.id} radius="md" withBorder className="bg-slate-50 hover:border-orange-300 transition-colors">
                      <Group justify="space-between" mb="xs">
                        <Group gap="xs">
                          <Avatar size="sm" color="grape" radius="xl">{q.student.charAt(0)}</Avatar>
                          <Text size="xs" fw={700}>{q.student}</Text>
                        </Group>
                        <Text size="xs" c="dimmed">{q.time}</Text>
                      </Group>
                      <Text size="sm" fw={600} mb="md">{q.question}</Text>
                      <Button fullWidth variant="light" color="blue" size="xs" leftSection={<LuSend size={14} />}>
                        Trả lời ngay
                      </Button>
                    </Card>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
};


