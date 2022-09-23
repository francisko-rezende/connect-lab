import { axiosInstance } from "@lib/axios";

export const removeDevice = (deviceId) =>
  axiosInstance.delete(`/userDevices/${deviceId}`);
