import axios from 'axios';

let base_url;
if (process.env.NODE_ENV === 'production') {
  base_url = '';
} else if (process.env.NODE_ENV === 'development') {
  base_url = 'http://localhost:4000';
}

const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const currentToken = config.headers.Authorization;
  if (token && `Bearer ${token}` !== currentToken) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
