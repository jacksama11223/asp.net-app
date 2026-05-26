import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // If we are on the production server IP, use origin (via Nginx proxy on port 80).
    // Otherwise default to localhost:5181 for local development.
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return window.location.origin;
    }
    return `http://${hostname}:5181`;
  }
  return 'http://localhost:5181';
};

export const BASE_URL = getBaseUrl();

export const createApiClient = (apiKey) => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    }
  });

  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('slms_token');
        localStorage.removeItem('slms_user');
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const getCourses = async (apiClient) => {
  const response = await apiClient.get('/api/public/courses');
  return response.data;
};

export const createCourse = async (apiClient, courseData) => {
  const response = await apiClient.post('/api/public/courses', courseData);
  return response.data;
};

// Payment APIs
export const getPaymentConfig = async (apiClient) => {
  const response = await apiClient.get('/api/public/payment/config');
  return response.data;
};

export const checkoutCourse = async (apiClient, courseId) => {
  const response = await apiClient.post(`/api/public/payment/checkout/${courseId}`);
  return response.data;
};

export const checkPaymentStatus = async (apiClient, txnRef) => {
  const response = await apiClient.get(`/api/public/payment/status/${txnRef}`);
  return response.data;
};

export const triggerMockWebhook = async (apiClient, txnRef) => {
  const response = await apiClient.post(`/api/public/payment/mock-webhook/${txnRef}`);
  return response.data;
};
// Dashboard & Analytics
export const getDashboardStats = async (apiClient) => {
  const response = await apiClient.get('/api/dashboard/stats');
  return response.data;
};

export const getEngagementChart = async (apiClient) => {
  const response = await apiClient.get('/api/dashboard/engagement-chart');
  return response.data;
};

export const getRecentActivities = async (apiClient) => {
  const response = await apiClient.get('/api/dashboard/activities');
  return response.data;
};

// Booking APIs
export const getTutors = async (apiClient, date) => {
  const response = await apiClient.get(`/api/booking/tutors?date=${date}`);
  return response.data;
};

export const createBooking = async (apiClient, bookingData) => {
  const response = await apiClient.post('/api/booking', bookingData);
  return response.data;
};

export const getStudentBookings = async (apiClient) => {
  const response = await apiClient.get('/api/booking/student');
  return response.data;
};

// ─────────────────────────────────────────────────────────────────────────────
// Community Hub APIs (Port 3080 via Nginx proxy /community-api)
// ─────────────────────────────────────────────────────────────────────────────
const COMMUNITY_BASE = (() => {
  if (typeof window === 'undefined') return 'http://localhost:3080';
  const h = window.location.hostname;
  // Production: Nginx forward /community-api/ → 3080
  return h === 'localhost' || h === '127.0.0.1'
    ? `http://${h}:3080`
    : `${window.location.protocol}//${h}`; // handled by nginx /community-api
})();

const communityFetch = async (path) => {
  const res = await fetch(`${COMMUNITY_BASE}${path}`, {
    credentials: 'include', // gửi cookie SSO
  });
  if (!res.ok) throw new Error(`Community API error: ${res.status}`);
  return res.json();
};

export const getCommunityLeaderboard = () =>
  communityFetch('/api/LeaderboardApi');

export const getCommunityEvents = () =>
  communityFetch('/api/EventApi');

export const getCommunityGroups = () =>
  communityFetch('/api/GroupApi');

export const getCommunityStats = async () => {
  // Aggregate stats: events + groups count
  const [events, groups] = await Promise.all([
    communityFetch('/api/EventApi'),
    communityFetch('/api/GroupApi'),
  ]);
  return {
    totalEvents: Array.isArray(events) ? events.length : 0,
    totalGroups: Array.isArray(groups) ? groups.length : 0,
  };
};
