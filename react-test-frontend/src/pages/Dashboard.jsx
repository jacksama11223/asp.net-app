import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Paper, 
  Grid, 
  Title, 
  Text, 
  Group, 
  SimpleGrid, 
  Progress, 
  Badge, 
  ThemeIcon, 
  Box,
  Stack,
  Button
} from '@mantine/core';
import { 
  LuTrendingUp, 
  LuCircleCheck, 
  LuClock,
  LuZap,
  LuBookOpen,
  LuUsers,
  LuDownload,
  LuTriangleAlert
} from 'react-icons/lu';
import { motion } from 'framer-motion';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { COURSE_TRENDS, AI_RISK_DATA, RECENT_ACTIVITY } from '../utils/mockData';

const CardWrapper = ({ children, p = "xl" }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Paper 
      p={p} 
      radius="xl" 
      className="glass bg-white/5 border-white/10 shadow-2xl hover:border-brand-500/50 transition-colors"
    >
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
      <Badge color="green" variant="light" size="sm">
        {change}
      </Badge>
    </Group>
    <Box>
      <Text size="xs" fw={700} tt="uppercase" tracking="widest" c="dimmed">
        {label}
      </Text>
      <Title order={2} fw={900} className="tracking-tight">{value}</Title>
    </Box>
  </CardWrapper>
);

export const Dashboard = () => {
  const [parent] = useAutoAnimate();
  const user = JSON.parse(localStorage.getItem('slms_user') || '{}');

  return (
    <Stack gap="xl">
      <Box mb="md">
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={1} fw={900} className="tracking-tighter text-4xl text-slate-900">
              Morning, <Text span variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} inherit>{user.fullName || 'Student'}</Text> ✨
            </Title>
            <Text c="dimmed" size="sm" mt={4}>Your AI success probability is currently <Text span c="green.7" fw={700}>92.4%</Text>. Keep it up!</Text>
          </Box>
          <Button 
            variant="gradient" 
            gradient={{ from: 'brand', to: 'indigo' }} 
            radius="md" 
            leftSection={<LuZap size={18} />}
            className="shadow-xl shadow-brand-500/30"
          >
            Start Learning
          </Button>
        </Group>
      </Box>

      <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} gap="lg">
        <StatCard label="Courses Active" value="12" change="+2" color="brand" icon={LuBookOpen} />
        <StatCard label="Hours Studied" value="124h" change="+14%" color="blue" icon={LuClock} />
        <StatCard label="Completed Tasks" value="48" change="+5" color="teal" icon={LuCircleCheck} />
        <StatCard label="Class Ranking" value="#4" change="UP" color="orange" icon={LuTrendingUp} />
      </SimpleGrid>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <CardWrapper>
            <Group justify="space-between" mb="xl">
              <Box>
                <Group gap="xs" mb={4}>
                  <LuTrendingUp size={20} color="var(--mantine-color-brand-600)" />
                  <Title order={3} className="tracking-tight text-slate-800">Learning Momentum</Title>
                </Group>
                <Text size="xs" c="dimmed">Your engagement data over the last 30 days</Text>
              </Box>
              <Button variant="subtle" size="xs" rightSection={<LuDownload size={14} />}>
                Export Analytics
              </Button>
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
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(255, 255, 255, 0.1)', 
                      borderRadius: '16px',
                      backdropBlur: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="enrollments" 
                    stroke="#6366f1" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
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

            <Box mt="xl" p="md" radius="md" className="bg-brand-50 border border-brand-200">
              <Group gap="sm" align="flex-start" wrap="nowrap">
                <LuTriangleAlert className="text-brand-600 shrink-0" size={18} />
                <Text size="xs" fw={500} c="brand.9">
                  AI detected a drop in your Quiz engagement. Recalibrating your path for next week.
                </Text>
              </Group>
            </Box>
          </CardWrapper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
