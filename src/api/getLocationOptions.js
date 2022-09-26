import { axiosInstance } from "@lib/axios";

export const getLocationOptions = async () => {
  const { data } = await axiosInstance.get("/locals");
  return data;
};
