import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Title, Text, Button, Group, Stack, Badge, 
  Box, TextInput, Textarea, NumberInput, MultiSelect, Loader
} from '@mantine/core';
import { LuArrowLeft, LuSave, LuUser, LuSparkles } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const TutorProfileEdit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    bio: '',
    hourlyRate: 35,
    expertise: []
  });

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    // Giả lập/Fetch thông tin hồ sơ chỉnh sửa
    setTimeout(() => {
      setProfile({
        bio: 'Giảng viên Khoa học Máy tính với 8 năm kinh nghiệm thực chiến. Chuyên sâu về lập trình C#, ASP.NET Core, kiến trúc hệ thống Enterprise và Trí tuệ nhân tạo.',
        hourlyRate: 35,
        expertise: ['C# Language', 'ASP.NET Core MVC/API', 'Docker & Compose']
      });
      setLoading(false);
    }, 600);
  }, []);

  const handleSave = () => {
    alert("Đã lưu thông tin hồ sơ của bạn lên hệ thống SmartLMS thành công!");
    navigate('/tutor/dashboard');
  };

  if (loading) {
    return (
      <Stack align="center" justify="center" py={120}>
        <Loader size="xl" color="brand" type="bars" />
        <Text c="dimmed" fw={600}>Đang kết nối hồ sơ cá nhân...</Text>
      </Stack>
    );
  }

  return (
    <Container size="md" py="xl">
      <Button 
        variant="subtle" 
        color="gray" 
        leftSection={<LuArrowLeft size={16} />} 
        onClick={() => navigate('/tutor/dashboard')}
        mb="lg"
      >
        Quay lại Tutor Dashboard
      </Button>

      <Paper radius="xl" p="xl" className="glass bg-white/60 border-black/5 shadow-xl">
        <Stack gap="xl">
          <Box>
            <Title order={1} fw={900} className="tracking-tight text-slate-900">
              Chỉnh Sửa Hồ Sơ Gia Sư 👤
            </Title>
            <Text c="dimmed" size="sm">Cập nhật thông tin giới thiệu, mức phí tư vấn và lĩnh vực chuyên môn của bạn để thu hút học viên.</Text>
          </Box>

          <Stack gap="md">
            <Textarea
              label="Giới thiệu bản thân (Bio)"
              placeholder="Nhập tiểu sử, kinh nghiệm làm việc và cách bạn có thể giúp đỡ học viên..."
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              minRows={5}
              radius="md"
            />

            <NumberInput
              label="Mức phí tư vấn ($ / giờ)"
              placeholder="Nhập mức phí USD cho mỗi giờ dạy"
              value={profile.hourlyRate}
              onChange={(val) => setProfile(prev => ({ ...prev, hourlyRate: val }))}
              radius="md"
              min={5}
              max={200}
            />

            <MultiSelect
              label="Lĩnh vực Chuyên sâu"
              placeholder="Lựa chọn các công nghệ bạn thành thạo"
              data={['C# Language', 'ASP.NET Core MVC/API', 'Docker & Compose', 'SQL Server Integration', 'React & Mantine', 'Node.js', 'Machine Learning ML.NET']}
              value={profile.expertise}
              onChange={(val) => setProfile(prev => ({ ...prev, expertise: val }))}
              radius="md"
              searchable
              clearable
            />
          </Stack>

          <Group justify="flex-end" gap="md" mt="lg">
            <Button variant="default" radius="md" onClick={() => navigate('/tutor/dashboard')}>Hủy</Button>
            <Button 
              variant="gradient" 
              gradient={{ from: 'brand', to: 'indigo' }} 
              radius="md"
              leftSection={<LuSave size={18} />}
              onClick={handleSave}
              className="shadow-lg shadow-brand-500/20"
            >
              Lưu Thay Đổi
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};
