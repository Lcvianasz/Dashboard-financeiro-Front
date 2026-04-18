import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // usa o proxy do Vite
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;