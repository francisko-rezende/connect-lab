import { toggleDeviceStatus } from "@api";
import { queryClient } from "@lib/react-query";
import { useMutation } from "react-query";

export const useToggleDeviceStatus = () => {
  const mutation = useMutation(
    ({ deviceId, deviceStatus }) => toggleDeviceStatus(deviceId, deviceStatus),
    {
      onSuccess: () => queryClient.invalidateQueries("userDevices"),
    },
  );

  return mutation;
};
