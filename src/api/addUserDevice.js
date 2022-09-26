import { axiosInstance } from "@lib/axios";

export const addUserDevice = (userId, deviceId, localId, room) =>
  axiosInstance.post("/userDevices", {
    user: userId,
    device: deviceId,
    is_on: false,
    local: localId,
    room,
  });
