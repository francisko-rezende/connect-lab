import { addUserDevice } from "@api";
import { queryClient } from "@lib/react-query";
import { useMutation } from "react-query";

export const useAddUserDevice = () => {
  const mutation = useMutation(
    ({ userId, deviceId }) => addUserDevice(userId, deviceId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userDevices");
      },
    },
  );

  return mutation;
};
