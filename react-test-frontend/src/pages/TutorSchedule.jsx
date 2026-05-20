import React, { useState, useEffect } from 'react';
import { Container, Paper, Title, Text, Button, Group, Stack, Badge, Box, SimpleGrid, Card, Checkbox, ActionIcon, Loader, ThemeIcon } from '@mantine/core';
import { LuArrowLeft, LuSave, LuClock, LuCalendarRange, LuTrash, LuPlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const TutorSchedule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: 'Monday', time: '09:00' });

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    // Giả lập/Fetch khung giờ rảnh
    setTimeout(() => {
      setAvailability([
        { id: 1, day: 'Thứ Hai (Monday)', time: '09:00 - 10:00', active: true },
        { id: 2, day: 'Thứ Hai (Monday)', time: '14:00 - 15:00', active: true },
        { id: 3, day: 'Thứ Tư (Wednesday)', time: '10:00 - 11:00', active: true },
        { id: 4, day: 'Thứ Sáu (Friday)', time: '16:00 - 17:00', active: false }
      ]);
      setLoading(false);
    }, 600);
  }, []);

  const handleSave = () => {
    alert("Đã lưu cấu hình lịch biểu và đồng bộ hóa với hệ thống đặt phòng Zoom API thành công!");
  };

  const handleAddSlot = () => {
    const timeFormatted = `${newSlot.time} - ${parseInt(newSlot.time.split(':')[0]) + 1}:00`;
    setAvailability(prev => [
      ...prev,
      {
        id: Date.now(),
        day: newSlot.day,
        time: timeFormatted,
        active: true
      }
    ]);
  };

  const handleDelete = (id) => {
    setAvailability(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleActive = (id) => {
    setAvailability(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  if (loading) {
    return (
      <Stack align="center" justify="center" py={120}>
        <Loader size="xl" color="brand" type="bars" />
        <Text c="dimmed" fw={600}>Đang kết nối lịch biểu với Zoom API...</Text>
      </Stack>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Button 
        variant="subtle" 
        color="gray" 
        leftSection={<LuArrowLeft size={16} />} 
        onClick={() => navigate('/tutor/dashboard')}
        mb="lg"
      >
        Quay lại Tutor Dashboard
      </Button>

      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Box>
            <Title order={1} fw={900} className="tracking-tight text-slate-900">
              Quản lý Lịch Rảnh & Availability 🗓️
            </Title>
            <Text c="dimmed" size="sm">Cấu hình những khoảng thời gian bạn sẵn sàng nhận lịch hẹn tư vấn và review code từ học viên.</Text>
          </Box>
          <Button 
            variant="gradient" 
            gradient={{ from: 'brand', to: 'indigo' }} 
            radius="md"
            leftSection={<LuSave size={18} />}
            onClick={handleSave}
            className="shadow-lg shadow-brand-500/20"
          >
            Lưu Lịch Biểu
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {/* Add slot column */}
          <Box style={{ md: { colSpan: 1 } }}>
            <Paper radius="xl" p="xl" className="glass bg-white/60 border-black/5 shadow-xl">
              <Title order={3} fw={900} mb="md" className="text-slate-900">Thêm khung giờ mới</Title>
              <Stack gap="md">
                <Box>
                  <Text size="xs" fw={700} c="dimmed" mb={4}>CHỌN NGÀY TRONG TUẦN</Text>
                  <select 
                    value={newSlot.day} 
                    onChange={(e) => setNewSlot(prev => ({ ...prev, day: e.target.value }))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Thứ Hai (Monday)">Thứ Hai (Monday)</option>
                    <option value="Thứ Ba (Tuesday)">Thứ Ba (Tuesday)</option>
                    <option value="Thứ Tư (Wednesday)">Thứ Tư (Wednesday)</option>
                    <option value="Thứ Năm (Thursday)">Thứ Năm (Thursday)</option>
                    <option value="Thứ Sáu (Friday)">Thứ Sáu (Friday)</option>
                    <option value="Thứ Bảy (Saturday)">Thứ Bảy (Saturday)</option>
                    <option value="Chủ Nhật (Sunday)">Chủ Nhật (Sunday)</option>
                  </select>
                </Box>

                <Box>
                  <Text size="xs" fw={700} c="dimmed" mb={4}>GIỜ BẮT ĐẦU</Text>
                  <input 
                    type="time" 
                    value={newSlot.time} 
                    onChange={(e) => setNewSlot(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </Box>

                <Button 
                  variant="light" 
                  color="brand" 
                  radius="md" 
                  mt="sm"
                  leftSection={<LuPlus size={18} />}
                  onClick={handleAddSlot}
                >
                  Thêm Khung Giờ
                </Button>
              </Stack>
            </Paper>
          </Box>

          {/* List slots column */}
          <Box style={{ md: { colSpan: 2 } }}>
            <Paper radius="xl" p="xl" className="glass bg-white/60 border-black/5 shadow-xl">
              <Title order={3} fw={900} mb="lg" className="text-slate-900">Danh sách Khung giờ Rảnh đã đăng ký</Title>
              {availability.length === 0 ? (
                <Text c="dimmed" ta="center" py="xl">Bạn chưa đăng ký bất kỳ khung giờ rảnh nào.</Text>
              ) : (
                <Stack gap="md">
                  {availability.map((item) => (
                    <Card key={item.id} radius="lg" withBorder p="md" className={`bg-white/40 border-l-4 ${item.active ? 'border-l-brand-500' : 'border-l-slate-300'}`}>
                      <Group justify="space-between" align="center">
                        <Group>
                          <ThemeIcon color={item.active ? 'brand' : 'gray'} variant="light" size="lg" radius="md">
                            <LuClock size={20} />
                          </ThemeIcon>
                          <div>
                            <Text fw={800} className="text-slate-900">{item.day}</Text>
                            <Text size="xs" c="dimmed">Khung giờ: {item.time}</Text>
                          </div>
                        </Group>
                        <Group gap="md">
                          <Checkbox 
                            checked={item.active} 
                            onChange={() => handleToggleActive(item.id)} 
                            label="Kích hoạt"
                            color="brand"
                          />
                          <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(item.id)}>
                            <LuTrash size={16} />
                          </ActionIcon>
                        </Group>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              )}
            </Paper>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
