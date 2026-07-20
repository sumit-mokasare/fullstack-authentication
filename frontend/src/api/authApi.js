import { axiosInstance } from './axiosIntance';

export const authApi = {
  register: async (data) => {
    const response = await axiosInstance.post('/users/register', data);
    return response.data;
  },
};
