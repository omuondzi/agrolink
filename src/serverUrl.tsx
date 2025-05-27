import axios from "axios";

export const baseUrl = "http://127.0.0.1:8000/api";

export const serverUrl = axios.create({
  baseURL: baseUrl,
});

// Add token to all requests if available
serverUrl.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // make sure token is stored here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
