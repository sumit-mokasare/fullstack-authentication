import axios from 'axios';
import { meta } from 'zod/v4/core';
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  Headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
