import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE ?? 'https://portfolio-api-jie5.onrender.com/api';

// Create axios instance with better defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000, // shorter timeout so UI fails fast and can show fallback
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// simple request logger
api.interceptors.request.use(
  (config) => {
    console.log(`API -> ${config.method?.toUpperCase() ?? 'GET'} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor with simple retry/backoff for network/5xx
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const shouldRetry =
      (!error.response || error.response.status >= 500 || error.code === 'ECONNABORTED') &&
      (originalRequest._retryCount ?? 0) < 2;

    if (shouldRetry) {
      originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;
      const backoff = 500 * Math.pow(2, originalRequest._retryCount - 1); // 500ms, 1000ms
      console.log(`API retry #${originalRequest._retryCount} after ${backoff}ms`, originalRequest.url);
      await new Promise((r) => setTimeout(r, backoff));
      return api(originalRequest);
    }

    console.error('API Error:', error.message || error);
    return Promise.reject(error);
  }
);

// In-memory cache to return immediate data while background refresh runs
let portfolioCache = null;
let portfolioRefreshInProgress = false;

const defaultPortfolioFallback = {
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

export const getPortfolio = async () => {
  // If cached, return it immediately (fast). Otherwise return fallback immediately.
  const immediate = portfolioCache ?? defaultPortfolioFallback;

  // Trigger a background refresh (only one at a time)
  if (!portfolioRefreshInProgress) {
    portfolioRefreshInProgress = true;
    (async () => {
      try {
        const response = await api.get('/portfolio');
        if (response?.data) {
          portfolioCache = response.data;
          console.log('Portfolio cache updated');
        }
      } catch (err) {
        console.warn('Background portfolio refresh failed:', err.message || err);
        // don't clear cache on failure
      } finally {
        portfolioRefreshInProgress = false;
      }
    })();
  }

  return immediate;
};

export const getCertificates = async () => {
  try {
    const res = await api.get('/certificates');
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Failed to fetch certificates:', error.message || error);
    return [];
  }
};

export const getProjects = async () => {
  try {
    const res = await api.get('/projects');
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Failed to fetch projects:', error.message || error);
    return [];
  }
};

export const getSkills = async () => {
  try {
    const res = await api.get('/skills');
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Failed to fetch skills:', error.message || error);
    return [];
  }
};

export const getExperience = async () => {
  try {
    const res = await api.get('/experience');
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Failed to fetch experience:', error.message || error);
    return [];
  }
};

export const submitContactForm = async (formData) => {
  try {
    const res = await api.post('/contact', formData);
    return res.data;
  } catch (error) {
    console.error('Failed to submit contact form:', error.message || error);
    throw error;
  }
};

export default api;
