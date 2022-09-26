import { GlobalContext } from "@contexts";
import { useContext } from "react";

export const useGlobalContext = () => {
  const { userId, setUserId, theme, toggleTheme } = useContext(GlobalContext);

  return { userId, setUserId, theme, toggleTheme };
};
