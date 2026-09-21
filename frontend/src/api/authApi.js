import { axiosInstance } from './axiosIntance';

export const authApi = {
  register: async (data) => {
    const response = await axiosInstance.post('/users/register', data);
    return response.data;
  },

  login: async (data) => {
    const response = await axiosInstance.post('/users/login', data);
    return response.data;
  },

  verifyUser: async (token) => {
    const response = await axiosInstance.get(`/users/verify/${token}`);
    return response.data;
  },


  resendVerification: async (email) => {
    const response = await axiosInstance.get('/users/resent-verification', { email });
    return response.data;
  },

  getUser: async () => {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  },

  forgotPassword: async () => {
    const response = await axiosInstance.post('/users/forgot-password');
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await axiosInstance.post(`users/reset-password/${token}`, { password });
    return response.data;
  },

  updateAvatar: (formData) =>
    axiosInstance.post("users/updateAvatar", formData),

  logout: async () => {
    const response = await axiosInstance.post('/users/logout');
    return response.data;
  },
};