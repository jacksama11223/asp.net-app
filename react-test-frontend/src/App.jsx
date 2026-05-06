import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CheckoutQR } from './pages/CheckoutQR';
import { BookingPage } from './pages/BookingPage';
import { CourseDetails } from './pages/CourseDetails';
import { MyLearning } from './pages/MyLearning';
import CodeWorkspace from './pages/CodeWorkspace';
import { Box, Text } from '@mantine/core';
import { Toaster } from 'sonner';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('slms_token');
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/checkout/:id" element={<ProtectedRoute><CheckoutQR /></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/my-learning" element={<ProtectedRoute><MyLearning /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/coding/:id" element={<CodeWorkspace />} />
        <Route path="/students" element={<ProtectedRoute><Box p="xl" style={{ textAlign: 'center' }}><Text c="dimmed">Students Management (Coming Soon)</Text></Box></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><Box p="xl" style={{ textAlign: 'center' }}><Text c="dimmed">AI Prediction Engine (Coming Soon)</Text></Box></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Box p="xl" style={{ textAlign: 'center' }}><Text c="dimmed">Global Settings (Coming Soon)</Text></Box></ProtectedRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
