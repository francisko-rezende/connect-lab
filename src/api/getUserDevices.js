import { axiosInstance } from "@lib/axios";

export const getUserDevices = async (id) => {
  const res = await axiosInstance.get(`/userDevices/user/${id}`);
  return res;
};
