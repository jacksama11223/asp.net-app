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
import { LuZap, LuSend, LuSettings, LuUsers, LuArrowLeft } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';

import { BASE_URL } from '../api';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setError('Vui lòng xác nhận bạn không phải là robot (reCAPTCHA).');
      return;
    }
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/AuthApi/register`, {
        username: formData.username,
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
        captchaToken: captchaToken
      });
      setSuccess(true);
      toast.success('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      // Improved error detection for RFC 7807 and custom messages
      const errorMsg = err.response?.data?.message || err.response?.data?.detail || 'Đăng ký thất bại. Vui lòng thử lại sau.';
      setError(errorMsg);
      console.error('Registration Error:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden p-6">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full" />

      <Container size={420} p="xl" className="relative z-10 w-full">
        <Stack align="center" mb={30}>
          <ThemeIcon size={64} radius="xl" variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} className="shadow-2xl shadow-brand-500/20 scale-110">
            <LuZap size={32} />
          </ThemeIcon>
          <div className="text-center">
            <Title fw={900} size={32} className="text-slate-900 tracking-tight">Create Account</Title>
            <Text c="dimmed" size="sm" mt={5}>Join our friendly learning community today</Text>
          </div>
        </Stack>

        <Paper radius={24} p={40} className="bg-white/90 backdrop-blur-2xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
          {error && (
            <Alert icon={<LuZap size={16} />} color="red" radius="md" mb="xl" variant="light">
              {error}
            </Alert>
          )}
          {success && (
            <Alert icon={<LuZap size={16} />} color="teal" radius="md" mb="xl" variant="light">
              Đăng ký thành công! Đang chuyển hướng tới đăng nhập...
            </Alert>
          )}

          <form onSubmit={handleRegister}>
            <Stack gap="md">
              <TextInput 
                label="Full Name" 
                placeholder="John Doe" 
                required 
                size="md"
                radius="md"
                leftSection={<LuUsers size={16} className="text-brand-500" />}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="transition-all focus:scale-[1.01]"
              />
              <TextInput 
                label="Username" 
                placeholder="johndoe" 
                required 
                size="md"
                radius="md"
                leftSection={<LuUsers size={16} className="text-brand-500" />}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="transition-all focus:scale-[1.01]"
              />
              <TextInput 
                label="Email" 
                placeholder="email@example.com" 
                required 
                size="md"
                radius="md"
                leftSection={<LuSend size={16} className="text-brand-500" />}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="transition-all focus:scale-[1.01]"
              />
              <PasswordInput 
                label="Password" 
                placeholder="Enter password" 
                required 
                size="md"
                radius="md"
                leftSection={<LuSettings size={16} className="text-brand-500" />}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="transition-all focus:scale-[1.01]"
              />
              <PasswordInput 
                label="Confirm Password" 
                placeholder="Repeat password" 
                required 
                size="md"
                radius="md"
                leftSection={<LuSettings size={16} className="text-brand-500" />}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="transition-all focus:scale-[1.01]"
              />

              <Box mt="sm" className="flex justify-center">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={handleCaptchaChange}
                />
              </Box>

              <Button type="submit" fullWidth size="lg" radius="md" color="brand" loading={loading} className="mt-4 h-14 text-md shadow-xl shadow-brand-500/30 active:scale-95 transition-all">
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
            className="hover:bg-brand-50 hover:text-brand-600 rounded-full"
          >
            Back to landing
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
