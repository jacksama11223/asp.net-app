import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { Box, Text } from '@mantine/core';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Box p="xl" style={{ textAlign: 'center' }}><Text c="dimmed">Students Management (Coming Soon)</Text></Box>} />
          <Route path="/ai" element={<Box p="xl" style={{ textAlign: 'center' }}><Text c="dimmed">AI Prediction Engine (Coming Soon)</Text></Box>} />
          <Route path="/settings" element={<Box p="xl" style={{ textAlign: 'center' }}><Text c="dimmed">Global Settings (Coming Soon)</Text></Box>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
