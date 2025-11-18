import axios from 'axios';

const API_BASE_URL = 'https://portfolio-api-jie5.onrender.com/api';

// Create axios instance with better defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Reduced from 90s to 30s
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to handle retries
api.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If server error and haven't retried yet
    if (error.code === 'ECONNABORTED' || error.response?.status >= 500) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        console.log('Retrying request (server may be waking up)...');
        
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return api(originalRequest);
      }
    }

    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

// Portfolio data fetcher with fallback
export const getPortfolio = async () => {
  try {
    const response = await api.get('/portfolio');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    
    // Return fallback data structure
    return {
      projects: [],
      skills: [],
      experience: [],
      certificates: [],
      about: {
        name: "Portfolio",
        title: "Developer",
        description: "Currently loading data...",
        email: "",
        phone: "",
        location: ""
      }
    };
  }
};

// Individual endpoint functions with fallbacks
export const getCertificates = async () => {
  try {
    const response = await api.get('/certificates');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch certificates:', error);
    return [];
  }
};

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
};

export const getSkills = async () => {
  try {
    const response = await api.get('/skills');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return [];
  }
};

export const getExperience = async () => {
  try {
    const response = await api.get('/experience');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch experience:', error);
    return [];
  }
};

// Contact form submission
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    throw error;
  }
};

export default api;
