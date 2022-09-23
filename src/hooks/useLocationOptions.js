import { getLocationOptions } from "@api";
import { useQuery } from "react-query";

export const useLocationOptions = () => {
  const locationsQuery = useQuery("locations", getLocationOptions);

  return locationsQuery;
};
