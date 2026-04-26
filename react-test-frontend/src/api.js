import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // If we are on the production server IP, use it. Otherwise default to localhost.
    const hostname = window.location.hostname;
    return `http://${hostname}:5181`;
  }
  return 'http://localhost:5181';
};

export const BASE_URL = getBaseUrl();

export const createApiClient = (apiKey) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    }
  });
};

export const getCourses = async (apiClient) => {
  const response = await apiClient.get('/api/public/courses');
  return response.data;
};

export const createCourse = async (apiClient, courseData) => {
  const response = await apiClient.post('/api/public/courses', courseData);
  return response.data;
};
