import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Dispatch loading start
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api-loading-start'));
    }
    return config;
  },
  (error) => {
    // Dispatch loading end on error
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api-loading-end'));
    }
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    // Dispatch loading end on success
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api-loading-end'));
    }
    return response;
  },
  (error) => {
    // Dispatch loading end on error
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api-loading-end'));
    }
    return Promise.reject(error);
  }
);

export const getContentTypes = async () => {
  try {
    const response = await api.get('/api/content-types?populate=*');
    return response.data;
  } catch (error) {
    console.error('Error fetching content types:', error);
    throw error;
  }
};

export const getContentType = async (id: string) => {
  try {
    const response = await api.get(`/api/content-types/${id}?populate=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content type:', error);
    throw error;
  }
};

export default api; 