import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/vi/',
  Headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Credential: 'include',
  },
});
