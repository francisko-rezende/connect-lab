import { axiosInstance } from "@lib/axios";

export const getUserDevices = async () => {
  const res = await axiosInstance.get(`/userDevices/user`);
  return res;
};
