import { addUserDevice } from "@api";
import { queryClient } from "@lib/react-query";
import { useMutation } from "react-query";

export const useAddUserDevice = () => {
  const mutation = useMutation(
    ({ data: { userId, deviceId, location, room } }) =>
      addUserDevice(userId, deviceId, location, room),
    {
      onSuccess: (_, { reset, toast }) => {
        toast.dismiss();
        queryClient.invalidateQueries("userDevices");
        reset();
        toast.success("Device adicionado com sucesso.");
      },
      onSettled: (_, __, { setIsOpen }) => {
        setIsOpen(false);
      },
    },
  );

  return mutation;
};
