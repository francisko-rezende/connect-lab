import { getUser } from "@api";
import { useQuery } from "react-query";

export const useUser = (userId) => {
  const userQuery = useQuery("user", () => {
    return getUser(userId);
  });

  return userQuery;
};
