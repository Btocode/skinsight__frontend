import axios from "axios";
import { getStorageItem, setStorageItem } from '@/utils/storage';

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

// Authentication APIs
export const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/sign_in", { email, password });
      if (response.data.token) {
        setStorageItem("token", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },
  logout: async () => {
    await api.post("/auth/sign_out");
  },
  getUser: async () => {
    const response = await api.get("/auth/me");
    return response.data; // { user }
  },
};

export default api;
