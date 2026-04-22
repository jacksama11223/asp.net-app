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
import { LuZap, LuMail, LuLock, LuArrowLeft, LuCircleAlert } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

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
      const response = await axios.post('http://localhost:5181/api/AuthApi/token', {
        username,
        password
      });
      localStorage.setItem('slms_token', response.data.token);
      localStorage.setItem('slms_user', JSON.stringify(response.data));
      toast.success('Login successful! Welcome back.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials or connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden p-6">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/10 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />

      <Container size={420} p="xl" className="relative z-10">
        <Stack align="center" mb={40}>
          <ThemeIcon size={64} radius="xl" variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} className="shadow-2xl shadow-brand-500/50">
            <LuZap size={32} />
          </ThemeIcon>
          <div className="text-center">
            <Title fw={900} className="text-white tracking-tight">Welcome Back</Title>
            <Text c="dimmed" size="sm" mt={5}>Enter your credentials to access your workspace</Text>
          </div>
        </Stack>

        <Paper radius="xl" p={35} className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          {error && (
            <Alert icon={<LuCircleAlert size={16} />} color="red" radius="md" mb="xl">
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
                radius="lg"
                leftSection={<LuMail size={16} />}
                styles={{ input: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } }}
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
              <PasswordInput 
                label="Password" 
                placeholder="Your secret password" 
                required 
                size="md"
                radius="lg"
                leftSection={<LuLock size={16} />}
                styles={{ input: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } }}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />

              <Group justify="space-between" mt="xs">
                <Checkbox label="Remember me" size="xs" color="brand" />
                <Anchor component="button" size="xs" color="brand" fw={700}>Forgot password?</Anchor>
              </Group>

              <Button type="submit" fullWidth size="lg" radius="lg" color="brand" loading={loading} className="mt-4 shadow-lg shadow-brand-500/20">
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
          >
            Back to landing
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
