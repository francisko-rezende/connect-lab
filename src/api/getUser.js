import { axiosInstance } from "@lib/axios";

export const getUser = async (id) => {
  const { data } = await axiosInstance.get(`/users/${id}`);
  return data;
};
