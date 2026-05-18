import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Title, Text, Button, Group, Stack, Badge, 
  Box, RingProgress, SimpleGrid, Card, ThemeIcon, Loader
} from '@mantine/core';
import { LuArrowLeft, LuBrain, LuCpu, LuShieldAlert, LuBriefcase, LuSparkles, LuTrendingUp } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api';

export const AICareerReport = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    // Giả lập/Fetch báo cáo phân tích hướng nghiệp từ AI Predictor
    setTimeout(() => {
      setReport({
        riskScore: 24, // 24% rủi ro (Low Risk)
        riskLevel: 'Thấp (Low Risk)',
        riskColor: 'teal',
        explanation: 'Dựa trên Sổ tay lỗi sai (Mistake Log) và tần suất nộp bài tập coding trong 30 ngày qua, AI đánh giá bạn đang có phong độ học tập rất ổn định. Khả năng hoàn thành khóa học đúng hạn là 96%.',
        suggestedRoles: [
          { role: 'C# Backend Engineer', match: 92, salary: '$1,200 - $2,500', demand: 'Cực kỳ cao' },
          { role: 'Fullstack Web Developer', match: 84, salary: '$1,000 - $2,000', demand: 'Cao' }
        ],
        weaknesses: [
          { skill: 'Asynchronous Programming (async/await)', gap: 35, recommendation: 'Hãy làm thêm 3 bài thực hành Roslyn Sandbox liên quan tới Task và Threading.' },
          { skill: 'Entity Framework Query Optimization', gap: 20, recommendation: 'Đọc kỹ tài liệu Wiki về cách tránh lỗi N+1 query.' }
        ]
      });
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <Stack align="center" justify="center" py={120}>
        <Loader size="xl" color="brand" type="bars" />
        <Text c="dimmed" fw={600}>AI đang phân tích Sổ tay lỗi sai và lịch sử làm bài để lập báo cáo hướng nghiệp...</Text>
      </Stack>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Button 
        variant="subtle" 
        color="gray" 
        leftSection={<LuArrowLeft size={16} />} 
        onClick={() => navigate(-1)}
        mb="lg"
      >
        Quay lại Dashboard
      </Button>

      <Stack gap="xl">
        {/* Banner */}
        <Paper radius="xl" p="xl" className="glass bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 flex align-center justify-center">
            <LuBrain size={250} />
          </div>
          <Stack gap="xs" style={{ zIndex: 1, position: 'relative' }}>
            <Badge color="white" c="brand" size="md" variant="white" className="w-fit">
              AI Powered Report
            </Badge>
            <Title order={1} fw={900} className="tracking-tight text-4xl">
              Báo cáo Hướng nghiệp & Phân tích Học tập 🧠
            </Title>
            <Text size="md" className="opacity-90 max-w-2xl">
              Phân tích học sâu kết hợp ML.NET Predictor giúp nhận diện lỗ hổng kiến thức và định hình con đường sự nghiệp lập trình phù hợp nhất với phong cách code của bạn.
            </Text>
          </Stack>
        </Paper>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {/* Risk Card */}
          <Paper radius="xl" p="xl" className="glass bg-white/60 border-black/5 shadow-xl flex flex-col justify-between">
            <Stack gap="md">
              <Group justify="space-between">
                <Title order={3} fw={900} className="text-slate-900">Mức độ rủi ro bỏ cuộc</Title>
                <ThemeIcon color={report.riskColor} size="lg" radius="md">
                  <LuShieldAlert size={20} />
                </ThemeIcon>
              </Group>

              <Group gap="xl" align="center" mt="md">
                <RingProgress
                  size={140}
                  roundCaps
                  thickness={14}
                  sections={[{ value: report.riskScore, color: report.riskColor }]}
                  label={
                    <Text ta="center" fw={900} size="xl" className="text-slate-800">
                      {report.riskScore}%
                    </Text>
                  }
                />
                <Box style={{ flex: 1 }}>
                  <Badge color={report.riskColor} size="lg" variant="light" mb="xs">
                    {report.riskLevel}
                  </Badge>
                  <Text size="sm" className="text-slate-700 leading-relaxed">
                    {report.explanation}
                  </Text>
                </Box>
              </Group>
            </Stack>
          </Paper>

          {/* Job matching */}
          <Paper radius="xl" p="xl" className="glass bg-white/60 border-black/5 shadow-xl">
            <Title order={3} fw={900} mb="lg" className="text-slate-900">Vị trí Công việc Phù hợp Nhất</Title>
            <Stack gap="md">
              {report.suggestedRoles.map((role, idx) => (
                <Card key={idx} radius="lg" withBorder p="md" className="bg-white/40">
                  <Group justify="space-between" align="center">
                    <Group>
                      <ThemeIcon color="brand" variant="light" size="lg" radius="md">
                        <LuBriefcase size={20} />
                      </ThemeIcon>
                      <div>
                        <Text fw={800} className="text-slate-900">{role.role}</Text>
                        <Text size="xs" c="dimmed">Mức lương: {role.salary} | Nhu cầu: {role.demand}</Text>
                      </div>
                    </Group>
                    <Badge color="brand" size="lg" variant="filled">
                      {role.match}% Match
                    </Badge>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Paper>
        </SimpleGrid>

        {/* Weaknesses and recommendations */}
        <Paper radius="xl" p="xl" className="glass bg-white/60 border-black/5 shadow-xl">
          <Title order={3} fw={900} mb="lg" className="text-slate-900">
            Điểm khuyết thiếu & Khuyến nghị khắc phục từ AI (Therapy Mode) 🛠️
          </Title>
          <Stack gap="md">
            {report.weaknesses.map((weak, idx) => (
              <Card key={idx} radius="lg" withBorder p="md" className="bg-white/40 border-l-4 border-l-red-500">
                <Group justify="space-between" align="center" mb="xs">
                  <Text fw={800} className="text-slate-900">{weak.skill}</Text>
                  <Badge color="red" variant="light">
                    Hổng kiến thức: {weak.gap}%
                  </Badge>
                </Group>
                <Text size="sm" className="text-slate-700 mb-xs">
                  <strong>Khuyến nghị từ AI:</strong> {weak.recommendation}
                </Text>
                <Button 
                  variant="subtle" 
                  color="brand" 
                  size="xs" 
                  rightSection={<LuTrendingUp size={14} />} 
                  onClick={() => navigate('/mistakes')}
                  className="w-fit p-0"
                >
                  Mở Sổ tay lỗi sai để thực hành ngay
                </Button>
              </Card>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
