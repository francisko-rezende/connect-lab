import { removeDevice } from "@api";
import { queryClient } from "@lib/react-query";
import { useMutation } from "react-query";

export const useRemoveUserDevice = () => {
  const mutation = useMutation(({ id }) => removeDevice(id), {
    onSuccess: (_, { setIsDialogOpen }) => {
      queryClient.invalidateQueries("userDevices");
      setIsDialogOpen(false);
    },
  });

  return mutation;
};
