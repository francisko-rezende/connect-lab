import { updateProfile } from "@api";
import { queryClient } from "@lib/react-query";
import { useMutation } from "react-query";

export const useUpdateProfile = () => {
  const mutation = useMutation(
    ({ userId, data }) => updateProfile(userId, data),
    {
      onSuccess: (_, { setIsDialogOpen }) => {
        queryClient.invalidateQueries("user");
        setIsDialogOpen(false);
      },
    },
  );

  return mutation;
};
