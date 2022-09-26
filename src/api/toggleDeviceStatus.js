import { axiosInstance } from "@lib/axios";

export const toggleDeviceStatus = (deviceId, deviceStatus) => {
  return axiosInstance.put(`/userDevices/${deviceId}`, {
    is_on: !deviceStatus,
  });
};
