import { axiosInstance } from "@lib/axios";

export const getRegisteredDevices = async () => {
  const { data } = await axiosInstance.get("devices");

  return data;
};
