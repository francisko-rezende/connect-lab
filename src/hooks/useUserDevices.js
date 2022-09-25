import { getUserDevices } from "@api";
import { queryClient } from "@lib/react-query";
import { useQuery } from "react-query";

const handleFetchUserDeviceData = async (userId) => {
  const { data } = await getUserDevices(userId);

  data.forEach((device) =>
    queryClient.setQueryData(["userDevices", device._id], device),
  );

  return data;
};

export const useUserDevices = (userId) => {
  const userDevicesQuery = useQuery("userDevices", () =>
    handleFetchUserDeviceData(userId),
  );
  return userDevicesQuery;
};
