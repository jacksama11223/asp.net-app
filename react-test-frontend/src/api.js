import axios from 'axios';

const BASE_URL = 'http://localhost:5181';

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
