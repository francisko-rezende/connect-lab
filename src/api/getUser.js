import { axiosInstance } from "@lib/axios";

export const getUser = async () => {
  const { data } = await axiosInstance.get(`/user`);
  return data;
};
