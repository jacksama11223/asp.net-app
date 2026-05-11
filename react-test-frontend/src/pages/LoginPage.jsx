import React, { useState } from 'react';
import { 
  Paper, 
  TextInput, 
  PasswordInput, 
  Checkbox, 
  Button, 
  Title, 
  Text, 
  Anchor, 
  Group, 
  Container, 
  Box,
  Stack,
  ThemeIcon,
  Alert
} from '@mantine/core';
import { LuZap, LuSend, LuSettings, LuArrowLeft } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

import { BASE_URL } from '../api';
export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/token`, {
        username,
        password
      });
      localStorage.setItem('slms_token', response.data.token);
      localStorage.setItem('slms_user', JSON.stringify(response.data));
      toast.success('Login successful! Welcome back.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.detail || 'Invalid credentials or connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden p-6">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/5 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full" />

      <Container size={420} p="xl" className="relative z-10 w-full">
        <Stack align="center" mb={40}>
          <ThemeIcon size={64} radius="xl" variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} className="shadow-2xl shadow-brand-500/20 scale-110">
            <LuZap size={32} />
          </ThemeIcon>
          <div className="text-center">
            <Title fw={900} size={32} className="text-slate-900 tracking-tight">Welcome Back</Title>
            <Text c="dimmed" size="sm" mt={5}>Enter your credentials to access your workspace</Text>
          </div>
        </Stack>

        <Paper radius={24} p={40} className="bg-white/90 backdrop-blur-2xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
          {error && (
            <Alert icon={<LuZap size={16} />} color="red" radius="md" mb="xl" variant="light">
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <Stack gap="lg">
              <TextInput 
                label="Username or Email" 
                placeholder="admin@smartlms.ai" 
                required 
                size="md"
                radius="md"
                leftSection={<LuSend size={16} className="text-brand-500" />}
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                className="transition-all focus:scale-[1.01]"
              />
              <PasswordInput 
                label="Password" 
                placeholder="Your secret password" 
                required 
                size="md"
                radius="md"
                leftSection={<LuSettings size={16} className="text-brand-500" />}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="transition-all focus:scale-[1.01]"
              />

              <Group justify="space-between" mt="xs">
                <Checkbox label="Remember me" size="xs" color="brand" />
                <Anchor component="button" size="xs" color="brand" fw={700}>Forgot password?</Anchor>
              </Group>

              <Button type="submit" fullWidth size="lg" radius="md" color="brand" loading={loading} className="mt-4 h-14 text-md shadow-xl shadow-brand-500/30 active:scale-95 transition-all">
                Log In
              </Button>
            </Stack>
          </form>

          <Text c="dimmed" size="sm" mt="xl" ta="center">
            New here?{' '}
            <Anchor component={Link} to="/register" size="sm" fw={700} color="brand">
              Create an account
            </Anchor>
          </Text>
        </Paper>

        <Box mt="xl" ta="center">
          <Button 
            component={Link} 
            to="/" 
            variant="subtle" 
            color="gray" 
            leftSection={<LuArrowLeft size={16} />}
            size="xs"
            className="hover:bg-brand-50 hover:text-brand-600 rounded-full"
          >
            Back to landing
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
