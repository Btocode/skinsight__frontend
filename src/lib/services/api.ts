import axios from "axios";
import { getStorageItem } from '@/utils/storage';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = getStorageItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
