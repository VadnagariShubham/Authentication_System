import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Register user
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),

  // Login user
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  // Get user profile
  getProfile: () => api.get('/auth/profile'),

  // Update user profile
  updateProfile: (name, email) =>
    api.put('/auth/profile', { name, email }),

  // Change password
  changePassword: (currentPassword, newPassword) =>
    api.put('/auth/change-password', { currentPassword, newPassword }),

  // Logout user
  logout: () => api.post('/auth/logout'),

  // Delete account
  deleteAccount: () => api.delete('/auth/profile'),
};


export default api; 