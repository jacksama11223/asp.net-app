import React, { useState } from 'react';
import { 
  Paper, 
  TextInput, 
  PasswordInput, 
  Button, 
  Title, 
  Text, 
  Anchor, 
  Container, 
  Box,
  Stack,
  ThemeIcon,
  Alert
} from '@mantine/core';
import { LuZap, LuMail, LuLock, LuUser, LuArrowLeft, LuCircleAlert, LuCircleCheck } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5181/api/AuthApi/register', {
        username: formData.username,
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password
      });
      setSuccess(true);
      toast.success('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden p-6">
      <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />
      
      <Container size={420} p="xl" className="relative z-10">
        <Stack align="center" mb={30}>
          <ThemeIcon size={64} radius="xl" variant="gradient" gradient={{ from: 'brand', to: 'cyan' }} className="shadow-2xl">
            <LuZap size={32} />
          </ThemeIcon>
          <div className="text-center">
            <Title fw={900} className="text-white tracking-tight">Create Account</Title>
            <Text c="dimmed" size="sm" mt={5}>Join our AI-powered learning community today</Text>
          </div>
        </Stack>

        <Paper radius="xl" p={35} className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          {error && (
            <Alert icon={<LuCircleAlert size={16} />} color="red" radius="md" mb="xl">
              {error}
            </Alert>
          )}
          {success && (
            <Alert icon={<LuCircleCheck size={16} />} color="teal" radius="md" mb="xl">
              Registration successful! Redirecting to login...
            </Alert>
          )}

          <form onSubmit={handleRegister}>
            <Stack gap="md">
              <TextInput 
                label="Full Name" 
                placeholder="John Doe" 
                required 
                size="md"
                radius="lg"
                leftSection={<LuUser size={16} />}
                styles={{ input: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } }}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <TextInput 
                label="Username" 
                placeholder="johndoe" 
                required 
                size="md"
                radius="lg"
                leftSection={<LuUser size={16} />}
                styles={{ input: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } }}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
              <TextInput 
                label="Email" 
                placeholder="email@example.com" 
                required 
                size="md"
                radius="lg"
                leftSection={<LuMail size={16} />}
                styles={{ input: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } }}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <PasswordInput 
                label="Password" 
                placeholder="Enter password" 
                required 
                size="md"
                radius="lg"
                leftSection={<LuLock size={16} />}
                styles={{ input: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } }}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <PasswordInput 
                label="Confirm Password" 
                placeholder="Repeat password" 
                required 
                size="md"
                radius="lg"
                leftSection={<LuLock size={16} />}
                styles={{ input: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } }}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />

              <Button type="submit" fullWidth size="lg" radius="lg" color="brand" loading={loading} className="mt-4">
                Register Now
              </Button>
            </Stack>
          </form>

          <Text c="dimmed" size="sm" mt="xl" ta="center">
            Already have an account?{' '}
            <Anchor component={Link} to="/login" size="sm" fw={700} color="brand">
              Sign In
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
