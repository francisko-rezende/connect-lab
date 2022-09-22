import { removeDevice } from "@api";
import { queryClient } from "@lib/react-query";
import { useMutation } from "react-query";

export const useRemoveUserDevice = () => {
  const mutation = useMutation((deviceId) => removeDevice(deviceId), {
    onSuccess: () => queryClient.invalidateQueries("userDevices"),
  });

  return mutation;
};
