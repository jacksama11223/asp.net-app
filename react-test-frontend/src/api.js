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
