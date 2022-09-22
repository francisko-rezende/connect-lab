import { getRegisteredDevices } from "@api";
import { useQuery } from "react-query";

export const useRegisteredDevices = () => {
  const registeredDevicesQuery = useQuery(
    "registeredDevices",
    getRegisteredDevices,
  );

  return registeredDevicesQuery;
};
