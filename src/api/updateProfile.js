import { axiosInstance } from "@lib/axios";

export const updateProfile = (userId, data) =>
  axiosInstance.put(`/users/${userId}`, data);
