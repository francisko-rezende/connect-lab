import { GlobalContext } from "@contexts";
import { useContext } from "react";

export const useGlobalContext = () => {
  const { userId, setUserId } = useContext(GlobalContext);

  return { userId, setUserId };
};
