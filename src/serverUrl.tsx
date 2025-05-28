// src/api/axios.js or wherever your Axios config is
import axios from "axios";

export const baseUrl = "http://127.0.0.1:8000/api";

// 🔐 Authenticated instance
export const authAxios = axios.create({
  baseURL: baseUrl,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🌐 Public instance (no token)
export const publicAxios = axios.create({
  baseURL: baseUrl,
});
