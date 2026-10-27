import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-pearl-pi-86.vercel.app/api'  ,
});

// Automatically token attach karein agar user login hai
API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;