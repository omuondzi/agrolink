import axios from "axios";

// Define the base URL for your backend API
export const baseUrl = "http://127.0.0.1:8000/api";



export const serverUrl = axios.create({
  baseURL: baseUrl,
});
