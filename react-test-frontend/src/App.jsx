import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          {/* Placeholder routes for others */}
          <Route path="/students" element={<div className="p-8 text-center text-text-secondary">Students Management (Coming Soon)</div>} />
          <Route path="/ai" element={<div className="p-8 text-center text-text-secondary">AI Prediction Engine (Coming Soon)</div>} />
          <Route path="/settings" element={<div className="p-8 text-center text-text-secondary">Global Settings (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
