import React from 'react';
import { 
  Box, 
  Container, 
  Text, 
  Title, 
  Button, 
  Group, 
  SimpleGrid, 
  Paper, 
  ThemeIcon, 
  Stack,
  ActionIcon,
  Badge
} from '@mantine/core';
import { LuZap, LuBookOpen, LuUsers, LuSparkles, LuPlay, LuLayoutDashboard, LuPenTool } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Feature = ({ icon: Icon, title, description }) => (
  <Paper p="xl" radius="lg" withBorder className="bg-dark-8/50 backdrop-blur-md border-dark-4 hover:border-brand-500 transition-all duration-300">
    <ThemeIcon size={50} radius="md" variant="light" color="brand" mb="md">
      <Icon size={26} />
    </ThemeIcon>
    <Text fw={700} size="lg" mb="xs">{title}</Text>
    <Text c="dimmed" size="sm" style={{ lineHeight: 1.6 }}>{description}</Text>
  </Paper>
);

export const LandingPage = () => {
  return (
    <Box className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden selection:bg-brand-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <Box component="nav" py="lg" className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5">
        <Container size="xl">
          <Group justify="space-between">
            <Group gap="xs">
              <ThemeIcon size="lg" radius="md" variant="filled" color="brand">
                <LuZap size={20} />
              </ThemeIcon>
              <Text size="xl" fw={900} tracking="tight">
                SmartLMS<Text span c="brand" inherit>.AI</Text>
              </Text>
            </Group>
            
            <Group gap="xl" visibleFrom="md">
              <Text component="a" href="#features" fw={500} className="hover:text-brand-400 transition-colors">Features</Text>
              <Text component="a" href="#about" fw={500} className="hover:text-brand-400 transition-colors">About</Text>
              <Text component="a" href="#stats" fw={500} className="hover:text-brand-400 transition-colors">Impact</Text>
            </Group>

            <Group gap="sm">
              <Button component={Link} to="/login" variant="subtle" color="gray" radius="md">Log in</Button>
              <Button component={Link} to="/register" color="brand" radius="md" className="shadow-lg shadow-brand-500/20">Get Started</Button>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container size="xl" py={120} className="relative z-10">
        <Stack align="center" gap="xl" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="dot" color="brand" size="lg" p="md" className="bg-brand-500/5 mb-8">
              Revolutionizing Learning with AI
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Title className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
              Master Your Future <br />
              <Text span variant="gradient" gradient={{ from: 'brand', to: 'cyan', deg: 45 }} inherit>
                Powered by Intelligence.
              </Text>
            </Title>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Text c="dimmed" size="xl" maw={700} className="leading-relaxed">
              Experience the next generation of education. Personalized learning paths, 
              AI-driven insights, and world-class curriculum designed for the modern professional.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Group gap="md">
              <Button 
                component={Link} 
                to="/register" 
                size="xl" 
                radius="md" 
                color="brand" 
                rightSection={<LuPlay size={20} />}
                className="px-8 shadow-xl shadow-brand-500/30"
              >
                Join 12,000+ Students
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                radius="md" 
                color="gray"
                className="px-8 border-black/10 hover:bg-black/5"
                component={Link}
                to="/courses"
              >
                Watch Demo
              </Button>
            </Group>
          </motion.div>
        </Stack>
      </Container>

      {/* Features Grid */}
      <Container size="xl" py={100} id="features">
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30}>
          <Feature 
            icon={LuPenTool} 
            title="Adaptive Learning" 
            description="Our AI engine analyzes your learning patterns to create a truly personalized path that evolves with you."
          />
          <Feature 
            icon={LuLayoutDashboard} 
            title="Global Community" 
            description="Connect with experts and peers from around the world. Learn, collaborate, and grow together."
          />
          <Feature 
            icon={LuSparkles} 
            title="Verified Rewards" 
            description="Earn industry-recognized certificates and NFT-backed badges that showcase your real-world skills."
          />
        </SimpleGrid>
      </Container>

      {/* Stats Section */}
      <Box className="bg-white/40 py-24 border-y border-black/5" id="stats">
        <Container size="xl">
          <SimpleGrid cols={{ base: 2, md: 4 }} className="text-center">
            <Stack gap={0}>
              <Text size="50px" fw={900} variant="gradient" gradient={{ from: 'brand', to: 'indigo' }}>94%</Text>
              <Text c="dimmed" fw={600} tt="uppercase" size="xs">Completion Rate</Text>
            </Stack>
            <Stack gap={0}>
              <Text size="50px" fw={900} variant="gradient" gradient={{ from: 'brand', to: 'indigo' }}>150+</Text>
              <Text c="dimmed" fw={600} tt="uppercase" size="xs">Expert Courses</Text>
            </Stack>
            <Stack gap={0}>
              <Text size="50px" fw={900} variant="gradient" gradient={{ from: 'brand', to: 'indigo' }}>24/7</Text>
              <Text c="dimmed" fw={600} tt="uppercase" size="xs">AI Assistance</Text>
            </Stack>
            <Stack gap={0}>
              <Text size="50px" fw={900} variant="gradient" gradient={{ from: 'brand', to: 'indigo' }}>$0</Text>
              <Text c="dimmed" fw={600} tt="uppercase" size="xs">Hidden Fees</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer */}
      <Box py="xl" className="border-t border-white/5 mt-auto">
        <Container size="xl">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">© 2026 SmartLMS.AI. All rights reserved.</Text>
            <Group gap="md">
              <ActionIcon variant="subtle" color="gray" size="lg"><LuZap size={20} /></ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="lg"><LuUsers size={20} /></ActionIcon>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
};
