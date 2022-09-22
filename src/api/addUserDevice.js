import { axiosInstance } from "@lib/axios";

export const addUserDevice = (userId, deviceId) =>
  axiosInstance.post("/userDevices", {
    user: userId,
    device: deviceId,
    is_on: false,
    local: "631b348a6f2d2f24a7c0c962",
    room: "Sauna",
  });
