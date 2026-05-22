import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import { StudyWorkspace } from './pages/StudyWorkspace';
import { Community } from './pages/Community';
import { CommunityNewPost } from './pages/CommunityNewPost';
import { CommunityFriends } from './pages/CommunityFriends';
import { CommunityQuizBuilder } from './pages/CommunityQuizBuilder';
import { TutorDashboard } from './pages/TutorDashboard';
import { PersonalWiki } from './pages/PersonalWiki';
import MistakeNotebook from './pages/MistakeNotebook';
import CodeWorkspace from './pages/CodeWorkspace';
import { CourseManager } from './pages/CourseManager';
import { MessageCenter } from './pages/MessageCenter';
import { ForumHome } from './pages/ForumHome';
import { Leaderboard } from './pages/Leaderboard';
import { PublicProfile } from './pages/PublicProfile';
import { CreatorAnalytics } from './pages/CreatorAnalytics';
import { TutorProfile } from './pages/TutorProfile';
import { AICareerReport } from './pages/AICareerReport';
import { CertificateView } from './pages/CertificateView';
import { TutorSchedule } from './pages/TutorSchedule';
import { TutorProfileEdit } from './pages/TutorProfileEdit';
import { Box, Text } from '@mantine/core';
import { Toaster } from 'sonner';
import { useAuthStore } from './store/useAuthStore';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <HelmetProvider>
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
          <Route path="/community" element={<ProtectedRoute><ForumHome /></ProtectedRoute>} />
          <Route path="/community/post/new" element={<ProtectedRoute><CommunityNewPost /></ProtectedRoute>} />
          <Route path="/community/friends" element={<ProtectedRoute><CommunityFriends /></ProtectedRoute>} />
          <Route path="/community/quiz-builder" element={<ProtectedRoute><CommunityQuizBuilder /></ProtectedRoute>} />
          <Route path="/wiki" element={<ProtectedRoute><PersonalWiki /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/study/:courseId" element={<ProtectedRoute><StudyWorkspace /></ProtectedRoute>} />
          <Route path="/coding/:id" element={<CodeWorkspace />} />
          <Route path="/students" element={<ProtectedRoute><Box p="xl" style={{ textAlign: 'center' }}><Text c="dimmed">Students Management (Coming Soon)</Text></Box></ProtectedRoute>} />
          <Route path="/ai" element={<ProtectedRoute><Box p="xl" style={{ textAlign: 'center' }}><Text c="dimmed">AI Prediction Engine (Coming Soon)</Text></Box></ProtectedRoute>} />
          <Route path="/mistakes" element={<ProtectedRoute><MistakeNotebook /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/profile/:userId" element={<ProtectedRoute><PublicProfile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Box p="xl" style={{ textAlign: 'center' }}><Text c="dimmed">Global Settings (Coming Soon)</Text></Box></ProtectedRoute>} />
          
          {/* Creator / Instructor Routes */}
          <Route path="/creator/courses" element={<ProtectedRoute><CourseManager /></ProtectedRoute>} />
          <Route path="/creator/messages" element={<ProtectedRoute><MessageCenter /></ProtectedRoute>} />
          <Route path="/creator/analytics" element={<ProtectedRoute><CreatorAnalytics /></ProtectedRoute>} />
          {/* Tutor & Personal AI Career Routes */}
          <Route path="/tutor-profile/:id" element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
          <Route path="/ai-career-analysis" element={<ProtectedRoute><AICareerReport /></ProtectedRoute>} />
          <Route path="/certificate/:courseId" element={<ProtectedRoute><CertificateView /></ProtectedRoute>} />
          <Route path="/tutor/availability" element={<ProtectedRoute><TutorSchedule /></ProtectedRoute>} />
          <Route path="/tutor/profile/edit" element={<ProtectedRoute><TutorProfileEdit /></ProtectedRoute>} />
          <Route path="/tutor/dashboard" element={<ProtectedRoute><TutorDashboard /></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
