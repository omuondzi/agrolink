// src/api/axios.js
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const baseUrl = "http://127.0.0.1:8000/api";

// Define the structure of your JWT payload
interface JwtPayload {
  exp?: number;
  [key: string]: unknown;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    if (!decoded.exp) return true; // If no exp field, consider it expired
    return decoded.exp * 1000 < Date.now(); // Convert to ms
  } catch (error) {
    console.error("Token decoding error:", error);
    return true; // Invalid token
  }
};

// 🔁 Utility: Refresh access token using refresh token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken || isTokenExpired(refreshToken)) {
    // Refresh token is missing or expired
    throw new Error("Refresh token expired");
  }

  const response = await axios.post(`${baseUrl}/token/refresh/`, {
    refresh: refreshToken,
  });

  const { access } = response.data;
  localStorage.setItem("token", access);
  return access;
};

// 🌐 Public Axios (no token)
export const publicAxios = axios.create({
  baseURL: baseUrl,
});

// 🔐 Authenticated Axios (auto token refresh)
export const authAxios = axios.create({
  baseURL: baseUrl,
});

authAxios.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("token");

    if (accessToken && isTokenExpired(accessToken)) {
      try {
        // Try refreshing the access token
        accessToken = await refreshAccessToken();
      } catch (err) {
        // If refresh fails, log out user
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
        return Promise.reject(err);
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
