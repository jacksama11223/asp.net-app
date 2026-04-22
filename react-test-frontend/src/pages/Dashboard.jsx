import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
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
  Button,
  ActionIcon
} from '@mantine/core';
import { COURSE_TRENDS, AI_RISK_DATA, RECENT_ACTIVITY } from '../utils/mockData';
import { 
  LuTriangleAlert, 
  LuTrendingUp, 
  LuTrendingDown, 
  LuCircleCheck, 
  LuClock,
  LuEllipsisVertical,
  LuLayoutDashboard,
  LuHistory,
  LuCircleAlert,
  LuZap,
  LuBookOpen,
  LuUsers,
  LuDownload
} from 'react-icons/lu';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const StatCard = ({ label, value, change, color }) => (
  <Paper p="xl" radius="lg" withBorder>
    <Text size="xs" fw={900} tt="uppercase" tracking="widest" c="dimmed" mb="xs">
      {label}
    </Text>
    <Group justify="space-between" align="flex-end">
      <Title order={2} fw={900}>{value}</Title>
      <Badge color="green" variant="light" size="sm">
        {change}
      </Badge>
    </Group>
  </Paper>
);

export const Dashboard = () => {
  const [parent] = useAutoAnimate();

  return (
    <Stack gap="xl" p="md">
      <Box>
        <Title order={1} fw={900} tracking="tight">
          Welcome back, <Text span c="brand" inherit>Admin</Text> 👋
        </Title>
        <Text c="dimmed" size="sm">Here is what's happening with your students today.</Text>
      </Box>

      <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} gap="lg">
        <StatCard label="Total Students" value="12,450" change="+12%" color="brand" />
        <StatCard label="Avg. Progress" value="78%" change="+5%" color="blue" />
        <StatCard label="Active Courses" value="156" change="+8" color="cyan" />
        <StatCard label="AI Accuracy" value="94.2%" change="+1.5%" color="teal" />
      </SimpleGrid>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Paper p="xl" radius="lg" withBorder h="100%">
            <Group justify="space-between" mb="xl">
              <Box>
                <Group gap="xs" mb={4}>
                  <LuTrendingUp size={20} color="var(--mantine-color-brand-filled)" />
                  <Title order={3}>Enrollment Trends</Title>
                </Group>
                <Text size="xs" c="dimmed">Growth analysis over the last 6 months</Text>
              </Box>
              <Button variant="default" size="xs" rightSection={<LuDownload size={14} />}>
                Export Report
              </Button>
            </Group>

            <Box h={300}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={COURSE_TRENDS}>
                  <defs>
                    <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415520" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '12px',
                      color: '#fff' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="enrollments" 
                    stroke="#6366f1" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorEnroll)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Paper p="xl" radius="lg" withBorder h="100%">
            <Group gap="xs" mb="xl">
              <LuZap size={20} color="orange" />
              <Title order={3}>AI Risk Analysis</Title>
            </Group>

            <Stack gap="lg">
              {AI_RISK_DATA.map((item) => (
                <Box key={item.name}>
                  <Group justify="space-between" mb="xs">
                    <Text size="xs" fw={700} c="dimmed">{item.name}</Text>
                    <Text size="xs" fw={900}>{item.value}%</Text>
                  </Group>
                  <Progress value={item.value} color={item.color} size="lg" radius="xl" />
                </Box>
              ))}
            </Stack>

            <Paper mt="xl" p="md" radius="md" bg="orange.9" style={{ border: '1px solid var(--mantine-color-orange-8)' }}>
              <Group gap="sm" align="flex-start" wrap="nowrap">
                <LuTriangleAlert className="text-amber-500 shrink-0" size={18} />
                <Text size="xs" fw={500} c="white">
                  AI has detected 12 students with declining engagement patterns. Consider sending a nudge.
                </Text>
              </Group>
            </Paper>
          </Paper>
        </Grid.Col>
      </Grid>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper p="xl" radius="lg" withBorder>
            <Title order={3} mb="xl" flex="1" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <LuClock size={20} color="var(--mantine-color-brand-filled)" />
              Recent Activity
            </Title>
            <Stack gap="md" ref={parent}>
              {RECENT_ACTIVITY.map((activity) => (
                <Group key={activity.id} justify="space-between" wrap="nowrap" pb="sm" style={{ borderBottom: '1px dashed var(--mantine-color-dark-4)' }}>
                  <Group gap="md">
                    <ThemeIcon 
                      radius="md" 
                      variant="light" 
                      color={activity.type === 'achievement' ? 'teal' : activity.type === 'ai_alert' ? 'orange' : 'brand'}
                    >
                      {activity.type === 'achievement' ? <LuCircleCheck size={16} /> :
                       activity.type === 'ai_alert' ? <LuCircleAlert size={16} /> :
                       <LuTrendingUp size={16} />}
                    </ThemeIcon>
                    <Box>
                      <Text size="sm">
                        <Text span fw={700}>{activity.user}</Text> {activity.action}
                      </Text>
                      <Text size="xs" c="dimmed">{activity.time}</Text>
                    </Box>
                  </Group>
                </Group>
              ))}
            </Stack>
            <Button variant="subtle" fullWidth mt="md" size="xs">View All Logs</Button>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 5 }}>
          <SimpleGrid cols={2} spacing="lg">
            {[
              { label: 'Create Course', icon: LuBookOpen, desc: 'Add new content', color: 'brand' },
              { label: 'Invite Student', icon: LuUsers, desc: 'Bulk or individual', color: 'indigo' },
              { label: 'AI Prediction', icon: LuZap, desc: 'Run latest model', color: 'orange' },
              { label: 'Export Data', icon: LuTrendingUp, desc: 'CSV or JSON', color: 'teal' },
            ].map((action, i) => (
              <Paper 
                key={i} 
                component="button"
                p="lg" 
                radius="lg" 
                withBorder 
                style={(theme) => ({
                  cursor: 'pointer',
                  textAlign: 'left',
                  backgroundColor: theme.colors.dark[7],
                  '&:hover': {
                    borderColor: theme.colors.brand[5],
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s ease'
                })}
              >
                <ThemeIcon size="lg" radius="md" color={action.color} mb="md">
                  <action.icon size={20} />
                </ThemeIcon>
                <Text size="sm" fw={700}>{action.label}</Text>
                <Text size="10px" c="dimmed" mt={4}>{action.desc}</Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
